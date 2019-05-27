"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
"""
from json import JSONEncoder
from app import app, db, filefolder,login_manager,token_key
from flask import render_template, request, url_for ,redirect,flash,jsonify, g, session
from werkzeug.utils import secure_filename
import os
import datetime
import jwt
from functools import wraps
postfolder='static/images/'



@app.route('/')
def index():
    """Render website's initial page and let VueJS take over."""
    return render_template('index.html')



@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)



# @app.route("/api/auth/login", methods=["POST"])
# def login():
#     #if session['userid']:
#     #    return jsonify(errors=[{'error':['You are already logged in.']}])
#     form = LoginForm()
#     if request.method == "POST" and form.validate_on_submit():
#         # change this to actually validate the entire form submission
#         # and not just one field
#         username=form.username.data
#         password=form.password.data
        
#         user=Users.query.filter_by(username=username,password=password).first()
#             # Get the username and password values from the form.
#         if user is not None:
#             payload = {'user_id' : user.id}
#             token = jwt.encode(payload, token_key).decode('utf-8')
#             session['userid'] = user.id;
#             return jsonify(response=[{'message':'Log in successful','token': token, 'userid': user.id,'userphoto':postfolder+user.profile_photo}])
#             flash('You were successfully logged in')
#         else:
#             return jsonify(errors=[{'error':['Password and user name does not match our records.']}])
#             flash('Password and user name does not match our records')
#     return jsonify(errors=[{'error':form_errors(form)}])


        

def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages



# @login_manager.user_loader
# def load_user(id):
#     return Users.query.get(int(id))



def review_post(posts):
    like_tester='';
    newposts=[]
    for i in range (0,len(posts)):
        user=Users.query.filter_by(id=posts[i].user_id).first();
        username=user.username;
        profilephoto=user.profile_photo;
        likevar=Likes.query.filter_by(post_id=posts[i].id,user_id=session['userid']).first()
        if likevar is None:
            like_tester='No'
        else:
            like_tester='Yes'
        wisdom={
        'id':posts[i].id,
        'user_id':posts[i].user_id,
        'photo':postfolder+posts[i].photo,
        'caption':posts[i].caption,
        'created_on':posts[i].created_on.strftime("%d %b %Y"),
        'likes':likes_counter(posts[i].id),
        'username':username,
        'userphoto':postfolder+profilephoto,
        'likebyuser':like_tester
        }
        newposts.append(wisdom)
    return newposts
        
def likes_counter(post_id):
    count=Likes.query.filter_by(post_id=post_id).all()
    return len(count)
    


@app.after_request
def add_header(response):

    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")

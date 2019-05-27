

Vue.config.productionTip = false;

Vue.component('app-header', {
    template: `
    <nav class="navbar  navbar-dark bg-primary fixed-top" >
    <div class="container" id="headz">
      <img class="mr-auto logophoto"  v-bind:src="CTlogo"/>
      <a class="navbar-brand font text-white">Colour Tales</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="row collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore the Game<span class="sr-only">(current)</span></router-link>
          </li>
          </li>
            <li class="nav-item active">
            <router-link class="nav-link" to="/features">Features <span class="sr-only">(current)</span></router-link>
          </li>
           <li class="nav-item active">
            <router-link class="nav-link" to="/tech">Technologies<span class="sr-only">(current)</span></router-link>
          </li>
            <li class="nav-item active">
            <router-link class="nav-link" to="/contact">Contact Us<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
        </div>
      </div>
    </nav>
    `,watch: {
        '$route' (to, fom){
            this.reload()
        }
      },
    created: function() {
        let self = this;
        self.user=localStorage.getItem('token');
        self.userid=localStorage.getItem('userid');
        if (localStorage.getItem('userphoto')){
            self.userphoto=localStorage.getItem('userphoto');
        };
        
     
    
    },
    data: function() {
        return {
            user: [],
            userid:'',
            CTlogo:'/static/images/CTlogo.png',
            userLoggedIn:this.isLoggedIn(),

        }
    },
    methods:{
        reload(){
            let self = this;
            self.user= localStorage.getItem('token');
            self.userid=localStorage.getItem('userid');
            if (localStorage.getItem('userphoto')){
                self.userphoto=localStorage.getItem('userphoto');
            }
            else{
                self.userphoto='/static/images/log.png';  
            }
            
        },
        isLoggedIn: function(){
                    return !(localStorage.getItem('token')==null);
                }
    }
});

Vue.component('flash-message', {
    name: 'flash-message',
    template:`
        <div>
            <transition name="fade">
                <div v-if="display_Flash" class="alert alert-success" role="alert"">
                    <p style="text-align:center;">{{flash_Message}}</p>
                </div>
            </transition>
        </div>
    `,watch: {
        '$route' (to, fom){
            let self = this;
            self.display_Flash=(localStorage.getItem('displayFlash') === "true");
            self.flash_Message=localStorage.getItem('flashMessage');
            
            if(self.display_Flash){
                setTimeout(function() { 
                    self.display_Flash = false;
                    localStorage.setItem('displayFlash', false);
                    self.flash_Message = '';
                    localStorage.setItem('flashMessage', '');
                }, 3000);
                
                if(localStorage.getItem('token')==null){
                    localStorage.removeItem('displayFlash');
                    localStorage.removeItem('flashMessage');
                };
            };
        }
      },data: function(){
        return{
            display_Flash: false,
            flash_Message: '',
        }
    }
});

Vue.component('app-footer', {
    template: `
    <footer class="page-footer bg-primary font-small pt-4 mt-4">
        <div class="footer-copyright py-3 text-center">
            <p>Copyright &copy; Colour Tales.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
   <div class="container contentdisplay" >
   
            <div >
                <div class="row homelogo">
                   <h3 class="font homelogoname">Colour Tales</h3>
                   </br>
                </div>
                   <p class="col-md-5 col-sm-10"> Escape to an educational world through fun and colour in this interactive colour-by-number game</p>                
                <hr>
                <p class="lead link">            
                    <router-link to="/features" >    
                        Features  
                    </router-link></p>
                <p class="col-md-5 col-sm-10">  Colour Tales is a game for children age two (2) to eight (8) years. 
                <p>
                    -The child will be able to colour, by number, images representing characters or scenes from the storybook. </p>
                <p>    -The story is narrated to develop listening and recognition skills, as well as being enjoyable. </p>
                <p>   -The child just has to colour the images correctly in order to complete the story. </p>
                <p>   -View a congratulatory message and completely colored images when you've completed each story </p>
                </p>
                </br>
                </br>
                <p class="col-md-5 col-sm-10"> 
                Available on Android platforms.
                </p>
            </div>
            
            <div class="carousel col-md-6 col-sm-11">
        <ul>
        <li>
            <div class="carousel-container">
                  <img class="pics"  v-bind:src="CTlogo"/>
            </div>
        </li>
        <li>
            <div class="carousel-container">
                <img class="pics" v-bind:src="childrenpic"/>
            </div>
        </li>
        <li>
            <div class="carousel-container">
                <img class="pics" v-bind:src="blankimg"/>
            </div>
        </li>
        <li>
            <div class="carousel-container">
                <img class="pics" v-bind:src="clrdimg"/>
            </div>
        </li>
        </div>
            
    </div>
   `,
    created: function(){
        let self = this;
        if (localStorage.getItem('token')){
            self.usertoken=localStorage.getItem('token');
        }
        
    },
    data: function() {
       return {
           usertoken:'Not logged in',
            CTlogo:'/static/images/CTlogo.png',
           childrenpic:'/static/images/tablet.jpg',
           blankimg:'static/images/axeman.jpeg',
           clrdimg:'static/images/clrd_screenshot.png',
       }
    }
});



const Explorer=Vue.component('Allposts',{
template:`
            <div class="container explorer" >
             <div class="row">
                <div  class="row col-md-7 float-left">
                    <div class="jumbotron shadow" style="width:90%" >
                        <div class="row userimage">
                            <img class="user_post_img" v-bind:src="CTlogo"> 
                              
                                <h4 class="align-middle"> Gameplay of Colour Tales </h4>
                            

                            
                        </div>
                        <br>
                        <div class="row col-md-12">
                            <img class="post_img img-thumbnail shadow" v-bind:src="blankimg"/>
                        </div>
                        <br>
                        <div class="row col-md-12">
                            <p class="lead postcaption">Users will be given a list of stories to choose from. 
                            When one is selected, the story begins! </br>
                            You can then read the text as it is read to you. </br>
                            Tap a colour, then tap the area with the related number to color it. </br>
                            Don't tap the incorrect number !! </p>    
                        </div>
                        <br>
                        <div class="row col-md-12">
                            <img class="post_img img-thumbnail shadow" v-bind:src="clrdimg"/>
                        </div>
                        <br>
                        <div class="row col-md-12">
                            <p class="lead postcaption">When all of the  image is correctly coloured, the page turns!</br>
                            Continue along your journey, until the very end. </br>
                            Once the story is completed, you will be greeted with a celebratory message and your completed pictures. </br>
                            Have Fun with Colour Tales !! </p>    
                        </div>   
                        
                    
                    </div>
                    
                    <div class="jumbotron shadow" style="width:90%" >
                        <div class="row userimage">
                            <div class="col-md-5 float-right">
                            <img class="post_img img-thumbnail shadow" v-bind:src="blank_mom"/>
                        </div>
                        <br>
                        <div class="col-md-5 float-right">
                            <img class="post_img img-thumbnail shadow" v-bind:src="clrd_mom"/>
                        </div>
                        
                    
                    </div>
            
   
            </div>
        </div>
`,
        data:function(){
            return {
                response:[],
                CTlogo:'static/images/CTlogo',
                blankimg:'static/images/game_screenshot.png',
                clrdimg:'static/images/clrd_screenshot.png',
                blank_mom:'static/images/blank_mom.png',
                clrd_mom: 'static/images/clrd_mom.png',
                usertoken:''
            }
        },
        methods:{
            }
                
});

const tech=Vue.component('tech',{
template:`
            
                <div id="profile" class="container shadow jumbotron col-md-12" >
                    <div class="row">
                        <div class="col-lg-2 col-md-8"> 
                            <img class="dispaly_img" v-bind:src="CTlogo" />
                        </div>
                        <div class="col-lg-10">
                            <div class="col-lg-6 col-md-8 float-left">
                                <h4>Technologies Used To Implement Colour Tales</h4>
                                <p> Colour Tales was designed as an app to work on Android platforms 5.0 and higher. </p>
                                <br>
                                <p class="lead">Android Studio</p>
                                <p> Used to implement the game on an Android platform. It provides convenient libraries and 
                                features such as TextToSpeech, Bitmap and Graphics Library . For more information, visit 
                                 <a href="https://developer.android.com" > Android Developers website  </a> </p></br>
                                <p class="lead">Scalable Vector Graphics (SVG) tools </p>
                                <p> Used to edit and section each image used, and allows for animation. 
                                These tools can be used to change the format of images to .svg and xml formats
                                For more information, visit <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" > SVG Documentation website </a> </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div id="postdisplay" class="container">
                    
            
            
            `,
        data:function(){
            return {
                usertoken:'',
                CTlogo:'static/images/CTlogo.png',
                follows:0,
                numposts:0,
                userinfo:[],
                isfollowing:'',
                error:'',
                toshow:'',
                columns:3,
                rows:0,
                limits:[0],
            }
        },methods:{
            
            }
            
})

const Contact=Vue.component('contact',{
template:`
            
                <div id="profile" class="container shadow jumbotron col-md-12" >
                    <div class="row">
                        <div class="col-lg-2 col-md-8"> 
                            <img class="dispaly_img" v-bind:src="CTlogo" />
                        </div>
                        <div class="col-lg-10">
                            <div class="col-lg-6 col-md-8 float-left">
                                <h4>Contact Us</h4>
                                <form class="contactForm">
                                <p> Send us a message</p>
                                <div class="NameDiv" data-validate="Please enter your name">
					                <input class="input100" type="text" name="name" placeholder="Full Name">
					                <span class="focus-input100"></span>
				                </div>
				                <div class="wrap-input100 validate-input" data-validate="Please enter your email: e@a.x">
					                <input class="input100" type="text" name="email" placeholder="E-mail">
					                <span class="focus-input100"></span>
				                </div>
                                <div class="wrap-input100 validate-input" data-validate="Please enter your phone">
					                <input class="input100" type="text" name="phone" placeholder="Phone">
					                <span class="focus-input100"></span>
				                </div>
                                <div class="wrap-input100 validate-input" data-validate="Please enter your message">
					                <textarea class="input100" name="message" placeholder="Your Message"></textarea>
					                <span class="focus-input100"></span>
				                </div>
                                <div class="container-contact100-form-btn">
					                <button class="contact100-form-btn">
						            <span>
							        <i class="fa fa-paper-plane-o m-r-6" aria-hidden="true"></i>
							        Send
                					</span>
                					</button>
                				</div>
                                
                                
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            
            `,
        data:function(){
            return {
                CTlogo:'static/images/CTlogo.png',
                toshow:'',
                columns:3,
                rows:0,
                limits:[0],
            }
        },methods:{
            
            }
            
})

const Features=Vue.component('features',{
template:`
            
                <div id="profile" class="container shadow jumbotron col-md-12" >
                    <div class="row">
                        <div class="col-lg-2 col-md-8"> 
                            <img class="dispaly_img" v-bind:src="CTlogo" />
                        </div>
                        <div class="col-lg-7">
                            <div class="col-lg-8 col-md-12 ">
                                <h4>Features</h4>
                                
                                <p> -View the story and listen to the narration</p>
                                <video width="320" height="240" controls v-bind:src="video">
                                    <source src="gameplay.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                
                                <div>
                                <p> -Select from a list of available stories </p>
                                <img class="feature_img" v-bind:src="menu" />
                                
                                <p> -Color a blank image by the specified number </p>
                                <img class="feature_img" v-bind:src="blank_wolf" />
                                
                                <p> -Add color by tapping the color at the bottom, then the section with the correct number </p>
                                <img class="feature_img" v-bind:src="clrd_wolf" />
                                
                                <p> -View a congratulatory message at the end of it all and a complete image! </p>
                                <img class="feature_img" v-bind:src="congrats" />

                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            
            `,
        data:function(){
            return {
                CTlogo:'static/images/CTlogo.png',
                congrats:'static/images/congratulation.png',
                blank_wolf:'static/images/blank_wolf.png',
                clrd_wolf:'static/images/clrd_wolf.png',
                menu:'static/images/menu.png',
                video:'static/images/gameplay.mp4',
                toshow:'',
                columns:3,
                rows:0,
                limits:[0],
            }
        },methods:{
            
            }
            
})

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path:"/explore",component:Explorer},
        { path:"/features", component:Features},
        { path:"/tech", component:tech},
        { path:"/contact", component:Contact}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});
<?php
ob_start(); // Start output buffering
header('Access-Control-Allow-Origin: *');
header('Permissions-Policy: autoplay=(self)');

header('Access-Control-Allow-Origin: *'); 

header("Access-Control-Allow-Credentials: true");

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

//session_set_cookie_params(['samesite' => 'None']);

session_name("kport");

session_start();
ob_end_flush(); // Send the buffered output including the modified header
require_once 'config.php';
require_once 'createtable.php'

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css" integrity="sha512-vebUliqxrVkBy3gucMhClmyQP9On/HAWQdKDXRaAlb/FKuTbxkjPKUyqVOxAcGwFDka79eTF+YXwfke1h3/wfg==" crossorigin="anonymous" referrerpolicy="no-referrer"> -->
    <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.163/build/three.module.min.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.163/examples/jsm/"
    }
  }
  
</script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@2.30.7/dist/editorjs.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/link@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/quote@2.7.4/dist/quote.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-paragraph-with-alignment@3.0.0"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-text-alignment-blocktune@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/attaches@1.3.0/dist/bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-toggle-block"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/list@2"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/table@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-drag-drop"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-parser@1/build/Parser.browser.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-html@3.4.0/build/edjsHTML.browser.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/createjs@1.0.1/builds/1.0.0/createjs.min.js"></script> -->
<style>
  .content{
    position: absolute;
    top: 50px;
    bottom: 50px;
    border: 1px solid black;
    width: 23%;
    left: 5px;
  }
  h1{
    color:blue;
  }
  .menu{
    /* position:absolute; */
    top:0;
    right:0;
    
  }
  canvas{
    position: fixed;
    top:0;
    z-index: -1;
  }
  body{
    height:100%;
    overflow-x: hidden;
  }
  .menucont{
    border: 1px solid black;
    width: 10%;
    /* display: inline !important; */
    /* float: right; */
    right: 0;
    height: 100%;
    position: absolute;
    
  }
  main{
    
    position: relative;
  }
  #cont{
    position:absolute;
    height:100%;
    width: 100%;
    flex-direction:column;
  }
  #intro > div,  #projects > div,#blog > div,#ai > div{
    /* background: green; */
    width: calc(50%);
    height:100%;
    /* position: absolute; */
  }
  #intro  > div,#blog  > div{
    float:right;
    transform: translateX(100%);
    transition:all 2s ease-in-out;
  }
  #sal{
    margin: auto;
    position: relative;
    width: 50%;
    padding: 5%;
  }
  p{
    padding: 5%;
    font-size: large;
  }
  #projects  > div ,#ai  > div{
    float: left;
    transform: translateX(-100%);
    transition:all 2s ease-in-out;
  }
  .boxes{
    /* background: blue; */
    height: 100%;
    /* position: absolute; */
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;

  }
  .iconcont{
    padding: 10px 0;
    /* margin: 5px 0px; */
  }
  .iconcont > a{
    width: 30px;
    margin: 0 2px;
    
  }
  .iconcont > a > i{
    font-size:30px;
    
  }
  .show{
    opacity:1;
  }
  .showC{
    opacity:1;
    transform:translate(10px)!important;
    
  }
  .scrollcont{
    height: 70vh;
    max-height:40%;
    overflow-y: auto;
  }
  #aicontimput{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    transform:translate(50%,-5px);
  }
  #navtop{
    position: relative;
    z-index: 1000000;
  }
  .clear{
  clear: both;
  }
  .showbtn{
    display:inline-block!important;
  }
  .navbtn{
    margin:10px;
    z-index: 10;
    display:none;
    position: fixed!important;
    top:0;
    right:0;
  }
  img, video {
    max-width: 100%;
    margin-bottom: 15px;
  }
  /* .toast{
    transform:translateX(100%);
    transition: transform .1s ease-in-out 
  }
  .toast.show{
    transform:translateX(0);
  } */
</style>

      
</head>
<body >
  <?php     
    if(isset($_GET["link"])){
      $v = $_GET["link"];
        include("$v.php");
      
    }else{


  
  ?>
<button class="btn btn-primary fixed navbtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i class="fa fa-bars" style="color: #ffffff;"></i></span></button>
<nav id="navtop" class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Kishon Diaz</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#intro">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#projects">Projects</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#blog">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#ai">Ai</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-primary" href="mailto:kishon.a.diaz@gmail.com">Contact Me</a>
        </li>
      </ul>
      <div class="d-flex align-items-center">
        <figcaption style="margin: 0 5px" class="blockquote-footer">
            Version: 1.0.4
        </figcaption>
      </div>
      <div class="btngroup">
      <div class="btn-group">
        <button type="button" class="btn btn-primary  " data-bs-toggle="dropdown" >
          <i class="fa-solid fa-gear"></i>
        </button>
       
        <ul class="dropdown-menu">
          <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen" >Background</button></li>
          
          <li><span class="" tabindex="0" data-bs-toggle="tooltip" title="ToDo: Coming Soon">
                <a class="dropdown-item" disabled href="#">Model</a>
              </span>
          </li>
          <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
          <!-- <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Separated link</a></li> -->
        </ul>
      </div>
      <!-- <div class="btn-group dropstart">
   
        <button type="button" class="btn btn-primary " data-bs-target="#login" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="">Login</span>
        </button>
        <ul id="login" class="dropdown-menu">
          <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen" >Background</button></li>
          
          <li><span class="" tabindex="0" data-bs-toggle="tooltip" title="ToDo: Coming Soon">
                <a class="dropdown-item" disabled href="#">Login</a>
              </span>
          </li>
          <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
          <!-- <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Separated link</a></li> 
        </ul>
      </div> -->
      </div>
      
    </div>
  </div>
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->

</nav>


<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Kishon Diaz</h5>
    
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div id="navmenu" class="offcanvas-body">
      <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link "  href="#intro">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#projects">Portfolio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#blog">Blog</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#ai">Ai</a>
      </li>
      <li class="nav-item">
        <a class="btn btn-primary" href="mailto:kishon.a.diaz@gmail.com">Contact Me</a>
      </li>
    </ul>
    <div class="d-flex align-items-center">
        <figcaption style="margin: 0 5px" class="blockquote-footer">
            Version: 1.0.4
        </figcaption>
      </div>
  </div>
</div>
<div class="clear"></div>
<main id="mycont">
  <div id="cont" >
    <div id="intro" class="boxes" data-op="0">
      <div>
        <div id="sal">
          <h6>Salutations I am</h6>
          <h1>Kishon Diaz</h1>
            <a class="btn btn-primary" href="./assets/resume/Kishon_Diaz_Resume_Template.docx" download>Download Resume</a>
            <div class="row iconcont">
              <a href="https://www.linkedin.com/in/kishon-diaz"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="https://github.com/kishonadiaz " target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
            </div>
        </div>
        <p>Welcome to my corner of the digital world! I'm Kishon Diaz, and I wear many hats in the realms of art and technology. My true passion lies in programming. Whether I'm developing web applications, creating 3D models, or experimenting with the latest tech trends, programming is the driving force behind my creative endeavors. It's a tool that allows me to turn ideas into reality, and I'm constantly learning and evolving to stay at the forefront of the ever-changing tech landscape. When I'm not immersed in the world of art and technology, you can find me seeking inspiration in the great outdoors, enjoying a good book, or collaborating with like-minded individuals on innovative projects. I believe that the best ideas are born through collaboration and the sharing of knowledge. Thank you for visiting my website, and I hope you'll join me on this exciting journey of creativity, technology, and endless possibilities. Feel free to explore my portfolio and get in touch if you'd like to connect or collaborate on a project.</p>
      </div>
    </div>
    <div id="projects" class="boxes" data-op="0">
      <div>
        <div>
          <h1>Projects</h1>
        </div>
        <div>
          <div id="projectslist" class="list-group scrollcont">
          </div>

        </div>
      </div>
    </div>
    <div id="blog" class="boxes" data-op="0">
      <div>
        <div>
          <h1>Blogs</h1>
        </div>
        <div>
          <div id="bloglist" class="list-group scrollcont">
              <a href="index.php?link=pages/blogpage" class="list-group-item list-group-item-action active" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">List group item heading</h5>
                  <small>3 days ago</small>
                </div>
                <p class="mb-1">Some placeholder content in a paragraph.</p>
                <small>And some small print.</small>
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">List group item heading</h5>
                  <small class="text-muted">3 days ago</small>
                </div>
                <p class="mb-1">Some placeholder content in a paragraph.</p>
                <small class="text-muted">And some muted small print.</small>
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">List group item heading</h5>
                  <small class="text-muted">3 days ago</small>
                </div>
                <p class="mb-1">Some placeholder content in a paragraph.</p>
                <small class="text-muted">And some muted small print.</small>
              </a>
              <h1>Blog Comming soon</h1>
          
          </div>
        </div>
      

      </div>
   
    </div>
    <div id="ai" class="boxes" data-op="0">
      <div>
        <div>
          <h1>AI Show Case using Locol.io</h1>
        </div>
        <h1>Comming soon</h1>
        <div id="aicontimput">
          <div  class="input-group mb-3">
            <div id="aiinput" contenteditable="true"  class="form-control" ></div>
            <button class="btn btn-primary" type="button">Go</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>

<!-- Modal -->
<!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> -->
</main>

  <!-- <div class="d-flex justify-content-end menu">
    <button type="button"><div></div>Ai Active</button>
    <button type="button">menu</button>
  </div>
  <div class="d-flex justify-content-start content">
    dlksf;gjl;ksdjdf
  </div>
  <div class="d-flex justify-content-end menucont">
    dlksf;gjl;ksdjdf
  </div>
  <div class="col-12" style="position:absolute;bottom:0;left:0;right:0">
    <div class="col-6" style="margin:auto">
      
    <input type="text" id="messageai" class="form-control" placeholder="Test Talk to Ai" >
    <!-- <audio id="audioplays" autoplay controls>
      <source src="voicetest.ogg" type="audio/ogg" />
    </audio>
      <input type="text" id="messageai" class="form-control" placeholder="Test Talk to Ai" >
    </div> 
    
  </div>
</div> -->
<div class="modal fade" id="exampleModalFullscreen" tabindex="-1" aria-labelledby="exampleModalFullscreenLabel" aria-hidden="true" style="display: none;z-index:10000000;">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h4" id="exampleModalFullscreenLabel">Full screen modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  <canvas id="threecanvas"></canvas>
  <script type="module" src="main.js"></script>
<?php
  }
  
?>
<script type="module" src="textscript.js"></script>
<!-- <script type="module" src="talktoai.js"></script>  -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script>
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, {
      animation:true,
      autohide:true,
      delay:200
    })
  })
</script>
</body>
</html>
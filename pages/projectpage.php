<style>
    body{
        background:lightgrey;
    }

    nav{
        z-index: 10000;
    }
    #menu{
        border: 1px solid black;
        display: inline-block;
        height: 100%;
        padding: 32px 5%;
        position: absolute;
        background:white;
        z-index: 1000;
    }
    #navmenu{
        position: static;
        height: 100%;
       
    }
    #navmenu > ul{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        margin: auto;
    }
    main{
        margin: auto;
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-wrap:anywhere;

    }
    main > div{
     
        margin: auto;
        position: relative;
        display: flex;
        
    }
    main > div > div{

        position: absolute;
        left: 0;
        right: 0;
        background:whitesmoke;
        display:flex;
        
    }
    main > div > div > div{
    
        margin:auto;
    
    }
    #content{
        margin: 5px 30%;
    }
    #content li{
        list-style: none;
    }
    #content p {
        padding:0;
    }
    .navbar{
        background:lightgrey!important;
    }
    
</style>
<nav class="navbar navbar-light bg-light d-flex flex-nowrap">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.php"><i class="fa-solid fa-angle-left"></i></a>
  </div>
  <div><a id="giticon" target="_blank" rel="noopener noreferrer" ><i style="font-size:20px;margin-right:20px;"  class="fa-brands fa-github"></i></a></div>
  
</nav>
<div id="menu">

    <div id="navmenu" class="offcanvas-body">
        <ul id="menufill" class="nav flex-column">
        <!-- <li class="nav-item">
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
        </li> -->
        </ul>
        
    </div>

</div>
<main>
    <div>
        <div>
            <div id="content" class="col-8">
              
            </div>
            

        </div>

    </div>


</main>

<?php
    print_r($_GET)

?>






<script type="module" src="./js/markdownr.js"></script>
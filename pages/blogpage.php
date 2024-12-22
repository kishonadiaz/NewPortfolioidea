<style>
    body{
        background:lightgrey;
    }

    nav{
        z-index: 10000;
    }
    #menu{
        border-radius:4px;
        border-right: 1px solid black;
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
        /* margin: 5px 10%; */
        /* pointer-events: none; Prevents interaction with the element */
        /* user-select: none; Prevents text selection within the element */
        overflow:auto;
        
        
    }
    #content li{
        list-style: none;
    }
    #content p {
        padding:0;
    }
    #content video{
        /* width: 30%; */
    
    }
    #content img , #menufill img{
        /* height:10%; */
    }
    .navbar{
        background:lightgrey!important;
    }
    
    .ce-block__content,
    .ce-toolbar__content {
        max-width: unset;
    }
    
</style>
<nav class="navbar navbar-light bg-light d-flex flex-nowrap">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.php"><i class="fa-solid fa-angle-left"></i>Kishon Diaz</a>
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
            <div id="content" contenteditable="false"  class="col-8 ">
                <h1 id="title" ></h1>
                <div id="editor" contenteditable="false"></div>
            </div>
            

        </div>

    </div>


</main>

<script type="module" src="./pages/blogpage.js"></script>
<script>
    
</script>






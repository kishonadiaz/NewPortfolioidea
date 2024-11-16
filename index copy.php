<?php

header('Access-Control-Allow-Origin: *');
header('Permissions-Policy: autoplay=(self)');

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
    <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.163/build/three.module.min.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.163/examples/jsm/"
    }
  }
</script>
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
  .menu{
    /* position:absolute; */
    top:0;
    right:0;
    
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
</style>
</head>
<body>
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

  
<canvas id="threecanvas"></canvas>
<script type="module" src="main.js"></script>
<!-- <script type="module" src="talktoai.js"></script>  -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
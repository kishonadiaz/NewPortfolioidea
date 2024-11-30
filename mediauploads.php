<?php


////////////print_r($_FILES);
require_once "./config.php";
$allowedExts = array("jpg","3pg" ,"jpeg","mpeg", "gif", "png","PNG" ,"mp3", "mp4","MP4", "wma","mov","MOV","webm");
$imageExt = array("jpg", "jpeg", "gif", "png","PNG");
$videoExt = array( "mp4","MP4","3pg", "wma","mov","MOV","webm");
$audioExt = array("mp3","mpeg");
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
//$POST = array_merge($_POST, json_decode(file_get_contents("php://input"), true));
// //echo  json_encode($_FILES);
////////////print_r($_FILES);
// //////////print_r($_FILES);
// ////////print_r($_POST);
// //print_r($_GET);
$pageses = $_GET["p"];
$http= (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http");
$output = "";
$outputa = array("html"=> array(),"id"=>array(),"uri"=>array(),"type"=>array(),"previewMediaId"=>array(),"postid"=>0);
$pattern = '/([A-Za-z0-9+\/=]{24,})/';

// Callback function to replace Base64 strings
function replaceBase64($matches) {
    global $uri;
    
    $decoded = base64_decode($matches[0]); // Decode the Base64 string
    
    return "sdkfhss"; // Replace with the decoded version (or custom string)
   
}

$results = getsingledata("SELECT Count(postId) from post;");
print_r($results."dsjfhksjhskdkf");
if(isset($_POST["who"])){
  $extension = pathinfo($_FILES["FILE"]['name'][0], PATHINFO_EXTENSION);
  
    if ((($_FILES["FILE"]["type"][0] == "video/mp4")
    || ($_FILES["FILE"]["type"][0] == "video/quicktime")
    || ($_FILES["FILE"]["type"][0] == "video/mov")
    || ($_FILES["FILE"]["type"][0] == "video/webm")
    || ($_FILES["FILE"]["type"][0] == "audio/mp3")
    || ($_FILES["FILE"]["type"][0] == "audio/mpeg")
    || ($_FILES["FILE"]["type"][0] == "audio/wma")
    || ($_FILES["FILE"]["type"][0] == "image/pjpeg")
    || ($_FILES["FILE"]["type"][0] == "image/png")
    || ($_FILES["FILE"]["type"][0] == "image/gif")
    || ($_FILES["FILE"]["type"][0] == "image/jpeg"))

    && ($_FILES["FILE"]["size"][0] < 2000000000)
    && in_array($extension, $allowedExts))
    {
      //////////print_r($extension);
    
      if ($_FILES["FILE"]["error"][0] > 0)
      {
        //echo "Return Code: " . $_FILES["error"] . "<br />";
        $key = $_POST["key"];
        $error = $_FILES["FILE"]["error"][0];
        //ErrorLog("there was an error uplading",$error,$key);
        //return "exd234\n"+"<p>there was an error uplading</p>"+"<p>{$error}</p>";
      }
      else
      {
        
        if(in_array($extension,$imageExt)){
          try{
              
              if (file_exists(str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Images/". $_FILES["FILE"]["name"][0]))
              {
              
                $fi = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Images/" . $_FILES["FILE"]["name"][0];
                ////echo $_FILES["name"] . " already exists. ";
                //echo $fi;
                //echo $_FILES["FILE"]["tmp_name"][$i];
                move_uploaded_file($_FILES["FILE"]["tmp_name"][0],
                $fi);
                $key = $_POST["key"];
                $finame = $_FILES["FILE"]["name"][0];
                $sqlstatement = "UPDATE `media` SET `isactive`=1 WHERE userkey = '$key' AND filename='$finame';";
                $result = $db->exec($sqlstatement);
              
                $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Images/".$_FILES["FILE"]["name"][0];
               
                
                  //array_push($outputa["id"],$_POST["blocks"][$i]["id"]);
                  //echo $new;
                  //////////print_r($new);
                  //////////print_r( $g);
                  // $doc = new DOMDocument();
                  // @$doc->loadHTML($g["raw"]);
        
                  // $tags = $doc->getElementsByTagName('img');
                  // foreach ($tags as $tag) {
                  //   $tag->setAttribute('src',$fi);
                  //   //////////print_r($tag->getAttribute('src'));
                  // }
                  // $doc->innerHTML =$tags;
                  // ////////print_r($doc->innerHTML);
                  // $img = array();
                  // foreach( $g["raw"] as $img_tag)
                  // {
                  //     preg_match_all('/(alt|title|src)=("[^"]*")/i',$img_tag, $img[$img_tag]);
                  // }

                  // ////////print_r($img);
                
                 // ////////print_r($outputa);
                $stmt = $db->query("SELECT postId 
                                    FROM post
                                    ORDER BY postId DESC 
                                    LIMIT 1;");
                $lastId = $stmt->fetchColumn();
                array_push($outputa["previewMediaId"],$lastId);
                 
                array_push($outputa["html"],"<img src=".$http."://".$uri." />");
                array_push($outputa["id"],"preview");

                array_push($outputa["uri"],$http."://".$uri);
              }
              else{
                $name = $_FILES["FILE"]["name"][0];
                $type = $_FILES["FILE"]["type"][0];
                $loc = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Images/";
                $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Images/";
                $dateregistered = date_create()->format('Y-m-d H:i:s');
                $key = $_POST["key"];



                move_uploaded_file($_FILES["FILE"]["tmp_name"][0],
                $loc. $_FILES["FILE"]["name"][0]);
                $stmt = $db->query("SELECT postId 
                FROM postId
                ORDER BY postId DESC 
                LIMIT 1;");
                $lastId = $stmt->fetchColumn();
                if(empty($lastId)){
                  $lastId = 1;
                }
                
                $cid = "preview";
                //////print_r($lastId);
                //$adi =basename($_SERVER['PHP_SELF']);
                $sqlstatement = "INSERT INTO `media`(`filename`,`type`,`filelocation`,`datecreated`,`Whoshtmlid`,`whichid`,`processingpage`,`userkey`) VALUES('$name','$type','$uri','$dateregistered','$cid','$lastId','$pageses','$key');";
                $result = $db->exec($sqlstatement);
                
               
               
                array_push($outputa["html"],"<img src=".$http."://".$uri.$name." />");
                array_push($outputa["uri"],$http."://".$uri.$name);
                array_push($outputa["id"],"preview");
                array_push($outputa["previewMediaId"],$lastId);
              
              }
          }catch(Exception $e){
            $key = $_POST["key"];
            $error = $e;
            //ErrorLog("there was an error uplading",$error,$key);
            //return "exd234\n"."<p>there was an error uplading</p>"."<p>{$e}</p>";
          }
        
        }
          
      }
    }
    

    
  
}else{
  if(isset($_FILES["FILE"]["name"])){
    for($i=0; $i < count($_FILES["FILE"]["name"]); $i++) { 
      # code...

    
      $extension = pathinfo($_FILES["FILE"]['name'][$i], PATHINFO_EXTENSION);
    
      if ((($_FILES["FILE"]["type"][$i] == "video/mp4")
      || ($_FILES["FILE"]["type"][$i] == "video/quicktime")
      || ($_FILES["FILE"]["type"][$i] == "video/mov")
      || ($_FILES["FILE"]["type"][$i] == "video/webm")
      || ($_FILES["FILE"]["type"][$i] == "audio/mp3")
      || ($_FILES["FILE"]["type"][$i] == "audio/mpeg")
      || ($_FILES["FILE"]["type"][$i] == "audio/wma")
      || ($_FILES["FILE"]["type"][$i] == "image/pjpeg")
      || ($_FILES["FILE"]["type"][$i] == "image/png")
      || ($_FILES["FILE"]["type"][$i] == "image/gif")
      || ($_FILES["FILE"]["type"][$i] == "image/jpeg"))

      && ($_FILES["FILE"]["size"][$i] < 2000000000)
      && in_array($extension, $allowedExts))
      {
        //////////print_r($extension);
      
        if ($_FILES["FILE"]["error"][$i] > 0)
        {
          //echo "Return Code: " . $_FILES["error"] . "<br />";
          $key = $_POST["key"];
          $error = $_FILES["FILE"]["error"][$i];
          //ErrorLog("there was an error uplading",$error,$key);
          //return "exd234\n"+"<p>there was an error uplading</p>"+"<p>{$error}</p>";
        }
        else
        {
          
          if(in_array($extension,$imageExt)){
              try{
                
                if (file_exists(str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Images/". $_FILES["FILE"]["name"][$i]))
                {
                
                  $fi = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Images/" . $_FILES["FILE"]["name"][$i];
                  ////echo $_FILES["name"] . " already exists. ";
                  //echo $fi;
                  //echo $_FILES["FILE"]["tmp_name"][$i];
                  move_uploaded_file($_FILES["FILE"]["tmp_name"][$i],
                  $fi);
                  $key = $_POST["key"];
                  $finame = $_FILES["FILE"]["name"][$i];
                  $sqlstatement = "UPDATE `media` SET `isactive`=1 WHERE userkey = '$key' AND filename='$finame';";
                  $result = $db->exec($sqlstatement);
                  $g = json_decode( $_POST["blocks"],true)[$i]["data"];
                  $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Images/".$_FILES["FILE"]["name"][$i];
                  //////////print_r(json_decode( $_POST["blocks"],true)[$i]["data"]);
                  if( $g["type"] == "img"){
                    
                    $test = '
                    <img src="images/image1.jpg" />
                    <img src="images/image2.jpg" />
                    <img src="images/image3.jpg" />';
                    //echo $uri;
                    // Regex pattern to match Base64 strings
                
                    // Find and replace Base64 strings
                    if(str_contains($g["raw"],"base64")){
                      // Find and replace Base64 strings
                        $output = preg_replace_callback($pattern, 'replaceBase64', $g["raw"]);
                        $output = str_replace("data:".$_FILES["FILE"]["type"][$i].";","",$output);
                        $output = str_replace("base64,","",$output);
                        $output = str_replace("sdkfhss",$http."://".$uri,$output);
                        $f = json_decode($_POST["blocks"],true);
                    
        
                        array_push($outputa["html"] ,$output);
                        array_push($outputa["id"],$f[$i]["id"]);
                        array_push($outputa["uri"],$http."://".$uri);
                        array_push($outputa["type"],$_FILES["FILE"]["type"][$i]);
                        $output = "";
                      }
                  
                    //array_push($outputa["id"],$_POST["blocks"][$i]["id"]);
                    //echo $new;
                    //////////print_r($new);
                    //////////print_r( $g);
                    // $doc = new DOMDocument();
                    // @$doc->loadHTML($g["raw"]);
          
                    // $tags = $doc->getElementsByTagName('img');
                    // foreach ($tags as $tag) {
                    //   $tag->setAttribute('src',$fi);
                    //   //////////print_r($tag->getAttribute('src'));
                    // }
                    // $doc->innerHTML =$tags;
                    // ////////print_r($doc->innerHTML);
                    // $img = array();
                    // foreach( $g["raw"] as $img_tag)
                    // {
                    //     preg_match_all('/(alt|title|src)=("[^"]*")/i',$img_tag, $img[$img_tag]);
                    // }

                    // ////////print_r($img);
                  
                    
                  }
                  
                }else{
                  $name = $_FILES["FILE"]["name"][$i];
                  $type = $_FILES["FILE"]["type"][$i];
                  $loc = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Images/";
                  $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Images/";
                  $dateregistered = date_create()->format('Y-m-d H:i:s');
                  $key = $_POST["key"];



                  move_uploaded_file($_FILES["FILE"]["tmp_name"][$i],
                  $loc. $_FILES["FILE"]["name"][$i]);
                  
                  $stmt = $db->query("SELECT postId 
                  FROM postId
                  ORDER BY postId DESC 
                  LIMIT 1;");
                  $lastId = $stmt->fetchColumn();
                  if(empty($lastId)){
                    $lastId = 1;
                  }

                  $g = json_decode( $_POST["blocks"],true)[$i]["data"];
                  $cid;
                  if( $g["type"] == "img"){
                    
                  
                    if(str_contains($g["raw"],"base64")){
                      
                      // Find and replace Base64 strings
                        $output = preg_replace_callback($pattern, 'replaceBase64', $g["raw"]);
                        $output = str_replace("data:".$_FILES["FILE"]["type"][$i].";","",$output);
                        $output = str_replace("base64,","",$output);
                        $output = str_replace("sdkfhss",$http."://".$uri.$name,$output);
                        $f = json_decode($_POST["blocks"],true);
                    
                        $cid = $f[$i]["id"];
        
                        array_push($outputa["html"] ,$output);
                        array_push($outputa["id"],$f[$i]["id"]);
                        array_push($outputa["uri"],$http."://".$uri.$name);
                        array_push($outputa["type"],$_FILES["FILE"]["type"][$i]);
                        $output = "";
                    }
                    
                  
                    
                  }
                  //$adi =basename($_SERVER['PHP_SELF']);
                $sqlstatement = "INSERT INTO `media`(`filename`,`type`,`filelocation`,`datecreated`,`Whoshtmlid`,`whichid`,`processingpage`,`userkey`) VALUES('$name','$type','$uri','$dateregistered','$cid','$lastId','$pageses','$key');";
                $result = $db->exec($sqlstatement);
                  
              
               
                
                
                }
            }catch(Exception $e){
              $key = $_POST["key"];
              $error = $e;
              //ErrorLog("there was an error uplading",$error,$key);
              //return "exd234\n"."<p>there was an error uplading</p>"."<p>{$e}</p>";
            }
          
          }else if(in_array($extension,$videoExt)){
            
            
            try{
              if (file_exists(str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Videos/" . $_FILES["FILE"]["name"][$i]))
              {
                $fi = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Videos/" . $_FILES["FILE"]["name"][$i];
              ////echo $_FILES["name"] . " already exists. ";
              move_uploaded_file($_FILES["FILE"]["tmp_name"][$i],
              $fi);
                $key = $_POST["key"];
                $finame = $_FILES["FILE"]["name"][$i];
                $sqlstatement = "UPDATE `media` SET `isactive`=1 WHERE userkey = '$key' AND filename='$finame';";
                $result = $db->exec($sqlstatement);
                
                  $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Videos/".$_FILES["FILE"]["name"][$i];
                //$r = $db->query("SELECT * FROM `sec_media` Where userkey='$key' AND isactive=;");
                $g = json_decode( $_POST["blocks"],true)[$i]["data"];
                if( $g["type"] == "video"){
                  
                  
                  if(str_contains($g["raw"],"base64")){
                    // Find and replace Base64 strings
                      $output = preg_replace_callback($pattern, 'replaceBase64', $g["raw"]);
                      $output = str_replace("data:".$_FILES["FILE"]["type"][$i].";","",$output);
                      $output = str_replace("base64,","",$output);
                      $output = str_replace("sdkfhss",$http."://".$uri,$output);
                      $f = json_decode($_POST["blocks"],true);
                  
      
                      array_push($outputa["html"] ,$output);
                      array_push($outputa["id"],$f[$i]["id"]);
                      array_push($outputa["uri"],$http."://".$uri);
                      array_push($outputa["type"],$_FILES["FILE"]["type"][$i]);
                      $output = "";
                  }
                
                  
                
                  
                }
                $isdone = true;
              }
              else
              {
                move_uploaded_file($_FILES["FILE"]["tmp_name"][$i],
              GetRootPath()."/UserFolders/".$_POST["key"]."/Videos/" . $_FILES["FILE"]["name"][$i]);
                $name = $_FILES["FILE"]["name"][$i];
                $type = $_FILES["FILE"]["type"][$i];
                $loc = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Videos/";
                $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Videos/";
                $names = explode(".",$_FILES["FILE"]["name"][$i]);
                $placeholderloc = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Placeholders/".$names[0].".png";
                $placeholderuri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Placeholders/".$names[0].".png";
                $dateregistered = date_create()->format('Y-m-d H:i:s');
                $key = $_POST["key"];
              // $placeholderimage = explode(",",$_POST["image"]);
                //$bin = base64_decode($placeholderimage[1]);

                /* Load GD resource from binary data*/
                //$im = imageCreateFromString($bin);

                /*Make sure that the GD library was able to load the image
                  This is important, because you should not miss corrupted or unsupported images*/
                // if (!$im) {
                //   die('Base64 value is not a valid image');
                // }
                /* Specify the location where you want to save the image*/
                //$img_file = $placeholderloc;

                //imagepng($im, $img_file, 0);
                $stmt = $db->query("SELECT postId 
                FROM postId
                ORDER BY postId DESC 
                LIMIT 1;");
                $lastId = $stmt->fetchColumn();
                if(empty($lastId)){
                  $lastId = 1;
                }
                  
                  $g = json_decode( $_POST["blocks"],true)[$i]["data"];
                  $cid;
                  if( $g["type"] == "video"){
                    
                  
                    if(str_contains($g["raw"],"base64")){
                      
                      // Find and replace Base64 strings
                        $output = preg_replace_callback($pattern, 'replaceBase64', $g["raw"]);
                        $output = str_replace("data:".$_FILES["FILE"]["type"][$i].";","",$output);
                        $output = str_replace("base64,","",$output);
                        $output = str_replace("sdkfhss",$http."://".$uri.$name,$output);
                        $f = json_decode($_POST["blocks"],true);
                    
                        $cid = $f[$i]["id"];
        
                        array_push($outputa["html"] ,$output);
                        array_push($outputa["id"],$f[$i]["id"]);
                        array_push($outputa["uri"],$http."://".$uri.$name);
                        array_push($outputa["type"],$_FILES["FILE"]["type"][$i]);
                        $output = "";
                    }
                    
                  
                    
                  }
                
                  //$adi =basename($_SERVER['PHP_SELF']);
                  $sqlstatement = "INSERT INTO `media`(`filename`,`type`,`filelocation`,`datecreated`,`Whoshtmlid`,`whichid`,`processingpage`,`userkey`) VALUES('$name','$type','$uri','$dateregistered','$cid','$lastId','$pageses','$key');";
                  $result = $db->exec($sqlstatement);
                ////////////print_r("sdfsdf"+ $result);
               
              }
            }catch(Exception $e){
              $key = $_POST["key"];
              $error = $e;
              //ErrorLog("there was an error uplading",$error,$key);
            // return "exd234\n"."<p>there was an error uplading</p>"."<p>{$e}</p>";
            }
          
          }else if(in_array($extension,$audioExt)){
            try{

            
              if (file_exists(str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Audios/". $_FILES["FILE"]["name"][$i]))
              {
              
              $fi = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Audios/" . $_FILES["FILE"]["name"][$i];
              
                move_uploaded_file($_FILES["FILE"]["tmp_name"][$i],
              $fi);
                $key = $_POST["key"];
                $finame = $_FILES["FILE"]["name"][$i];
                $sqlstatement = "UPDATE `media` SET `isactive`=1 WHERE userkey = '$key' AND filename='$finame';";
                $result = $db->exec($sqlstatement);
                $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Audios/".$_FILES["FILE"]["name"][$i];
                //$r = $db->query("SELECT * FROM `sec_media` Where userkey='$key' AND isactive=;");
                $g = json_decode( $_POST["blocks"],true)[$i]["data"];
                if( $g["type"] == "audio"){
                  
                  if(str_contains($g["raw"],"base64")){
                  // Find and replace Base64 strings
                    $output = preg_replace_callback($pattern, 'replaceBase64', $g["raw"]);
                    $output = str_replace("data:".$_FILES["FILE"]["type"][$i].";","",$output);
                    $output = str_replace("base64,","",$output);
                    $output = str_replace("sdkfhss",$http."://".$uri,$output);
                    $f = json_decode($_POST["blocks"],true);
                

                    array_push($outputa["html"] ,$output);
                    array_push($outputa["id"],$f[$i]["id"]);
                    array_push($outputa["uri"],$http."://".$uri);
                    array_push($outputa["type"],$_FILES["FILE"]["type"][$i]);
                    $output = "";
                  }
                  
                
                  
                }else{

                
              }
                $isdone = true;

              }
              else
              {

              
                $name = $_FILES["FILE"]["name"][$i];
                $type = $_FILES["FILE"]["type"][$i];
                $loc = str_replace("\\","/",GetRootPath())."/UserFolders/".$_POST["key"]."/Audios/";
                $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Audios/";
                $dateregistered = date_create()->format('Y-m-d H:i:s');
                $key = $_POST["key"];



                move_uploaded_file($_FILES["FILE"]["tmp_name"][$i],
                $loc. $_FILES["FILE"]["name"][$i]);


                // $sqlstatement = "INSERT INTO `media`(`filename`,`type`,`filelocation`,`datecreated`,`userkey`) VALUES('$name','$type','$uri','$dateregistered','$key');";
                // $result = $db->exec($sqlstatement);
                $uri = str_replace("\\","/",GetRootUrl())."/UserFolders/".$_POST["key"]."/Audios/".$_FILES["FILE"]["name"][$i];
                //$r = $db->query("SELECT * FROM `sec_media` Where userkey='$key' AND isactive=;");
                $stmt = $db->query("SELECT postId 
                FROM postId
                ORDER BY postId DESC 
                LIMIT 1;");
                $lastId = $stmt->fetchColumn();
                if(empty($lastId)){
                  $lastId = 1;
                }
                  
                  $g = json_decode( $_POST["blocks"],true)[$i]["data"];
                  
                  $cid;
                  if( $g["type"] == "audio"){
                    
                  
                    if(str_contains($g["raw"],"base64")){
                      
                      // Find and replace Base64 strings
                        $output = preg_replace_callback($pattern, 'replaceBase64', $g["raw"]);
                        $output = str_replace("data:".$_FILES["FILE"]["type"][$i].";","",$output);
                        $output = str_replace("base64,","",$output);
                        $output = str_replace("sdkfhss",$http."://".$uri,$output);
                        $f = json_decode($_POST["blocks"],true);
                    
                        $cid = $f[$i]["id"];
        
                        array_push($outputa["html"] ,$output);
                        array_push($outputa["id"],$f[$i]["id"]);
                        array_push($outputa["uri"],$http."://".$uri);
                        array_push($outputa["type"],$_FILES["FILE"]["type"][$i]);
                        $output = "";
                    }
                    
                  
                    
                  }
                
                  ////$adi =basename($_SERVER['PHP_SELF']);
                  ////print_r(//$adi);
                  $sqlstatement = "INSERT INTO `media`(`filename`,`type`,`filelocation`,`datecreated`,`Whoshtmlid`,`whichid`,`processingpage`,`userkey`) VALUES('$name','$type','$uri','$dateregistered','$cid','$lastId','$pageses','$key');";
                  $result = $db->exec($sqlstatement);
                $isdone = true;
              }
            }catch(Exception $e){
              $key = $_POST["key"];
              $error = $e;
              //ErrorLog("there was an error uplading",$error,$key);
              //return "exd234\n"."<p>there was an error uplading</p>"."<p>{$e}</p>";
            }
            
          }
        }
      }
      else{
        //echo "stupid";
      }

      
    }
  }
}

echo json_encode($outputa);

?>
<?php
    require_once "./config.php";
    //print_r($_GET);
    $d = json_decode($_POST["data"],true);


    array_push($d,array(["debug"]));
    // print_r($d);
    $title = "";
    $main="";
    $preview;
    $key;
    $get="";
    $textcontent="";
    $postid=0;
    $postidindex =0;
    $previewMediaId=0;
    for($i = 0; $i < count($d); $i++){
    
        if(isset($d[$i]["key"])){
            $key = $d[$i]["key"];
        }
        if(isset($d[$i]["title"])){
            $title = $d[$i]["title"];
        }
        if(isset($d[$i]["main"])){
            $main = $d[$i]["main"];
        }
        if(isset($d[$i]["textcontent"])){
            $textcontent = $d[$i]["textcontent"];
        }
        if(isset($d[$i]["html"][0])){
            $preview = $d[$i]["html"][0];
        }
        if(isset($d[$i]["get"])){
            //$get = $d[$i]["get"];
        }
        if(isset($d[$i]["previewMediaId"][0])){
            $previewMediaId = $d[$i]["previewMediaId"][0];
           
        }
        if(isset($d[$i]["postid"])){
            $postidindex = $i;
           
        }
        
    
    }
    $get = $_GET["action"];
    $id;
    $profilename ="";
    if(isset($_GET["id"]))
        $id = $_GET["id"];
    if(isset($_GET["profileimg"]))
        $profilename = $_GET["profileimg"];
    //if(isset($previewMediaId))
    //print_r($previewMediaId);
    // print_r("$get\n");
    if($get=="edit"){
        

        $stmt = $db->query("SELECT mediaId FROM `media` WHERE filename= '$profilename'");
        $lastId = $stmt->fetchColumn();
        if($profilename == "")
            $lastId =-1;
        $titles = (isset($title))? $title : "The Post";
        $dates = date('Y-m-d H:i:s');
        $sqlstatement = "UPDATE `post` SET `title`='$titles',`content`='$textcontent',`html`='$main',`datemodified`='$dates',`mediaId`=$lastId  WHERE userkey = '$key' AND postId='$id';";
        $result = $db->exec($sqlstatement);
        $d[$id]["postid"] = $id;
       
        
    }else{
        
        
        //print_r($main);
        $dates = date('Y-m-d H:i:s');
        // print_r("\n");
        // print_r($preview);
        $titles = (isset($title))? $title : "The Post";
        // $stmt = $db->query("SELECT `mediaId`
        // FROM `media`
        // where `whoshtmlid` = 'preview'
        // ORDER BY `mediaId` DESC 
        // // LIMIT 1;");
        // foreach($stmt as $v){
        //     $lastId = $v['mediaId'];
        // }
       
        if($profilename != ""){
            $stmt = $db->query("SELECT mediaId FROM `media` WHERE filename= '$profilename'");
            $lastId =(int)$stmt->fetchColumn();
        }
        else{
            $lastId =-1;
        }
   
        

   
        // $lastId = $stmt->fetchColumn();
        $sqlstatement = "INSERT INTO `post`(`title`,`content`,`html`,`datecreated`,`mediaId`,`userkey`) VALUES('$titles','$textcontent','$main','$dates',  $lastId,'$key');";
        $result = $db->exec($sqlstatement);

        $stmt = $db->query("SELECT postId 
                            FROM post
                            ORDER BY postId DESC 
                            LIMIT 1;");
        $lastId = $stmt->fetchColumn();
        $d[$postidindex]["postid"] = $lastId;
   
    }
   

    echo json_encode($d);

?>
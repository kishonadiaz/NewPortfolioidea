<?php
    require_once "./config.php";
    //print_r($_GET);
    $d = json_decode($_POST["data"],true);
    //print_r($d);
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
    //if(isset($previewMediaId))
    //print_r($previewMediaId);
    // print_r("$get\n");
    if($get=="edited"){
        $stmt = $db->query("SELECT mediaId 
        FROM media
        ORDER BY mediaId DESC 
        LIMIT 1;");
        $lastId = $stmt->fetchColumn();
        $titles = (isset($title))? $title : "The Post";
        $dates = date('Y-m-d H:i:s');
        $sqlstatement = "UPDATE `post` SET `title`='$titles',`content`='$textcontent',`html`='$main',`datecreated`='$dates',`mediaid`=$previewMediaId  WHERE userkey = '$key' AND mediaId='$lastId';";
        $result = $db->exec($sqlstatement);
        
    }else{
        
        
        //print_r($main);
        $dates = date('Y-m-d H:i:s');
        // print_r("\n");
        // print_r($preview);
        $titles = (isset($title))? $title : "The Post";
        $stmt = $db->query("SELECT `mediaId`
        FROM `media`
        where `whoshtmlid` = 'preview'
        ORDER BY `mediaId` DESC 
        LIMIT 1;");
        foreach($stmt as $v){
            $lastId = $v['mediaId'];
        }
        // $lastId = $stmt->fetchColumn();
        $sqlstatement = "INSERT INTO `post`(`title`,`content`,`html`,`datecreated`,`mediaid`,`userkey`) VALUES('$titles','$textcontent','$main','$dates',$lastId,'$key');";
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
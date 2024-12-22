<?php
    require_once "./config.php";

    $outof = ["debug"=>array()];
    array_push($outof,$_POST);
    $out = [];
    //echo json_encode($outof);
    if(isset($_POST["query"])){
        
        $data = $db->query($_POST["query"]);
        // foreach($data as $k){
        //     array_push($out,$k);
        // }
        // array_push($outof["debug"],$_POST["query"]);
        array_push($outof,$data->fetchAll(PDO::FETCH_ASSOC));
        echo json_encode($outof);
    }
   // print_r($_POST);
?>
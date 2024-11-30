<?php
    
    $dns ='mysql:host=localhost;dbname=kdb';
    // $root = 'webdevkishon';
    // $pass = '$K7139Diaz';
    $root = 'root';
    $pass = "";

    $db = new PDO($dns,$root,$pass,array(PDO::ATTR_PERSISTENT => true, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));
    //error catching mysql
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //allow buffering of muilti sqls queries
    $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
    
    if(!$db){
        echo "Error".$db->errorCode(). PHP_EOL;
    }

   
    // $makeconntion = mysqli_connect('p:localhost','root','','webdevkad');

    // if(!$makeconntion){
    //     echo "Error: Unable to connect to MySQL." . PHP_EOL;
    //     echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    //     echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    //     exit;
    // }
    require_once("./function.php");

?>
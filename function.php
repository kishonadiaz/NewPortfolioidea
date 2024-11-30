<?php 
   
    require "./config.php";
    if(!function_exists("GetRootPath"))
    {
    
        function GetRootPath(){
            $arr = [];
        
            $path = dirname(__FILE__);
        
            $arr = explode("\\",$path);
        
            foreach($arr as $key=>$value){
                
                if($key > 3){
                    print_r($key . " ".$value);
                    unset($arr[$key]);
                }
            }
            $path =  implode("\\",$arr);
            
            return $path;
   
        }
    }
    if(!function_exists("ErrorLog"))
    {
        function ErrorLog($info,$errorMessage,$key){
            $user="";
            $dateregistered = date_create()->format('Y-m-d H:i:s');
            $userq = $db->query("SELECT email from sec_user WHERE userkey='{$key}'");

            foreach($userq as $k=>$v){
                $user = $v["email"];
            }
            $sqlstatement = "INSERT INTO `sec_Log`(`information`,`errorcode`,`useremail`,`datecreated`,`userkey`) VALUES('$information','$errorMessage','$user','$dateregistered','$key');";
            $result = $db->exec($sqlstatement);
        }
    }
    if(!function_exists("GetRootUrl"))
    {
        function GetRootUrl(){
            
            $url = $_SERVER['REQUEST_URI']; //returns the current URL
            $parts = explode('/',$url);
            $dir = $_SERVER['SERVER_NAME'];
            //echo $url."asfdasdf";
            for ($i = 0; $i < count($parts) - 1; $i++) {
            
                // if($i > 2){
                //     unset($parts[$i]);
                // }
                if($i == 0){
                    $dir .= $parts[$i].":".$_SERVER['SERVER_PORT'] . "/";
                }else
                    $dir .= $parts[$i] . "/";
            }
            $parts = explode('/',$dir);
            foreach($parts as $key=>$value){
                
                if($key >= 2){
                    
                    unset($parts[$key]);
                }
                //print_r($key." value: ".$value);
            }
            //print_r($parts);
            $dir = implode("/",$parts);
            return $dir;
        }
    }
    if(!function_exists("getsingledata"))
    {
        function getsingledata($sql){
            global $db;
            $sqlstatement = $sql;
            $stmt = $db->prepare($sqlstatement);
            $stmt->execute();
            $results = $stmt->fetchAll()[0];

            return $results[0];
        }
    }
    if(!function_exists("getData"))
    {
        function getData($sql){
            global $db;
            $sqlstatement = $sql;
            $stmt = $db->prepare($sqlstatement);
            $stmt->execute();
            $results = $stmt->fetchAll();
            return $results;
        }
    }
    if(!function_exists("update"))
    {
        function update($sql){
            global $db;
            $sqlstatement = $sql;
            $stmt = $db->prepare($sqlstatement);
            $stmt->execute();
            $results = $stmt->rowCount();
            return $results;
        }
    }
    if(!function_exists("query"))
    {
        function query($sql){
            global $db;
            $v = $db->query($sql);

            return $v;
        }
    }
    if(!function_exists("postcheck"))
    {
        function postcheck(){
            global $db;
            $args = func_get_args();
            $v = "";
            $d = [];
            foreach($args as $key=>$arg){
                //echo $key, $arg;
                
                // if(strpos($args[$key], 'SELECT') !== true){
                //     echo $arg."adsfasd\n";
                //     $v=$arg;
                // }
                
                if (strpos($args[$key], 'SELECT') !== false) {
                    echo $v."\nkkkkkkk<br>";
                    $f = explode(" ",$arg);
                    print_r($f);
                    for($i=0; $i < count($f);$i++){
                        if($f[$i] =="SELECT" || $f[$i]=="FROM")
                            array_push($d,$i);
                    }
                    print_r($d);

                    $r = $db->query($arg);
                    
                    foreach($r as $k){

                    }

                }else{
                    $v = $arg;
                }
            }
            // if(isset($_POST[$what])){
            //     $r = $db->query($query);
            //     foreach($r as $k){
            //         //if($_POST[$what] == )
            //     }
            // }
        }
    }
    if(!function_exists("getAddress"))
    {
        function getAddress() {
            //https://stackoverflow.com/questions/11245963/how-to-retrieve-complete-url-from-address-bar-using-php
            $protocol ="";
            if(isset($_SERVER['HTTPS'])){
                $protocol = $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
            }
            return $protocol.'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        }
    }
    
    


?>
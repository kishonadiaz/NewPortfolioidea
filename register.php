<?php
$username ="";
$email="";
$pass="";
$vpass="";
$usernameerr = "";
$passerr = "";
$emailerr="";
$vpasserr = "";
$passcheck = false;
$emailpass =false;
$hasemail = false;
$hasusername = false;
$errorcount = 0;
$firsttime = false;

function GUID()
{
    if (function_exists('com_create_guid') === true)
    {
        return trim(com_create_guid(), '{}');
    }

    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}
// $r = getsingledata("SELECT COUNT(`role`) FROM `sec_user`;");
// if($r <= 0){
//     $sqlstatement = "INSERT INTO `sec_roles`(`rolename`,`rolelevel`,`visibility`) VALUES('root',0,false);";
//     $result = $db->exec($sqlstatement);
//     $sqlstatement = "INSERT INTO `sec_roles`(`rolename`,`rolelevel`,`visibility`) VALUES('editor',1,true);";
//     $result = $db->exec($sqlstatement);
//     $sqlstatement = "INSERT INTO `sec_roles`(`rolename`,`rolelevel`,`visibility`) VALUES('viewer',2,true);";
//     $result = $db->exec($sqlstatement);
// }            
if(isset($_POST["submit"])){
    if(isset($_POST["username"])){
        $username = $_POST["username"];
        //echo "here";
    }
    if(isset($_POST["email"])){
        $email = $_POST["email"];
        //echo "there";
    }
    if(isset($_POST["password"])){
        $pass = $_POST["password"];
        //echo "where";
    }
    if(isset($_POST["vpassword"])){
        $vpass = $_POST["vpassword"];
        //echo "hfere";
    }
}else{

}


// $pageWasRefreshed = isset($_SERVER['HTTP_CACHE_CONTROL']) && $_SERVER['HTTP_CACHE_CONTROL'] === 'max-age=0';
 
// if($pageWasRefreshed ) {
//   $vpass = "";
//   $pass = "";
// } else {
//   //do nothing;
//   if(isset($_POST["password"])){
//     $pass = $_POST["password"];
//     //echo "where";
//     }
//     if(isset($_POST["vpassword"])){
//         $vpass = $_POST["vpassword"];
//         //echo "hfere";
//     }
// }
try{
    //echo $username;
    $errorcount = 0;
   {
        if(!preg_match('/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/',$email)){
            $emailpass = false;
            $emailerr = "Not a Email";
        }else{
            $emailpass = true;
        }
        if($vpass != $pass){
           
            $passerr = "Passwords dont match";
            $vpasserr = "Password dont match";
            
            $passcheck = false;
        }
        else{
            ///print_r($vpass);
            //echo "hers ii";
            $passcheck = true;
            
        }
    }
    
    if($username != "" && $email != "" && $pass != "" && $passcheck == true && $emailpass == true){
        //echo "khere";
        $q = $db->query("SELECT `email`,`username` FROM users");
        foreach($q as $v){
            if($email == $v["email"]){
                $hasemail = true;
               
            }
            if($username == $v["username"]){
                $hasusername = true;
            }
        }
        
        if(!$hasemail && !$hasusername){
            $role = -1;
            if($r <=0){
                $role = 1;
            }else{
                $role = 2;
            }
            $dateregistered = date_create()->format('Y-m-d H:i:s');
            $passhash = crypt($pass,'$1$dekzerfges');
            $guid = GUID();
            $username = strtolower($username);
            $email = strtolower($email);
            $sqlstatement = "INSERT INTO `users`(`username`,`email`,`passwrd`,`registerdate`,`role`,`userkey`) VALUES('$username','$email','$passhash','$dateregistered',$role,'$guid');";
            $result = $db->exec($sqlstatement);
            $_POST = array();
            //print_r(GUID());
            $q = $db->query("SELECT `role`,`id` FROM users WHERE email='$email'");
            foreach($q as $v){
                if($email == $v["role"]){
                    $hasemail = true;
                
                }
                if($username == $v["id"]){
                    $hasusername = true;
                }
            }
            
            if (!mkdir("./UserFolders/".$guid, 0777, true)) {
                //die('Failed to create directories...');
                echo "failed to make dir";
            }
            
            header("Location: index.php?link=login");

        }else{
            //echo "herrrsssss";
            $url = "";
            if($hasemail){
                $errorcount++;
                //header("Location: ?error=email");
                $url = "?action=register&error=email";
                if($errorcount == 1 && $hasemail){
                    
                }else if($errorcount >=2 && $hasemail){
                    $url = "&error2=email";
                }
                $emailerr = "Email Already Exists";
                
            }
            
            if($hasusername){
                $errorcount++;
                if($errorcount == 1 && $hasusername){
                    $url .= "?action=register&error=username";
                }else if($errorcount >=2 && $hasusername){
                    $url .= "&error=username";
                }
                $usernameerr = "Username Already Exists";
            }
            //header("Location:  $url");
            //echo "h".$errorcount;
        }
        
        
    }else{
        if($firsttime){
            if($username == ""){
                $usernameerr = "Can not be empty";
            }
            if($email == ""){
                $emailerr = "can not be empty";
            }
            if($pass == ""){
                $passerr = "Can not be empty";
            }
            if($vpass == ""){
                $vpasserr = "Can not be empty";
            }
        }
        //echo "sfdsfsdf";
    }
//echo print_r("h".$result);
}catch(PDOException $e){
    echo $e->getMessage();
}
$_POST = array();

?>


<div class="registercont">
    <p>Please Register</p>
    <div class="registerwrapper">
    
        <form id="registerform" action="" method="post" onsubmit="return submiting()"  novalidate>
            <div class="inputcont">
                <label for="">User Name</label>
                <input name="username" type="text" placeholder="UserName" value="<?php echo $username?>" >
                <span><?php echo $usernameerr;?></span>
            </div>
            <div class="inputcont">
                <label for="">Email</label>
                <input name="email" type="email" placeholder="Email" value="<?php echo $email?>" >
                <span><?php echo $emailerr;?></span>
            </div>
            <div class="inputcont">
                <label for="">Password</label>
                <input name="password" type="password" placeholder="Password" >
                <span><?php echo $passerr;?></span>
            </div>
            <div class="inputcont">
                <label for="">Verify Password</label>
                <input name="vpassword" type="password" placeholder="Password" >
                <span><?php echo $vpasserr;?></span>
            </div>
            <input name="submit" id="submit" type="submit" value="submit">
        </form>
    </div>

</div>

<script>
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
</script>
<script>
    function submiting(){
        
        let registerform = document.querySelector("#registerform");
        var f = registerform.querySelectorAll("[name]");
        console.log(f);
        var pass = "";
        var vpass = "";
        var ispass = false;
        var isboth =false;
        var inputs ={};
        for(var i of f){
            inputs[i.name]= i;
            // if(i.value === "" || i.value === " "){
            //     i.classList.add("notvaild");
            // }else{
            //     i.classList.remove("notvaild");
            // }
            
            // //console.log(String(i.value).match(/e/))
            // if(i.getAttribute("type") === "email"){
                
            //     if(!i.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)){
            //         i.classList.add("notvaild");
            //         //"sds");
            //     }else{
            //         i.classList.remove("notvaild");
            //     }
            // }
            // if(i.getAttribute("type")=== "password"){
            //     if(i.name === "password"){
            //         pass= i.value;
            //     }
            //     if(i.name === "vpassword"){
            //         vpass = i.value;
            //     }

            //     if(pass != vpass){
            //         console.log(i,"shkjhsdf");
            //         i.classList.add("notvaild");
            //     }else{
            //         i.classList.remove("notvaild");
            //     }
            // }
        }
        for(var [key,i] of Object.entries(inputs)){
            console.log(i);
            if(i.value == "" || i.value == " "){
                i.classList.add("notvaild");
                ispass =false;
            }else{
                i.classList.remove("notvaild");
                ispass = true;
            }
            if(key === "password"){
                pass = i.value;
            } 
            if(key === "vpassword"){
                vpass = i.value;
            }
            if(i.type === "password"){
                // console.log()
                // if(pass != vpass){
                //     ispass =false;
                //     i.setAttribute("data-is",false);
                // }else{
                //     ispass = true;
                //     i.setAttribute("data-is",true);
                    
                // }
            
                // if(i.value == "" || i.value == " "){
                //     i.classList.add("notvaild");
                    
                // }
                if(i.getAttribute("data-is") === "false"){
                    i.classList.add("notvaild");
                }else if(i.getAttribute("data-is") === "true"){
                    i.classList.remove("notvaild");
                    break;
                }
            }
        }
        if(inputs["password"].value != inputs["vpassword"].value && inputs["password"].value == "" || inputs["vpassword"].value == ""){
            //"asfasdf");
            inputs["password"].classList.add("notvaild");  
            inputs["vpassword"].classList.add("notvaild");
            isboth = false;
        }else{
            inputs["password"].classList.remove("notvaild");  
            inputs["vpassword"].classList.remove("notvaild");
            isboth = true;
        }
        if(ispass == true && isboth == true){
            
            return true;
        }
        // if(ispass == false){
        //     inputs["password"].classList.add("notvaild");
        //     inputs["vpassword"].classList.add("notvaild");
        // }else{
        //     inputs["password"].classList.remove("notvaild");
        //     inputs["vpassword"].classList.remove("notvaild");
        // }
        return false;
    }
    // let registerform = document.querySelector("#registerform");
    // if(registerform){
    //     registerform.addEventListener("submit",(e)=>{
    //         e.preventDefault();
    //         return true;
    //     });
    // }
</script>
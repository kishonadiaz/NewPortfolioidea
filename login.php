<?php 
    
    $uservaild = false;
    $passvaild = false;
    $uservalemailval = "";
    $emailusererrormessage = "";
    $passwroderrormessage = "";
    $emailorusername = "";
    $pass = "";
    $userid;
    $post;
    $userkey="";
    // session_start();
    
    //print_r(session_is_registered("secret45"));
    // require "config.php";
    
    if(isset($_POST["submit"])){
       
        if(isset($_POST["emailorusername"])){
            $emailorusername = $_POST["emailorusername"];
        }
        if(isset($_POST["pass"])){
            $pass = $_POST["pass"];
        }
    }

    $r = $db->query("SELECT `id`,`username`,`email`,`passwrd`,`userkey` FROM `users`;");
    if(!preg_match('/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/',$emailorusername)){
       // print_r($emailorusername."ddd");
        if($emailorusername !== ""){
            // echo "not";
            $uservalemailval = "username";
            foreach($r as $val){
                //echo $val["username"];
                if(strtolower($emailorusername) == strtolower($val["username"])){
                    $uservaild = true;
                    break;
                }else{
                    $emailusererrormessage = "No username found";
                }
            }

        }
        
    }else{
        //echo $emailorusername;
        if($emailorusername !== ""){
            //echo "is";
            $uservalemailval = "email";
            //$r = $db->query("SELECT `email` FROM `mk_user`;");
            foreach($r as $val){
                if(strtolower($emailorusername) == strtolower($val["email"])){
                    $uservaild = true;
                    break;
                }else{
                    $emailusererrormessage = "No Email Found";
                }
            }
        }
        
    }
    // echo $pass;
    if($pass != ""){
        //print_r($uservalemailval."d");
        if($uservalemailval == "email")
            $r = $db->query("SELECT `id`,`passwrd`,`userkey` FROM `users` WHERE `email`='$emailorusername';");
        else if($uservalemailval == "username")
            $r = $db->query("SELECT `id`,`passwrd`,`userkey` FROM `users` WHERE `username`='$emailorusername';");
        foreach($r as $val){
            //TODO::check encypted hash later
            // echo $val["id"]."sdjfgh";
            $userid = $val["id"];
            $userkey = $val["userkey"];
            ///if(password_verify($val["passwrd"],))
            // echo $val["passwrd"]."\n";
            // echo (crypt($pass,"/&PDE234/"));
            //print_r($val);
            if(password_verify($pass,$val["passwrd"] )){
                $passvaild = true;
            }else{
                $passwroderrormessage="Incorrect Password!";
            }
 
        }
    }
    $results = getsingledata("SELECT COUNT(`email`) FROM `users`;");
   

    
    if($results ==0){
        require("register.php");
    }else{
       // echo "here";
        if(isset($_GET["action"])){
            $l = trim($_GET["action"]);
            $l = strtolower($l);
            //echo "jjj";
            if($l == "register")
            include("$l.php");        
        }else{
            //echo print_r($uservaild." ok");
            if($uservaild && $passvaild){
                $_SESSION['timestamp'] = time();
                $_SESSION['logged_in'] = "true";
                $_SESSION['editmode'] = "true";
                $_SESSION['userkey'] = $userkey;
                $_SESSION['userid'] =$userid;

                // echo $_SESSION["userid"];
                // echo session_id();
                ob_start(); // Start output buffering

                header("Location: index.php?link=pages/admin");

                ob_end_flush(); // Send the buffered output including the modified header
            }else{

?>


<div class="logcontainer">
    <div class="loginwrapper">
            
            <form action="" method="post">
                <div class="emailusernamecont">
                    <label for="emailorusername">Email</label>
                    <input name="emailorusername" type="text" placeholder="Email or Username" >
                    <span id="loginemailerror" class="errormes"><?php echo $emailusererrormessage;?></span>
                </div>
                <div class="passwordcont">
                    <label for="pass">Password</label>
                    <input name="pass" type="password" placeholder="Password">
                    <span id="loginpasserror"class="errormes"><?php echo $passwroderrormessage;?></span>
                </div>
                <!-- <input type="hidden" name="randcheck" value="<?php echo $rand;?>"> -->
                <input name="submit" id="submit" type="submit" value="Submit">
                
            </form>
            
    </div>
    <span>If you do not have an account please <a href="?action=register">Register</a> .</span>
</div>
<script>
    if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
    }
</script>
<?php
            }
        }
    }
?>
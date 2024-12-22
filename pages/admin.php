<?php
    require_once 'config.php';
    //echo $_SESSION["userkey"];
    function dir_size($directory) {

        $size = 0;

        foreach(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file){

            $size += $file->getSize();

        }

        return $size;

    }

    function dir_count($f){

        //echo $f;

        $folderPath = $f;

        // Returns array of files

        $files1 = scandir($folderPath);

        

        // Count number of files and store them to variable

        $num_files = count($files1) - 2;

        

        //echo $num_files . " files";

        return $num_files;

        ///print_r($countFile);

    }

    function Size($path, $recursive = true)

{

    $result = 0;



    if (is_dir($path) === true)

    {

        $path = Path($path);

        $files = array_diff(scandir($path), array('.', '..'));



        foreach ($files as $file)

        {

            if (is_dir($path . $file) === true)

            {

                $result += ($recursive === true) ? Size($path . $file, $recursive) : 0;

            }



            else if (is_file() === true)

            {

                $result += sprintf('%u', filesize($path . $file));

            }

        }

    }



    else if (is_file($path) === true)

    {

        $result += sprintf('%u', filesize($path));

    }



    return $result;

}



function Path($path)

{

    if (file_exists($path) === true)

    {

        $path = rtrim(str_replace('\\', '/', realpath($path)), '/');



        if (is_dir($path) === true)

        {

            $path .= '/';

        }



        return $path;

    }



    return false;

}

    $key = $_SESSION["userkey"];

    $userid = $_SESSION["userid"];



    $r = $db->query("SELECT * FROM `users` WHERE userkey='$key'");

    $direct = "./UserFolders/".$key;

    if(is_dir($direct)){

        //echo "Folder Exsists";

        //print_r(dir_size("$key"));

        if(dir_count($direct) <=0){

            if (!mkdir($direct."/Videos", 0777, true)) {

                die('Failed to create directories...');

            }

            if (!mkdir($direct."/Images", 0777, true)) {

                die('Failed to create directories...');

            }

            if (!mkdir($direct."/Audios", 0777, true)) {

                die('Failed to create directories...');

            }

            if (!mkdir($direct."/Placeholders", 0777, true)) {

                die('Failed to create directories...');

            }
        }
    }
?>
<style>
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  /* position: absolute; */
  height: 100%;
  overflow: auto;
  display: flex;
  float: left;
  flex-direction: column;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
 
.sidebar a.active {
  background-color: #04AA6D;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.contents {
  /* margin-left: 200px; */
  padding: 1px 16px;
  height: 1000px;
  margin: auto;
  /* clear: both; */
  display: flex;
  flex-direction: column;
  overflow:auto;
}
#datatable th {
    border-style:unset;
}
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.php"><i class="fa-solid fa-angle-left"></i> Kishon Diaz</a>
  </div>
</nav>
<div class="sidebar">
  <a class="active" href="?link=pages/admin&menu=dashboard">Home</a>
  <a href="?link=pages/admin&menu=posttable">Post</a>
</div>

<div class="contents table-responsive-sm col-7">
    <?php if(isset($_GET["menu"])) : 
            if($_GET["menu"] == "posttable") : ?>
                <table id="datatable" class="table">
                <thead id="contenttblheader" class="table-dark">
                    <th scope="row" colspan="2" class="d-flex justify-content-end" ><a class="btn text-white" href="?link=pages/adminstuff/post&action=new"> New Post</a></th>
                </thead>
                <tbody id="contenttbl">

                </tbody>
                </table>
    <?php 
            endif; 

        endif;?>
</div>

<script type="module" src="./pages/adminmenu.js"></script>

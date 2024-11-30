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
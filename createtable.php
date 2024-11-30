<?php
    $sqlstatment = 'Use kdb';
    $db->exec($sqlstatment);
    $sqlstatment = "SET FOREIGN_KEY_CHECKS=0";
    $db->exec($sqlstatment);

    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `users` ( `id` INT NOT NULL AUTO_INCREMENT ,
        `fname` VARCHAR(32) ,
        `mname` VARCHAR(32) ,
        `lname` VARCHAR(32) ,
        `username` VARCHAR(64) NOT NULL,
        `email` VARCHAR(100) NOT NULL ,
        `passwrd` VARCHAR(100) NOT NULL ,
        `isactive` BOOLEAN NOT NULL DEFAULT 1,
        `isprivate` BOOLEAN Not NUll DEFAULT 0,
        `lastlogin` DATETIME ,
        `registerdate` DATETIME,
        `profiletitle` VARCHAR(52)  ,
        `profiletext` TEXT ,
        `profileimg` TEXT  ,
        `rolename` VARCHAR(52) ,
        `role` int,
        `userkey` VARCHAR(100) UNIQUE  NOT NULL,
        PRIMARY KEY (`id`)) ENGINE = InnoDB;
    ';
    $db->exec($sqlstatment);
    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `project`(`projectId` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(100) NOT NULL,
        `discription` Text,
        `html` TEXT,
        `ptypeid` int,
        `hasmedia` BOOLEAN DEFAULT 1,
        `datecreated` DATE,
        `datemodified` DATE,
        `projectimgloc` text,
        `isactive` boolean NOT NULL DEFAULT 1,
        `mediaid` int,
        `userkey` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`projectId`),
        FOREIGN KEY (`userkey`) REFERENCES users(`userkey`),
        FOREIGN KEY (`mediaid`) REFERENCES media(`mediaid`))';
    $db->exec($sqlstatment);
    $db->exec($sqlstatment);
    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `page`(`pageId` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(100) NOT NULL,
        `content` Text,
        `html` TEXT,
        `hasmedia` BOOLEAN DEFAULT 1,
        `datecreated` DATE,
        `datemodified` DATE,
        `pageimgloc` text,
        `isactive` boolean NOT NULL DEFAULT 1,
        `mediaid` int,
        `projectid` int,
        `userkey` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`pageId`),
        FOREIGN KEY (`userkey`) REFERENCES users(`userkey`),
        FOREIGN KEY (`projectid`) REFERENCES project(`projectid`),
        FOREIGN KEY (`mediaid`) REFERENCES media(`mediaid`))';
    $db->exec($sqlstatment);
    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `post`(`postId` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(100) NOT NULL,
        `content` Text,
        `html` TEXT,
        `hasmedia` BOOLEAN DEFAULT 1,
        `datecreated` DATE,
        `datemodified` DATE,
        `isactive` boolean NOT NULL DEFAULT 1,
        `mediaid` int,
        `pageid` int , 
        `userkey` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`postId`),
        FOREIGN KEY (`userkey`) REFERENCES users(`userkey`),
        FOREIGN KEY (`pageid`) REFERENCES page(`pageid`),
        FOREIGN KEY (`mediaid`) REFERENCES media(`mediaid`))';
    $db->exec($sqlstatment);

    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `ptype`(`ptypeId` INT NOT NULL AUTO_INCREMENT,
        `typename` varchar(100),
        `description` text,
        PRIMARY KEY (`ptypeId`))';
    $db->exec($sqlstatment);
    // $sqlstatment = 'CREATE TABLE IF NOT EXISTS `comments`(`commentid` INT NOT NULL AUTO_INCREMENT,
    // `title` VARCHAR(100),
    // `message` TEXT ,
    // `parentid` int NOT NULL,
    // `fromuser` VARCHAR(100) ,
    // `userkey` VARCHAR(100) NOT NULL,
    // PRIMARY KEY (`commentid`),
    // FOREIGN KEY (`userkey`) REFERENCES sec_user(`userkey`),
    // FOREIGN KEY (`parentid`) REFERENCES sec_comments(`commentid`))';
    // $db->exec($sqlstatment);
    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `media`(`mediaId` INT NOT NULL AUTO_INCREMENT,
        `filename` VARCHAR(100) NOT NULL,
        `type` VARCHAR(100) NOT NULL,
        `filelocation` VARCHAR(200) NOT NULL,
        `datecreated` DATE,
        `datemodified` DATE,
        `isactive` boolean DEFAULT 1,
        `placeholderimage` longtext,
        `whoshtmlid` varchar(100),
        `whichtable` varchar(100),
        `mediajId` int,
        `whichid` int,
        `processingpage` varchar(100),
        `userkey` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`mediaId`),
        FOREIGN KEY (`mediajId`) REFERENCES mejointable(`mjId`),
        FOREIGN KEY (`userkey`) REFERENCES users(`userkey`))';
    $db->exec($sqlstatment);
    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `mejointable`(`mjId` INT NOT NULL AUTO_INCREMENT,
        `mediaId` int,
        `projectId` int,
        `pageId`int,
        `postId`int,
        `userId`int,
        PRIMARY KEY (`mjId`),
        FOREIGN KEY (`mediaid`) REFERENCES media(`mediaid`),
        FOREIGN KEY (`pageid`) REFERENCES page(`pageid`),
        FOREIGN KEY (`projectid`) REFERENCES project(`projectid`),
        FOREIGN KEY (`postId`) REFERENCES post(`postId`),
        FOREIGN KEY (`userId`) REFERENCES users(`id`))';

    $db->exec($sqlstatment);
    

    // $sqlstatment = 'CREATE TABLE IF NOT EXISTS `roles`(`roleid` INT NOT NULL AUTO_INCREMENT,
    // `rolename` VARCHAR(100) NOT NULL,
    // `rolelevel` int NOT NULL,
    // `visibility` boolean NOT NULL,
    //  PRIMARY KEY (`roleid`) 
    // )';
    // $db->exec($sqlstatment);
    // $sqlstatment = 'CREATE TABLE IF NOT EXISTS `userinrole`(`userinroleid` INT NOT NULL AUTO_INCREMENT,
    // `roleid` int NOT NULL,
    // `userid` int NOT NULL,
    //  PRIMARY KEY (`userinroleid`),
    //  FOREIGN KEY (`userid`) REFERENCES sec_user(`id`),
    //  FOREIGN KEY (`roleid`) REFERENCES sec_roles(`roleid`)
    // )';
    $db->exec($sqlstatment);
    $sqlstatment = 'CREATE TABLE IF NOT EXISTS `Log`(`logid` INT NOT NULL AUTO_INCREMENT,
    `information` text NOT NULL,
    `errorcode` text NOT NULL,
    `useremail` varchar(100),
    `datecreated` DATE,
    `userkey` varchar(100) Not Null,
     PRIMARY KEY (`logid`),
     FOREIGN KEY (`userkey`) REFERENCES users(`userkey`)
    )';
    $db->exec($sqlstatment);



?>
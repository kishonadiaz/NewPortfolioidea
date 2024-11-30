-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 30, 2024 at 03:44 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kdb`
--
CREATE DATABASE IF NOT EXISTS `kdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `kdb`;

-- --------------------------------------------------------

--
-- Table structure for table `last_updated`
--

CREATE TABLE `last_updated` (
  `last_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `logid` int NOT NULL,
  `information` text NOT NULL,
  `errorcode` text NOT NULL,
  `useremail` varchar(100) DEFAULT NULL,
  `datecreated` date DEFAULT NULL,
  `userkey` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `mediaId` int NOT NULL,
  `filename` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `filelocation` varchar(200) NOT NULL,
  `datecreated` date DEFAULT NULL,
  `datemodified` date DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `placeholderimage` longtext,
  `Whoshtmlid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mediajId` int DEFAULT NULL,
  `whichid` int DEFAULT NULL,
  `processingpage` varchar(100) DEFAULT NULL,
  `userkey` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mejointable`
--

CREATE TABLE `mejointable` (
  `mjId` int NOT NULL,
  `mediaId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `pageId` int DEFAULT NULL,
  `postId` int DEFAULT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `pageId` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text,
  `html` text,
  `hasmedia` tinyint(1) DEFAULT '1',
  `datecreated` date DEFAULT NULL,
  `datemodified` date DEFAULT NULL,
  `pageimgloc` text,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `mediaid` int DEFAULT NULL,
  `projectid` int DEFAULT NULL,
  `userkey` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `postId` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text,
  `html` text,
  `hasmedia` tinyint(1) DEFAULT '1',
  `datecreated` date DEFAULT NULL,
  `datemodified` date DEFAULT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `mediaid` int DEFAULT NULL,
  `pageid` int DEFAULT NULL,
  `userkey` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`postId`, `title`, `content`, `html`, `hasmedia`, `datecreated`, `datemodified`, `isactive`, `mediaid`, `pageid`, `userkey`) VALUES
(1, 'sdfsdfsf', '', '', 1, '2024-11-29', NULL, 1, 0, NULL, '9F8FAE02-A9E5-4453-93DF-62370DFB2371');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `projectId` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `discription` text,
  `html` text,
  `ptypeid` int DEFAULT NULL,
  `hasmedia` tinyint(1) DEFAULT '1',
  `datecreated` date DEFAULT NULL,
  `datemodified` date DEFAULT NULL,
  `projectimgloc` text,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `mediaid` int DEFAULT NULL,
  `userkey` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ptype`
--

CREATE TABLE `ptype` (
  `ptypeId` int NOT NULL,
  `typename` varchar(100) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fname` varchar(32) DEFAULT NULL,
  `mname` varchar(32) DEFAULT NULL,
  `lname` varchar(32) DEFAULT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwrd` varchar(100) NOT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  `isprivate` tinyint(1) NOT NULL DEFAULT '0',
  `lastlogin` datetime DEFAULT NULL,
  `registerdate` datetime DEFAULT NULL,
  `profiletitle` varchar(52) DEFAULT NULL,
  `profiletext` text,
  `profileimg` text,
  `rolename` varchar(52) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `userkey` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `mname`, `lname`, `username`, `email`, `passwrd`, `isactive`, `isprivate`, `lastlogin`, `registerdate`, `profiletitle`, `profiletext`, `profileimg`, `rolename`, `role`, `userkey`) VALUES
(1, NULL, NULL, NULL, 'simplecast', 'simplecastic@gmail.com', '$1$dekzerfg$WMyi5ps1nFIObAsl22PoA0', 1, 0, NULL, '2024-11-24 12:35:00', NULL, NULL, NULL, NULL, 2, '9F8FAE02-A9E5-4453-93DF-62370DFB2371');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`logid`),
  ADD KEY `userkey` (`userkey`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`mediaId`),
  ADD KEY `mediajId` (`mediajId`),
  ADD KEY `userkey` (`userkey`);

--
-- Indexes for table `mejointable`
--
ALTER TABLE `mejointable`
  ADD PRIMARY KEY (`mjId`),
  ADD KEY `mediaId` (`mediaId`),
  ADD KEY `pageId` (`pageId`),
  ADD KEY `projectId` (`projectId`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`pageId`),
  ADD KEY `userkey` (`userkey`),
  ADD KEY `projectid` (`projectid`),
  ADD KEY `mediaid` (`mediaid`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `userkey` (`userkey`),
  ADD KEY `pageid` (`pageid`),
  ADD KEY `mediaid` (`mediaid`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectId`),
  ADD KEY `userkey` (`userkey`),
  ADD KEY `mediaid` (`mediaid`);

--
-- Indexes for table `ptype`
--
ALTER TABLE `ptype`
  ADD PRIMARY KEY (`ptypeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userkey` (`userkey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `logid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `mediaId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mejointable`
--
ALTER TABLE `mejointable`
  MODIFY `mjId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `pageId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `projectId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ptype`
--
ALTER TABLE `ptype`
  MODIFY `ptypeId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`userkey`) REFERENCES `users` (`userkey`);

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`mediajId`) REFERENCES `mejointable` (`mjId`),
  ADD CONSTRAINT `media_ibfk_2` FOREIGN KEY (`userkey`) REFERENCES `users` (`userkey`);

--
-- Constraints for table `mejointable`
--
ALTER TABLE `mejointable`
  ADD CONSTRAINT `mejointable_ibfk_1` FOREIGN KEY (`mediaId`) REFERENCES `media` (`mediaId`),
  ADD CONSTRAINT `mejointable_ibfk_2` FOREIGN KEY (`pageId`) REFERENCES `page` (`pageId`),
  ADD CONSTRAINT `mejointable_ibfk_3` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
  ADD CONSTRAINT `mejointable_ibfk_4` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`),
  ADD CONSTRAINT `mejointable_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `page_ibfk_1` FOREIGN KEY (`userkey`) REFERENCES `users` (`userkey`),
  ADD CONSTRAINT `page_ibfk_2` FOREIGN KEY (`projectid`) REFERENCES `project` (`projectId`),
  ADD CONSTRAINT `page_ibfk_3` FOREIGN KEY (`mediaid`) REFERENCES `media` (`mediaid`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userkey`) REFERENCES `users` (`userkey`),
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`pageid`) REFERENCES `page` (`pageId`),
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`mediaid`) REFERENCES `media` (`mediaid`);

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`userkey`) REFERENCES `users` (`userkey`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`mediaid`) REFERENCES `media` (`mediaid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

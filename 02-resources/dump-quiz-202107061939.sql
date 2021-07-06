-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for osx10.14 (x86_64)
--
-- Host: localhost    Database: quiz
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `answer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` int(10) unsigned NOT NULL,
  `is_correct` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `fk_answer_question_id` (`question_id`),
  CONSTRAINT `answer_FK` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,'pair',1,1),(2,'liar',1,1),(3,'Serbia',2,1),(4,'RS',3,1),(5,'CZ',3,0),(6,'RU',3,0),(7,'160',4,1),(8,'166',4,0),(9,'22',4,0),(10,'40',4,0),(11,'3',4,0),(12,'DZ',5,0),(13,'MT',5,1),(14,'AL',5,0),(15,'BT',6,1),(16,'AI',6,0),(17,'DZ',6,0),(18,'Albania',7,1),(19,'Algeria',8,1),(20,'CO',9,1),(21,'SE',9,0),(22,'CA',9,0),(23,'45',10,1),(24,'25',10,0),(25,'50',10,0),(26,'40',10,0),(29,'bar',11,1),(30,'track',11,1),(31,'cat',11,1),(32,'car',11,1),(33,'France',12,1),(34,'FR',13,1),(35,'US',13,0),(36,'RU',13,0),(37,'4',14,1),(38,'2',14,0),(39,'3',14,0),(40,'6',14,0),(41,'8',14,0),(42,'44',15,1),(43,'22',15,0),(44,'0',15,0),(45,'5',15,0),(46,'Australia',16,1),(47,'EE',17,1),(48,'FK',17,0),(49,'FJ',17,0);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer_explanation`
--

DROP TABLE IF EXISTS `answer_explanation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer_explanation` (
  `answer_explanation` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `fk_answer_explanation_question_id` (`question_id`) USING BTREE,
  CONSTRAINT `answer_explanation_FK` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_explanation`
--

LOCK TABLES `answer_explanation` WRITE;
/*!40000 ALTER TABLE `answer_explanation` DISABLE KEYS */;
INSERT INTO `answer_explanation` VALUES ('pair, liar',1),('Serbia',2),('Red, blue and white',3),('160',4),('malta',5),('bhutan',6),('Albania',7),('Algeria',8),('Colombia',9),('45',10),('Longest word is: track',11),('Horizontal: Blue, White, Red',12),('France',13),('4',14),('It\'s 44',15),('Australia',16),('Estonia',17);
/*!40000 ALTER TABLE `answer_explanation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_timer` int(11) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'WORD_GUESS',60),(2,'COUNTRY_GUESS',10),(3,'FLAG_GUESS',10),(4,'MATH_GUESS',30);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `question_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `fk_question_category_id` (`category_id`),
  CONSTRAINT `question_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'uiyljqjpar',1),(2,'RS',2),(3,'Serbia',3),(4,'80 * 2',4),(5,'Malta',3),(6,'Bhutan',3),(7,'AL',2),(8,'DZ',2),(9,'Colombia',3),(10,'5*9',4),(11,'hbarcqvtzk',1),(12,'FR',2),(13,'France',3),(14,'2*2',4),(15,'22*2',4),(16,'AU',2),(17,'Estonia',3);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'vsimonovski','$2b$11$VYB8B7ewUo7e79mDtBrHUeY.Uzz8h17r75SR662EWe7YFChekrORa',0),(4,'vsimonovski2','$2b$11$J8qadOF7Kr9Ts9.2kBERQuS1GnBW2Eje8g1dFp0FspKwamwy0.uT2',0),(6,'vsimonovski3','$2b$11$p98Qgj8yAtVkC7EiMme0v.wMOJoJLYFrKArYXBcy6XasYG5LnM2Yi',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'quiz'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-06 19:39:45

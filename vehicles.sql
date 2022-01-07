-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: vehicle_rent
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blacklist`
--

DROP TABLE IF EXISTS `blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklist`
--

LOCK TABLES `blacklist` WRITE;
/*!40000 ALTER TABLE `blacklist` DISABLE KEYS */;
INSERT INTO `blacklist` VALUES (4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDYxNDA3MSwiZXhwIjoxNjQwNjE0MzcxLCJpc3MiOiJmYWphciJ9.mKdfeN_TayR30sm6KUgQGx0uoXxCw3GV9G-dQR8YWb4'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDYxNjM0NywiZXhwIjoxNjQwNjE2NjQ3LCJpc3MiOiJmYWphciJ9._1kHZp9gA7Y1wKHQ-mEhgNTuC9B-A9nLO19N2gRPsrs'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDYxNjM0NywiZXhwIjoxNjQwNjE2NjQ3LCJpc3MiOiJmYWphciJ9._1kHZp9gA7Y1wKHQ-mEhgNTuC9B-A9nLO19N2gRPsrs'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDYxNjcwMCwiZXhwIjoxNjQwNjE3MDAwLCJpc3MiOiJmYWphciJ9.gR9eJQu9HBTyI16Oim6aKIAM_NZd7-u8DBEDzXSgbow'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjE3NjA0LCJleHAiOjE2NDA2MTc5MDQsImlzcyI6ImZhamFyIn0.J88iDGPf7VmDhvhlYqyvxrNK1Mk0zXwXGWSmeo3utrM'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjE4NjQwLCJleHAiOjE2NDA2MTg5NDAsImlzcyI6ImZhamFyIn0.KxHirCpscsiGvrjLocK4XFuHV4JZDPqng4py8naBaPA'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjE5MjY2LCJleHAiOjE2NDA2MTk1NjYsImlzcyI6ImZhamFyIn0.WFI5EOy0LXw2R3vSJ6brqjTyPOEQ7UHeIAsWNAh0uBU'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjE5NjQzLCJleHAiOjE2NDA2MTk5NDMsImlzcyI6ImZhamFyIn0.SHpcbiw6AlJ5r2cjwNeKglWDFXo4hRAVcR5r9RSTBfE'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIwODk2LCJleHAiOjE2NDA2MjExOTYsImlzcyI6ImZhamFyIn0.HhFaFHJ7DYAmSOq7bMTcVpjhzYyzv2mctPDaZ_bRPz4'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIyODcyLCJleHAiOjE2NDA2MjMxNzIsImlzcyI6ImZhamFyIn0.rERtI_6UmfzTzp1SsF-rHhJ4ODwMTnL6R-36-iTCDo8'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIyODcyLCJleHAiOjE2NDA2MjMxNzIsImlzcyI6ImZhamFyIn0.rERtI_6UmfzTzp1SsF-rHhJ4ODwMTnL6R-36-iTCDo8'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIyOTE2LCJleHAiOjE2NDA2MjMyMTYsImlzcyI6ImZhamFyIn0.m5SDPaYFtXPHYqhpMpVrbrfNJGz8cspKe_KX6lGlEKU'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIzMDk2LCJleHAiOjE2NDA2MjMzOTYsImlzcyI6ImZhamFyIn0.Z_zjDbg0NRoZLZovC5jNt2qz8srl6VjbjExi93eStrU'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIzMTg3LCJleHAiOjE2NDA2MjM0ODcsImlzcyI6ImZhamFyIn0.pHYs5J2Ws_3EKIdwcCYGkoB6iMOsGw7HYd4m1lV5SKA'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjIzMzI1LCJleHAiOjE2NDA2MjM2MjUsImlzcyI6ImZhamFyIn0.EA9w5CLjLL9iJp6RTlr0-Tta2VFMIHSoxgqcuGtlPUs'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDY1NjcyOCwiZXhwIjoxNjQwNjU3MDI4LCJpc3MiOiJmYWphciJ9.GY91k_23L93G9wIHMiAlvu3bi4ViXm015FwxVoOBBhE'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDY2MjIxNywiZXhwIjoxNjQwNjYyNTE3LCJpc3MiOiJmYWphciJ9.hcemI9Z60BFbubpRziiz3Oregy0xKI66oeAOWeEoyck'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjYyMjk5LCJleHAiOjE2NDA2NjI1OTksImlzcyI6ImZhamFyIn0.l73k3utqoSrD8H_qZuJMgCLU80ykIxUvquPlAz_aBUs'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoidXNlcjJAZW1haWwuY29tIiwicm9sZXMiOiIzIiwiaWF0IjoxNjQwNjY3NDU5LCJleHAiOjE2NDA2Njc3NTksImlzcyI6ImZhamFyIn0.2PR9-wuud46xWeOqoD5pXxDidrkeAPmb-W7Njsa6hIY'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjY3NTk3LCJleHAiOjE2NDA2Njc4OTcsImlzcyI6ImZhamFyIn0.8MY7W_6uZOubiY5QAsrQvmChvo3SwynzXz1pOSlNB9Y'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJyb2xlcyI6IjMiLCJpYXQiOjE2NDA2NzUwMDgsImV4cCI6MTY0MDY3NTMwOCwiaXNzIjoiZmFqYXIifQ.tpQZz1VOUlkF4c4UNMutdISmiGjATBdZ6mMXh-reTmU'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwicm9sZXMiOiIyIiwiaWF0IjoxNjQwNjc1MDY5LCJleHAiOjE2NDA2NzUzNjksImlzcyI6ImZhamFyIn0.gbHQjS9DAl57qwrAMGas8f3OeooZj7DKgvjQAjdFQ5Y'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiZmFqYXJwMzAwQGdtYWlsLmNvbSIsInJvbGVzIjoiMSIsImlhdCI6MTY0MDY5NzYyMiwiZXhwIjoxNjQwNjk3OTIyLCJpc3MiOiJmYWphciJ9.iCTjWQ1gXy46ZpznuL7UsMj9ZnTNb3HPxq0ii4gyrd8');
/*!40000 ALTER TABLE `blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Bike'),(2,'Motorbike'),(3,'Cars');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_users` int DEFAULT NULL,
  `id_vehicles` int DEFAULT NULL,
  `id_category` int DEFAULT NULL,
  `id_location` int DEFAULT NULL,
  `qty` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,1,1,2,1,'1','2021-12-26','2022-01-02','1','5'),(2,2,2,2,2,'1','2021-12-26','2022-01-05','1','5'),(3,2,3,2,3,'1','2021-12-26','2022-01-05','1','5'),(4,2,3,2,4,'1','2021-12-26','2022-01-05','1','3'),(6,3,10,3,5,'1','2021-11-28','2021-12-28','1','5');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Jakarta'),(2,'Depok'),(3,'Bogor'),(4,'Bandung'),(5,'Bogor'),(6,'Banten'),(7,'Tanggerang'),(8,'Cianjur');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Available'),(2,'Full Booked');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nohp` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'Fajar Pratama','Pria','1978-04-21','09292239429','Jalan Kutilang No 10A','/users/photo/user-1640678453619.png','fajarp300@gmail.com','$2b$10$ovDS4zjsN.eQDDNr1SReFuWYQGcOWemaaadULvL.5DuGJWHmb8w3G','1'),(13,'Fajar Pratama','Pria','1978-04-21','09292239429','Jalan Kutilang No 10A','/users/photo/user-1640754148163.png','email@email.com','$2b$10$.ubxEy56nnQICxSuedv9D.B7TpZ9StxAPup.nGFBPobYRXVTyW6B6','2'),(14,'Coba Email','Wanita','2000-01-01','08329234829','Perumahan Pondok indah Blok H No 10','user-1640598706871.png','coba@email.com','$2b$10$ftMmPt1HLLThu.spAxeKp.pjFGnFRWEf9KEvNxcVyvLkBQTEgzYaK','2'),(16,'User2','Pria','1972-04-21','085692389138','Jalan User3 No 31','user-1640599587598.svg','user2@email.com','$2b$10$cnYiQy83CmZy.Kz.9NJvne8xhYhCw/pU4ugyN2ZKZtVEtLn8oP2DC','3'),(18,NULL,NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$DxGpBvChnPmcM9xo9Ycp9u8l6xlQkESnzWsMWUTYxJ0et1/tM.66u','3'),(19,NULL,NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$hCY/WTX3SZU2fX9rX3bJRuILEdND6o0xbH8EVAC3sxOr5SAAwYTzC','3'),(20,'user',NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$V0hGr98q1gm6DjXz.8N8p.LzNzBomcTp9F1/lAAvNhlErNtZJsVy2',NULL),(21,'user',NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$V3iUBy6tLglNgYvN5w9RN.ug/MP98da.yJG3AEBP8ONDhoLD5/UXG',NULL),(22,'user',NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$DixnVpp4PQ4H7r0eBzEDZuZk1Ijv9Ff4/.yddE2VjyGJNsSiN8dly',NULL),(23,'user',NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$RtZBqtNpavIquI69jRFwR.5Mvo13u3b1sGiGHB48Bd9P5BiH2eVhC',NULL),(24,'user',NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$YSgVuCi2TZ.QdLM3iS/zIeCKmknAss6jV8xvFXuu7m6HhKsylfxbe','2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `stock` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `id_category` int DEFAULT NULL,
  `id_location` int DEFAULT NULL,
  `id_status` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vehicles_1_idx` (`id_location`),
  KEY `fk_vehicles_2_idx` (`id_status`),
  KEY `fk_vehicles_3_idx` (`id_category`),
  CONSTRAINT `fk_vehicles_1` FOREIGN KEY (`id_location`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicles_2` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicles_3` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Vario 150','Irit bensin dan bertenaga','2','120000','5','vario.jpg',2,1,1),(2,'Beat Street','Irit bensin','2','70000','10','beat.jpg',2,2,1),(3,'Mx - King 150','Larinya kenceng','2','90000','7','mk-king.jpg',2,4,1),(4,'Yamaha MX-king 150','Motor bebek berkopling dan bertenaga','2','200000','mxking.jpg','0',2,1,1),(5,'Yamaha MX-king 150','Motor bebek berkopling dan bertenaga','2','200000','mxking.jpg','0',3,1,1),(6,'Yamaha MX-king 150','Motor bebek berkopling dan bertenaga','2','200000','mxking.jpg','0',2,1,1),(7,'Yamaha MX-king 150','Motor bebek berkopling dan bertenaga','2','200000','mxking.jpg','0',NULL,1,1),(8,'Yamaha MX-king 150','Motor bebek berkopling dan bertenaga','2','200000','mxking.jpg','0',2,1,1),(9,'Honda Jazz','Bobil Bergaya cocok untuk anak muda','5','450000','jazz.js','4',3,4,1),(10,'Volvo','Mobil Bergaya jaman dulu cocok untuk anak muda','3','300000','10',NULL,3,1,1);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-31  0:59:39

-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
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
  `testimony` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,75,1,2,1,'3','2021-12-26','2022-01-02','1','5',NULL),(2,76,2,2,2,'1','2021-12-26','2022-01-05','1','5',NULL),(3,77,3,2,3,'1','2021-12-26','2022-01-05','1','5',NULL),(4,78,3,2,4,'1','2021-12-26','2022-01-05','1','3',NULL),(6,3,10,3,5,'1','2021-11-28','2021-12-28','1','5',NULL),(8,80,6,3,5,'1','2012-10-20','2021-12-28','1','5','mantab'),(9,80,6,3,5,'1','2012-10-20','2021-12-28','1','5','mantab');
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
-- Table structure for table `testimony`
--

DROP TABLE IF EXISTS `testimony`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimony` (
  `id` int NOT NULL AUTO_INCREMENT,
  `testimony` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `rate` varchar(255) DEFAULT NULL,
  `id_history` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimony`
--

LOCK TABLES `testimony` WRITE;
/*!40000 ALTER TABLE `testimony` DISABLE KEYS */;
/*!40000 ALTER TABLE `testimony` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (75,'user',NULL,NULL,NULL,NULL,NULL,'user@email.com','$2b$10$Q./h80camARzF.16yFrmeODzZnXknK7dvtL4ghhOqDXkt5FyNymN.','3'),(76,'user2',NULL,NULL,NULL,NULL,NULL,'user2@email.com','$2b$10$vB4PYh7TbS9gVG/MAbBNzuXFmkFWzm8BCpxnEJt120h9GNRspgGDe','3'),(77,'user3',NULL,NULL,NULL,NULL,NULL,'user3@email.com','$2b$10$et5FSfLLQUBOzQX920Su3O8nktgLrNGh6O4qxKhGZJ4VrmVV18jMu','3'),(78,'Fajar Pratama','Pria','1994-05-22','081213971331','Jalan Singgalang Blok Q No 8','/users/photo/photoUser-78.jpg','admin@gmail.com','$2b$10$AzU2RDwhftMH9ZYIXZk00.rLn1ntN9d74c6JUfHreNnBdlf4W0vim','2'),(79,'Fajar Pratama',NULL,NULL,NULL,NULL,NULL,'fajarp300@gmail.com','$2b$10$wno3DKbz6PjZNiD2LBe8b.7H0Sob9c7PYOGMeOXfXvSt4tHOnI0Gq','3'),(80,'Prayuni',NULL,NULL,NULL,NULL,NULL,'yuniaja@gmail.com','$2b$10$cy9w4zJEAmtIlL0ZocRX1OLba/QSY/AnFpZMcXRVdfaHnadom2It2','3'),(81,'Siti Nurhaliman',NULL,NULL,NULL,NULL,NULL,'siti@gmail.com','$2b$10$YilUsvfGr/CNNiYe7Y9zweP7M2goFWZASOL7K.IDRT6j4AcQCup7W','3'),(82,'ikehikeh151',NULL,NULL,NULL,NULL,NULL,'ikehikeh151@gmail.com','$2b$10$TqzyTJB0Xp5sS.cQOUkYNexGU7T6WqyLUFXqZR0f8FBYwobgkjxWO','3'),(83,'Fajar Pratama Vishinggah',NULL,NULL,NULL,NULL,'/users/photo/user-83.png','fajarp300@icloud.com','$2b$10$nxs3svVTP7D6d6SU3CbVpOeK4zu7okO/xGjx6D7DQoBDBzqL3DIAC','3'),(84,'Kurniawan',NULL,NULL,NULL,NULL,NULL,'kurniawan@gmail.com','$2b$10$09u4WpnCljdANnJ0v6CAa.Ksho6KzUZkn6JG0WSeWx7QREt/NjTP.','3'),(85,'',NULL,NULL,NULL,NULL,NULL,'','$2b$10$L9Y8TBXws0uL4mZZqFgIA.VPy0On1TA7jpGlagfkSpmniBLPOqbFq','3'),(86,'genta',NULL,NULL,NULL,NULL,NULL,'genta@gmail.com','$2b$10$7GU3Ye/E2s7CC21NBTapuuldXjYoilM.igo8u07AL.OZlUsTZGrWq','3'),(87,'digitalenLMS',NULL,NULL,NULL,NULL,NULL,'dhojar10@gmail.com','$2b$10$/..qTzqG1KmoE10q6pe5YOywEPiQl1zsSLDmGInDfJ5koOCkZ/VO.','3'),(88,'digitalenLMS',NULL,NULL,NULL,NULL,NULL,'dhojar10@gmail.com','$2b$10$gmskGJwxxBS.mog1S/F/0.o16ZiGTPkvjUJv29WSUhTH5WFQF1Gd2','3'),(89,'fajarp300',NULL,NULL,NULL,NULL,NULL,'dasdsad','$2b$10$cg2K6JM08dtshM2RLeXhVO16w1Qling4Te3e2fU5etYMNNMQ1OpaK','3'),(90,'Husnul Khotimah',NULL,NULL,NULL,NULL,NULL,'husnul@gmail.com','$2b$10$JczrR1eEpm6v7VaFwigP9eqb0VfwOtPa3sPTDu6pHfeOmM43tDq4.','3'),(91,'Sintia',NULL,NULL,NULL,NULL,NULL,'sintia@gmail.com','$2b$10$y1kMJFTL0Q3WV6KTJ8YZKewYmNWAvtRbJEx/KCh3zqgQP0g1gmlGO','3');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Vario 150','Irit bensin dan bertenaga','2','120000','5','/vehicles/photo/vehicle-1.jpg',2,1,1),(2,'Beat Street','Irit bensin','2','70000','10','/vehicles/photo/vehicle-2.png',2,2,1),(3,'Honda Blade','Motor bebek yang tangguh','2','90000','7','/vehicles/photo/vehicle-3.jpg',2,4,1),(4,'Yamaha R-15','Motor soprt jiwa anak muda','2','100000','10','/vehicles/photo/vehicle-4.jpg',2,1,1),(5,'All New Xenia','tekhnologi baru','6','230000','3','/vehicles/photo/vehicle-5.jpg',3,3,1),(6,'Avanza','Mobil keluarga','6','190000','5','/vehicles/photo/vehicle-6.jpg',3,1,1),(7,'Civic','Mobil Modern jiwa anak muda','4','200000','4','/vehicles/photo/vehicle-7.jpg',3,1,1),(8,'City','mobil sedan yang modern','4','200000','2','/vehicles/photo/vehicle-8.jpeg',3,1,1),(9,'Bmx','Sepeda kuat dan bergaya','1','450000','7','/vehicles/photo/vehicle-9.jpg',1,4,1),(10,'Siionmic mtb26','Sepeda Gunung','1','300000','10','/vehicles/photo/vehicle-10.jpg',1,1,1),(11,'Polygon Claire 24','Sepeda untuk bergaya','1','40000','5','/vehicles/photo/vehicle-11.jpg',1,2,1),(12,'Sepeda Listrik','Sepeda menggunakan aki','2','30000','5','[\"/vehicles/photo/uploadPhotoVehicle-0.17494887744949095.png\",\"/vehicles/photo/uploadPhotoVehicle-0.2181381803538025.png\",\"/vehicles/photo/uploadPhotoVehicle-0.03784836208609388.png\"]',1,3,1),(36,'Volvo','Mobil Bergaya jaman dulu cocok untuk anak muda','3','300000','10',NULL,3,1,1),(37,'Volvo','Mobil Bergaya jaman dulu cocok untuk anak muda','3','300000','10',NULL,3,1,1),(38,'Suziki Escudo','Mobil Super Kencang','4','250000','5','[\"/vehicles/photo/uploadPhotoVehicle-0.877359056559462.png\",\"/vehicles/photo/uploadPhotoVehicle-0.3867554251156997.png\",\"/vehicles/photo/uploadPhotoVehicle-0.23754510252818406.png\"]',3,6,1),(39,'Suziki Escudo','Mobil Super Kencang','4','250000','5','[\"/vehicles/photo/uploadPhotoVehicle-0.16148150983521714.png\",\"/vehicles/photo/uploadPhotoVehicle-0.4442973053077919.png\",\"/vehicles/photo/uploadPhotoVehicle-0.9934330762955654.png\"]',3,6,1),(40,'Suziki Escudo','Mobil Super Kencang','4','250000','5','[\"/vehicles/photo/uploadPhotoVehicle-0.8735199472926298.png\",\"/vehicles/photo/uploadPhotoVehicle-0.5481038670028306.png\",\"/vehicles/photo/uploadPhotoVehicle-0.5386967482766516.png\"]',3,6,1);
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

-- Dump completed on 2022-01-20 12:11:35

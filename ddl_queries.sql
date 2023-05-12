CREATE TABLE `contributor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `github_id` varchar(255) DEFAULT NULL,
  `blog_url` varchar(255) DEFAULT NULL,
  `bio` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `keyword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `license` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `platform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `project_count` int DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=559 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `owner_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_owner_fk_idx` (`owner_id`),
  CONSTRAINT `project_owner_fk` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `project_repository` (
  `project_id` int NOT NULL,
  `repository_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`repository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `repository` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `latest_release_number` varchar(255) DEFAULT NULL,
  `latest_release_published_at` varchar(255) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `package_manager_url` varchar(255) DEFAULT NULL,
  `latest_download_url` varchar(255) DEFAULT NULL,
  `rank_` int DEFAULT NULL,
  `stars` int DEFAULT NULL,
  `forks` int DEFAULT NULL,
  `platform_id` int DEFAULT NULL,
  `dependencies_count` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `platform_id` (`platform_id`),
  CONSTRAINT `platform_id` FOREIGN KEY (`platform_id`) REFERENCES `platform` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1425 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `repository_dependency` (
  `dependent_id` int NOT NULL,
  `dependee_id` int NOT NULL,
  PRIMARY KEY (`dependent_id`,`dependee_id`),
  KEY `dependee_id` (`dependee_id`),
  CONSTRAINT `repository_dependency_ibfk_1` FOREIGN KEY (`dependent_id`) REFERENCES `repository` (`id`) ON DELETE CASCADE,
  CONSTRAINT `repository_dependency_ibfk_2` FOREIGN KEY (`dependee_id`) REFERENCES `repository` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `repository_keyword` (
  `repository_id` int NOT NULL,
  `keyword_id` int NOT NULL,
  PRIMARY KEY (`repository_id`,`keyword_id`),
  KEY `keyword_id` (`keyword_id`),
  CONSTRAINT `repository_keyword_ibfk_1` FOREIGN KEY (`repository_id`) REFERENCES `repository` (`id`) ON DELETE CASCADE,
  CONSTRAINT `repository_keyword_ibfk_2` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `repository_license` (
  `repository_id` int NOT NULL,
  `license_id` int NOT NULL,
  PRIMARY KEY (`repository_id`,`license_id`),
  KEY `license_id` (`license_id`),
  CONSTRAINT `repository_license_ibfk_1` FOREIGN KEY (`repository_id`) REFERENCES `repository` (`id`) ON DELETE CASCADE,
  CONSTRAINT `repository_license_ibfk_2` FOREIGN KEY (`license_id`) REFERENCES `license` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

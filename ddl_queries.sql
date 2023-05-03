CREATE DATABASE open_source_finder;
USE open_source_finder;



CREATE TABLE IF NOT EXISTS repository (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(2000),
  latest_release_number VARCHAR(255),
  latest_release_published_at VARCHAR(255),
  homepage VARCHAR(255),
  package_manager_url VARCHAR(255),
  latest_download_url VARCHAR(255),
  rank_ INT,
  stars INT,
  forks INT,
  platform_id INT,
  dependencies_count INT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE repository
ADD CONSTRAINT platform_id
FOREIGN KEY (platform_id) REFERENCES platform(id);

CREATE TABLE IF NOT EXISTS platform (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    project_count INT,
    homepage VARCHAR(255)
);




CREATE TABLE IF NOT EXISTS contributor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  github_id VARCHAR(255),
  blog_url VARCHAR(255),
  bio VARCHAR(2000)
);



CREATE TABLE IF NOT EXISTS license (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS repository_license (
  repository_id INT,
  license_id INT,
  PRIMARY KEY (repository_id, license_id),
  FOREIGN KEY (repository_id) REFERENCES repository(id),
  FOREIGN KEY (license_id) REFERENCES license(id)
);

CREATE TABLE IF NOT EXISTS keyword (
  id INT PRIMARY KEY AUTO_INCREMENT,
  word VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS repository_keyword (
  repository_id INT,
  keyword_id INT,
  PRIMARY KEY (repository_id, keyword_id),
  FOREIGN KEY (repository_id) REFERENCES repository(id),
  FOREIGN KEY (keyword_id) REFERENCES keyword(id)
);


CREATE TABLE IF NOT EXISTS repository_dependency (
  dependent_id INT,
  dependee_id INT,
  PRIMARY KEY (dependent_id, dependee_id),
  FOREIGN KEY (dependent_id) REFERENCES repository(id),
  FOREIGN KEY (dependee_id) REFERENCES repository(id)
);



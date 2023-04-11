CREATE DATABASE demo1;
USE demo1;

CREATE TABLE IF NOT EXISTS repository (
  id INT PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(255),
  dependencies_count INT,
  total_releases INT,
  first_release VARCHAR(50),
  stars INT,
  forks INT,
  language VARCHAR(50),
  latest_download_url VARCHAR(255),
  latest_release_number INT,
  size VARCHAR(50),
  platform_id INT,
  created_at DATETIME,
  updated_at DATETIME
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

CREATE TABLE IF NOT EXISTS repository_version (
  id INT PRIMARY KEY AUTO_INCREMENT,
  number FLOAT,
  published_at DATETIME,
  repository_id INT,
 FOREIGN KEY (repository_id) REFERENCES repository(id)
);

CREATE TABLE IF NOT EXISTS platform (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  url VARCHAR(255)
);

ALTER TABLE repository
ADD CONSTRAINT platform_id
FOREIGN KEY (platform_id) REFERENCES platform(id);

CREATE TABLE IF NOT EXISTS keyword (
  id INT PRIMARY KEY AUTO_INCREMENT,
  word VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS contributed_by (
  repository_id INT,
  contributor_id INT,
  PRIMARY KEY (repository_id, contributor_id),
  FOREIGN KEY (repository_id) REFERENCES repository(id),
  FOREIGN KEY (contributor_id) REFERENCES contributor(id)
);

CREATE TABLE IF NOT EXISTS has_license (
  repository_id INT,
  license_id INT,
  PRIMARY KEY (repository_id, license_id),
  FOREIGN KEY (repository_id) REFERENCES repository(id),
  FOREIGN KEY (license_id) REFERENCES license(id)
);

CREATE TABLE IF NOT EXISTS contains_keywords (
  repository_id INT,
  keyword_id INT,
  PRIMARY KEY (repository_id, keyword_id),
  FOREIGN KEY (repository_id) REFERENCES repository(id),
  FOREIGN KEY (keyword_id) REFERENCES keyword(id)
);

CREATE TABLE IF NOT EXISTS depends_on (
  dependent_id INT,
  dependee_id INT,
  PRIMARY KEY (dependent_id, dependee_id),
  FOREIGN KEY (dependent_id) REFERENCES repository(id),
  FOREIGN KEY (dependee_id) REFERENCES repository(id)
);



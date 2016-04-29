CREATE DATABASE tabordng;
USE tabordng;
CREATE TABLE utilisateurs(
 id INT NOT NULL AUTO_INCREMENT,
 username VARCHAR(50) NOT NULL,
 password VARCHAR(50) NOT NULL,
 PRIMARY KEY(id)
);
INSERT INTO utilisateurs
VALUES ('', 'admin', 'admin');
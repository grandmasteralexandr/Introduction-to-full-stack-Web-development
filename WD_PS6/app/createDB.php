<?php
require_once 'config.php';

try {
    $db = new PDO('mysql:host=' . HOST, DB_USERNAME, DB_PASS);
    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 'CREATE DATABASE ' . DB_NAME;
    $db->exec($sql);
    echo 'Database successfully created<br>';

    $sql = 'USE ' . DB_NAME;
    $db->query($sql);
    echo 'Switch database<br>';

    $sql = '
      CREATE TABLE users (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user VARCHAR(24) NOT NULL UNIQUE,
      pass CHAR(60) NOT NULL
      );
      
      CREATE TABLE messages (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      message TINYTEXT NOT NULL,
      time INT UNSIGNED NOT NULL,
      user_id INT UNSIGNED NOT NULL,
      CONSTRAINT FK_user FOREIGN KEY (user_id) REFERENCES users (id) 
      ON UPDATE CASCADE 
      ON DELETE CASCADE
      )';

    $db->exec($sql);
    echo 'Tables successfully created<br>';

} catch (PDOException $e) {
    echo $e->getMessage();
}

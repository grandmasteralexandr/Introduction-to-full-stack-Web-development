<?php

namespace shpp\wd\aokunev;

use PDO;
use PDOException;

require_once "config.php";

/**
 * Represent data base
 */
class DataBase
{
    /**
     * @var PDO database connections
     */
    private $db;

    /**
     * DataBase constructor.
     */
    public function __construct()
    {
        try {
            $this->db = new PDO(DB, DB_USERNAME, DB_PASS);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'db error';
            exit();
        }
    }

    /**
     * Select user from database
     *
     * @param $user string username
     * @return array/false user or false if user not found
     */
    public function selectUser($user)
    {
        $sql = "SELECT * FROM users WHERE user = '$user'";
        return $this->db->query($sql)->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Save user to database
     *
     * @param $user string username
     * @param $pass string hash password
     */
    public function insertUser($user, $pass)
    {
        $sql = "INSERT INTO users (user, pass) VALUES ('$user', '$pass')";
        $this->db->exec($sql);
    }

    /**
     * Return messages for one hour
     *
     * @return array messages for one hour
     */
    public function getFreshMessage()
    {
        $checkTime = function ($time) {
            return time() * 1000 - $time < 3600000;
        };

        return array_filter($this->messages, $checkTime, ARRAY_FILTER_USE_KEY);
    }
}

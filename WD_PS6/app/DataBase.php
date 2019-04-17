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
        $sql = "SELECT user, pass FROM users WHERE user = '$user'";
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
        $time = time() - 3600;
        $sql = "SELECT message, time, user FROM messages WHERE time > $time";
        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Add message to database
     *
     * @param $message string
     * @param $time int time in timestamp
     * @param $user string
     */
    public function addMessage($message, $time, $user)
    {
        $sql = "INSERT INTO messages (message, time, user) VALUES ('$message', '$time', '$user')";
        $this->db->exec($sql);
    }
}

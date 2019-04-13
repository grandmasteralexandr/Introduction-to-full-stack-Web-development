<?php

namespace shpp\wd\aokunev;

require_once "config.php";

/**
 * Represent data base
 */
class DataBase
{
    /**
     * @var array Users list
     */
    private $users;

    /**
     * @var array Messages list
     */
    private $messages;

    /**
     * DataBase constructor.
     */
    public function __construct()
    {
        $this->users = $this->readFile(USERS_DB);
        $this->messages = $this->readFile(MESSAGES_DB);
    }

    /**
     * @return array all users
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @return array all messages
     */
    public function getMessages()
    {
        return $this->messages;
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

    /**
     * @param $json string json to save
     * @param $file string filename
     */
    public function save($json, $file)
    {
        file_put_contents($file, $json);
        $this->checkPermission($file);
    }

    /**
     * Check file permission
     * @param $file string filename
     */
    private function checkPermission($file)
    {
        if (!(is_readable($file) && is_writable($file))) {
            header("location: ../500.html");
            exit();
        }
    }

    /**
     * Read json file
     *
     * @param $file string json filename
     * @return array from json file
     */
    private function readFile($file)
    {
        if (!file_exists($file)) {
            $this->save("", $file);
        }

        return json_decode(file_get_contents($file), true);
    }
}

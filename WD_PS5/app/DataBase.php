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
     * @return array
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @return array
     */
    public function getMessages()
    {
        return $this->messages;
    }

    /**
     * @return array
     */
    public function getFreshMessage()
    {
        return $this->messages;
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

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
    private $message;

    /**
     * DataBase constructor.
     */
    public function __construct()
    {
        if (!file_exists(USERS_DB)) {
            $this->save("", USERS_DB);
        }

        $this->users = json_decode(file_get_contents(USERS_DB), true);

        if (!file_exists(MESSAGES_DB)) {
            $this->save("", MESSAGES_DB);
        }

        $this->message = json_decode(file_get_contents(MESSAGES_DB), true);
    }

    /**
     * @return array
     */
    public function getUsers()
    {
        return $this->users;
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
}

<?php

namespace shpp\wd\aokunev;

require_once "config.php";

/**
 * Represent data base
 */
class DataBase
{
    /**
     * @var array vote question
     */
    private $question;

    /**
     * @var array vote result
     */
    private $result;

    /**
     * DataBase constructor.
     */
    public function __construct()
    {
        $this->checkPermission(DB_QUESTION);
        $this->question = json_decode(file_get_contents(DB_QUESTION));

        if (!file_exists(DB_VOTE_RESULT)) {
            $this->createResult();
        }

        $this->result = json_decode(file_get_contents(DB_VOTE_RESULT), true);
    }

    /**
     * @return string vote question theme
     */
    public function getTheme()
    {
        return $this->question->voteTheme;
    }

    /**
     * @return array vote question options
     */
    public function getOptions()
    {
        return $this->question->voteOptions;
    }

    /**
     * @return array vote question result
     */
    public function getResult()
    {
        return $this->result;
    }

    /**
     * Save result in file
     *
     * @param $json string vote result in json format
     */
    public function saveResult($json)
    {
        file_put_contents(DB_VOTE_RESULT, $json);
    }

    /**
     * Create result file
     */
    private function createResult()
    {
        $result = [];

        foreach ($this->getOptions() as $option) {
            $result[$option] = 0;
        }

        file_put_contents(DB_VOTE_RESULT, json_encode($result));
        $this->checkPermission(DB_VOTE_RESULT);
    }

    /**
     * Check file permission
     *
     * @param $file string checking filename
     */
    private function checkPermission($file)
    {
        if (!(is_readable($file) && is_writable($file))) {
            header("location: ../500.html");
            exit();
        }
    }
}

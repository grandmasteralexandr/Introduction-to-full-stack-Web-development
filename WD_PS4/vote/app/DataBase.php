<?php

namespace shpp\wd\aokunev;

require_once "config.php";

/**
 * Represent data base
 */
class DataBase
{
    private $question;
    private $result;

    public function __construct()
    {
        if (!file_exists(DB_QUESTION)) {
            header("Location: ../500.html");
            exit();
        }

        $this->question = json_decode(file_get_contents(DB_QUESTION));

        if (!file_exists(DB_VOTE_RESULT)) {
            $this->createResult();
        }

        $this->result = json_decode(file_get_contents(DB_VOTE_RESULT), true);
    }

    public function getTheme()
    {
        return $this->question->voteTheme;
    }

    public function getOptions()
    {
        return $this->question->voteOptions;
    }

    public function getResult()
    {
        return $this->result;
    }

    public function saveResult($json)
    {
        file_put_contents(DB_VOTE_RESULT, $json);
    }

    private function createResult()
    {
        $result = [];

        foreach ($this->getOptions() as $option) {
            $result[$option] = 0;
        }

        file_put_contents(DB_VOTE_RESULT, json_encode($result));
    }
}

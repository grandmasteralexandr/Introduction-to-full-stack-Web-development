<?php

namespace shpp\wd\aokunev;

require "config.php";

/**
 * Represent data base
 */
class DataBase
{
    private $question;
    private $result;

    public function __construct()
    {
        $this->question = json_decode(file_get_contents(DB_QUESTION));
        $this->voteResult = json_decode(file_get_contents(DB_VOTE_RESULT));
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
        return $this->result->voteOptions;
    }
}

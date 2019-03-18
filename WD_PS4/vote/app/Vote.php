<?php

namespace shpp\wd\aokunev;

/**
 * Anonymous vote
 */
class Vote
{
    private $db;

    /**
     * Vote constructor.
     * @param $dataBase DataBase
     */
    public function __construct(DataBase $dataBase)
    {
        $this->db = $dataBase;
    }

    /**
     * @return string
     */
    public function getVoteTheme()
    {
        return $this->db->getTheme();
    }

    /**
     * @return string
     */
    public function createOptions()
    {
        $result = '';

        foreach ($this->db->getOptions() as $option) {
            $result .= '<div class="form__element">
            <label for="' . $option . '">' . $option . '</label>
            <input type="radio" name="vote" value="' . $option . '" id="' . $option . '">
          </div>';
        }

        return $result;
    }

    function save()
    {
        foreach ($this->db->getResult() as $item) {
            if ($item == $_POST["vote"]) {

            }
            break;
        }
    }
}

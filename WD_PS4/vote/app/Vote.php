<?php

namespace shpp\wd\aokunev;

/**
 * Anonymous vote
 */
class Vote
{
    /**
     * @var DataBase
     */
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
     * @return string vote theme
     */
    public function getVoteTheme()
    {
        return $this->db->getTheme();
    }

    /**
     * @return string with vote options
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

    /**
     * Save result in file
     */
    public function save()
    {
        $result = [];
        $isValid = false;

        foreach ($this->db->getResult() as $key => $value) {

            if ($key == $_POST["vote"]) {
                $value++;
                $isValid = true;
            }

            $result[$key] = $value;
        }

        if (!$isValid) {
            $_SESSION["error"] = "<p class='error-message'>Invalid option</p>";
            return;
        }

        $this->db->saveResult(json_encode($result));
    }
}

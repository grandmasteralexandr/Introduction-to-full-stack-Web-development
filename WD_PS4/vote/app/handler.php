<?php
require_once "DataBase.php";
require_once "Vote.php";

use shpp\wd\aokunev\Vote;
use shpp\wd\aokunev\DataBase;

session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!$_POST["vote"]) {
        $_SESSION["error"] = "<p class='error-message'>Choose option</p>";
        header("Location: ../index.php");
        exit();
    }

    $vote = new Vote(new DataBase());
    $vote->save();
    header("Location: ../voteResult.php");
}

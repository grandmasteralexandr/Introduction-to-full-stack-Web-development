<?php
require_once "app/DataBase.php";
require_once "app/Vote.php";

use shpp\wd\aokunev\Vote;
use shpp\wd\aokunev\DataBase;

session_start();
$vote = new Vote(new DataBase());
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Vote</title>
  </head>
  <body>
    <div class="wrapper">
      <h1>Anonymous vote</h1>
      <section>
        <h2><?= $vote->getVoteTheme() ?></h2>
        <form action="app/handler.php" method="post" name="form" class="form">
            <?= $vote->createOptions() ?>
            <?= isset($_SESSION["error"]) ? $_SESSION["error"] : "" ?>
          <input type="submit" value="Vote" name="voteButton" id="voteButton" class="button">
        </form>
      </section>
    </div>
  </body>
</html>

<?php session_unset(); ?>

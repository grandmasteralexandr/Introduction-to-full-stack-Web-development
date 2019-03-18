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
            <h1>Vote result</h1>
            <section>

            </section>
        </div>
    </body>
</html>

<?php session_unset(); ?>

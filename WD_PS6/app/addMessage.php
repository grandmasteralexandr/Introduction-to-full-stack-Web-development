<?php
require_once 'DataBase.php';

use shpp\wd\aokunev\DataBase;

session_start();

if (isset($_POST['message'], $_POST['time'])) {
    $db = new DataBase();
    $db->addMessage($_POST['message'], $_POST['time'], $_SESSION['user']);
    echo 'ok';
}

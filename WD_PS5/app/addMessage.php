<?php
require_once 'DataBase.php';

use shpp\wd\aokunev\DataBase;

session_start();

if (isset($_POST['message'], $_POST['time'])) {
    $db = new DataBase();
    $json = $db->getMessages();
    $json[$_POST['time']] = [
        $_POST['message'],
        $_SESSION['user']
    ];
    $db->save(json_encode($json), MESSAGES_DB);
    echo 'ok';
}

<?php

use shpp\wd\aokunev\DataBase;

require_once 'DataBase.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new DataBase();
    echo json_encode($db->getFreshMessage());
}

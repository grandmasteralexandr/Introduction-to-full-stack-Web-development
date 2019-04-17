<?php
require_once 'DataBase.php';

use shpp\wd\aokunev\DataBase;

session_start();
$result = [];

if (validateLogin($result)) {
    $db = new DataBase();
    $user = $db->selectUser($_POST['username']);

    /* Check password */
    if ($user && !password_verify($_POST['pass'], $user['pass'])) {
        $result['pass'] = 'Wrong password';
    }

    if (empty($result)) {

        /* Write new user to db */
        if (!$user) {
            $db->insertUser($_POST['username'], password_hash($_POST['pass'], PASSWORD_DEFAULT));
        }

        $_SESSION['user'] = $_POST['username'];
        echo 'ok';
        exit();
    }
}

echo json_encode($result);

/**
 * Validate login form and write error to result array
 *
 * @param $result array with error list
 * @return bool true if form is valid
 */
function validateLogin(&$result)
{
    if (!isset($_POST['username']) || !preg_match(USERNAME_PATTERN, $_POST['username'])) {
        $result['username'] = 'Invalid username';
    }

    if (!isset($_POST['pass']) || strlen($_POST['pass']) < 8) {
        $result['pass'] = 'Password less than 8 characters';
    }

    if (!empty($result)) {
        return false;
    }

    return true;
}

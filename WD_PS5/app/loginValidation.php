<?php
require_once 'DataBase.php';

use shpp\wd\aokunev\DataBase;

session_start();
$result = [];

if (validateLogin($result)) {
    $db = new DataBase();
    $users = $db->getUsers();
    $isOldUser = false;

    if (array_key_exists($_POST['username'], $users)) {
        $isOldUser = true;
    }

    /* Check password */
    if ($isOldUser && $users[$_POST['username']]['pass'] !== $_POST['pass']) {
        $result['pass'] = 'Wrong password';
    }

    if (empty($result)) {

        /* Write new user to db */
        if (!$isOldUser) {
            $users[$_POST['username']] = ['pass' => $_POST['pass']];
            $db->save(json_encode($users), USERS_DB);
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

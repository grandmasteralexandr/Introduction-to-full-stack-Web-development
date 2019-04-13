<?php
require_once 'DataBase.php';

use shpp\wd\aokunev\DataBase;

session_start();

if (validateLogin()) {
    $db = new DataBase();
    $users = $db->getUsers();
    $isOldUser = false;

    if (array_key_exists($_POST['username'], $users)) {
        $isOldUser = true;
    }

    /* Check password */
    if ($isOldUser && $users[$_POST['username']]['pass'] !== $_POST['pass']) {
        $_SESSION['error']['pass'] = 'Wrong password';
    }

    if (!isset($_SESSION['error'])) {

        /* Write new user to db */
        if (!$isOldUser) {
            $users[$_POST['username']] = ['pass' => $_POST['pass']];
            $db->save(json_encode($users), USERS_DB);
        }

        $_SESSION['user'] = $_POST['username'];
    }
}

header('location: ../index.php');

/**
 * Validate login form
 *
 * @return bool
 */
function validateLogin()
{
    if (!isset($_POST['username']) || !preg_match(USERNAME_PATTERN, $_POST['username'])) {
        $_SESSION['error']['username'] = 'Invalid username';
    }

    if (!isset($_POST['pass']) || strlen($_POST['pass']) < 8) {
        $_SESSION['error']['pass'] = 'Password less than 8 characters';
    }

    if (isset($_SESSION['error'])) {
        return false;
    }

    return true;
}
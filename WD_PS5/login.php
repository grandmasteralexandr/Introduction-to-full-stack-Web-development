<?php
session_start();

if (isset($_SESSION['user'])) {
    header('location: index.php');
    exit();
}

$title = 'Login';
require_once 'app/layouts/header.php';
?>

  <form action="app/loginValidation.php" method="post" class="form login-form">
    <label for="username" class="form__label">Enter your name</label>
    <?= isset($_SESSION['error']['username']) ? '<p class="error-message">' . $_SESSION['error']['username'] . '</p>' : '' ?>
    <input type="text" class="form__input" name="username" id="username" placeholder="John Doe">
    <label for="pass" class="form__label">Enter your password</label>
    <?= isset($_SESSION['error']['pass']) ? '<p class="error-message">' . $_SESSION['error']['pass'] . '</p>' : '' ?>
    <input type="password" class="form__input" name="pass" id="pass" placeholder="&bull;&bull;&bull;&bull;&bull;">
    <input type="submit" class="button" value="Submit">
    <div class="button-shadow"></div>

<?php
require_once 'app/layouts/footer.php';
unset($_SESSION['error']);

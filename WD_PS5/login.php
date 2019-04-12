<?php
session_start();

$title = 'Login';
require_once 'app/layouts/header.php';
?>

  <form action="app/handler.php" class="form login-form">
    <label for="username" class="form__label">Enter your name</label>
    <input type="email" class="form__input" name="email" id="email" placeholder="John Doe">
    <label for="pass" class="form__label">Enter your password</label>
    <input type="password" class="form__input" name="pass" id="pass" placeholder="&bull;&bull;&bull;&bull;&bull;">
    <input type="submit" class="button" value="Submit">
    <div class="button-shadow"></div>

<?php require_once 'app/layouts/footer.html';

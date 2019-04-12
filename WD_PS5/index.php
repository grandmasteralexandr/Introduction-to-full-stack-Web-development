<?php
session_start();
$title = 'Easy chat';
require_once 'app/layouts/header.php';

if (!isset($_SESSION['user'])) {
  header('location: login.php');
  exit();
}
?>

  <form action="" class="form">
    <div class="chat-area"></div>
    <div class="message-block">
      <input type="text" class="form__input message__input" name="message">
      <input type="submit" class="button sent__button" value="Sent">
    </div>
  </form>

<?php
require_once 'app/layouts/footer.html';
session_unset();

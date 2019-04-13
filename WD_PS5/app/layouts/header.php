<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title><?= $title ?></title>
  </head>
  <body>
    <div class="header-line"></div>
      <?php if (isset($_SESSION['user'])): ?>
    <form action="app/logout.php" method="post" class="logout-button">
      <input type="submit" class="button" value="Logout">
    </form>
    <?php endif; ?>
    <h1 class="chat-name">Easy Chat</h1>
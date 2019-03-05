<?php
require_once "Helper.php";

session_start();
isset($_SESSION["visitors"]) ? $_SESSION["visitors"]++ : $_SESSION["visitors"] = 1;
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Warm up</title>
  </head>
  <body>
    <div class="wrapper">
      <h1>Warm Up</h1>
      <section class="task1">
        <h2>Task 1</h2>
        <form action="actions.php" method="post" name="task1-form" class="task__form">
          <p>Calculate sum from -1000 to 1000</p>
          <input type="hidden" name="function" value="calculateSum">
          <input type="submit" value="Calculate sum" name="task1-button" id="task1-button" class="button">
            <?= !isset($_SESSION["specifiedRange"]) && isset($_SESSION["sum"]) ? "<p>Sum: " . $_SESSION["sum"] . "</p>" : "" ?>
        </form>
      </section>
      <section class="task2">
        <h2>Task 2</h2>
        <form action="actions.php" method="post" name="task2-form" class="task__form">
          <p>Calculate sum from -1000 to 1000 that ends in 2, 3, 7</p>
          <input type="hidden" name="function" value="calculateSum">
          <input type="hidden" name="specifiedRange" value="true">
          <input type="submit" value="Calculate sum" name="task2-button" id="task2-button" class="button">
            <?= isset($_SESSION["specifiedRange"]) && isset($_SESSION["sum"]) ? "<p>Sum: " . $_SESSION["sum"] . "</p>" : "" ?>
        </form>
      </section>
      <section class="task3">
        <h2>Task 3</h2>
        <ul>File list:
            <?php Helper::printFileList(); ?>
        </ul>
        <form action="actions.php" method="post" name="task3-form" enctype="multipart/form-data" class="task__form">
          <input type="hidden" name="function" value="upload">
          <input type="file" name="file">
          <input type="submit" value="Upload" name="task3-button" id="task3-button" class="button">
            <?= isset($_SESSION["fileError"]) ? "<p class='error-message'>" . $_SESSION["fileError"] . "</p>" : "" ?>
        </form>
      </section>
      <section class="task4">
        <h2>Task 4</h2>
        <form action="actions.php" method="post" name="task4-form" class="task__form">
          <div class="form__element">
            <label for="task4-board-size" class="form__label">Input board size</label>
          </div>
          <div class="form__element">
            <input type="text" class="form__input" name="boardSize" id="task4-board-size" placeholder="3x5">
            <input type="hidden" name="function" value="chessBoard">
              <?= isset($_SESSION["boardError"]) ? "<p class='error-message'>" . $_SESSION["boardError"] . "</p>" : "" ?>
          </div>
          <input type="submit" value="Create board" name="task4-button" id="task4-button" class="button">
            <?= isset($_SESSION["chessBoard"]) ? "<div class='board-container'>" . $_SESSION["chessBoard"] . "</div>" : "" ?>
        </form>
      </section>
      <section class="task5">
        <h2>Task 5</h2>
        <form action="actions.php" method="post" name="task5-form" class="task__form">
          <div class="form__element">
            <label for="task5-number" class="form__label">Input number</label>
          </div>
          <div class="form__element">
            <input type="hidden" name="function" value="calculateNumberSum">
            <input type="text" class="form__input" name="task5-number" id="task5-number">
              <?= isset($_SESSION["numberError"]) ? "<p class='error-message'>" . $_SESSION["numberError"] . "</p>" : "" ?>
          </div>
          <input type="submit" value="Calculate sum of number" name="task3-button" id="task3-button" class="button">
            <?= isset($_SESSION["numberSum"]) ? "<p>Sum of number digits: " . $_SESSION["numberSum"] . "</p>" : "" ?>
        </form>
      </section>
      <section class="task6">
        <h2>Task 6</h2>
        <form action="actions.php" method="post" name="task6-form" class="task__form">
          <input type="submit" value="Random" name="task6-button" id="task6-button" class="button">
        </form>
      </section>
      <section class="task7">
        <h2>Task 7</h2>
        <p>Visitors count: <?= $_SESSION["visitors"] ?></p>
      </section>
      <section class="task8">
        <h2>Task 8</h2>
        <form action="actions.php" method="post" name="task8-form" class="task__form">
          <div class="form__element">
            <label for="task8-textarea" class="form__label">Input text</label>
          </div>
          <div class="form__element">
            <textarea name="task8-textarea" id="task8-textarea" cols="30" rows="10"></textarea>
          </div>
          <input type="submit" value="Print statistic" name="task8-button" id="task8-button" class="button">
        </form>
      </section>
    </div>
    <script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous">
    </script>
    <script src="script.js"></script>
  </body>
</html>

<?php
unset(
    $_SESSION["specifiedRange"],
    $_SESSION["sum"],
    $_SESSION["fileError"],
    $_SESSION["chessBoard"],
    $_SESSION["boardError"],
    $_SESSION["numberError"],
    $_SESSION["numberSum"]
);
?>

<?php
session_start();
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
            <?= !isset($_SESSION["specifiedRange"]) && isset($_SESSION["sum"]) ? "<p>Sum: ".$_SESSION["sum"]."</p>" : "" ?>
        </form>
      </section>
      <section class="task2">
        <h2>Task 2</h2>
        <form action="actions.php" method="post" name="task2-form" class="task__form">
          <p>Calculate sum from -1000 to 1000 that ends in 2, 3, 7</p>
          <input type="hidden" name="function" value="calculateSum">
          <input type="hidden" name="specifiedRange" value="true">
          <input type="submit" value="Calculate sum" name="task2-button" id="task2-button" class="button">
            <?= isset($_SESSION["specifiedRange"]) && isset($_SESSION["sum"]) ? "<p>Sum: ".$_SESSION["sum"]."</p>" : "" ?>
        </form>
      </section>
      <section class="task3">
        <h2>Task 3</h2>
        <form action="actions.php" method="post" name="task3-form" class="task__form">
          <input type="submit" value="Upload" name="task3-button" id="task3-button" class="button">
        </form>
      </section>
      <section class="task4">
        <h2>Task 4</h2>
        <form action="actions.php" method="post" name="task4-form" class="task__form">
          <div class="form__element">
            <label for="task4-board-size" class="form__label">Input board size</label>
          </div>
          <div class="form__element">
            <input type="text" class="form__input" name="task4-board-size" id="task4-board-size" placeholder="3x5">
          </div>
          <input type="submit" value="Create board" name="task4-button" id="task4-button" class="button">
        </form>
      </section>
      <section class="task5">
        <h2>Task 5</h2>
        <form action="actions.php" method="post" name="task5-form" class="task__form">
          <div class="form__element">
            <label for="task5-number" class="form__label">Input number</label>
          </div>
          <div class="form__element">
            <input type="text" class="form__input" name="task5-number" id="task5-number">
          </div>
          <input type="submit" value="Upload" name="task3-button" id="task3-button" class="button">
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
        <p>Visitors count: </p>
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

<?php session_unset();

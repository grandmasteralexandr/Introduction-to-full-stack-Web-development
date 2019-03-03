<?php
session_start();

if (function_exists($_POST["function"])) {
    $_POST["function"]();
}

header("Location: index.php");

function calculateSum()
{
    $firstNumber = -1000;
    $secondNumber = 1000;
    $result = 0;
    $specifiedRange = false;

    if (isset($_POST["specifiedRange"])) {
        $specifiedRange = true;
        $_SESSION["specifiedRange"] = true;
    }

    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        if (!$specifiedRange || $specifiedRange && checkEnd($i)) {
            $result += $i;
        }
    }

    $_SESSION["sum"] = $result;
}

function checkEnd($input)
{
    $pattern = ["2", "3", "7"];

    foreach ($pattern as $value) {
        if (strpos($input, $value, -1) === (strlen($input) - 1)) {
            return true;
        }
    }

    return false;
}
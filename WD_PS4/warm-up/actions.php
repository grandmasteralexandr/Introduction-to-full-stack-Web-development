<?php
require_once "UploadList.php";

session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST" && function_exists($_POST["function"])) {
    $_POST["function"]();
}

header("Location: index.php");

/**
 * Calculate sum for task 1 and 2
 */
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

/**
 * Check if input end in specified values
 *
 * @param $input number
 * @return bool True if input end in specified values
 */
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

/**
 * Upload user file (task 3)
 */
function upload()
{
    if ($_FILES["file"]["error"] > 0) {
        $_SESSION["fileError"] = UploadList::FILE_UPLOAD_ERROR[$_FILES["file"]["error"]];
        return;
    }

    if (!is_dir(UploadList::UPLOAD_PATH)) {
        mkdir(UploadList::UPLOAD_PATH);
        checkPermission(UploadList::UPLOAD_PATH);
    }

    move_uploaded_file($_FILES["file"]["tmp_name"], UploadList::UPLOAD_PATH . $_FILES["file"]["name"]);
}

/**
 * Generate chess board (task 4)
 */
function chessBoard()
{
    $pattern = "/^[1-9]\d?x[1-9]\d?$/";

    if (preg_match($pattern, $_POST["boardSize"])) {
        $boardSize = preg_split("/x/", $_POST["boardSize"]);
        $rows = $boardSize[0];
        $cols = $boardSize[1];
        $board = "";

        for ($row = 0; $row < $rows; $row++) {
            $board .= "<div class='board-row'>";

            for ($col = 0; $col < $cols; $col++) {
                $board .= "<div class='board-cell";
                ($row + $col) % 2 === 0 ? $board .= " black-cell'></div>" : $board .= "'></div>";
            }

            $board .= "</div>";
        }

        $_SESSION["chessBoard"] = $board;
    } else {
        $_SESSION["boardError"] = "Invalid size or more than 99";
    }
}

/**
 * Calculate sum of number digits (task 5)
 */
function calculateNumberSum()
{
    $pattern = "/^\d+$/";
    $number = $_POST["task5-number"];

    if (preg_match($pattern, $number)) {
        $sum = 0;

        for ($i = 0; $i < strlen($number); $i++) {
            $sum += $number[$i];
        }

        $_SESSION["numberSum"] = $sum;
    } else {
        $_SESSION["numberError"] = "Input must be a positive integer number";
    }
}

/**
 * Generate random array (task 6)
 */
function randomArray()
{
    $result = [];

    for ($i = 0; $i < 100; $i++) {
        $result[$i] = rand(1, 10) * 2;
    }

    $result = array_unique($result);
    rsort($result);
    $_SESSION["randomArray"] = $result;
}

/**
 * Calculate text statistic
 */
function textStatistic()
{
    $text = $_POST["task8-textarea"];
    $linesCount = substr_count($text, "\n") + 1;
    $whiteSpacesCount = substr_count($text, " ");
    $lettersCount = strlen($text) - $whiteSpacesCount - ($linesCount - 1) * 2;
    $_SESSION["textStatistic"] = [$linesCount, $lettersCount, $whiteSpacesCount];
}

/**
 * Check file permission
 *
 * @param $file string checking filename
 */
function checkPermission($file)
{
    if (!(is_readable($file) && is_writable($file))) {
        header("location: 500.html");
        exit();
    }
}

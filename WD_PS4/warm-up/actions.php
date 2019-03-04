<?php
require_once "Helper.php";

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

/* Task 3 */

/**
 * Upload user file
 */
function upload()
{
    if ($_FILES["file"]["error"] > 0) {
        $_SESSION["fileError"] = Helper::FILE_UPLOAD_ERROR[$_FILES["file"]["error"]];
        return;
    }

    if (!is_dir(Helper::UPLOAD_PATH)) {
        mkdir(Helper::UPLOAD_PATH);
    }

    move_uploaded_file($_FILES["file"]["tmp_name"], Helper::UPLOAD_PATH . $_FILES["file"]["name"]);
}

/**
 * Generate chess board
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

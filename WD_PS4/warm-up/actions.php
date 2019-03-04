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
    if (!is_dir(Helper::UPLOAD_PATH)) {
        mkdir(Helper::UPLOAD_PATH);
        /* Change permission because of umask - 022, mkdir set 0755 even if specify 0777 */
        chmod(Helper::UPLOAD_PATH, 0777);
    }
}

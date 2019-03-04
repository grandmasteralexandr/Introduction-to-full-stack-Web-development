<?php

class Helper
{
    const UPLOAD_PATH = "uploads/";
    const IMAGE_EXTENSION = ["jpg", "jpeg", "png", "gif", "bmp"];

    public static function printFileList()
    {
        if (@$files = scandir(self::UPLOAD_PATH)) {

            foreach ($files as $file) {

                $filePath = self::UPLOAD_PATH . $file;

                if (is_file($filePath)) {
                    echo "<li><a download href='" . $filePath . "' " .
                        self::isImage($file) . ">" .
                        $file . "</a> - " . self::formatFileSize(filesize($filePath)) . "</li>";
                }
            }
        }
    }

    protected static function formatFileSize($fileSize)
    {
        return $fileSize;
    }

    private static function isImage($file)
    {
        return in_array(
            pathinfo($file, PATHINFO_EXTENSION), self::IMAGE_EXTENSION
        ) ? "class='preview' " : "";
    }
}
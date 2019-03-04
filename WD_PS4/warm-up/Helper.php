<?php

class Helper
{
    const UPLOAD_PATH = "uploads/";

    public static function printFileList()
    {
        if (@$files = scandir(self::UPLOAD_PATH)) {

            foreach ($files as $file) {

                $filePath = self::UPLOAD_PATH . $file;

                if (is_file($filePath)) {
                    echo "<li><a href='" . $filePath . "'>" . $file . "</a> - " . self::formatFileSize(filesize($filePath)) . "</li>";
                }
            }
        }
    }

    protected static function formatFileSize($fileSize)
    {
        return $fileSize;
    }
}
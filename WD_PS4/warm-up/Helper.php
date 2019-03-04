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
                    echo "<li class='file'><a download href='" . $filePath . "'" . ">" .
                        $file . "</a> - " . self::formatFileSize(filesize($filePath)) .
                        self::addImagePreview($file) . "</li>";
                }
            }
        }
    }

    protected static function formatFileSize($fileSize)
    {
        return $fileSize;
    }

    private static function addImagePreview($file)
    {
        return in_array(
            strtolower(pathinfo($file, PATHINFO_EXTENSION)), self::IMAGE_EXTENSION
        ) ? "<img class='preview' src='" . self::UPLOAD_PATH . $file . "'>" : "";
    }
}
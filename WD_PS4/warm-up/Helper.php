<?php

class Helper
{
    const UPLOAD_PATH = "uploads/";
    const IMAGE_EXTENSION = ["jpg", "jpeg", "png", "gif", "bmp"];
    const FILE_UPLOAD_ERROR = [
        0 => "File uploaded with success",
        1 => "The uploaded file exceeds the upload_max_filesize directive in php.ini",
        2 => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
        3 => "The uploaded file was only partially uploaded",
        4 => "No file was uploaded",
        6 => "Missing a temporary folder",
        7 => "Failed to write file to disk.",
        8 => "A PHP extension stopped the file upload.",
    ];

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
        $sizeExtension = ["B", "KB", "MB", "GB", "TB"];

        for ($i = 0; $i < 4; $i++) {
            if ($fileSize < pow(1024, 1 + $i)) {
                return round($fileSize / pow(1024, 0 + $i), 2) . " " . $sizeExtension[$i];
            }
        }
        return round($fileSize / pow(1024, count($sizeExtension) - 1), 2) .
            " " . $sizeExtension[count($sizeExtension) - 1];
    }

    private static function addImagePreview($file)
    {
        return in_array(
            strtolower(pathinfo($file, PATHINFO_EXTENSION)), self::IMAGE_EXTENSION
        ) ? "<img class='preview' src='" . self::UPLOAD_PATH . $file . "'>" : "";
    }
}

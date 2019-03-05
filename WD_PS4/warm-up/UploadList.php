<?php

/**
 * Help with print and format upload list
 */
class UploadList
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
    const SIZE_EXTENSION = ["B", "KB", "MB", "GB", "TB"];

    /**
     * Print list of files in upload directory
     */
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

    /**
     * Format file size into readable value
     *
     * @param $fileSize int file size in bytes
     * @return string Formatted string
     */
    protected static function formatFileSize($fileSize)
    {
        $length = count(self::SIZE_EXTENSION);

        for ($i = 0; $i < $length; $i++) {
            if ($fileSize < pow(1024, 1 + $i) || $i == $length - 1) {
                return round($fileSize / pow(1024, 0 + $i), 2) . " " . self::SIZE_EXTENSION[$i];
            }
        }
    }

    /**
     * Create image preview for image file
     *
     * @param $file string File name
     * @return string Img tag or empty string
     */
    private static function addImagePreview($file)
    {
        return in_array(
            strtolower(pathinfo($file, PATHINFO_EXTENSION)), self::IMAGE_EXTENSION
        ) ? "<img class='preview' src='" . self::UPLOAD_PATH . $file . "'>" : "";
    }
}

<?php
session_start();
$envFile = './../../.env';
require './../environment_variables.php';
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database_name = getenv('DB_NAME');
$allowed_prefix = getenv('ALLOWED_ORIGIN');
// Get the Origin header from the incoming request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $allowed_prefix : exit();
// Check if the origin matches the allowed prefix
if ($origin && strpos($origin, $allowed_prefix) !== false) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Access-Control-Allow-Headers: *' );
  header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
  header('Access-Control-Allow-Credentials: true');
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
class Db {
  private static $instance = NULL;
  private function __construct() {}
  private function __clone() {}
  public static function getInstance($database_name, $host, $user, $password) {
      if (!isset(self::$instance)) {
          $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
          self::$instance = new PDO('mysql:host=' . $host . ';dbname=' . $database_name, $user, $password, $pdo_options);
      }
      return self::$instance;
  }
}

$db = Db::getInstance($database_name, $host, $user, $password);

function resizeAndCompressImage($file, $destination, $maxWidth, $maxHeight, $quality = 75) {
  // Check if the file was uploaded correctly
  if ($file['error'] !== UPLOAD_ERR_OK) {
      die('File upload error');
  }

  // Get the image details
  list($width, $height, $type) = getimagesize($file['tmp_name']);
  if (!$width || !$height) {
      die('Invalid image file');
  }

  // Calculate aspect ratio
  $aspectRatio = $width / $height;

  // Resize the image to fit the max width and height while maintaining the aspect ratio
  if ($width > $height) {
      $newWidth = $maxWidth;
      $newHeight = $maxWidth / $aspectRatio;
  } else {
      $newHeight = $maxHeight;
      $newWidth = $maxHeight * $aspectRatio;
  }

  // Create a new true color image for the resized version
  $newImage = imagecreatetruecolor($newWidth, $newHeight);

  // Load the source image based on its type
  switch ($type) {
      case IMAGETYPE_JPEG:
          $image = imagecreatefromjpeg($file['tmp_name']);
          break;
      case IMAGETYPE_PNG:
          $image = imagecreatefrompng($file['tmp_name']);
          imagealphablending($newImage, false);
          imagesavealpha($newImage, true);
          break;
      case IMAGETYPE_GIF:
          $image = imagecreatefromgif($file['tmp_name']);
          break;
      default:
          die('Unsupported image type');
  }

  // Resize the image
  imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

  // Create the output file and save it
  switch ($type) {
      case IMAGETYPE_JPEG:
          imagejpeg($newImage, $destination, $quality); // Save JPEG with compression quality
          break;
      case IMAGETYPE_PNG:
          imagepng($newImage, $destination); // Save PNG (lossless)
          break;
      case IMAGETYPE_GIF:
          imagegif($newImage, $destination);
          break;
  }

  // Free memory
  imagedestroy($image);
  imagedestroy($newImage);
}

// Check if a file was uploaded
if (isset($_FILES['image'])) {
  $file = $_FILES['image'];
  $uploadDir = 'uploads/'; // Directory where the resized image will be saved
  $maxWidth = 800; // Max width for the resized image
  $maxHeight = 600; // Max height for the resized image
  $quality = 85; // JPEG quality

  // Ensure the upload directory exists
  if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0777, true);
  }

  // Set the destination path
  $destination = $uploadDir . basename($file['name']);

  // Resize and compress the uploaded image
  resizeAndCompressImage($file, $destination, $maxWidth, $maxHeight, $quality);

  echo 'Image uploaded, resized, and compressed successfully!';
} else {
  echo 'No image uploaded.';
}
function is_encoded($string_to_test) {
    if (urlencode(urldecode($string_to_test)) === $string_to_test){
        return true;
    } else {
        return false;
    }
}
function is_json($string) {
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
}
function resizeCenterCompressImage($sourceImagePath, $targetWidth, $targetHeight, $outputImagePath, $quality = 75) {
    // Load the source image (JPEG example, but you can use PNG or GIF as well)
    $sourceImage = imagecreatefromjpeg($sourceImagePath);
    
    // Get the original image dimensions
    $sourceWidth = imagesx($sourceImage);
    $sourceHeight = imagesy($sourceImage);
    
    // Calculate the aspect ratio of the source image
    $aspectRatio = $sourceWidth / $sourceHeight;
    
    // Calculate the new dimensions while preserving the aspect ratio
    if ($targetWidth / $targetHeight > $aspectRatio) {
        $newWidth = $targetHeight * $aspectRatio;
        $newHeight = $targetHeight;
    } else {
        $newWidth = $targetWidth;
        $newHeight = $targetWidth / $aspectRatio;
    }
    
    // Create a new true color image with the target dimensions
    $targetImage = imagecreatetruecolor($targetWidth, $targetHeight);
    
    // Fill the target image with a background color (white in this case)
    $white = imagecolorallocate($targetImage, 255, 255, 255);
    imagefill($targetImage, 0, 0, $white);
    
    // Calculate the position to center the image
    $xOffset = ($targetWidth - $newWidth) / 2;
    $yOffset = ($targetHeight - $newHeight) / 2;
    
    // Resize and copy the source image onto the target image, keeping it centered
    imagecopyresampled($targetImage, $sourceImage, $xOffset, $yOffset, 0, 0, $newWidth, $newHeight, $sourceWidth, $sourceHeight);
    
    // Compress and output the image to the specified file path
    imagejpeg($targetImage, $outputImagePath, $quality);  // The quality parameter controls the compression (1-100)
    
    // Clean up
    imagedestroy($sourceImage);
    imagedestroy($targetImage);
}

function safeUnlink($filePath) {
  // Check if the file exists
  if (file_exists($filePath)) {
      // Check if the file is writable
      if (is_writable($filePath)) {
          // Attempt to unlink (delete) the file
          if (unlink($filePath)) {
              echo 'The file has been successfully deleted.';
          } else {
              echo 'There was an error deleting the file. Please check permissions.';
          }
      } else {
          echo 'The file is not writable. Cannot delete the file.';
      }
  }
}


function getAuthorizationHeader(){
  $headers = null;
  if (isset($_SERVER['Authorization'])) {
      $headers = trim($_SERVER["Authorization"]);
  }
  else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
      $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
  } elseif (function_exists('apache_request_headers')) {
      $requestHeaders = apache_request_headers();
      // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
      $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
      //print_r($requestHeaders);
      if (isset($requestHeaders['Authorization'])) {
          $headers = trim($requestHeaders['Authorization']);
      }
  }
  return $headers;
}
if (isset($_COOKIE['set_tok'])) {

  $set_tok = $_COOKIE['set_tok'];
  $header = getAuthorizationHeader();
  if(isset($_SESSION['user'])){
      
    $token = $_SESSION['user'][0]['token'];

    if($set_tok === null) {
        exit();
    }
    if ($token !== null) {
        // Bearer token is sent in the format: "Bearer <token>"
  
        $requete2 = 'SELECT token FROM user';
        $resultat2 = $db->query($requete2);
        $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
    
    
        if($set_tok !== null && $user[0]['token'] === $token) {
        }else {
            http_response_code(403);
            exit();
        }   
      }else {
        exit();
      }
    //$input = file_get_contents("php://input", "r");
  $date = new DateTime();
  $timestamp = $date->getTimestamp();
  $str = isset($_GET['name']) ? utf8_decode(urldecode(html_entity_decode(htmlspecialchars(strip_tags($_GET['name']))))) : exit;
  $str = str_ends_with($str, '=') ? str_replace('=', '', $str) : $str;
  $extension = explode(".", $_FILES["file"]["name"]);
  $imageFileType = $extension[count($extension) - 1];

  $target_dir = "./";
  $target_file = $_GET["name"] ? $target_dir . basename(html_entity_decode(htmlspecialchars(strip_tags($_GET["name"])))) : exit;
  $uploadOk = 1;
  $imageFileTypes = ["jpg", "png", "jpeg"];

  // Check if image file is a actual image or fake image
  if(in_array($imageFileType, $imageFileTypes) && isset($_FILES["file"]["tmp_name"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
    
    } else {
      echo "File is not an image.";
      http_response_code(403);
      exit();

    }
  }
    $extensions_array = ["jpg", "png", "jpeg", "pdf", "gif", "mp3", "mp4", "wav", "wma"];
    // Allow certain file formats
    if(!in_array($imageFileType, $extensions_array)) {
      echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
      $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {

      // Example usage
      $sourceImagePath = $_FILES["file"]["tmp_name"];
      $targetWidth = 1950;
      $targetHeight = 1050;
      $outputImagePath = $_GET["name"];
      $quality = 75;  // JPEG compression quality (1 = worst, 100 = best)
      $filePath = './' . basename($_GET['name']);
      safeUnlink($filePath);
      resizeCenterCompressImage($sourceImagePath, $targetWidth, $targetHeight, $outputImagePath, $quality);
      /*if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode("ok");
        exit();
      } else {
        echo "Sorry, there was an error uploading your file.";
      }*/
    }
  
  } else {
    http_response_code(403);
    exit();
  }
}
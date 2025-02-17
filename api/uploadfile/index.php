<?php

session_start();

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

function resizeAndCompressImage($file, $destination, $maxWidth, $maxHeight, $quality = 50) {
 
  // Load the image
  $imagePath = $file;
  $imageInfo = getimagesize($imagePath);
  $mimeType = $imageInfo['mime'];
  
  switch ($mimeType) {
      case 'image/jpeg':
          $srcImage = imagecreatefromjpeg($imagePath);
          break;
      case 'image/png':
          $srcImage = imagecreatefrompng($imagePath);
          break;
      case 'image/gif':
          $srcImage = imagecreatefromgif($imagePath);
          break;
      default:
          die('Unsupported image format');
  }
  
  // Get original dimensions
  $originalWidth = imagesx($srcImage);
  $originalHeight = imagesy($srcImage);
  
  // New desired width (keep aspect ratio)
  $newWidth = 2200; 
  $newHeight = (int) ($originalHeight * ($newWidth / $originalWidth));
  
  // Create a new image with the new dimensions
  $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
  
  // Resample the image to the new size
  imagecopyresampled($resizedImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);
  
  // Get the real path to save the resized image in a folder
  $savePath = './' . $_GET['name']; // Assuming the 'images' folder is inside your document root
  
  // Save the resized image (JPEG format)
  imagejpeg($resizedImage, $savePath);
  
  
  // Free memory
  imagedestroy($image);
  imagedestroy($newImage);
  
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
    // Load the image (supports JPEG, PNG, GIF)
    $imageInfo = getimagesize($sourceImagePath);
    $mimeType = $imageInfo['mime'];

    switch ($mimeType) {
        case 'image/jpeg':
            $srcImage = imagecreatefromjpeg($sourceImagePath);
            break;
        case 'image/jpg':
          $srcImage = imagecreatefromjpeg($sourceImagePath);
          break;
        case 'image/png':
            $srcImage = imagecreatefrompng($sourceImagePath);
            break;
        case 'image/gif':
            $srcImage = imagecreatefromgif($sourceImagePath);
            break;
        default:
            die('Unsupported image format');
    }

    
    $quality = 60;  // Set JPEG compression level (0-100)
    $savePath = './' . basename($_GET['name']);
    imagejpeg($srcImage, $savePath, $quality); // Save as JPEG

    // Clean up resources
    imagedestroy($srcImage);

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
      http_response_code(403);
      exit();
    }
    $extension = explode(".", $_FILES["file"]["name"]);
    $imageFileType = $extension[count($extension) - 1];
    $extensions_array1 = ["mp3", "mp4", "pdf"];
    $target_dir = "./";
    $target_file = $_GET["name"] ? $target_dir . basename(html_entity_decode(htmlspecialchars(strip_tags($_GET["name"])))) : exit;
    // Allow certain file formats
    
    if(in_array($imageFileType, $extensions_array1)) {
      if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode("ok");
        exit();
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
    }
    //$input = file_get_contents("php://input", "r");
    $date = new DateTime();
    $timestamp = $date->getTimestamp();
    $str = isset($_GET['name']) ? utf8_decode(urldecode(html_entity_decode(htmlspecialchars(strip_tags($_GET['name']))))) : exit;
    $str = str_ends_with($str, '=') ? str_replace('=', '', $str) : $str;
    $uploadOk = 1;
    $imageFileTypes = ["jpg", "png", "jpeg"];

    // Check if image file is a actual image or fake image
    if(in_array($imageFileType, $imageFileTypes) && isset($_FILES["file"]["tmp_name"])) {
      $check = getimagesize($_FILES["file"]["tmp_name"]);
      if($check !== false) {
        $extensions_array = ["jpg", "png", "jpeg"];
        // Allow certain file formats
        if(!in_array($imageFileType, $extensions_array)) {
          echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
          $uploadOk = 0;
        }
    
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
          
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
          exit();
          /*if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo json_encode("ok");
            exit();
          } else {
            echo "Sorry, there was an error uploading your file.";
          }*/
        }
      
      } else {
        echo "File is not an image.";
        http_response_code(403);
        exit();

      }
      
      
    }
   
     
    
  
  } else {
    http_response_code(403);
    exit();
  }
}
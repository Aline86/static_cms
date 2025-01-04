<?php

include 'environment_variables.php';
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database_name = getenv('DB_NAME');
$allowed_prefix = getenv('ALLOWED_ORIGIN');
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
// Get the Origin header from the incoming request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if the origin matches the allowed prefix
if ($origin && strpos($origin, $allowed_prefix) !== false) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Headers: *' );
    header('Access-Control-Allow-Methods: *');
}

if ($_SERVER["REQUEST_METHOD"] === 'DELETE' && $_GET['token'] !== null ) {
  if(file_exists(utf8_decode(urldecode($_GET['name'])))) {
    // Attempt to delete the file
    if (unlink(utf8_decode(urldecode($_GET['name'])))) {
      echo "File deleted successfully.";
      exit;
    } else {
      echo "Error: Could not delete the file.";
      exit;
    }
  }
  exit;
} 

if(isset($_GET['token'])){
    
  $token = $_GET['token'] ?? null;

  if(in_array($method, $methods_to_check) && $token === null) {
      exit();
  }
  if ($token !== null) {
      // Bearer token is sent in the format: "Bearer <token>"

      if(in_array($method, $methods_to_check) && $token === null) {
          exit();
      }
      $requete2 = 'SELECT * FROM user WHERE token=:token';
      $resultat2 = $db->prepare($requete2);
      $resultat2->bindParam(':token', $token, PDO::PARAM_STR);
      $resultat2->execute(); 
      $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);

      if(count($user) > 0 ) {
          unset($_POST['token']);
      }
      else {
          exit();
      }
  
  } else {
    exit();
  }
}
//$input = file_get_contents("php://input", "r");
$date = new DateTime();
$timestamp = $date->getTimestamp();
$str = utf8_decode(urldecode($_GET['name']));
$str = str_ends_with($str, '=') ? str_replace('=', '', $str) : $str;

$target_dir = "./";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["file"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists


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
  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["file"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}


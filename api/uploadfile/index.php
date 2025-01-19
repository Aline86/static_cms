<?php
session_start();
$envFile = './../../.env.local';
require './../environment_variables.php';
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
print_r($password);
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


if(isset($_GET['token'])){
    
  $token = strip_tags($_GET['token']) ?? null;

  if($token === null) {
      exit();
  }
  if ($token !== null) {
      // Bearer token is sent in the format: "Bearer <token>"
 
    $requete2 = 'SELECT token FROM user';
    $resultat2 = $db->query($requete2);
    
    $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
 
    
    $hash = hash('sha256', $user[0]['token']);
  
    $session_hash = hash('sha256', $_SESSION['user'][0]['token']);

    if($token === $hash  && $hash === $session_hash) {
        
     
        
    }else {
      exit();
    }
  
  
  } else {
    exit();
  }
}
//$input = file_get_contents("php://input", "r");
$date = new DateTime();
$timestamp = $date->getTimestamp();
$str = isset($_GET['name']) ? utf8_decode(urldecode($_GET['name'])) : exit;
$str = str_ends_with($str, '=') ? str_replace('=', '', $str) : $str;

$target_dir = "./";
$target_file = isset($_FILES["file"]["name"]) ? $target_dir . basename($_FILES["file"]["name"]) : exit;
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
    echo json_encode(htmlspecialchars( basename( $_FILES["file"]["name"])));
    exit();
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}


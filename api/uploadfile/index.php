<?php
session_start();
$envFile = './../../.env.local';
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
    
    
        if($set_tok === $header && $user[0]['token'] === $token) {
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
      if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode(basename( html_entity_decode(htmlspecialchars(strip_tags($_GET["name"])))));
        exit();
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
    }
  
  } else {
    http_response_code(403);
    exit();
  }
}
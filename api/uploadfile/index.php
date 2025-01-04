<?php


if (isset($_SERVER["HTTP_ORIGIN"]) === true) {
	$origin = $_SERVER["HTTP_ORIGIN"];
	$allowed_origins = array(
		"http://localhost:5173",

	);
	if (in_array($origin, $allowed_origins, true) === true) {
		header('Access-Control-Allow-Origin: ' . $origin);
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Methods: POST, DELETE');
		header('Access-Control-Allow-Headers: Content-Type');
	}
	if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
		exit; // OPTIONS request wants only the policy, we can stop here
	}
}
print_r($_GET);
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


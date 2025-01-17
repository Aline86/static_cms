<?php
$envFile = './../.env.local';
include 'environment_variables.php';
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database_name = getenv('DB_NAME');
$allowed_prefix = getenv('ALLOWED_ORIGIN');

// Get the Origin header from the incoming request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if the origin matches the allowed prefix
if ($origin && strpos($origin, $allowed_prefix) !== false) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
else {
    exit();
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

$method = htmlspecialchars(strip_tags($_GET['method'])) !== null ? $_GET['method'] : null; //return GET, POST, PUT, DELETE



// Function to decrypt data using AES (similar to CryptoJS)
function decryptData($encryptedData, $secretKey) {
    // Decode the base64 encoded ciphertext
    $ciphertext = base64_decode($encryptedData);

    // Define the encryption method
    $method = 'aes-256-cbc';

    // Initialize the key and IV (Initialization Vector)
    // In CryptoJS, AES uses a fixed size key and IV
    // For PHP, we need to derive the key and IV from the secret key

    $key = hash('sha256', $secretKey, true); // Derive key from secret key
    $iv = substr(hash('sha256', $secretKey), 0, 16); // Derive IV from secret key

    // Decrypt the data using OpenSSL
    $decrypted = openssl_decrypt($ciphertext, $method, $key, OPENSSL_RAW_DATA, $iv);
   
    // Return the decrypted data
    return json_decode($decrypted, true);
}

if($method === "connexion" && htmlspecialchars(strip_tags($_POST['email'])) !== null && htmlspecialchars(strip_tags($_POST['password'])) !== null) {
    
    $requete = 'SELECT password FROM user WHERE email = :email';
    $resultat = $db->prepare($requete);
    $resultat->bindValue(':email', $_POST['email']);
    $resultat->execute();  
    $user = $resultat->fetchAll(PDO::FETCH_ASSOC); 
        
   
    $hashed = password_verify($_POST['password'], $user[0]['password']);
  

    if($hashed) {
        $token = bin2hex(random_bytes(16));
    
        $requete = 'UPDATE user SET token=:token WHERE email=:email AND password=:password';
        $resultat = $db->prepare($requete);
        $resultat->bindValue(':token',  $token);
        $resultat->bindValue(':email', $_POST['email']);
        $resultat->bindValue(':password', $user[0]['password']);
        $res = $resultat->execute();  
   
    
        $requete2 = 'SELECT token FROM user WHERE email = :email AND password = :password AND token=:token';
        $resultat2 = $db->prepare($requete2);
        $resultat2->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
        $resultat2->bindParam(':password', $user[0]['password'], PDO::PARAM_STR);
        $resultat2->bindParam(':token',  $token, PDO::PARAM_STR);
        $resultat2->execute(); 
        $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
       
      
        session_set_cookie_params([
            'lifetime' => 3600, // 1 hour
            'path' => '/',
            'domain' => $origin,  // Set this for your domain
            'secure' => true,  // Use true for HTTPS in production
            'httponly' => true,
            'samesite' => 'None',  // Necessary for cross-site cookies
           
            
        ]);
        session_start();
        $_SESSION['user'] = $user;
     
        http_response_code(200);
        echo  json_encode($user);
        exit();
    }
    else {
        http_response_code(403);
        return false;
    }
}
if($method === "delete_connexion" && isset($_POST['email'])  && isset($_POST['password'])) {

    $requete = 'SELECT password FROM user WHERE email = :email';
    $resultat = $db->prepare($requete);
    $resultat->bindValue(':email', $_POST['email']);
    $user = $resultat->fetchAll(PDO::FETCH_ASSOC); 
    $hashed = password_verify($_POST['password'], $user[0]['password']);
  
  
    if($hashed) {
        $token = '';
        $hashed = hash('sha512',  $_POST['password']);

        $requete = 'UPDATE user SET token=:token WHERE email=:email AND password=:password';
        $resultat = $db->prepare($requete);
        $resultat->bindValue(':token',  $token);
        $resultat->bindValue(':email', $_POST['email']);
        $resultat->bindValue(':password', $user[0]['password']);
        $resultat->execute(); 

        session_destroy(); 
        return true;
        
        exit();
    }
    else {
        return false;
    }

}

if($method === "check_token" && $_POST['token'] !== null) {
 
    $token = strip_tags($_POST['token']);

    $requete2 = 'SELECT token FROM user';
    $resultat2 = $db->query($requete2);
  
    $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
    $hash = hash('sha256', $user[0]['token']);

    if($hash === json_decode($_POST['token'])) {
        http_response_code(200);
        echo  json_encode($_POST['token']);
       
    }else {
        http_response_code(403);
    
    }
    
}


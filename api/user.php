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

$n = 6; 

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
function generateNumericOTP($n) { 
      
    // Take a generator string which consist of 
    // all numeric digits 
    $generator = "1357902468"; 
  
    // Iterate for n-times and pick a single character 
    // from generator and append it to $result 
      
    // Login for generating a random character from generator 
    //     ---generate a random number 
    //     ---take modulus of same with length of generator (say i) 
    //     ---append the character at place (i) from generator to result 
  
    $result = ""; 
  
    for ($i = 1; $i <= $n; $i++) { 
        $result .= substr($generator, (rand()%(strlen($generator))), 1); 
    } 
  
    // Return result 
    return $result; 
} 

if($method === "connexion" && htmlspecialchars(strip_tags($_POST['email'])) !== null && htmlspecialchars(strip_tags($_POST['password'])) !== null) {
    
    $requete = 'SELECT password FROM user WHERE email = :email';
    $resultat = $db->prepare($requete);
    $resultat->bindValue(':email', htmlspecialchars(strip_tags($_POST['email'])));
    $resultat->execute();  
    $user = $resultat->fetchAll(PDO::FETCH_ASSOC); 
        
  
    $hashed = password_verify($_POST['password'], $user[0]['password']);


    if($hashed) {
      
        $res = mail(

            'ca.haestie@gmail.com',
        
            'test',
        
            generateNumericOTP($n)
    
        
        );
    
        $token_for_bdd = bin2hex(random_bytes(16));
    
        $requete = 'UPDATE user SET token=:token WHERE email=:email AND password=:password';
        $resultat = $db->prepare($requete);
        $resultat->bindValue(':token',  $token_for_bdd);
        $resultat->bindValue(':email', $_POST['email']);
        $resultat->bindValue(':password', $user[0]['password']);
        $res = $resultat->execute();  
   
    
        $requete2 = 'SELECT token FROM user WHERE email = :email AND password = :password AND token=:token';
        $resultat2 = $db->prepare($requete2);
        $resultat2->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
        $resultat2->bindParam(':password', $user[0]['password'], PDO::PARAM_STR);
        $resultat2->bindParam(':token',  $token_for_bdd, PDO::PARAM_STR);
        $resultat2->execute(); 
        $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
       
      
        session_set_cookie_params([
            'lifetime' => 3600, // 1 hour
            'path' => '/',
            'domain' => $origin,  // Set this for your domain
            'secure' => true,  // Use true for HTTPS in production
            'httponly' => true,
            'samesite' => 'True',  // Necessary for cross-site cookies
           
            
        ]);
        session_start();
        
        $_SESSION['user'] = $user;
        $hash_front_token = bin2hex(random_bytes(16));
        $_SESSION['set_tok'] = $hash_front_token;
        $data = [];
        $data[0]['token'] = $hash_front_token;
        http_response_code(200);
        echo  json_encode($data);
        exit();
    }
    else {
        http_response_code(403);
        echo false;
    }
}
$token = getAuthorizationHeader();
if($method === "delete_connexion" && $token !== null) {
    session_destroy(); 
    return true;
    
    exit();
}

if($method === "check_token" && $token !== null) {
    session_start(); 

   

    $requete2 = 'SELECT token FROM user';
    $resultat2 = $db->query($requete2);
  
    $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);

    if($_SESSION['user'][0]['token'] === $user[0]['token']) {
        http_response_code(200);
        echo  json_encode($_SESSION['set_tok'] );
       
    }else {
        http_response_code(403);
    
    }
}


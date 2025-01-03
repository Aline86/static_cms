<?php
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
    header('Access-Control-Allow-Headers: ' . $origin);
    header('Access-Control-Allow-Methods: ' . $origin);
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

$method = isset($_GET['method']) ? $_GET['method'] : null; //return GET, POST, PUT, DELETE


if($method === "connexion" && $_POST['email'] !== null && $_POST['password'] !== null) {
    
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
       
        echo  json_encode($user);
        exit();
    }
    else {
        return false;
    }
}
if($method === "delete_connexion" && $_POST['email'] !== null && $_POST['password'] !== null) {
  
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
        return true;
        
        exit();
    }
    else {
        return false;
    }

}

if($method === "check_token") {
   
    $authorization_header = json_decode($_POST['token']) ?? null;
    $requete2 = 'SELECT count(token) as is_token FROM user WHERE token=:token';
    $resultat2 = $db->prepare($requete2);
    $resultat2->bindParam(':token',  $authorization_header, PDO::PARAM_STR);
    $resultat2->execute(); 
    $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
   
    echo  json_encode($user);
}


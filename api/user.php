<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:* ");
header("Access-Control-Allow-Methods:* ");
$database_name = 'welcome_poitiers_2';
class Db {
    private static $instance = NULL;
    private function __construct() {}
    private function __clone() {}
    public static function getInstance($database_name) {
        if (!isset(self::$instance)) {
            $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
            self::$instance = new PDO('mysql:host=localhost;dbname=' . $database_name, 'root', '', $pdo_options);
       
        }
        return self::$instance;
    }
}
$method = isset($_GET['method']) ? $_GET['method'] : null; //return GET, POST, PUT, DELETE
$db = Db::getInstance($database_name);

if($method === "connexion" && $_POST['email'] !== null && $_POST['password'] !== null) {
   
    $requete = 'SELECT email password FROM user WHERE email = :email AND password = :password';
    $resultat = $db->prepare($requete);
    $resultat->bindValue(':email', $_POST['email']);
    $resultat->bindValue(':password', $_POST['password']);
    $user = $resultat->execute();  

    if($user) {
        $token = bin2hex(random_bytes(16));
      
        $requete = 'UPDATE user SET token=:token WHERE email=:email AND password=:password';
        $resultat = $db->prepare($requete);
        $resultat->bindValue(':token',  $token);
        $resultat->bindValue(':email', $_POST['email']);
        $resultat->bindValue(':password', $_POST['password']);
        $resultat->execute();  

        $requete2 = 'SELECT * FROM user WHERE email = :email AND password = :password AND token=:token';
        $resultat2 = $db->prepare($requete2);
        $resultat2->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
        $resultat2->bindParam(':password', $_POST['password'], PDO::PARAM_STR);
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
    $requete = 'SELECT email password FROM user WHERE email = :email AND password = :password';
    $resultat = $db->prepare($requete);
    $resultat->bindValue(':email', $_POST['email']);
    $resultat->bindValue(':password', $_POST['password']);
    $user = $resultat->execute();  

    if($user) {
        $token = '';
      
        $requete = 'UPDATE user SET token=:token WHERE email=:email AND password=:password';
        $resultat = $db->prepare($requete);
        $resultat->bindValue(':token',  $token);
        $resultat->bindValue(':email', $_POST['email']);
        $resultat->bindValue(':password', $_POST['password']);
        $resultat->execute();  
        return true;
        
        exit();
    }
    else {
        return false;
    }

}
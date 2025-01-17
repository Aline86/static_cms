<?php
ob_start();
$envFile = './../.env.local';

require './environment_variables.php';
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

$pages_array = ['pages', 'page', 'text_picture', 'carousel', 'header', 'footer', 'common', 'picture_group', 'button', 'video', 'parallaxe'];
foreach($pages_array as $page_name) {
    include_once "./models/"  . $page_name . ".php";
}
$crud = ['get_', 'add_', 'update_', 'delete_', 'delete_child', 'all_'];
$method = isset($_GET['method']) ? $_GET['method'] : null; //return GET, POST, PUT, DELETE
$type = isset($_GET['type']) ? $_GET['type'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;
$id_component = isset($_GET['id_component']) ? $_GET['id_component'] : null;
$associated_method_for_delete = isset($_GET['associated_table']) ? $_GET['associated_table'] : null;

if(isset($_GET['type'])) {

    $methods_to_check = ['add_'. json_decode($_GET['type']), 'update_' . json_decode($_GET['type']), 'delete_' . json_decode($_GET['type']), 'delete_child', 'add_child'];
    if(in_array($method, $methods_to_check) && ($method === 'add_'. json_decode($_GET['type']) || $method === 'update_' . json_decode($_GET['type']) || $method === 'add_child') && (!isset($_POST['token']) || empty($_SESSION['user']))) {
        exit();
    }
    if(in_array($method, $methods_to_check) && ($method === 'delete_'. json_decode($_GET['type']) || $method === 'delete_child') && (!isset($_POST['token']) || empty($_SESSION['user']))) {
        exit();
    }
  
   
    if(isset($_POST['token'])){
        $token = json_decode($_POST['token']) ?? null;
 
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
        
        } 
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
        
        } 
    }

 
    if(isset($_POST['BASE_URL'])) {
        unset($_POST['BASE_URL']);
    }
    if(isset($_POST['parameters'])) {
        unset($_POST['parameters']);
    }
    if(isset($_POST['checked'])) {
        unset($_POST['checked']);
    }
    if(isset($_POST['token'])) {
        unset($_POST['token']);
    }
    $method_constructor = [];
    foreach ($_POST as $parameter => $data_sent) {
    
        if($parameter !== 'BASE_URL' || $parameter !== 'parameters' || $parameter !== 'checked') {
            if(is_json($data_sent)) {
                $method_params[$parameter] = json_decode($data_sent, true);
            }
            else if(is_encoded($data_sent)) {
                $method_params[$parameter] = urldecode($data_sent);
            }
            else if(!is_encoded($data_sent)) {
                $is_data_defined = utf8_encode($data_sent);
            
                if(isset($is_data_defined)) {
                    $string = "[" . trim($is_data_defined) . "]";
                    $method_params[$parameter] = json_decode(json_encode($string));
                }
                else {
                    $method_params[$parameter] = $data_sent;
                }
            }
        }
    
    }

    foreach($crud as $method_to_call) {
  
        if($method === 'delete_child' && $method_to_call === 'delete_child') {
        
            $method_params['id'] = $id;
            $method_params['associated_table'] = $associated_method_for_delete;
            $class = ucfirst($type);
    
            $model = new $class($type, $database_name, $host, $user, $password);
            echo json_encode($model->$method_to_call($method_params));
            exit();
        }
        if($method === 'delete' && $method_to_call === 'delete_' ) {
            $method_params['id'] = $id;
            $method_params['id_component'] = $id_component;
            $method_params['associated_table'] = $associated_method_for_delete;
            $method_name_to_call = $method_to_call . $type;
        
            $class = ucfirst($type);
            $model = new $class($type, $database_name, $host, $user, $password);
            echo json_encode($model->$method_name_to_call($method_params));
            exit();
        }
        if($method === $method_to_call . $type) {
    
            $class = ucfirst($type);
    
            $model = new $class($type, $database_name, $host, $user, $password);
        
            $method_name_to_call = $method_to_call . $type;
        
            if ($method_to_call === 'get_') {
                $method_params['id'] = $id;
            
                echo json_encode($model->$method_name_to_call($method_params));
                exit();
            }
            else if ($method_to_call === 'all_') {
                
                $method_params['component'] = $type;
                if($id !== null) {
                    $method_params['id_component'] = $id;
                }
            
                include 'models/additional_base.php';
                exit();
            }
            else {
                $method_params['id'] = $id;
                echo json_encode($model->$method_name_to_call($method_params));
                exit();
            }
            
        }
    }

    
}
?>
<?php

session_start();
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
    header('Access-Control-Allow-Origin: ' . $allowed_prefix);
    header('Access-Control-Allow-Headers: *' );
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
else {

    die();
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
function check_token($token, $db) {
    $requete2 = 'SELECT token FROM user';
    $resultat2 = $db->query($requete2);
    
    $user = $resultat2->fetchAll(PDO::FETCH_ASSOC);
    $hash = hash('sha256', $user[0]['token']);
    echo "<pre>hash";
    print_r($hash);
    echo "</pre>";
 
    $session_hash = hash('sha256', $_SESSION['user'][0]['token']);
    echo "<pre>session";
    print_r($session_hash);
    echo "</pre>";

    echo "<pre>token";
    print_r($token);
    echo "</pre>";
    if($token === $hash  && $hash === $session_hash) {
        
        http_response_code(200);
        return true;
        
    }else {
        http_response_code(403);
        return false;
    }
        
    
}
$pages_array = ['pages', 'page', 'text_picture', 'carousel', 'header', 'footer', 'common', 'picture_group', 'button', 'video', 'parallaxe'];
foreach($pages_array as $page_name) {
    include_once "./models/"  . $page_name . ".php";
}
$crud = ['get_', 'add_', 'update_', 'delete_', 'delete_child', 'all_'];
$method = isset($_GET['method']) && htmlspecialchars(strip_tags($_GET['method'])) !== null ? htmlspecialchars(strip_tags($_GET['method'])) : null; //return GET, POST, PUT, DELETE
$type = isset($_GET['type']) && htmlspecialchars(strip_tags($_GET['type'])) !== null ? htmlspecialchars(strip_tags($_GET['type'])) : null;
$id = isset($_GET['id']) && htmlspecialchars(strip_tags($_GET['id'])) !== null ? htmlspecialchars(strip_tags($_GET['id'])) : null;
$id_component = isset($_GET['id_component']) && htmlspecialchars(strip_tags($_GET['id_component'])) !== null ? htmlspecialchars(strip_tags($_GET['id_component'])) : null;
$associated_method_for_delete = isset($_GET['associated_table']) && htmlspecialchars(strip_tags($_GET['associated_table'])) !== null ? htmlspecialchars(strip_tags($_GET['associated_table'])) : null;
$token = "";
if(isset($_GET['type']) && htmlspecialchars(strip_tags($_GET['type'])) !== null) {
    
    $methods_to_check = ['add_'. json_decode(htmlspecialchars(strip_tags($_GET['type']))), 'update_' . json_decode(htmlspecialchars(strip_tags($_GET['type']))), 'delete_' . json_decode(htmlspecialchars(strip_tags($_GET['type']))), 'delete_child', 'add_child'];
   
   
    if(in_array($method, $methods_to_check))  {
     
        if(empty($_SESSION['user'])) {
           
            http_response_code(403);
            exit();
        }
    }
    
    if(in_array($method, $methods_to_check) && ($method === 'add_'. json_decode(htmlspecialchars(strip_tags($_GET['type']))) || $method === 'update_' . json_decode(htmlspecialchars(strip_tags($_GET['type']))) || $method === 'add_child') && (htmlspecialchars(strip_tags($token)) === null || empty($_SESSION['user']))) {
        exit();
    }
    if(in_array($method, $methods_to_check) && ($method === 'delete_'. json_decode(htmlspecialchars(strip_tags($_GET['type']))) || $method === 'delete_child') && (htmlspecialchars(strip_tags($token)=== null)  || empty($_SESSION['user']))) {
        exit();
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
        $token = json_decode(strip_tags($_POST['token']));
        unset($_POST['token']);
      
    }
    if(isset($_GET['token'])) {
        $token = strip_tags($_GET['token']);
        
    }
    $method_constructor = [];
    
    foreach ($_POST as $parameter => $data_sent) {
    
        if($parameter !== 'BASE_URL' || $parameter !== 'parameters' || $parameter !== 'checked') {
            if(is_json($data_sent)) {
                $method_params[$parameter] = json_decode(strip_tags($data_sent), true);
            }
            else if(is_encoded($data_sent)) {
                $method_params[$parameter] = urldecode(strip_tags($data_sent));
            }
            else if(!is_encoded($data_sent)) {
                $is_data_defined = utf8_encode($data_sent);
            
                if(isset($is_data_defined)) {
                    $string = "[" . trim($is_data_defined) . "]";
                    $method_params[$parameter] = json_decode(json_encode(strip_tags($string)));
                }
                else {
                    $method_params[$parameter] = strip_tags($data_sent);
                }
            }
        }
    
    }

    foreach($crud as $method_to_call) {
  
        if($method === 'delete_child' && $method_to_call === 'delete_child' && isset($_SESSION['user'])) {
            $can_access = check_token($token, $db);
            if($can_access) {
                $method_params['id'] = $id;
                $method_params['associated_table'] = $associated_method_for_delete;
                $class = ucfirst($type);
        
                $model = new $class($type, $database_name, $host, $user, $password);
                echo json_encode($model->$method_to_call($method_params));
            }
            else {
                http_response_code(403);
            }
            exit();
        }
        if($method === 'delete' && $method_to_call === 'delete_' && isset($_SESSION['user'])) {
            $can_access = check_token($token, $db);
            if($can_access) {
                $method_params['id'] = $id;
                $method_params['id_component'] = $id_component;
                $method_params['associated_table'] = $associated_method_for_delete;
                $method_name_to_call = $method_to_call . $type;
            
                $class = ucfirst($type);
                $model = new $class($type, $database_name, $host, $user, $password);
                echo json_encode($model->$method_name_to_call($method_params));
                exit();
            } else {
                http_response_code(403);
            }
          
        }
        if($method === $method_to_call . $type) {

            if ($method_to_call === 'get_') {
                $class = ucfirst($type);
    
                $model = new $class($type, $database_name, $host, $user, $password);
            
                $method_name_to_call = $method_to_call . $type;
                $method_params['id'] = $id;
            
                echo json_encode($model->$method_name_to_call($method_params));
                exit();
            }
            else if ($method_to_call === 'all_') {
                $class = ucfirst($type);
    
                $model = new $class($type, $database_name, $host, $user, $password);
            
                $method_name_to_call = $method_to_call . $type;
                $method_params['component'] = $type;
                if($id !== null) {
                    $method_params['id_component'] = $id;
                }
            
                include 'models/additional_base.php';
                exit();
            }
            else if(isset($_SESSION['user'])){
                $can_access = check_token($token, $db);
                if($can_access) {
                    $class = ucfirst($type);
        
                    $model = new $class($type, $database_name, $host, $user, $password);
                
                    $method_name_to_call = $method_to_call . $type;
                    $method_params['id'] = $id;
                    echo json_encode($model->$method_name_to_call($method_params));
                    exit();
                }
                else {
                    http_response_code(403);
                }
              
            }
            
        }
    }


    
}
?>
<?php

class Carousel {
    private static $db;
    private $type;
    
    function __construct($database_singleton, $type) {
        self::$db = $database_singleton;
        $this->type = $type;
    }
    public static function get($params)
    {
        include_once './model_snippets/get.php';
    } 
    
    public static function add($parameters)
    {
        include_once './model_snippets/add.php';
    }

    public static function add_children($data_decoded, $parent_id)
    {
        include_once './model_snippets/add_children.php';   
    }

    public static function update_children($params, $id_child_type)
    {
        include_once './model_snippets/update_children.php'; 
    }

    public static function delete_child($params)
    {
        include_once './model_snippets/delete_child.php';  
    }

    public static function delete($params)
    {     
        include_once './model_snippets/delete.php';  ;   
    }
  
    public static function update($params)
    {  
        include_once './model_snippets/update.php';  
    } 
}
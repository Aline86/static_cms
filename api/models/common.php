<?php

class Common {
    private static $db;
    private $type;
    
    function __construct($type) {
        self::$db = DB::getInstance();
        $this->type = $type;
    }
    public  function get_common($parameters)
    {   
        include 'model_snippets/get.php';
    } 
    
    public  function add_common($parameters)
    {
        include 'model_snippets/add.php';
    }

    public  function add_children($data_decoded, $parent_id)
    {
        include 'model_snippets/add_children.php';   
    }

    public  function update_children($parameters, $id_child_type)
    {
        include 'model_snippets/update_children.php'; 
    }

    public  function delete_child($parameters)
    {
        include 'model_snippets/delete_child.php';  
    }

    public  function delete_common($parameters)
    {     
        include 'model_snippets/delete.php';  ;   
    }
  
    public  function update_common($parameters)
    {  
        include 'model_snippets/update.php';  
    } 
}
<?php

class Button {
    private static $db;
    private $type;
    private $associated_tables;
    private $database_name ;
    function __construct($type, $database_name, $host, $user, $password) {
        self::$db = DB::getInstance($database_name, $host, $user, $password);
        $this->type = $type;
        $this->database_name = $database_name;
        $this->associated_tables = $this->get_associated_tables();
      
    }
    public  function get_button($parameters)
    {
       
        $resultat = include 'model_snippets/get.php';
        
        return $resultat;
    } 
    public function get_associated_tables()
    {
        $requete = 'SELECT TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME = "'. $this->type .'" AND TABLE_SCHEMA = "' .$this->database_name . '"';
        $resultat = self::$db->query($requete);
        $resultat->execute();
        $tables = $resultat->fetchAll();

        $associated_tables = [];
        foreach($tables as $table) {
            $associated_tables[$table['TABLE_NAME']] = $table['TABLE_NAME'];
        }
        return $associated_tables;
    }
    public  function add_button($parameters)
    {
        include 'model_snippets/add.php';
    }
    public  function all_button($parameters)
    {
        include 'model_snippets/all.php';
    }
    public  function add_children($data_decoded, $parent_id, $associated_table_name)
    {
        include 'model_snippets/add_children.php';   
    }

    public  function update_children($data_decoded, $parent_id, $associated_table_name)
    {
        include 'model_snippets/update_children.php'; 
    }

    public  function delete_child($parameters)
    {
        include 'model_snippets/delete_child.php';  
    }

    public  function delete_button($parameters)
    {     
        include 'model_snippets/delete.php';  ;   
    }
   
    public  function update_button($parameters)
    {  
        include 'model_snippets/update.php';  
    } 
}
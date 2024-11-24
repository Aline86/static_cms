<?php

class Text_picture {
    private static $db;
    private $associated_tables;
    private $type;
    
    function __construct($type) {
        self::$db = DB::getInstance();
        $this->type = $type;
        $this->associated_tables = $this->get_associated_tables();
    }
    public  function get_text_picture($parameters)
    {
       
        $resultat = include 'model_snippets/get.php';
        
        return $resultat;
    } 
    public function get_associated_tables()
    {
        $requete = 'SELECT TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME = "'. $this->type .'" AND TABLE_SCHEMA = "welcome_poitiers_2"';
        $resultat = self::$db->query($requete);
        $resultat->execute();
        $tables = $resultat->fetchAll();

        $associated_tables = [];
        foreach($tables as $table) {
            $associated_tables[$table['TABLE_NAME']] = $table['TABLE_NAME'];
        }
        return $associated_tables;
    }
    public  function add_text_picture($parameters)
    {
        include 'model_snippets/add.php';
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

    public  function delete_text_picture($parameters)
    {     
        include 'model_snippets/delete.php';  ;   
    }
   
    public  function update_text_picture($parameters)
    {  
        include 'model_snippets/update.php';  
    } 
}
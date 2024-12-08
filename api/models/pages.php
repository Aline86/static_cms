<?php
class Pages {
    private static $db;
    function __construct($database_name) {
        self::$db = Db::getInstance($database_name);
    }
    public static function get_pages(){
        $requete='SELECT DISTINCT * FROM page ';
        $resultat=self::$db->query($requete);
        $resultat->execute();
        return $resultat->fetchAll();
    }   
}
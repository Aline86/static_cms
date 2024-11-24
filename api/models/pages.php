<?php
class Pages {
    private static $db;
    function __construct() {
        self::$db = Db::getInstance();
    }
    public static function get_pages(){
        $requete='SELECT DISTINCT * FROM page ';
        $resultat=self::$db->query($requete);
        $resultat->execute();
        return $resultat->fetchAll();
    }   
}
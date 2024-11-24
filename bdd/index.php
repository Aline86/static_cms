<?php
class Db {
private static $instance = NULL;
private function __construct() {}
private function __clone() {}
public static function getInstance() {
    if (!isset(self::$instance)) {
        $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
        self::$instance = new PDO('mysql:host=localhost;dbname=welcome_poitiers_2', 'root', '', $pdo_options);
    }
        return self::$instance;
    }
}

/*Table structure for table `page` */
$db = Db::getInstance();

$requete='CREATE TABLE IF NOT EXISTS `page` (
  `id` int(11) NOT NULL auto_increment,        
  `title` varchar(250)  NOT NULL default "",  
  `type` varchar(55)  NOT NULL default "page",    
   PRIMARY KEY  (`id`) 
);';
$db->query($requete);
/*Table structure for table `picture_group` */

$requete='CREATE TABLE IF NOT EXISTS `picture_group` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",           
    `card_number` int(8)  NOT NULL , 
    `type` varchar(55)  NOT NULL default "picture_group",     
    `width` int(11)  NOT NULL default 21,
    `height` int(11)  NOT NULL default 250,
    `gap` int(11)  NOT NULL default 30,
    `text` text NOT NULL default "", 
    `bloc_number` int(11)  NOT NULL ,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);';
$db->query($requete);

/*Table structure for table `picture_group_data` */

$requete='CREATE TABLE IF NOT EXISTS `picture_group_data` (
    `id` int(11) NOT NULL auto_increment,   
    `title` varchar(250)  NOT NULL default "",          
    `type` varchar(55)  NOT NULL default "picture_group_data",     
    `href_url` varchar(250)  NOT NULL default "",  
    `image_url` varchar(250)  NOT NULL default "",     
    `text` varchar(250)  NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "",     
    `text_color` varchar(250)  NOT NULL default "",     
    `card_number` int(11)  NOT NULL,   
    `is_data_button` boolean default false,  
    `picture_group_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`picture_group_id`) REFERENCES picture_group(`id`) ON DELETE CASCADE
);';


/*Table structure for table `picture_group` */

$requete='CREATE TABLE IF NOT EXISTS `button` (

`id` int(11) NOT NULL auto_increment,        
`title` varchar(250)  NOT NULL default "",  
`type` varchar(55)  NOT NULL default "button",             
`card_number` int(8)  NOT NULL , 

`width` int(11)  NOT NULL default 21,
`height` int(11)  NOT NULL default 250,
`gap` int(11)  NOT NULL default 30,
`text` text NOT NULL default "",    
`bloc_number` int(11)  NOT NULL ,
`page_id` int(11)  NOT NULL,
 PRIMARY KEY  (`id`),
 FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);';
$db->query($requete);
/*Table structure for table `card` */

$requete='CREATE TABLE IF NOT EXISTS `button_data` (
    `id` int(11) NOT NULL auto_increment,   
    `title` varchar(250)  NOT NULL default "",          
    `type` varchar(55)  NOT NULL default "button_data",     
    `href_url` varchar(250)  NOT NULL default "",  
    `image_url` varchar(250)  NOT NULL default "",     
    `text` varchar(250)  NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "",     
    `text_color` varchar(250)  NOT NULL default "",     
    `card_number` int(11)  NOT NULL,   
    `pbutton_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`button_id`) REFERENCES button(`id`) ON DELETE CASCADE
);';
/*Table structure for table `carousel` */

$requete='CREATE TABLE IF NOT EXISTS `carousel` (

    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",  
    `type` varchar(55)  NOT NULL default "carousel",           
    `isAutomatique` boolean  ,     
    `card_number` int(8)  NOT NULL , 

    `width` int(11)  NOT NULL default 21,
    `height` int(11)  NOT NULL default 250,
    `gap` int(11)  NOT NULL default 30,

    `bloc_number` int(11)  NOT NULL ,
    `page_id` int(11)  NOT NULL,
     PRIMARY KEY  (`id`),
     FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
  );';
$db->query($requete);
/*Table structure for table `card` */

$requete='CREATE TABLE IF NOT EXISTS `carousel_data` (
    `id` int(11) NOT NULL auto_increment,   
    `title` varchar(250)  NOT NULL default "",          
    `type` varchar(55)  NOT NULL default "carousel_data",     
    `href_url` varchar(250)  NOT NULL default "",  
    `image_url` varchar(250)  NOT NULL default "",     
    `text` varchar(250)  NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "",     
    `text_color` varchar(250)  NOT NULL default "",     
    `card_number` int(11)  NOT NULL,   
    `carousel_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`carousel_id`) REFERENCES carousel(`id`) ON DELETE CASCADE
  );';
  
/*Table structure for table `bloc` */

$db->query($requete);
$requete='CREATE TABLE IF NOT EXISTS `text_picture` (
    `id` int(11) NOT NULL auto_increment,  
    `title` varchar(250)  NOT NULL default "", 
    `type` varchar(55)  NOT NULL default "text_picture",           
    `show_picture` boolean default true ,     
    `show_text` boolean default true   ,  
    `bloc_column` boolean  default false  ,     
    `image_right` boolean default false  ,  
    `is_parallaxe` boolean default false  ,    
    `text_button_more` boolean default false   ,        
     
    `text` text NOT NULL default "",     
    `image` varchar(250)  NOT NULL default "",     
    `alt_image` varchar(250)  NOT NULL default "",     
    `css` text NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "#fffffff",     
    `bloc_number` int(11)  NOT NULL,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`)
);';
$db->query($requete);
  
/*Table structure for table `header` */

$requete='CREATE TABLE IF NOT EXISTS `header` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "header",   
    `logo_url` varchar(250)  NOT NULL default "",
    `background_url` varchar(250)  NOT NULL default "",
    PRIMARY KEY  (`id`)
)';
$db->query($requete);
/*Table structure for table `footer` */

$requete='CREATE TABLE IF NOT EXISTS `footer` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "footer",         
    `map_iframe_url` text  NOT NULL default "",
    `background_color` varchar(250)  NOT NULL default "",

    PRIMARY KEY  (`id`)
)';
/*Table structure for table `links_footer` */
$db->query($requete);
$requete='CREATE TABLE IF NOT EXISTS `links_footer` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "links_footer",    
    `name` varchar(250)  NOT NULL default "",     
    `logo_url` varchar(250)  NOT NULL default "",
    `background_url` varchar(250)  NOT NULL default "",

    `footer_id` int,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`footer_id`) REFERENCES footer(`id`) ON DELETE CASCADE
)';
$db->query($requete);

$requete='CREATE TABLE IF NOT EXISTS `address` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "address",  
    `address` varchar(250)  NOT NULL default "",
    `town` varchar(250)  NOT NULL default "",
    `address_id` int,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`address_id`) REFERENCES footer(`id`) ON DELETE CASCADE

)';

/*Table structure for table `header_data` */
$db->query($requete);

$requete='CREATE TABLE IF NOT EXISTS `header_data` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "links_footer",         
    `name` varchar(250)  NOT NULL default "",     
    `logo_url` varchar(250)  NOT NULL default "",
    `background_url` varchar(250)  NOT NULL default "",

    `header_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`header_id`) REFERENCES header(`id`) ON DELETE CASCADE
)';
/*Table structure for table `links_footer` */
$db->query($requete);

/*Table structure for table `common_settings` */
$requete='CREATE TABLE IF NOT EXISTS `common` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "common",       
    `fond` varchar(11)  NOT NULL default "",     
    `titles` varchar(11)  NOT NULL default "",
    `background_color_buttons` varchar(11)  NOT NULL default "",
    PRIMARY KEY  (`id`)
);';
$db->query($requete);
?>
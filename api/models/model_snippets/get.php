<?php

    $id = -1;
    $id_type = null;
    $bloc_number = null;
    $associated_component_ids = [];
  
    foreach($parameters as $parameter => $data_value) {
        if($parameter === 'id') {
            $id = $data_value;
        }
        if($parameter === $this->type . '_id') {
            $id_type = $this->type . '_id';
        }
        if(in_array(str_replace('_id', '', $parameter), $this->associated_tables)) {
            $associated_component_ids[$parameter] = $data_value;
        }
        if($parameter === 'bloc_number') {
            $bloc_number = $data_value;
        }
    }
    $requete='SELECT DISTINCT * FROM ' . $this->type . ' WHERE id = ' . $id;
    if(count($associated_component_ids) <= 0) {
        foreach($associated_component_ids as $associated_component_name => $associated_component_id) {
            $requete .= ' AND ' . $associated_component_name . ' = ' . $associated_component_id;
        }
        
    }
    else if(!is_null($bloc_number)) {
        $requete .= ' AND bloc_number = ' . $bloc_number;
        
    }
   

    $resultat = self::$db->query($requete);

    $resultat->execute();
 
    $bloc = $resultat->fetchAll(PDO::FETCH_CLASS);


    if(!is_null($this->associated_tables)) {
        $i = 0;
        foreach($this->associated_tables as $associated_attribute_name) {
            $requete='SELECT * FROM ' . $associated_attribute_name . ' WHERE ' . $this->type . '_id' . ' = ' . $id;
   
            $sub_result = self::$db->query($requete);
            $sub_result->execute();
          
            while($sub = $sub_result->fetchObject()){
                $bloc[$i]->$associated_attribute_name[] = $sub;  
            }
       
        }
    }
    return $bloc;
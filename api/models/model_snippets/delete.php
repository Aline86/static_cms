<?php

    $id = -1;
    $id_component = null;
    foreach($parameters as $parameter => $data_value) {
        if($parameter === 'id') {
            $id = $data_value;
        }  
        if($parameter === 'id_component') {
            $id_component = $data_value;
        }  
        if($parameter === 'associated_table') {
            $associated_table = $data_value;
        }
    }

    $query = 'DELETE FROM ' . $this->type . ' WHERE id=:id';
    if(!is_null($id_component)) {
        $query .= ' AND :' . $associated_table . '_id =' . $associated_table . '_id';
    }
   
    $q = self::$db->prepare($query);
    $q->bindValue(':id', $id);
    $q->bindValue(':' . $associated_table . '_id', $id_component);
    $SQL_result = $q->execute();   

    return $SQL_result;  
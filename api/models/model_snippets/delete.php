<?php

    $id = -1;
    $associated_table = null;
    foreach($parameters as $parameter => $data_value) {
        if($parameter === 'id') {
            $id = $data_value;
        }  
    }
    $q = self::$db->prepare('DELETE FROM ' . $this->type . ' WHERE id=:id');
    $q->bindValue(':id', $id);
    $SQL_result = $q->execute();   

    return $SQL_result;  
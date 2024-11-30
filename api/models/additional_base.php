<?php
/**
 * base that calls all needed components dynamically for one one component type and outputs an aggregation of the called components
 * 2 cases :
 * - call of all components of one level for one component type
 * - call of several components of several levels for one component type (expample: all page's related components such as carousel, picture_image etc)
 */

 /**
  * ALGO
  * params : method_params has a parameter called id => it means that the request is related to a component with id (we are then in case two : call of several components of several levels for one component type)
  * method_params has no parameter called id => we are the in case one
  */
    include_once 'all.php';

    $component = isset($method_params['component']) ? $method_params['component'] : null;

    if (array_key_exists('id_component', $method_params)) {
   
        $id_component = $method_params['id_component'];
        $data_components_to_build = new AllDataComponents($component);
        $data_to_process = $data_components_to_build->get_components($id_component);
        foreach($data_to_process as $data_component_array) {
            if(!empty($data_component_array)) {
                foreach($data_component_array as $data_component) {
                    $all_components_data[] = $data_component;
                }
            }
        }
        $ordered_data = $data_components_to_build->reorder($all_components_data);
        $all_components_data =  [];
        foreach($ordered_data as $data_component) {
            $method_name_to_call = "";
                if(isset($data_component['type'])) {
                    $class = ucfirst($data_component['type']);
                    $model = new $class($data_component['type']);
                    $method_name_to_call = 'get_' . $data_component['type'];
                    
                    $all_components_data[] = $model->$method_name_to_call($data_component)[0];
                    continue;
            }
        } 
    
        echo json_encode($all_components_data);
    }
    else {
        $data_components_to_build = new AllDataComponents($component);
        $data_to_process = $data_components_to_build->get_components_without_id();
       
        echo json_encode($data_to_process);
    }

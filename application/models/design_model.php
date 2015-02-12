<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 9, 2015 3:35:00 PM
 */
class design_model extends CI_Model {

    //put your code here

    function getSections() {
        $sql = 'SELECT id_equipment,description,level FROM `equipment` WHERE `id_parent` IS NULL';
        return $this->db->query($sql)->result();
    }

    function getEquipments() {
        $sql = 'SELECT id_equipment,description,level FROM `equipment` WHERE `id_parent`=' . $_GET['id_parent'];
        return $this->db->query($sql)->result();
    }

    function addEquipment() {
        $data = array(
            'description' => $_POST['img_name'],
            'url' => '',
            'level' => $_POST['level'],
            'status' => 1,
        );
        if (!$_POST['id_parent']) {//new main section
            $data['id_parent'] = NULL;
            $this->db->insert('equipment', $data);
        } else {//child of someone
            $this->db->update('equipment', $data, array('id_parent' => $_POST['id_parent']));
        }
        foreach ($_POST['subLable'] as $sub) {
            
        }
    }

}

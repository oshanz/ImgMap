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
        $sql = 'SELECT id_equipment,description,level,url FROM `equipment` WHERE `id_parent` IS NULL and status=1';
        return $this->db->query($sql)->result();
    }

    function getEquipments() {
        $sql = 'SELECT id_equipment,description,level,url FROM `equipment` WHERE `id_parent`=' . $_GET['id_parent'];
        return $this->db->query($sql)->result();
    }

    function addEquipment($imgName) {
        $data = array(
            'description' => $_POST['img_name'],
            'url' => 'uploads/' . $imgName,
            'level' => $_POST['level'],
            'status' => 1,
        );
        $mainParent;
        if (!$_POST['id_parent']) {//new main section
            $data['id_parent'] = NULL;
            $this->db->insert('equipment', $data);
            $mainParent = $this->db->insert_id();
        } else {//child of someone
            $data['id_parent'] = $_POST['id_parent'];
            $this->db->insert('equipment', $data);
            $mainParent = $_POST['id_parent'];
        }

        $subs = array();
        for ($index = 0; $index < count($_POST['subLable']); $index++) {
            if (0 == $_POST['idr'][$index]) {
                continue;
            }
            $subs [] = array(
                'map_equipment' => $mainParent,
                'id_equipment' => $_POST['idr'][$index], // $this->db->insert_id(),
                'shape' => 'poly',
                'status' => 1,
                'coords' => $_POST['coords'][$index],
                'apart' => 1
            );
        }
        if (!empty($subs)) {
            $this->db->insert_batch('equipment_map', $subs);
        }
    }

}

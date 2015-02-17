<?php

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 16, 2015 4:26:25 PM
 */
class part_model extends CI_Model {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    function getParts() {
        $sql = "SELECT id_equipment,description,part_no FROM `equipment` WHERE `id_parent`=87";
        return $this->db->query($sql)->result();
    }

    function savePart() {
        $m = json_decode($_POST['model']);
        $this->db->insert('equipment', array(
            'description' => $m->description,
            'id_parent' => 87,
            'status' => 1,
            'part_no' => $m->part_no
        ));
        return $this->db->insert_id();
    }

    function autoParts() {
        $sql = "SELECT id_equipment as v,description as label FROM `equipment` WHERE `id_parent`=87 and description like ?";
        return $this->db->query($sql, array('%' . $_GET['term'] . '%'))->result();
    }

}

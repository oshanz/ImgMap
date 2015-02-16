<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
        $sql = "SELECT id_equipment,description FROM `equipment` WHERE `id_parent`=87";
        return $this->db->query($sql)->result();
    }

}

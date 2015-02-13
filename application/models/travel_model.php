<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 13, 2015 1:53:38 PM
 */
class Travel_model extends CI_Model {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    function getContents() {
        $sql = 'SELECT id_equipment,description,level,url FROM `equipment` WHERE `id_parent`= ?  AND `status` = 1';
        return $this->db->query($sql, array($_GET['id_parent']))->result();
    }

    function getIt() {
        $sql = 'SELECT id_equipment,description,level,url FROM `equipment` WHERE `id_equipment`= ?  AND `status` = 1';
        return $this->db->query($sql, array($_GET['id_parent']))->result();
    }

}

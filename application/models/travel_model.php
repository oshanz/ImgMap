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
        $it = $this->db->query($sql, array($_GET['id_parent']))->row_array();
        $it['map'] = $this->getImgMaps();
        $it['part'] = $this->getParts();
        return array($it);
    }

    function getImgMaps() {
        $sql = 'SELECT em.id_equipment,em.shape,em.coords,description FROM `equipment_map` em inner join equipment e on e.id_equipment=em.id_equipment where map_equipment= ? and e.status=1 and em.status=1 and em.apart!=1';
        return $this->db->query($sql, array($_GET['id_parent']))->result();
    }

    function getParts() {
        $sql = 'SELECT em.id_equipment,em.shape,em.coords,description,part_no FROM `equipment_map` em inner join equipment e on e.id_equipment=em.id_equipment where map_equipment= ? and e.status=1 and em.status=1 and em.apart=1';
        return $this->db->query($sql, array($_GET['id_parent']))->result();
    }

}

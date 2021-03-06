<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 16, 2015 2:17:25 PM
 */
class Parts extends CI_Controller {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    function index() {
        $this->load->view('template/header');
        $this->load->view('template/menu');
        $this->load->view('parts/index');
        $this->load->view('template/footer');
    }

    function getParts() {
        $this->load->model('part_model');
        return $this->part_model->getParts();
    }

    function savePart() {
        $this->load->model('part_model');
        $id = $this->part_model->savePart();
        echo json_encode(array('id_equipment' => $id));
    }

    function autoParts() {
        $this->load->model('part_model');
        $r = $this->part_model->autoParts();
        echo json_encode($r);
    }

}

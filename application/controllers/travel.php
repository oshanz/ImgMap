<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 9, 2015 10:26:22 AM
 */
class Travel extends CI_Controller {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    function index() {
        $this->load->view('template/header');
        $this->load->view('template/menu');
        $this->load->view('travel/index');
        $this->load->view('template/footer');
    }

    function getSections() {
        $this->load->model('design_model');
        return $this->design_model->getSections();
    }

    function getContents() {
        $this->load->model('travel_model');
        $r = $this->travel_model->getContents();
        echo json_encode($r);
    }

}

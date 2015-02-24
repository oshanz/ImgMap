<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 9, 2015 10:24:00 AM
 */
class Design extends CI_Controller {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    function index() {
        $this->load->view('template/header');
        $this->load->view('template/menu');
        $this->load->view('design/index');
        $this->load->view('template/footer');
    }

    function addEquipment() {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
//        $config['max_size'] = '5120';
        $this->load->library('upload', $config);
        $field_name = "img";
        if ($this->upload->do_upload($field_name)) {
            $data = array('upload_data' => $this->upload->data());
            $imgName = $data['upload_data']['orig_name'];
//            $this->load->view('upload_success', $data);
        } else {
            $error = array('error' => $this->upload->display_errors());
            print_r($error);
          //  die();
//            $this->load->view('upload_form', $error);
        }
        $this->load->model('design_model');
        $this->design_model->addEquipment($imgName);
        redirect(base_url('design/index'));
    }

    function getSections() {
        $this->load->model('design_model');
        return $this->design_model->getSections();
    }

    function getEquipments() {
        $this->load->model('design_model');
        if ($_GET['id_parent'] > 0) {
            $eq = $this->design_model->getEquipments();
        } else {
            $eq = $this->design_model->getSections();
        }
        echo json_encode($eq);
    }

}

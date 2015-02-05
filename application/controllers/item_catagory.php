<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class item_catagory extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
    }
    function index(){
        $this->load->view('template/header');
        $this->load->view('template/menu');
        $this->load->view('item_category/index');
        $this->load->view('template/footer');
        
    }


}
?>

<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of login
 *
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */
class Login_model extends CI_Model {

    //put your code here
    public function __construct() {
        parent::__construct();
    }

    function checkAuth() {
        return $this->db->get_where('user', array('username' => $_POST['userName'], 'password' => md5($_POST['password'])));
    }

}

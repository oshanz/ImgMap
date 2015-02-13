<?php

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */
class Login extends CI_Controller {

    public function __construct() {
        parent::$checkAuth = FALSE;
        parent::__construct();
    }

    //put your code here
    function index() {
        if ($this->session->userdata('login_state')) {
            redirect(base_url('design'));
        } else {
            $this->load->view('template/header');
            $this->load->view('login');
            $this->load->view('template/footer');
        }
    }

    function checkAuth() {
        $this->load->model('login_model');
        $query = $this->login_model->checkAuth();
        switch ($query->num_rows()) {
            case 1:
                $this->session->set_userdata('login_state', TRUE);
                $this->session->set_userdata('id_user', $query->row()->id_user);
                redirect(base_url($_POST['lastLocationWLP']));
                break;
            case 0:
                $this->session->set_flashdata('msg', 0);
                redirect(base_url());
                break;
            default:
                $this->session->set_flashdata('msg', 99);
                redirect(base_url());
                break;
        }
    }

    function logout() {
        $this->session->sess_destroy();
        redirect(base_url());
    }

}

<?php
/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */
$m = '';
$msg = $this->session->flashdata('msg');
if (isset($msg)) {
    switch ($msg) {
        case 0:
            $m = 'Login Failed';
            break;
        default:
            $m = 'Error - Please Contact for Support';
            break;
    }
}
?>
<form method="POST" action="<?php echo base_url('login/checkAuth') ?>">
    <input type="hidden" name="lastLocation"/>
    <div id="wrapper">
        <div id="wrappertop"></div>
        <div id="wrappermiddle">
            <h2>Login</h2>
            <div id="username_input">
                <div id="username_inputleft"></div>
                <div id="username_inputmiddle">
                    <input type="text" name="userName" id="url" autofocus placeholder="User Name"/>
                    <img id="url_user" src="<?php echo base_url(); ?>public/images/mailicon.png" alt="">
                    </form>
                </div>
                <div id="username_inputright"></div>
            </div>
            <div id="password_input">
                <div id="password_inputleft"></div>
                <div id="password_inputmiddle">
                    <input type="password" name="password" id="url" placeholder="Password">
                    <img id="url_password" src="<?php echo base_url(); ?>public/images/passicon.png" alt="">
                </div>
                <div id="password_inputright"></div>
            </div>
            <div id="submit">
                <input type="image" src="<?php echo base_url(); ?>public/images/submit_hover.png" id="submit1" value="Login">
                <input type="image" src="<?php echo base_url(); ?>public/images/submit.png" id="submit2" value="Login">
    <!--  <input style="float: right" type="image" value="Login"/>-->
                </form>
            </div>
            <div id="links_left">
                <a href="#">Forgot your Password?</a>
            </div>
            <div id="links_right"><a href="#">Not a Member Yet?</a></div>
        </div>
        <div id="wrapperbottom"></div>
        <div id="login_failed"><?php echo $m; ?></div>
    </div>	

</form>
<?php
$this->load->view('template/javascript');
?>
<script>
    $(function() {
        $("#submit1").hover(function() {
            $(this).animate({"opacity": "0"}, "slow");
        }, function() {
            $(this).animate({"opacity": "1"}, "slow");
        });
        $('[name="lastLocation"]').val(localStorage.getItem('lastLocation'));
    });
</script>
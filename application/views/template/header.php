<?php
/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Dec 9, 2014 10:51:15 AM
 */
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--<meta name="viewport" content="user-scalable=no, initial-scale=1,minimum-scale=1, maximum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi">-->
        <title>Img Map</title>
        <link rel="shortcut icon" href="<?php echo base_url() ?>public/icon/favicon.ico" type="image/x-icon"/>
        <meta name="description" content="Pharmacy Management System in Sri Lanka" />
        <meta name="keywords" content="Pharmacy Management System, sri lanka " />
        <meta name="robots" content="index, nofollow">
        <meta name="author" content="Waruna Oshan Wisumperuma"/> 
        <meta name="owner" content="Wavelink" /> 
        <meta name="copyright" content="Copyright ® 2014 Wavelink Technologies(Pvt) Ltd." />

        <!--JS Data-->
        <script>
            var URL = '<?php echo base_url(); ?>';
        </script>

        <!--CSS-->
        <link rel="stylesheet" href="<?php echo base_url() ?>public/css/jquery-ui.min.css" />
        <link rel="stylesheet" href="<?php echo base_url() ?>public/css/jquery.ui.timepicker.css" />
        <link rel="stylesheet" href="<?php echo base_url() ?>public/css/style.css" />
        <link rel="stylesheet" href="<?php echo base_url() ?>public/css/icono.min.css" />
        <style>
            div.ui-datepicker{font-size:12px;}
            div.ui-timepicker{font-size: 12px}
        </style>

        <!--JS-->
        <!-- Here Mandatory JS Only. others are at javascript template -->
        <script src="<?php echo base_url() ?>public/js/json2.js"></script>
        <?php
        if (strlen(uri_string()) > 1 && uri_string() != 'login/checkAuth') {
            echo "<script>localStorage.setItem('lastLocationWLP', '" . uri_string() . "');</script>";
        }
        ?>
    </head>
    <body>
        <div id="container">


<?php
/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 9, 2015 10:44:42 AM
 */
?>

<div class="form">
    <ul id="breadcrumb" class="breadcrumb">
        <li id="bread_0" style="">
            <a onclick="loadBreadCrumbsZones(0, 1, 'Island');" href="#">
                Island
            </a>
        </li>
        <li id="bread_1" style="">
            <a onclick="loadBreadCrumbsZones(1, 3, 'Success Team');" href="#">
                Success Team
            </a>
        </li>
        <li id="bread_2" style="">
            <a onclick="loadBreadCrumbsZones(2, 20, 'Kaluthara Agency-Area');" href="#">
                Kaluthara Agency-Area
            </a>
        </li>
        <li id="bread_3" style="">
            <a onclick="loadBreadCrumbsZones(3, 808, 'dd Agency-Area');" href="#">
                dd Agency-Area
            </a>
        </li>
    </ul> 
</div>

<script data-main="<?php echo base_url('application/views/design/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>


<!--<form method="POST" action="<?php echo base_url('design/addEquipment'); ?>" enctype="multipart/form-data">
<input type="file" name="asdasd"/>
<input type="submit" />
</form>-->
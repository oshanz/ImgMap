<?php
/**
 * Description of dashbord
 *
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 */
$c = &get_instance();
?>

<div class="form" style="padding: 10px">
    <table>
        <tr>
            <td>Sort By</td>
            <td>:</td>
            <td id="sort">
                <a href="#sort/number">Reg. Number</a>, <a href="#sort/distance">Distance</a>, <a href="#sort/motion">Motion Hours</a>, <a href="#sort/stationary">Stationary Hours</a>, <a href="#sort/avgSpeed">Average Speed</a>, <a href="#sort/maxSpeed">Max Speed</a><!--, <a href="#sort/sos">SOS</a>-->
            </td>
        </tr>
        <tr>
            <td>Order By</td>
            <td>:</td>
            <td><label><input type="checkbox" id="asc_dsc" value="ON"  />Descending</label></td>
        </tr>
    </table>
    <div id="accordion" style="margin-top: 20px"></div>
</div>

<script data-main="<?php echo base_url('application/views/dashbord/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>

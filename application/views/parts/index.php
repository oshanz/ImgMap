<?php
/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 16, 2015 2:18:45 PM
 */
$c = &get_instance();
$parts = $c->getParts();
?>
<script>
    window.oz = {
        parts: <?php echo json_encode($parts); ?>
    };
</script>
<div class="form">
    <table width="100%" border="0">
        <tr>
            <td id="view" valign="top" width="50%">

            </td>
            <td id="addUP" valign="top" style="">
                <table>
                    <tr>
                        <td>Part. No</td>
                        <td>:</td>
                        <td><input type="text" id="part_no"/></td>
                    </tr>
                    <tr>
                        <td>Part Name</td>
                        <td>:</td>
                        <td><input type="text" id="part_name"/></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <input type="button" value="Save" id="save" style="float: right;"/>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

<script data-main="<?php echo base_url('application/views/parts/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>

<?php
/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 9, 2015 10:44:42 AM
 */
$c = &get_instance();
$sections = $c->getSections();
?>

<script>
    window.oz = {
        sections: <?php echo json_encode($sections); ?>
    };
</script>

<div class="form">
    <table width="100%" border="0">
        <tr>
            <td>
                <ul id="breadcrumb" class="breadcrumb"></ul> 
            </td>
        </tr>
        <tr>
            <td>
                <table border="0" width="100%">
                    <tr>
                        <td style="text-wrap: avoid;width: 15%" valign="top">
                            <ul class="rounded-list" id="breadList"></ul>         
                        </td>
                        <td id="formDiv" valign="top"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<script data-main="<?php echo base_url('application/views/design/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>

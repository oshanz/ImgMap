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
    <table width="100%">
        <tr>
            <td>
                <ul id="breadcrumb" class="breadcrumb"></ul> 
            </td>
        </tr>
        <tr>
            <td>
                <table>
                    <tr>
                        <td style="text-wrap: avoid;min-width: 200px">
                            <ul class="rounded-list" id="breadList"></ul>         
                        </td>
                        <td>
                            <form method="POST" action="<?php echo base_url('design/addEquipment'); ?>" enctype="multipart/form-data">
                                <input type="file" name="asdasd"/>
                                <input type="submit" />
                            </form>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

<script data-main="<?php echo base_url('application/views/design/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>



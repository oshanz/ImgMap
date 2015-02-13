<?php
/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Feb 9, 2015 10:45:30 AM
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

</div>
<script data-main="<?php echo base_url('application/views/travel/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>


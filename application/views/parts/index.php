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
  
</div>

<script data-main="<?php echo base_url('application/views/parts/index.js') ?>" src="<?php echo base_url('public/js/RequireJS/require.js'); ?>"></script>

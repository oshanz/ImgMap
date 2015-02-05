<?php

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Dec 26, 2014 11:06:32 AM
 */
?>

<table style="width: 100%;z-index: auto" class="form" >
    <tr class="tr">
        <td style="width: 60%" valign="top" class="td">
            <table   style="width: 100%" border="1"  class="table" >
                <tr class="tr">
                    <td id="cat_id" class="td">Category ID</td>
                    <td id="cat_name" class="td">Category Name</td>
                    <td id="cat_edit" class="td">Edit</td>
                    <td id="cat_delet" class="td">Delete</td>
                </tr>
                <tr>
                    <td id="cat_id"></td>
                    <td id="cat_name"></td>
                    <td id="cat_edit"></td>
                    <td id="cat_delet"></td>
                </tr>
            </table>
        </td> 
        <td>
            <table  style="width: 100% " >
                <tr></tr>
                <tr>
                    <td>Category ID :</td>
                    <td><label id="cat_id" >1</label></td>
                </tr>
                <tr>
                    <td>Category Name :</td>
                    <td><input type="text" id="cat_name" name="cat_name"/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" value="Insert" /></td>
                </tr>
            </table> 
        </td>
    </tr>
</table>
<?php
$this->load->view('template/javascript');
?>
     
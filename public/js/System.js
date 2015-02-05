/* 
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * Dec 9, 2014 11:52:50 AM
 */

function ExportExcel(table_id, title, rc_array) {
    if (document.getElementById(table_id).nodeName == "TABLE") {
        var dom = $('#' + table_id).clone().get(0);
        var rc_array = (typeof rc_array == 'undefined') ? [] : rc_array;
        for (var i = 0; i < rc_array.length; i++) {
            dom.tHead.rows[0].deleteCell((rc_array[i] - i));
            for (var j = 0; j < dom.tBodies[0].rows.length; j++) {
                dom.tBodies[0].rows[j].deleteCell((rc_array[i] - i));
            }
        }
        var a = document.createElement('a');
        var tit = ['<table><tr><td></td><td></td></tr><tr><td></td><td><font size="5">', title, '</font></td></tr><tr><td></td><td></td></tr></table>'];
        a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(tit.join('') + dom.outerHTML);
        a.setAttribute('download', 'WLTReport_' + new Date().toLocaleString() + '.xls');
        a.click();
    } else {
        alert('Not a table');
    }
}

$(function(){
jQuery.fn.print=function(){if(1<this.size())this.eq(0).print();else if(this.size()){var b="printer-"+(new Date).getTime(),c=$("<iframe name='"+b+"'>");c.css("width","1px").css("height","1px").css("position","absolute").css("left","-9999px").appendTo($("body:first"));var b=window.frames[b],a=b.document,d=$("<div>").append($("style").clone());a.open();a.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');a.write("<html>");
a.write("<body>");a.write("<head>");a.write("<title>");a.write(document.title);a.write("</title>");a.write(d.html());a.write("</head>");a.write(this.html());a.write("</body>");a.write("</html>");a.close();b.focus();b.print();setTimeout(function(){c.remove()},6E4)}};
});

function number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

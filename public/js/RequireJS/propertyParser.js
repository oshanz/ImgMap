/*
 Basic parser for URL properties
 @author Miller Medeiros
 @version 0.1.0 (2011/12/06)
 MIT license
*/

define(function(){function d(a){b.test(a)?a=a.replace(b,"$1").split(","):"null"===a?a=null:"false"===a?a=!1:"true"===a?a=!0:""===a||"''"===a||'""'===a?a="":isNaN(a)||(a=+a);return a}var e=/([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g,b=/^\[([^\]]+)\]$/;return{parseProperties:function(a){for(var c,b={};c=e.exec(a);)b[c[1]]=d(c[2]||c[3]);return b},typecastVal:d}});

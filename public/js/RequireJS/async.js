/*

 RequireJS plugin for async dependency load like JSONP and Google Maps
 Author: Miller Medeiros
 Version: 0.1.2 (2014/02/24)
 Released under the MIT license
*/
define(function(){var e=0;return{load:function(a,c,d,b){b.isBuild?d(null):(e+=1,b="__async_req_"+e+"__",window[b]=d,c=c.toUrl(a),d=/!(.+)/,a=c.replace(d,""),c=d.test(c)?c.replace(/.+!/,""):"callback",a+=0>a.indexOf("?")?"?":"&",a=a+c+"="+b,b=document.createElement("script"),b.type="text/javascript",b.async=!0,b.src=a,a=document.getElementsByTagName("script")[0],a.parentNode.insertBefore(b,a))}}});
/*

 RequireJS plugin for loading Google Ajax API modules thru `google.load`
 Author: Miller Medeiros
 Version: 0.2.0 (2011/12/06)
 Released under the MIT license
*/
define(["async","propertyParser"],function(k,c){function g(a){a=h.exec(a);var b={moduleName:a[1],version:a[2]||"1"};b.settings=c.parseProperties(a[3]);return b}var h=/^([^,]+)(?:,([^,]+))?(?:,(.+))?/;return{load:function(a,b,e,c){if(c.isBuild)e(null);else{var d=g(a),f=d.settings;f.callback=e;b(["async!"+("https:"===document.location.protocol?"https":"http")+"://www.google.com/jsapi"],function(){google.load(d.moduleName,d.version,f)})}}}});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

require(['backbone', 'jquery'], function(Backbone, $) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        index: function() {
            var self = this;
            require([''], function(av) {
                var acv = new av();
                $('#accordion').html(acv.render());
                self.accordian = acv;
            });
        }
    });

    new Router();
    Backbone.history.start();
});
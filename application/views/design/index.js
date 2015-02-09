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
            require(['breadcrumb/tbl_view', 'breadcrumb/bc_view'], function(tv, bv) {
                var atv = new tv({
                    collection: new Backbone.Collection([
                        {name: "Tim", age: 5},
                        {name: "Ida", age: 26},
                        {name: "Rob", age: 55}
                    ])
                });
                var abv = new bv();
                $('#breadcrumb').html(abv.render());
                self.breadcrumb = abv;
            });
        }
    });

    new Router();
    Backbone.history.start();
});
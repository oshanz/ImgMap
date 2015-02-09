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
            '': 'index',
            'list/:id_equipment': 'updateBreadcrumb'
        },
        index: function() {
            var self = this;
            require(['breadcrumb/tbl_view', 'breadcrumb/bc_view'], function(tv, bv) {
                var c = Backbone.Collection.extend({
                    url: URL + 'design/getEquipments'
                });
                var atv = new tv({
                    collection: new c(window.oz.sections)
                });
                $('#breadList').html(atv.render());
                var abv = new bv({
                    model: new (Backbone.Model.extend({
                        defaults: {
                            description: 'Sections'
                        }
                    }))()
                });
                $('#breadcrumb').html(abv.render());
                atv.breadcrumb = abv;
            });
        }
    });

    new Router();
    Backbone.history.start();
});
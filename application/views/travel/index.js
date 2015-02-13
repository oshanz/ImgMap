"use strict";

require(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'section/:id_parent': 'loadContents'
        },
        childs: [],
        index: function() {
            this.clearChilds();
            var self = this;
            require(['section/section_view'], function(sv) {
                var asv = new sv({
                    collection: new Backbone.Collection(window.oz.sections)
                });
                $('.form').html(asv.render());
                self.childs.push(asv);
            });
        },
        clearChilds: function() {
            _.each(this.childs, function(v) {
                v.remove();
            });
        },
        loadContents: function(id_parent) {
            var self = this;
            $.getJSON(URL + 'travel/getContents', {id_parent: id_parent}, function(jsn) {
                if (0 <= jsn.length) {
                    alert('Empty');
                } else if (1 == jsn.length) {
                    require([], function() {

                    });
                } else {
                    require([], function() {

                    });
                }
            });
        }
    });
    new Router();
    Backbone.history.start();
});
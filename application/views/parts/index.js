"use strict";

require(['backbone'], function(Backbone) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        index: function() {
            var col = new Backbone.Collection(window.oz.parts);
            require(['main/view', 'table/table_view'], function(mv, tv) {
                var amv = new mv();
                $('.form').html(amv.render());
                var atv = new tv({
                    collection: col
                });
                $('#view').html(atv.render());
            });
        }
    });

    new Router();
    Backbone.history.start();
});
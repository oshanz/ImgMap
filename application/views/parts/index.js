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
            require(['table/table_view'], function(tv) {
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
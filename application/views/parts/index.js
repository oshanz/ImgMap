"use strict";

require(['backbone'], function(Backbone) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        index: function() {
            require(['main/view'], function(mv) {
                var amv = new mv();
                $('.form').html(amv.render());
            });
        }
    });

    new Router();
    Backbone.history.start();
});
"use strict";

require(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        childs: [],
        index: function() {
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
        }
    });
    new Router();
    Backbone.history.start();
});
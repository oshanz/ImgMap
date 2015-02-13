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
                self.clearChilds();
                if (1 == jsn.length) {
                    require(['last/last_view'], function(lv) {
                        var alv = new lv({
                            model: new Backbone.Model(jsn[0])
                        });
                        $('.form').html(alv.render());
                        self.childs.push(alv);
                    });
                } else {
                    require(['section/section_view'], function(secv) {
                        var asc = new secv({
                            collection: new Backbone.Collection(jsn)
                        });
                        $('.form').html(asc.render());
                        self.childs.push(asc);
                    });
                }
            });
        }
    });
    new Router();
    Backbone.history.start();
});
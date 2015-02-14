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
                self.lastC = new Backbone.Collection(window.oz.sections);
                var asv = new sv({
                    collection: self.lastC
                });
                $('#form').html(asv.render());
                self.childs.push(asv);
            });
            require(['breadcrumb/bc_view'], function(bcv) {
                var abc = new bcv({
                    model: new (Backbone.Model.extend({
                        defaults: {
                            title: 'Sections',
                            src: -1
                        }
                    }))()
                });
                $('#breadcrumb').html(abc.render());
                self.bc = abc;
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
                if (!window.oz.goBack) {
                    var f;
                    if (self.lastC instanceof Backbone.Model) {
                        f = self.lastC;
                    } else {
                        f = self.lastC.find(function(ob) {
                            return id_parent == ob.get('id_equipment');
                        });
                    }
                    self.bc.model.set({
                        src: id_parent,
                        title: f.get('description'),
                        level: f.get('level')
                    });
                    self.bc.model.set({time: new Date().getTime()});
                } else {
                    window.oz.goBack = false;
                }
                if (1 == jsn.length) {
                    require(['last/last_view','maphilight','rwdImageMaps'], function(lv) {
                        self.lastC = new Backbone.Model(jsn[0]);
                        var alv = new lv({
                            model: self.lastC
                        });
                        $('#form').html(alv.render());
                        self.childs.push(alv);
                    });
                } else {
                    self.lastC = new Backbone.Collection(jsn);
                    require(['section/section_view'], function(secv) {
                        var asc = new secv({
                            collection: self.lastC
                        });
                        $('#form').html(asc.render());
                        self.childs.push(asc);
                    });
                }
            });
        }
    });
    new Router();
    Backbone.history.start();
});
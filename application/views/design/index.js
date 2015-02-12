"use strict";

require(['backbone', 'jquery'], function(Backbone, $) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'breadcrumb/:id_equipment': 'updateBreadcrumb',
            'select/:id_equipment': 'selector'
        },
        index: function() {
            var self = this;
            require(['breadcrumb/tbl_view', 'breadcrumb/bc_view', 'form/form_view'], function(tv, bv, fv) {
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
                            description: 'Sections',
                            id_equipment: -1
                        }
                    }))()
                });
                $('#breadcrumb').html(abv.render());
                atv.breadcrumb = abv;
                self.tbl_view = atv;

                var afv = new fv();
                $('#formDiv').html(afv.render());
            });
        },
        updateBreadcrumb: function(id_equipment) {
            if (!this.tbl_view) {
                window.location.href = URL + 'design';
            }
            if (id_equipment > 0) {
                this.tbl_view.loadPrevious(id_equipment);
                $('#id_parent').val(id_equipment);
            } else {
                this.tbl_view.collection.reset(window.oz.sections);
                $('#id_parent').val('');
            }
        },
        selector: function(id_equipment) {
            if (!this.tbl_view) {
                window.location.href = URL + 'design';
            }
        }
    });

    new Router();
    Backbone.history.start();
});
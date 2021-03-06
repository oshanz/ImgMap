"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!main/tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template());
            var self = this;
            require(['table/table_view'], function(tv) {
                var col = new Backbone.Collection(window.oz.parts);
                var atv = new tv({
                    collection: col
                });
                self.$('#view').html(atv.render());
                window.oz.parts = col;
            });
            return this.el;
        },
        events: {
            'click #save': 'addPart'
        },
        addPart: function() {
            var a = new (Backbone.Model.extend({
                url: URL + 'parts/savePart'
            }))();
            a.set({
                part_no: this.$('#part_no').val(),
                description: this.$('#part_name').val()
            });
            this.$('#part_no').val('');
            this.$('#part_name').val('');
            var self = this;
            a.save(null, {
                wait: true,
                success: function(model, res) {
                    var col = window.oz.parts;
                    col.add(model);
                    require(['table/table_view'], function(tv) {
                        var atv = new tv({
                            collection: col
                        });
                        self.$('#view').html(atv.render());
                    });
                }
            });

        }
    });

});
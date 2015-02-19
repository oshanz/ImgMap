"use strict";
define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template("<tr><td><a class='plus_icon'></a></td><td><input type='hidden' name='idr[]' id='idr'/><input name='subLable[]' id='subLable' type='text'/></td><td><input name='coords[]' /></td><td><input type='button' id='save' value='Save'/></td><td><a class='min_icon'></a></td></tr>");
    return Backbone.View.extend({
        template: tpl,
        initialize: function() {
            this.myi = this.model.get('current_i');
            this.listenTo(this.model, "change:coords_" + this.myi, this.setCoords);
        },
        setCoords: function(m, v) {
            var st = _.map(v, function(o) {
                return o.X + ',' + o.Y;
            });
            this.$('[name="coords[]"]').val(st.join(','));
        },
        render: function() {
            this.setElement(this.template());
            var self = this;
            require(['jquery-ui'], function(jui) {
                self.$("#subLable").autocomplete({
                    source: URL + 'parts/autoParts',
                    select: function(event, ui) {
                        self.$('#idr').val(ui.item.v);
                    }
                });
            });
            return this.el;
        },
        events: {
            'click .min_icon': 'removeRow',
            'click #save': 'saveData'
        },
        removeRow: function() {
            this.remove();
        },
        saveData: function(e) {
            if (this.$('#subLable').val().trim() == '') {
                return;
            }
            var t = $(e.currentTarget);
            t.val('Edit');
        }
    });
});
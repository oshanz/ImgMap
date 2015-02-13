"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template("<tr><td><a class='plus_icon'></a></td><td><input name='subLable[]' id='subLable' type='text'/></td><td><input type='button' id='save' value='Save'/></td><td><a class='min_icon'></a></td></tr>");

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.setElement(this.template());
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
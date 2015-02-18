"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!table/table_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template({list: this.collection.toJSON()}));
            return this.el;
        }
    });

});
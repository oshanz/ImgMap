"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template('<li><a href="#">Section</a></li>');

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template());
            return this.el;
        },
        events: {
            'click a': 'updateView'
        },
        updateView: function(e) {
            var t = $(e.currentTarget).parent('li');
            alert(this.$('li').index(t));
        }
    });
});
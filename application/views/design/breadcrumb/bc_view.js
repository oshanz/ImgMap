"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template('<li><a href="#"><%=description%></a></li>');

    return Backbone.View.extend({
        template: tpl,
        initialize: function() {
            this.listenTo(this.model, "change:time", this.changeHierarchy);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this.el;
        },
        events: {
            'click a': 'updateView'
        },
        updateView: function(e) {
            var t = $(e.currentTarget).parent('li');
            //   alert(this.$('li').index(t));
        },
        changeHierarchy: function() {
            this.$el.append(this.template(this.model.toJSON()));
        }
    });
});
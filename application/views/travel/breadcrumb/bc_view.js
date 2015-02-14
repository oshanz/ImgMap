"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template('<li><a href="#section/<%=src%>"><%=title%></a></li>');

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this.el;
        },
        initialize: function() {
            this.listenTo(this.model, "change:time", this.appendLi);
        },
        appendLi: function() {
            this.$el.append(this.template(this.model.toJSON()));
        },
        events: {
            'click a': 'goBack'
        },
        goBack: function(e) {
            var gt = this.$('li').index($(e.currentTarget).parent('li'));
            this.$('li:gt(' + gt + ')').remove();
            window.oz.goBack = true;
        }
    });
});
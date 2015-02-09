"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template('<li><a href="#"><%=description%></a></li>');

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.collection.forEach(function(model) {
                this.$el.append(this.template(model.toJSON()));
            }, this);
            return this.el;
        },
        events: {
            'click a': 'updateBreadcrumb'
        },
        updateBreadcrumb: function(e) {
            this.$el.hide();
            this.breadcrumb.model.set(this.collection.at(this.$('li').index($(e.currentTarget).parent('li'))).toJSON());
            this.breadcrumb.model.set({time: new Date().getTime()});
            this.collection.fetch({
                reset: true,
                data: {id_parent: 1},
                processData: true
            });
        }
    });
});
"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template('<li><a href="#"><%=description%></a></li>');

    return Backbone.View.extend({
        template: tpl,
        initialize: function() {
            this.listenTo(this.collection, "reset", this.refreshTbl);
        },
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
            var model = this.collection.at(this.$('li').index($(e.currentTarget).parent('li')));
            this.breadcrumb.model.set(model.toJSON());
            this.breadcrumb.model.set({time: new Date().getTime()});
            this.collection.fetch({
                reset: true,
                data: {id_parent: model.get('id_equipment')},
                processData: true
            });
        },
        refreshTbl: function() {
            this.$el.empty();
            this.collection.forEach(function(model) {
                this.$el.append(this.template(model.toJSON()));
            }, this);
            this.$el.show();
        },
        loadPrevious: function(id_equipment) {
            this.collection.fetch({
                reset: true,
                data: {id_parent: id_equipment},
                processData: true
            });
        }
    });
});
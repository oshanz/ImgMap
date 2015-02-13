"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template('<li><a href="#breadcrumb/<%=id_equipment%>"><%=description%></a></li>');

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
            var gt = this.$('li').index($(e.currentTarget).parent('li'));
            $('#level').val(Number(gt) + 1);
            this.$('li:gt(' + gt + ')').remove();
            $('#preview').attr('src', URL + 'public/images/awaiting-image.png');
        },
        changeHierarchy: function() {
            this.$el.append(this.template(this.model.toJSON()));
        }
    });
});
"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!form/img/ozImg_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template());
            return this.el;
        },
        initialize: function() {
            this.listenTo(this.model, 'change:src', this.resetImg);
        },
        resetImg: function() {
            //clear canvas
            this.$('img').attr('src', this.model.get('src'));
        }
    });
});

/**
 *  console.log(p.prop('width'));
 console.log(p.get(0).naturalWidth);
 this.cancon = this.$('canvas')[0].getContext("2d");
 */
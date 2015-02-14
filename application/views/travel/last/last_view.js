"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!last/last_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('img').maphilight({stroke: false, fillColor: '009DDF', fillOpacity: 1});
            this.$('img[usemap]').rwdImageMaps();
            return this.el;
        }
    });

});
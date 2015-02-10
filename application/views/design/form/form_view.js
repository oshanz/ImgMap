"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!form/form_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        initialize: function() {
            var reader = new FileReader();
            var self = this;
            reader.onload = function(e) {
                self.$('#preview').attr('src', e.target.result);//.width(150).height(200)
            };
            this.fileReader = reader;
        },
        render: function() {
            this.$el.html(this.template());
            return this.el;
        },
        events: {
            'change #img': 'loadImg'
        },
        loadImg: function(e) {
            var ele = $(e.currentTarget)[0];
            if (ele.files && ele.files[0]) {
                this.fileReader.readAsDataURL(ele.files[0]);
//                this.$('#preview').attr('src', window.URL.createObjectURL(ele.files[0]));
            }
        }
    });

});
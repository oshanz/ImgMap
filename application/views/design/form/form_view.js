"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!form/form_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        subRows: [],
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
            this.addSubCatRow();
            return this.el;
        },
        events: {
            'change #img': 'loadImg',
            'click .plus_icon': 'addSubCatRow'
        },
        loadImg: function(e) {
            var ele = $(e.currentTarget)[0];
            if (ele.files && ele.files[0]) {
                this.fileReader.readAsDataURL(ele.files[0]);
//                this.$('#preview').attr('src', window.URL.createObjectURL(ele.files[0]));
            }
        },
        addSubCatRow: function() {
            var self = this;
            require(['form/subCatRow'], function(scR) {
                var ascr = new scR();
                self.$('#sub_cat_list').append(ascr.render());
                self.subRows.push(ascr);
            });
        },
        clearAll: function() {
            _.each(this.subRows, function(sr) {
                sr.remove();
            });
            this.remove();
        }
    });

});
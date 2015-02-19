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
                var p = self.$('#preview');
                p.attr('src', e.target.result);//.width(150).height(200)
                console.log(p.prop('width'));
                console.log(p.get(0).naturalWidth);
            };
            this.fileReader = reader;
        },
        render: function() {
            this.$el.html(this.template());
            this.addSubCatRow();
            this.cancon = this.$('canvas')[0].getContext("2d");
            return this.el;
        },
        events: {
            'change #img': 'loadImg',
            'click .plus_icon': 'addSubCatRow'
        },
        loadImg: function(e) {
            var ele = $(e.currentTarget)[0];
            if (ele.files && ele.files[0]) {
                if (!ele.files[0].type.match(/image.*/)) {
                    alert("Isn't a Image");
                    return;
                }
                this.fileReader.readAsDataURL(ele.files[0]);
//                var winURL = window.webkitURL || window.URL;
//                this.$('#preview').attr('src', winURL.createObjectURL(ele.files[0]));
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
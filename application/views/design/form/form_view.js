"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!form/form_tpl.html')),
            ozImg = require('form/img/ozImg_view');

    return Backbone.View.extend({
        template: tpl,
        subRows: [],
        model: new Backbone.Model(),
        initialize: function() {
            var reader = new FileReader();
            var self = this;
            reader.onload = function(e) {
                self.model.set({src: e.target.result});
            };
            this.fileReader = reader;
        },
        render: function() {
            this.$el.html(this.template());
            this.addSubCatRow();
            this.$('#ozImg').html(new ozImg({model: this.model}).render());//oops not at cleaner
            return this.el;
        },
        events: {
            'change #img': 'loadImg',
            'click #img': 'clearImg',
            'click .plus_icon': 'addSubCatRow'
        },
        clearImg: function() {
            this.model.set({src: URL + 'public/images/awaiting-image.png'});
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
"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!form/img/ozImg_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        coords: [],
        render: function() {
            this.$el.html(this.template());
            this.ctx = this.$('canvas')[0].getContext("2d");
            return this.el;
        },
        initialize: function() {
            this.listenTo(this.model, 'change:src', this.resetImg);
        },
        resetImg: function() {
            var img = this.$('img').get(0), cvs = this.$('canvas');
            this.ctx.clearRect(0, 0, cvs.prop('width'), cvs.prop('height'));
            this.coords = [];
            img.src = this.model.get('src');
            img.style.display = 'none';
            var w = img.naturalWidth, //naturalWidth,
                    h = img.naturalHeight;
            cvs.attr('width', w + 'px');
            cvs.attr('height', h + 'px');
            cvs.css('border', '1px solid');
            this.ctx.drawImage(img, 0, 0, w, h);

        },
        events: {
            'click canvas': 'markPoint'
        },
        markPoint: function(e) {
            var img = $(e.currentTarget).offset();
            var y = e.pageY - img.top;
            var x = e.pageX - img.left;
            this.coords.push({
                X: x,
                Y: y
            });
            if (this.coords.length > 1) {
                var pre = this.coords[this.coords.length - 2];
                this.ctx.beginPath();
                this.ctx.moveTo(pre.X, pre.Y);
                this.ctx.lineTo(x, y);
                this.ctx.closePath();
                this.ctx.strokeStyle = "blue";
                this.ctx.stroke();
                this.model.set({cur_coord: this.coords});
            }
        }
    });
});

/**
 *  console.log(p.prop('width'));
 console.log(p.get(0).naturalWidth);
 this.cancon = this.$('canvas')[0].getContext("2d");
 */
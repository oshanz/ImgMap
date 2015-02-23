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
            this.coords = [];
            var img = this.$('img').get(0), cvs = this.$('canvas');
            this.ctx.clearRect(0, 0, cvs.prop('width'), cvs.prop('height'));
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
            var crd = JSON.parse(JSON.stringify(this.coords));
            this.resetImg();
            this.coords = crd;
            var img = $(e.currentTarget).offset();
            var y = e.pageY - img.top;
            var x = e.pageX - img.left;
            this.coords.pop();
            this.coords.push({
                X: x,
                Y: y
            });
            this.coords.push(this.coords[0]);
            //draw path
            this.ctx.beginPath();
            this.ctx.moveTo(this.coords[0].X, this.coords[0].Y);
            for (var i = 1; i < this.coords.length; i++) {
                this.ctx.lineTo(this.coords[i].X, this.coords[i].Y);
            }
            this.ctx.closePath();
            this.ctx.strokeStyle = "blue";
            this.ctx.stroke();
            this.ctx.fillStyle = 'rgba(181,229,255,0.5)';
            this.ctx.fill();
            var i = this.model.get('current_i');
            this.model.set('coords_' + i, JSON.parse(JSON.stringify(this.coords)));
        }
    });
});

/**
 *  console.log(p.prop('width'));
 console.log(p.get(0).naturalWidth);
 this.cancon = this.$('canvas')[0].getContext("2d");
 */
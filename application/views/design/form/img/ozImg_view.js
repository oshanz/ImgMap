"use strict";

define(function(require) {
	var _ = require('underscore'), Backbone = require('backbone'), tpl = _.template(require('text!form/img/ozImg_tpl.html'));

	return Backbone.View.extend({
		template : tpl,
		coords : [],
		hisCroods : [],
		render : function() {
			this.$el.html(this.template());
			this.ctx = this.$('canvas')[0].getContext("2d");
			return this.el;
		},
		initialize : function() {
			this.listenTo(this.model, 'change:src', this.resetImg);
			this.listenTo(this.model, 'change:current_i', this.newMap);
		},
		newMap : function() {
			this.hisCroods.push(this.coords);
			this.coords = [];
		},
		resetImg : function() {
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
		events : {
			'click canvas' : 'markPoint'
		},
		drawPreMaps : function() {
			_.each(this.hisCroods, function(c) {
				this.drawMap(c);
			}, this);
		},
		drawMap : function(coords) {
			this.ctx.beginPath();
			this.ctx.moveTo(coords[0].X, coords[0].Y);
			coords.push(coords[0]);
			for (var i = 1; i < coords.length; i++) {
				this.ctx.lineTo(coords[i].X, coords[i].Y);
			}
			this.ctx.closePath();
			this.ctx.strokeStyle = "blue";
			this.ctx.stroke();
			this.ctx.fillStyle = 'rgba(181,229,255,0.5)';
			this.ctx.fill();
			coords.pop();
		},
		markPoint : function(e) {
			var vali = this.coordvalidate();
			if (!vali) {
				alert('Too Much Marks');
				this.resetImg();
			} else {
				var crd = JSON.parse(JSON.stringify(this.coords));
				this.resetImg();
				this.coords = crd;
				var img = $(e.currentTarget).offset();
				var y = e.pageY - img.top;
				var x = e.pageX - img.left;
				this.coords.push({
					X : x,
					Y : y
				});
				this.drawMap(this.coords);
			}
			var i = this.model.get('current_i');
			this.model.set('coords_' + i, JSON.parse(JSON.stringify(this.coords)));
			this.drawPreMaps();
		},
		coordvalidate : function() {
			var i = this.model.get('current_i'), c = this.model.get('coords_' + i);
			var st = _.map(c, function(o) {
				return o.X + ',' + o.Y;
			});
			st = st.join(',').length;
			return (st < 240) ? true : false;
		}
	});
});

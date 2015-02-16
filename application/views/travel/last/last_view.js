"use strict";

define(function(require) {
    var _ = require('underscore'),
            Backbone = require('backbone'),
            tpl = _.template(require('text!last/last_tpl.html'));

    return Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            var self = this;
            require(['maphilight', 'rwdImageMaps'], function() {//mapster,maphilight,rwdImageMaps
                //self.$('img').maphilight();
                self.$('img[usemap]').rwdImageMaps();
//                self.$('img').mapster({
//                    fillColor: '00FFFF',
//                    fillOpacity: .1,
//                    strokeColor: '00008B',
//                    stroke: true
//                });
//                self.$('area').mapster('set', true, {
//                    fillColor: '00FFFF',
//                    fillOpacity: .1,
//                    stroke: false
//                });
            });
            return this.el;
        },
        events: {
            'click area': 'selectTR'
        },
        selectTR: function(e) {
            var val = $(e.currentTarget).attr('data-partID');
            if (val) {
                var everyRow = this.$('.table tr');
                everyRow.css('background-color', 'white');
                var tr = everyRow.find('td:first-child:contains(' + val + '):first').closest('tr');
                tr.css('background-color', '#B3D1FF');
                window.scrollTo(0, tr.offset().top);
            }
        }
    });

});
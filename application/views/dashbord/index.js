/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

require(['gmaps']);

require(['backbone', 'jquery'], function(Backbone, $) {
    Backbone.emulateHTTP = true;
    Backbone.emulateJSON = true;

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'sort/:by': 'sortBy'
        },
        index: function() {
            var self = this;
            require(['accordian/accordian_view', 'domReady!', 'jquery'], function(av, dom, $) {
                var acv = new av();
                $('#accordion').html(acv.render());
                self.accordian = acv;
            });
        },
        sortBy: function(by) {
            if (!this.accordian) {
                window.location.href = URL + 'dashbord';
            }
            var dsc = $('#asc_dsc').is(':checked');
            this.accordian.sortBy(by, dsc);
        }
    });

    new Router();
    Backbone.history.start();

    require(['domReady!', 'backbone'], function(dom, Backbone) {
        $('#asc_dsc').click(function() {
            var hash = window.location.hash || '#sort/number';
            Backbone.history.stop();
            window.location.hash = hash;
            Backbone.history.start();
        });

        $('#sort a').css('color', 'black');
        $('#sort').on('click', 'a', function() {
            $('#sort a').css('color', 'black');
            $(this).css('color', 'blue');
        });
    });

});

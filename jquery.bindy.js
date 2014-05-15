/*global jQuery */
/*jshint browser:true */
/*!
* bindy 0.1
*
* Copyright 2014, Isaac Chansky
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($, window, document, undefined ){
  "use strict";

  $.fn.bindy = function( options ) {
    console.log('yay bindy!');
    var settings = {
    };
    options = options || {};
    $.extend( settings, options );

    var scope = options.scope || {};

    function updateModel(e){
      var $target = $(e.currentTarget);
      var binding = $target.data().bindTo.split('.');
      var object = binding[0];
      var attr = binding[1];
      if(scope[object] === undefined){
        scope[object] = {};
      }
      scope[object][attr] = $target.val();
      console.log('scope:');
      console.log(scope);
    }

    function updateDOMbindings(e){
      var $target = $(e.currentTarget);
      var binding = $target.data().bindTo.split('.');
      var object = binding[0];
      var attr = binding[1];
      var domBindings = $('[data-bind-from]');

      domBindings.each(function(i, el){
        var binder = $(el).data().bindFrom.split('.');
        var object = binder[0];
        var attr = binder[1];
        var value = scope[object][attr];
        $(el).html(value);
      });
    }

    var $dataBindings = $('[data-bind-to]');

    $dataBindings.on('change', updateModel);
    $dataBindings.on('change', updateDOMbindings);

  };

})(jQuery, window, document );

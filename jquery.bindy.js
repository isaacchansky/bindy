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
    var defaultSettings = { };
    options = options || {};
    $.extend( defaultSettings, options );

    var model = options.model || {};

    function updateModel(e){
      var $target = $(e.currentTarget);
      var binding = $target.data().bindTo.split('.');
      var object = binding[0];
      var attr = binding[1];
      if(model[object] === undefined){
        model[object] = {};
      }
      model[object][attr] = $target.val();
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
        var value = model[object][attr];
        $(el).html(value);
      });
    }

    var $dataBindings = $('[data-bind-to]');

    $dataBindings.on('keydown change', updateModel);
    $dataBindings.on('keydown change', updateDOMbindings);

  };

})(jQuery, window, document );

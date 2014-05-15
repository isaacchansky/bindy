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
    var $scope = this; // the dom-level scope (element bindy is attached to)
    var defaultSettings = { };
    options = options || {};
    $.extend( defaultSettings, options );

    var model = options.model || {};

    function updateModel(e){
      $scope.trigger('input:changed', [e, model]);

      var $target = $(e.currentTarget);
      var binding = $target.data().bindTo.split('.');
      var object = binding[0];
      var attr = binding[1];
      if(model[object] === undefined){
        model[object] = {};
      }
      model[object][attr] = $target.val();

      $scope.trigger('model:updated', e);
    }

    function updateDOMbindings(eventTriggered, domEvent){
      var $target = $(domEvent.currentTarget);
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

    function runBeforeUpdate (eventTriggered, domEvent, model) {
      // assume passed in function is of the following format
      //
      // function(model){
      //   ...
      // }
      if( typeof(options.beforeUpdate) === 'function' ){
        options.beforeUpdate.call(null, model);
      }
    }

    var $dataBindings = $('[data-bind-to]');

    $dataBindings.on('keydown keyup', updateModel);
    $scope.on('model:updated', updateDOMbindings);
    $scope.on('input:changed', runBeforeUpdate);

  };

})(jQuery, window, document );

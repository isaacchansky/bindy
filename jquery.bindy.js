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

    var rootModel = options.model || {};

    function initializeRootModel() {
      var domBindings = $('[data-bind-to]');
      domBindings.each(function(i, el){
        var binder = $(el).data().bindTo.split('.');
        var object = binder[0];
        var attr = binder[1];
        rootModel[object] = rootModel[object] || {};
        rootModel[object][attr] = rootModel[object][attr];
      });
    }

    function updateModel(e){
      var $target = $(e.currentTarget);
      var binding = $target.data().bindTo.split('.');
      var object = binding[0];
      var attr = binding[1];
      if(rootModel[object] === undefined){
        rootModel[object] = {};
      }
      rootModel[object][attr] = $target.val();

      $scope.trigger('input:changed', [e, rootModel]);
      $scope.trigger('model:updated', e);
    }

    function updateDOMbindings(eventTriggered, domEvent){
      var $target = $(domEvent.currentTarget);
      var binding = $target.data().bindTo.split('.');
      var object = binding[0];
      var attr = binding[1];
      var domBindings = $(this).find('[data-bind-from]');

      domBindings.each(function(i, el){
        var expression = $(el).data().bindFrom;

        var tokens = expression.split('|');
        var filter = tokens[1];
        var binder = tokens[0].split('.');
        var object = binder[0].trim();
        var attr = binder[1].trim();
        var value = rootModel[object][attr];
        if(filter){
          value = options.filters[filter.trim()].call(null, value);
        }
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
        var transformation = options.beforeUpdate.call(null, model);
        if( transformation !== undefined){
          rootModel = transformation;
        }
      }
    }

    function runAfterUpdate (eventTriggered, domEvent, model) {
      // assume passed in function is of the following format
      //
      // function(model){
      //   ...
      //  return model;
      // }
      if( typeof(options.beforeUpdate) === 'function' ){
        var transformation = options.afterUpdate.call(null, model);
        if( transformation !== undefined){
          rootModel = transformation;
        }
      }
    }
    var $dataBindings = $(this).find('[data-bind-to]');
    initializeRootModel();
    $dataBindings.on('keyup keydown', updateModel);
    $scope.on('model:updated', updateDOMbindings);
    $scope.on('input:changed', runBeforeUpdate);

    return rootModel;

  };

})(jQuery, window, document );

/*global jQuery */
/*jshint browser:true */
/*!
* bindy 0.1
*
* Copyright 2014, Isaac Chansky
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){
  "use strict";

  $.fn.bindy = function( options ) {
    var settings = {
    };

    if ( options ) {
      $.extend( settings, options );
    }


  };
})( window.jQuery || window.$ );

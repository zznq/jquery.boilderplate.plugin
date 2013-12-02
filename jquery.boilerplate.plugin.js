// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function (factory) {
  // Support AMD style loading for your jquery plugin
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }

} (function ( $, undefined ) {
    // You could have another self calling function wrapper to pass in window and 
    // document here if you are so inclined

    // Create the defaults once
    var pluginName = "defaultPluginName",
    defaults = {
      propertyName: "value"
    };

    // Change this name
    var Plugin = function( element, options ) {
      this.element = element;
      this.$element = $(element);

      // jQuery has an extend method which merges the contents of two or
      // more objects, storing the result in the first object. The first object
      // is generally empty as we don't want to alter the default options for
      // future instances of the plugin
      this.options = $.extend( {}, defaults, options );
  
      this._defaults = defaults;
      this._name = pluginName;

      this.init();
    };

    Plugin.prototype = {

      init: function() {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
        // you can add more functions like the one below and
        // call them like so: this.yourOtherFunction(this.element, this.options).
      },

      yourOtherFunction: function(el, options) {
        // some logic
      
        // use call function on helper methods to we can always use the plugin scope
        _helpers.yourHelperMethod.call(this);
      }
    };
  
    // I like to seperate common helpers methods outside of the plugin scope
    var _helpers = {
      yourHelperMethod: function() { 
        // some helper logic here
      }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        var pluginKey = 'plugin_' + pluginName;
        if (!$.data(this, pluginKey)) {
          $.data(this, pluginKey, new Plugin( this, options ));
        } else if(typeof(options) === 'string' && typeof($.data(this, pluginKey)[options]) === 'function') {
          $.data(this, pluginKey)[options].call(this, Array.prototype.slice.call(arguments, 1));
        }
      });
    };
    
}));

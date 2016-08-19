/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
(function( window, angular, undefined )***REMOVED***
"use strict";

(function() ***REMOVED***
  'use strict';

  /**
   * @ngdoc module
   * @name material.components.fabActions
   */
  angular
    .module('material.components.fabActions', ['material.core'])
    .directive('mdFabActions', MdFabActionsDirective);

  /**
   * @ngdoc directive
   * @name mdFabActions
   * @module material.components.fabActions
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-actions>` directive is used inside of a `<md-fab-speed-dial>` or
   * `<md-fab-toolbar>` directive to mark an element (or elements) as the actions and setup the
   * proper event listeners.
   *
   * @usage
   * See the `<md-fab-speed-dial>` or `<md-fab-toolbar>` directives for example usage.
   */
  function MdFabActionsDirective($mdUtil) ***REMOVED***
    return ***REMOVED***
      restrict: 'E',

      require: ['^?mdFabSpeedDial', '^?mdFabToolbar'],

      compile: function(element, attributes) ***REMOVED***
        var children = element.children();

        var hasNgRepeat = $mdUtil.prefixer().hasAttribute(children, 'ng-repeat');

        // Support both ng-repeat and static content
        if (hasNgRepeat) ***REMOVED***
          children.addClass('md-fab-action-item');
        ***REMOVED*** else ***REMOVED***
          // Wrap every child in a new div and add a class that we can scale/fling independently
          children.wrap('<div class="md-fab-action-item">');
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  MdFabActionsDirective.$inject = ["$mdUtil"];

***REMOVED***)();

***REMOVED***)(window, window.angular);
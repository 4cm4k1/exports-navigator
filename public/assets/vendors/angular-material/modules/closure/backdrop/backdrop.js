/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.backdrop');
goog.require('ngmaterial.core');
/*
 * @ngdoc module
 * @name material.components.backdrop
 * @description Backdrop
 */

/**
 * @ngdoc directive
 * @name mdBackdrop
 * @module material.components.backdrop
 *
 * @restrict E
 *
 * @description
 * `<md-backdrop>` is a backdrop element used by other components, such as dialog and bottom sheet.
 * Apply class `opaque` to make the backdrop use the theme backdrop color.
 *
 */

angular
  .module('material.components.backdrop', ['material.core'])
  .directive('mdBackdrop', ["$mdTheming", "$mdUtil", "$animate", "$rootElement", "$window", "$log", "$$rAF", "$document", function BackdropDirective($mdTheming, $mdUtil, $animate, $rootElement, $window, $log, $$rAF, $document) ***REMOVED***
    var ERROR_CSS_POSITION = '<md-backdrop> may not work properly in a scrolled, static-positioned parent container.';

    return ***REMOVED***
      restrict: 'E',
      link: postLink
    ***REMOVED***;

    function postLink(scope, element, attrs) ***REMOVED***
      // backdrop may be outside the $rootElement, tell ngAnimate to animate regardless
      if ($animate.pin) $animate.pin(element, $rootElement);

      var bodyStyles;

      $$rAF(function() ***REMOVED***
        // If body scrolling has been disabled using mdUtil.disableBodyScroll(),
        // adjust the 'backdrop' height to account for the fixed 'body' top offset.
        // Note that this can be pretty expensive and is better done inside the $$rAF.
        bodyStyles = $window.getComputedStyle($document[0].body);

        if (bodyStyles.position === 'fixed') ***REMOVED***
          var resizeHandler = $mdUtil.debounce(function()***REMOVED***
            bodyStyles = $window.getComputedStyle($document[0].body);
            resize();
          ***REMOVED***, 60, null, false);

          resize();
          angular.element($window).on('resize', resizeHandler);

          scope.$on('$destroy', function() ***REMOVED***
            angular.element($window).off('resize', resizeHandler);
          ***REMOVED***);
        ***REMOVED***

        // Often $animate.enter() is used to append the backDrop element
        // so let's wait until $animate is done...
        var parent = element.parent();

        if (parent.length) ***REMOVED***
          if (parent[0].nodeName === 'BODY') ***REMOVED***
            element.css('position', 'fixed');
          ***REMOVED***

          var styles = $window.getComputedStyle(parent[0]);

          if (styles.position === 'static') ***REMOVED***
            // backdrop uses position:absolute and will not work properly with parent position:static (default)
            $log.warn(ERROR_CSS_POSITION);
          ***REMOVED***

          // Only inherit the parent if the backdrop has a parent.
          $mdTheming.inherit(element, parent);
        ***REMOVED***
      ***REMOVED***);

      function resize() ***REMOVED***
        var viewportHeight = parseInt(bodyStyles.height, 10) + Math.abs(parseInt(bodyStyles.top, 10));
        element.css('height', viewportHeight + 'px');
      ***REMOVED***
    ***REMOVED***

  ***REMOVED***]);

ngmaterial.components.backdrop = angular.module("material.components.backdrop");
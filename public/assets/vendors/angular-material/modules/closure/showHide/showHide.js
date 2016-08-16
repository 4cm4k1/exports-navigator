/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.showHide');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.showHide
 */

// Add additional handlers to ng-show and ng-hide that notify directives
// contained within that they should recompute their size.
// These run in addition to Angular's built-in ng-hide and ng-show directives.
angular.module('material.components.showHide', [
  'material.core'
])
  .directive('ngShow', createDirective('ngShow', true))
  .directive('ngHide', createDirective('ngHide', false));


function createDirective(name, targetValue) ***REMOVED***
  return ['$mdUtil', function($mdUtil) ***REMOVED***
    return ***REMOVED***
      restrict: 'A',
      multiElement: true,
      link: function($scope, $element, $attr) ***REMOVED***
        var unregister = $scope.$on('$md-resize-enable', function() ***REMOVED***
          unregister();

          var cachedTransitionStyles = window.getComputedStyle($element[0]);

          $scope.$watch($attr[name], function(value) ***REMOVED***
            if (!!value === targetValue) ***REMOVED***
              $mdUtil.nextTick(function() ***REMOVED***
                $scope.$broadcast('$md-resize');
              ***REMOVED***);

              var opts = ***REMOVED***
                cachedTransitionStyles: cachedTransitionStyles
              ***REMOVED***;

              $mdUtil.dom.animator.waitTransitionEnd($element, opts).then(function() ***REMOVED***
                $scope.$broadcast('$md-resize');
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***];
***REMOVED***
ng.material.components.showHide = angular.module("material.components.showHide");
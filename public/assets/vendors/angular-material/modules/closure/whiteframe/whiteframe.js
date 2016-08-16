/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.whiteframe');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.whiteframe
 */
angular
  .module('material.components.whiteframe', ['material.core'])
  .directive('mdWhiteframe', MdWhiteframeDirective);

/**
 * @ngdoc directive
 * @module material.components.whiteframe
 * @name mdWhiteframe
 *
 * @description
 * The md-whiteframe directive allows you to apply an elevation shadow to an element.
 *
 * The attribute values needs to be a number between 1 and 24 or -1.
 * When set to -1 no style is applied.
 *
 * ### Notes
 * - If there is no value specified it defaults to 4dp.
 * - If the value is not valid it defaults to 4dp.

 * @usage
 * <hljs lang="html">
 * <div md-whiteframe="3">
 *   <span>Elevation of 3dp</span>
 * </div>
 * </hljs>
 *
 * <hljs lang="html">
 * <div md-whiteframe="-1">
 *   <span>No elevation shadow applied</span>
 * </div>
 * </hljs>
 *
 * <hljs lang="html">
 * <div ng-init="elevation = 5" md-whiteframe="***REMOVED******REMOVED***elevation***REMOVED******REMOVED***">
 *   <span>Elevation of 5dp with an interpolated value</span>
 * </div>
 * </hljs>
 */
function MdWhiteframeDirective($log) ***REMOVED***
  var DISABLE_DP = -1;
  var MIN_DP = 1;
  var MAX_DP = 24;
  var DEFAULT_DP = 4;

  return ***REMOVED***
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attr) ***REMOVED***
    var oldClass = '';

    attr.$observe('mdWhiteframe', function(elevation) ***REMOVED***
      elevation = parseInt(elevation, 10) || DEFAULT_DP;

      if (elevation != DISABLE_DP && (elevation > MAX_DP || elevation < MIN_DP)) ***REMOVED***
        $log.warn('md-whiteframe attribute value is invalid. It should be a number between ' + MIN_DP + ' and ' + MAX_DP, element[0]);
        elevation = DEFAULT_DP;
      ***REMOVED***

      var newClass = elevation == DISABLE_DP ? '' : 'md-whiteframe-' + elevation + 'dp';
      attr.$updateClass(newClass, oldClass);
      oldClass = newClass;
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
MdWhiteframeDirective.$inject = ["$log"];


ng.material.components.whiteframe = angular.module("material.components.whiteframe");
/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
(function( window, angular, undefined )***REMOVED***
"use strict";

/**
 * @ngdoc module
 * @name material.components.progressLinear
 * @description Linear Progress module!
 */
angular.module('material.components.progressLinear', [
  'material.core'
])
  .directive('mdProgressLinear', MdProgressLinearDirective);

/**
 * @ngdoc directive
 * @name mdProgressLinear
 * @module material.components.progressLinear
 * @restrict E
 *
 * @description
 * The linear progress directive is used to make loading content
 * in your app as delightful and painless as possible by minimizing
 * the amount of visual change a user sees before they can view
 * and interact with content.
 *
 * Each operation should only be represented by one activity indicator
 * For example: one refresh operation should not display both a
 * refresh bar and an activity circle.
 *
 * For operations where the percentage of the operation completed
 * can be determined, use a determinate indicator. They give users
 * a quick sense of how long an operation will take.
 *
 * For operations where the user is asked to wait a moment while
 * something finishes up, and it’s not necessary to expose what's
 * happening behind the scenes and how long it will take, use an
 * indeterminate indicator.
 *
 * @param ***REMOVED***string***REMOVED*** md-mode Select from one of four modes: determinate, indeterminate, buffer or query.
 *
 * Note: if the `md-mode` value is set as undefined or specified as 1 of the four (4) valid modes, then `indeterminate`
 * will be auto-applied as the mode.
 *
 * Note: if not configured, the `md-mode="indeterminate"` will be auto injected as an attribute. If `value=""` is also specified, however,
 * then `md-mode="determinate"` would be auto-injected instead.
 * @param ***REMOVED***number=***REMOVED*** value In determinate and buffer modes, this number represents the percentage of the primary progress bar. Default: 0
 * @param ***REMOVED***number=***REMOVED*** md-buffer-value In the buffer mode, this number represents the percentage of the secondary progress bar. Default: 0
 * @param ***REMOVED***boolean=***REMOVED*** ng-disabled Determines whether to disable the progress element.
 *
 * @usage
 * <hljs lang="html">
 * <md-progress-linear md-mode="determinate" value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="determinate" ng-value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="indeterminate"></md-progress-linear>
 *
 * <md-progress-linear md-mode="buffer" value="..." md-buffer-value="..."></md-progress-linear>
 *
 * <md-progress-linear md-mode="query"></md-progress-linear>
 * </hljs>
 */
function MdProgressLinearDirective($mdTheming, $mdUtil, $log) ***REMOVED***
  var MODE_DETERMINATE = "determinate";
  var MODE_INDETERMINATE = "indeterminate";
  var MODE_BUFFER = "buffer";
  var MODE_QUERY = "query";
  var DISABLED_CLASS = "_md-progress-linear-disabled";

  return ***REMOVED***
    restrict: 'E',
    template: '<div class="md-container">' +
      '<div class="md-dashed"></div>' +
      '<div class="md-bar md-bar1"></div>' +
      '<div class="md-bar md-bar2"></div>' +
      '</div>',
    compile: compile
  ***REMOVED***;

  function compile(tElement, tAttrs, transclude) ***REMOVED***
    tElement.attr('aria-valuemin', 0);
    tElement.attr('aria-valuemax', 100);
    tElement.attr('role', 'progressbar');

    return postLink;
  ***REMOVED***
  function postLink(scope, element, attr) ***REMOVED***
    $mdTheming(element);

    var lastMode;
    var isDisabled = attr.hasOwnProperty('disabled');
    var toVendorCSS = $mdUtil.dom.animator.toCss;
    var bar1 = angular.element(element[0].querySelector('.md-bar1'));
    var bar2 = angular.element(element[0].querySelector('.md-bar2'));
    var container = angular.element(element[0].querySelector('.md-container'));

    element
      .attr('md-mode', mode())
      .toggleClass(DISABLED_CLASS, isDisabled);

    validateMode();
    watchAttributes();

    /**
     * Watch the value, md-buffer-value, and md-mode attributes
     */
    function watchAttributes() ***REMOVED***
      attr.$observe('value', function(value) ***REMOVED***
        var percentValue = clamp(value);
        element.attr('aria-valuenow', percentValue);

        if (mode() != MODE_QUERY) animateIndicator(bar2, percentValue);
      ***REMOVED***);

      attr.$observe('mdBufferValue', function(value) ***REMOVED***
        animateIndicator(bar1, clamp(value));
      ***REMOVED***);

      attr.$observe('disabled', function(value) ***REMOVED***
        if (value === true || value === false) ***REMOVED***
          isDisabled = !!value;
        ***REMOVED*** else ***REMOVED***
          isDisabled = angular.isDefined(value);
        ***REMOVED***

        element.toggleClass(DISABLED_CLASS, isDisabled);
        container.toggleClass(lastMode, !isDisabled);
      ***REMOVED***);

      attr.$observe('mdMode', function(mode) ***REMOVED***
        if (lastMode) container.removeClass( lastMode );

        switch( mode ) ***REMOVED***
          case MODE_QUERY:
          case MODE_BUFFER:
          case MODE_DETERMINATE:
          case MODE_INDETERMINATE:
            container.addClass( lastMode = "md-mode-" + mode );
            break;
          default:
            container.addClass( lastMode = "md-mode-" + MODE_INDETERMINATE );
            break;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***

    /**
     * Auto-defaults the mode to either `determinate` or `indeterminate` mode; if not specified
     */
    function validateMode() ***REMOVED***
      if ( angular.isUndefined(attr.mdMode) ) ***REMOVED***
        var hasValue = angular.isDefined(attr.value);
        var mode = hasValue ? MODE_DETERMINATE : MODE_INDETERMINATE;
        var info = "Auto-adding the missing md-mode='***REMOVED***0***REMOVED***' to the ProgressLinear element";

        //$log.debug( $mdUtil.supplant(info, [mode]) );

        element.attr("md-mode", mode);
        attr.mdMode = mode;
      ***REMOVED***
    ***REMOVED***

    /**
     * Is the md-mode a valid option?
     */
    function mode() ***REMOVED***
      var value = (attr.mdMode || "").trim();
      if ( value ) ***REMOVED***
        switch(value) ***REMOVED***
          case MODE_DETERMINATE:
          case MODE_INDETERMINATE:
          case MODE_BUFFER:
          case MODE_QUERY:
            break;
          default:
            value = MODE_INDETERMINATE;
            break;
        ***REMOVED***
      ***REMOVED***
      return value;
    ***REMOVED***

    /**
     * Manually set CSS to animate the Determinate indicator based on the specified
     * percentage value (0-100).
     */
    function animateIndicator(target, value) ***REMOVED***
      if ( isDisabled || !mode() ) return;

      var to = $mdUtil.supplant("translateX(***REMOVED***0***REMOVED***%) scale(***REMOVED***1***REMOVED***,1)", [ (value-100)/2, value/100 ]);
      var styles = toVendorCSS(***REMOVED*** transform : to ***REMOVED***);
      angular.element(target).css( styles );
    ***REMOVED***
  ***REMOVED***

  /**
   * Clamps the value to be between 0 and 100.
   * @param ***REMOVED***number***REMOVED*** value The value to clamp.
   * @returns ***REMOVED***number***REMOVED***
   */
  function clamp(value) ***REMOVED***
    return Math.max(0, Math.min(value || 0, 100));
  ***REMOVED***
***REMOVED***
MdProgressLinearDirective.$inject = ["$mdTheming", "$mdUtil", "$log"];


***REMOVED***)(window, window.angular);
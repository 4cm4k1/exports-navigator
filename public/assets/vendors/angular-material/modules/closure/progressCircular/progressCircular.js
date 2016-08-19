/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.progressCircular');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.progressCircular
 * @description Module for a circular progressbar
 */

angular.module('material.components.progressCircular', ['material.core']);

/**
 * @ngdoc directive
 * @name mdProgressCircular
 * @module material.components.progressCircular
 * @restrict E
 *
 * @description
 * The circular progress directive is used to make loading content in your app as delightful and
 * painless as possible by minimizing the amount of visual change a user sees before they can view
 * and interact with content.
 *
 * For operations where the percentage of the operation completed can be determined, use a
 * determinate indicator. They give users a quick sense of how long an operation will take.
 *
 * For operations where the user is asked to wait a moment while something finishes up, and it’s
 * not necessary to expose what's happening behind the scenes and how long it will take, use an
 * indeterminate indicator.
 *
 * @param ***REMOVED***string***REMOVED*** md-mode Select from one of two modes: **'determinate'** and **'indeterminate'**.
 *
 * Note: if the `md-mode` value is set as undefined or specified as not 1 of the two (2) valid modes, then **'indeterminate'**
 * will be auto-applied as the mode.
 *
 * Note: if not configured, the `md-mode="indeterminate"` will be auto injected as an attribute.
 * If `value=""` is also specified, however, then `md-mode="determinate"` would be auto-injected instead.
 * @param ***REMOVED***number=***REMOVED*** value In determinate mode, this number represents the percentage of the
 *     circular progress. Default: 0
 * @param ***REMOVED***number=***REMOVED*** md-diameter This specifies the diameter of the circular progress. The value
 * should be a pixel-size value (eg '100'). If this attribute is
 * not present then a default value of '50px' is assumed.
 *
 * @param ***REMOVED***boolean=***REMOVED*** ng-disabled Determines whether to disable the progress element.
 *
 * @usage
 * <hljs lang="html">
 * <md-progress-circular md-mode="determinate" value="..."></md-progress-circular>
 *
 * <md-progress-circular md-mode="determinate" ng-value="..."></md-progress-circular>
 *
 * <md-progress-circular md-mode="determinate" value="..." md-diameter="100"></md-progress-circular>
 *
 * <md-progress-circular md-mode="indeterminate"></md-progress-circular>
 * </hljs>
 */

angular
  .module('material.components.progressCircular')
  .directive('mdProgressCircular', MdProgressCircularDirective);

/* ngInject */
function MdProgressCircularDirective($window, $mdProgressCircular, $mdTheming,
                                     $mdUtil, $interval, $log) ***REMOVED***

  // Note that this shouldn't use use $$rAF, because it can cause an infinite loop
  // in any tests that call $animate.flush.
  var rAF = $window.requestAnimationFrame || angular.noop;
  var cAF = $window.cancelAnimationFrame || angular.noop;
  var DEGREE_IN_RADIANS = $window.Math.PI / 180;
  var MODE_DETERMINATE = 'determinate';
  var MODE_INDETERMINATE = 'indeterminate';
  var DISABLED_CLASS = '_md-progress-circular-disabled';
  var INDETERMINATE_CLASS = 'md-mode-indeterminate';

  return ***REMOVED***
    restrict: 'E',
    scope: ***REMOVED***
      value: '@',
      mdDiameter: '@',
      mdMode: '@'
    ***REMOVED***,
    template:
      '<svg xmlns="http://www.w3.org/2000/svg">' +
        '<path fill="none"/>' +
      '</svg>',
    compile: function(element, attrs) ***REMOVED***
      element.attr(***REMOVED***
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'role': 'progressbar'
      ***REMOVED***);

      if (angular.isUndefined(attrs.mdMode)) ***REMOVED***
        var hasValue = angular.isDefined(attrs.value);
        var mode = hasValue ? MODE_DETERMINATE : MODE_INDETERMINATE;
        var info = "Auto-adding the missing md-mode='***REMOVED***0***REMOVED***' to the ProgressCircular element";

          // $log.debug( $mdUtil.supplant(info, [mode]) );
        attrs.$set('mdMode', mode);
      ***REMOVED*** else ***REMOVED***
        attrs.$set('mdMode', attrs.mdMode.trim());
      ***REMOVED***

      return MdProgressCircularLink;
    ***REMOVED***
  ***REMOVED***;

  function MdProgressCircularLink(scope, element, attrs) ***REMOVED***
    var node = element[0];
    var svg = angular.element(node.querySelector('svg'));
    var path = angular.element(node.querySelector('path'));
    var startIndeterminate = $mdProgressCircular.startIndeterminate;
    var endIndeterminate = $mdProgressCircular.endIndeterminate;
    var rotationIndeterminate = 0;
    var lastAnimationId = 0;
    var lastDrawFrame;
    var interval;

    $mdTheming(element);
    element.toggleClass(DISABLED_CLASS, attrs.hasOwnProperty('disabled'));

    // If the mode is indeterminate, it doesn't need to
    // wait for the next digest. It can start right away.
    if(scope.mdMode === MODE_INDETERMINATE)***REMOVED***
      startIndeterminateAnimation();
    ***REMOVED***

    scope.$on('$destroy', function()***REMOVED***
      cleanupIndeterminateAnimation();

      if (lastDrawFrame) ***REMOVED***
        cAF(lastDrawFrame);
      ***REMOVED***
    ***REMOVED***);

    scope.$watchGroup(['value', 'mdMode', function() ***REMOVED***
      var isDisabled = node.disabled;

      // Sometimes the browser doesn't return a boolean, in
      // which case we should check whether the attribute is
      // present.
      if (isDisabled === true || isDisabled === false)***REMOVED***
        return isDisabled;
      ***REMOVED***
      return angular.isDefined(element.attr('disabled'));

    ***REMOVED***], function(newValues, oldValues) ***REMOVED***
      var mode = newValues[1];
      var isDisabled = newValues[2];
      var wasDisabled = oldValues[2];

      if (isDisabled !== wasDisabled) ***REMOVED***
        element.toggleClass(DISABLED_CLASS, !!isDisabled);
      ***REMOVED***

      if (isDisabled) ***REMOVED***
        cleanupIndeterminateAnimation();
      ***REMOVED*** else ***REMOVED***
        if (mode !== MODE_DETERMINATE && mode !== MODE_INDETERMINATE) ***REMOVED***
          mode = MODE_INDETERMINATE;
          attrs.$set('mdMode', mode);
        ***REMOVED***

        if (mode === MODE_INDETERMINATE) ***REMOVED***
          startIndeterminateAnimation();
        ***REMOVED*** else ***REMOVED***
          var newValue = clamp(newValues[0]);

          cleanupIndeterminateAnimation();

          element.attr('aria-valuenow', newValue);
          renderCircle(clamp(oldValues[0]), newValue);
        ***REMOVED***
      ***REMOVED***

    ***REMOVED***);

    // This is in a separate watch in order to avoid layout, unless
    // the value has actually changed.
    scope.$watch('mdDiameter', function(newValue) ***REMOVED***
      var diameter = getSize(newValue);
      var strokeWidth = getStroke(diameter);
      var transformOrigin = (diameter / 2) + 'px';
      var dimensions = ***REMOVED***
        width: diameter + 'px',
        height: diameter + 'px'
      ***REMOVED***;

      // The viewBox has to be applied via setAttribute, because it is
      // case-sensitive. If jQuery is included in the page, `.attr` lowercases
      // all attribute names.
      svg[0].setAttribute('viewBox', '0 0 ' + diameter + ' ' + diameter);

      // Usually viewBox sets the dimensions for the SVG, however that doesn't
      // seem to be the case on IE10.
      // Important! The transform origin has to be set from here and it has to
      // be in the format of "Ypx Ypx Ypx", otherwise the rotation wobbles in
      // IE and Edge, because they don't account for the stroke width when
      // rotating. Also "center" doesn't help in this case, it has to be a
      // precise value.
      svg
        .css(dimensions)
        .css('transform-origin', transformOrigin + ' ' + transformOrigin + ' ' + transformOrigin);

      element.css(dimensions);
      path.css('stroke-width',  strokeWidth + 'px');
    ***REMOVED***);

    function renderCircle(animateFrom, animateTo, easing, duration, rotation) ***REMOVED***
      var id = ++lastAnimationId;
      var startTime = $mdUtil.now();
      var changeInValue = animateTo - animateFrom;
      var diameter = getSize(scope.mdDiameter);
      var pathDiameter = diameter - getStroke(diameter);
      var ease = easing || $mdProgressCircular.easeFn;
      var animationDuration = duration || $mdProgressCircular.duration;

      // No need to animate it if the values are the same
      if (animateTo === animateFrom) ***REMOVED***
        path.attr('d', getSvgArc(animateTo, diameter, pathDiameter, rotation));
      ***REMOVED*** else ***REMOVED***
        lastDrawFrame = rAF(function animation(now) ***REMOVED***
          var currentTime = $window.Math.max(0, $window.Math.min((now || $mdUtil.now()) - startTime, animationDuration));

          path.attr('d', getSvgArc(
            ease(currentTime, animateFrom, changeInValue, animationDuration),
            diameter,
            pathDiameter,
            rotation
          ));

          // Do not allow overlapping animations
          if (id === lastAnimationId && currentTime < animationDuration) ***REMOVED***
            lastDrawFrame = rAF(animation);
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    function animateIndeterminate() ***REMOVED***
      renderCircle(
        startIndeterminate,
        endIndeterminate,
        $mdProgressCircular.easeFnIndeterminate,
        $mdProgressCircular.durationIndeterminate,
        rotationIndeterminate
      );

      // The % 100 technically isn't necessary, but it keeps the rotation
      // under 100, instead of becoming a crazy large number.
      rotationIndeterminate = (rotationIndeterminate + endIndeterminate) % 100;

      var temp = startIndeterminate;
      startIndeterminate = -endIndeterminate;
      endIndeterminate = -temp;
    ***REMOVED***

    function startIndeterminateAnimation() ***REMOVED***
      if (!interval) ***REMOVED***
        // Note that this interval isn't supposed to trigger a digest.
        interval = $interval(
          animateIndeterminate,
          $mdProgressCircular.durationIndeterminate + 50,
          0,
          false
        );

        animateIndeterminate();

        element
          .addClass(INDETERMINATE_CLASS)
          .removeAttr('aria-valuenow');
      ***REMOVED***
    ***REMOVED***

    function cleanupIndeterminateAnimation() ***REMOVED***
      if (interval) ***REMOVED***
        $interval.cancel(interval);
        interval = null;
        element.removeClass(INDETERMINATE_CLASS);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  /**
   * Generates an arc following the SVG arc syntax.
   * Syntax spec: https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
   *
   * @param ***REMOVED***number***REMOVED*** current Current value between 0 and 100.
   * @param ***REMOVED***number***REMOVED*** diameter Diameter of the container.
   * @param ***REMOVED***number***REMOVED*** pathDiameter Diameter of the path element.
   * @param ***REMOVED***number=0***REMOVED*** rotation The point at which the semicircle should start rendering.
   * Used for doing the indeterminate animation.
   *
   * @returns ***REMOVED***string***REMOVED*** String representation of an SVG arc.
   */
  function getSvgArc(current, diameter, pathDiameter, rotation) ***REMOVED***
    // The angle can't be exactly 360, because the arc becomes hidden.
    var maximumAngle = 359.99 / 100;
    var startPoint = rotation || 0;
    var radius = diameter / 2;
    var pathRadius = pathDiameter / 2;

    var startAngle = startPoint * maximumAngle;
    var endAngle = current * maximumAngle;
    var start = polarToCartesian(radius, pathRadius, startAngle);
    var end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    var arcSweep = endAngle < 0 ? 0 : 1;
    var largeArcFlag;

    if (endAngle < 0) ***REMOVED***
      largeArcFlag = endAngle >= -180 ? 0 : 1;
    ***REMOVED*** else ***REMOVED***
      largeArcFlag = endAngle <= 180 ? 0 : 1;
    ***REMOVED***

    return 'M' + start + 'A' + pathRadius + ',' + pathRadius +
      ' 0 ' + largeArcFlag + ',' + arcSweep + ' ' + end;
  ***REMOVED***

  /**
   * Converts Polar coordinates to Cartesian.
   *
   * @param ***REMOVED***number***REMOVED*** radius Radius of the container.
   * @param ***REMOVED***number***REMOVED*** pathRadius Radius of the path element
   * @param ***REMOVED***number***REMOVED*** angleInDegress Angle at which to place the point.
   *
   * @returns ***REMOVED***string***REMOVED*** Cartesian coordinates in the format of `x,y`.
   */
  function polarToCartesian(radius, pathRadius, angleInDegrees) ***REMOVED***
    var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;

    return (radius + (pathRadius * $window.Math.cos(angleInRadians))) +
      ',' + (radius + (pathRadius * $window.Math.sin(angleInRadians)));
  ***REMOVED***

  /**
   * Limits a value between 0 and 100.
   */
  function clamp(value) ***REMOVED***
    return $window.Math.max(0, $window.Math.min(value || 0, 100));
  ***REMOVED***

  /**
   * Determines the size of a progress circle, based on the provided
   * value in the following formats: `X`, `Ypx`, `Z%`.
   */
  function getSize(value) ***REMOVED***
    var defaultValue = $mdProgressCircular.progressSize;

    if (value) ***REMOVED***
      var parsed = parseFloat(value);

      if (value.lastIndexOf('%') === value.length - 1) ***REMOVED***
        parsed = (parsed / 100) * defaultValue;
      ***REMOVED***

      return parsed;
    ***REMOVED***

    return defaultValue;
  ***REMOVED***

  /**
   * Determines the circle's stroke width, based on
   * the provided diameter.
   */
  function getStroke(diameter) ***REMOVED***
    return $mdProgressCircular.strokeWidth / 100 * diameter;
  ***REMOVED***
***REMOVED***
MdProgressCircularDirective.$inject = ["$window", "$mdProgressCircular", "$mdTheming", "$mdUtil", "$interval", "$log"];

/**
 * @ngdoc service
 * @name $mdProgressCircular
 * @module material.components.progressCircular
 *
 * @description
 * Allows the user to specify the default options for the `progressCircular` directive.
 *
 * @property ***REMOVED***number***REMOVED*** progressSize Diameter of the progress circle in pixels.
 * @property ***REMOVED***number***REMOVED*** strokeWidth Width of the circle's stroke as a percentage of the circle's size.
 * @property ***REMOVED***number***REMOVED*** duration Length of the circle animation in milliseconds.
 * @property ***REMOVED***function***REMOVED*** easeFn Default easing animation function.
 * @property ***REMOVED***object***REMOVED*** easingPresets Collection of pre-defined easing functions.
 *
 * @property ***REMOVED***number***REMOVED*** durationIndeterminate Duration of the indeterminate animation.
 * @property ***REMOVED***number***REMOVED*** startIndeterminate Indeterminate animation start point.
 * @property ***REMOVED***number***REMOVED*** endIndeterminate Indeterminate animation end point.
 * @property ***REMOVED***function***REMOVED*** easeFnIndeterminate Easing function to be used when animating
 * between the indeterminate values.
 *
 * @property ***REMOVED***(function(object): object)***REMOVED*** configure Used to modify the default options.
 *
 * @usage
 * <hljs lang="js">
 *   myAppModule.config(function($mdProgressCircularProvider) ***REMOVED***
 *
 *     // Example of changing the default progress options.
 *     $mdProgressCircularProvider.configure(***REMOVED***
 *       progressSize: 100,
 *       strokeWidth: 20,
 *       duration: 800
 *     ***REMOVED***);
 * ***REMOVED***);
 * </hljs>
 *
 */

angular
  .module('material.components.progressCircular')
  .provider("$mdProgressCircular", MdProgressCircularProvider);

function MdProgressCircularProvider() ***REMOVED***
  var progressConfig = ***REMOVED***
    progressSize: 50,
    strokeWidth: 10,
    duration: 100,
    easeFn: linearEase,

    durationIndeterminate: 500,
    startIndeterminate: 3,
    endIndeterminate: 80,
    easeFnIndeterminate: materialEase,

    easingPresets: ***REMOVED***
      linearEase: linearEase,
      materialEase: materialEase
    ***REMOVED***
  ***REMOVED***;

  return ***REMOVED***
    configure: function(options) ***REMOVED***
      progressConfig = angular.extend(progressConfig, options || ***REMOVED******REMOVED***);
      return progressConfig;
    ***REMOVED***,
    $get: function() ***REMOVED*** return progressConfig; ***REMOVED***
  ***REMOVED***;

  function linearEase(t, b, c, d) ***REMOVED***
    return c * t / d + b;
  ***REMOVED***

  function materialEase(t, b, c, d) ***REMOVED***
    // via http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
    // with settings of [0, 0, 1, 1]
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
  ***REMOVED***
***REMOVED***

ngmaterial.components.progressCircular = angular.module("material.components.progressCircular");
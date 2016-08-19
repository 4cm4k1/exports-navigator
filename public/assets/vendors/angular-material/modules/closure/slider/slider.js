/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.slider');
goog.require('ngmaterial.core');
  /**
   * @ngdoc module
   * @name material.components.slider
   */
  angular.module('material.components.slider', [
    'material.core'
  ])
  .directive('mdSlider', SliderDirective)
  .directive('mdSliderContainer', SliderContainerDirective);

/**
 * @ngdoc directive
 * @name mdSliderContainer
 * @module material.components.slider
 * @restrict E
 * @description
 * The `<md-slider-container>` contains slider with two other elements.
 *
 *
 * @usage
 * <h4>Normal Mode</h4>
 * <hljs lang="html">
 * </hljs>
 */
function SliderContainerDirective() ***REMOVED***
  return ***REMOVED***
    controller: function () ***REMOVED******REMOVED***,
    compile: function (elem) ***REMOVED***
      var slider = elem.find('md-slider');

      if (!slider) ***REMOVED***
        return;
      ***REMOVED***

      var vertical = slider.attr('md-vertical');

      if (vertical !== undefined) ***REMOVED***
        elem.attr('md-vertical', '');
      ***REMOVED***

      if(!slider.attr('flex')) ***REMOVED***
        slider.attr('flex', '');
      ***REMOVED***

      return function postLink(scope, element, attr, ctrl) ***REMOVED***
        element.addClass('_md');     // private md component indicator for styling

        // We have to manually stop the $watch on ngDisabled because it exists
        // on the parent scope, and won't be automatically destroyed when
        // the component is destroyed.
        function setDisable(value) ***REMOVED***
          element.children().attr('disabled', value);
          element.find('input').attr('disabled', value);
        ***REMOVED***

        var stopDisabledWatch = angular.noop;

        if (attr.disabled) ***REMOVED***
          setDisable(true);
        ***REMOVED***
        else if (attr.ngDisabled) ***REMOVED***
          stopDisabledWatch = scope.$watch(attr.ngDisabled, function (value) ***REMOVED***
            setDisable(value);
          ***REMOVED***);
        ***REMOVED***

        scope.$on('$destroy', function () ***REMOVED***
          stopDisabledWatch();
        ***REMOVED***);

        var initialMaxWidth;

        ctrl.fitInputWidthToTextLength = function (length) ***REMOVED***
          var input = element[0].querySelector('md-input-container');

          if (input) ***REMOVED***
            var computedStyle = getComputedStyle(input);
            var minWidth = parseInt(computedStyle.minWidth);
            var padding = parseInt(computedStyle.padding) * 2;

            initialMaxWidth = initialMaxWidth || parseInt(computedStyle.maxWidth);
            var newMaxWidth = Math.max(initialMaxWidth, minWidth + padding + (minWidth / 2 * length));

            input.style.maxWidth = newMaxWidth + 'px';
          ***REMOVED***
        ***REMOVED***;
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

/**
 * @ngdoc directive
 * @name mdSlider
 * @module material.components.slider
 * @restrict E
 * @description
 * The `<md-slider>` component allows the user to choose from a range of
 * values.
 *
 * As per the [material design spec](http://www.google.com/design/spec/style/color.html#color-ui-color-application)
 * the slider is in the accent color by default. The primary color palette may be used with
 * the `md-primary` class.
 *
 * It has two modes: 'normal' mode, where the user slides between a wide range
 * of values, and 'discrete' mode, where the user slides between only a few
 * select values.
 *
 * To enable discrete mode, add the `md-discrete` attribute to a slider,
 * and use the `step` attribute to change the distance between
 * values the user is allowed to pick.
 *
 * @usage
 * <h4>Normal Mode</h4>
 * <hljs lang="html">
 * <md-slider ng-model="myValue" min="5" max="500">
 * </md-slider>
 * </hljs>
 * <h4>Discrete Mode</h4>
 * <hljs lang="html">
 * <md-slider md-discrete ng-model="myDiscreteValue" step="10" min="10" max="130">
 * </md-slider>
 * </hljs>
 * <h4>Invert Mode</h4>
 * <hljs lang="html">
 * <md-slider md-invert ng-model="myValue" step="10" min="10" max="130">
 * </md-slider>
 * </hljs>
 *
 * @param ***REMOVED***boolean=***REMOVED*** md-discrete Whether to enable discrete mode.
 * @param ***REMOVED***boolean=***REMOVED*** md-invert Whether to enable invert mode.
 * @param ***REMOVED***number=***REMOVED*** step The distance between values the user is allowed to pick. Default 1.
 * @param ***REMOVED***number=***REMOVED*** min The minimum value the user is allowed to pick. Default 0.
 * @param ***REMOVED***number=***REMOVED*** max The maximum value the user is allowed to pick. Default 100.
 * @param ***REMOVED***number=***REMOVED*** round The amount of numbers after the decimal point, maximum is 6 to prevent scientific notation. Default 3.
 */
function SliderDirective($$rAF, $window, $mdAria, $mdUtil, $mdConstant, $mdTheming, $mdGesture, $parse, $log, $timeout) ***REMOVED***
  return ***REMOVED***
    scope: ***REMOVED******REMOVED***,
    require: ['?ngModel', '?^mdSliderContainer'],
    template:
      '<div class="md-slider-wrapper">' +
        '<div class="md-slider-content">' +
          '<div class="md-track-container">' +
            '<div class="md-track"></div>' +
            '<div class="md-track md-track-fill"></div>' +
            '<div class="md-track-ticks"></div>' +
          '</div>' +
          '<div class="md-thumb-container">' +
            '<div class="md-thumb"></div>' +
            '<div class="md-focus-thumb"></div>' +
            '<div class="md-focus-ring"></div>' +
            '<div class="md-sign">' +
              '<span class="md-thumb-text"></span>' +
            '</div>' +
            '<div class="md-disabled-thumb"></div>' +
          '</div>' +
        '</div>' +
      '</div>',
    compile: compile
  ***REMOVED***;

  // **********************************************************
  // Private Methods
  // **********************************************************

  function compile (tElement, tAttrs) ***REMOVED***
    var wrapper = angular.element(tElement[0].getElementsByClassName('md-slider-wrapper'));

    var tabIndex = tAttrs.tabindex || 0;
    wrapper.attr('tabindex', tabIndex);

    if (tAttrs.disabled || tAttrs.ngDisabled) wrapper.attr('tabindex', -1);

    wrapper.attr('role', 'slider');

    $mdAria.expect(tElement, 'aria-label');

    return postLink;
  ***REMOVED***

  function postLink(scope, element, attr, ctrls) ***REMOVED***
    $mdTheming(element);
    var ngModelCtrl = ctrls[0] || ***REMOVED***
      // Mock ngModelController if it doesn't exist to give us
      // the minimum functionality needed
      $setViewValue: function(val) ***REMOVED***
        this.$viewValue = val;
        this.$viewChangeListeners.forEach(function(cb) ***REMOVED*** cb(); ***REMOVED***);
      ***REMOVED***,
      $parsers: [],
      $formatters: [],
      $viewChangeListeners: []
    ***REMOVED***;

    var containerCtrl = ctrls[1];
    var container = angular.element($mdUtil.getClosest(element, '_md-slider-container', true));
    var isDisabled = attr.ngDisabled ? angular.bind(null, $parse(attr.ngDisabled), scope.$parent) : function () ***REMOVED***
          return element[0].hasAttribute('disabled');
        ***REMOVED***;

    var thumb = angular.element(element[0].querySelector('.md-thumb'));
    var thumbText = angular.element(element[0].querySelector('.md-thumb-text'));
    var thumbContainer = thumb.parent();
    var trackContainer = angular.element(element[0].querySelector('.md-track-container'));
    var activeTrack = angular.element(element[0].querySelector('.md-track-fill'));
    var tickContainer = angular.element(element[0].querySelector('.md-track-ticks'));
    var wrapper = angular.element(element[0].getElementsByClassName('md-slider-wrapper'));
    var content = angular.element(element[0].getElementsByClassName('md-slider-content'));
    var throttledRefreshDimensions = $mdUtil.throttle(refreshSliderDimensions, 5000);

    // Default values, overridable by attrs
    var DEFAULT_ROUND = 3;
    var vertical = angular.isDefined(attr.mdVertical);
    var discrete = angular.isDefined(attr.mdDiscrete);
    var invert = angular.isDefined(attr.mdInvert);
    angular.isDefined(attr.min) ? attr.$observe('min', updateMin) : updateMin(0);
    angular.isDefined(attr.max) ? attr.$observe('max', updateMax) : updateMax(100);
    angular.isDefined(attr.step)? attr.$observe('step', updateStep) : updateStep(1);
    angular.isDefined(attr.round)? attr.$observe('round', updateRound) : updateRound(DEFAULT_ROUND);

    // We have to manually stop the $watch on ngDisabled because it exists
    // on the parent scope, and won't be automatically destroyed when
    // the component is destroyed.
    var stopDisabledWatch = angular.noop;
    if (attr.ngDisabled) ***REMOVED***
      stopDisabledWatch = scope.$parent.$watch(attr.ngDisabled, updateAriaDisabled);
    ***REMOVED***

    $mdGesture.register(wrapper, 'drag', ***REMOVED*** horizontal: !vertical ***REMOVED***);

    scope.mouseActive = false;

    wrapper
      .on('keydown', keydownListener)
      .on('mousedown', mouseDownListener)
      .on('focus', focusListener)
      .on('blur', blurListener)
      .on('$md.pressdown', onPressDown)
      .on('$md.pressup', onPressUp)
      .on('$md.dragstart', onDragStart)
      .on('$md.drag', onDrag)
      .on('$md.dragend', onDragEnd);

    // On resize, recalculate the slider's dimensions and re-render
    function updateAll() ***REMOVED***
      refreshSliderDimensions();
      ngModelRender();
    ***REMOVED***
    setTimeout(updateAll, 0);

    var debouncedUpdateAll = $$rAF.throttle(updateAll);
    angular.element($window).on('resize', debouncedUpdateAll);

    scope.$on('$destroy', function() ***REMOVED***
      angular.element($window).off('resize', debouncedUpdateAll);
    ***REMOVED***);

    ngModelCtrl.$render = ngModelRender;
    ngModelCtrl.$viewChangeListeners.push(ngModelRender);
    ngModelCtrl.$formatters.push(minMaxValidator);
    ngModelCtrl.$formatters.push(stepValidator);

    /**
     * Attributes
     */
    var min;
    var max;
    var step;
    var round;
    function updateMin(value) ***REMOVED***
      min = parseFloat(value);
      element.attr('aria-valuemin', value);
      updateAll();
    ***REMOVED***
    function updateMax(value) ***REMOVED***
      max = parseFloat(value);
      element.attr('aria-valuemax', value);
      updateAll();
    ***REMOVED***
    function updateStep(value) ***REMOVED***
      step = parseFloat(value);
    ***REMOVED***
    function updateRound(value) ***REMOVED***
      // Set max round digits to 6, after 6 the input uses scientific notation
      round = minMaxValidator(parseInt(value), 0, 6);
    ***REMOVED***
    function updateAriaDisabled() ***REMOVED***
      element.attr('aria-disabled', !!isDisabled());
    ***REMOVED***

    // Draw the ticks with canvas.
    // The alternative to drawing ticks with canvas is to draw one element for each tick,
    // which could quickly become a performance bottleneck.
    var tickCanvas, tickCtx;
    function redrawTicks() ***REMOVED***
      if (!discrete || isDisabled()) return;
      if ( angular.isUndefined(step) )         return;

      if ( step <= 0 ) ***REMOVED***
        var msg = 'Slider step value must be greater than zero when in discrete mode';
        $log.error(msg);
        throw new Error(msg);
      ***REMOVED***

      var numSteps = Math.floor( (max - min) / step );
      if (!tickCanvas) ***REMOVED***
        tickCanvas = angular.element('<canvas>').css('position', 'absolute');
        tickContainer.append(tickCanvas);

        tickCtx = tickCanvas[0].getContext('2d');
      ***REMOVED***

      var dimensions = getSliderDimensions();

      // If `dimensions` doesn't have height and width it might be the first attempt so we will refresh dimensions
      if (dimensions && !dimensions.height && !dimensions.width) ***REMOVED***
        refreshSliderDimensions();
        dimensions = sliderDimensions;
      ***REMOVED***

      tickCanvas[0].width = dimensions.width;
      tickCanvas[0].height = dimensions.height;

      var distance;
      for (var i = 0; i <= numSteps; i++) ***REMOVED***
        var trackTicksStyle = $window.getComputedStyle(tickContainer[0]);
        tickCtx.fillStyle = trackTicksStyle.color || 'black';

        distance = Math.floor((vertical ? dimensions.height : dimensions.width) * (i / numSteps));

        tickCtx.fillRect(vertical ? 0 : distance - 1,
          vertical ? distance - 1 : 0,
          vertical ? dimensions.width : 2,
          vertical ? 2 : dimensions.height);
      ***REMOVED***
    ***REMOVED***

    function clearTicks() ***REMOVED***
      if(tickCanvas && tickCtx) ***REMOVED***
        var dimensions = getSliderDimensions();
        tickCtx.clearRect(0, 0, dimensions.width, dimensions.height);
      ***REMOVED***
    ***REMOVED***

    /**
     * Refreshing Dimensions
     */
    var sliderDimensions = ***REMOVED******REMOVED***;
    refreshSliderDimensions();
    function refreshSliderDimensions() ***REMOVED***
      sliderDimensions = trackContainer[0].getBoundingClientRect();
    ***REMOVED***
    function getSliderDimensions() ***REMOVED***
      throttledRefreshDimensions();
      return sliderDimensions;
    ***REMOVED***

    /**
     * left/right/up/down arrow listener
     */
    function keydownListener(ev) ***REMOVED***
      if (isDisabled()) return;

      var changeAmount;
      if (vertical ? ev.keyCode === $mdConstant.KEY_CODE.DOWN_ARROW : ev.keyCode === $mdConstant.KEY_CODE.LEFT_ARROW) ***REMOVED***
        changeAmount = -step;
      ***REMOVED*** else if (vertical ? ev.keyCode === $mdConstant.KEY_CODE.UP_ARROW : ev.keyCode === $mdConstant.KEY_CODE.RIGHT_ARROW) ***REMOVED***
        changeAmount = step;
      ***REMOVED***
      changeAmount = invert ? -changeAmount : changeAmount;
      if (changeAmount) ***REMOVED***
        if (ev.metaKey || ev.ctrlKey || ev.altKey) ***REMOVED***
          changeAmount *= 4;
        ***REMOVED***
        ev.preventDefault();
        ev.stopPropagation();
        scope.$evalAsync(function() ***REMOVED***
          setModelValue(ngModelCtrl.$viewValue + changeAmount);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    function mouseDownListener() ***REMOVED***
      redrawTicks();

      scope.mouseActive = true;
      wrapper.removeClass('md-focused');

      $timeout(function() ***REMOVED***
        scope.mouseActive = false;
      ***REMOVED***, 100);
    ***REMOVED***

    function focusListener() ***REMOVED***
      if (scope.mouseActive === false) ***REMOVED***
        wrapper.addClass('md-focused');
      ***REMOVED***
    ***REMOVED***

    function blurListener() ***REMOVED***
      wrapper.removeClass('md-focused');
      element.removeClass('md-active');
      clearTicks();
    ***REMOVED***

    /**
     * ngModel setters and validators
     */
    function setModelValue(value) ***REMOVED***
      ngModelCtrl.$setViewValue( minMaxValidator(stepValidator(value)) );
    ***REMOVED***
    function ngModelRender() ***REMOVED***
      if (isNaN(ngModelCtrl.$viewValue)) ***REMOVED***
        ngModelCtrl.$viewValue = ngModelCtrl.$modelValue;
      ***REMOVED***

      ngModelCtrl.$viewValue = minMaxValidator(ngModelCtrl.$viewValue);

      var percent = valueToPercent(ngModelCtrl.$viewValue);
      scope.modelValue = ngModelCtrl.$viewValue;
      element.attr('aria-valuenow', ngModelCtrl.$viewValue);
      setSliderPercent(percent);
      thumbText.text( ngModelCtrl.$viewValue );
    ***REMOVED***

    function minMaxValidator(value, minValue, maxValue) ***REMOVED***
      if (angular.isNumber(value)) ***REMOVED***
        minValue = angular.isNumber(minValue) ? minValue : min;
        maxValue = angular.isNumber(maxValue) ? maxValue : max;

        return Math.max(minValue, Math.min(maxValue, value));
      ***REMOVED***
    ***REMOVED***

    function stepValidator(value) ***REMOVED***
      if (angular.isNumber(value)) ***REMOVED***
        var formattedValue = (Math.round((value - min) / step) * step + min);
        formattedValue = (Math.round(formattedValue * Math.pow(10, round)) / Math.pow(10, round));

        if (containerCtrl && containerCtrl.fitInputWidthToTextLength)***REMOVED***
          $mdUtil.debounce(function () ***REMOVED***
            containerCtrl.fitInputWidthToTextLength(formattedValue.toString().length);
          ***REMOVED***, 100)();
        ***REMOVED***

        return formattedValue;
      ***REMOVED***
    ***REMOVED***

    /**
     * @param percent 0-1
     */
    function setSliderPercent(percent) ***REMOVED***

      percent = clamp(percent);

      var thumbPosition = (percent * 100) + '%';
      var activeTrackPercent = invert ? (1 - percent) * 100 + '%' : thumbPosition;

      if (vertical) ***REMOVED***
        thumbContainer.css('bottom', thumbPosition);
      ***REMOVED***
      else ***REMOVED***
        $mdUtil.bidiProperty(thumbContainer, 'left', 'right', thumbPosition);
      ***REMOVED***

      
      activeTrack.css(vertical ? 'height' : 'width', activeTrackPercent);

      element.toggleClass((invert ? 'md-max' : 'md-min'), percent === 0);
      element.toggleClass((invert ? 'md-min' : 'md-max'), percent === 1);
    ***REMOVED***

    /**
     * Slide listeners
     */
    var isDragging = false;

    function onPressDown(ev) ***REMOVED***
      if (isDisabled()) return;

      element.addClass('md-active');
      element[0].focus();
      refreshSliderDimensions();

      var exactVal = percentToValue( positionToPercent( vertical ? ev.pointer.y : ev.pointer.x ));
      var closestVal = minMaxValidator( stepValidator(exactVal) );
      scope.$apply(function() ***REMOVED***
        setModelValue( closestVal );
        setSliderPercent( valueToPercent(closestVal));
      ***REMOVED***);
    ***REMOVED***
    function onPressUp(ev) ***REMOVED***
      if (isDisabled()) return;

      element.removeClass('md-dragging');

      var exactVal = percentToValue( positionToPercent( vertical ? ev.pointer.y : ev.pointer.x ));
      var closestVal = minMaxValidator( stepValidator(exactVal) );
      scope.$apply(function() ***REMOVED***
        setModelValue(closestVal);
        ngModelRender();
      ***REMOVED***);
    ***REMOVED***
    function onDragStart(ev) ***REMOVED***
      if (isDisabled()) return;
      isDragging = true;

      ev.stopPropagation();

      element.addClass('md-dragging');
      setSliderFromEvent(ev);
    ***REMOVED***
    function onDrag(ev) ***REMOVED***
      if (!isDragging) return;
      ev.stopPropagation();
      setSliderFromEvent(ev);
    ***REMOVED***
    function onDragEnd(ev) ***REMOVED***
      if (!isDragging) return;
      ev.stopPropagation();
      isDragging = false;
    ***REMOVED***

    function setSliderFromEvent(ev) ***REMOVED***
      // While panning discrete, update only the
      // visual positioning but not the model value.
      if ( discrete ) adjustThumbPosition( vertical ? ev.pointer.y : ev.pointer.x );
      else            doSlide( vertical ? ev.pointer.y : ev.pointer.x );
    ***REMOVED***

    /**
     * Slide the UI by changing the model value
     * @param x
     */
    function doSlide( x ) ***REMOVED***
      scope.$evalAsync( function() ***REMOVED***
        setModelValue( percentToValue( positionToPercent(x) ));
      ***REMOVED***);
    ***REMOVED***

    /**
     * Slide the UI without changing the model (while dragging/panning)
     * @param x
     */
    function adjustThumbPosition( x ) ***REMOVED***
      var exactVal = percentToValue( positionToPercent( x ));
      var closestVal = minMaxValidator( stepValidator(exactVal) );
      setSliderPercent( positionToPercent(x) );
      thumbText.text( closestVal );
    ***REMOVED***

    /**
    * Clamps the value to be between 0 and 1.
    * @param ***REMOVED***number***REMOVED*** value The value to clamp.
    * @returns ***REMOVED***number***REMOVED***
    */
    function clamp(value) ***REMOVED***
      return Math.max(0, Math.min(value || 0, 1));
    ***REMOVED***

    /**
     * Convert position on slider to percentage value of offset from beginning...
     * @param position
     * @returns ***REMOVED***number***REMOVED***
     */
    function positionToPercent( position ) ***REMOVED***
      var offset = vertical ? sliderDimensions.top : sliderDimensions.left;
      var size = vertical ? sliderDimensions.height : sliderDimensions.width;
      var calc = (position - offset) / size;

      if (!vertical && $mdUtil.bidi() === 'rtl') ***REMOVED***
        calc = 1 - calc;
      ***REMOVED***

      return Math.max(0, Math.min(1, vertical ? 1 - calc : calc));
    ***REMOVED***

    /**
     * Convert percentage offset on slide to equivalent model value
     * @param percent
     * @returns ***REMOVED*******REMOVED***
     */
    function percentToValue( percent ) ***REMOVED***
      var adjustedPercent = invert ? (1 - percent) : percent;
      return (min + adjustedPercent * (max - min));
    ***REMOVED***

    function valueToPercent( val ) ***REMOVED***
      var percent = (val - min) / (max - min);
      return invert ? (1 - percent) : percent;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
SliderDirective.$inject = ["$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant", "$mdTheming", "$mdGesture", "$parse", "$log", "$timeout"];

ngmaterial.components.slider = angular.module("material.components.slider");
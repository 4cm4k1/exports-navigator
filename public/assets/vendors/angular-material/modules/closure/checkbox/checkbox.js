/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.checkbox');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.checkbox
 * @description Checkbox module!
 */
angular
  .module('material.components.checkbox', ['material.core'])
  .directive('mdCheckbox', MdCheckboxDirective);

/**
 * @ngdoc directive
 * @name mdCheckbox
 * @module material.components.checkbox
 * @restrict E
 *
 * @description
 * The checkbox directive is used like the normal [angular checkbox](https://docs.angularjs.org/api/ng/input/input%5Bcheckbox%5D).
 *
 * As per the [material design spec](http://www.google.com/design/spec/style/color.html#color-ui-color-application)
 * the checkbox is in the accent color by default. The primary color palette may be used with
 * the `md-primary` class.
 *
 * @param ***REMOVED***string***REMOVED*** ng-model Assignable angular expression to data-bind to.
 * @param ***REMOVED***string=***REMOVED*** name Property name of the form under which the control is published.
 * @param ***REMOVED***expression=***REMOVED*** ng-true-value The value to which the expression should be set when selected.
 * @param ***REMOVED***expression=***REMOVED*** ng-false-value The value to which the expression should be set when not selected.
 * @param ***REMOVED***string=***REMOVED*** ng-change Angular expression to be executed when input changes due to user interaction with the input element.
 * @param ***REMOVED***boolean=***REMOVED*** md-no-ink Use of attribute indicates use of ripple ink effects
 * @param ***REMOVED***string=***REMOVED*** aria-label Adds label to checkbox for accessibility.
 *     Defaults to checkbox's text. If no default text is found, a warning will be logged.
 * @param ***REMOVED***expression=***REMOVED*** md-indeterminate This determines when the checkbox should be rendered as 'indeterminate'.
 *     If a truthy expression or no value is passed in the checkbox renders in the md-indeterminate state.
 *     If falsy expression is passed in it just looks like a normal unchecked checkbox.
 *     The indeterminate, checked, and unchecked states are mutually exclusive. A box cannot be in any two states at the same time. 
 *     Adding the 'md-indeterminate' attribute overrides any checked/unchecked rendering logic. 
 *     When using the 'md-indeterminate' attribute use 'ng-checked' to define rendering logic instead of using 'ng-model'.
 * @param ***REMOVED***expression=***REMOVED*** ng-checked If this expression evaluates as truthy, the 'md-checked' css class is added to the checkbox and it 
 *     will appear checked.
 *
 * @usage
 * <hljs lang="html">
 * <md-checkbox ng-model="isChecked" aria-label="Finished?">
 *   Finished ?
 * </md-checkbox>
 *
 * <md-checkbox md-no-ink ng-model="hasInk" aria-label="No Ink Effects">
 *   No Ink Effects
 * </md-checkbox>
 *
 * <md-checkbox ng-disabled="true" ng-model="isDisabled" aria-label="Disabled">
 *   Disabled
 * </md-checkbox>
 *
 * </hljs>
 *
 */
function MdCheckboxDirective(inputDirective, $mdAria, $mdConstant, $mdTheming, $mdUtil, $timeout) ***REMOVED***
  inputDirective = inputDirective[0];
  var CHECKED_CSS = 'md-checked';

  return ***REMOVED***
    restrict: 'E',
    transclude: true,
    require: '?ngModel',
    priority: 210, // Run before ngAria
    template:
      '<div class="_md-container" md-ink-ripple md-ink-ripple-checkbox>' +
        '<div class="_md-icon"></div>' +
      '</div>' +
      '<div ng-transclude class="_md-label"></div>',
    compile: compile
  ***REMOVED***;

  // **********************************************************
  // Private Methods
  // **********************************************************

  function compile (tElement, tAttrs) ***REMOVED***
    var container = tElement.children();
    var mdIndeterminateStateEnabled = $mdUtil.parseAttributeBoolean(tAttrs.mdIndeterminate);

    tAttrs.$set('tabindex', tAttrs.tabindex || '0');
    tAttrs.$set('type', 'checkbox');
    tAttrs.$set('role', tAttrs.type);

    // Attach a click handler in compile in order to immediately stop propagation
    // (especially for ng-click) when the checkbox is disabled.
    tElement.on('click', function(event) ***REMOVED***
      if (this.hasAttribute('disabled')) ***REMOVED***
        event.stopImmediatePropagation();
      ***REMOVED***
    ***REMOVED***);

    // Redirect focus events to the root element, because IE11 is always focusing the container element instead
    // of the md-checkbox element. This causes issues when using ngModelOptions: `updateOnBlur`
    container.on('focus', function() ***REMOVED***
      tElement.focus();
    ***REMOVED***);

    return function postLink(scope, element, attr, ngModelCtrl) ***REMOVED***
      var isIndeterminate;
      ngModelCtrl = ngModelCtrl || $mdUtil.fakeNgModel();
      $mdTheming(element);
      if (mdIndeterminateStateEnabled) ***REMOVED***
        setIndeterminateState();
        scope.$watch(attr.mdIndeterminate, setIndeterminateState);
      ***REMOVED***

      if (attr.ngChecked) ***REMOVED***
        scope.$watch(
            scope.$eval.bind(scope, attr.ngChecked),
            ngModelCtrl.$setViewValue.bind(ngModelCtrl)
        );
      ***REMOVED***

      $$watchExpr('ngDisabled', 'tabindex', ***REMOVED***
        true: '-1',
        false: attr.tabindex
      ***REMOVED***);

      $mdAria.expectWithText(element, 'aria-label');

      // Reuse the original input[type=checkbox] directive from Angular core.
      // This is a bit hacky as we need our own event listener and own render
      // function.
      inputDirective.link.pre(scope, ***REMOVED***
        on: angular.noop,
        0: ***REMOVED******REMOVED***
      ***REMOVED***, attr, [ngModelCtrl]);

      scope.mouseActive = false;
      element.on('click', listener)
        .on('keypress', keypressHandler)
        .on('mousedown', function() ***REMOVED***
          scope.mouseActive = true;
          $timeout(function() ***REMOVED***
            scope.mouseActive = false;
          ***REMOVED***, 100);
        ***REMOVED***)
        .on('focus', function() ***REMOVED***
          if (scope.mouseActive === false) ***REMOVED***
            element.addClass('md-focused');
          ***REMOVED***
        ***REMOVED***)
        .on('blur', function() ***REMOVED***
          element.removeClass('md-focused');
        ***REMOVED***);

      ngModelCtrl.$render = render;

      function $$watchExpr(expr, htmlAttr, valueOpts) ***REMOVED***
        if (attr[expr]) ***REMOVED***
          scope.$watch(attr[expr], function(val) ***REMOVED***
            if (valueOpts[val]) ***REMOVED***
              element.attr(htmlAttr, valueOpts[val]);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***

      function keypressHandler(ev) ***REMOVED***
        var keyCode = ev.which || ev.keyCode;
        if (keyCode === $mdConstant.KEY_CODE.SPACE || keyCode === $mdConstant.KEY_CODE.ENTER) ***REMOVED***
          ev.preventDefault();

          if (!element.hasClass('md-focused')) ***REMOVED***
            element.addClass('md-focused');
          ***REMOVED***

          listener(ev);
        ***REMOVED***
      ***REMOVED***

      function listener(ev) ***REMOVED***
        if (element[0].hasAttribute('disabled')) ***REMOVED***
          return;
        ***REMOVED***

        scope.$apply(function() ***REMOVED***
          // Toggle the checkbox value...
          var viewValue = attr.ngChecked ? attr.checked : !ngModelCtrl.$viewValue;

          ngModelCtrl.$setViewValue( viewValue, ev && ev.type);
          ngModelCtrl.$render();
        ***REMOVED***);
      ***REMOVED***

      function render() ***REMOVED***
        if(ngModelCtrl.$viewValue && !isIndeterminate) ***REMOVED***
          element.addClass(CHECKED_CSS);
        ***REMOVED*** else ***REMOVED***
          element.removeClass(CHECKED_CSS);
        ***REMOVED***
      ***REMOVED***

      function setIndeterminateState(newValue) ***REMOVED***
        isIndeterminate = newValue !== false;
        if (isIndeterminate) ***REMOVED***
          element.attr('aria-checked', 'mixed');
        ***REMOVED***
        element.toggleClass('md-indeterminate', isIndeterminate);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
MdCheckboxDirective.$inject = ["inputDirective", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil", "$timeout"];

ng.material.components.checkbox = angular.module("material.components.checkbox");
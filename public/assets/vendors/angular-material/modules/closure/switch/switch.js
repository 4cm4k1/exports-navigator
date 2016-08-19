/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.switch');
goog.require('ngmaterial.components.checkbox');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.switch
 */

angular.module('material.components.switch', [
  'material.core',
  'material.components.checkbox'
])
  .directive('mdSwitch', MdSwitch);

/**
 * @ngdoc directive
 * @module material.components.switch
 * @name mdSwitch
 * @restrict E
 *
 * The switch directive is used very much like the normal [angular checkbox](https://docs.angularjs.org/api/ng/input/input%5Bcheckbox%5D).
 *
 * As per the [material design spec](http://www.google.com/design/spec/style/color.html#color-ui-color-application)
 * the switch is in the accent color by default. The primary color palette may be used with
 * the `md-primary` class.
 *
 * @param ***REMOVED***string***REMOVED*** ng-model Assignable angular expression to data-bind to.
 * @param ***REMOVED***string=***REMOVED*** name Property name of the form under which the control is published.
 * @param ***REMOVED***expression=***REMOVED*** ng-true-value The value to which the expression should be set when selected.
 * @param ***REMOVED***expression=***REMOVED*** ng-false-value The value to which the expression should be set when not selected.
 * @param ***REMOVED***string=***REMOVED*** ng-change Angular expression to be executed when input changes due to user interaction with the input element.
 * @param ***REMOVED***expression=***REMOVED*** ng-disabled En/Disable based on the expression.
 * @param ***REMOVED***boolean=***REMOVED*** md-no-ink Use of attribute indicates use of ripple ink effects.
 * @param ***REMOVED***string=***REMOVED*** aria-label Publish the button label used by screen-readers for accessibility. Defaults to the switch's text.
 *
 * @usage
 * <hljs lang="html">
 * <md-switch ng-model="isActive" aria-label="Finished?">
 *   Finished ?
 * </md-switch>
 *
 * <md-switch md-no-ink ng-model="hasInk" aria-label="No Ink Effects">
 *   No Ink Effects
 * </md-switch>
 *
 * <md-switch ng-disabled="true" ng-model="isDisabled" aria-label="Disabled">
 *   Disabled
 * </md-switch>
 *
 * </hljs>
 */
function MdSwitch(mdCheckboxDirective, $mdUtil, $mdConstant, $parse, $$rAF, $mdGesture, $timeout) ***REMOVED***
  var checkboxDirective = mdCheckboxDirective[0];

  return ***REMOVED***
    restrict: 'E',
    priority: 210, // Run before ngAria
    transclude: true,
    template:
      '<div class="md-container">' +
        '<div class="md-bar"></div>' +
        '<div class="md-thumb-container">' +
          '<div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div>' +
        '</div>'+
      '</div>' +
      '<div ng-transclude class="md-label"></div>',
    require: '?ngModel',
    compile: mdSwitchCompile
  ***REMOVED***;

  function mdSwitchCompile(element, attr) ***REMOVED***
    var checkboxLink = checkboxDirective.compile(element, attr).post;
    // No transition on initial load.
    element.addClass('md-dragging');

    return function (scope, element, attr, ngModel) ***REMOVED***
      ngModel = ngModel || $mdUtil.fakeNgModel();

      var disabledGetter = null;
      if (attr.disabled != null) ***REMOVED***
        disabledGetter = function() ***REMOVED*** return true; ***REMOVED***;
      ***REMOVED*** else if (attr.ngDisabled) ***REMOVED***
        disabledGetter = $parse(attr.ngDisabled);
      ***REMOVED***

      var thumbContainer = angular.element(element[0].querySelector('.md-thumb-container'));
      var switchContainer = angular.element(element[0].querySelector('.md-container'));

      // no transition on initial load
      $$rAF(function() ***REMOVED***
        element.removeClass('md-dragging');
      ***REMOVED***);

      checkboxLink(scope, element, attr, ngModel);

      if (disabledGetter) ***REMOVED***
        scope.$watch(disabledGetter, function(isDisabled) ***REMOVED***
          element.attr('tabindex', isDisabled ? -1 : 0);
        ***REMOVED***);
      ***REMOVED***

      // These events are triggered by setup drag
      $mdGesture.register(switchContainer, 'drag');
      switchContainer
        .on('$md.dragstart', onDragStart)
        .on('$md.drag', onDrag)
        .on('$md.dragend', onDragEnd);

      var drag;
      function onDragStart(ev) ***REMOVED***
        // Don't go if the switch is disabled.
        if (disabledGetter && disabledGetter(scope)) return;
        ev.stopPropagation();

        element.addClass('md-dragging');
        drag = ***REMOVED***width: thumbContainer.prop('offsetWidth')***REMOVED***;
      ***REMOVED***

      function onDrag(ev) ***REMOVED***
        if (!drag) return;
        ev.stopPropagation();
        ev.srcEvent && ev.srcEvent.preventDefault();

        var percent = ev.pointer.distanceX / drag.width;

        //if checked, start from right. else, start from left
        var translate = ngModel.$viewValue ?  1 + percent : percent;
        // Make sure the switch stays inside its bounds, 0-1%
        translate = Math.max(0, Math.min(1, translate));

        thumbContainer.css($mdConstant.CSS.TRANSFORM, 'translate3d(' + (100*translate) + '%,0,0)');
        drag.translate = translate;
      ***REMOVED***

      function onDragEnd(ev) ***REMOVED***
        if (!drag) return;
        ev.stopPropagation();

        element.removeClass('md-dragging');
        thumbContainer.css($mdConstant.CSS.TRANSFORM, '');

        // We changed if there is no distance (this is a click a click),
        // or if the drag distance is >50% of the total.
        var isChanged = ngModel.$viewValue ? drag.translate < 0.5 : drag.translate > 0.5;
        if (isChanged) ***REMOVED***
          applyModelValue(!ngModel.$viewValue);
        ***REMOVED***
        drag = null;

        // Wait for incoming mouse click
        scope.skipToggle = true;
        $timeout(function() ***REMOVED***
          scope.skipToggle = false;
        ***REMOVED***, 1);
      ***REMOVED***

      function applyModelValue(newValue) ***REMOVED***
        scope.$apply(function() ***REMOVED***
          ngModel.$setViewValue(newValue);
          ngModel.$render();
        ***REMOVED***);
      ***REMOVED***

    ***REMOVED***;
  ***REMOVED***


***REMOVED***
MdSwitch.$inject = ["mdCheckboxDirective", "$mdUtil", "$mdConstant", "$parse", "$$rAF", "$mdGesture", "$timeout"];

ngmaterial.components.switch = angular.module("material.components.switch");
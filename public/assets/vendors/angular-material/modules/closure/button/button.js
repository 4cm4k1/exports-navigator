/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.button');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.button
 * @description
 *
 * Button
 */
angular
    .module('material.components.button', [ 'material.core' ])
    .directive('mdButton', MdButtonDirective)
    .directive('a', MdAnchorDirective);


/**
 * @private
 * @restrict E
 *
 * @description
 * `a` is an anchor directive used to inherit theme colors for md-primary, md-accent, etc.
 *
 * @usage
 *
 * <hljs lang="html">
 *  <md-content md-theme="myTheme">
 *    <a href="#chapter1" class="md-accent"></a>
 *  </md-content>
 * </hljs>
 */
function MdAnchorDirective($mdTheming) ***REMOVED***
  return ***REMOVED***
    restrict : 'E',
    link : function postLink(scope, element) ***REMOVED***
      // Make sure to inherit theme so stand-alone anchors
      // support theme colors for md-primary, md-accent, etc.
      $mdTheming(element);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MdAnchorDirective.$inject = ["$mdTheming"];


/**
 * @ngdoc directive
 * @name mdButton
 * @module material.components.button
 *
 * @restrict E
 *
 * @description
 * `<md-button>` is a button directive with optional ink ripples (default enabled).
 *
 * If you supply a `href` or `ng-href` attribute, it will become an `<a>` element. Otherwise, it will
 * become a `<button>` element. As per the [Material Design specifications](http://www.google.com/design/spec/style/color.html#color-ui-color-application)
 * the FAB button background is filled with the accent color [by default]. The primary color palette may be used with
 * the `md-primary` class.
 *
 * @param ***REMOVED***boolean=***REMOVED*** md-no-ink If present, disable ripple ink effects.
 * @param ***REMOVED***boolean=***REMOVED*** md-no-focus-style If present, disable focus style on button
 * @param ***REMOVED***expression=***REMOVED*** ng-disabled En/Disable based on the expression
 * @param ***REMOVED***string=***REMOVED*** md-ripple-size Overrides the default ripple size logic. Options: `full`, `partial`, `auto`
 * @param ***REMOVED***string=***REMOVED*** aria-label Adds alternative text to button for accessibility, useful for icon buttons.
 * If no default text is found, a warning will be logged.
 *
 * @usage
 *
 * Regular buttons:
 *
 * <hljs lang="html">
 *  <md-button> Flat Button </md-button>
 *  <md-button href="http://google.com"> Flat link </md-button>
 *  <md-button class="md-raised"> Raised Button </md-button>
 *  <md-button ng-disabled="true"> Disabled Button </md-button>
 *  <md-button>
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *    Register Now
 *  </md-button>
 * </hljs>
 *
 * FAB buttons:
 *
 * <hljs lang="html">
 *  <md-button class="md-fab" aria-label="FAB">
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *  </md-button>
 *  <!-- mini-FAB -->
 *  <md-button class="md-fab md-mini" aria-label="Mini FAB">
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *  </md-button>
 *  <!-- Button with SVG Icon -->
 *  <md-button class="md-icon-button" aria-label="Custom Icon Button">
 *    <md-icon md-svg-icon="path/to/your.svg"></md-icon>
 *  </md-button>
 * </hljs>
 */
function MdButtonDirective($mdButtonInkRipple, $mdTheming, $mdAria, $timeout) ***REMOVED***

  return ***REMOVED***
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: getTemplate,
    link: postLink
  ***REMOVED***;

  function isAnchor(attr) ***REMOVED***
    return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref) || angular.isDefined(attr.ngLink) || angular.isDefined(attr.uiSref);
  ***REMOVED***

  function getTemplate(element, attr) ***REMOVED***
    if (isAnchor(attr)) ***REMOVED***
      return '<a class="md-button" ng-transclude></a>';
    ***REMOVED*** else ***REMOVED***
      //If buttons don't have type="button", they will submit forms automatically.
      var btnType = (typeof attr.type === 'undefined') ? 'button' : attr.type;
      return '<button class="md-button" type="' + btnType + '" ng-transclude></button>';
    ***REMOVED***
  ***REMOVED***

  function postLink(scope, element, attr) ***REMOVED***
    $mdTheming(element);
    $mdButtonInkRipple.attach(scope, element);

    // Use async expect to support possible bindings in the button label
    $mdAria.expectWithText(element, 'aria-label');

    // For anchor elements, we have to set tabindex manually when the
    // element is disabled
    if (isAnchor(attr) && angular.isDefined(attr.ngDisabled) ) ***REMOVED***
      scope.$watch(attr.ngDisabled, function(isDisabled) ***REMOVED***
        element.attr('tabindex', isDisabled ? -1 : 0);
      ***REMOVED***);
    ***REMOVED***

    // disabling click event when disabled is true
    element.on('click', function(e)***REMOVED***
      if (attr.disabled === true) ***REMOVED***
        e.preventDefault();
        e.stopImmediatePropagation();
      ***REMOVED***
    ***REMOVED***);

    if (!angular.isDefined(attr.mdNoFocusStyle)) ***REMOVED***
      // restrict focus styles to the keyboard
      scope.mouseActive = false;
      element.on('mousedown', function() ***REMOVED***
        scope.mouseActive = true;
        $timeout(function()***REMOVED***
          scope.mouseActive = false;
        ***REMOVED***, 100);
      ***REMOVED***)
      .on('focus', function() ***REMOVED***
        if (scope.mouseActive === false) ***REMOVED***
          element.addClass('md-focused');
        ***REMOVED***
      ***REMOVED***)
      .on('blur', function(ev) ***REMOVED***
        element.removeClass('md-focused');
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

***REMOVED***
MdButtonDirective.$inject = ["$mdButtonInkRipple", "$mdTheming", "$mdAria", "$timeout"];

ng.material.components.button = angular.module("material.components.button");
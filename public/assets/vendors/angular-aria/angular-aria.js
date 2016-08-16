/**
 * @license AngularJS v1.5.8
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) ***REMOVED***'use strict';

/**
 * @ngdoc module
 * @name ngAria
 * @description
 *
 * The `ngAria` module provides support for common
 * [<abbr title="Accessible Rich Internet Applications">ARIA</abbr>](http://www.w3.org/TR/wai-aria/)
 * attributes that convey state or semantic information about the application for users
 * of assistive technologies, such as screen readers.
 *
 * <div doc-module-components="ngAria"></div>
 *
 * ## Usage
 *
 * For ngAria to do its magic, simply include the module `ngAria` as a dependency. The following
 * directives are supported:
 * `ngModel`, `ngChecked`, `ngReadonly`, `ngRequired`, `ngValue`, `ngDisabled`, `ngShow`, `ngHide`, `ngClick`,
 * `ngDblClick`, and `ngMessages`.
 *
 * Below is a more detailed breakdown of the attributes handled by ngAria:
 *
 * | Directive                                   | Supported Attributes                                                                   |
 * |---------------------------------------------|----------------------------------------------------------------------------------------|
 * | ***REMOVED***@link ng.directive:ngModel ngModel***REMOVED***        | aria-checked, aria-valuemin, aria-valuemax, aria-valuenow, aria-invalid, aria-required, input roles |
 * | ***REMOVED***@link ng.directive:ngDisabled ngDisabled***REMOVED***  | aria-disabled                                                                          |
 * | ***REMOVED***@link ng.directive:ngRequired ngRequired***REMOVED***  | aria-required
 * | ***REMOVED***@link ng.directive:ngChecked ngChecked***REMOVED***    | aria-checked
 * | ***REMOVED***@link ng.directive:ngReadonly ngReadonly***REMOVED***  | aria-readonly                                                                          |
 * | ***REMOVED***@link ng.directive:ngValue ngValue***REMOVED***        | aria-checked                                                                           |
 * | ***REMOVED***@link ng.directive:ngShow ngShow***REMOVED***          | aria-hidden                                                                            |
 * | ***REMOVED***@link ng.directive:ngHide ngHide***REMOVED***          | aria-hidden                                                                            |
 * | ***REMOVED***@link ng.directive:ngDblclick ngDblclick***REMOVED***  | tabindex                                                                               |
 * | ***REMOVED***@link module:ngMessages ngMessages***REMOVED***        | aria-live                                                                              |
 * | ***REMOVED***@link ng.directive:ngClick ngClick***REMOVED***        | tabindex, keypress event, button role                                                  |
 *
 * Find out more information about each directive by reading the
 * ***REMOVED***@link guide/accessibility ngAria Developer Guide***REMOVED***.
 *
 * ## Example
 * Using ngDisabled with ngAria:
 * ```html
 * <md-checkbox ng-disabled="disabled">
 * ```
 * Becomes:
 * ```html
 * <md-checkbox ng-disabled="disabled" aria-disabled="true">
 * ```
 *
 * ## Disabling Attributes
 * It's possible to disable individual attributes added by ngAria with the
 * ***REMOVED***@link ngAria.$ariaProvider#config config***REMOVED*** method. For more details, see the
 * ***REMOVED***@link guide/accessibility Developer Guide***REMOVED***.
 */
 /* global -ngAriaModule */
var ngAriaModule = angular.module('ngAria', ['ng']).
                        provider('$aria', $AriaProvider);

/**
* Internal Utilities
*/
var nodeBlackList = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'DETAILS', 'SUMMARY'];

var isNodeOneOf = function(elem, nodeTypeArray) ***REMOVED***
  if (nodeTypeArray.indexOf(elem[0].nodeName) !== -1) ***REMOVED***
    return true;
  ***REMOVED***
***REMOVED***;
/**
 * @ngdoc provider
 * @name $ariaProvider
 *
 * @description
 *
 * Used for configuring the ARIA attributes injected and managed by ngAria.
 *
 * ```js
 * angular.module('myApp', ['ngAria'], function config($ariaProvider) ***REMOVED***
 *   $ariaProvider.config(***REMOVED***
 *     ariaValue: true,
 *     tabindex: false
 *   ***REMOVED***);
 * ***REMOVED***);
 *```
 *
 * ## Dependencies
 * Requires the ***REMOVED***@link ngAria***REMOVED*** module to be installed.
 *
 */
function $AriaProvider() ***REMOVED***
  var config = ***REMOVED***
    ariaHidden: true,
    ariaChecked: true,
    ariaReadonly: true,
    ariaDisabled: true,
    ariaRequired: true,
    ariaInvalid: true,
    ariaValue: true,
    tabindex: true,
    bindKeypress: true,
    bindRoleForClick: true
  ***REMOVED***;

  /**
   * @ngdoc method
   * @name $ariaProvider#config
   *
   * @param ***REMOVED***object***REMOVED*** config object to enable/disable specific ARIA attributes
   *
   *  - **ariaHidden** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-hidden tags
   *  - **ariaChecked** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-checked tags
   *  - **ariaReadonly** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-readonly tags
   *  - **ariaDisabled** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-disabled tags
   *  - **ariaRequired** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-required tags
   *  - **ariaInvalid** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-invalid tags
   *  - **ariaValue** – `***REMOVED***boolean***REMOVED***` – Enables/disables aria-valuemin, aria-valuemax and aria-valuenow tags
   *  - **tabindex** – `***REMOVED***boolean***REMOVED***` – Enables/disables tabindex tags
   *  - **bindKeypress** – `***REMOVED***boolean***REMOVED***` – Enables/disables keypress event binding on `div` and
   *    `li` elements with ng-click
   *  - **bindRoleForClick** – `***REMOVED***boolean***REMOVED***` – Adds role=button to non-interactive elements like `div`
   *    using ng-click, making them more accessible to users of assistive technologies
   *
   * @description
   * Enables/disables various ARIA attributes
   */
  this.config = function(newConfig) ***REMOVED***
    config = angular.extend(config, newConfig);
  ***REMOVED***;

  function watchExpr(attrName, ariaAttr, nodeBlackList, negate) ***REMOVED***
    return function(scope, elem, attr) ***REMOVED***
      var ariaCamelName = attr.$normalize(ariaAttr);
      if (config[ariaCamelName] && !isNodeOneOf(elem, nodeBlackList) && !attr[ariaCamelName]) ***REMOVED***
        scope.$watch(attr[attrName], function(boolVal) ***REMOVED***
          // ensure boolean value
          boolVal = negate ? !boolVal : !!boolVal;
          elem.attr(ariaAttr, boolVal);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  /**
   * @ngdoc service
   * @name $aria
   *
   * @description
   * @priority 200
   *
   * The $aria service contains helper methods for applying common
   * [ARIA](http://www.w3.org/TR/wai-aria/) attributes to HTML directives.
   *
   * ngAria injects common accessibility attributes that tell assistive technologies when HTML
   * elements are enabled, selected, hidden, and more. To see how this is performed with ngAria,
   * let's review a code snippet from ngAria itself:
   *
   *```js
   * ngAriaModule.directive('ngDisabled', ['$aria', function($aria) ***REMOVED***
   *   return $aria.$$watchExpr('ngDisabled', 'aria-disabled', nodeBlackList, false);
   * ***REMOVED***])
   *```
   * Shown above, the ngAria module creates a directive with the same signature as the
   * traditional `ng-disabled` directive. But this ngAria version is dedicated to
   * solely managing accessibility attributes on custom elements. The internal `$aria` service is
   * used to watch the boolean attribute `ngDisabled`. If it has not been explicitly set by the
   * developer, `aria-disabled` is injected as an attribute with its value synchronized to the
   * value in `ngDisabled`.
   *
   * Because ngAria hooks into the `ng-disabled` directive, developers do not have to do
   * anything to enable this feature. The `aria-disabled` attribute is automatically managed
   * simply as a silent side-effect of using `ng-disabled` with the ngAria module.
   *
   * The full list of directives that interface with ngAria:
   * * **ngModel**
   * * **ngChecked**
   * * **ngReadonly**
   * * **ngRequired**
   * * **ngDisabled**
   * * **ngValue**
   * * **ngShow**
   * * **ngHide**
   * * **ngClick**
   * * **ngDblclick**
   * * **ngMessages**
   *
   * Read the ***REMOVED***@link guide/accessibility ngAria Developer Guide***REMOVED*** for a thorough explanation of each
   * directive.
   *
   *
   * ## Dependencies
   * Requires the ***REMOVED***@link ngAria***REMOVED*** module to be installed.
   */
  this.$get = function() ***REMOVED***
    return ***REMOVED***
      config: function(key) ***REMOVED***
        return config[key];
      ***REMOVED***,
      $$watchExpr: watchExpr
    ***REMOVED***;
  ***REMOVED***;
***REMOVED***


ngAriaModule.directive('ngShow', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngShow', 'aria-hidden', [], true);
***REMOVED***])
.directive('ngHide', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngHide', 'aria-hidden', [], false);
***REMOVED***])
.directive('ngValue', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngValue', 'aria-checked', nodeBlackList, false);
***REMOVED***])
.directive('ngChecked', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngChecked', 'aria-checked', nodeBlackList, false);
***REMOVED***])
.directive('ngReadonly', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngReadonly', 'aria-readonly', nodeBlackList, false);
***REMOVED***])
.directive('ngRequired', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngRequired', 'aria-required', nodeBlackList, false);
***REMOVED***])
.directive('ngModel', ['$aria', function($aria) ***REMOVED***

  function shouldAttachAttr(attr, normalizedAttr, elem, allowBlacklistEls) ***REMOVED***
    return $aria.config(normalizedAttr) && !elem.attr(attr) && (allowBlacklistEls || !isNodeOneOf(elem, nodeBlackList));
  ***REMOVED***

  function shouldAttachRole(role, elem) ***REMOVED***
    // if element does not have role attribute
    // AND element type is equal to role (if custom element has a type equaling shape) <-- remove?
    // AND element is not INPUT
    return !elem.attr('role') && (elem.attr('type') === role) && (elem[0].nodeName !== 'INPUT');
  ***REMOVED***

  function getShape(attr, elem) ***REMOVED***
    var type = attr.type,
        role = attr.role;

    return ((type || role) === 'checkbox' || role === 'menuitemcheckbox') ? 'checkbox' :
           ((type || role) === 'radio'    || role === 'menuitemradio') ? 'radio' :
           (type === 'range'              || role === 'progressbar' || role === 'slider') ? 'range' : '';
  ***REMOVED***

  return ***REMOVED***
    restrict: 'A',
    require: 'ngModel',
    priority: 200, //Make sure watches are fired after any other directives that affect the ngModel value
    compile: function(elem, attr) ***REMOVED***
      var shape = getShape(attr, elem);

      return ***REMOVED***
        pre: function(scope, elem, attr, ngModel) ***REMOVED***
          if (shape === 'checkbox') ***REMOVED***
            //Use the input[checkbox] $isEmpty implementation for elements with checkbox roles
            ngModel.$isEmpty = function(value) ***REMOVED***
              return value === false;
            ***REMOVED***;
          ***REMOVED***
        ***REMOVED***,
        post: function(scope, elem, attr, ngModel) ***REMOVED***
          var needsTabIndex = shouldAttachAttr('tabindex', 'tabindex', elem, false);

          function ngAriaWatchModelValue() ***REMOVED***
            return ngModel.$modelValue;
          ***REMOVED***

          function getRadioReaction(newVal) ***REMOVED***
            var boolVal = (attr.value == ngModel.$viewValue);
            elem.attr('aria-checked', boolVal);
          ***REMOVED***

          function getCheckboxReaction() ***REMOVED***
            elem.attr('aria-checked', !ngModel.$isEmpty(ngModel.$viewValue));
          ***REMOVED***

          switch (shape) ***REMOVED***
            case 'radio':
            case 'checkbox':
              if (shouldAttachRole(shape, elem)) ***REMOVED***
                elem.attr('role', shape);
              ***REMOVED***
              if (shouldAttachAttr('aria-checked', 'ariaChecked', elem, false)) ***REMOVED***
                scope.$watch(ngAriaWatchModelValue, shape === 'radio' ?
                    getRadioReaction : getCheckboxReaction);
              ***REMOVED***
              if (needsTabIndex) ***REMOVED***
                elem.attr('tabindex', 0);
              ***REMOVED***
              break;
            case 'range':
              if (shouldAttachRole(shape, elem)) ***REMOVED***
                elem.attr('role', 'slider');
              ***REMOVED***
              if ($aria.config('ariaValue')) ***REMOVED***
                var needsAriaValuemin = !elem.attr('aria-valuemin') &&
                    (attr.hasOwnProperty('min') || attr.hasOwnProperty('ngMin'));
                var needsAriaValuemax = !elem.attr('aria-valuemax') &&
                    (attr.hasOwnProperty('max') || attr.hasOwnProperty('ngMax'));
                var needsAriaValuenow = !elem.attr('aria-valuenow');

                if (needsAriaValuemin) ***REMOVED***
                  attr.$observe('min', function ngAriaValueMinReaction(newVal) ***REMOVED***
                    elem.attr('aria-valuemin', newVal);
                  ***REMOVED***);
                ***REMOVED***
                if (needsAriaValuemax) ***REMOVED***
                  attr.$observe('max', function ngAriaValueMinReaction(newVal) ***REMOVED***
                    elem.attr('aria-valuemax', newVal);
                  ***REMOVED***);
                ***REMOVED***
                if (needsAriaValuenow) ***REMOVED***
                  scope.$watch(ngAriaWatchModelValue, function ngAriaValueNowReaction(newVal) ***REMOVED***
                    elem.attr('aria-valuenow', newVal);
                  ***REMOVED***);
                ***REMOVED***
              ***REMOVED***
              if (needsTabIndex) ***REMOVED***
                elem.attr('tabindex', 0);
              ***REMOVED***
              break;
          ***REMOVED***

          if (!attr.hasOwnProperty('ngRequired') && ngModel.$validators.required
            && shouldAttachAttr('aria-required', 'ariaRequired', elem, false)) ***REMOVED***
            // ngModel.$error.required is undefined on custom controls
            attr.$observe('required', function() ***REMOVED***
              elem.attr('aria-required', !!attr['required']);
            ***REMOVED***);
          ***REMOVED***

          if (shouldAttachAttr('aria-invalid', 'ariaInvalid', elem, true)) ***REMOVED***
            scope.$watch(function ngAriaInvalidWatch() ***REMOVED***
              return ngModel.$invalid;
            ***REMOVED***, function ngAriaInvalidReaction(newVal) ***REMOVED***
              elem.attr('aria-invalid', !!newVal);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***])
.directive('ngDisabled', ['$aria', function($aria) ***REMOVED***
  return $aria.$$watchExpr('ngDisabled', 'aria-disabled', nodeBlackList, false);
***REMOVED***])
.directive('ngMessages', function() ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    require: '?ngMessages',
    link: function(scope, elem, attr, ngMessages) ***REMOVED***
      if (!elem.attr('aria-live')) ***REMOVED***
        elem.attr('aria-live', 'assertive');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***)
.directive('ngClick',['$aria', '$parse', function($aria, $parse) ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    compile: function(elem, attr) ***REMOVED***
      var fn = $parse(attr.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);
      return function(scope, elem, attr) ***REMOVED***

        if (!isNodeOneOf(elem, nodeBlackList)) ***REMOVED***

          if ($aria.config('bindRoleForClick') && !elem.attr('role')) ***REMOVED***
            elem.attr('role', 'button');
          ***REMOVED***

          if ($aria.config('tabindex') && !elem.attr('tabindex')) ***REMOVED***
            elem.attr('tabindex', 0);
          ***REMOVED***

          if ($aria.config('bindKeypress') && !attr.ngKeypress) ***REMOVED***
            elem.on('keypress', function(event) ***REMOVED***
              var keyCode = event.which || event.keyCode;
              if (keyCode === 32 || keyCode === 13) ***REMOVED***
                scope.$apply(callback);
              ***REMOVED***

              function callback() ***REMOVED***
                fn(scope, ***REMOVED*** $event: event ***REMOVED***);
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***])
.directive('ngDblclick', ['$aria', function($aria) ***REMOVED***
  return function(scope, elem, attr) ***REMOVED***
    if ($aria.config('tabindex') && !elem.attr('tabindex') && !isNodeOneOf(elem, nodeBlackList)) ***REMOVED***
      elem.attr('tabindex', 0);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***]);


***REMOVED***)(window, window.angular);

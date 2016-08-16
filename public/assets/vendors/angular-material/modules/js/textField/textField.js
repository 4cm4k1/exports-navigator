/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v0.9.0-rc1-master-3c0ce9b
 */
(function() ***REMOVED***
'use strict';

/**
 * @ngdoc module
 * @name material.components.textField
 * @description
 * Form
 */
angular.module('material.components.textField', [
  'material.core'
])
  .directive('mdInputGroup', mdInputGroupDirective)
  .directive('mdInput', mdInputDirective)
  .directive('mdTextFloat', mdTextFloatDirective);


function mdTextFloatDirective($mdTheming, $mdUtil, $parse, $log) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    replace: true,
    scope : ***REMOVED***
      fid : '@?mdFid',
      label : '@?',
      value : '=ngModel'
    ***REMOVED***,
    compile : function(element, attr) ***REMOVED***

      $log.warn('<md-text-float> is deprecated. Please use `<md-input-container>` and `<input>`.' + 
                'More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer');

      if ( angular.isUndefined(attr.mdFid) ) ***REMOVED***
        attr.mdFid = $mdUtil.nextUid();
      ***REMOVED***

      return ***REMOVED***
        pre : function(scope, element, attrs) ***REMOVED***
          var disabledParsed = $parse(attrs.ngDisabled);
          scope.isDisabled = function() ***REMOVED***
            return disabledParsed(scope.$parent);
          ***REMOVED***;

          scope.inputType = attrs.type || "text";
        ***REMOVED***,
        post: $mdTheming
      ***REMOVED***;
    ***REMOVED***,
    template:
    '<md-input-group tabindex="-1">' +
    ' <label for="***REMOVED******REMOVED***fid***REMOVED******REMOVED***" >***REMOVED******REMOVED***label***REMOVED******REMOVED***</label>' +
    ' <md-input id="***REMOVED******REMOVED***fid***REMOVED******REMOVED***" ng-disabled="isDisabled()" ng-model="value" type="***REMOVED******REMOVED***inputType***REMOVED******REMOVED***"></md-input>' +
    '</md-input-group>'
  ***REMOVED***;
***REMOVED***
mdTextFloatDirective.$inject = ["$mdTheming", "$mdUtil", "$parse", "$log"];

function mdInputGroupDirective($log) ***REMOVED***
  return ***REMOVED***
    restrict: 'CE',
    controller: ['$element', function($element) ***REMOVED***

      $log.warn('<md-input-group> is deprecated. Please use `<md-input-container>` and `<input>`.' + 
                'More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer');
      this.setFocused = function(isFocused) ***REMOVED***
        $element.toggleClass('md-input-focused', !!isFocused);
      ***REMOVED***;
      this.setHasValue = function(hasValue) ***REMOVED***
        $element.toggleClass('md-input-has-value', hasValue );
      ***REMOVED***;
    ***REMOVED***]
  ***REMOVED***;

***REMOVED***
mdInputGroupDirective.$inject = ["$log"];

function mdInputDirective($mdUtil, $log) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    replace: true,
    template: '<input >',
    require: ['^?mdInputGroup', '?ngModel'],
    link: function(scope, element, attr, ctrls) ***REMOVED***
      if ( !ctrls[0] ) return;

      $log.warn('<md-input> is deprecated. Please use `<md-input-container>` and `<input>`.' + 
                'More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer');

      var inputGroupCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];

      scope.$watch(scope.isDisabled, function(isDisabled) ***REMOVED***
        element.attr('aria-disabled', !!isDisabled);
        element.attr('tabindex', !!isDisabled);
      ***REMOVED***);
      element.attr('type', attr.type || element.parent().attr('type') || "text");

      // When the input value changes, check if it "has" a value, and
      // set the appropriate class on the input group
      if (ngModelCtrl) ***REMOVED***
        //Add a $formatter so we don't use up the render function
        ngModelCtrl.$formatters.push(function(value) ***REMOVED***
          inputGroupCtrl.setHasValue( isNotEmpty(value) );
          return value;
        ***REMOVED***);
      ***REMOVED***

      element
        .on('input', function() ***REMOVED***
          inputGroupCtrl.setHasValue( isNotEmpty() );
        ***REMOVED***)
        .on('focus', function(e) ***REMOVED***
          // When the input focuses, add the focused class to the group
          inputGroupCtrl.setFocused(true);
        ***REMOVED***)
        .on('blur', function(e) ***REMOVED***
          // When the input blurs, remove the focused class from the group
          inputGroupCtrl.setFocused(false);
          inputGroupCtrl.setHasValue( isNotEmpty() );
        ***REMOVED***);

      scope.$on('$destroy', function() ***REMOVED***
        inputGroupCtrl.setFocused(false);
        inputGroupCtrl.setHasValue(false);
      ***REMOVED***);


      function isNotEmpty(value) ***REMOVED***
        value = angular.isUndefined(value) ? element.val() : value;
        return (angular.isDefined(value) && (value!==null) &&
               (value.toString().trim() !== ""));
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
mdInputDirective.$inject = ["$mdUtil", "$log"];

***REMOVED***)();

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
 * @name material.components.select
 */

/***************************************************

 ### TODO - POST RC1 ###
 - [ ] Abstract placement logic in $mdSelect service to $mdMenu service

 ***************************************************/

var SELECT_EDGE_MARGIN = 8;
var selectNextId = 0;
var CHECKBOX_SELECTION_INDICATOR =
  angular.element('<div class="md-container"><div class="md-icon"></div></div>');

angular.module('material.components.select', [
    'material.core',
    'material.components.backdrop'
  ])
  .directive('mdSelect', SelectDirective)
  .directive('mdSelectMenu', SelectMenuDirective)
  .directive('mdOption', OptionDirective)
  .directive('mdOptgroup', OptgroupDirective)
  .directive('mdSelectHeader', SelectHeaderDirective)
  .provider('$mdSelect', SelectProvider);

/**
 * @ngdoc directive
 * @name mdSelect
 * @restrict E
 * @module material.components.select
 *
 * @description Displays a select box, bound to an ng-model.
 *
 * When the select is required and uses a floating label, then the label will automatically contain
 * an asterisk (`*`). This behavior can be disabled by using the `md-no-asterisk` attribute.
 *
 * By default, the select will display with an underline to match other form elements. This can be
 * disabled by applying the `md-no-underline` CSS class.
 *
 * ### Option Params
 *
 * When applied, `md-option-empty` will mark the option as "empty" allowing the option to  clear the
 * select and put it back in it's default state. You may supply this attribute on any option you
 * wish, however, it is automatically applied to an option whose `value` or `ng-value` are not
 * defined.
 *
 * **Automatically Applied**
 *
 *  - `<md-option>`
 *  - `<md-option value>`
 *  - `<md-option value="">`
 *  - `<md-option ng-value>`
 *  - `<md-option ng-value="">`
 *
 * **NOT Automatically Applied**
 *
 *  - `<md-option ng-value="1">`
 *  - `<md-option ng-value="''">`
 *  - `<md-option ng-value="undefined">`
 *  - `<md-option value="undefined">` (this evaluates to the string `"undefined"`)
 *  - <code ng-non-bindable>&lt;md-option ng-value="***REMOVED******REMOVED***someValueThatMightBeUndefined***REMOVED******REMOVED***"&gt;</code>
 *
 * **Note:** A value of `undefined` ***is considered a valid value*** (and does not auto-apply this
 * attribute) since you may wish this to be your "Not Available" or "None" option.
 *
 * @param ***REMOVED***expression***REMOVED*** ng-model The model!
 * @param ***REMOVED***boolean=***REMOVED*** multiple Whether it's multiple.
 * @param ***REMOVED***expression=***REMOVED*** md-on-close Expression to be evaluated when the select is closed.
 * @param ***REMOVED***expression=***REMOVED*** md-on-open Expression to be evaluated when opening the select.
 * Will hide the select options and show a spinner until the evaluated promise resolves.
 * @param ***REMOVED***expression=***REMOVED*** md-selected-text Expression to be evaluated that will return a string
 * to be displayed as a placeholder in the select input box when it is closed.
 * @param ***REMOVED***string=***REMOVED*** placeholder Placeholder hint text.
 * @param md-no-asterisk ***REMOVED***boolean=***REMOVED*** When set to true, an asterisk will not be appended to the floating label.
 * @param ***REMOVED***string=***REMOVED*** aria-label Optional label for accessibility. Only necessary if no placeholder or
 * explicit label is present.
 * @param ***REMOVED***string=***REMOVED*** md-container-class Class list to get applied to the `.md-select-menu-container`
 * element (for custom styling).
 *
 * @usage
 * With a placeholder (label and aria-label are added dynamically)
 * <hljs lang="html">
 *   <md-input-container>
 *     <md-select
 *       ng-model="someModel"
 *       placeholder="Select a state">
 *       <md-option ng-value="opt" ng-repeat="opt in neighborhoods2">***REMOVED******REMOVED*** opt ***REMOVED******REMOVED***</md-option>
 *     </md-select>
 *   </md-input-container>
 * </hljs>
 *
 * With an explicit label
 * <hljs lang="html">
 *   <md-input-container>
 *     <label>State</label>
 *     <md-select
 *       ng-model="someModel">
 *       <md-option ng-value="opt" ng-repeat="opt in neighborhoods2">***REMOVED******REMOVED*** opt ***REMOVED******REMOVED***</md-option>
 *     </md-select>
 *   </md-input-container>
 * </hljs>
 *
 * With a select-header
 *
 * When a developer needs to put more than just a text label in the
 * md-select-menu, they should use the md-select-header.
 * The user can put custom HTML inside of the header and style it to their liking.
 * One common use case of this would be a sticky search bar.
 *
 * When using the md-select-header the labels that would previously be added to the
 * OptGroupDirective are ignored.
 *
 * <hljs lang="html">
 *   <md-input-container>
 *     <md-select ng-model="someModel">
 *       <md-select-header>
 *         <span> Neighborhoods - </span>
 *       </md-select-header>
 *       <md-option ng-value="opt" ng-repeat="opt in neighborhoods2">***REMOVED******REMOVED*** opt ***REMOVED******REMOVED***</md-option>
 *     </md-select>
 *   </md-input-container>
 * </hljs>
 *
 * ## Selects and object equality
 * When using a `md-select` to pick from a list of objects, it is important to realize how javascript handles
 * equality. Consider the following example:
 * <hljs lang="js">
 * angular.controller('MyCtrl', function($scope) ***REMOVED***
 *   $scope.users = [
 *     ***REMOVED*** id: 1, name: 'Bob' ***REMOVED***,
 *     ***REMOVED*** id: 2, name: 'Alice' ***REMOVED***,
 *     ***REMOVED*** id: 3, name: 'Steve' ***REMOVED***
 *   ];
 *   $scope.selectedUser = ***REMOVED*** id: 1, name: 'Bob' ***REMOVED***;
 * ***REMOVED***);
 * </hljs>
 * <hljs lang="html">
 * <div ng-controller="MyCtrl">
 *   <md-select ng-model="selectedUser">
 *     <md-option ng-value="user" ng-repeat="user in users">***REMOVED******REMOVED*** user.name ***REMOVED******REMOVED***</md-option>
 *   </md-select>
 * </div>
 * </hljs>
 *
 * At first one might expect that the select should be populated with "Bob" as the selected user. However,
 * this is not true. To determine whether something is selected,
 * `ngModelController` is looking at whether `$scope.selectedUser == (any user in $scope.users);`;
 *
 * Javascript's `==` operator does not check for deep equality (ie. that all properties
 * on the object are the same), but instead whether the objects are *the same object in memory*.
 * In this case, we have two instances of identical objects, but they exist in memory as unique
 * entities. Because of this, the select will have no value populated for a selected user.
 *
 * To get around this, `ngModelController` provides a `track by` option that allows us to specify a different
 * expression which will be used for the equality operator. As such, we can update our `html` to
 * make use of this by specifying the `ng-model-options="***REMOVED***trackBy: '$value.id'***REMOVED***"` on the `md-select`
 * element. This converts our equality expression to be
 * `$scope.selectedUser.id == (any id in $scope.users.map(function(u) ***REMOVED*** return u.id; ***REMOVED***));`
 * which results in Bob being selected as desired.
 *
 * Working HTML:
 * <hljs lang="html">
 * <div ng-controller="MyCtrl">
 *   <md-select ng-model="selectedUser" ng-model-options="***REMOVED***trackBy: '$value.id'***REMOVED***">
 *     <md-option ng-value="user" ng-repeat="user in users">***REMOVED******REMOVED*** user.name ***REMOVED******REMOVED***</md-option>
 *   </md-select>
 * </div>
 * </hljs>
 */
function SelectDirective($mdSelect, $mdUtil, $mdConstant, $mdTheming, $mdAria, $compile, $parse) ***REMOVED***
  var keyCodes = $mdConstant.KEY_CODE;
  var NAVIGATION_KEYS = [keyCodes.SPACE, keyCodes.ENTER, keyCodes.UP_ARROW, keyCodes.DOWN_ARROW];

  return ***REMOVED***
    restrict: 'E',
    require: ['^?mdInputContainer', 'mdSelect', 'ngModel', '?^form'],
    compile: compile,
    controller: function() ***REMOVED***
    ***REMOVED*** // empty placeholder controller to be initialized in link
  ***REMOVED***;

  function compile(element, attr) ***REMOVED***
    // add the select value that will hold our placeholder or selected option value
    var valueEl = angular.element('<md-select-value><span></span></md-select-value>');
    valueEl.append('<span class="md-select-icon" aria-hidden="true"></span>');
    valueEl.addClass('md-select-value');
    if (!valueEl[0].hasAttribute('id')) ***REMOVED***
      valueEl.attr('id', 'select_value_label_' + $mdUtil.nextUid());
    ***REMOVED***

    // There's got to be an md-content inside. If there's not one, let's add it.
    if (!element.find('md-content').length) ***REMOVED***
      element.append(angular.element('<md-content>').append(element.contents()));
    ***REMOVED***


    // Add progress spinner for md-options-loading
    if (attr.mdOnOpen) ***REMOVED***

      // Show progress indicator while loading async
      // Use ng-hide for `display:none` so the indicator does not interfere with the options list
      element
        .find('md-content')
        .prepend(angular.element(
          '<div>' +
          ' <md-progress-circular md-mode="indeterminate" ng-if="$$loadingAsyncDone === false" md-diameter="25px"></md-progress-circular>' +
          '</div>'
        ));

      // Hide list [of item options] while loading async
      element
        .find('md-option')
        .attr('ng-show', '$$loadingAsyncDone');
    ***REMOVED***

    if (attr.name) ***REMOVED***
      var autofillClone = angular.element('<select class="md-visually-hidden">');
      autofillClone.attr(***REMOVED***
        'name': attr.name,
        'aria-hidden': 'true',
        'tabindex': '-1'
      ***REMOVED***);
      var opts = element.find('md-option');
      angular.forEach(opts, function(el) ***REMOVED***
        var newEl = angular.element('<option>' + el.innerHTML + '</option>');
        if (el.hasAttribute('ng-value')) newEl.attr('ng-value', el.getAttribute('ng-value'));
        else if (el.hasAttribute('value')) newEl.attr('value', el.getAttribute('value'));
        autofillClone.append(newEl);
      ***REMOVED***);

      // Adds an extra option that will hold the selected value for the
      // cases where the select is a part of a non-angular form. This can be done with a ng-model,
      // however if the `md-option` is being `ng-repeat`-ed, Angular seems to insert a similar
      // `option` node, but with a value of `? string: <value> ?` which would then get submitted.
      // This also goes around having to prepend a dot to the name attribute.
      autofillClone.append(
        '<option ng-value="' + attr.ngModel + '" selected></option>'
      );

      element.parent().append(autofillClone);
    ***REMOVED***

    var isMultiple = $mdUtil.parseAttributeBoolean(attr.multiple);

    // Use everything that's left inside element.contents() as the contents of the menu
    var multipleContent = isMultiple ? 'multiple' : '';
    var selectTemplate = '' +
      '<div class="md-select-menu-container" aria-hidden="true">' +
      '<md-select-menu ***REMOVED***0***REMOVED***>***REMOVED***1***REMOVED***</md-select-menu>' +
      '</div>';

    selectTemplate = $mdUtil.supplant(selectTemplate, [multipleContent, element.html()]);
    element.empty().append(valueEl);
    element.append(selectTemplate);

    if(!attr.tabindex)***REMOVED***
      attr.$set('tabindex', 0);
    ***REMOVED***

    return function postLink(scope, element, attr, ctrls) ***REMOVED***
      var untouched = true;
      var isDisabled, ariaLabelBase;

      var containerCtrl = ctrls[0];
      var mdSelectCtrl = ctrls[1];
      var ngModelCtrl = ctrls[2];
      var formCtrl = ctrls[3];
      // grab a reference to the select menu value label
      var valueEl = element.find('md-select-value');
      var isReadonly = angular.isDefined(attr.readonly);
      var disableAsterisk = $mdUtil.parseAttributeBoolean(attr.mdNoAsterisk);

      if (containerCtrl) ***REMOVED***
        var isErrorGetter = containerCtrl.isErrorGetter || function() ***REMOVED***
          return ngModelCtrl.$invalid && (ngModelCtrl.$touched || (formCtrl && formCtrl.$submitted));
        ***REMOVED***;

        if (containerCtrl.input) ***REMOVED***
          // We ignore inputs that are in the md-select-header (one
          // case where this might be useful would be adding as searchbox)
          if (element.find('md-select-header').find('input')[0] !== containerCtrl.input[0]) ***REMOVED***
            throw new Error("<md-input-container> can only have *one* child <input>, <textarea> or <select> element!");
          ***REMOVED***
        ***REMOVED***

        containerCtrl.input = element;
        if (!containerCtrl.label) ***REMOVED***
          $mdAria.expect(element, 'aria-label', element.attr('placeholder'));
        ***REMOVED***

        scope.$watch(isErrorGetter, containerCtrl.setInvalid);
      ***REMOVED***

      var selectContainer, selectScope, selectMenuCtrl;

      findSelectContainer();
      $mdTheming(element);

      if (formCtrl && angular.isDefined(attr.multiple)) ***REMOVED***
        $mdUtil.nextTick(function() ***REMOVED***
          var hasModelValue = ngModelCtrl.$modelValue || ngModelCtrl.$viewValue;
          if (hasModelValue) ***REMOVED***
            formCtrl.$setPristine();
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***

      var originalRender = ngModelCtrl.$render;
      ngModelCtrl.$render = function() ***REMOVED***
        originalRender();
        syncLabelText();
        syncAriaLabel();
        inputCheckValue();
      ***REMOVED***;


      attr.$observe('placeholder', ngModelCtrl.$render);

      if (containerCtrl && containerCtrl.label) ***REMOVED***
        attr.$observe('required', function (value) ***REMOVED***
          // Toggle the md-required class on the input containers label, because the input container is automatically
          // applying the asterisk indicator on the label.
          containerCtrl.label.toggleClass('md-required', value && !disableAsterisk);
        ***REMOVED***);
      ***REMOVED***

      mdSelectCtrl.setLabelText = function(text) ***REMOVED***
        mdSelectCtrl.setIsPlaceholder(!text);

        if (attr.mdSelectedText) ***REMOVED***
          text = $parse(attr.mdSelectedText)(scope);
        ***REMOVED*** else ***REMOVED***
          // Use placeholder attribute, otherwise fallback to the md-input-container label
          var tmpPlaceholder = attr.placeholder ||
              (containerCtrl && containerCtrl.label ? containerCtrl.label.text() : '');
          text = text || tmpPlaceholder || '';
        ***REMOVED***

        var target = valueEl.children().eq(0);
        target.html(text);
      ***REMOVED***;

      mdSelectCtrl.setIsPlaceholder = function(isPlaceholder) ***REMOVED***
        if (isPlaceholder) ***REMOVED***
          valueEl.addClass('md-select-placeholder');
          if (containerCtrl && containerCtrl.label) ***REMOVED***
            containerCtrl.label.addClass('md-placeholder');
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          valueEl.removeClass('md-select-placeholder');
          if (containerCtrl && containerCtrl.label) ***REMOVED***
            containerCtrl.label.removeClass('md-placeholder');
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;

      if (!isReadonly) ***REMOVED***
        element
          .on('focus', function(ev) ***REMOVED***
            // Always focus the container (if we have one) so floating labels and other styles are
            // applied properly
            containerCtrl && containerCtrl.setFocused(true);
          ***REMOVED***);

        // Attach before ngModel's blur listener to stop propagation of blur event
        // to prevent from setting $touched.
        element.on('blur', function(event) ***REMOVED***
          if (untouched) ***REMOVED***
            untouched = false;
            if (selectScope._mdSelectIsOpen) ***REMOVED***
              event.stopImmediatePropagation();
            ***REMOVED***
          ***REMOVED***

          if (selectScope._mdSelectIsOpen) return;
          containerCtrl && containerCtrl.setFocused(false);
          inputCheckValue();
        ***REMOVED***);
      ***REMOVED***

      mdSelectCtrl.triggerClose = function() ***REMOVED***
        $parse(attr.mdOnClose)(scope);
      ***REMOVED***;

      scope.$$postDigest(function() ***REMOVED***
        initAriaLabel();
        syncLabelText();
        syncAriaLabel();
      ***REMOVED***);

      function initAriaLabel() ***REMOVED***
        var labelText = element.attr('aria-label') || element.attr('placeholder');
        if (!labelText && containerCtrl && containerCtrl.label) ***REMOVED***
          labelText = containerCtrl.label.text();
        ***REMOVED***
        ariaLabelBase = labelText;
        $mdAria.expect(element, 'aria-label', labelText);
      ***REMOVED***

      scope.$watch(function() ***REMOVED***
          return selectMenuCtrl.selectedLabels();
      ***REMOVED***, syncLabelText);

      function syncLabelText() ***REMOVED***
        if (selectContainer) ***REMOVED***
          selectMenuCtrl = selectMenuCtrl || selectContainer.find('md-select-menu').controller('mdSelectMenu');
          mdSelectCtrl.setLabelText(selectMenuCtrl.selectedLabels());
        ***REMOVED***
      ***REMOVED***

      function syncAriaLabel() ***REMOVED***
        if (!ariaLabelBase) return;
        var ariaLabels = selectMenuCtrl.selectedLabels(***REMOVED***mode: 'aria'***REMOVED***);
        element.attr('aria-label', ariaLabels.length ? ariaLabelBase + ': ' + ariaLabels : ariaLabelBase);
      ***REMOVED***

      var deregisterWatcher;
      attr.$observe('ngMultiple', function(val) ***REMOVED***
        if (deregisterWatcher) deregisterWatcher();
        var parser = $parse(val);
        deregisterWatcher = scope.$watch(function() ***REMOVED***
          return parser(scope);
        ***REMOVED***, function(multiple, prevVal) ***REMOVED***
          if (multiple === undefined && prevVal === undefined) return; // assume compiler did a good job
          if (multiple) ***REMOVED***
            element.attr('multiple', 'multiple');
          ***REMOVED*** else ***REMOVED***
            element.removeAttr('multiple');
          ***REMOVED***
          element.attr('aria-multiselectable', multiple ? 'true' : 'false');
          if (selectContainer) ***REMOVED***
            selectMenuCtrl.setMultiple(multiple);
            originalRender = ngModelCtrl.$render;
            ngModelCtrl.$render = function() ***REMOVED***
              originalRender();
              syncLabelText();
              syncAriaLabel();
              inputCheckValue();
            ***REMOVED***;
            ngModelCtrl.$render();
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***);

      attr.$observe('disabled', function(disabled) ***REMOVED***
        if (angular.isString(disabled)) ***REMOVED***
          disabled = true;
        ***REMOVED***
        // Prevent click event being registered twice
        if (isDisabled !== undefined && isDisabled === disabled) ***REMOVED***
          return;
        ***REMOVED***
        isDisabled = disabled;
        if (disabled) ***REMOVED***
          element
            .attr(***REMOVED***'aria-disabled': 'true'***REMOVED***)
            .removeAttr('tabindex')
            .off('click', openSelect)
            .off('keydown', handleKeypress);
        ***REMOVED*** else ***REMOVED***
          element
            .attr(***REMOVED***'tabindex': attr.tabindex, 'aria-disabled': 'false'***REMOVED***)
            .on('click', openSelect)
            .on('keydown', handleKeypress);
        ***REMOVED***
      ***REMOVED***);

      if (!attr.hasOwnProperty('disabled') && !attr.hasOwnProperty('ngDisabled')) ***REMOVED***
        element.attr(***REMOVED***'aria-disabled': 'false'***REMOVED***);
        element.on('click', openSelect);
        element.on('keydown', handleKeypress);
      ***REMOVED***

      var ariaAttrs = ***REMOVED***
        role: 'listbox',
        'aria-expanded': 'false',
        'aria-multiselectable': isMultiple && !attr.ngMultiple ? 'true' : 'false'
      ***REMOVED***;

      if (!element[0].hasAttribute('id')) ***REMOVED***
        ariaAttrs.id = 'select_' + $mdUtil.nextUid();
      ***REMOVED***

      var containerId = 'select_container_' + $mdUtil.nextUid();
      selectContainer.attr('id', containerId);
      ariaAttrs['aria-owns'] = containerId;
      element.attr(ariaAttrs);

      scope.$on('$destroy', function() ***REMOVED***
        $mdSelect
          .destroy()
          .finally(function() ***REMOVED***
            if (containerCtrl) ***REMOVED***
              containerCtrl.setFocused(false);
              containerCtrl.setHasValue(false);
              containerCtrl.input = null;
            ***REMOVED***
            ngModelCtrl.$setTouched();
          ***REMOVED***);
      ***REMOVED***);



      function inputCheckValue() ***REMOVED***
        // The select counts as having a value if one or more options are selected,
        // or if the input's validity state says it has bad input (eg string in a number input)
        containerCtrl && containerCtrl.setHasValue(selectMenuCtrl.selectedLabels().length > 0 || (element[0].validity || ***REMOVED******REMOVED***).badInput);
      ***REMOVED***

      function findSelectContainer() ***REMOVED***
        selectContainer = angular.element(
          element[0].querySelector('.md-select-menu-container')
        );
        selectScope = scope;
        if (attr.mdContainerClass) ***REMOVED***
          var value = selectContainer[0].getAttribute('class') + ' ' + attr.mdContainerClass;
          selectContainer[0].setAttribute('class', value);
        ***REMOVED***
        selectMenuCtrl = selectContainer.find('md-select-menu').controller('mdSelectMenu');
        selectMenuCtrl.init(ngModelCtrl, attr.ngModel);
        element.on('$destroy', function() ***REMOVED***
          selectContainer.remove();
        ***REMOVED***);
      ***REMOVED***

      function handleKeypress(e) ***REMOVED***
        if ($mdConstant.isNavigationKey(e)) ***REMOVED***
          // prevent page scrolling on interaction
          e.preventDefault();
          openSelect(e);
        ***REMOVED*** else ***REMOVED***
          if ($mdConstant.isInputKey(e) || $mdConstant.isNumPadKey(e)) ***REMOVED***
            e.preventDefault();

            var node = selectMenuCtrl.optNodeForKeyboardSearch(e);
            if (!node || node.hasAttribute('disabled')) return;
            var optionCtrl = angular.element(node).controller('mdOption');
            if (!selectMenuCtrl.isMultiple) ***REMOVED***
              selectMenuCtrl.deselect(Object.keys(selectMenuCtrl.selected)[0]);
            ***REMOVED***
            selectMenuCtrl.select(optionCtrl.hashKey, optionCtrl.value);
            selectMenuCtrl.refreshViewValue();
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      function openSelect() ***REMOVED***
        selectScope._mdSelectIsOpen = true;
        element.attr('aria-expanded', 'true');

        $mdSelect.show(***REMOVED***
          scope: selectScope,
          preserveScope: true,
          skipCompile: true,
          element: selectContainer,
          target: element[0],
          selectCtrl: mdSelectCtrl,
          preserveElement: true,
          hasBackdrop: true,
          loadingAsync: attr.mdOnOpen ? scope.$eval(attr.mdOnOpen) || true : false
        ***REMOVED***).finally(function() ***REMOVED***
          selectScope._mdSelectIsOpen = false;
          element.focus();
          element.attr('aria-expanded', 'false');
          ngModelCtrl.$setTouched();
        ***REMOVED***);
      ***REMOVED***

    ***REMOVED***;
  ***REMOVED***
***REMOVED***
SelectDirective.$inject = ["$mdSelect", "$mdUtil", "$mdConstant", "$mdTheming", "$mdAria", "$compile", "$parse"];

function SelectMenuDirective($parse, $mdUtil, $mdConstant, $mdTheming) ***REMOVED***
  // We want the scope to be set to 'false' so an isolated scope is not created
  // which would interfere with the md-select-header's access to the
  // parent scope.
  SelectMenuController.$inject = ["$scope", "$attrs", "$element"];
  return ***REMOVED***
    restrict: 'E',
    require: ['mdSelectMenu'],
    scope: false,
    controller: SelectMenuController,
    link: ***REMOVED***pre: preLink***REMOVED***
  ***REMOVED***;

  // We use preLink instead of postLink to ensure that the select is initialized before
  // its child options run postLink.
  function preLink(scope, element, attr, ctrls) ***REMOVED***
    var selectCtrl = ctrls[0];

    element.addClass('_md');     // private md component indicator for styling

    $mdTheming(element);
    element.on('click', clickListener);
    element.on('keypress', keyListener);

    function keyListener(e) ***REMOVED***
      if (e.keyCode == 13 || e.keyCode == 32) ***REMOVED***
        clickListener(e);
      ***REMOVED***
    ***REMOVED***

    function clickListener(ev) ***REMOVED***
      var option = $mdUtil.getClosest(ev.target, 'md-option');
      var optionCtrl = option && angular.element(option).data('$mdOptionController');
      if (!option || !optionCtrl) return;
      if (option.hasAttribute('disabled')) ***REMOVED***
        ev.stopImmediatePropagation();
        return false;
      ***REMOVED***

      var optionHashKey = selectCtrl.hashGetter(optionCtrl.value);
      var isSelected = angular.isDefined(selectCtrl.selected[optionHashKey]);

      scope.$apply(function() ***REMOVED***
        if (selectCtrl.isMultiple) ***REMOVED***
          if (isSelected) ***REMOVED***
            selectCtrl.deselect(optionHashKey);
          ***REMOVED*** else ***REMOVED***
            selectCtrl.select(optionHashKey, optionCtrl.value);
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          if (!isSelected) ***REMOVED***
            selectCtrl.deselect(Object.keys(selectCtrl.selected)[0]);
            selectCtrl.select(optionHashKey, optionCtrl.value);
          ***REMOVED***
        ***REMOVED***
        selectCtrl.refreshViewValue();
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

  function SelectMenuController($scope, $attrs, $element) ***REMOVED***
    var self = this;
    self.isMultiple = angular.isDefined($attrs.multiple);
    // selected is an object with keys matching all of the selected options' hashed values
    self.selected = ***REMOVED******REMOVED***;
    // options is an object with keys matching every option's hash value,
    // and values matching every option's controller.
    self.options = ***REMOVED******REMOVED***;

    $scope.$watchCollection(function() ***REMOVED***
      return self.options;
    ***REMOVED***, function() ***REMOVED***
      self.ngModel.$render();
    ***REMOVED***);

    var deregisterCollectionWatch;
    var defaultIsEmpty;
    self.setMultiple = function(isMultiple) ***REMOVED***
      var ngModel = self.ngModel;
      defaultIsEmpty = defaultIsEmpty || ngModel.$isEmpty;

      self.isMultiple = isMultiple;
      if (deregisterCollectionWatch) deregisterCollectionWatch();

      if (self.isMultiple) ***REMOVED***
        ngModel.$validators['md-multiple'] = validateArray;
        ngModel.$render = renderMultiple;

        // watchCollection on the model because by default ngModel only watches the model's
        // reference. This allowed the developer to also push and pop from their array.
        $scope.$watchCollection(self.modelBinding, function(value) ***REMOVED***
          if (validateArray(value)) renderMultiple(value);
          self.ngModel.$setPristine();
        ***REMOVED***);

        ngModel.$isEmpty = function(value) ***REMOVED***
          return !value || value.length === 0;
        ***REMOVED***;
      ***REMOVED*** else ***REMOVED***
        delete ngModel.$validators['md-multiple'];
        ngModel.$render = renderSingular;
      ***REMOVED***

      function validateArray(modelValue, viewValue) ***REMOVED***
        // If a value is truthy but not an array, reject it.
        // If value is undefined/falsy, accept that it's an empty array.
        return angular.isArray(modelValue || viewValue || []);
      ***REMOVED***
    ***REMOVED***;

    var searchStr = '';
    var clearSearchTimeout, optNodes, optText;
    var CLEAR_SEARCH_AFTER = 300;

    self.optNodeForKeyboardSearch = function(e) ***REMOVED***
      clearSearchTimeout && clearTimeout(clearSearchTimeout);
      clearSearchTimeout = setTimeout(function() ***REMOVED***
        clearSearchTimeout = undefined;
        searchStr = '';
        optText = undefined;
        optNodes = undefined;
      ***REMOVED***, CLEAR_SEARCH_AFTER);

      // Support 1-9 on numpad
      var keyCode = e.keyCode - ($mdConstant.isNumPadKey(e) ? 48 : 0);

      searchStr += String.fromCharCode(keyCode);
      var search = new RegExp('^' + searchStr, 'i');
      if (!optNodes) ***REMOVED***
        optNodes = $element.find('md-option');
        optText = new Array(optNodes.length);
        angular.forEach(optNodes, function(el, i) ***REMOVED***
          optText[i] = el.textContent.trim();
        ***REMOVED***);
      ***REMOVED***
      for (var i = 0; i < optText.length; ++i) ***REMOVED***
        if (search.test(optText[i])) ***REMOVED***
          return optNodes[i];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    self.init = function(ngModel, binding) ***REMOVED***
      self.ngModel = ngModel;
      self.modelBinding = binding;

      // Setup a more robust version of isEmpty to ensure value is a valid option
      self.ngModel.$isEmpty = function($viewValue) ***REMOVED***
        // We have to transform the viewValue into the hashKey, because otherwise the
        // OptionCtrl may not exist. Developers may have specified a trackBy function.
        return !self.options[self.hashGetter($viewValue)];
      ***REMOVED***;

      // Allow users to provide `ng-model="foo" ng-model-options="***REMOVED***trackBy: 'foo.id'***REMOVED***"` so
      // that we can properly compare objects set on the model to the available options
      if (ngModel.$options && ngModel.$options.trackBy) ***REMOVED***
        var trackByLocals = ***REMOVED******REMOVED***;
        var trackByParsed = $parse(ngModel.$options.trackBy);
        self.hashGetter = function(value, valueScope) ***REMOVED***
          trackByLocals.$value = value;
          return trackByParsed(valueScope || $scope, trackByLocals);
        ***REMOVED***;
        // If the user doesn't provide a trackBy, we automatically generate an id for every
        // value passed in
      ***REMOVED*** else ***REMOVED***
        self.hashGetter = function getHashValue(value) ***REMOVED***
          if (angular.isObject(value)) ***REMOVED***
            return 'object_' + (value.$$mdSelectId || (value.$$mdSelectId = ++selectNextId));
          ***REMOVED***
          return value;
        ***REMOVED***;
      ***REMOVED***
      self.setMultiple(self.isMultiple);
    ***REMOVED***;

    self.selectedLabels = function(opts) ***REMOVED***
      opts = opts || ***REMOVED******REMOVED***;
      var mode = opts.mode || 'html';
      var selectedOptionEls = $mdUtil.nodesToArray($element[0].querySelectorAll('md-option[selected]'));
      if (selectedOptionEls.length) ***REMOVED***
        var mapFn;

        if (mode == 'html') ***REMOVED***
          // Map the given element to its innerHTML string. If the element has a child ripple
          // container remove it from the HTML string, before returning the string.
          mapFn = function(el) ***REMOVED***
            // If we do not have a `value` or `ng-value`, assume it is an empty option which clears the select
            if (el.hasAttribute('md-option-empty')) ***REMOVED***
              return '';
            ***REMOVED***

            var html = el.innerHTML;

            // Remove the ripple container from the selected option, copying it would cause a CSP violation.
            var rippleContainer = el.querySelector('.md-ripple-container');
            if (rippleContainer) ***REMOVED***
              html = html.replace(rippleContainer.outerHTML, '');
            ***REMOVED***

            // Remove the checkbox container, because it will cause the label to wrap inside of the placeholder.
            // It should be not displayed inside of the label element.
            var checkboxContainer = el.querySelector('.md-container');
            if (checkboxContainer) ***REMOVED***
              html = html.replace(checkboxContainer.outerHTML, '');
            ***REMOVED***

            return html;
          ***REMOVED***;
        ***REMOVED*** else if (mode == 'aria') ***REMOVED***
          mapFn = function(el) ***REMOVED*** return el.hasAttribute('aria-label') ? el.getAttribute('aria-label') : el.textContent; ***REMOVED***;
        ***REMOVED***
        return selectedOptionEls.map(mapFn).join(', ');
      ***REMOVED*** else ***REMOVED***
        return '';
      ***REMOVED***
    ***REMOVED***;

    self.select = function(hashKey, hashedValue) ***REMOVED***
      var option = self.options[hashKey];
      option && option.setSelected(true);
      self.selected[hashKey] = hashedValue;
    ***REMOVED***;
    self.deselect = function(hashKey) ***REMOVED***
      var option = self.options[hashKey];
      option && option.setSelected(false);
      delete self.selected[hashKey];
    ***REMOVED***;

    self.addOption = function(hashKey, optionCtrl) ***REMOVED***
      if (angular.isDefined(self.options[hashKey])) ***REMOVED***
        throw new Error('Duplicate md-option values are not allowed in a select. ' +
          'Duplicate value "' + optionCtrl.value + '" found.');
      ***REMOVED***

      self.options[hashKey] = optionCtrl;

      // If this option's value was already in our ngModel, go ahead and select it.
      if (angular.isDefined(self.selected[hashKey])) ***REMOVED***
        self.select(hashKey, optionCtrl.value);

        // When the current $modelValue of the ngModel Controller is using the same hash as
        // the current option, which will be added, then we can be sure, that the validation
        // of the option has occurred before the option was added properly.
        // This means, that we have to manually trigger a new validation of the current option.
        if (angular.isDefined(self.ngModel.$modelValue) && self.hashGetter(self.ngModel.$modelValue) === hashKey) ***REMOVED***
          self.ngModel.$validate();
        ***REMOVED***

        self.refreshViewValue();
      ***REMOVED***
    ***REMOVED***;
    self.removeOption = function(hashKey) ***REMOVED***
      delete self.options[hashKey];
      // Don't deselect an option when it's removed - the user's ngModel should be allowed
      // to have values that do not match a currently available option.
    ***REMOVED***;

    self.refreshViewValue = function() ***REMOVED***
      var values = [];
      var option;
      for (var hashKey in self.selected) ***REMOVED***
        // If this hashKey has an associated option, push that option's value to the model.
        if ((option = self.options[hashKey])) ***REMOVED***
          values.push(option.value);
        ***REMOVED*** else ***REMOVED***
          // Otherwise, the given hashKey has no associated option, and we got it
          // from an ngModel value at an earlier time. Push the unhashed value of
          // this hashKey to the model.
          // This allows the developer to put a value in the model that doesn't yet have
          // an associated option.
          values.push(self.selected[hashKey]);
        ***REMOVED***
      ***REMOVED***
      var usingTrackBy = self.ngModel.$options && self.ngModel.$options.trackBy;

      var newVal = self.isMultiple ? values : values[0];
      var prevVal = self.ngModel.$modelValue;

      if (usingTrackBy ? !angular.equals(prevVal, newVal) : prevVal != newVal) ***REMOVED***
        self.ngModel.$setViewValue(newVal);
        self.ngModel.$render();
      ***REMOVED***
    ***REMOVED***;

    function renderMultiple() ***REMOVED***
      var newSelectedValues = self.ngModel.$modelValue || self.ngModel.$viewValue || [];
      if (!angular.isArray(newSelectedValues)) return;

      var oldSelected = Object.keys(self.selected);

      var newSelectedHashes = newSelectedValues.map(self.hashGetter);
      var deselected = oldSelected.filter(function(hash) ***REMOVED***
        return newSelectedHashes.indexOf(hash) === -1;
      ***REMOVED***);

      deselected.forEach(self.deselect);
      newSelectedHashes.forEach(function(hashKey, i) ***REMOVED***
        self.select(hashKey, newSelectedValues[i]);
      ***REMOVED***);
    ***REMOVED***

    function renderSingular() ***REMOVED***
      var value = self.ngModel.$viewValue || self.ngModel.$modelValue;
      Object.keys(self.selected).forEach(self.deselect);
      self.select(self.hashGetter(value), value);
    ***REMOVED***
  ***REMOVED***

***REMOVED***
SelectMenuDirective.$inject = ["$parse", "$mdUtil", "$mdConstant", "$mdTheming"];

function OptionDirective($mdButtonInkRipple, $mdUtil) ***REMOVED***

  OptionController.$inject = ["$element"];
  return ***REMOVED***
    restrict: 'E',
    require: ['mdOption', '^^mdSelectMenu'],
    controller: OptionController,
    compile: compile
  ***REMOVED***;

  function compile(element, attr) ***REMOVED***
    // Manual transclusion to avoid the extra inner <span> that ng-transclude generates
    element.append(angular.element('<div class="md-text">').append(element.contents()));

    element.attr('tabindex', attr.tabindex || '0');

    if (!hasDefinedValue(attr)) ***REMOVED***
      element.attr('md-option-empty', '');
    ***REMOVED***

    return postLink;
  ***REMOVED***

  function hasDefinedValue(attr) ***REMOVED***
    var value = attr.value;
    var ngValue = attr.ngValue;

    return value || ngValue;
  ***REMOVED***

  function postLink(scope, element, attr, ctrls) ***REMOVED***
    var optionCtrl = ctrls[0];
    var selectCtrl = ctrls[1];

    if (selectCtrl.isMultiple) ***REMOVED***
      element.addClass('md-checkbox-enabled');
      element.prepend(CHECKBOX_SELECTION_INDICATOR.clone());
    ***REMOVED***

    if (angular.isDefined(attr.ngValue)) ***REMOVED***
      scope.$watch(attr.ngValue, setOptionValue);
    ***REMOVED*** else if (angular.isDefined(attr.value)) ***REMOVED***
      setOptionValue(attr.value);
    ***REMOVED*** else ***REMOVED***
      scope.$watch(function() ***REMOVED***
        return element.text().trim();
      ***REMOVED***, setOptionValue);
    ***REMOVED***

    attr.$observe('disabled', function(disabled) ***REMOVED***
      if (disabled) ***REMOVED***
        element.attr('tabindex', '-1');
      ***REMOVED*** else ***REMOVED***
        element.attr('tabindex', '0');
      ***REMOVED***
    ***REMOVED***);

    scope.$$postDigest(function() ***REMOVED***
      attr.$observe('selected', function(selected) ***REMOVED***
        if (!angular.isDefined(selected)) return;
        if (typeof selected == 'string') selected = true;
        if (selected) ***REMOVED***
          if (!selectCtrl.isMultiple) ***REMOVED***
            selectCtrl.deselect(Object.keys(selectCtrl.selected)[0]);
          ***REMOVED***
          selectCtrl.select(optionCtrl.hashKey, optionCtrl.value);
        ***REMOVED*** else ***REMOVED***
          selectCtrl.deselect(optionCtrl.hashKey);
        ***REMOVED***
        selectCtrl.refreshViewValue();
      ***REMOVED***);
    ***REMOVED***);

    $mdButtonInkRipple.attach(scope, element);
    configureAria();

    function setOptionValue(newValue, oldValue, prevAttempt) ***REMOVED***
      if (!selectCtrl.hashGetter) ***REMOVED***
        if (!prevAttempt) ***REMOVED***
          scope.$$postDigest(function() ***REMOVED***
            setOptionValue(newValue, oldValue, true);
          ***REMOVED***);
        ***REMOVED***
        return;
      ***REMOVED***
      var oldHashKey = selectCtrl.hashGetter(oldValue, scope);
      var newHashKey = selectCtrl.hashGetter(newValue, scope);

      optionCtrl.hashKey = newHashKey;
      optionCtrl.value = newValue;

      selectCtrl.removeOption(oldHashKey, optionCtrl);
      selectCtrl.addOption(newHashKey, optionCtrl);
    ***REMOVED***

    scope.$on('$destroy', function() ***REMOVED***
      selectCtrl.removeOption(optionCtrl.hashKey, optionCtrl);
    ***REMOVED***);

    function configureAria() ***REMOVED***
      var ariaAttrs = ***REMOVED***
        'role': 'option',
        'aria-selected': 'false'
      ***REMOVED***;

      if (!element[0].hasAttribute('id')) ***REMOVED***
        ariaAttrs.id = 'select_option_' + $mdUtil.nextUid();
      ***REMOVED***
      element.attr(ariaAttrs);
    ***REMOVED***
  ***REMOVED***

  function OptionController($element) ***REMOVED***
    this.selected = false;
    this.setSelected = function(isSelected) ***REMOVED***
      if (isSelected && !this.selected) ***REMOVED***
        $element.attr(***REMOVED***
          'selected': 'selected',
          'aria-selected': 'true'
        ***REMOVED***);
      ***REMOVED*** else if (!isSelected && this.selected) ***REMOVED***
        $element.removeAttr('selected');
        $element.attr('aria-selected', 'false');
      ***REMOVED***
      this.selected = isSelected;
    ***REMOVED***;
  ***REMOVED***

***REMOVED***
OptionDirective.$inject = ["$mdButtonInkRipple", "$mdUtil"];

function OptgroupDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    compile: compile
  ***REMOVED***;
  function compile(el, attrs) ***REMOVED***
    // If we have a select header element, we don't want to add the normal label
    // header.
    if (!hasSelectHeader()) ***REMOVED***
      setupLabelElement();
    ***REMOVED***

    function hasSelectHeader() ***REMOVED***
      return el.parent().find('md-select-header').length;
    ***REMOVED***

    function setupLabelElement() ***REMOVED***
      var labelElement = el.find('label');
      if (!labelElement.length) ***REMOVED***
        labelElement = angular.element('<label>');
        el.prepend(labelElement);
      ***REMOVED***
      labelElement.addClass('md-container-ignore');
      if (attrs.label) labelElement.text(attrs.label);
    ***REMOVED***
  ***REMOVED***
***REMOVED***

function SelectHeaderDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
  ***REMOVED***;
***REMOVED***

function SelectProvider($$interimElementProvider) ***REMOVED***
  selectDefaultOptions.$inject = ["$mdSelect", "$mdConstant", "$mdUtil", "$window", "$q", "$$rAF", "$animateCss", "$animate", "$document"];
  return $$interimElementProvider('$mdSelect')
    .setDefaults(***REMOVED***
      methods: ['target'],
      options: selectDefaultOptions
    ***REMOVED***);

  /* ngInject */
  function selectDefaultOptions($mdSelect, $mdConstant, $mdUtil, $window, $q, $$rAF, $animateCss, $animate, $document) ***REMOVED***
    var ERROR_TARGET_EXPECTED = "$mdSelect.show() expected a target element in options.target but got '***REMOVED***0***REMOVED***'!";
    var animator = $mdUtil.dom.animator;
    var keyCodes = $mdConstant.KEY_CODE;

    return ***REMOVED***
      parent: 'body',
      themable: true,
      onShow: onShow,
      onRemove: onRemove,
      hasBackdrop: true,
      disableParentScroll: true
    ***REMOVED***;

    /**
     * Interim-element onRemove logic....
     */
    function onRemove(scope, element, opts) ***REMOVED***
      opts = opts || ***REMOVED*** ***REMOVED***;
      opts.cleanupInteraction();
      opts.cleanupResizing();
      opts.hideBackdrop();

      // For navigation $destroy events, do a quick, non-animated removal,
      // but for normal closes (from clicks, etc) animate the removal

      return  (opts.$destroy === true) ? cleanElement() : animateRemoval().then( cleanElement );

      /**
       * For normal closes (eg clicks), animate the removal.
       * For forced closes (like $destroy events from navigation),
       * skip the animations
       */
      function animateRemoval() ***REMOVED***
        return $animateCss(element, ***REMOVED***addClass: 'md-leave'***REMOVED***).start();
      ***REMOVED***

      /**
       * Restore the element to a closed state
       */
      function cleanElement() ***REMOVED***

        element.removeClass('md-active');
        element.attr('aria-hidden', 'true');
        element[0].style.display = 'none';

        announceClosed(opts);

        if (!opts.$destroy && opts.restoreFocus) ***REMOVED***
          opts.target.focus();
        ***REMOVED***
      ***REMOVED***

    ***REMOVED***

    /**
     * Interim-element onShow logic....
     */
    function onShow(scope, element, opts) ***REMOVED***

      watchAsyncLoad();
      sanitizeAndConfigure(scope, opts);

      opts.hideBackdrop = showBackdrop(scope, element, opts);

      return showDropDown(scope, element, opts)
        .then(function(response) ***REMOVED***
          element.attr('aria-hidden', 'false');
          opts.alreadyOpen = true;
          opts.cleanupInteraction = activateInteraction();
          opts.cleanupResizing = activateResizing();

          return response;
        ***REMOVED***, opts.hideBackdrop);

      // ************************************
      // Closure Functions
      // ************************************

      /**
       *  Attach the select DOM element(s) and animate to the correct positions
       *  and scalings...
       */
      function showDropDown(scope, element, opts) ***REMOVED***
        opts.parent.append(element);

        return $q(function(resolve, reject) ***REMOVED***

          try ***REMOVED***

            $animateCss(element, ***REMOVED***removeClass: 'md-leave', duration: 0***REMOVED***)
              .start()
              .then(positionAndFocusMenu)
              .then(resolve);

          ***REMOVED*** catch (e) ***REMOVED***
            reject(e);
          ***REMOVED***

        ***REMOVED***);
      ***REMOVED***

      /**
       * Initialize container and dropDown menu positions/scale, then animate
       * to show... and autoFocus.
       */
      function positionAndFocusMenu() ***REMOVED***
        return $q(function(resolve) ***REMOVED***
          if (opts.isRemoved) return $q.reject(false);

          var info = calculateMenuPositions(scope, element, opts);

          info.container.element.css(animator.toCss(info.container.styles));
          info.dropDown.element.css(animator.toCss(info.dropDown.styles));

          $$rAF(function() ***REMOVED***
            element.addClass('md-active');
            info.dropDown.element.css(animator.toCss(***REMOVED***transform: ''***REMOVED***));

            autoFocus(opts.focusedNode);
            resolve();
          ***REMOVED***);

        ***REMOVED***);
      ***REMOVED***

      /**
       * Show modal backdrop element...
       */
      function showBackdrop(scope, element, options) ***REMOVED***

        // If we are not within a dialog...
        if (options.disableParentScroll && !$mdUtil.getClosest(options.target, 'MD-DIALOG')) ***REMOVED***
          // !! DO this before creating the backdrop; since disableScrollAround()
          //    configures the scroll offset; which is used by mdBackDrop postLink()
          options.restoreScroll = $mdUtil.disableScrollAround(options.element, options.parent);
        ***REMOVED*** else ***REMOVED***
          options.disableParentScroll = false;
        ***REMOVED***

        if (options.hasBackdrop) ***REMOVED***
          // Override duration to immediately show invisible backdrop
          options.backdrop = $mdUtil.createBackdrop(scope, "md-select-backdrop md-click-catcher");
          $animate.enter(options.backdrop, $document[0].body, null, ***REMOVED***duration: 0***REMOVED***);
        ***REMOVED***

        /**
         * Hide modal backdrop element...
         */
        return function hideBackdrop() ***REMOVED***
          if (options.backdrop) options.backdrop.remove();
          if (options.disableParentScroll) options.restoreScroll();

          delete options.restoreScroll;
        ***REMOVED***;
      ***REMOVED***

      /**
       *
       */
      function autoFocus(focusedNode) ***REMOVED***
        if (focusedNode && !focusedNode.hasAttribute('disabled')) ***REMOVED***
          focusedNode.focus();
        ***REMOVED***
      ***REMOVED***

      /**
       * Check for valid opts and set some sane defaults
       */
      function sanitizeAndConfigure(scope, options) ***REMOVED***
        var selectEl = element.find('md-select-menu');

        if (!options.target) ***REMOVED***
          throw new Error($mdUtil.supplant(ERROR_TARGET_EXPECTED, [options.target]));
        ***REMOVED***

        angular.extend(options, ***REMOVED***
          isRemoved: false,
          target: angular.element(options.target), //make sure it's not a naked dom node
          parent: angular.element(options.parent),
          selectEl: selectEl,
          contentEl: element.find('md-content'),
          optionNodes: selectEl[0].getElementsByTagName('md-option')
        ***REMOVED***);
      ***REMOVED***

      /**
       * Configure various resize listeners for screen changes
       */
      function activateResizing() ***REMOVED***
        var debouncedOnResize = (function(scope, target, options) ***REMOVED***

          return function() ***REMOVED***
            if (options.isRemoved) return;

            var updates = calculateMenuPositions(scope, target, options);
            var container = updates.container;
            var dropDown = updates.dropDown;

            container.element.css(animator.toCss(container.styles));
            dropDown.element.css(animator.toCss(dropDown.styles));
          ***REMOVED***;

        ***REMOVED***)(scope, element, opts);

        var window = angular.element($window);
        window.on('resize', debouncedOnResize);
        window.on('orientationchange', debouncedOnResize);

        // Publish deactivation closure...
        return function deactivateResizing() ***REMOVED***

          // Disable resizing handlers
          window.off('resize', debouncedOnResize);
          window.off('orientationchange', debouncedOnResize);
        ***REMOVED***;
      ***REMOVED***

      /**
       *  If asynchronously loading, watch and update internal
       *  '$$loadingAsyncDone' flag
       */
      function watchAsyncLoad() ***REMOVED***
        if (opts.loadingAsync && !opts.isRemoved) ***REMOVED***
          scope.$$loadingAsyncDone = false;

          $q.when(opts.loadingAsync)
            .then(function() ***REMOVED***
              scope.$$loadingAsyncDone = true;
              delete opts.loadingAsync;
            ***REMOVED***).then(function() ***REMOVED***
              $$rAF(positionAndFocusMenu);
            ***REMOVED***);
        ***REMOVED***
      ***REMOVED***

      /**
       *
       */
      function activateInteraction() ***REMOVED***
        if (opts.isRemoved) return;

        var dropDown = opts.selectEl;
        var selectCtrl = dropDown.controller('mdSelectMenu') || ***REMOVED******REMOVED***;

        element.addClass('md-clickable');

        // Close on backdrop click
        opts.backdrop && opts.backdrop.on('click', onBackdropClick);

        // Escape to close
        // Cycling of options, and closing on enter
        dropDown.on('keydown', onMenuKeyDown);
        dropDown.on('click', checkCloseMenu);

        return function cleanupInteraction() ***REMOVED***
          opts.backdrop && opts.backdrop.off('click', onBackdropClick);
          dropDown.off('keydown', onMenuKeyDown);
          dropDown.off('click', checkCloseMenu);

          element.removeClass('md-clickable');
          opts.isRemoved = true;
        ***REMOVED***;

        // ************************************
        // Closure Functions
        // ************************************

        function onBackdropClick(e) ***REMOVED***
          e.preventDefault();
          e.stopPropagation();
          opts.restoreFocus = false;
          $mdUtil.nextTick($mdSelect.hide, true);
        ***REMOVED***

        function onMenuKeyDown(ev) ***REMOVED***
          ev.preventDefault();
          ev.stopPropagation();

          switch (ev.keyCode) ***REMOVED***
            case keyCodes.UP_ARROW:
              return focusPrevOption();
            case keyCodes.DOWN_ARROW:
              return focusNextOption();
            case keyCodes.SPACE:
            case keyCodes.ENTER:
              var option = $mdUtil.getClosest(ev.target, 'md-option');
              if (option) ***REMOVED***
                dropDown.triggerHandler(***REMOVED***
                  type: 'click',
                  target: option
                ***REMOVED***);
                ev.preventDefault();
              ***REMOVED***
              checkCloseMenu(ev);
              break;
            case keyCodes.TAB:
            case keyCodes.ESCAPE:
              ev.stopPropagation();
              ev.preventDefault();
              opts.restoreFocus = true;
              $mdUtil.nextTick($mdSelect.hide, true);
              break;
            default:
              if ($mdConstant.isInputKey(ev) || $mdConstant.isNumPadKey(ev)) ***REMOVED***
                var optNode = dropDown.controller('mdSelectMenu').optNodeForKeyboardSearch(ev);
                opts.focusedNode = optNode || opts.focusedNode;
                optNode && optNode.focus();
              ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        function focusOption(direction) ***REMOVED***
          var optionsArray = $mdUtil.nodesToArray(opts.optionNodes);
          var index = optionsArray.indexOf(opts.focusedNode);

          var newOption;

          do ***REMOVED***
            if (index === -1) ***REMOVED***
              // We lost the previously focused element, reset to first option
              index = 0;
            ***REMOVED*** else if (direction === 'next' && index < optionsArray.length - 1) ***REMOVED***
              index++;
            ***REMOVED*** else if (direction === 'prev' && index > 0) ***REMOVED***
              index--;
            ***REMOVED***
            newOption = optionsArray[index];
            if (newOption.hasAttribute('disabled')) newOption = undefined;
          ***REMOVED*** while (!newOption && index < optionsArray.length - 1 && index > 0);

          newOption && newOption.focus();
          opts.focusedNode = newOption;
        ***REMOVED***

        function focusNextOption() ***REMOVED***
          focusOption('next');
        ***REMOVED***

        function focusPrevOption() ***REMOVED***
          focusOption('prev');
        ***REMOVED***

        function checkCloseMenu(ev) ***REMOVED***
          if (ev && ( ev.type == 'click') && (ev.currentTarget != dropDown[0])) return;
          if ( mouseOnScrollbar() ) return;

          var option = $mdUtil.getClosest(ev.target, 'md-option');
          if (option && option.hasAttribute && !option.hasAttribute('disabled')) ***REMOVED***
            ev.preventDefault();
            ev.stopPropagation();
            if (!selectCtrl.isMultiple) ***REMOVED***
              opts.restoreFocus = true;

              $mdUtil.nextTick(function () ***REMOVED***
                $mdSelect.hide(selectCtrl.ngModel.$viewValue);
              ***REMOVED***, true);
            ***REMOVED***
          ***REMOVED***
          /**
           * check if the mouseup event was on a scrollbar
           */
          function mouseOnScrollbar() ***REMOVED***
            var clickOnScrollbar = false;
            if (ev && (ev.currentTarget.children.length > 0)) ***REMOVED***
              var child = ev.currentTarget.children[0];
              var hasScrollbar = child.scrollHeight > child.clientHeight;
              if (hasScrollbar && child.children.length > 0) ***REMOVED***
                var relPosX = ev.pageX - ev.currentTarget.getBoundingClientRect().left;
                if (relPosX > child.querySelector('md-option').offsetWidth)
                  clickOnScrollbar = true;
              ***REMOVED***
            ***REMOVED***
            return clickOnScrollbar;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

    ***REMOVED***

    /**
     * To notify listeners that the Select menu has closed,
     * trigger the [optional] user-defined expression
     */
    function announceClosed(opts) ***REMOVED***
      var mdSelect = opts.selectCtrl;
      if (mdSelect) ***REMOVED***
        var menuController = opts.selectEl.controller('mdSelectMenu');
        mdSelect.setLabelText(menuController ? menuController.selectedLabels() : '');
        mdSelect.triggerClose();
      ***REMOVED***
    ***REMOVED***


    /**
     * Calculate the
     */
    function calculateMenuPositions(scope, element, opts) ***REMOVED***
      var
        containerNode = element[0],
        targetNode = opts.target[0].children[0], // target the label
        parentNode = $document[0].body,
        selectNode = opts.selectEl[0],
        contentNode = opts.contentEl[0],
        parentRect = parentNode.getBoundingClientRect(),
        targetRect = targetNode.getBoundingClientRect(),
        shouldOpenAroundTarget = false,
        bounds = ***REMOVED***
          left: parentRect.left + SELECT_EDGE_MARGIN,
          top: SELECT_EDGE_MARGIN,
          bottom: parentRect.height - SELECT_EDGE_MARGIN,
          right: parentRect.width - SELECT_EDGE_MARGIN - ($mdUtil.floatingScrollbars() ? 16 : 0)
        ***REMOVED***,
        spaceAvailable = ***REMOVED***
          top: targetRect.top - bounds.top,
          left: targetRect.left - bounds.left,
          right: bounds.right - (targetRect.left + targetRect.width),
          bottom: bounds.bottom - (targetRect.top + targetRect.height)
        ***REMOVED***,
        maxWidth = parentRect.width - SELECT_EDGE_MARGIN * 2,
        selectedNode = selectNode.querySelector('md-option[selected]'),
        optionNodes = selectNode.getElementsByTagName('md-option'),
        optgroupNodes = selectNode.getElementsByTagName('md-optgroup'),
        isScrollable = calculateScrollable(element, contentNode),
        centeredNode;

      var loading = isPromiseLike(opts.loadingAsync);
      if (!loading) ***REMOVED***
        // If a selected node, center around that
        if (selectedNode) ***REMOVED***
          centeredNode = selectedNode;
          // If there are option groups, center around the first option group
        ***REMOVED*** else if (optgroupNodes.length) ***REMOVED***
          centeredNode = optgroupNodes[0];
          // Otherwise - if we are not loading async - center around the first optionNode
        ***REMOVED*** else if (optionNodes.length) ***REMOVED***
          centeredNode = optionNodes[0];
          // In case there are no options, center on whatever's in there... (eg progress indicator)
        ***REMOVED*** else ***REMOVED***
          centeredNode = contentNode.firstElementChild || contentNode;
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        // If loading, center on progress indicator
        centeredNode = contentNode.firstElementChild || contentNode;
      ***REMOVED***

      if (contentNode.offsetWidth > maxWidth) ***REMOVED***
        contentNode.style['max-width'] = maxWidth + 'px';
      ***REMOVED*** else ***REMOVED***
        contentNode.style.maxWidth = null;
      ***REMOVED***
      if (shouldOpenAroundTarget) ***REMOVED***
        contentNode.style['min-width'] = targetRect.width + 'px';
      ***REMOVED***

      // Remove padding before we compute the position of the menu
      if (isScrollable) ***REMOVED***
        selectNode.classList.add('md-overflow');
      ***REMOVED***

      var focusedNode = centeredNode;
      if ((focusedNode.tagName || '').toUpperCase() === 'MD-OPTGROUP') ***REMOVED***
        focusedNode = optionNodes[0] || contentNode.firstElementChild || contentNode;
        centeredNode = focusedNode;
      ***REMOVED***
      // Cache for autoFocus()
      opts.focusedNode = focusedNode;

      // Get the selectMenuRect *after* max-width is possibly set above
      containerNode.style.display = 'block';
      var selectMenuRect = selectNode.getBoundingClientRect();
      var centeredRect = getOffsetRect(centeredNode);

      if (centeredNode) ***REMOVED***
        var centeredStyle = $window.getComputedStyle(centeredNode);
        centeredRect.paddingLeft = parseInt(centeredStyle.paddingLeft, 10) || 0;
        centeredRect.paddingRight = parseInt(centeredStyle.paddingRight, 10) || 0;
      ***REMOVED***

      if (isScrollable) ***REMOVED***
        var scrollBuffer = contentNode.offsetHeight / 2;
        contentNode.scrollTop = centeredRect.top + centeredRect.height / 2 - scrollBuffer;

        if (spaceAvailable.top < scrollBuffer) ***REMOVED***
          contentNode.scrollTop = Math.min(
            centeredRect.top,
            contentNode.scrollTop + scrollBuffer - spaceAvailable.top
          );
        ***REMOVED*** else if (spaceAvailable.bottom < scrollBuffer) ***REMOVED***
          contentNode.scrollTop = Math.max(
            centeredRect.top + centeredRect.height - selectMenuRect.height,
            contentNode.scrollTop - scrollBuffer + spaceAvailable.bottom
          );
        ***REMOVED***
      ***REMOVED***

      var left, top, transformOrigin, minWidth, fontSize;
      if (shouldOpenAroundTarget) ***REMOVED***
        left = targetRect.left;
        top = targetRect.top + targetRect.height;
        transformOrigin = '50% 0';
        if (top + selectMenuRect.height > bounds.bottom) ***REMOVED***
          top = targetRect.top - selectMenuRect.height;
          transformOrigin = '50% 100%';
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        left = (targetRect.left + centeredRect.left - centeredRect.paddingLeft) + 2;
        top = Math.floor(targetRect.top + targetRect.height / 2 - centeredRect.height / 2 -
            centeredRect.top + contentNode.scrollTop) + 2;

        transformOrigin = (centeredRect.left + targetRect.width / 2) + 'px ' +
          (centeredRect.top + centeredRect.height / 2 - contentNode.scrollTop) + 'px 0px';

        minWidth = Math.min(targetRect.width + centeredRect.paddingLeft + centeredRect.paddingRight, maxWidth);

        fontSize = window.getComputedStyle(targetNode)['font-size'];
      ***REMOVED***

      // Keep left and top within the window
      var containerRect = containerNode.getBoundingClientRect();
      var scaleX = Math.round(100 * Math.min(targetRect.width / selectMenuRect.width, 1.0)) / 100;
      var scaleY = Math.round(100 * Math.min(targetRect.height / selectMenuRect.height, 1.0)) / 100;

      return ***REMOVED***
        container: ***REMOVED***
          element: angular.element(containerNode),
          styles: ***REMOVED***
            left: Math.floor(clamp(bounds.left, left, bounds.right - containerRect.width)),
            top: Math.floor(clamp(bounds.top, top, bounds.bottom - containerRect.height)),
            'min-width': minWidth,
            'font-size': fontSize
          ***REMOVED***
        ***REMOVED***,
        dropDown: ***REMOVED***
          element: angular.element(selectNode),
          styles: ***REMOVED***
            transformOrigin: transformOrigin,
            transform: !opts.alreadyOpen ? $mdUtil.supplant('scale(***REMOVED***0***REMOVED***,***REMOVED***1***REMOVED***)', [scaleX, scaleY]) : ""
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;

    ***REMOVED***

  ***REMOVED***

  function isPromiseLike(obj) ***REMOVED***
    return obj && angular.isFunction(obj.then);
  ***REMOVED***

  function clamp(min, n, max) ***REMOVED***
    return Math.max(min, Math.min(n, max));
  ***REMOVED***

  function getOffsetRect(node) ***REMOVED***
    return node ? ***REMOVED***
      left: node.offsetLeft,
      top: node.offsetTop,
      width: node.offsetWidth,
      height: node.offsetHeight
    ***REMOVED*** : ***REMOVED***left: 0, top: 0, width: 0, height: 0***REMOVED***;
  ***REMOVED***

  function calculateScrollable(element, contentNode) ***REMOVED***
    var isScrollable = false;

    try ***REMOVED***
      var oldDisplay = element[0].style.display;

      // Set the element's display to block so that this calculation is correct
      element[0].style.display = 'block';

      isScrollable = contentNode.scrollHeight > contentNode.offsetHeight;

      // Reset it back afterwards
      element[0].style.display = oldDisplay;
    ***REMOVED*** finally ***REMOVED***
      // Nothing to do
    ***REMOVED***
    return isScrollable;
  ***REMOVED***
***REMOVED***
SelectProvider.$inject = ["$$interimElementProvider"];

***REMOVED***)(window, window.angular);
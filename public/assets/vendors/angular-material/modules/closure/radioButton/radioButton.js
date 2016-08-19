/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.radioButton');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.radioButton
 * @description radioButton module!
 */
angular.module('material.components.radioButton', [
  'material.core'
])
  .directive('mdRadioGroup', mdRadioGroupDirective)
  .directive('mdRadioButton', mdRadioButtonDirective);

/**
 * @ngdoc directive
 * @module material.components.radioButton
 * @name mdRadioGroup
 *
 * @restrict E
 *
 * @description
 * The `<md-radio-group>` directive identifies a grouping
 * container for the 1..n grouped radio buttons; specified using nested
 * `<md-radio-button>` tags.
 *
 * As per the [material design spec](http://www.google.com/design/spec/style/color.html#color-ui-color-application)
 * the radio button is in the accent color by default. The primary color palette may be used with
 * the `md-primary` class.
 *
 * Note: `<md-radio-group>` and `<md-radio-button>` handle tabindex differently
 * than the native `<input type='radio'>` controls. Whereas the native controls
 * force the user to tab through all the radio buttons, `<md-radio-group>`
 * is focusable, and by default the `<md-radio-button>`s are not.
 *
 * @param ***REMOVED***string***REMOVED*** ng-model Assignable angular expression to data-bind to.
 * @param ***REMOVED***boolean=***REMOVED*** md-no-ink Use of attribute indicates flag to disable ink ripple effects.
 *
 * @usage
 * <hljs lang="html">
 * <md-radio-group ng-model="selected">
 *
 *   <md-radio-button
 *        ng-repeat="d in colorOptions"
 *        ng-value="d.value" aria-label="***REMOVED******REMOVED*** d.label ***REMOVED******REMOVED***">
 *
 *          ***REMOVED******REMOVED*** d.label ***REMOVED******REMOVED***
 *
 *   </md-radio-button>
 *
 * </md-radio-group>
 * </hljs>
 *
 */
function mdRadioGroupDirective($mdUtil, $mdConstant, $mdTheming, $timeout) ***REMOVED***
  RadioGroupController.prototype = createRadioGroupControllerProto();

  return ***REMOVED***
    restrict: 'E',
    controller: ['$element', RadioGroupController],
    require: ['mdRadioGroup', '?ngModel'],
    link: ***REMOVED*** pre: linkRadioGroup ***REMOVED***
  ***REMOVED***;

  function linkRadioGroup(scope, element, attr, ctrls) ***REMOVED***
    element.addClass('_md');     // private md component indicator for styling
    $mdTheming(element);
    
    var rgCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1] || $mdUtil.fakeNgModel();

    rgCtrl.init(ngModelCtrl);

    scope.mouseActive = false;

    element
      .attr(***REMOVED***
        'role': 'radiogroup',
        'tabIndex': element.attr('tabindex') || '0'
      ***REMOVED***)
      .on('keydown', keydownListener)
      .on('mousedown', function(event) ***REMOVED***
        scope.mouseActive = true;
        $timeout(function() ***REMOVED***
          scope.mouseActive = false;
        ***REMOVED***, 100);
      ***REMOVED***)
      .on('focus', function() ***REMOVED***
        if(scope.mouseActive === false) ***REMOVED***
          rgCtrl.$element.addClass('md-focused');
        ***REMOVED***
      ***REMOVED***)
      .on('blur', function() ***REMOVED***
        rgCtrl.$element.removeClass('md-focused');
      ***REMOVED***);

    /**
     *
     */
    function setFocus() ***REMOVED***
      if (!element.hasClass('md-focused')) ***REMOVED*** element.addClass('md-focused'); ***REMOVED***
    ***REMOVED***

    /**
     *
     */
    function keydownListener(ev) ***REMOVED***
      var keyCode = ev.which || ev.keyCode;

      // Only listen to events that we originated ourselves
      // so that we don't trigger on things like arrow keys in
      // inputs.

      if (keyCode != $mdConstant.KEY_CODE.ENTER &&
          ev.currentTarget != ev.target) ***REMOVED***
        return;
      ***REMOVED***

      switch (keyCode) ***REMOVED***
        case $mdConstant.KEY_CODE.LEFT_ARROW:
        case $mdConstant.KEY_CODE.UP_ARROW:
          ev.preventDefault();
          rgCtrl.selectPrevious();
          setFocus();
          break;

        case $mdConstant.KEY_CODE.RIGHT_ARROW:
        case $mdConstant.KEY_CODE.DOWN_ARROW:
          ev.preventDefault();
          rgCtrl.selectNext();
          setFocus();
          break;

        case $mdConstant.KEY_CODE.ENTER:
          var form = angular.element($mdUtil.getClosest(element[0], 'form'));
          if (form.length > 0) ***REMOVED***
            form.triggerHandler('submit');
          ***REMOVED***
          break;
      ***REMOVED***

    ***REMOVED***
  ***REMOVED***

  function RadioGroupController($element) ***REMOVED***
    this._radioButtonRenderFns = [];
    this.$element = $element;
  ***REMOVED***

  function createRadioGroupControllerProto() ***REMOVED***
    return ***REMOVED***
      init: function(ngModelCtrl) ***REMOVED***
        this._ngModelCtrl = ngModelCtrl;
        this._ngModelCtrl.$render = angular.bind(this, this.render);
      ***REMOVED***,
      add: function(rbRender) ***REMOVED***
        this._radioButtonRenderFns.push(rbRender);
      ***REMOVED***,
      remove: function(rbRender) ***REMOVED***
        var index = this._radioButtonRenderFns.indexOf(rbRender);
        if (index !== -1) ***REMOVED***
          this._radioButtonRenderFns.splice(index, 1);
        ***REMOVED***
      ***REMOVED***,
      render: function() ***REMOVED***
        this._radioButtonRenderFns.forEach(function(rbRender) ***REMOVED***
          rbRender();
        ***REMOVED***);
      ***REMOVED***,
      setViewValue: function(value, eventType) ***REMOVED***
        this._ngModelCtrl.$setViewValue(value, eventType);
        // update the other radio buttons as well
        this.render();
      ***REMOVED***,
      getViewValue: function() ***REMOVED***
        return this._ngModelCtrl.$viewValue;
      ***REMOVED***,
      selectNext: function() ***REMOVED***
        return changeSelectedButton(this.$element, 1);
      ***REMOVED***,
      selectPrevious: function() ***REMOVED***
        return changeSelectedButton(this.$element, -1);
      ***REMOVED***,
      setActiveDescendant: function (radioId) ***REMOVED***
        this.$element.attr('aria-activedescendant', radioId);
      ***REMOVED***,
      isDisabled: function() ***REMOVED***
        return this.$element[0].hasAttribute('disabled');
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  /**
   * Change the radio group's selected button by a given increment.
   * If no button is selected, select the first button.
   */
  function changeSelectedButton(parent, increment) ***REMOVED***
    // Coerce all child radio buttons into an array, then wrap then in an iterator
    var buttons = $mdUtil.iterator(parent[0].querySelectorAll('md-radio-button'), true);

    if (buttons.count()) ***REMOVED***
      var validate = function (button) ***REMOVED***
        // If disabled, then NOT valid
        return !angular.element(button).attr("disabled");
      ***REMOVED***;

      var selected = parent[0].querySelector('md-radio-button.md-checked');
      var target = buttons[increment < 0 ? 'previous' : 'next'](selected, validate) || buttons.first();

      // Activate radioButton's click listener (triggerHandler won't create a real click event)
      angular.element(target).triggerHandler('click');


    ***REMOVED***
  ***REMOVED***

***REMOVED***
mdRadioGroupDirective.$inject = ["$mdUtil", "$mdConstant", "$mdTheming", "$timeout"];

/**
 * @ngdoc directive
 * @module material.components.radioButton
 * @name mdRadioButton
 *
 * @restrict E
 *
 * @description
 * The `<md-radio-button>`directive is the child directive required to be used within `<md-radio-group>` elements.
 *
 * While similar to the `<input type="radio" ng-model="" value="">` directive,
 * the `<md-radio-button>` directive provides ink effects, ARIA support, and
 * supports use within named radio groups.
 *
 * @param ***REMOVED***string***REMOVED*** ngModel Assignable angular expression to data-bind to.
 * @param ***REMOVED***string=***REMOVED*** ngChange Angular expression to be executed when input changes due to user
 *    interaction with the input element.
 * @param ***REMOVED***string***REMOVED*** ngValue Angular expression which sets the value to which the expression should
 *    be set when selected.
 * @param ***REMOVED***string***REMOVED*** value The value to which the expression should be set when selected.
 * @param ***REMOVED***string=***REMOVED*** name Property name of the form under which the control is published.
 * @param ***REMOVED***string=***REMOVED*** aria-label Adds label to radio button for accessibility.
 * Defaults to radio button's text. If no text content is available, a warning will be logged.
 *
 * @usage
 * <hljs lang="html">
 *
 * <md-radio-button value="1" aria-label="Label 1">
 *   Label 1
 * </md-radio-button>
 *
 * <md-radio-button ng-model="color" ng-value="specialValue" aria-label="Green">
 *   Green
 * </md-radio-button>
 *
 * </hljs>
 *
 */
function mdRadioButtonDirective($mdAria, $mdUtil, $mdTheming) ***REMOVED***

  var CHECKED_CSS = 'md-checked';

  return ***REMOVED***
    restrict: 'E',
    require: '^mdRadioGroup',
    transclude: true,
    template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox>' +
                '<div class="md-off"></div>' +
                '<div class="md-on"></div>' +
              '</div>' +
              '<div ng-transclude class="md-label"></div>',
    link: link
  ***REMOVED***;

  function link(scope, element, attr, rgCtrl) ***REMOVED***
    var lastChecked;

    $mdTheming(element);
    configureAria(element, scope);

    initialize();

    /**
     *
     */
    function initialize() ***REMOVED***
      if (!rgCtrl) ***REMOVED***
        throw 'RadioButton: No RadioGroupController could be found.';
      ***REMOVED***

      rgCtrl.add(render);
      attr.$observe('value', render);

      element
        .on('click', listener)
        .on('$destroy', function() ***REMOVED***
          rgCtrl.remove(render);
        ***REMOVED***);
    ***REMOVED***

    /**
     *
     */
    function listener(ev) ***REMOVED***
      if (element[0].hasAttribute('disabled') || rgCtrl.isDisabled()) return;

      scope.$apply(function() ***REMOVED***
        rgCtrl.setViewValue(attr.value, ev && ev.type);
      ***REMOVED***);
    ***REMOVED***

    /**
     *  Add or remove the `.md-checked` class from the RadioButton (and conditionally its parent).
     *  Update the `aria-activedescendant` attribute.
     */
    function render() ***REMOVED***
      var checked = (rgCtrl.getViewValue() == attr.value);
      if (checked === lastChecked) ***REMOVED***
        return;
      ***REMOVED***

      lastChecked = checked;
      element.attr('aria-checked', checked);

      if (checked) ***REMOVED***
        markParentAsChecked(true);
        element.addClass(CHECKED_CSS);

        rgCtrl.setActiveDescendant(element.attr('id'));

      ***REMOVED*** else ***REMOVED***
        markParentAsChecked(false);
        element.removeClass(CHECKED_CSS);
      ***REMOVED***

      /**
       * If the radioButton is inside a div, then add class so highlighting will work...
       */
      function markParentAsChecked(addClass ) ***REMOVED***
        if ( element.parent()[0].nodeName != "MD-RADIO-GROUP") ***REMOVED***
          element.parent()[ !!addClass ? 'addClass' : 'removeClass'](CHECKED_CSS);
        ***REMOVED***

      ***REMOVED***
    ***REMOVED***

    /**
     * Inject ARIA-specific attributes appropriate for each radio button
     */
    function configureAria( element, scope )***REMOVED***
      scope.ariaId = buildAriaID();

      element.attr(***REMOVED***
        'id' :  scope.ariaId,
        'role' : 'radio',
        'aria-checked' : 'false'
      ***REMOVED***);

      $mdAria.expectWithText(element, 'aria-label');

      /**
       * Build a unique ID for each radio button that will be used with aria-activedescendant.
       * Preserve existing ID if already specified.
       * @returns ***REMOVED****|string***REMOVED***
       */
      function buildAriaID() ***REMOVED***
        return attr.id || ( 'radio' + "_" + $mdUtil.nextUid() );
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
mdRadioButtonDirective.$inject = ["$mdAria", "$mdUtil", "$mdTheming"];

ngmaterial.components.radioButton = angular.module("material.components.radioButton");
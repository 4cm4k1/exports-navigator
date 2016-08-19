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
 * @name material.components.input
 */
angular.module('material.components.input', [
    'material.core'
  ])
  .directive('mdInputContainer', mdInputContainerDirective)
  .directive('label', labelDirective)
  .directive('input', inputTextareaDirective)
  .directive('textarea', inputTextareaDirective)
  .directive('mdMaxlength', mdMaxlengthDirective)
  .directive('placeholder', placeholderDirective)
  .directive('ngMessages', ngMessagesDirective)
  .directive('ngMessage', ngMessageDirective)
  .directive('ngMessageExp', ngMessageDirective)
  .directive('mdSelectOnFocus', mdSelectOnFocusDirective)

  .animation('.md-input-invalid', mdInputInvalidMessagesAnimation)
  .animation('.md-input-messages-animation', ngMessagesAnimation)
  .animation('.md-input-message-animation', ngMessageAnimation)

  // Register a service for each animation so that we can easily inject them into unit tests
  .service('mdInputInvalidAnimation', mdInputInvalidMessagesAnimation)
  .service('mdInputMessagesAnimation', ngMessagesAnimation)
  .service('mdInputMessageAnimation', ngMessageAnimation);

/**
 * @ngdoc directive
 * @name mdInputContainer
 * @module material.components.input
 *
 * @restrict E
 *
 * @description
 * `<md-input-container>` is the parent of any input or textarea element.
 *
 * Input and textarea elements will not behave properly unless the md-input-container
 * parent is provided.
 *
 * A single `<md-input-container>` should contain only one `<input>` element, otherwise it will throw an error.
 *
 * <b>Exception:</b> Hidden inputs (`<input type="hidden" />`) are ignored and will not throw an error, so
 * you may combine these with other inputs.
 *
 * <b>Note:</b> When using `ngMessages` with your input element, make sure the message and container elements
 * are *block* elements, otherwise animations applied to the messages will not look as intended. Either use a `div` and
 * apply the `ng-message` and `ng-messages` classes respectively, or use the `md-block` class on your element.
 *
 * @param md-is-error ***REMOVED***expression=***REMOVED*** When the given expression evaluates to true, the input container
 *   will go into error state. Defaults to erroring if the input has been touched and is invalid.
 * @param md-no-float ***REMOVED***boolean=***REMOVED*** When present, `placeholder` attributes on the input will not be converted to floating
 *   labels.
 *
 * @usage
 * <hljs lang="html">
 *
 * <md-input-container>
 *   <label>Username</label>
 *   <input type="text" ng-model="user.name">
 * </md-input-container>
 *
 * <md-input-container>
 *   <label>Description</label>
 *   <textarea ng-model="user.description"></textarea>
 * </md-input-container>
 *
 * </hljs>
 *
 * <h3>When disabling floating labels</h3>
 * <hljs lang="html">
 *
 * <md-input-container md-no-float>
 *   <input type="text" placeholder="Non-Floating Label">
 * </md-input-container>
 *
 * </hljs>
 */
function mdInputContainerDirective($mdTheming, $parse) ***REMOVED***

  var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT', 'MD-SELECT'];

  var LEFT_SELECTORS = INPUT_TAGS.reduce(function(selectors, isel) ***REMOVED***
    return selectors.concat(['md-icon ~ ' + isel, '.md-icon ~ ' + isel]);
  ***REMOVED***, []).join(",");

  var RIGHT_SELECTORS = INPUT_TAGS.reduce(function(selectors, isel) ***REMOVED***
    return selectors.concat([isel + ' ~ md-icon', isel + ' ~ .md-icon']);
  ***REMOVED***, []).join(",");

  ContainerCtrl.$inject = ["$scope", "$element", "$attrs", "$animate"];
  return ***REMOVED***
    restrict: 'E',
    link: postLink,
    controller: ContainerCtrl
  ***REMOVED***;

  function postLink(scope, element) ***REMOVED***
    $mdTheming(element);

    // Check for both a left & right icon
    var leftIcon = element[0].querySelector(LEFT_SELECTORS);
    var rightIcon = element[0].querySelector(RIGHT_SELECTORS);

    if (leftIcon) ***REMOVED*** element.addClass('md-icon-left'); ***REMOVED***
    if (rightIcon) ***REMOVED*** element.addClass('md-icon-right'); ***REMOVED***
  ***REMOVED***

  function ContainerCtrl($scope, $element, $attrs, $animate) ***REMOVED***
    var self = this;

    self.isErrorGetter = $attrs.mdIsError && $parse($attrs.mdIsError);

    self.delegateClick = function() ***REMOVED***
      self.input.focus();
    ***REMOVED***;
    self.element = $element;
    self.setFocused = function(isFocused) ***REMOVED***
      $element.toggleClass('md-input-focused', !!isFocused);
    ***REMOVED***;
    self.setHasValue = function(hasValue) ***REMOVED***
      $element.toggleClass('md-input-has-value', !!hasValue);
    ***REMOVED***;
    self.setHasPlaceholder = function(hasPlaceholder) ***REMOVED***
      $element.toggleClass('md-input-has-placeholder', !!hasPlaceholder);
    ***REMOVED***;
    self.setInvalid = function(isInvalid) ***REMOVED***
      if (isInvalid) ***REMOVED***
        $animate.addClass($element, 'md-input-invalid');
      ***REMOVED*** else ***REMOVED***
        $animate.removeClass($element, 'md-input-invalid');
      ***REMOVED***
    ***REMOVED***;
    $scope.$watch(function() ***REMOVED***
      return self.label && self.input;
    ***REMOVED***, function(hasLabelAndInput) ***REMOVED***
      if (hasLabelAndInput && !self.label.attr('for')) ***REMOVED***
        self.label.attr('for', self.input.attr('id'));
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
mdInputContainerDirective.$inject = ["$mdTheming", "$parse"];

function labelDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    require: '^?mdInputContainer',
    link: function(scope, element, attr, containerCtrl) ***REMOVED***
      if (!containerCtrl || attr.mdNoFloat || element.hasClass('md-container-ignore')) return;

      containerCtrl.label = element;
      scope.$on('$destroy', function() ***REMOVED***
        containerCtrl.label = null;
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

/**
 * @ngdoc directive
 * @name mdInput
 * @restrict E
 * @module material.components.input
 *
 * @description
 * You can use any `<input>` or `<textarea>` element as a child of an `<md-input-container>`. This
 * allows you to build complex forms for data entry.
 *
 * When the input is required and uses a floating label, then the label will automatically contain
 * an asterisk (`*`).<br/>
 * This behavior can be disabled by using the `md-no-asterisk` attribute.
 *
 * @param ***REMOVED***number=***REMOVED*** md-maxlength The maximum number of characters allowed in this input. If this is
 *   specified, a character counter will be shown underneath the input.<br/><br/>
 *   The purpose of **`md-maxlength`** is exactly to show the max length counter text. If you don't
 *   want the counter text and only need "plain" validation, you can use the "simple" `ng-maxlength`
 *   or maxlength attributes.<br/><br/>
 *   **Note:** Only valid for text/string inputs (not numeric).
 *
 * @param ***REMOVED***string=***REMOVED*** aria-label Aria-label is required when no label is present.  A warning message
 *   will be logged in the console if not present.
 * @param ***REMOVED***string=***REMOVED*** placeholder An alternative approach to using aria-label when the label is not
 *   PRESENT. The placeholder text is copied to the aria-label attribute.
 * @param md-no-autogrow ***REMOVED***boolean=***REMOVED*** When present, textareas will not grow automatically.
 * @param md-no-asterisk ***REMOVED***boolean=***REMOVED*** When present, an asterisk will not be appended to the inputs floating label
 * @param md-no-resize ***REMOVED***boolean=***REMOVED*** Disables the textarea resize handle.
 * @param ***REMOVED***number=***REMOVED*** max-rows The maximum amount of rows for a textarea.
 * @param md-detect-hidden ***REMOVED***boolean=***REMOVED*** When present, textareas will be sized properly when they are
 *   revealed after being hidden. This is off by default for performance reasons because it
 *   guarantees a reflow every digest cycle.
 *
 * @usage
 * <hljs lang="html">
 * <md-input-container>
 *   <label>Color</label>
 *   <input type="text" ng-model="color" required md-maxlength="10">
 * </md-input-container>
 * </hljs>
 *
 * <h3>With Errors</h3>
 *
 * `md-input-container` also supports errors using the standard `ng-messages` directives and
 * animates the messages when they become visible using from the `ngEnter`/`ngLeave` events or
 * the `ngShow`/`ngHide` events.
 *
 * By default, the messages will be hidden until the input is in an error state. This is based off
 * of the `md-is-error` expression of the `md-input-container`. This gives the user a chance to
 * fill out the form before the errors become visible.
 *
 * <hljs lang="html">
 * <form name="colorForm">
 *   <md-input-container>
 *     <label>Favorite Color</label>
 *     <input name="favoriteColor" ng-model="favoriteColor" required>
 *     <div ng-messages="colorForm.favoriteColor.$error">
 *       <div ng-message="required">This is required!</div>
 *     </div>
 *   </md-input-container>
 * </form>
 * </hljs>
 *
 * We automatically disable this auto-hiding functionality if you provide any of the following
 * visibility directives on the `ng-messages` container:
 *
 *  - `ng-if`
 *  - `ng-show`/`ng-hide`
 *  - `ng-switch-when`/`ng-switch-default`
 *
 * You can also disable this functionality manually by adding the `md-auto-hide="false"` expression
 * to the `ng-messages` container. This may be helpful if you always want to see the error messages
 * or if you are building your own visibilty directive.
 *
 * _<b>Note:</b> The `md-auto-hide` attribute is a static string that is  only checked upon
 * initialization of the `ng-messages` directive to see if it equals the string `false`._
 *
 * <hljs lang="html">
 * <form name="userForm">
 *   <md-input-container>
 *     <label>Last Name</label>
 *     <input name="lastName" ng-model="lastName" required md-maxlength="10" minlength="4">
 *     <div ng-messages="userForm.lastName.$error" ng-show="userForm.lastName.$dirty">
 *       <div ng-message="required">This is required!</div>
 *       <div ng-message="md-maxlength">That's too long!</div>
 *       <div ng-message="minlength">That's too short!</div>
 *     </div>
 *   </md-input-container>
 *   <md-input-container>
 *     <label>Biography</label>
 *     <textarea name="bio" ng-model="biography" required md-maxlength="150"></textarea>
 *     <div ng-messages="userForm.bio.$error" ng-show="userForm.bio.$dirty">
 *       <div ng-message="required">This is required!</div>
 *       <div ng-message="md-maxlength">That's too long!</div>
 *     </div>
 *   </md-input-container>
 *   <md-input-container>
 *     <input aria-label='title' ng-model='title'>
 *   </md-input-container>
 *   <md-input-container>
 *     <input placeholder='title' ng-model='title'>
 *   </md-input-container>
 * </form>
 * </hljs>
 *
 * <h3>Notes</h3>
 *
 * - Requires [ngMessages](https://docs.angularjs.org/api/ngMessages).
 * - Behaves like the [AngularJS input directive](https://docs.angularjs.org/api/ng/directive/input).
 *
 * The `md-input` and `md-input-container` directives use very specific positioning to achieve the
 * error animation effects. Therefore, it is *not* advised to use the Layout system inside of the
 * `<md-input-container>` tags. Instead, use relative or absolute positioning.
 *
 *
 * <h3>Textarea directive</h3>
 * The `textarea` element within a `md-input-container` has the following specific behavior:
 * - By default the `textarea` grows as the user types. This can be disabled via the `md-no-autogrow`
 * attribute.
 * - If a `textarea` has the `rows` attribute, it will treat the `rows` as the minimum height and will
 * continue growing as the user types. For example a textarea with `rows="3"` will be 3 lines of text
 * high initially. If no rows are specified, the directive defaults to 1.
 * - The textarea's height gets set on initialization, as well as while the user is typing. In certain situations
 * (e.g. while animating) the directive might have been initialized, before the element got it's final height. In
 * those cases, you can trigger a resize manually by broadcasting a `md-resize-textarea` event on the scope.
 * - If you wan't a `textarea` to stop growing at a certain point, you can specify the `max-rows` attribute.
 * - The textarea's bottom border acts as a handle which users can drag, in order to resize the element vertically.
 * Once the user has resized a `textarea`, the autogrowing functionality becomes disabled. If you don't want a
 * `textarea` to be resizeable by the user, you can add the `md-no-resize` attribute.
 */

function inputTextareaDirective($mdUtil, $window, $mdAria, $timeout, $mdGesture) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    require: ['^?mdInputContainer', '?ngModel', '?^form'],
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attr, ctrls) ***REMOVED***

    var containerCtrl = ctrls[0];
    var hasNgModel = !!ctrls[1];
    var ngModelCtrl = ctrls[1] || $mdUtil.fakeNgModel();
    var parentForm = ctrls[2];
    var isReadonly = angular.isDefined(attr.readonly);
    var mdNoAsterisk = $mdUtil.parseAttributeBoolean(attr.mdNoAsterisk);
    var tagName = element[0].tagName.toLowerCase();


    if (!containerCtrl) return;
    if (attr.type === 'hidden') ***REMOVED***
      element.attr('aria-hidden', 'true');
      return;
    ***REMOVED*** else if (containerCtrl.input) ***REMOVED***
      if (containerCtrl.input[0].contains(element[0])) ***REMOVED***
        return;
      ***REMOVED*** else ***REMOVED***
        throw new Error("<md-input-container> can only have *one* <input>, <textarea> or <md-select> child element!");
      ***REMOVED***
    ***REMOVED***
    containerCtrl.input = element;

    setupAttributeWatchers();

    // Add an error spacer div after our input to provide space for the char counter and any ng-messages
    var errorsSpacer = angular.element('<div class="md-errors-spacer">');
    element.after(errorsSpacer);

    if (!containerCtrl.label) ***REMOVED***
      $mdAria.expect(element, 'aria-label', attr.placeholder);
    ***REMOVED***

    element.addClass('md-input');
    if (!element.attr('id')) ***REMOVED***
      element.attr('id', 'input_' + $mdUtil.nextUid());
    ***REMOVED***

    // This works around a Webkit issue where number inputs, placed in a flexbox, that have
    // a `min` and `max` will collapse to about 1/3 of their proper width. Please check #7349
    // for more info. Also note that we don't override the `step` if the user has specified it,
    // in order to prevent some unexpected behaviour.
    if (tagName === 'input' && attr.type === 'number' && attr.min && attr.max && !attr.step) ***REMOVED***
      element.attr('step', 'any');
    ***REMOVED*** else if (tagName === 'textarea') ***REMOVED***
      setupTextarea();
    ***REMOVED***

    // If the input doesn't have an ngModel, it may have a static value. For that case,
    // we have to do one initial check to determine if the container should be in the
    // "has a value" state.
    if (!hasNgModel) ***REMOVED***
      inputCheckValue();
    ***REMOVED***

    var isErrorGetter = containerCtrl.isErrorGetter || function() ***REMOVED***
      return ngModelCtrl.$invalid && (ngModelCtrl.$touched || (parentForm && parentForm.$submitted));
    ***REMOVED***;

    scope.$watch(isErrorGetter, containerCtrl.setInvalid);

    // When the developer uses the ngValue directive for the input, we have to observe the attribute, because
    // Angular's ngValue directive is just setting the `value` attribute.
    if (attr.ngValue) ***REMOVED***
      attr.$observe('value', inputCheckValue);
    ***REMOVED***

    ngModelCtrl.$parsers.push(ngModelPipelineCheckValue);
    ngModelCtrl.$formatters.push(ngModelPipelineCheckValue);

    element.on('input', inputCheckValue);

    if (!isReadonly) ***REMOVED***
      element
        .on('focus', function(ev) ***REMOVED***
          $mdUtil.nextTick(function() ***REMOVED***
            containerCtrl.setFocused(true);
          ***REMOVED***);
        ***REMOVED***)
        .on('blur', function(ev) ***REMOVED***
          $mdUtil.nextTick(function() ***REMOVED***
            containerCtrl.setFocused(false);
            inputCheckValue();
          ***REMOVED***);
        ***REMOVED***);
    ***REMOVED***

    scope.$on('$destroy', function() ***REMOVED***
      containerCtrl.setFocused(false);
      containerCtrl.setHasValue(false);
      containerCtrl.input = null;
    ***REMOVED***);

    /** Gets run through ngModel's pipeline and set the `has-value` class on the container. */
    function ngModelPipelineCheckValue(arg) ***REMOVED***
      containerCtrl.setHasValue(!ngModelCtrl.$isEmpty(arg));
      return arg;
    ***REMOVED***

    function setupAttributeWatchers() ***REMOVED***
      if (containerCtrl.label) ***REMOVED***
        attr.$observe('required', function (value) ***REMOVED***
          // We don't need to parse the required value, it's always a boolean because of angular's
          // required directive.
          containerCtrl.label.toggleClass('md-required', value && !mdNoAsterisk);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    function inputCheckValue() ***REMOVED***
      // An input's value counts if its length > 0,
      // or if the input's validity state says it has bad input (eg string in a number input)
      containerCtrl.setHasValue(element.val().length > 0 || (element[0].validity || ***REMOVED******REMOVED***).badInput);
    ***REMOVED***

    function setupTextarea() ***REMOVED***
      var isAutogrowing = !attr.hasOwnProperty('mdNoAutogrow');

      attachResizeHandle();

      if (!isAutogrowing) return;

      // Can't check if height was or not explicity set,
      // so rows attribute will take precedence if present
      var minRows = attr.hasOwnProperty('rows') ? parseInt(attr.rows) : NaN;
      var maxRows = attr.hasOwnProperty('maxRows') ? parseInt(attr.maxRows) : NaN;
      var scopeResizeListener = scope.$on('md-resize-textarea', growTextarea);
      var lineHeight = null;
      var node = element[0];

      // This timeout is necessary, because the browser needs a little bit
      // of time to calculate the `clientHeight` and `scrollHeight`.
      $timeout(function() ***REMOVED***
        $mdUtil.nextTick(growTextarea);
      ***REMOVED***, 10, false);

      // We could leverage ngModel's $parsers here, however it
      // isn't reliable, because Angular trims the input by default,
      // which means that growTextarea won't fire when newlines and
      // spaces are added.
      element.on('input', growTextarea);

      // We should still use the $formatters, because they fire when
      // the value was changed from outside the textarea.
      if (hasNgModel) ***REMOVED***
        ngModelCtrl.$formatters.push(formattersListener);
      ***REMOVED***

      if (!minRows) ***REMOVED***
        element.attr('rows', 1);
      ***REMOVED***

      angular.element($window).on('resize', growTextarea);
      scope.$on('$destroy', disableAutogrow);

      function growTextarea() ***REMOVED***
        // temporarily disables element's flex so its height 'runs free'
        element
          .attr('rows', 1)
          .css('height', 'auto')
          .addClass('md-no-flex');

        var height = getHeight();

        if (!lineHeight) ***REMOVED***
          // offsetHeight includes padding which can throw off our value
          var originalPadding = element[0].style.padding || '';
          lineHeight = element.css('padding', 0).prop('offsetHeight');
          element[0].style.padding = originalPadding;
        ***REMOVED***

        if (minRows && lineHeight) ***REMOVED***
          height = Math.max(height, lineHeight * minRows);
        ***REMOVED***

        if (maxRows && lineHeight) ***REMOVED***
          var maxHeight = lineHeight * maxRows;

          if (maxHeight < height) ***REMOVED***
            element.attr('md-no-autogrow', '');
            height = maxHeight;
          ***REMOVED*** else ***REMOVED***
            element.removeAttr('md-no-autogrow');
          ***REMOVED***
        ***REMOVED***

        if (lineHeight) ***REMOVED***
          element.attr('rows', Math.round(height / lineHeight));
        ***REMOVED***

        element
          .css('height', height + 'px')
          .removeClass('md-no-flex');
      ***REMOVED***

      function getHeight() ***REMOVED***
        var offsetHeight = node.offsetHeight;
        var line = node.scrollHeight - offsetHeight;
        return offsetHeight + Math.max(line, 0);
      ***REMOVED***

      function formattersListener(value) ***REMOVED***
        $mdUtil.nextTick(growTextarea);
        return value;
      ***REMOVED***

      function disableAutogrow() ***REMOVED***
        if (!isAutogrowing) return;

        isAutogrowing = false;
        angular.element($window).off('resize', growTextarea);
        scopeResizeListener && scopeResizeListener();
        element
          .attr('md-no-autogrow', '')
          .off('input', growTextarea);

        if (hasNgModel) ***REMOVED***
          var listenerIndex = ngModelCtrl.$formatters.indexOf(formattersListener);

          if (listenerIndex > -1) ***REMOVED***
            ngModelCtrl.$formatters.splice(listenerIndex, 1);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      function attachResizeHandle() ***REMOVED***
        if (attr.hasOwnProperty('mdNoResize')) return;

        var handle = angular.element('<div class="md-resize-handle"></div>');
        var isDragging = false;
        var dragStart = null;
        var startHeight = 0;
        var container = containerCtrl.element;
        var dragGestureHandler = $mdGesture.register(handle, 'drag', ***REMOVED*** horizontal: false ***REMOVED***);

        element.after(handle);
        handle.on('mousedown', onMouseDown);

        container
          .on('$md.dragstart', onDragStart)
          .on('$md.drag', onDrag)
          .on('$md.dragend', onDragEnd);

        scope.$on('$destroy', function() ***REMOVED***
          handle
            .off('mousedown', onMouseDown)
            .remove();

          container
            .off('$md.dragstart', onDragStart)
            .off('$md.drag', onDrag)
            .off('$md.dragend', onDragEnd);

          dragGestureHandler();
          handle = null;
          container = null;
          dragGestureHandler = null;
        ***REMOVED***);

        function onMouseDown(ev) ***REMOVED***
          ev.preventDefault();
          isDragging = true;
          dragStart = ev.clientY;
          startHeight = parseFloat(element.css('height')) || element.prop('offsetHeight');
        ***REMOVED***

        function onDragStart(ev) ***REMOVED***
          if (!isDragging) return;
          ev.preventDefault();
          disableAutogrow();
          container.addClass('md-input-resized');
        ***REMOVED***

        function onDrag(ev) ***REMOVED***
          if (!isDragging) return;
          element.css('height', startHeight + (ev.pointer.y - dragStart) - $mdUtil.scrollTop() + 'px');
        ***REMOVED***

        function onDragEnd(ev) ***REMOVED***
          if (!isDragging) return;
          isDragging = false;
          container.removeClass('md-input-resized');
        ***REMOVED***
      ***REMOVED***

      // Attach a watcher to detect when the textarea gets shown.
      if (attr.hasOwnProperty('mdDetectHidden')) ***REMOVED***

        var handleHiddenChange = function() ***REMOVED***
          var wasHidden = false;

          return function() ***REMOVED***
            var isHidden = node.offsetHeight === 0;

            if (isHidden === false && wasHidden === true) ***REMOVED***
              growTextarea();
            ***REMOVED***

            wasHidden = isHidden;
          ***REMOVED***;
        ***REMOVED***();

        // Check every digest cycle whether the visibility of the textarea has changed.
        // Queue up to run after the digest cycle is complete.
        scope.$watch(function() ***REMOVED***
          $mdUtil.nextTick(handleHiddenChange, false);
          return true;
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
inputTextareaDirective.$inject = ["$mdUtil", "$window", "$mdAria", "$timeout", "$mdGesture"];

function mdMaxlengthDirective($animate, $mdUtil) ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    require: ['ngModel', '^mdInputContainer'],
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attr, ctrls) ***REMOVED***
    var maxlength;
    var ngModelCtrl = ctrls[0];
    var containerCtrl = ctrls[1];
    var charCountEl, errorsSpacer;

    // Wait until the next tick to ensure that the input has setup the errors spacer where we will
    // append our counter
    $mdUtil.nextTick(function() ***REMOVED***
      errorsSpacer = angular.element(containerCtrl.element[0].querySelector('.md-errors-spacer'));
      charCountEl = angular.element('<div class="md-char-counter">');

      // Append our character counter inside the errors spacer
      errorsSpacer.append(charCountEl);

      // Stop model from trimming. This makes it so whitespace
      // over the maxlength still counts as invalid.
      attr.$set('ngTrim', 'false');

      ngModelCtrl.$formatters.push(renderCharCount);
      ngModelCtrl.$viewChangeListeners.push(renderCharCount);
      element.on('input keydown keyup', function() ***REMOVED***
        renderCharCount(); //make sure it's called with no args
      ***REMOVED***);

      scope.$watch(attr.mdMaxlength, function(value) ***REMOVED***
        maxlength = value;
        if (angular.isNumber(value) && value > 0) ***REMOVED***
          if (!charCountEl.parent().length) ***REMOVED***
            $animate.enter(charCountEl, errorsSpacer);
          ***REMOVED***
          renderCharCount();
        ***REMOVED*** else ***REMOVED***
          $animate.leave(charCountEl);
        ***REMOVED***
      ***REMOVED***);

      ngModelCtrl.$validators['md-maxlength'] = function(modelValue, viewValue) ***REMOVED***
        if (!angular.isNumber(maxlength) || maxlength < 0) ***REMOVED***
          return true;
        ***REMOVED***
        return ( modelValue || element.val() || viewValue || '' ).length <= maxlength;
      ***REMOVED***;
    ***REMOVED***);

    function renderCharCount(value) ***REMOVED***
      // If we have not been appended to the body yet; do not render
      if (!charCountEl.parent) ***REMOVED***
        return value;
      ***REMOVED***

      // Force the value into a string since it may be a number,
      // which does not have a length property.
      charCountEl.text(String(element.val() || value || '').length + ' / ' + maxlength);
      return value;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
mdMaxlengthDirective.$inject = ["$animate", "$mdUtil"];

function placeholderDirective($compile) ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    require: '^^?mdInputContainer',
    priority: 200,
    link: ***REMOVED***
      // Note that we need to do this in the pre-link, as opposed to the post link, if we want to
      // support data bindings in the placeholder. This is necessary, because we have a case where
      // we transfer the placeholder value to the `<label>` and we remove it from the original `<input>`.
      // If we did this in the post-link, Angular would have set up the observers already and would be
      // re-adding the attribute, even though we removed it from the element.
      pre: preLink
    ***REMOVED***
  ***REMOVED***;

  function preLink(scope, element, attr, inputContainer) ***REMOVED***
    // If there is no input container, just return
    if (!inputContainer) return;

    var label = inputContainer.element.find('label');
    var noFloat = inputContainer.element.attr('md-no-float');

    // If we have a label, or they specify the md-no-float attribute, just return
    if ((label && label.length) || noFloat === '' || scope.$eval(noFloat)) ***REMOVED***
      // Add a placeholder class so we can target it in the CSS
      inputContainer.setHasPlaceholder(true);
      return;
    ***REMOVED***

    // md-select handles placeholders on it's own
    if (element[0].nodeName != 'MD-SELECT') ***REMOVED***
      // Move the placeholder expression to the label
      var newLabel = angular.element('<label ng-click="delegateClick()" tabindex="-1">' + attr.placeholder + '</label>');

      // Note that we unset it via `attr`, in order to get Angular
      // to remove any observers that it might have set up. Otherwise
      // the attribute will be added on the next digest.
      attr.$set('placeholder', null);

      // We need to compile the label manually in case it has any bindings.
      // A gotcha here is that we first add the element to the DOM and we compile
      // it later. This is necessary, because if we compile the element beforehand,
      // it won't be able to find the `mdInputContainer` controller.
      inputContainer.element
        .addClass('md-icon-float')
        .prepend(newLabel);

      $compile(newLabel)(scope);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
placeholderDirective.$inject = ["$compile"];

/**
 * @ngdoc directive
 * @name mdSelectOnFocus
 * @module material.components.input
 *
 * @restrict A
 *
 * @description
 * The `md-select-on-focus` directive allows you to automatically select the element's input text on focus.
 *
 * <h3>Notes</h3>
 * - The use of `md-select-on-focus` is restricted to `<input>` and `<textarea>` elements.
 *
 * @usage
 * <h3>Using with an Input</h3>
 * <hljs lang="html">
 *
 * <md-input-container>
 *   <label>Auto Select</label>
 *   <input type="text" md-select-on-focus>
 * </md-input-container>
 * </hljs>
 *
 * <h3>Using with a Textarea</h3>
 * <hljs lang="html">
 *
 * <md-input-container>
 *   <label>Auto Select</label>
 *   <textarea md-select-on-focus>This text will be selected on focus.</textarea>
 * </md-input-container>
 *
 * </hljs>
 */
function mdSelectOnFocusDirective($timeout) ***REMOVED***

  return ***REMOVED***
    restrict: 'A',
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attr) ***REMOVED***
    if (element[0].nodeName !== 'INPUT' && element[0].nodeName !== "TEXTAREA") return;

    var preventMouseUp = false;

    element
      .on('focus', onFocus)
      .on('mouseup', onMouseUp);

    scope.$on('$destroy', function() ***REMOVED***
      element
        .off('focus', onFocus)
        .off('mouseup', onMouseUp);
    ***REMOVED***);

    function onFocus() ***REMOVED***
      preventMouseUp = true;

      $timeout(function() ***REMOVED***
        // Use HTMLInputElement#select to fix firefox select issues.
        // The debounce is here for Edge's sake, otherwise the selection doesn't work.
        element[0].select();

        // This should be reset from inside the `focus`, because the event might
        // have originated from something different than a click, e.g. a keyboard event.
        preventMouseUp = false;
      ***REMOVED***, 1, false);
    ***REMOVED***

    // Prevents the default action of the first `mouseup` after a focus.
    // This is necessary, because browsers fire a `mouseup` right after the element
    // has been focused. In some browsers (Firefox in particular) this can clear the
    // selection. There are examples of the problem in issue #7487.
    function onMouseUp(event) ***REMOVED***
      if (preventMouseUp) ***REMOVED***
        event.preventDefault();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
mdSelectOnFocusDirective.$inject = ["$timeout"];

var visibilityDirectives = ['ngIf', 'ngShow', 'ngHide', 'ngSwitchWhen', 'ngSwitchDefault'];
function ngMessagesDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'EA',
    link: postLink,

    // This is optional because we don't want target *all* ngMessage instances, just those inside of
    // mdInputContainer.
    require: '^^?mdInputContainer'
  ***REMOVED***;

  function postLink(scope, element, attrs, inputContainer) ***REMOVED***
    // If we are not a child of an input container, don't do anything
    if (!inputContainer) return;

    // Add our animation class
    element.toggleClass('md-input-messages-animation', true);

    // Add our md-auto-hide class to automatically hide/show messages when container is invalid
    element.toggleClass('md-auto-hide', true);

    // If we see some known visibility directives, remove the md-auto-hide class
    if (attrs.mdAutoHide == 'false' || hasVisibiltyDirective(attrs)) ***REMOVED***
      element.toggleClass('md-auto-hide', false);
    ***REMOVED***
  ***REMOVED***

  function hasVisibiltyDirective(attrs) ***REMOVED***
    return visibilityDirectives.some(function(attr) ***REMOVED***
      return attrs[attr];
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

function ngMessageDirective($mdUtil) ***REMOVED***
  return ***REMOVED***
    restrict: 'EA',
    compile: compile,
    priority: 100
  ***REMOVED***;

  function compile(tElement) ***REMOVED***
    if (!isInsideInputContainer(tElement)) ***REMOVED***

      // When the current element is inside of a document fragment, then we need to check for an input-container
      // in the postLink, because the element will be later added to the DOM and is currently just in a temporary
      // fragment, which causes the input-container check to fail.
      if (isInsideFragment()) ***REMOVED***
        return function (scope, element) ***REMOVED***
          if (isInsideInputContainer(element)) ***REMOVED***
            // Inside of the postLink function, a ngMessage directive will be a comment element, because it's
            // currently hidden. To access the shown element, we need to use the element from the compile function.
            initMessageElement(tElement);
          ***REMOVED***
        ***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      initMessageElement(tElement);
    ***REMOVED***

    function isInsideFragment() ***REMOVED***
      var nextNode = tElement[0];
      while (nextNode = nextNode.parentNode) ***REMOVED***
        if (nextNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) ***REMOVED***
          return true;
        ***REMOVED***
      ***REMOVED***
      return false;
    ***REMOVED***

    function isInsideInputContainer(element) ***REMOVED***
      return !!$mdUtil.getClosest(element, "md-input-container");
    ***REMOVED***

    function initMessageElement(element) ***REMOVED***
      // Add our animation class
      element.toggleClass('md-input-message-animation', true);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
ngMessageDirective.$inject = ["$mdUtil"];

var $$AnimateRunner, $animateCss, $mdUtil;

function mdInputInvalidMessagesAnimation($$AnimateRunner, $animateCss, $mdUtil) ***REMOVED***
  saveSharedServices($$AnimateRunner, $animateCss, $mdUtil);

  return ***REMOVED***
    addClass: function(element, className, done) ***REMOVED***
      showInputMessages(element, done);
    ***REMOVED***

    // NOTE: We do not need the removeClass method, because the message ng-leave animation will fire
  ***REMOVED***;
***REMOVED***
mdInputInvalidMessagesAnimation.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"];

function ngMessagesAnimation($$AnimateRunner, $animateCss, $mdUtil) ***REMOVED***
  saveSharedServices($$AnimateRunner, $animateCss, $mdUtil);

  return ***REMOVED***
    enter: function(element, done) ***REMOVED***
      showInputMessages(element, done);
    ***REMOVED***,

    leave: function(element, done) ***REMOVED***
      hideInputMessages(element, done);
    ***REMOVED***,

    addClass: function(element, className, done) ***REMOVED***
      if (className == "ng-hide") ***REMOVED***
        hideInputMessages(element, done);
      ***REMOVED*** else ***REMOVED***
        done();
      ***REMOVED***
    ***REMOVED***,

    removeClass: function(element, className, done) ***REMOVED***
      if (className == "ng-hide") ***REMOVED***
        showInputMessages(element, done);
      ***REMOVED*** else ***REMOVED***
        done();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
ngMessagesAnimation.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"];

function ngMessageAnimation($$AnimateRunner, $animateCss, $mdUtil) ***REMOVED***
  saveSharedServices($$AnimateRunner, $animateCss, $mdUtil);

  return ***REMOVED***
    enter: function(element, done) ***REMOVED***
      return showMessage(element);
    ***REMOVED***,

    leave: function(element, done) ***REMOVED***
      return hideMessage(element);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
ngMessageAnimation.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"];

function showInputMessages(element, done) ***REMOVED***
  var animators = [], animator;
  var messages = getMessagesElement(element);

  angular.forEach(messages.children(), function(child) ***REMOVED***
    animator = showMessage(angular.element(child));

    animators.push(animator.start());
  ***REMOVED***);

  $$AnimateRunner.all(animators, done);
***REMOVED***

function hideInputMessages(element, done) ***REMOVED***
  var animators = [], animator;
  var messages = getMessagesElement(element);

  angular.forEach(messages.children(), function(child) ***REMOVED***
    animator = hideMessage(angular.element(child));

    animators.push(animator.start());
  ***REMOVED***);

  $$AnimateRunner.all(animators, done);
***REMOVED***

function showMessage(element) ***REMOVED***
  var height = parseInt(window.getComputedStyle(element[0]).height);
  var topMargin = parseInt(window.getComputedStyle(element[0]).marginTop);

  var messages = getMessagesElement(element);
  var container = getInputElement(element);

  // Check to see if the message is already visible so we can skip
  var alreadyVisible = (topMargin > -height);

  // If we have the md-auto-hide class, the md-input-invalid animation will fire, so we can skip
  if (alreadyVisible || (messages.hasClass('md-auto-hide') && !container.hasClass('md-input-invalid'))) ***REMOVED***
    return $animateCss(element, ***REMOVED******REMOVED***);
  ***REMOVED***

  return $animateCss(element, ***REMOVED***
    event: 'enter',
    structural: true,
    from: ***REMOVED***"opacity": 0, "margin-top": -height + "px"***REMOVED***,
    to: ***REMOVED***"opacity": 1, "margin-top": "0"***REMOVED***,
    duration: 0.3
  ***REMOVED***);
***REMOVED***

function hideMessage(element) ***REMOVED***
  var height = element[0].offsetHeight;
  var styles = window.getComputedStyle(element[0]);
  //var styles = ***REMOVED*** opacity: element.css('opacity') ***REMOVED***;

  // If we are already hidden, just return an empty animation
  if (styles.opacity == 0) ***REMOVED***
    return $animateCss(element, ***REMOVED******REMOVED***);
  ***REMOVED***

  // Otherwise, animate
  return $animateCss(element, ***REMOVED***
    event: 'leave',
    structural: true,
    from: ***REMOVED***"opacity": 1, "margin-top": 0***REMOVED***,
    to: ***REMOVED***"opacity": 0, "margin-top": -height + "px"***REMOVED***,
    duration: 0.3
  ***REMOVED***);
***REMOVED***

function getInputElement(element) ***REMOVED***
  var inputContainer = element.controller('mdInputContainer');

  return inputContainer.element;
***REMOVED***

function getMessagesElement(element) ***REMOVED***
  // If we are a ng-message element, we need to traverse up the DOM tree
  if (element.hasClass('md-input-message-animation')) ***REMOVED***
    return angular.element($mdUtil.getClosest(element, function(node) ***REMOVED***
      return node.classList.contains('md-input-messages-animation');
    ***REMOVED***));
  ***REMOVED***

  // Otherwise, we can traverse down
  return angular.element(element[0].querySelector('.md-input-messages-animation'));
***REMOVED***

function saveSharedServices(_$$AnimateRunner_, _$animateCss_, _$mdUtil_) ***REMOVED***
  $$AnimateRunner = _$$AnimateRunner_;
  $animateCss = _$animateCss_;
  $mdUtil = _$mdUtil_;
***REMOVED***

***REMOVED***)(window, window.angular);
/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.fabShared');
goog.require('ngmaterial.core');
(function() ***REMOVED***
  'use strict';

  angular.module('material.components.fabShared', ['material.core'])
    .controller('MdFabController', MdFabController);

  function MdFabController($scope, $element, $animate, $mdUtil, $mdConstant, $timeout) ***REMOVED***
    var vm = this;

    // NOTE: We use async eval(s) below to avoid conflicts with any existing digest loops

    vm.open = function() ***REMOVED***
      $scope.$evalAsync("vm.isOpen = true");
    ***REMOVED***;

    vm.close = function() ***REMOVED***
      // Async eval to avoid conflicts with existing digest loops
      $scope.$evalAsync("vm.isOpen = false");

      // Focus the trigger when the element closes so users can still tab to the next item
      $element.find('md-fab-trigger')[0].focus();
    ***REMOVED***;

    // Toggle the open/close state when the trigger is clicked
    vm.toggle = function() ***REMOVED***
      $scope.$evalAsync("vm.isOpen = !vm.isOpen");
    ***REMOVED***;

    setupDefaults();
    setupListeners();
    setupWatchers();

    var initialAnimationAttempts = 0;
    fireInitialAnimations();

    function setupDefaults() ***REMOVED***
      // Set the default direction to 'down' if none is specified
      vm.direction = vm.direction || 'down';

      // Set the default to be closed
      vm.isOpen = vm.isOpen || false;

      // Start the keyboard interaction at the first action
      resetActionIndex();

      // Add an animations waiting class so we know not to run
      $element.addClass('md-animations-waiting');
    ***REMOVED***

    function setupListeners() ***REMOVED***
      var eventTypes = [
        'click', 'focusin', 'focusout'
      ];

      // Add our listeners
      angular.forEach(eventTypes, function(eventType) ***REMOVED***
        $element.on(eventType, parseEvents);
      ***REMOVED***);

      // Remove our listeners when destroyed
      $scope.$on('$destroy', function() ***REMOVED***
        angular.forEach(eventTypes, function(eventType) ***REMOVED***
          $element.off(eventType, parseEvents);
        ***REMOVED***);

        // remove any attached keyboard handlers in case element is removed while
        // speed dial is open
        disableKeyboard();
      ***REMOVED***);
    ***REMOVED***

    var closeTimeout;
    function parseEvents(event) ***REMOVED***
      // If the event is a click, just handle it
      if (event.type == 'click') ***REMOVED***
        handleItemClick(event);
      ***REMOVED***

      // If we focusout, set a timeout to close the element
      if (event.type == 'focusout' && !closeTimeout) ***REMOVED***
        closeTimeout = $timeout(function() ***REMOVED***
          vm.close();
        ***REMOVED***, 100, false);
      ***REMOVED***

      // If we see a focusin and there is a timeout about to run, cancel it so we stay open
      if (event.type == 'focusin' && closeTimeout) ***REMOVED***
        $timeout.cancel(closeTimeout);
        closeTimeout = null;
      ***REMOVED***
    ***REMOVED***

    function resetActionIndex() ***REMOVED***
      vm.currentActionIndex = -1;
    ***REMOVED***

    function setupWatchers() ***REMOVED***
      // Watch for changes to the direction and update classes/attributes
      $scope.$watch('vm.direction', function(newDir, oldDir) ***REMOVED***
        // Add the appropriate classes so we can target the direction in the CSS
        $animate.removeClass($element, 'md-' + oldDir);
        $animate.addClass($element, 'md-' + newDir);

        // Reset the action index since it may have changed
        resetActionIndex();
      ***REMOVED***);

      var trigger, actions;

      // Watch for changes to md-open
      $scope.$watch('vm.isOpen', function(isOpen) ***REMOVED***
        // Reset the action index since it may have changed
        resetActionIndex();

        // We can't get the trigger/actions outside of the watch because the component hasn't been
        // linked yet, so we wait until the first watch fires to cache them.
        if (!trigger || !actions) ***REMOVED***
          trigger = getTriggerElement();
          actions = getActionsElement();
        ***REMOVED***

        if (isOpen) ***REMOVED***
          enableKeyboard();
        ***REMOVED*** else ***REMOVED***
          disableKeyboard();
        ***REMOVED***

        var toAdd = isOpen ? 'md-is-open' : '';
        var toRemove = isOpen ? '' : 'md-is-open';

        // Set the proper ARIA attributes
        trigger.attr('aria-haspopup', true);
        trigger.attr('aria-expanded', isOpen);
        actions.attr('aria-hidden', !isOpen);

        // Animate the CSS classes
        $animate.setClass($element, toAdd, toRemove);
      ***REMOVED***);
    ***REMOVED***

    function fireInitialAnimations() ***REMOVED***
      // If the element is actually visible on the screen
      if ($element[0].scrollHeight > 0) ***REMOVED***
        // Fire our animation
        $animate.addClass($element, '_md-animations-ready').then(function() ***REMOVED***
          // Remove the waiting class
          $element.removeClass('md-animations-waiting');
        ***REMOVED***);
      ***REMOVED***

      // Otherwise, try for up to 1 second before giving up
      else if (initialAnimationAttempts < 10) ***REMOVED***
        $timeout(fireInitialAnimations, 100);

        // Increment our counter
        initialAnimationAttempts = initialAnimationAttempts + 1;
      ***REMOVED***
    ***REMOVED***

    function enableKeyboard() ***REMOVED***
      $element.on('keydown', keyPressed);

      // On the next tick, setup a check for outside clicks; we do this on the next tick to avoid
      // clicks/touches that result in the isOpen attribute changing (e.g. a bound radio button)
      $mdUtil.nextTick(function() ***REMOVED***
        angular.element(document).on('click touchend', checkForOutsideClick);
      ***REMOVED***);

      // TODO: On desktop, we should be able to reset the indexes so you cannot tab through, but
      // this breaks accessibility, especially on mobile, since you have no arrow keys to press
      //resetActionTabIndexes();
    ***REMOVED***

    function disableKeyboard() ***REMOVED***
      $element.off('keydown', keyPressed);
      angular.element(document).off('click touchend', checkForOutsideClick);
    ***REMOVED***

    function checkForOutsideClick(event) ***REMOVED***
      if (event.target) ***REMOVED***
        var closestTrigger = $mdUtil.getClosest(event.target, 'md-fab-trigger');
        var closestActions = $mdUtil.getClosest(event.target, 'md-fab-actions');

        if (!closestTrigger && !closestActions) ***REMOVED***
          vm.close();
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    function keyPressed(event) ***REMOVED***
      switch (event.which) ***REMOVED***
        case $mdConstant.KEY_CODE.ESCAPE: vm.close(); event.preventDefault(); return false;
        case $mdConstant.KEY_CODE.LEFT_ARROW: doKeyLeft(event); return false;
        case $mdConstant.KEY_CODE.UP_ARROW: doKeyUp(event); return false;
        case $mdConstant.KEY_CODE.RIGHT_ARROW: doKeyRight(event); return false;
        case $mdConstant.KEY_CODE.DOWN_ARROW: doKeyDown(event); return false;
      ***REMOVED***
    ***REMOVED***

    function doActionPrev(event) ***REMOVED***
      focusAction(event, -1);
    ***REMOVED***

    function doActionNext(event) ***REMOVED***
      focusAction(event, 1);
    ***REMOVED***

    function focusAction(event, direction) ***REMOVED***
      var actions = resetActionTabIndexes();

      // Increment/decrement the counter with restrictions
      vm.currentActionIndex = vm.currentActionIndex + direction;
      vm.currentActionIndex = Math.min(actions.length - 1, vm.currentActionIndex);
      vm.currentActionIndex = Math.max(0, vm.currentActionIndex);

      // Focus the element
      var focusElement =  angular.element(actions[vm.currentActionIndex]).children()[0];
      angular.element(focusElement).attr('tabindex', 0);
      focusElement.focus();

      // Make sure the event doesn't bubble and cause something else
      event.preventDefault();
      event.stopImmediatePropagation();
    ***REMOVED***

    function resetActionTabIndexes() ***REMOVED***
      // Grab all of the actions
      var actions = getActionsElement()[0].querySelectorAll('.md-fab-action-item');

      // Disable all other actions for tabbing
      angular.forEach(actions, function(action) ***REMOVED***
        angular.element(angular.element(action).children()[0]).attr('tabindex', -1);
      ***REMOVED***);

      return actions;
    ***REMOVED***

    function doKeyLeft(event) ***REMOVED***
      if (vm.direction === 'left') ***REMOVED***
        doActionNext(event);
      ***REMOVED*** else ***REMOVED***
        doActionPrev(event);
      ***REMOVED***
    ***REMOVED***

    function doKeyUp(event) ***REMOVED***
      if (vm.direction === 'down') ***REMOVED***
        doActionPrev(event);
      ***REMOVED*** else ***REMOVED***
        doActionNext(event);
      ***REMOVED***
    ***REMOVED***

    function doKeyRight(event) ***REMOVED***
      if (vm.direction === 'left') ***REMOVED***
        doActionPrev(event);
      ***REMOVED*** else ***REMOVED***
        doActionNext(event);
      ***REMOVED***
    ***REMOVED***

    function doKeyDown(event) ***REMOVED***
      if (vm.direction === 'up') ***REMOVED***
        doActionPrev(event);
      ***REMOVED*** else ***REMOVED***
        doActionNext(event);
      ***REMOVED***
    ***REMOVED***

    function isTrigger(element) ***REMOVED***
      return $mdUtil.getClosest(element, 'md-fab-trigger');
    ***REMOVED***

    function isAction(element) ***REMOVED***
      return $mdUtil.getClosest(element, 'md-fab-actions');
    ***REMOVED***

    function handleItemClick(event) ***REMOVED***
      if (isTrigger(event.target)) ***REMOVED***
        vm.toggle();
      ***REMOVED***

      if (isAction(event.target)) ***REMOVED***
        vm.close();
      ***REMOVED***
    ***REMOVED***

    function getTriggerElement() ***REMOVED***
      return $element.find('md-fab-trigger');
    ***REMOVED***

    function getActionsElement() ***REMOVED***
      return $element.find('md-fab-actions');
    ***REMOVED***
  ***REMOVED***
  MdFabController.$inject = ["$scope", "$element", "$animate", "$mdUtil", "$mdConstant", "$timeout"];
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  /**
   * The duration of the CSS animation in milliseconds.
   *
   * @type ***REMOVED***number***REMOVED***
   */
  var cssAnimationDuration = 300;

  /**
   * @ngdoc module
   * @name material.components.fabSpeedDial
   */
  angular
    // Declare our module
    .module('material.components.fabSpeedDial', [
      'material.core',
      'material.components.fabShared',
      'material.components.fabActions'
    ])

    // Register our directive
    .directive('mdFabSpeedDial', MdFabSpeedDialDirective)

    // Register our custom animations
    .animation('.md-fling', MdFabSpeedDialFlingAnimation)
    .animation('.md-scale', MdFabSpeedDialScaleAnimation)

    // Register a service for each animation so that we can easily inject them into unit tests
    .service('mdFabSpeedDialFlingAnimation', MdFabSpeedDialFlingAnimation)
    .service('mdFabSpeedDialScaleAnimation', MdFabSpeedDialScaleAnimation);

  /**
   * @ngdoc directive
   * @name mdFabSpeedDial
   * @module material.components.fabSpeedDial
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-speed-dial>` directive is used to present a series of popup elements (usually
   * `<md-button>`s) for quick access to common actions.
   *
   * There are currently two animations available by applying one of the following classes to
   * the component:
   *
   *  - `md-fling` - The speed dial items appear from underneath the trigger and move into their
   *    appropriate positions.
   *  - `md-scale` - The speed dial items appear in their proper places by scaling from 0% to 100%.
   *
   * You may also easily position the trigger by applying one one of the following classes to the
   * `<md-fab-speed-dial>` element:
   *  - `md-fab-top-left`
   *  - `md-fab-top-right`
   *  - `md-fab-bottom-left`
   *  - `md-fab-bottom-right`
   *
   * These CSS classes use `position: absolute`, so you need to ensure that the container element
   * also uses `position: absolute` or `position: relative` in order for them to work.
   *
   * Additionally, you may use the standard `ng-mouseenter` and `ng-mouseleave` directives to
   * open or close the speed dial. However, if you wish to allow users to hover over the empty
   * space where the actions will appear, you must also add the `md-hover-full` class to the speed
   * dial element. Without this, the hover effect will only occur on top of the trigger.
   *
   * See the demos for more information.
   *
   * ## Troubleshooting
   *
   * If your speed dial shows the closing animation upon launch, you may need to use `ng-cloak` on
   * the parent container to ensure that it is only visible once ready. We have plans to remove this
   * necessity in the future.
   *
   * @usage
   * <hljs lang="html">
   * <md-fab-speed-dial md-direction="up" class="md-fling">
   *   <md-fab-trigger>
   *     <md-button aria-label="Add..."><md-icon icon="/img/icons/plus.svg"></md-icon></md-button>
   *   </md-fab-trigger>
   *
   *   <md-fab-actions>
   *     <md-button aria-label="Add User">
   *       <md-icon icon="/img/icons/user.svg"></md-icon>
   *     </md-button>
   *
   *     <md-button aria-label="Add Group">
   *       <md-icon icon="/img/icons/group.svg"></md-icon>
   *     </md-button>
   *   </md-fab-actions>
   * </md-fab-speed-dial>
   * </hljs>
   *
   * @param ***REMOVED***string***REMOVED*** md-direction From which direction you would like the speed dial to appear
   * relative to the trigger element.
   * @param ***REMOVED***expression=***REMOVED*** md-open Programmatically control whether or not the speed-dial is visible.
   */
  function MdFabSpeedDialDirective() ***REMOVED***
    return ***REMOVED***
      restrict: 'E',

      scope: ***REMOVED***
        direction: '@?mdDirection',
        isOpen: '=?mdOpen'
      ***REMOVED***,

      bindToController: true,
      controller: 'MdFabController',
      controllerAs: 'vm',

      link: FabSpeedDialLink
    ***REMOVED***;

    function FabSpeedDialLink(scope, element) ***REMOVED***
      // Prepend an element to hold our CSS variables so we can use them in the animations below
      element.prepend('<div class="_md-css-variables"></div>');
    ***REMOVED***
  ***REMOVED***

  function MdFabSpeedDialFlingAnimation($timeout) ***REMOVED***
    function delayDone(done) ***REMOVED*** $timeout(done, cssAnimationDuration, false); ***REMOVED***

    function runAnimation(element) ***REMOVED***
      // Don't run if we are still waiting and we are not ready
      if (element.hasClass('md-animations-waiting') && !element.hasClass('_md-animations-ready')) ***REMOVED***
        return;
      ***REMOVED***

      var el = element[0];
      var ctrl = element.controller('mdFabSpeedDial');
      var items = el.querySelectorAll('.md-fab-action-item');

      // Grab our trigger element
      var triggerElement = el.querySelector('md-fab-trigger');

      // Grab our element which stores CSS variables
      var variablesElement = el.querySelector('._md-css-variables');

      // Setup JS variables based on our CSS variables
      var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      // Always reset the items to their natural position/state
      angular.forEach(items, function(item, index) ***REMOVED***
        var styles = item.style;

        styles.transform = styles.webkitTransform = '';
        styles.transitionDelay = '';
        styles.opacity = 1;

        // Make the items closest to the trigger have the highest z-index
        styles.zIndex = (items.length - index) + startZIndex;
      ***REMOVED***);

      // Set the trigger to be above all of the actions so they disappear behind it.
      triggerElement.style.zIndex = startZIndex + items.length + 1;

      // If the control is closed, hide the items behind the trigger
      if (!ctrl.isOpen) ***REMOVED***
        angular.forEach(items, function(item, index) ***REMOVED***
          var newPosition, axis;
          var styles = item.style;

          // Make sure to account for differences in the dimensions of the trigger verses the items
          // so that we can properly center everything; this helps hide the item's shadows behind
          // the trigger.
          var triggerItemHeightOffset = (triggerElement.clientHeight - item.clientHeight) / 2;
          var triggerItemWidthOffset = (triggerElement.clientWidth - item.clientWidth) / 2;

          switch (ctrl.direction) ***REMOVED***
            case 'up':
              newPosition = (item.scrollHeight * (index + 1) + triggerItemHeightOffset);
              axis = 'Y';
              break;
            case 'down':
              newPosition = -(item.scrollHeight * (index + 1) + triggerItemHeightOffset);
              axis = 'Y';
              break;
            case 'left':
              newPosition = (item.scrollWidth * (index + 1) + triggerItemWidthOffset);
              axis = 'X';
              break;
            case 'right':
              newPosition = -(item.scrollWidth * (index + 1) + triggerItemWidthOffset);
              axis = 'X';
              break;
          ***REMOVED***

          var newTranslate = 'translate' + axis + '(' + newPosition + 'px)';

          styles.transform = styles.webkitTransform = newTranslate;
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    return ***REMOVED***
      addClass: function(element, className, done) ***REMOVED***
        if (element.hasClass('md-fling')) ***REMOVED***
          runAnimation(element);
          delayDone(done);
        ***REMOVED*** else ***REMOVED***
          done();
        ***REMOVED***
      ***REMOVED***,
      removeClass: function(element, className, done) ***REMOVED***
        runAnimation(element);
        delayDone(done);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  MdFabSpeedDialFlingAnimation.$inject = ["$timeout"];

  function MdFabSpeedDialScaleAnimation($timeout) ***REMOVED***
    function delayDone(done) ***REMOVED*** $timeout(done, cssAnimationDuration, false); ***REMOVED***

    var delay = 65;

    function runAnimation(element) ***REMOVED***
      var el = element[0];
      var ctrl = element.controller('mdFabSpeedDial');
      var items = el.querySelectorAll('.md-fab-action-item');

      // Grab our element which stores CSS variables
      var variablesElement = el.querySelector('._md-css-variables');

      // Setup JS variables based on our CSS variables
      var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      // Always reset the items to their natural position/state
      angular.forEach(items, function(item, index) ***REMOVED***
        var styles = item.style,
          offsetDelay = index * delay;

        styles.opacity = ctrl.isOpen ? 1 : 0;
        styles.transform = styles.webkitTransform = ctrl.isOpen ? 'scale(1)' : 'scale(0)';
        styles.transitionDelay = (ctrl.isOpen ? offsetDelay : (items.length - offsetDelay)) + 'ms';

        // Make the items closest to the trigger have the highest z-index
        styles.zIndex = (items.length - index) + startZIndex;
      ***REMOVED***);
    ***REMOVED***

    return ***REMOVED***
      addClass: function(element, className, done) ***REMOVED***
        runAnimation(element);
        delayDone(done);
      ***REMOVED***,

      removeClass: function(element, className, done) ***REMOVED***
        runAnimation(element);
        delayDone(done);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  MdFabSpeedDialScaleAnimation.$inject = ["$timeout"];
***REMOVED***)();

ngmaterial.components.fabShared = angular.module("material.components.fabShared");
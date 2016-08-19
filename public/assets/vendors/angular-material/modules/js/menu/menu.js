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
 * @name material.components.menu
 */

angular.module('material.components.menu', [
  'material.core',
  'material.components.backdrop'
]);



angular
    .module('material.components.menu')
    .controller('mdMenuCtrl', MenuController);

/**
 * ngInject
 */
function MenuController($mdMenu, $attrs, $element, $scope, $mdUtil, $timeout, $rootScope, $q) ***REMOVED***

  var prefixer = $mdUtil.prefixer();
  var menuContainer;
  var self = this;
  var triggerElement;

  this.nestLevel = parseInt($attrs.mdNestLevel, 10) || 0;

  /**
   * Called by our linking fn to provide access to the menu-content
   * element removed during link
   */
  this.init = function init(setMenuContainer, opts) ***REMOVED***
    opts = opts || ***REMOVED******REMOVED***;
    menuContainer = setMenuContainer;

    // Default element for ARIA attributes has the ngClick or ngMouseenter expression
    triggerElement = $element[0].querySelector(prefixer.buildSelector(['ng-click', 'ng-mouseenter']));
    triggerElement.setAttribute('aria-expanded', 'false');

    this.isInMenuBar = opts.isInMenuBar;
    this.nestedMenus = $mdUtil.nodesToArray(menuContainer[0].querySelectorAll('.md-nested-menu'));

    menuContainer.on('$mdInterimElementRemove', function() ***REMOVED***
      self.isOpen = false;
      $mdUtil.nextTick(function()***REMOVED*** self.onIsOpenChanged(self.isOpen);***REMOVED***);
    ***REMOVED***);
    $mdUtil.nextTick(function()***REMOVED*** self.onIsOpenChanged(self.isOpen);***REMOVED***);

    var menuContainerId = 'menu_container_' + $mdUtil.nextUid();
    menuContainer.attr('id', menuContainerId);
    angular.element(triggerElement).attr(***REMOVED***
      'aria-owns': menuContainerId,
      'aria-haspopup': 'true'
    ***REMOVED***);

    $scope.$on('$destroy', angular.bind(this, function() ***REMOVED***
      this.disableHoverListener();
      $mdMenu.destroy();
    ***REMOVED***));

    menuContainer.on('$destroy', function() ***REMOVED***
      $mdMenu.destroy();
    ***REMOVED***);
  ***REMOVED***;

  var openMenuTimeout, menuItems, deregisterScopeListeners = [];
  this.enableHoverListener = function() ***REMOVED***
    deregisterScopeListeners.push($rootScope.$on('$mdMenuOpen', function(event, el) ***REMOVED***
      if (menuContainer[0].contains(el[0])) ***REMOVED***
        self.currentlyOpenMenu = el.controller('mdMenu');
        self.isAlreadyOpening = false;
        self.currentlyOpenMenu.registerContainerProxy(self.triggerContainerProxy.bind(self));
      ***REMOVED***
    ***REMOVED***));
    deregisterScopeListeners.push($rootScope.$on('$mdMenuClose', function(event, el) ***REMOVED***
      if (menuContainer[0].contains(el[0])) ***REMOVED***
        self.currentlyOpenMenu = undefined;
      ***REMOVED***
    ***REMOVED***));
    menuItems = angular.element($mdUtil.nodesToArray(menuContainer[0].children[0].children));
    menuItems.on('mouseenter', self.handleMenuItemHover);
    menuItems.on('mouseleave', self.handleMenuItemMouseLeave);
  ***REMOVED***;

  this.disableHoverListener = function() ***REMOVED***
    while (deregisterScopeListeners.length) ***REMOVED***
      deregisterScopeListeners.shift()();
    ***REMOVED***
    menuItems && menuItems.off('mouseenter', self.handleMenuItemHover);
    menuItems && menuItems.off('mouseleave', self.handleMenuItemMouseLeave);
  ***REMOVED***;

  this.handleMenuItemHover = function(event) ***REMOVED***
    if (self.isAlreadyOpening) return;
    var nestedMenu = (
      event.target.querySelector('md-menu')
        || $mdUtil.getClosest(event.target, 'MD-MENU')
    );
    openMenuTimeout = $timeout(function() ***REMOVED***
      if (nestedMenu) ***REMOVED***
        nestedMenu = angular.element(nestedMenu).controller('mdMenu');
      ***REMOVED***

      if (self.currentlyOpenMenu && self.currentlyOpenMenu != nestedMenu) ***REMOVED***
        var closeTo = self.nestLevel + 1;
        self.currentlyOpenMenu.close(true, ***REMOVED*** closeTo: closeTo ***REMOVED***);
        self.isAlreadyOpening = !!nestedMenu;
        nestedMenu && nestedMenu.open();
      ***REMOVED*** else if (nestedMenu && !nestedMenu.isOpen && nestedMenu.open) ***REMOVED***
        self.isAlreadyOpening = !!nestedMenu;
        nestedMenu && nestedMenu.open();
      ***REMOVED***
    ***REMOVED***, nestedMenu ? 100 : 250);
    var focusableTarget = event.currentTarget.querySelector('.md-button:not([disabled])');
    focusableTarget && focusableTarget.focus();
  ***REMOVED***;

  this.handleMenuItemMouseLeave = function() ***REMOVED***
    if (openMenuTimeout) ***REMOVED***
      $timeout.cancel(openMenuTimeout);
      openMenuTimeout = undefined;
    ***REMOVED***
  ***REMOVED***;


  /**
   * Uses the $mdMenu interim element service to open the menu contents
   */
  this.open = function openMenu(ev) ***REMOVED***
    ev && ev.stopPropagation();
    ev && ev.preventDefault();
    if (self.isOpen) return;
    self.enableHoverListener();
    self.isOpen = true;
    $mdUtil.nextTick(function()***REMOVED*** self.onIsOpenChanged(self.isOpen);***REMOVED***);
    triggerElement = triggerElement || (ev ? ev.target : $element[0]);
    triggerElement.setAttribute('aria-expanded', 'true');
    $scope.$emit('$mdMenuOpen', $element);
    $mdMenu.show(***REMOVED***
      scope: $scope,
      mdMenuCtrl: self,
      nestLevel: self.nestLevel,
      element: menuContainer,
      target: triggerElement,
      preserveElement: true,
      parent: 'body'
    ***REMOVED***).finally(function() ***REMOVED***
      triggerElement.setAttribute('aria-expanded', 'false');
      self.disableHoverListener();
    ***REMOVED***);
  ***REMOVED***;

  // Expose a open function to the child scope for html to use
  $scope.$mdOpenMenu = this.open;

  this.onIsOpenChanged = function(isOpen) ***REMOVED***
    if (isOpen) ***REMOVED***
      menuContainer.attr('aria-hidden', 'false');
      $element[0].classList.add('md-open');
      angular.forEach(self.nestedMenus, function(el) ***REMOVED***
        el.classList.remove('md-open');
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      menuContainer.attr('aria-hidden', 'true');
      $element[0].classList.remove('md-open');
    ***REMOVED***
    $scope.$mdMenuIsOpen = self.isOpen;
  ***REMOVED***;

  this.focusMenuContainer = function focusMenuContainer() ***REMOVED***
    var focusTarget = menuContainer[0]
      .querySelector(prefixer.buildSelector(['md-menu-focus-target', 'md-autofocus']));

    if (!focusTarget) focusTarget = menuContainer[0].querySelector('.md-button');
    focusTarget.focus();
  ***REMOVED***;

  this.registerContainerProxy = function registerContainerProxy(handler) ***REMOVED***
    this.containerProxy = handler;
  ***REMOVED***;

  this.triggerContainerProxy = function triggerContainerProxy(ev) ***REMOVED***
    this.containerProxy && this.containerProxy(ev);
  ***REMOVED***;

  this.destroy = function() ***REMOVED***
    return self.isOpen ? $mdMenu.destroy() : $q.when(false);
  ***REMOVED***;

  // Use the $mdMenu interim element service to close the menu contents
  this.close = function closeMenu(skipFocus, closeOpts) ***REMOVED***
    if ( !self.isOpen ) return;
    self.isOpen = false;
    $mdUtil.nextTick(function()***REMOVED*** self.onIsOpenChanged(self.isOpen);***REMOVED***);

    var eventDetails = angular.extend(***REMOVED******REMOVED***, closeOpts, ***REMOVED*** skipFocus: skipFocus ***REMOVED***);
    $scope.$emit('$mdMenuClose', $element, eventDetails);
    $mdMenu.hide(null, closeOpts);

    if (!skipFocus) ***REMOVED***
      var el = self.restoreFocusTo || $element.find('button')[0];
      if (el instanceof angular.element) el = el[0];
      if (el) el.focus();
    ***REMOVED***
  ***REMOVED***;

  /**
   * Build a nice object out of our string attribute which specifies the
   * target mode for left and top positioning
   */
  this.positionMode = function positionMode() ***REMOVED***
    var attachment = ($attrs.mdPositionMode || 'target').split(' ');

    // If attachment is a single item, duplicate it for our second value.
    // ie. 'target' -> 'target target'
    if (attachment.length == 1) ***REMOVED***
      attachment.push(attachment[0]);
    ***REMOVED***

    return ***REMOVED***
      left: attachment[0],
      top: attachment[1]
    ***REMOVED***;
  ***REMOVED***;

  /**
   * Build a nice object out of our string attribute which specifies
   * the offset of top and left in pixels.
   */
  this.offsets = function offsets() ***REMOVED***
    var position = ($attrs.mdOffset || '0 0').split(' ').map(parseFloat);
    if (position.length == 2) ***REMOVED***
      return ***REMOVED***
        left: position[0],
        top: position[1]
      ***REMOVED***;
    ***REMOVED*** else if (position.length == 1) ***REMOVED***
      return ***REMOVED***
        top: position[0],
        left: position[0]
      ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
      throw Error('Invalid offsets specified. Please follow format <x, y> or <n>');
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MenuController.$inject = ["$mdMenu", "$attrs", "$element", "$scope", "$mdUtil", "$timeout", "$rootScope", "$q"];

/**
 * @ngdoc directive
 * @name mdMenu
 * @module material.components.menu
 * @restrict E
 * @description
 *
 * Menus are elements that open when clicked. They are useful for displaying
 * additional options within the context of an action.
 *
 * Every `md-menu` must specify exactly two child elements. The first element is what is
 * left in the DOM and is used to open the menu. This element is called the trigger element.
 * The trigger element's scope has access to `$mdOpenMenu($event)`
 * which it may call to open the menu. By passing $event as argument, the
 * corresponding event is stopped from propagating up the DOM-tree.
 *
 * The second element is the `md-menu-content` element which represents the
 * contents of the menu when it is open. Typically this will contain `md-menu-item`s,
 * but you can do custom content as well.
 *
 * <hljs lang="html">
 * <md-menu>
 *  <!-- Trigger element is a md-button with an icon -->
 *  <md-button ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="Open sample menu">
 *    <md-icon md-svg-icon="call:phone"></md-icon>
 *  </md-button>
 *  <md-menu-content>
 *    <md-menu-item><md-button ng-click="doSomething()">Do Something</md-button></md-menu-item>
 *  </md-menu-content>
 * </md-menu>
 * </hljs>

 * ## Sizing Menus
 *
 * The width of the menu when it is open may be specified by specifying a `width`
 * attribute on the `md-menu-content` element.
 * See the [Material Design Spec](http://www.google.com/design/spec/components/menus.html#menus-specs)
 * for more information.
 *
 *
 * ## Aligning Menus
 *
 * When a menu opens, it is important that the content aligns with the trigger element.
 * Failure to align menus can result in jarring experiences for users as content
 * suddenly shifts. To help with this, `md-menu` provides serveral APIs to help
 * with alignment.
 *
 * ### Target Mode
 *
 * By default, `md-menu` will attempt to align the `md-menu-content` by aligning
 * designated child elements in both the trigger and the menu content.
 *
 * To specify the alignment element in the `trigger` you can use the `md-menu-origin`
 * attribute on a child element. If no `md-menu-origin` is specified, the `md-menu`
 * will be used as the origin element.
 *
 * Similarly, the `md-menu-content` may specify a `md-menu-align-target` for a
 * `md-menu-item` to specify the node that it should try and align with.
 *
 * In this example code, we specify an icon to be our origin element, and an
 * icon in our menu content to be our alignment target. This ensures that both
 * icons are aligned when the menu opens.
 *
 * <hljs lang="html">
 * <md-menu>
 *  <md-button ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="Open some menu">
 *    <md-icon md-menu-origin md-svg-icon="call:phone"></md-icon>
 *  </md-button>
 *  <md-menu-content>
 *    <md-menu-item>
 *      <md-button ng-click="doSomething()" aria-label="Do something">
 *        <md-icon md-menu-align-target md-svg-icon="call:phone"></md-icon>
 *        Do Something
 *      </md-button>
 *    </md-menu-item>
 *  </md-menu-content>
 * </md-menu>
 * </hljs>
 *
 * Sometimes we want to specify alignment on the right side of an element, for example
 * if we have a menu on the right side a toolbar, we want to right align our menu content.
 *
 * We can specify the origin by using the `md-position-mode` attribute on both
 * the `x` and `y` axis. Right now only the `x-axis` has more than one option.
 * You may specify the default mode of `target target` or
 * `target-right target` to specify a right-oriented alignment target. See the
 * position section of the demos for more examples.
 *
 * ### Menu Offsets
 *
 * It is sometimes unavoidable to need to have a deeper level of control for
 * the positioning of a menu to ensure perfect alignment. `md-menu` provides
 * the `md-offset` attribute to allow pixel level specificty of adjusting the
 * exact positioning.
 *
 * This offset is provided in the format of `x y` or `n` where `n` will be used
 * in both the `x` and `y` axis.
 *
 * For example, to move a menu by `2px` from the top, we can use:
 * <hljs lang="html">
 * <md-menu md-offset="2 0">
 *   <!-- menu-content -->
 * </md-menu>
 * </hljs>
 *
 * ### Auto Focus
 * By default, when a menu opens, `md-menu` focuses the first button in the menu content.
 * 
 * But sometimes you would like to focus another specific menu item instead of the first.<br/>
 * This can be done by applying the `md-autofocus` directive on the given element.
 *
 * <hljs lang="html">
 * <md-menu-item>
 *   <md-button md-autofocus ng-click="doSomething()">
 *     Auto Focus
 *   </md-button>
 * </md-menu-item>
 * </hljs>
 *
 *
 * ### Preventing close
 *
 * Sometimes you would like to be able to click on a menu item without having the menu
 * close. To do this, ngMaterial exposes the `md-prevent-menu-close` attribute which
 * can be added to a button inside a menu to stop the menu from automatically closing.
 * You can then close the menu programatically by injecting `$mdMenu` and calling 
 * `$mdMenu.hide()`.
 *
 * <hljs lang="html">
 * <md-menu-item>
 *   <md-button ng-click="doSomething()" aria-label="Do something" md-prevent-menu-close="md-prevent-menu-close">
 *     <md-icon md-menu-align-target md-svg-icon="call:phone"></md-icon>
 *     Do Something
 *   </md-button>
 * </md-menu-item>
 * </hljs>
 *
 * @usage
 * <hljs lang="html">
 * <md-menu>
 *  <md-button ng-click="$mdOpenMenu($event)" class="md-icon-button">
 *    <md-icon md-svg-icon="call:phone"></md-icon>
 *  </md-button>
 *  <md-menu-content>
 *    <md-menu-item><md-button ng-click="doSomething()">Do Something</md-button></md-menu-item>
 *  </md-menu-content>
 * </md-menu>
 * </hljs>
 *
 * @param ***REMOVED***string***REMOVED*** md-position-mode The position mode in the form of
 *           `x`, `y`. Default value is `target`,`target`. Right now the `x` axis
 *           also suppports `target-right`.
 * @param ***REMOVED***string***REMOVED*** md-offset An offset to apply to the dropdown after positioning
 *           `x`, `y`. Default value is `0`,`0`.
 *
 */

angular
    .module('material.components.menu')
    .directive('mdMenu', MenuDirective);

/**
 * ngInject
 */
function MenuDirective($mdUtil) ***REMOVED***
  var INVALID_PREFIX = 'Invalid HTML for md-menu: ';
  return ***REMOVED***
    restrict: 'E',
    require: ['mdMenu', '?^mdMenuBar'],
    controller: 'mdMenuCtrl', // empty function to be built by link
    scope: true,
    compile: compile
  ***REMOVED***;

  function compile(templateElement) ***REMOVED***
    templateElement.addClass('md-menu');
    var triggerElement = templateElement.children()[0];
    var prefixer = $mdUtil.prefixer();

    if (!prefixer.hasAttribute(triggerElement, 'ng-click')) ***REMOVED***
      triggerElement = triggerElement
          .querySelector(prefixer.buildSelector(['ng-click', 'ng-mouseenter'])) || triggerElement;
    ***REMOVED***
    if (triggerElement && (
      triggerElement.nodeName == 'MD-BUTTON' ||
      triggerElement.nodeName == 'BUTTON'
    ) && !triggerElement.hasAttribute('type')) ***REMOVED***
      triggerElement.setAttribute('type', 'button');
    ***REMOVED***

    if (templateElement.children().length != 2) ***REMOVED***
      throw Error(INVALID_PREFIX + 'Expected two children elements.');
    ***REMOVED***

    // Default element for ARIA attributes has the ngClick or ngMouseenter expression
    triggerElement && triggerElement.setAttribute('aria-haspopup', 'true');

    var nestedMenus = templateElement[0].querySelectorAll('md-menu');
    var nestingDepth = parseInt(templateElement[0].getAttribute('md-nest-level'), 10) || 0;
    if (nestedMenus) ***REMOVED***
      angular.forEach($mdUtil.nodesToArray(nestedMenus), function(menuEl) ***REMOVED***
        if (!menuEl.hasAttribute('md-position-mode')) ***REMOVED***
          menuEl.setAttribute('md-position-mode', 'cascade');
        ***REMOVED***
        menuEl.classList.add('_md-nested-menu');
        menuEl.setAttribute('md-nest-level', nestingDepth + 1);
      ***REMOVED***);
    ***REMOVED***
    return link;
  ***REMOVED***

  function link(scope, element, attr, ctrls) ***REMOVED***
    var mdMenuCtrl = ctrls[0];
    var isInMenuBar = ctrls[1] != undefined;
    // Move everything into a md-menu-container and pass it to the controller
    var menuContainer = angular.element( '<div class="_md md-open-menu-container md-whiteframe-z2"></div>');
    var menuContents = element.children()[1];

    element.addClass('_md');     // private md component indicator for styling

    if (!menuContents.hasAttribute('role')) ***REMOVED***
      menuContents.setAttribute('role', 'menu');
    ***REMOVED***
    menuContainer.append(menuContents);

    element.on('$destroy', function() ***REMOVED***
      menuContainer.remove();
    ***REMOVED***);

    element.append(menuContainer);
    menuContainer[0].style.display = 'none';
    mdMenuCtrl.init(menuContainer, ***REMOVED*** isInMenuBar: isInMenuBar ***REMOVED***);

  ***REMOVED***
***REMOVED***
MenuDirective.$inject = ["$mdUtil"];

angular
  .module('material.components.menu')
  .provider('$mdMenu', MenuProvider);

/*
 * Interim element provider for the menu.
 * Handles behavior for a menu while it is open, including:
 *    - handling animating the menu opening/closing
 *    - handling key/mouse events on the menu element
 *    - handling enabling/disabling scroll while the menu is open
 *    - handling redrawing during resizes and orientation changes
 *
 */

function MenuProvider($$interimElementProvider) ***REMOVED***
  var MENU_EDGE_MARGIN = 8;

  menuDefaultOptions.$inject = ["$mdUtil", "$mdTheming", "$mdConstant", "$document", "$window", "$q", "$$rAF", "$animateCss", "$animate"];
  return $$interimElementProvider('$mdMenu')
    .setDefaults(***REMOVED***
      methods: ['target'],
      options: menuDefaultOptions
    ***REMOVED***);

  /* ngInject */
  function menuDefaultOptions($mdUtil, $mdTheming, $mdConstant, $document, $window, $q, $$rAF, $animateCss, $animate) ***REMOVED***
    var prefixer = $mdUtil.prefixer();
    var animator = $mdUtil.dom.animator;

    return ***REMOVED***
      parent: 'body',
      onShow: onShow,
      onRemove: onRemove,
      hasBackdrop: true,
      disableParentScroll: true,
      skipCompile: true,
      preserveScope: true,
      skipHide: true,
      themable: true
    ***REMOVED***;

    /**
     * Show modal backdrop element...
     * @returns ***REMOVED***function(): void***REMOVED*** A function that removes this backdrop
     */
    function showBackdrop(scope, element, options) ***REMOVED***
      if (options.nestLevel) return angular.noop;

      // If we are not within a dialog...
      if (options.disableParentScroll && !$mdUtil.getClosest(options.target, 'MD-DIALOG')) ***REMOVED***
        // !! DO this before creating the backdrop; since disableScrollAround()
        //    configures the scroll offset; which is used by mdBackDrop postLink()
        options.restoreScroll = $mdUtil.disableScrollAround(options.element, options.parent);
      ***REMOVED*** else ***REMOVED***
        options.disableParentScroll = false;
      ***REMOVED***

      if (options.hasBackdrop) ***REMOVED***
        options.backdrop = $mdUtil.createBackdrop(scope, "md-menu-backdrop md-click-catcher");

        $animate.enter(options.backdrop, $document[0].body);
      ***REMOVED***

      /**
       * Hide and destroys the backdrop created by showBackdrop()
       */
      return function hideBackdrop() ***REMOVED***
        if (options.backdrop) options.backdrop.remove();
        if (options.disableParentScroll) options.restoreScroll();
      ***REMOVED***;
    ***REMOVED***

    /**
     * Removing the menu element from the DOM and remove all associated event listeners
     * and backdrop
     */
    function onRemove(scope, element, opts) ***REMOVED***
      opts.cleanupInteraction && opts.cleanupInteraction();
      opts.cleanupResizing();
      opts.hideBackdrop();

      // For navigation $destroy events, do a quick, non-animated removal,
      // but for normal closes (from clicks, etc) animate the removal

      return (opts.$destroy === true) ? detachAndClean() : animateRemoval().then( detachAndClean );

      /**
       * For normal closes, animate the removal.
       * For forced closes (like $destroy events), skip the animations
       */
      function animateRemoval() ***REMOVED***
        return $animateCss(element, ***REMOVED***addClass: 'md-leave'***REMOVED***).start();
      ***REMOVED***

      /**
       * Detach the element
       */
      function detachAndClean() ***REMOVED***
        element.removeClass('md-active');
        detachElement(element, opts);
        opts.alreadyOpen = false;
      ***REMOVED***

    ***REMOVED***

    /**
     * Inserts and configures the staged Menu element into the DOM, positioning it,
     * and wiring up various interaction events
     */
    function onShow(scope, element, opts) ***REMOVED***
      sanitizeAndConfigure(opts);

      // Wire up theming on our menu element
      $mdTheming.inherit(opts.menuContentEl, opts.target);

      // Register various listeners to move menu on resize/orientation change
      opts.cleanupResizing = startRepositioningOnResize();
      opts.hideBackdrop = showBackdrop(scope, element, opts);

      // Return the promise for when our menu is done animating in
      return showMenu()
        .then(function(response) ***REMOVED***
          opts.alreadyOpen = true;
          opts.cleanupInteraction = activateInteraction();
          return response;
        ***REMOVED***);

      /**
       * Place the menu into the DOM and call positioning related functions
       */
      function showMenu() ***REMOVED***
        opts.parent.append(element);
        element[0].style.display = '';

        return $q(function(resolve) ***REMOVED***
          var position = calculateMenuPosition(element, opts);

          element.removeClass('md-leave');

          // Animate the menu scaling, and opacity [from its position origin (default == top-left)]
          // to normal scale.
          $animateCss(element, ***REMOVED***
            addClass: 'md-active',
            from: animator.toCss(position),
            to: animator.toCss(***REMOVED***transform: ''***REMOVED***)
          ***REMOVED***)
          .start()
          .then(resolve);

        ***REMOVED***);
      ***REMOVED***

      /**
       * Check for valid opts and set some sane defaults
       */
      function sanitizeAndConfigure() ***REMOVED***
        if (!opts.target) ***REMOVED***
          throw Error(
            '$mdMenu.show() expected a target to animate from in options.target'
          );
        ***REMOVED***
        angular.extend(opts, ***REMOVED***
          alreadyOpen: false,
          isRemoved: false,
          target: angular.element(opts.target), //make sure it's not a naked dom node
          parent: angular.element(opts.parent),
          menuContentEl: angular.element(element[0].querySelector('md-menu-content'))
        ***REMOVED***);
      ***REMOVED***

      /**
       * Configure various resize listeners for screen changes
       */
      function startRepositioningOnResize() ***REMOVED***

        var repositionMenu = (function(target, options) ***REMOVED***
          return $$rAF.throttle(function() ***REMOVED***
            if (opts.isRemoved) return;
            var position = calculateMenuPosition(target, options);

            target.css(animator.toCss(position));
          ***REMOVED***);
        ***REMOVED***)(element, opts);

        $window.addEventListener('resize', repositionMenu);
        $window.addEventListener('orientationchange', repositionMenu);

        return function stopRepositioningOnResize() ***REMOVED***

          // Disable resizing handlers
          $window.removeEventListener('resize', repositionMenu);
          $window.removeEventListener('orientationchange', repositionMenu);

        ***REMOVED***
      ***REMOVED***

      /**
       * Activate interaction on the menu. Wire up keyboard listerns for
       * clicks, keypresses, backdrop closing, etc.
       */
      function activateInteraction() ***REMOVED***
        element.addClass('md-clickable');

        // close on backdrop click
        if (opts.backdrop) opts.backdrop.on('click', onBackdropClick);

        // Wire up keyboard listeners.
        // - Close on escape,
        // - focus next item on down arrow,
        // - focus prev item on up
        opts.menuContentEl.on('keydown', onMenuKeyDown);
        opts.menuContentEl[0].addEventListener('click', captureClickListener, true);

        // kick off initial focus in the menu on the first element
        var focusTarget = opts.menuContentEl[0]
          .querySelector(prefixer.buildSelector(['md-menu-focus-target', 'md-autofocus']));

        if ( !focusTarget ) ***REMOVED***
          var firstChild = opts.menuContentEl[0].firstElementChild;

          focusTarget = firstChild && (firstChild.querySelector('.md-button:not([disabled])') || firstChild.firstElementChild);
        ***REMOVED***

        focusTarget && focusTarget.focus();

        return function cleanupInteraction() ***REMOVED***
          element.removeClass('md-clickable');
          if (opts.backdrop) opts.backdrop.off('click', onBackdropClick);
          opts.menuContentEl.off('keydown', onMenuKeyDown);
          opts.menuContentEl[0].removeEventListener('click', captureClickListener, true);
        ***REMOVED***;

        // ************************************
        // internal functions
        // ************************************

        function onMenuKeyDown(ev) ***REMOVED***
          var handled;
          switch (ev.keyCode) ***REMOVED***
            case $mdConstant.KEY_CODE.ESCAPE:
              opts.mdMenuCtrl.close(false, ***REMOVED*** closeAll: true ***REMOVED***);
              handled = true;
              break;
            case $mdConstant.KEY_CODE.UP_ARROW:
              if (!focusMenuItem(ev, opts.menuContentEl, opts, -1) && !opts.nestLevel) ***REMOVED***
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              ***REMOVED***
              handled = true;
              break;
            case $mdConstant.KEY_CODE.DOWN_ARROW:
              if (!focusMenuItem(ev, opts.menuContentEl, opts, 1) && !opts.nestLevel) ***REMOVED***
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              ***REMOVED***
              handled = true;
              break;
            case $mdConstant.KEY_CODE.LEFT_ARROW:
              if (opts.nestLevel) ***REMOVED***
                opts.mdMenuCtrl.close();
              ***REMOVED*** else ***REMOVED***
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              ***REMOVED***
              handled = true;
              break;
            case $mdConstant.KEY_CODE.RIGHT_ARROW:
              var parentMenu = $mdUtil.getClosest(ev.target, 'MD-MENU');
              if (parentMenu && parentMenu != opts.parent[0]) ***REMOVED***
                ev.target.click();
              ***REMOVED*** else ***REMOVED***
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              ***REMOVED***
              handled = true;
              break;
          ***REMOVED***
          if (handled) ***REMOVED***
            ev.preventDefault();
            ev.stopImmediatePropagation();
          ***REMOVED***
        ***REMOVED***

        function onBackdropClick(e) ***REMOVED***
          e.preventDefault();
          e.stopPropagation();
          scope.$apply(function() ***REMOVED***
            opts.mdMenuCtrl.close(true, ***REMOVED*** closeAll: true ***REMOVED***);
          ***REMOVED***);
        ***REMOVED***

        // Close menu on menu item click, if said menu-item is not disabled
        function captureClickListener(e) ***REMOVED***
          var target = e.target;
          // Traverse up the event until we get to the menuContentEl to see if
          // there is an ng-click and that the ng-click is not disabled
          do ***REMOVED***
            if (target == opts.menuContentEl[0]) return;
            if ((hasAnyAttribute(target, ['ng-click', 'ng-href', 'ui-sref']) ||
                target.nodeName == 'BUTTON' || target.nodeName == 'MD-BUTTON') && !hasAnyAttribute(target, ['md-prevent-menu-close'])) ***REMOVED***
              var closestMenu = $mdUtil.getClosest(target, 'MD-MENU');
              if (!target.hasAttribute('disabled') && (!closestMenu || closestMenu == opts.parent[0])) ***REMOVED***
                close();
              ***REMOVED***
              break;
            ***REMOVED***
          ***REMOVED*** while (target = target.parentNode)

          function close() ***REMOVED***
            scope.$apply(function() ***REMOVED***
              opts.mdMenuCtrl.close(true, ***REMOVED*** closeAll: true ***REMOVED***);
            ***REMOVED***);
          ***REMOVED***

          function hasAnyAttribute(target, attrs) ***REMOVED***
            if (!target) return false;

            for (var i = 0, attr; attr = attrs[i]; ++i) ***REMOVED***
              if (prefixer.hasAttribute(target, attr)) ***REMOVED***
                return true;
              ***REMOVED***
            ***REMOVED***

            return false;
          ***REMOVED***
        ***REMOVED***

      ***REMOVED***
    ***REMOVED***

    /**
     * Takes a keypress event and focuses the next/previous menu
     * item from the emitting element
     * @param ***REMOVED***event***REMOVED*** e - The origin keypress event
     * @param ***REMOVED***angular.element***REMOVED*** menuEl - The menu element
     * @param ***REMOVED***object***REMOVED*** opts - The interim element options for the mdMenu
     * @param ***REMOVED***number***REMOVED*** direction - The direction to move in (+1 = next, -1 = prev)
     */
    function focusMenuItem(e, menuEl, opts, direction) ***REMOVED***
      var currentItem = $mdUtil.getClosest(e.target, 'MD-MENU-ITEM');

      var items = $mdUtil.nodesToArray(menuEl[0].children);
      var currentIndex = items.indexOf(currentItem);

      // Traverse through our elements in the specified direction (+/-1) and try to
      // focus them until we find one that accepts focus
      var didFocus;
      for (var i = currentIndex + direction; i >= 0 && i < items.length; i = i + direction) ***REMOVED***
        var focusTarget = items[i].querySelector('.md-button');
        didFocus = attemptFocus(focusTarget);
        if (didFocus) ***REMOVED***
          break;
        ***REMOVED***
      ***REMOVED***
      return didFocus;
    ***REMOVED***

    /**
     * Attempts to focus an element. Checks whether that element is the currently
     * focused element after attempting.
     * @param ***REMOVED***HTMLElement***REMOVED*** el - the element to attempt focus on
     * @returns ***REMOVED***bool***REMOVED*** - whether the element was successfully focused
     */
    function attemptFocus(el) ***REMOVED***
      if (el && el.getAttribute('tabindex') != -1) ***REMOVED***
        el.focus();
        return ($document[0].activeElement == el);
      ***REMOVED***
    ***REMOVED***

    /**
     * Use browser to remove this element without triggering a $destroy event
     */
    function detachElement(element, opts) ***REMOVED***
      if (!opts.preserveElement) ***REMOVED***
        if (toNode(element).parentNode === toNode(opts.parent)) ***REMOVED***
          toNode(opts.parent).removeChild(toNode(element));
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        toNode(element).style.display = 'none';
      ***REMOVED***
    ***REMOVED***

    /**
     * Computes menu position and sets the style on the menu container
     * @param ***REMOVED***HTMLElement***REMOVED*** el - the menu container element
     * @param ***REMOVED***object***REMOVED*** opts - the interim element options object
     */
    function calculateMenuPosition(el, opts) ***REMOVED***

      var containerNode = el[0],
        openMenuNode = el[0].firstElementChild,
        openMenuNodeRect = openMenuNode.getBoundingClientRect(),
        boundryNode = $document[0].body,
        boundryNodeRect = boundryNode.getBoundingClientRect();

      var menuStyle = $window.getComputedStyle(openMenuNode);

      var originNode = opts.target[0].querySelector(prefixer.buildSelector('md-menu-origin')) || opts.target[0],
        originNodeRect = originNode.getBoundingClientRect();

      var bounds = ***REMOVED***
        left: boundryNodeRect.left + MENU_EDGE_MARGIN,
        top: Math.max(boundryNodeRect.top, 0) + MENU_EDGE_MARGIN,
        bottom: Math.max(boundryNodeRect.bottom, Math.max(boundryNodeRect.top, 0) + boundryNodeRect.height) - MENU_EDGE_MARGIN,
        right: boundryNodeRect.right - MENU_EDGE_MARGIN
      ***REMOVED***;

      var alignTarget, alignTargetRect = ***REMOVED*** top:0, left : 0, right:0, bottom:0 ***REMOVED***, existingOffsets  = ***REMOVED*** top:0, left : 0, right:0, bottom:0  ***REMOVED***;
      var positionMode = opts.mdMenuCtrl.positionMode();

      if (positionMode.top == 'target' || positionMode.left == 'target' || positionMode.left == 'target-right') ***REMOVED***
        alignTarget = firstVisibleChild();
        if ( alignTarget ) ***REMOVED***
          // TODO: Allow centering on an arbitrary node, for now center on first menu-item's child
          alignTarget = alignTarget.firstElementChild || alignTarget;
          alignTarget = alignTarget.querySelector(prefixer.buildSelector('md-menu-align-target')) || alignTarget;
          alignTargetRect = alignTarget.getBoundingClientRect();

          existingOffsets = ***REMOVED***
            top: parseFloat(containerNode.style.top || 0),
            left: parseFloat(containerNode.style.left || 0)
          ***REMOVED***;
        ***REMOVED***
      ***REMOVED***

      var position = ***REMOVED******REMOVED***;
      var transformOrigin = 'top ';

      switch (positionMode.top) ***REMOVED***
        case 'target':
          position.top = existingOffsets.top + originNodeRect.top - alignTargetRect.top;
          break;
        case 'cascade':
          position.top = originNodeRect.top - parseFloat(menuStyle.paddingTop) - originNode.style.top;
          break;
        case 'bottom':
          position.top = originNodeRect.top + originNodeRect.height;
          break;
        default:
          throw new Error('Invalid target mode "' + positionMode.top + '" specified for md-menu on Y axis.');
      ***REMOVED***

      var rtl = ($mdUtil.bidi() == 'rtl');

      switch (positionMode.left) ***REMOVED***
        case 'target':
          position.left = existingOffsets.left + originNodeRect.left - alignTargetRect.left;
          transformOrigin += rtl ? 'right'  : 'left';
          break;
        case 'target-left':
          position.left = originNodeRect.left;
          transformOrigin += 'left';
          break;
        case 'target-right':
          position.left = originNodeRect.right - openMenuNodeRect.width + (openMenuNodeRect.right - alignTargetRect.right);
          transformOrigin += 'right';
          break;
        case 'cascade':
          var willFitRight = rtl ? (originNodeRect.left - openMenuNodeRect.width) < bounds.left : (originNodeRect.right + openMenuNodeRect.width) < bounds.right;
          position.left = willFitRight ? originNodeRect.right - originNode.style.left : originNodeRect.left - originNode.style.left - openMenuNodeRect.width;
          transformOrigin += willFitRight ? 'left' : 'right';
          break;
        case 'right':
          if (rtl) ***REMOVED***
            position.left = originNodeRect.right - originNodeRect.width;
            transformOrigin += 'left';
          ***REMOVED*** else ***REMOVED***
            position.left = originNodeRect.right - openMenuNodeRect.width;
            transformOrigin += 'right';
          ***REMOVED***
          break;
        case 'left':
          if (rtl) ***REMOVED***
            position.left = originNodeRect.right - openMenuNodeRect.width;
            transformOrigin += 'right';
          ***REMOVED*** else ***REMOVED***
            position.left = originNodeRect.left;
            transformOrigin += 'left';
          ***REMOVED***
          break;
        default:
          throw new Error('Invalid target mode "' + positionMode.left + '" specified for md-menu on X axis.');
      ***REMOVED***

      var offsets = opts.mdMenuCtrl.offsets();
      position.top += offsets.top;
      position.left += offsets.left;

      clamp(position);

      var scaleX = Math.round(100 * Math.min(originNodeRect.width / containerNode.offsetWidth, 1.0)) / 100;
      var scaleY = Math.round(100 * Math.min(originNodeRect.height / containerNode.offsetHeight, 1.0)) / 100;

      return ***REMOVED***
        top: Math.round(position.top),
        left: Math.round(position.left),
        // Animate a scale out if we aren't just repositioning
        transform: !opts.alreadyOpen ? $mdUtil.supplant('scale(***REMOVED***0***REMOVED***,***REMOVED***1***REMOVED***)', [scaleX, scaleY]) : undefined,
        transformOrigin: transformOrigin
      ***REMOVED***;

      /**
       * Clamps the repositioning of the menu within the confines of
       * bounding element (often the screen/body)
       */
      function clamp(pos) ***REMOVED***
        pos.top = Math.max(Math.min(pos.top, bounds.bottom - containerNode.offsetHeight), bounds.top);
        pos.left = Math.max(Math.min(pos.left, bounds.right - containerNode.offsetWidth), bounds.left);
      ***REMOVED***

      /**
       * Gets the first visible child in the openMenuNode
       * Necessary incase menu nodes are being dynamically hidden
       */
      function firstVisibleChild() ***REMOVED***
        for (var i = 0; i < openMenuNode.children.length; ++i) ***REMOVED***
          if ($window.getComputedStyle(openMenuNode.children[i]).display != 'none') ***REMOVED***
            return openMenuNode.children[i];
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
  function toNode(el) ***REMOVED***
    if (el instanceof angular.element) ***REMOVED***
      el = el[0];
    ***REMOVED***
    return el;
  ***REMOVED***
***REMOVED***
MenuProvider.$inject = ["$$interimElementProvider"];

***REMOVED***)(window, window.angular);
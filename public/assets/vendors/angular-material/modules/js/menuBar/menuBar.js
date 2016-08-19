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
 * @name material.components.menu-bar
 */

angular.module('material.components.menuBar', [
  'material.core',
  'material.components.menu'
]);


angular
  .module('material.components.menuBar')
  .controller('MenuBarController', MenuBarController);

var BOUND_MENU_METHODS = ['handleKeyDown', 'handleMenuHover', 'scheduleOpenHoveredMenu', 'cancelScheduledOpen'];

/**
 * ngInject
 */
function MenuBarController($scope, $rootScope, $element, $attrs, $mdConstant, $document, $mdUtil, $timeout) ***REMOVED***
  this.$element = $element;
  this.$attrs = $attrs;
  this.$mdConstant = $mdConstant;
  this.$mdUtil = $mdUtil;
  this.$document = $document;
  this.$scope = $scope;
  this.$rootScope = $rootScope;
  this.$timeout = $timeout;

  var self = this;
  angular.forEach(BOUND_MENU_METHODS, function(methodName) ***REMOVED***
    self[methodName] = angular.bind(self, self[methodName]);
  ***REMOVED***);
***REMOVED***
MenuBarController.$inject = ["$scope", "$rootScope", "$element", "$attrs", "$mdConstant", "$document", "$mdUtil", "$timeout"];

MenuBarController.prototype.init = function() ***REMOVED***
  var $element = this.$element;
  var $mdUtil = this.$mdUtil;
  var $scope = this.$scope;

  var self = this;
  var deregisterFns = [];
  $element.on('keydown', this.handleKeyDown);
  this.parentToolbar = $mdUtil.getClosest($element, 'MD-TOOLBAR');

  deregisterFns.push(this.$rootScope.$on('$mdMenuOpen', function(event, el) ***REMOVED***
    if (self.getMenus().indexOf(el[0]) != -1) ***REMOVED***
      $element[0].classList.add('md-open');
      el[0].classList.add('md-open');
      self.currentlyOpenMenu = el.controller('mdMenu');
      self.currentlyOpenMenu.registerContainerProxy(self.handleKeyDown);
      self.enableOpenOnHover();
    ***REMOVED***
  ***REMOVED***));

  deregisterFns.push(this.$rootScope.$on('$mdMenuClose', function(event, el, opts) ***REMOVED***
    var rootMenus = self.getMenus();
    if (rootMenus.indexOf(el[0]) != -1) ***REMOVED***
      $element[0].classList.remove('md-open');
      el[0].classList.remove('md-open');
    ***REMOVED***

    if ($element[0].contains(el[0])) ***REMOVED***
      var parentMenu = el[0];
      while (parentMenu && rootMenus.indexOf(parentMenu) == -1) ***REMOVED***
        parentMenu = $mdUtil.getClosest(parentMenu, 'MD-MENU', true);
      ***REMOVED***
      if (parentMenu) ***REMOVED***
        if (!opts.skipFocus) parentMenu.querySelector('button:not([disabled])').focus();
        self.currentlyOpenMenu = undefined;
        self.disableOpenOnHover();
        self.setKeyboardMode(true);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***));

  $scope.$on('$destroy', function() ***REMOVED***
    while (deregisterFns.length) ***REMOVED***
      deregisterFns.shift()();
    ***REMOVED***
  ***REMOVED***);


  this.setKeyboardMode(true);
***REMOVED***;

MenuBarController.prototype.setKeyboardMode = function(enabled) ***REMOVED***
  if (enabled) this.$element[0].classList.add('md-keyboard-mode');
  else this.$element[0].classList.remove('md-keyboard-mode');
***REMOVED***;

MenuBarController.prototype.enableOpenOnHover = function() ***REMOVED***
  if (this.openOnHoverEnabled) return;
  this.openOnHoverEnabled = true;

  var parentToolbar;
  if (parentToolbar = this.parentToolbar) ***REMOVED***
    parentToolbar.dataset.mdRestoreStyle = parentToolbar.getAttribute('style');
    parentToolbar.style.position = 'relative';
    parentToolbar.style.zIndex = 100;
  ***REMOVED***
  angular
    .element(this.getMenus())
    .on('mouseenter', this.handleMenuHover);
***REMOVED***;

MenuBarController.prototype.handleMenuHover = function(e) ***REMOVED***
  this.setKeyboardMode(false);
  if (this.openOnHoverEnabled) ***REMOVED***
    this.scheduleOpenHoveredMenu(e);
  ***REMOVED***
***REMOVED***;


MenuBarController.prototype.disableOpenOnHover = function() ***REMOVED***
  if (!this.openOnHoverEnabled) return;
  this.openOnHoverEnabled = false;
  var parentToolbar;
  if (parentToolbar = this.parentToolbar) ***REMOVED***
    parentToolbar.style.cssText = parentToolbar.dataset.mdRestoreStyle || '';
  ***REMOVED***
  angular
    .element(this.getMenus())
    .off('mouseenter', this.handleMenuHover);
***REMOVED***;

MenuBarController.prototype.scheduleOpenHoveredMenu = function(e) ***REMOVED***
  var menuEl = angular.element(e.currentTarget);
  var menuCtrl = menuEl.controller('mdMenu');
  this.setKeyboardMode(false);
  this.scheduleOpenMenu(menuCtrl);
***REMOVED***;

MenuBarController.prototype.scheduleOpenMenu = function(menuCtrl) ***REMOVED***
  var self = this;
  var $timeout = this.$timeout;
  if (menuCtrl != self.currentlyOpenMenu) ***REMOVED***
    $timeout.cancel(self.pendingMenuOpen);
    self.pendingMenuOpen = $timeout(function() ***REMOVED***
      self.pendingMenuOpen = undefined;
      if (self.currentlyOpenMenu) ***REMOVED***
        self.currentlyOpenMenu.close(true, ***REMOVED*** closeAll: true ***REMOVED***);
      ***REMOVED***
      menuCtrl.open();
    ***REMOVED***, 200, false);
  ***REMOVED***
***REMOVED***;

MenuBarController.prototype.handleKeyDown = function(e) ***REMOVED***
  var keyCodes = this.$mdConstant.KEY_CODE;
  var currentMenu = this.currentlyOpenMenu;
  var wasOpen = currentMenu && currentMenu.isOpen;
  this.setKeyboardMode(true);
  var handled, newMenu, newMenuCtrl;
  switch (e.keyCode) ***REMOVED***
    case keyCodes.DOWN_ARROW:
      if (currentMenu) ***REMOVED***
        currentMenu.focusMenuContainer();
      ***REMOVED*** else ***REMOVED***
        this.openFocusedMenu();
      ***REMOVED***
      handled = true;
      break;
    case keyCodes.UP_ARROW:
      currentMenu && currentMenu.close();
      handled = true;
      break;
    case keyCodes.LEFT_ARROW:
      newMenu = this.focusMenu(-1);
      if (wasOpen) ***REMOVED***
        newMenuCtrl = angular.element(newMenu).controller('mdMenu');
        this.scheduleOpenMenu(newMenuCtrl);
      ***REMOVED***
      handled = true;
      break;
    case keyCodes.RIGHT_ARROW:
      newMenu = this.focusMenu(+1);
      if (wasOpen) ***REMOVED***
        newMenuCtrl = angular.element(newMenu).controller('mdMenu');
        this.scheduleOpenMenu(newMenuCtrl);
      ***REMOVED***
      handled = true;
      break;
  ***REMOVED***
  if (handled) ***REMOVED***
    e && e.preventDefault && e.preventDefault();
    e && e.stopImmediatePropagation && e.stopImmediatePropagation();
  ***REMOVED***
***REMOVED***;

MenuBarController.prototype.focusMenu = function(direction) ***REMOVED***
  var menus = this.getMenus();
  var focusedIndex = this.getFocusedMenuIndex();

  if (focusedIndex == -1) ***REMOVED*** focusedIndex = this.getOpenMenuIndex(); ***REMOVED***

  var changed = false;

  if (focusedIndex == -1) ***REMOVED*** focusedIndex = 0; changed = true; ***REMOVED***
  else if (
    direction < 0 && focusedIndex > 0 ||
    direction > 0 && focusedIndex < menus.length - direction
  ) ***REMOVED***
    focusedIndex += direction;
    changed = true;
  ***REMOVED***
  if (changed) ***REMOVED***
    menus[focusedIndex].querySelector('button').focus();
    return menus[focusedIndex];
  ***REMOVED***
***REMOVED***;

MenuBarController.prototype.openFocusedMenu = function() ***REMOVED***
  var menu = this.getFocusedMenu();
  menu && angular.element(menu).controller('mdMenu').open();
***REMOVED***;

MenuBarController.prototype.getMenus = function() ***REMOVED***
  var $element = this.$element;
  return this.$mdUtil.nodesToArray($element[0].children)
    .filter(function(el) ***REMOVED*** return el.nodeName == 'MD-MENU'; ***REMOVED***);
***REMOVED***;

MenuBarController.prototype.getFocusedMenu = function() ***REMOVED***
  return this.getMenus()[this.getFocusedMenuIndex()];
***REMOVED***;

MenuBarController.prototype.getFocusedMenuIndex = function() ***REMOVED***
  var $mdUtil = this.$mdUtil;
  var focusedEl = $mdUtil.getClosest(
    this.$document[0].activeElement,
    'MD-MENU'
  );
  if (!focusedEl) return -1;

  var focusedIndex = this.getMenus().indexOf(focusedEl);
  return focusedIndex;

***REMOVED***;

MenuBarController.prototype.getOpenMenuIndex = function() ***REMOVED***
  var menus = this.getMenus();
  for (var i = 0; i < menus.length; ++i) ***REMOVED***
    if (menus[i].classList.contains('md-open')) return i;
  ***REMOVED***
  return -1;
***REMOVED***;









/**
 * @ngdoc directive
 * @name mdMenuBar
 * @module material.components.menu-bar
 * @restrict E
 * @description
 *
 * Menu bars are containers that hold multiple menus. They change the behavior and appearence
 * of the `md-menu` directive to behave similar to an operating system provided menu.
 *
 * @usage
 * <hljs lang="html">
 * <md-menu-bar>
 *   <md-menu>
 *     <button ng-click="$mdOpenMenu()">
 *       File
 *     </button>
 *     <md-menu-content>
 *       <md-menu-item>
 *         <md-button ng-click="ctrl.sampleAction('share', $event)">
 *           Share...
 *         </md-button>
 *       </md-menu-item>
 *       <md-menu-divider></md-menu-divider>
 *       <md-menu-item>
 *       <md-menu-item>
 *         <md-menu>
 *           <md-button ng-click="$mdOpenMenu()">New</md-button>
 *           <md-menu-content>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Document', $event)">Document</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Spreadsheet', $event)">Spreadsheet</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Presentation', $event)">Presentation</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Form', $event)">Form</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Drawing', $event)">Drawing</md-button></md-menu-item>
 *           </md-menu-content>
 *         </md-menu>
 *       </md-menu-item>
 *     </md-menu-content>
 *   </md-menu>
 * </md-menu-bar>
 * </hljs>
 *
 * ## Menu Bar Controls
 *
 * You may place `md-menu-items` that function as controls within menu bars.
 * There are two modes that are exposed via the `type` attribute of the `md-menu-item`.
 * `type="checkbox"` will function as a boolean control for the `ng-model` attribute of the
 * `md-menu-item`. `type="radio"` will function like a radio button, setting the `ngModel`
 * to the `string` value of the `value` attribute. If you need non-string values, you can use
 * `ng-value` to provide an expression (this is similar to how angular's native `input[type=radio]` works.
 *
 * <hljs lang="html">
 * <md-menu-bar>
 *  <md-menu>
 *    <button ng-click="$mdOpenMenu()">
 *      Sample Menu
 *    </button>
 *    <md-menu-content>
 *      <md-menu-item type="checkbox" ng-model="settings.allowChanges">Allow changes</md-menu-item>
 *      <md-menu-divider></md-menu-divider>
 *      <md-menu-item type="radio" ng-model="settings.mode" ng-value="1">Mode 1</md-menu-item>
 *      <md-menu-item type="radio" ng-model="settings.mode" ng-value="1">Mode 2</md-menu-item>
 *      <md-menu-item type="radio" ng-model="settings.mode" ng-value="1">Mode 3</md-menu-item>
 *    </md-menu-content>
 *  </md-menu>
 * </md-menu-bar>
 * </hljs>
 *
 *
 * ### Nesting Menus
 *
 * Menus may be nested within menu bars. This is commonly called cascading menus.
 * To nest a menu place the nested menu inside the content of the `md-menu-item`.
 * <hljs lang="html">
 * <md-menu-item>
 *   <md-menu>
 *     <button ng-click="$mdOpenMenu()">New</md-button>
 *     <md-menu-content>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Document', $event)">Document</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Spreadsheet', $event)">Spreadsheet</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Presentation', $event)">Presentation</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Form', $event)">Form</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Drawing', $event)">Drawing</md-button></md-menu-item>
 *     </md-menu-content>
 *   </md-menu>
 * </md-menu-item>
 * </hljs>
 *
 */

angular
  .module('material.components.menuBar')
  .directive('mdMenuBar', MenuBarDirective);

/* ngInject */
function MenuBarDirective($mdUtil, $mdTheming) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    require: 'mdMenuBar',
    controller: 'MenuBarController',

    compile: function compile(templateEl, templateAttrs) ***REMOVED***
      if (!templateAttrs.ariaRole) ***REMOVED***
        templateEl[0].setAttribute('role', 'menubar');
      ***REMOVED***
      angular.forEach(templateEl[0].children, function(menuEl) ***REMOVED***
        if (menuEl.nodeName == 'MD-MENU') ***REMOVED***
          if (!menuEl.hasAttribute('md-position-mode')) ***REMOVED***
            menuEl.setAttribute('md-position-mode', 'left bottom');

            // Since we're in the compile function and actual `md-buttons` are not compiled yet,
            // we need to query for possible `md-buttons` as well.
            menuEl.querySelector('button, a, md-button').setAttribute('role', 'menuitem');
          ***REMOVED***
          var contentEls = $mdUtil.nodesToArray(menuEl.querySelectorAll('md-menu-content'));
          angular.forEach(contentEls, function(contentEl) ***REMOVED***
            contentEl.classList.add('md-menu-bar-menu');
            contentEl.classList.add('md-dense');
            if (!contentEl.hasAttribute('width')) ***REMOVED***
              contentEl.setAttribute('width', 5);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***);

      // Mark the child menu items that they're inside a menu bar. This is necessary,
      // because mnMenuItem has special behaviour during compilation, depending on
      // whether it is inside a mdMenuBar. We can usually figure this out via the DOM,
      // however if a directive that uses documentFragment is applied to the child (e.g. ngRepeat),
      // the element won't have a parent and won't compile properly.
      templateEl.find('md-menu-item').addClass('md-in-menu-bar');

      return function postLink(scope, el, attr, ctrl) ***REMOVED***
        el.addClass('_md');     // private md component indicator for styling
        $mdTheming(scope, el);
        ctrl.init();
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;

***REMOVED***
MenuBarDirective.$inject = ["$mdUtil", "$mdTheming"];


angular
  .module('material.components.menuBar')
  .directive('mdMenuDivider', MenuDividerDirective);


function MenuDividerDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    compile: function(templateEl, templateAttrs) ***REMOVED***
      if (!templateAttrs.role) ***REMOVED***
        templateEl[0].setAttribute('role', 'separator');
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***


angular
  .module('material.components.menuBar')
  .controller('MenuItemController', MenuItemController);


/**
 * ngInject
 */
function MenuItemController($scope, $element, $attrs) ***REMOVED***
  this.$element = $element;
  this.$attrs = $attrs;
  this.$scope = $scope;
***REMOVED***
MenuItemController.$inject = ["$scope", "$element", "$attrs"];

MenuItemController.prototype.init = function(ngModel) ***REMOVED***
  var $element = this.$element;
  var $attrs = this.$attrs;

  this.ngModel = ngModel;
  if ($attrs.type == 'checkbox' || $attrs.type == 'radio') ***REMOVED***
    this.mode  = $attrs.type;
    this.iconEl = $element[0].children[0];
    this.buttonEl = $element[0].children[1];
    if (ngModel) ***REMOVED***
      // Clear ngAria set attributes
      this.initClickListeners();
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

// ngAria auto sets attributes on a menu-item with a ngModel.
// We don't want this because our content (buttons) get the focus
// and set their own aria attributes appropritately. Having both
// breaks NVDA / JAWS. This undeoes ngAria's attrs.
MenuItemController.prototype.clearNgAria = function() ***REMOVED***
  var el = this.$element[0];
  var clearAttrs = ['role', 'tabindex', 'aria-invalid', 'aria-checked'];
  angular.forEach(clearAttrs, function(attr) ***REMOVED***
    el.removeAttribute(attr);
  ***REMOVED***);
***REMOVED***;

MenuItemController.prototype.initClickListeners = function() ***REMOVED***
  var self = this;
  var ngModel = this.ngModel;
  var $scope = this.$scope;
  var $attrs = this.$attrs;
  var $element = this.$element;
  var mode = this.mode;

  this.handleClick = angular.bind(this, this.handleClick);

  var icon = this.iconEl;
  var button = angular.element(this.buttonEl);
  var handleClick = this.handleClick;

  $attrs.$observe('disabled', setDisabled);
  setDisabled($attrs.disabled);

  ngModel.$render = function render() ***REMOVED***
    self.clearNgAria();
    if (isSelected()) ***REMOVED***
      icon.style.display = '';
      button.attr('aria-checked', 'true');
    ***REMOVED*** else ***REMOVED***
      icon.style.display = 'none';
      button.attr('aria-checked', 'false');
    ***REMOVED***
  ***REMOVED***;

  $scope.$$postDigest(ngModel.$render);

  function isSelected() ***REMOVED***
    if (mode == 'radio') ***REMOVED***
      var val = $attrs.ngValue ? $scope.$eval($attrs.ngValue) : $attrs.value;
      return ngModel.$modelValue == val;
    ***REMOVED*** else ***REMOVED***
      return ngModel.$modelValue;
    ***REMOVED***
  ***REMOVED***

  function setDisabled(disabled) ***REMOVED***
    if (disabled) ***REMOVED***
      button.off('click', handleClick);
    ***REMOVED*** else ***REMOVED***
      button.on('click', handleClick);
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

MenuItemController.prototype.handleClick = function(e) ***REMOVED***
  var mode = this.mode;
  var ngModel = this.ngModel;
  var $attrs = this.$attrs;
  var newVal;
  if (mode == 'checkbox') ***REMOVED***
    newVal = !ngModel.$modelValue;
  ***REMOVED*** else if (mode == 'radio') ***REMOVED***
    newVal = $attrs.ngValue ? this.$scope.$eval($attrs.ngValue) : $attrs.value;
  ***REMOVED***
  ngModel.$setViewValue(newVal);
  ngModel.$render();
***REMOVED***;


angular
  .module('material.components.menuBar')
  .directive('mdMenuItem', MenuItemDirective);

 /* ngInject */
function MenuItemDirective($mdUtil) ***REMOVED***
  return ***REMOVED***
    controller: 'MenuItemController',
    require: ['mdMenuItem', '?ngModel'],
    priority: 210, // ensure that our post link runs after ngAria
    compile: function(templateEl, templateAttrs) ***REMOVED***
      var type = templateAttrs.type;
      var inMenuBarClass = 'md-in-menu-bar';

      // Note: This allows us to show the `check` icon for the md-menu-bar items.
      // The `md-in-menu-bar` class is set by the mdMenuBar directive.
      if ((type == 'checkbox' || type == 'radio') && templateEl.hasClass(inMenuBarClass)) ***REMOVED***
        var text = templateEl[0].textContent;
        var buttonEl = angular.element('<md-button type="button"></md-button>');
            buttonEl.html(text);
            buttonEl.attr('tabindex', '0');

        templateEl.html('');
        templateEl.append(angular.element('<md-icon md-svg-icon="check"></md-icon>'));
        templateEl.append(buttonEl);
        templateEl.addClass('md-indent').removeClass(inMenuBarClass);

        setDefault('role', type == 'checkbox' ? 'menuitemcheckbox' : 'menuitemradio', buttonEl);
        moveAttrToButton('ng-disabled');

      ***REMOVED*** else ***REMOVED***
        setDefault('role', 'menuitem', templateEl[0].querySelector('md-button, button, a'));
      ***REMOVED***


      return function(scope, el, attrs, ctrls) ***REMOVED***
        var ctrl = ctrls[0];
        var ngModel = ctrls[1];
        ctrl.init(ngModel);
      ***REMOVED***;

      function setDefault(attr, val, el) ***REMOVED***
        el = el || templateEl;
        if (el instanceof angular.element) ***REMOVED***
          el = el[0];
        ***REMOVED***
        if (!el.hasAttribute(attr)) ***REMOVED***
          el.setAttribute(attr, val);
        ***REMOVED***
      ***REMOVED***

      function moveAttrToButton(attribute) ***REMOVED***
        var attributes = $mdUtil.prefixer(attribute);

        angular.forEach(attributes, function(attr) ***REMOVED***
          if (templateEl[0].hasAttribute(attr)) ***REMOVED***
            var val = templateEl[0].getAttribute(attr);
            buttonEl[0].setAttribute(attr, val);
            templateEl[0].removeAttribute(attr);
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MenuItemDirective.$inject = ["$mdUtil"];

***REMOVED***)(window, window.angular);
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
 * @name material.components.navBar
 */


angular.module('material.components.navBar', ['material.core'])
    .controller('MdNavBarController', MdNavBarController)
    .directive('mdNavBar', MdNavBar)
    .controller('MdNavItemController', MdNavItemController)
    .directive('mdNavItem', MdNavItem);


/*****************************************************************************
 *                            PUBLIC DOCUMENTATION                           *
 *****************************************************************************/
/**
 * @ngdoc directive
 * @name mdNavBar
 * @module material.components.navBar
 *
 * @restrict E
 *
 * @description
 * The `<md-nav-bar>` directive renders a list of material tabs that can be used
 * for top-level page navigation. Unlike `<md-tabs>`, it has no concept of a tab
 * body and no bar pagination.
 *
 * Because it deals with page navigation, certain routing concepts are built-in.
 * Route changes via via ng-href, ui-sref, or ng-click events are supported.
 * Alternatively, the user could simply watch currentNavItem for changes.
 *
 * Accessibility functionality is implemented as a site navigator with a
 * listbox, according to
 * https://www.w3.org/TR/wai-aria-practices/#Site_Navigator_Tabbed_Style
 *
 * @param ***REMOVED***string=***REMOVED*** mdSelectedNavItem The name of the current tab; this must
 * match the name attribute of `<md-nav-item>`
 * @param ***REMOVED***string=***REMOVED*** navBarAriaLabel An aria-label for the nav-bar
 *
 * @usage
 * <hljs lang="html">
 *  <md-nav-bar md-selected-nav-item="currentNavItem">
 *    <md-nav-item md-nav-click="goto('page1')" name="page1">Page One</md-nav-item>
 *    <md-nav-item md-nav-sref="app.page2" name="page2">Page Two</md-nav-item>
 *    <md-nav-item md-nav-href="#page3" name="page3">Page Three</md-nav-item>
 *  </md-nav-bar>
 *</hljs>
 * <hljs lang="js">
 * (function() ***REMOVED***
 *   ‘use strict’;
 *
 *    $rootScope.$on('$routeChangeSuccess', function(event, current) ***REMOVED***
 *      $scope.currentLink = getCurrentLinkFromRoute(current);
 *    ***REMOVED***);
 * ***REMOVED***);
 * </hljs>
 */

/*****************************************************************************
 *                            mdNavItem
 *****************************************************************************/
/**
 * @ngdoc directive
 * @name mdNavItem
 * @module material.components.navBar
 *
 * @restrict E
 *
 * @description
 * `<md-nav-item>` describes a page navigation link within the `<md-nav-bar>`
 * component. It renders an md-button as the actual link.
 *
 * Exactly one of the mdNavClick, mdNavHref, mdNavSref attributes are required to be
 * specified.
 *
 * @param ***REMOVED***Function=***REMOVED*** mdNavClick Function which will be called when the
 * link is clicked to change the page. Renders as an `ng-click`.
 * @param ***REMOVED***string=***REMOVED*** mdNavHref url to transition to when this link is clicked.
 * Renders as an `ng-href`.
 * @param ***REMOVED***string=***REMOVED*** mdNavSref Ui-router state to transition to when this link is
 * clicked. Renders as a `ui-sref`.
 * @param ***REMOVED***string=***REMOVED*** name The name of this link. Used by the nav bar to know
 * which link is currently selected.
 *
 * @usage
 * See `<md-nav-bar>` for usage.
 */


/*****************************************************************************
 *                                IMPLEMENTATION                             *
 *****************************************************************************/

function MdNavBar($mdAria) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    transclude: true,
    controller: MdNavBarController,
    controllerAs: 'ctrl',
    bindToController: true,
    scope: ***REMOVED***
      'mdSelectedNavItem': '=?',
      'navBarAriaLabel': '@?',
    ***REMOVED***,
    template:
      '<div class="md-nav-bar">' +
        '<nav role="navigation">' +
          '<ul class="_md-nav-bar-list" ng-transclude role="listbox"' +
            'tabindex="0"' +
            'ng-focus="ctrl.onFocus()"' +
            'ng-blur="ctrl.onBlur()"' +
            'ng-keydown="ctrl.onKeydown($event)"' +
            'aria-label="***REMOVED******REMOVED***ctrl.navBarAriaLabel***REMOVED******REMOVED***">' +
          '</ul>' +
        '</nav>' +
        '<md-nav-ink-bar></md-nav-ink-bar>' +
      '</div>',
    link: function(scope, element, attrs, ctrl) ***REMOVED***
      if (!ctrl.navBarAriaLabel) ***REMOVED***
        $mdAria.expectAsync(element, 'aria-label', angular.noop);
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED***;
***REMOVED***
MdNavBar.$inject = ["$mdAria"];

/**
 * Controller for the nav-bar component.
 *
 * Accessibility functionality is implemented as a site navigator with a
 * listbox, according to
 * https://www.w3.org/TR/wai-aria-practices/#Site_Navigator_Tabbed_Style
 * @param ***REMOVED***!angular.JQLite***REMOVED*** $element
 * @param ***REMOVED***!angular.Scope***REMOVED*** $scope
 * @param ***REMOVED***!angular.Timeout***REMOVED*** $timeout
 * @param ***REMOVED***!Object***REMOVED*** $mdConstant
 * @constructor
 * @final
 * ngInject
 */
function MdNavBarController($element, $scope, $timeout, $mdConstant) ***REMOVED***
  // Injected variables
  /** @private @const ***REMOVED***!angular.Timeout***REMOVED*** */
  this._$timeout = $timeout;

  /** @private @const ***REMOVED***!angular.Scope***REMOVED*** */
  this._$scope = $scope;

  /** @private @const ***REMOVED***!Object***REMOVED*** */
  this._$mdConstant = $mdConstant;

  // Data-bound variables.
  /** @type ***REMOVED***string***REMOVED*** */
  this.mdSelectedNavItem;

  /** @type ***REMOVED***string***REMOVED*** */
  this.navBarAriaLabel;

  // State variables.

  /** @type ***REMOVED***?angular.JQLite***REMOVED*** */
  this._navBarEl = $element[0];

  /** @type ***REMOVED***?angular.JQLite***REMOVED*** */
  this._inkbar;

  var self = this;
  // need to wait for transcluded content to be available
  var deregisterTabWatch = this._$scope.$watch(function() ***REMOVED***
    return self._navBarEl.querySelectorAll('._md-nav-button').length;
  ***REMOVED***,
  function(newLength) ***REMOVED***
    if (newLength > 0) ***REMOVED***
      self._initTabs();
      deregisterTabWatch();
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
MdNavBarController.$inject = ["$element", "$scope", "$timeout", "$mdConstant"];



/**
 * Initializes the tab components once they exist.
 * @private
 */
MdNavBarController.prototype._initTabs = function() ***REMOVED***
  this._inkbar = angular.element(this._navBarEl.getElementsByTagName('md-nav-ink-bar')[0]);

  var self = this;
  this._$timeout(function() ***REMOVED***
    self._updateTabs(self.mdSelectedNavItem, undefined);
  ***REMOVED***);

  this._$scope.$watch('ctrl.mdSelectedNavItem', function(newValue, oldValue) ***REMOVED***
    // Wait a digest before update tabs for products doing
    // anything dynamic in the template.
    self._$timeout(function() ***REMOVED***
      self._updateTabs(newValue, oldValue);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***;

/**
 * Set the current tab to be selected.
 * @param ***REMOVED***string|undefined***REMOVED*** newValue New current tab name.
 * @param ***REMOVED***string|undefined***REMOVED*** oldValue Previous tab name.
 * @private
 */
MdNavBarController.prototype._updateTabs = function(newValue, oldValue) ***REMOVED***
  var self = this;
  var tabs = this._getTabs();
  var oldIndex = -1;
  var newIndex = -1;
  var newTab = this._getTabByName(newValue);
  var oldTab = this._getTabByName(oldValue);

  if (oldTab) ***REMOVED***
    oldTab.setSelected(false);
    oldIndex = tabs.indexOf(oldTab);
  ***REMOVED***

  if (newTab) ***REMOVED***
    newTab.setSelected(true);
    newIndex = tabs.indexOf(newTab);
  ***REMOVED***

  this._$timeout(function() ***REMOVED***
    self._updateInkBarStyles(newTab, newIndex, oldIndex);
  ***REMOVED***);
***REMOVED***;

/**
 * Repositions the ink bar to the selected tab.
 * @private
 */
MdNavBarController.prototype._updateInkBarStyles = function(tab, newIndex, oldIndex) ***REMOVED***
  this._inkbar.toggleClass('_md-left', newIndex < oldIndex)
      .toggleClass('_md-right', newIndex > oldIndex);

  this._inkbar.css(***REMOVED***display: newIndex < 0 ? 'none' : ''***REMOVED***);

  if(tab)***REMOVED***
    var tabEl = tab.getButtonEl();
    var left = tabEl.offsetLeft;

    this._inkbar.css(***REMOVED***left: left + 'px', width: tabEl.offsetWidth + 'px'***REMOVED***);
  ***REMOVED***
***REMOVED***;

/**
 * Returns an array of the current tabs.
 * @return ***REMOVED***!Array<!NavItemController>***REMOVED***
 * @private
 */
MdNavBarController.prototype._getTabs = function() ***REMOVED***
  var linkArray = Array.prototype.slice.call(
      this._navBarEl.querySelectorAll('.md-nav-item'));
  return linkArray.map(function(el) ***REMOVED***
    return angular.element(el).controller('mdNavItem')
  ***REMOVED***);
***REMOVED***;

/**
 * Returns the tab with the specified name.
 * @param ***REMOVED***string***REMOVED*** name The name of the tab, found in its name attribute.
 * @return ***REMOVED***!NavItemController|undefined***REMOVED***
 * @private
 */
MdNavBarController.prototype._getTabByName = function(name) ***REMOVED***
  return this._findTab(function(tab) ***REMOVED***
    return tab.getName() == name;
  ***REMOVED***);
***REMOVED***;

/**
 * Returns the selected tab.
 * @return ***REMOVED***!NavItemController|undefined***REMOVED***
 * @private
 */
MdNavBarController.prototype._getSelectedTab = function() ***REMOVED***
  return this._findTab(function(tab) ***REMOVED***
    return tab.isSelected()
  ***REMOVED***);
***REMOVED***;

/**
 * Returns the focused tab.
 * @return ***REMOVED***!NavItemController|undefined***REMOVED***
 */
MdNavBarController.prototype.getFocusedTab = function() ***REMOVED***
  return this._findTab(function(tab) ***REMOVED***
    return tab.hasFocus()
  ***REMOVED***);
***REMOVED***;

/**
 * Find a tab that matches the specified function.
 * @private
 */
MdNavBarController.prototype._findTab = function(fn) ***REMOVED***
  var tabs = this._getTabs();
  for (var i = 0; i < tabs.length; i++) ***REMOVED***
    if (fn(tabs[i])) ***REMOVED***
      return tabs[i];
    ***REMOVED***
  ***REMOVED***

  return null;
***REMOVED***;

/**
 * Direct focus to the selected tab when focus enters the nav bar.
 */
MdNavBarController.prototype.onFocus = function() ***REMOVED***
  var tab = this._getSelectedTab();
  if (tab) ***REMOVED***
    tab.setFocused(true);
  ***REMOVED***
***REMOVED***;

/**
 * Clear tab focus when focus leaves the nav bar.
 */
MdNavBarController.prototype.onBlur = function() ***REMOVED***
  var tab = this.getFocusedTab();
  if (tab) ***REMOVED***
    tab.setFocused(false);
  ***REMOVED***
***REMOVED***;

/**
 * Move focus from oldTab to newTab.
 * @param ***REMOVED***!NavItemController***REMOVED*** oldTab
 * @param ***REMOVED***!NavItemController***REMOVED*** newTab
 * @private
 */
MdNavBarController.prototype._moveFocus = function(oldTab, newTab) ***REMOVED***
  oldTab.setFocused(false);
  newTab.setFocused(true);
***REMOVED***;

/**
 * Responds to keypress events.
 * @param ***REMOVED***!Event***REMOVED*** e
 */
MdNavBarController.prototype.onKeydown = function(e) ***REMOVED***
  var keyCodes = this._$mdConstant.KEY_CODE;
  var tabs = this._getTabs();
  var focusedTab = this.getFocusedTab();
  if (!focusedTab) return;

  var focusedTabIndex = tabs.indexOf(focusedTab);

  // use arrow keys to navigate between tabs
  switch (e.keyCode) ***REMOVED***
    case keyCodes.UP_ARROW:
    case keyCodes.LEFT_ARROW:
      if (focusedTabIndex > 0) ***REMOVED***
        this._moveFocus(focusedTab, tabs[focusedTabIndex - 1]);
      ***REMOVED***
      break;
    case keyCodes.DOWN_ARROW:
    case keyCodes.RIGHT_ARROW:
      if (focusedTabIndex < tabs.length - 1) ***REMOVED***
        this._moveFocus(focusedTab, tabs[focusedTabIndex + 1]);
      ***REMOVED***
      break;
    case keyCodes.SPACE:
    case keyCodes.ENTER:
      // timeout to avoid a "digest already in progress" console error
      this._$timeout(function() ***REMOVED***
        focusedTab.getButtonEl().click();
      ***REMOVED***);
      break;
  ***REMOVED***
***REMOVED***;

/**
 * ngInject
 */
function MdNavItem($$rAF) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    require: ['mdNavItem', '^mdNavBar'],
    controller: MdNavItemController,
    bindToController: true,
    controllerAs: 'ctrl',
    replace: true,
    transclude: true,
    template:
      '<li class="md-nav-item" role="option" aria-selected="***REMOVED******REMOVED***ctrl.isSelected()***REMOVED******REMOVED***">' +
        '<md-button ng-if="ctrl.mdNavSref" class="_md-nav-button md-accent"' +
          'ng-class="ctrl.getNgClassMap()"' +
          'tabindex="-1"' +
          'ui-sref="***REMOVED******REMOVED***ctrl.mdNavSref***REMOVED******REMOVED***">' +
          '<span ng-transclude class="_md-nav-button-text"></span>' +
        '</md-button>' +
        '<md-button ng-if="ctrl.mdNavHref" class="_md-nav-button md-accent"' +
          'ng-class="ctrl.getNgClassMap()"' +
          'tabindex="-1"' +
          'ng-href="***REMOVED******REMOVED***ctrl.mdNavHref***REMOVED******REMOVED***">' +
          '<span ng-transclude class="_md-nav-button-text"></span>' +
        '</md-button>' +
        '<md-button ng-if="ctrl.mdNavClick" class="_md-nav-button md-accent"' +
          'ng-class="ctrl.getNgClassMap()"' +
          'tabindex="-1"' +
          'ng-click="ctrl.mdNavClick()">' +
          '<span ng-transclude class="_md-nav-button-text"></span>' +
        '</md-button>' +
      '</li>',
    scope: ***REMOVED***
      'mdNavClick': '&?',
      'mdNavHref': '@?',
      'mdNavSref': '@?',
      'name': '@',
    ***REMOVED***,
    link: function(scope, element, attrs, controllers) ***REMOVED***
      var mdNavItem = controllers[0];
      var mdNavBar = controllers[1];

      // When accessing the element's contents synchronously, they
      // may not be defined yet because of transclusion. There is a higher chance
      // that it will be accessible if we wait one frame.
      $$rAF(function() ***REMOVED***
        if (!mdNavItem.name) ***REMOVED***
          mdNavItem.name = angular.element(element[0].querySelector('._md-nav-button-text'))
            .text().trim();
        ***REMOVED***

        var navButton = angular.element(element[0].querySelector('._md-nav-button'));
        navButton.on('click', function() ***REMOVED***
          mdNavBar.mdSelectedNavItem = mdNavItem.name;
          scope.$apply();
        ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MdNavItem.$inject = ["$$rAF"];

/**
 * Controller for the nav-item component.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** $element
 * @constructor
 * @final
 * ngInject
 */
function MdNavItemController($element) ***REMOVED***

  /** @private @const ***REMOVED***!angular.JQLite***REMOVED*** */
  this._$element = $element;

  // Data-bound variables
  /** @const ***REMOVED***?Function***REMOVED*** */
  this.mdNavClick;
  /** @const ***REMOVED***?string***REMOVED*** */
  this.mdNavHref;
  /** @const ***REMOVED***?string***REMOVED*** */
  this.name;

  // State variables
  /** @private ***REMOVED***boolean***REMOVED*** */
  this._selected = false;

  /** @private ***REMOVED***boolean***REMOVED*** */
  this._focused = false;

  var hasNavClick = !!($element.attr('md-nav-click'));
  var hasNavHref = !!($element.attr('md-nav-href'));
  var hasNavSref = !!($element.attr('md-nav-sref'));

  // Cannot specify more than one nav attribute
  if ((hasNavClick ? 1:0) + (hasNavHref ? 1:0) + (hasNavSref ? 1:0) > 1) ***REMOVED***
    throw Error(
        'Must specify exactly one of md-nav-click, md-nav-href, ' +
        'md-nav-sref for nav-item directive');
  ***REMOVED***
***REMOVED***
MdNavItemController.$inject = ["$element"];

/**
 * Returns a map of class names and values for use by ng-class.
 * @return ***REMOVED***!Object<string,boolean>***REMOVED***
 */
MdNavItemController.prototype.getNgClassMap = function() ***REMOVED***
  return ***REMOVED***
    'md-active': this._selected,
    'md-primary': this._selected,
    'md-unselected': !this._selected,
    'md-focused': this._focused,
  ***REMOVED***;
***REMOVED***;

/**
 * Get the name attribute of the tab.
 * @return ***REMOVED***string***REMOVED***
 */
MdNavItemController.prototype.getName = function() ***REMOVED***
  return this.name;
***REMOVED***;

/**
 * Get the button element associated with the tab.
 * @return ***REMOVED***!Element***REMOVED***
 */
MdNavItemController.prototype.getButtonEl = function() ***REMOVED***
  return this._$element[0].querySelector('._md-nav-button');
***REMOVED***;

/**
 * Set the selected state of the tab.
 * @param ***REMOVED***boolean***REMOVED*** isSelected
 */
MdNavItemController.prototype.setSelected = function(isSelected) ***REMOVED***
  this._selected = isSelected;
***REMOVED***;

/**
 * @return ***REMOVED***boolean***REMOVED***
 */
MdNavItemController.prototype.isSelected = function() ***REMOVED***
  return this._selected;
***REMOVED***;

/**
 * Set the focused state of the tab.
 * @param ***REMOVED***boolean***REMOVED*** isFocused
 */
MdNavItemController.prototype.setFocused = function(isFocused) ***REMOVED***
  this._focused = isFocused;
***REMOVED***;

/**
 * @return ***REMOVED***boolean***REMOVED***
 */
MdNavItemController.prototype.hasFocus = function() ***REMOVED***
  return this._focused;
***REMOVED***;

***REMOVED***)(window, window.angular);
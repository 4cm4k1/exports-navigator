/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.tabs');
goog.require('ng.material.components.icon');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.tabs
 * @description
 *
 *  Tabs, created with the `<md-tabs>` directive provide *tabbed* navigation with different styles.
 *  The Tabs component consists of clickable tabs that are aligned horizontally side-by-side.
 *
 *  Features include support for:
 *
 *  - static or dynamic tabs,
 *  - responsive designs,
 *  - accessibility support (ARIA),
 *  - tab pagination,
 *  - external or internal tab content,
 *  - focus indicators and arrow-key navigations,
 *  - programmatic lookup and access to tab controllers, and
 *  - dynamic transitions through different tab contents.
 *
 */
/*
 * @see js folder for tabs implementation
 */
angular.module('material.components.tabs', [
  'material.core',
  'material.components.icon'
]);

/**
 * @ngdoc directive
 * @name mdTab
 * @module material.components.tabs
 *
 * @restrict E
 *
 * @description
 * Use the `<md-tab>` a nested directive used within `<md-tabs>` to specify a tab with a **label** and optional *view content*.
 *
 * If the `label` attribute is not specified, then an optional `<md-tab-label>` tag can be used to specify more
 * complex tab header markup. If neither the **label** nor the **md-tab-label** are specified, then the nested
 * markup of the `<md-tab>` is used as the tab header markup.
 *
 * Please note that if you use `<md-tab-label>`, your content **MUST** be wrapped in the `<md-tab-body>` tag.  This
 * is to define a clear separation between the tab content and the tab label.
 *
 * This container is used by the TabsController to show/hide the active tab's content view. This synchronization is
 * automatically managed by the internal TabsController whenever the tab selection changes. Selection changes can
 * be initiated via data binding changes, programmatic invocation, or user gestures.
 *
 * @param ***REMOVED***string=***REMOVED*** label Optional attribute to specify a simple string as the tab label
 * @param ***REMOVED***boolean=***REMOVED*** ng-disabled If present and expression evaluates to truthy, disabled tab selection.
 * @param ***REMOVED***expression=***REMOVED*** md-on-deselect Expression to be evaluated after the tab has been de-selected.
 * @param ***REMOVED***expression=***REMOVED*** md-on-select Expression to be evaluated after the tab has been selected.
 * @param ***REMOVED***boolean=***REMOVED*** md-active When true, sets the active tab.  Note: There can only be one active tab at a time.
 *
 *
 * @usage
 *
 * <hljs lang="html">
 * <md-tab label="" ng-disabled md-on-select="" md-on-deselect="" >
 *   <h3>My Tab content</h3>
 * </md-tab>
 *
 * <md-tab >
 *   <md-tab-label>
 *     <h3>My Tab content</h3>
 *   </md-tab-label>
 *   <md-tab-body>
 *     <p>
 *       Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
 *       totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
 *       dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
 *       sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
 *     </p>
 *   </md-tab-body>
 * </md-tab>
 * </hljs>
 *
 */
angular
    .module('material.components.tabs')
    .directive('mdTab', MdTab);

function MdTab () ***REMOVED***
  return ***REMOVED***
    require:  '^?mdTabs',
    terminal: true,
    compile:  function (element, attr) ***REMOVED***
      var label = firstChild(element, 'md-tab-label'),
          body  = firstChild(element, 'md-tab-body');

      if (label.length == 0) ***REMOVED***
        label = angular.element('<md-tab-label></md-tab-label>');
        if (attr.label) label.text(attr.label);
        else label.append(element.contents());

        if (body.length == 0) ***REMOVED***
          var contents = element.contents().detach();
          body         = angular.element('<md-tab-body></md-tab-body>');
          body.append(contents);
        ***REMOVED***
      ***REMOVED***

      element.append(label);
      if (body.html()) element.append(body);

      return postLink;
    ***REMOVED***,
    scope:    ***REMOVED***
      active:   '=?mdActive',
      disabled: '=?ngDisabled',
      select:   '&?mdOnSelect',
      deselect: '&?mdOnDeselect'
    ***REMOVED***
  ***REMOVED***;

  function postLink (scope, element, attr, ctrl) ***REMOVED***
    if (!ctrl) return;
    var index = ctrl.getTabElementIndex(element),
        body  = firstChild(element, 'md-tab-body').remove(),
        label = firstChild(element, 'md-tab-label').remove(),
        data  = ctrl.insertTab(***REMOVED***
          scope:    scope,
          parent:   scope.$parent,
          index:    index,
          element:  element,
          template: body.html(),
          label:    label.html()
        ***REMOVED***, index);

    scope.select   = scope.select || angular.noop;
    scope.deselect = scope.deselect || angular.noop;

    scope.$watch('active', function (active) ***REMOVED*** if (active) ctrl.select(data.getIndex(), true); ***REMOVED***);
    scope.$watch('disabled', function () ***REMOVED*** ctrl.refreshIndex(); ***REMOVED***);
    scope.$watch(
        function () ***REMOVED***
          return ctrl.getTabElementIndex(element);
        ***REMOVED***,
        function (newIndex) ***REMOVED***
          data.index = newIndex;
          ctrl.updateTabOrder();
        ***REMOVED***
    );
    scope.$on('$destroy', function () ***REMOVED*** ctrl.removeTab(data); ***REMOVED***);
  ***REMOVED***

  function firstChild (element, tagName) ***REMOVED***
    var children = element[0].children;
    for (var i = 0, len = children.length; i < len; i++) ***REMOVED***
      var child = children[i];
      if (child.tagName === tagName.toUpperCase()) return angular.element(child);
    ***REMOVED***
    return angular.element();
  ***REMOVED***
***REMOVED***

angular
    .module('material.components.tabs')
    .directive('mdTabItem', MdTabItem);

function MdTabItem () ***REMOVED***
  return ***REMOVED***
    require: '^?mdTabs',
    link:    function link (scope, element, attr, ctrl) ***REMOVED***
      if (!ctrl) return;
      ctrl.attachRipple(scope, element);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

angular
    .module('material.components.tabs')
    .directive('mdTabLabel', MdTabLabel);

function MdTabLabel () ***REMOVED***
  return ***REMOVED*** terminal: true ***REMOVED***;
***REMOVED***


angular.module('material.components.tabs')
    .directive('mdTabScroll', MdTabScroll);

function MdTabScroll ($parse) ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    compile: function ($element, attr) ***REMOVED***
      var fn = $parse(attr.mdTabScroll, null, true);
      return function ngEventHandler (scope, element) ***REMOVED***
        element.on('mousewheel', function (event) ***REMOVED***
          scope.$apply(function () ***REMOVED*** fn(scope, ***REMOVED*** $event: event ***REMOVED***); ***REMOVED***);
        ***REMOVED***);
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
MdTabScroll.$inject = ["$parse"];

angular
    .module('material.components.tabs')
    .controller('MdTabsController', MdTabsController);

/**
 * ngInject
 */
function MdTabsController ($scope, $element, $window, $mdConstant, $mdTabInkRipple,
                           $mdUtil, $animateCss, $attrs, $compile, $mdTheming) ***REMOVED***
  // define private properties
  var ctrl      = this,
      locked    = false,
      elements  = getElements(),
      queue     = [],
      destroyed = false,
      loaded    = false;

  // define one-way bindings
  defineOneWayBinding('stretchTabs', handleStretchTabs);

  // define public properties with change handlers
  defineProperty('focusIndex', handleFocusIndexChange, ctrl.selectedIndex || 0);
  defineProperty('offsetLeft', handleOffsetChange, 0);
  defineProperty('hasContent', handleHasContent, false);
  defineProperty('maxTabWidth', handleMaxTabWidth, getMaxTabWidth());
  defineProperty('shouldPaginate', handleShouldPaginate, false);

  // define boolean attributes
  defineBooleanAttribute('noInkBar', handleInkBar);
  defineBooleanAttribute('dynamicHeight', handleDynamicHeight);
  defineBooleanAttribute('noPagination');
  defineBooleanAttribute('swipeContent');
  defineBooleanAttribute('noDisconnect');
  defineBooleanAttribute('autoselect');
  defineBooleanAttribute('noSelectClick');
  defineBooleanAttribute('centerTabs', handleCenterTabs, false);
  defineBooleanAttribute('enableDisconnect');

  // define public properties
  ctrl.scope             = $scope;
  ctrl.parent            = $scope.$parent;
  ctrl.tabs              = [];
  ctrl.lastSelectedIndex = null;
  ctrl.hasFocus          = false;
  ctrl.lastClick         = true;
  ctrl.shouldCenterTabs  = shouldCenterTabs();

  // define public methods
  ctrl.updatePagination   = $mdUtil.debounce(updatePagination, 100);
  ctrl.redirectFocus      = redirectFocus;
  ctrl.attachRipple       = attachRipple;
  ctrl.insertTab          = insertTab;
  ctrl.removeTab          = removeTab;
  ctrl.select             = select;
  ctrl.scroll             = scroll;
  ctrl.nextPage           = nextPage;
  ctrl.previousPage       = previousPage;
  ctrl.keydown            = keydown;
  ctrl.canPageForward     = canPageForward;
  ctrl.canPageBack        = canPageBack;
  ctrl.refreshIndex       = refreshIndex;
  ctrl.incrementIndex     = incrementIndex;
  ctrl.getTabElementIndex = getTabElementIndex;
  ctrl.updateInkBarStyles = $mdUtil.debounce(updateInkBarStyles, 100);
  ctrl.updateTabOrder     = $mdUtil.debounce(updateTabOrder, 100);

  init();

  /**
   * Perform initialization for the controller, setup events and watcher(s)
   */
  function init () ***REMOVED***
    ctrl.selectedIndex = ctrl.selectedIndex || 0;
    compileTemplate();
    configureWatchers();
    bindEvents();
    $mdTheming($element);
    $mdUtil.nextTick(function () ***REMOVED***
      // Note that the element references need to be updated, because certain "browsers"
      // (IE/Edge) lose them and start throwing "Invalid calling object" errors, when we
      // compile the element contents down in `compileElement`.
      elements = getElements();
      updateHeightFromContent();
      adjustOffset();
      updateInkBarStyles();
      ctrl.tabs[ ctrl.selectedIndex ] && ctrl.tabs[ ctrl.selectedIndex ].scope.select();
      loaded = true;
      updatePagination();
    ***REMOVED***);
  ***REMOVED***

  /**
   * Compiles the template provided by the user.  This is passed as an attribute from the tabs
   * directive's template function.
   */
  function compileTemplate () ***REMOVED***
    var template = $attrs.$mdTabsTemplate,
        element  = angular.element($element[0].querySelector('md-tab-data'));

    element.html(template);
    $compile(element.contents())(ctrl.parent);
    delete $attrs.$mdTabsTemplate;
  ***REMOVED***

  /**
   * Binds events used by the tabs component.
   */
  function bindEvents () ***REMOVED***
    angular.element($window).on('resize', handleWindowResize);
    $scope.$on('$destroy', cleanup);
  ***REMOVED***

  /**
   * Configure watcher(s) used by Tabs
   */
  function configureWatchers () ***REMOVED***
    $scope.$watch('$mdTabsCtrl.selectedIndex', handleSelectedIndexChange);
  ***REMOVED***

  /**
   * Creates a one-way binding manually rather than relying on Angular's isolated scope
   * @param key
   * @param handler
   */
  function defineOneWayBinding (key, handler) ***REMOVED***
    var attr = $attrs.$normalize('md-' + key);
    if (handler) defineProperty(key, handler);
    $attrs.$observe(attr, function (newValue) ***REMOVED*** ctrl[ key ] = newValue; ***REMOVED***);
  ***REMOVED***

  /**
   * Defines boolean attributes with default value set to true.  (ie. md-stretch-tabs with no value
   * will be treated as being truthy)
   * @param key
   * @param handler
   */
  function defineBooleanAttribute (key, handler) ***REMOVED***
    var attr = $attrs.$normalize('md-' + key);
    if (handler) defineProperty(key, handler);
    if ($attrs.hasOwnProperty(attr)) updateValue($attrs[attr]);
    $attrs.$observe(attr, updateValue);
    function updateValue (newValue) ***REMOVED***
      ctrl[ key ] = newValue !== 'false';
    ***REMOVED***
  ***REMOVED***

  /**
   * Remove any events defined by this controller
   */
  function cleanup () ***REMOVED***
    destroyed = true;
    angular.element($window).off('resize', handleWindowResize);
  ***REMOVED***

  // Change handlers

  /**
   * Toggles stretch tabs class and updates inkbar when tab stretching changes
   * @param stretchTabs
   */
  function handleStretchTabs (stretchTabs) ***REMOVED***
    var elements = getElements();
    angular.element(elements.wrapper).toggleClass('md-stretch-tabs', shouldStretchTabs());
    updateInkBarStyles();
  ***REMOVED***

  function handleCenterTabs (newValue) ***REMOVED***
    ctrl.shouldCenterTabs = shouldCenterTabs();
  ***REMOVED***

  function handleMaxTabWidth (newWidth, oldWidth) ***REMOVED***
    if (newWidth !== oldWidth) ***REMOVED***
      var elements = getElements();

      angular.forEach(elements.tabs, function(tab) ***REMOVED***
        tab.style.maxWidth = newWidth + 'px';
      ***REMOVED***);
      $mdUtil.nextTick(ctrl.updateInkBarStyles);
    ***REMOVED***
  ***REMOVED***

  function handleShouldPaginate (newValue, oldValue) ***REMOVED***
    if (newValue !== oldValue) ***REMOVED***
      ctrl.maxTabWidth      = getMaxTabWidth();
      ctrl.shouldCenterTabs = shouldCenterTabs();
      $mdUtil.nextTick(function () ***REMOVED***
        ctrl.maxTabWidth = getMaxTabWidth();
        adjustOffset(ctrl.selectedIndex);
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

  /**
   * Add/remove the `md-no-tab-content` class depending on `ctrl.hasContent`
   * @param hasContent
   */
  function handleHasContent (hasContent) ***REMOVED***
    $element[ hasContent ? 'removeClass' : 'addClass' ]('md-no-tab-content');
  ***REMOVED***

  /**
   * Apply ctrl.offsetLeft to the paging element when it changes
   * @param left
   */
  function handleOffsetChange (left) ***REMOVED***
    var elements = getElements();
    var newValue = ctrl.shouldCenterTabs ? '' : '-' + left + 'px';

    angular.element(elements.paging).css($mdConstant.CSS.TRANSFORM, 'translate3d(' + newValue + ', 0, 0)');
    $scope.$broadcast('$mdTabsPaginationChanged');
  ***REMOVED***

  /**
   * Update the UI whenever `ctrl.focusIndex` is updated
   * @param newIndex
   * @param oldIndex
   */
  function handleFocusIndexChange (newIndex, oldIndex) ***REMOVED***
    if (newIndex === oldIndex) return;
    if (!getElements().tabs[ newIndex ]) return;
    adjustOffset();
    redirectFocus();
  ***REMOVED***

  /**
   * Update the UI whenever the selected index changes. Calls user-defined select/deselect methods.
   * @param newValue
   * @param oldValue
   */
  function handleSelectedIndexChange (newValue, oldValue) ***REMOVED***
    if (newValue === oldValue) return;

    ctrl.selectedIndex     = getNearestSafeIndex(newValue);
    ctrl.lastSelectedIndex = oldValue;
    ctrl.updateInkBarStyles();
    updateHeightFromContent();
    adjustOffset(newValue);
    $scope.$broadcast('$mdTabsChanged');
    ctrl.tabs[ oldValue ] && ctrl.tabs[ oldValue ].scope.deselect();
    ctrl.tabs[ newValue ] && ctrl.tabs[ newValue ].scope.select();
  ***REMOVED***

  function getTabElementIndex(tabEl)***REMOVED***
    var tabs = $element[0].getElementsByTagName('md-tab');
    return Array.prototype.indexOf.call(tabs, tabEl[0]);
  ***REMOVED***

  /**
   * Queues up a call to `handleWindowResize` when a resize occurs while the tabs component is
   * hidden.
   */
  function handleResizeWhenVisible () ***REMOVED***
    // if there is already a watcher waiting for resize, do nothing
    if (handleResizeWhenVisible.watcher) return;
    // otherwise, we will abuse the $watch function to check for visible
    handleResizeWhenVisible.watcher = $scope.$watch(function () ***REMOVED***
      // since we are checking for DOM size, we use $mdUtil.nextTick() to wait for after the DOM updates
      $mdUtil.nextTick(function () ***REMOVED***
        // if the watcher has already run (ie. multiple digests in one cycle), do nothing
        if (!handleResizeWhenVisible.watcher) return;

        if ($element.prop('offsetParent')) ***REMOVED***
          handleResizeWhenVisible.watcher();
          handleResizeWhenVisible.watcher = null;

          handleWindowResize();
        ***REMOVED***
      ***REMOVED***, false);
    ***REMOVED***);
  ***REMOVED***

  // Event handlers / actions

  /**
   * Handle user keyboard interactions
   * @param event
   */
  function keydown (event) ***REMOVED***
    switch (event.keyCode) ***REMOVED***
      case $mdConstant.KEY_CODE.LEFT_ARROW:
        event.preventDefault();
        incrementIndex(-1, true);
        break;
      case $mdConstant.KEY_CODE.RIGHT_ARROW:
        event.preventDefault();
        incrementIndex(1, true);
        break;
      case $mdConstant.KEY_CODE.SPACE:
      case $mdConstant.KEY_CODE.ENTER:
        event.preventDefault();
        if (!locked) select(ctrl.focusIndex);
        break;
    ***REMOVED***
    ctrl.lastClick = false;
  ***REMOVED***

  /**
   * Update the selected index. Triggers a click event on the original `md-tab` element in order
   * to fire user-added click events if canSkipClick or `md-no-select-click` are false.
   * @param index
   * @param canSkipClick Optionally allow not firing the click event if `md-no-select-click` is also true.
   */
  function select (index, canSkipClick) ***REMOVED***
    if (!locked) ctrl.focusIndex = ctrl.selectedIndex = index;
    ctrl.lastClick = true;
    // skip the click event if noSelectClick is enabled
    if (canSkipClick && ctrl.noSelectClick) return;
    // nextTick is required to prevent errors in user-defined click events
    $mdUtil.nextTick(function () ***REMOVED***
      ctrl.tabs[ index ].element.triggerHandler('click');
    ***REMOVED***, false);
  ***REMOVED***

  /**
   * When pagination is on, this makes sure the selected index is in view.
   * @param event
   */
  function scroll (event) ***REMOVED***
    if (!ctrl.shouldPaginate) return;
    event.preventDefault();
    ctrl.offsetLeft = fixOffset(ctrl.offsetLeft - event.wheelDelta);
  ***REMOVED***

  /**
   * Slides the tabs over approximately one page forward.
   */
  function nextPage () ***REMOVED***
    var elements = getElements();
    var viewportWidth = elements.canvas.clientWidth,
        totalWidth    = viewportWidth + ctrl.offsetLeft,
        i, tab;
    for (i = 0; i < elements.tabs.length; i++) ***REMOVED***
      tab = elements.tabs[ i ];
      if (tab.offsetLeft + tab.offsetWidth > totalWidth) break;
    ***REMOVED***
    ctrl.offsetLeft = fixOffset(tab.offsetLeft);
  ***REMOVED***

  /**
   * Slides the tabs over approximately one page backward.
   */
  function previousPage () ***REMOVED***
    var i, tab, elements = getElements();

    for (i = 0; i < elements.tabs.length; i++) ***REMOVED***
      tab = elements.tabs[ i ];
      if (tab.offsetLeft + tab.offsetWidth >= ctrl.offsetLeft) break;
    ***REMOVED***
    ctrl.offsetLeft = fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
  ***REMOVED***

  /**
   * Update size calculations when the window is resized.
   */
  function handleWindowResize () ***REMOVED***
    ctrl.lastSelectedIndex = ctrl.selectedIndex;
    ctrl.offsetLeft        = fixOffset(ctrl.offsetLeft);
    $mdUtil.nextTick(function () ***REMOVED***
      ctrl.updateInkBarStyles();
      updatePagination();
    ***REMOVED***);
  ***REMOVED***

  function handleInkBar (hide) ***REMOVED***
    angular.element(getElements().inkBar).toggleClass('ng-hide', hide);
  ***REMOVED***

  /**
   * Toggle dynamic height class when value changes
   * @param value
   */
  function handleDynamicHeight (value) ***REMOVED***
    $element.toggleClass('md-dynamic-height', value);
  ***REMOVED***

  /**
   * Remove a tab from the data and select the nearest valid tab.
   * @param tabData
   */
  function removeTab (tabData) ***REMOVED***
    if (destroyed) return;
    var selectedIndex = ctrl.selectedIndex,
        tab           = ctrl.tabs.splice(tabData.getIndex(), 1)[ 0 ];
    refreshIndex();
    // when removing a tab, if the selected index did not change, we have to manually trigger the
    //   tab select/deselect events
    if (ctrl.selectedIndex === selectedIndex) ***REMOVED***
      tab.scope.deselect();
      ctrl.tabs[ ctrl.selectedIndex ] && ctrl.tabs[ ctrl.selectedIndex ].scope.select();
    ***REMOVED***
    $mdUtil.nextTick(function () ***REMOVED***
      updatePagination();
      ctrl.offsetLeft = fixOffset(ctrl.offsetLeft);
    ***REMOVED***);
  ***REMOVED***

  /**
   * Create an entry in the tabs array for a new tab at the specified index.
   * @param tabData
   * @param index
   * @returns ***REMOVED*******REMOVED***
   */
  function insertTab (tabData, index) ***REMOVED***
    var hasLoaded = loaded;
    var proto     = ***REMOVED***
          getIndex:     function () ***REMOVED*** return ctrl.tabs.indexOf(tab); ***REMOVED***,
          isActive:     function () ***REMOVED*** return this.getIndex() === ctrl.selectedIndex; ***REMOVED***,
          isLeft:       function () ***REMOVED*** return this.getIndex() < ctrl.selectedIndex; ***REMOVED***,
          isRight:      function () ***REMOVED*** return this.getIndex() > ctrl.selectedIndex; ***REMOVED***,
          shouldRender: function () ***REMOVED*** return !ctrl.noDisconnect || this.isActive(); ***REMOVED***,
          hasFocus:     function () ***REMOVED***
            return !ctrl.lastClick
                && ctrl.hasFocus && this.getIndex() === ctrl.focusIndex;
          ***REMOVED***,
          id:           $mdUtil.nextUid()
        ***REMOVED***,
        tab       = angular.extend(proto, tabData);
    if (angular.isDefined(index)) ***REMOVED***
      ctrl.tabs.splice(index, 0, tab);
    ***REMOVED*** else ***REMOVED***
      ctrl.tabs.push(tab);
    ***REMOVED***
    processQueue();
    updateHasContent();
    $mdUtil.nextTick(function () ***REMOVED***
      updatePagination();
      // if autoselect is enabled, select the newly added tab
      if (hasLoaded && ctrl.autoselect) $mdUtil.nextTick(function () ***REMOVED***
        $mdUtil.nextTick(function () ***REMOVED*** select(ctrl.tabs.indexOf(tab)); ***REMOVED***);
      ***REMOVED***);
    ***REMOVED***);
    return tab;
  ***REMOVED***

  // Getter methods

  /**
   * Gathers references to all of the DOM elements used by this controller.
   * @returns ***REMOVED******REMOVED******REMOVED******REMOVED***
   */
  function getElements () ***REMOVED***
    var elements = ***REMOVED******REMOVED***;
    var node = $element[0];

    // gather tab bar elements
    elements.wrapper = node.querySelector('md-tabs-wrapper');
    elements.canvas  = elements.wrapper.querySelector('md-tabs-canvas');
    elements.paging  = elements.canvas.querySelector('md-pagination-wrapper');
    elements.inkBar  = elements.paging.querySelector('md-ink-bar');

    elements.contents = node.querySelectorAll('md-tabs-content-wrapper > md-tab-content');
    elements.tabs    = elements.paging.querySelectorAll('md-tab-item');
    elements.dummies = elements.canvas.querySelectorAll('md-dummy-tab');

    return elements;
  ***REMOVED***

  /**
   * Determines whether or not the left pagination arrow should be enabled.
   * @returns ***REMOVED***boolean***REMOVED***
   */
  function canPageBack () ***REMOVED***
    return ctrl.offsetLeft > 0;
  ***REMOVED***

  /**
   * Determines whether or not the right pagination arrow should be enabled.
   * @returns ***REMOVED****|boolean***REMOVED***
   */
  function canPageForward () ***REMOVED***
    var elements = getElements();
    var lastTab = elements.tabs[ elements.tabs.length - 1 ];
    return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
        ctrl.offsetLeft;
  ***REMOVED***

  /**
   * Determines if the UI should stretch the tabs to fill the available space.
   * @returns ***REMOVED*******REMOVED***
   */
  function shouldStretchTabs () ***REMOVED***
    switch (ctrl.stretchTabs) ***REMOVED***
      case 'always':
        return true;
      case 'never':
        return false;
      default:
        return !ctrl.shouldPaginate
            && $window.matchMedia('(max-width: 600px)').matches;
    ***REMOVED***
  ***REMOVED***

  /**
   * Determines if the tabs should appear centered.
   * @returns ***REMOVED***string|boolean***REMOVED***
   */
  function shouldCenterTabs () ***REMOVED***
    return ctrl.centerTabs && !ctrl.shouldPaginate;
  ***REMOVED***

  /**
   * Determines if pagination is necessary to display the tabs within the available space.
   * @returns ***REMOVED***boolean***REMOVED***
   */
  function shouldPaginate () ***REMOVED***
    if (ctrl.noPagination || !loaded) return false;
    var canvasWidth = $element.prop('clientWidth');

    angular.forEach(getElements().dummies, function (tab) ***REMOVED***
      canvasWidth -= tab.offsetWidth;
    ***REMOVED***);

    return canvasWidth < 0;
  ***REMOVED***

  /**
   * Finds the nearest tab index that is available.  This is primarily used for when the active
   * tab is removed.
   * @param newIndex
   * @returns ***REMOVED*******REMOVED***
   */
  function getNearestSafeIndex (newIndex) ***REMOVED***
    if (newIndex === -1) return -1;
    var maxOffset = Math.max(ctrl.tabs.length - newIndex, newIndex),
        i, tab;
    for (i = 0; i <= maxOffset; i++) ***REMOVED***
      tab = ctrl.tabs[ newIndex + i ];
      if (tab && (tab.scope.disabled !== true)) return tab.getIndex();
      tab = ctrl.tabs[ newIndex - i ];
      if (tab && (tab.scope.disabled !== true)) return tab.getIndex();
    ***REMOVED***
    return newIndex;
  ***REMOVED***

  // Utility methods

  /**
   * Defines a property using a getter and setter in order to trigger a change handler without
   * using `$watch` to observe changes.
   * @param key
   * @param handler
   * @param value
   */
  function defineProperty (key, handler, value) ***REMOVED***
    Object.defineProperty(ctrl, key, ***REMOVED***
      get: function () ***REMOVED*** return value; ***REMOVED***,
      set: function (newValue) ***REMOVED***
        var oldValue = value;
        value        = newValue;
        handler && handler(newValue, oldValue);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***

  /**
   * Updates whether or not pagination should be displayed.
   */
  function updatePagination () ***REMOVED***
    updatePagingWidth();
    ctrl.maxTabWidth = getMaxTabWidth();
    ctrl.shouldPaginate = shouldPaginate();
  ***REMOVED***

  /**
   * Sets or clears fixed width for md-pagination-wrapper depending on if tabs should stretch.
   */
  function updatePagingWidth() ***REMOVED***
    var elements = getElements();
    if (shouldStretchTabs()) ***REMOVED***
      angular.element(elements.paging).css('width', '');
    ***REMOVED*** else ***REMOVED***
      angular.element(elements.paging).css('width', calcPagingWidth() + 'px');
    ***REMOVED***
  ***REMOVED***

  /**
   * Calculates the width of the pagination wrapper by summing the widths of the dummy tabs.
   * @returns ***REMOVED***number***REMOVED***
   */
  function calcPagingWidth () ***REMOVED***
    return calcTabsWidth(getElements().dummies);
  ***REMOVED***

  function calcTabsWidth(tabs) ***REMOVED***
    var width = 0;

    angular.forEach(tabs, function (tab) ***REMOVED***
      //-- Uses the larger value between `getBoundingClientRect().width` and `offsetWidth`.  This
      //   prevents `offsetWidth` value from being rounded down and causing wrapping issues, but
      //   also handles scenarios where `getBoundingClientRect()` is inaccurate (ie. tabs inside
      //   of a dialog)
      width += Math.max(tab.offsetWidth, tab.getBoundingClientRect().width);
    ***REMOVED***);

    return Math.ceil(width);
  ***REMOVED***

  function getMaxTabWidth () ***REMOVED***
    return $element.prop('clientWidth');
  ***REMOVED***

  /**
   * Re-orders the tabs and updates the selected and focus indexes to their new positions.
   * This is triggered by `tabDirective.js` when the user's tabs have been re-ordered.
   */
  function updateTabOrder () ***REMOVED***
    var selectedItem   = ctrl.tabs[ ctrl.selectedIndex ],
        focusItem      = ctrl.tabs[ ctrl.focusIndex ];
    ctrl.tabs          = ctrl.tabs.sort(function (a, b) ***REMOVED***
      return a.index - b.index;
    ***REMOVED***);
    ctrl.selectedIndex = ctrl.tabs.indexOf(selectedItem);
    ctrl.focusIndex    = ctrl.tabs.indexOf(focusItem);
  ***REMOVED***

  /**
   * This moves the selected or focus index left or right.  This is used by the keydown handler.
   * @param inc
   */
  function incrementIndex (inc, focus) ***REMOVED***
    var newIndex,
        key   = focus ? 'focusIndex' : 'selectedIndex',
        index = ctrl[ key ];
    for (newIndex = index + inc;
         ctrl.tabs[ newIndex ] && ctrl.tabs[ newIndex ].scope.disabled;
         newIndex += inc) ***REMOVED******REMOVED***
    if (ctrl.tabs[ newIndex ]) ***REMOVED***
      ctrl[ key ] = newIndex;
    ***REMOVED***
  ***REMOVED***

  /**
   * This is used to forward focus to dummy elements.  This method is necessary to avoid animation
   * issues when attempting to focus an item that is out of view.
   */
  function redirectFocus () ***REMOVED***
    getElements().dummies[ ctrl.focusIndex ].focus();
  ***REMOVED***

  /**
   * Forces the pagination to move the focused tab into view.
   */
  function adjustOffset (index) ***REMOVED***
    var elements = getElements();

    if (index == null) index = ctrl.focusIndex;
    if (!elements.tabs[ index ]) return;
    if (ctrl.shouldCenterTabs) return;
    var tab         = elements.tabs[ index ],
        left        = tab.offsetLeft,
        right       = tab.offsetWidth + left;
    ctrl.offsetLeft = Math.max(ctrl.offsetLeft, fixOffset(right - elements.canvas.clientWidth + 32 * 2));
    ctrl.offsetLeft = Math.min(ctrl.offsetLeft, fixOffset(left));
  ***REMOVED***

  /**
   * Iterates through all queued functions and clears the queue.  This is used for functions that
   * are called before the UI is ready, such as size calculations.
   */
  function processQueue () ***REMOVED***
    queue.forEach(function (func) ***REMOVED*** $mdUtil.nextTick(func); ***REMOVED***);
    queue = [];
  ***REMOVED***

  /**
   * Determines if the tab content area is needed.
   */
  function updateHasContent () ***REMOVED***
    var hasContent  = false;
    angular.forEach(ctrl.tabs, function (tab) ***REMOVED***
      if (tab.template) hasContent = true;
    ***REMOVED***);
    ctrl.hasContent = hasContent;
  ***REMOVED***

  /**
   * Moves the indexes to their nearest valid values.
   */
  function refreshIndex () ***REMOVED***
    ctrl.selectedIndex = getNearestSafeIndex(ctrl.selectedIndex);
    ctrl.focusIndex    = getNearestSafeIndex(ctrl.focusIndex);
  ***REMOVED***

  /**
   * Calculates the content height of the current tab.
   * @returns ***REMOVED*******REMOVED***
   */
  function updateHeightFromContent () ***REMOVED***
    if (!ctrl.dynamicHeight) return $element.css('height', '');
    if (!ctrl.tabs.length) return queue.push(updateHeightFromContent);

    var elements = getElements();

    var tabContent    = elements.contents[ ctrl.selectedIndex ],
        contentHeight = tabContent ? tabContent.offsetHeight : 0,
        tabsHeight    = elements.wrapper.offsetHeight,
        newHeight     = contentHeight + tabsHeight,
        currentHeight = $element.prop('clientHeight');

    if (currentHeight === newHeight) return;

    // Adjusts calculations for when the buttons are bottom-aligned since this relies on absolute
    // positioning.  This should probably be cleaned up if a cleaner solution is possible.
    if ($element.attr('md-align-tabs') === 'bottom') ***REMOVED***
      currentHeight -= tabsHeight;
      newHeight -= tabsHeight;
      // Need to include bottom border in these calculations
      if ($element.attr('md-border-bottom') !== undefined) ++currentHeight;
    ***REMOVED***

    // Lock during animation so the user can't change tabs
    locked = true;

    var fromHeight = ***REMOVED*** height: currentHeight + 'px' ***REMOVED***,
        toHeight = ***REMOVED*** height: newHeight + 'px' ***REMOVED***;

    // Set the height to the current, specific pixel height to fix a bug on iOS where the height
    // first animates to 0, then back to the proper height causing a visual glitch
    $element.css(fromHeight);

    // Animate the height from the old to the new
    $animateCss($element, ***REMOVED***
      from: fromHeight,
      to: toHeight,
      easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
      duration: 0.5
    ***REMOVED***).start().done(function () ***REMOVED***
      // Then (to fix the same iOS issue as above), disable transitions and remove the specific
      // pixel height so the height can size with browser width/content changes, etc.
      $element.css(***REMOVED***
        transition: 'none',
        height: ''
      ***REMOVED***);

      // In the next tick, re-allow transitions (if we do it all at once, $element.css is "smart"
      // enough to batch it for us instead of doing it immediately, which undoes the original
      // transition: none)
      $mdUtil.nextTick(function() ***REMOVED***
        $element.css('transition', '');
      ***REMOVED***);

      // And unlock so tab changes can occur
      locked = false;
    ***REMOVED***);
  ***REMOVED***

  /**
   * Repositions the ink bar to the selected tab.
   * @returns ***REMOVED*******REMOVED***
   */
  function updateInkBarStyles () ***REMOVED***
    var elements = getElements();

    if (!elements.tabs[ ctrl.selectedIndex ]) ***REMOVED***
      angular.element(elements.inkBar).css(***REMOVED*** left: 'auto', right: 'auto' ***REMOVED***);
      return;
    ***REMOVED***

    if (!ctrl.tabs.length) return queue.push(ctrl.updateInkBarStyles);
    // if the element is not visible, we will not be able to calculate sizes until it is
    // we should treat that as a resize event rather than just updating the ink bar
    if (!$element.prop('offsetParent')) return handleResizeWhenVisible();

    var index      = ctrl.selectedIndex,
        totalWidth = elements.paging.offsetWidth,
        tab        = elements.tabs[ index ],
        left       = tab.offsetLeft,
        right      = totalWidth - left - tab.offsetWidth;

    if (ctrl.shouldCenterTabs) ***REMOVED***
      // We need to use the same calculate process as in the pagination wrapper, to avoid rounding deviations.
      var tabWidth = calcTabsWidth(elements.tabs);

      if (totalWidth > tabWidth) ***REMOVED***
        $mdUtil.nextTick(updateInkBarStyles, false);
      ***REMOVED***
    ***REMOVED***
    updateInkBarClassName();
    angular.element(elements.inkBar).css(***REMOVED*** left: left + 'px', right: right + 'px' ***REMOVED***);
  ***REMOVED***

  /**
   * Adds left/right classes so that the ink bar will animate properly.
   */
  function updateInkBarClassName () ***REMOVED***
    var elements = getElements();
    var newIndex = ctrl.selectedIndex,
        oldIndex = ctrl.lastSelectedIndex,
        ink      = angular.element(elements.inkBar);
    if (!angular.isNumber(oldIndex)) return;
    ink
        .toggleClass('md-left', newIndex < oldIndex)
        .toggleClass('md-right', newIndex > oldIndex);
  ***REMOVED***

  /**
   * Takes an offset value and makes sure that it is within the min/max allowed values.
   * @param value
   * @returns ***REMOVED*******REMOVED***
   */
  function fixOffset (value) ***REMOVED***
    var elements = getElements();

    if (!elements.tabs.length || !ctrl.shouldPaginate) return 0;
    var lastTab    = elements.tabs[ elements.tabs.length - 1 ],
        totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
    value          = Math.max(0, value);
    value          = Math.min(totalWidth - elements.canvas.clientWidth, value);
    return value;
  ***REMOVED***

  /**
   * Attaches a ripple to the tab item element.
   * @param scope
   * @param element
   */
  function attachRipple (scope, element) ***REMOVED***
    var elements = getElements();
    var options = ***REMOVED*** colorElement: angular.element(elements.inkBar) ***REMOVED***;
    $mdTabInkRipple.attach(scope, element, options);
  ***REMOVED***
***REMOVED***
MdTabsController.$inject = ["$scope", "$element", "$window", "$mdConstant", "$mdTabInkRipple", "$mdUtil", "$animateCss", "$attrs", "$compile", "$mdTheming"];

/**
 * @ngdoc directive
 * @name mdTabs
 * @module material.components.tabs
 *
 * @restrict E
 *
 * @description
 * The `<md-tabs>` directive serves as the container for 1..n `<md-tab>` child directives to produces a Tabs components.
 * In turn, the nested `<md-tab>` directive is used to specify a tab label for the **header button** and a [optional] tab view
 * content that will be associated with each tab button.
 *
 * Below is the markup for its simplest usage:
 *
 *  <hljs lang="html">
 *  <md-tabs>
 *    <md-tab label="Tab #1"></md-tab>
 *    <md-tab label="Tab #2"></md-tab>
 *    <md-tab label="Tab #3"></md-tab>
 *  </md-tabs>
 *  </hljs>
 *
 * Tabs supports three (3) usage scenarios:
 *
 *  1. Tabs (buttons only)
 *  2. Tabs with internal view content
 *  3. Tabs with external view content
 *
 * **Tab-only** support is useful when tab buttons are used for custom navigation regardless of any other components, content, or views.
 * **Tabs with internal views** are the traditional usages where each tab has associated view content and the view switching is managed internally by the Tabs component.
 * **Tabs with external view content** is often useful when content associated with each tab is independently managed and data-binding notifications announce tab selection changes.
 *
 * Additional features also include:
 *
 * *  Content can include any markup.
 * *  If a tab is disabled while active/selected, then the next tab will be auto-selected.
 *
 * ### Explanation of tab stretching
 *
 * Initially, tabs will have an inherent size.  This size will either be defined by how much space is needed to accommodate their text or set by the user through CSS.  Calculations will be based on this size.
 *
 * On mobile devices, tabs will be expanded to fill the available horizontal space.  When this happens, all tabs will become the same size.
 *
 * On desktops, by default, stretching will never occur.
 *
 * This default behavior can be overridden through the `md-stretch-tabs` attribute.  Here is a table showing when stretching will occur:
 *
 * `md-stretch-tabs` | mobile    | desktop
 * ------------------|-----------|--------
 * `auto`            | stretched | ---
 * `always`          | stretched | stretched
 * `never`           | ---       | ---
 *
 * @param ***REMOVED***integer=***REMOVED*** md-selected Index of the active/selected tab
 * @param ***REMOVED***boolean=***REMOVED*** md-no-ink If present, disables ink ripple effects.
 * @param ***REMOVED***boolean=***REMOVED*** md-no-ink-bar If present, disables the selection ink bar.
 * @param ***REMOVED***string=***REMOVED***  md-align-tabs Attribute to indicate position of tab buttons: `bottom` or `top`; default is `top`
 * @param ***REMOVED***string=***REMOVED*** md-stretch-tabs Attribute to indicate whether or not to stretch tabs: `auto`, `always`, or `never`; default is `auto`
 * @param ***REMOVED***boolean=***REMOVED*** md-dynamic-height When enabled, the tab wrapper will resize based on the contents of the selected tab
 * @param ***REMOVED***boolean=***REMOVED*** md-border-bottom If present, shows a solid `1px` border between the tabs and their content
 * @param ***REMOVED***boolean=***REMOVED*** md-center-tabs When enabled, tabs will be centered provided there is no need for pagination
 * @param ***REMOVED***boolean=***REMOVED*** md-no-pagination When enabled, pagination will remain off
 * @param ***REMOVED***boolean=***REMOVED*** md-swipe-content When enabled, swipe gestures will be enabled for the content area to jump between tabs
 * @param ***REMOVED***boolean=***REMOVED*** md-enable-disconnect When enabled, scopes will be disconnected for tabs that are not being displayed.  This provides a performance boost, but may also cause unexpected issues and is not recommended for most users.
 * @param ***REMOVED***boolean=***REMOVED*** md-autoselect When present, any tabs added after the initial load will be automatically selected
 * @param ***REMOVED***boolean=***REMOVED*** md-no-select-click When enabled, click events will not be fired when selecting tabs
 *
 * @usage
 * <hljs lang="html">
 * <md-tabs md-selected="selectedIndex" >
 *   <img ng-src="img/angular.png" class="centered">
 *   <md-tab
 *       ng-repeat="tab in tabs | orderBy:predicate:reversed"
 *       md-on-select="onTabSelected(tab)"
 *       md-on-deselect="announceDeselected(tab)"
 *       ng-disabled="tab.disabled">
 *     <md-tab-label>
 *       ***REMOVED******REMOVED***tab.title***REMOVED******REMOVED***
 *       <img src="img/removeTab.png" ng-click="removeTab(tab)" class="delete">
 *     </md-tab-label>
 *     <md-tab-body>
 *       ***REMOVED******REMOVED***tab.content***REMOVED******REMOVED***
 *     </md-tab-body>
 *   </md-tab>
 * </md-tabs>
 * </hljs>
 *
 */
angular
    .module('material.components.tabs')
    .directive('mdTabs', MdTabs);

function MdTabs ($$mdSvgRegistry) ***REMOVED***
  return ***REMOVED***
    scope:            ***REMOVED***
      selectedIndex: '=?mdSelected'
    ***REMOVED***,
    template:         function (element, attr) ***REMOVED***
      attr[ "$mdTabsTemplate" ] = element.html();
      return '' +
        '<md-tabs-wrapper> ' +
          '<md-tab-data></md-tab-data> ' +
          '<md-prev-button ' +
              'tabindex="-1" ' +
              'role="button" ' +
              'aria-label="Previous Page" ' +
              'aria-disabled="***REMOVED******REMOVED***!$mdTabsCtrl.canPageBack()***REMOVED******REMOVED***" ' +
              'ng-class="***REMOVED*** \'md-disabled\': !$mdTabsCtrl.canPageBack() ***REMOVED***" ' +
              'ng-if="$mdTabsCtrl.shouldPaginate" ' +
              'ng-click="$mdTabsCtrl.previousPage()"> ' +
            '<md-icon md-svg-src="'+ $$mdSvgRegistry.mdTabsArrow +'"></md-icon> ' +
          '</md-prev-button> ' +
          '<md-next-button ' +
              'tabindex="-1" ' +
              'role="button" ' +
              'aria-label="Next Page" ' +
              'aria-disabled="***REMOVED******REMOVED***!$mdTabsCtrl.canPageForward()***REMOVED******REMOVED***" ' +
              'ng-class="***REMOVED*** \'md-disabled\': !$mdTabsCtrl.canPageForward() ***REMOVED***" ' +
              'ng-if="$mdTabsCtrl.shouldPaginate" ' +
              'ng-click="$mdTabsCtrl.nextPage()"> ' +
            '<md-icon md-svg-src="'+ $$mdSvgRegistry.mdTabsArrow +'"></md-icon> ' +
          '</md-next-button> ' +
          '<md-tabs-canvas ' +
              'tabindex="***REMOVED******REMOVED*** $mdTabsCtrl.hasFocus ? -1 : 0 ***REMOVED******REMOVED***" ' +
              'aria-activedescendant="tab-item-***REMOVED******REMOVED***$mdTabsCtrl.tabs[$mdTabsCtrl.focusIndex].id***REMOVED******REMOVED***" ' +
              'ng-focus="$mdTabsCtrl.redirectFocus()" ' +
              'ng-class="***REMOVED*** ' +
                  '\'md-paginated\': $mdTabsCtrl.shouldPaginate, ' +
                  '\'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs ' +
              '***REMOVED***" ' +
              'ng-keydown="$mdTabsCtrl.keydown($event)" ' +
              'role="tablist"> ' +
            '<md-pagination-wrapper ' +
                'ng-class="***REMOVED*** \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs ***REMOVED***" ' +
                'md-tab-scroll="$mdTabsCtrl.scroll($event)"> ' +
              '<md-tab-item ' +
                  'tabindex="-1" ' +
                  'class="md-tab" ' +
                  'ng-repeat="tab in $mdTabsCtrl.tabs" ' +
                  'role="tab" ' +
                  'aria-controls="tab-content-***REMOVED******REMOVED***::tab.id***REMOVED******REMOVED***" ' +
                  'aria-selected="***REMOVED******REMOVED***tab.isActive()***REMOVED******REMOVED***" ' +
                  'aria-disabled="***REMOVED******REMOVED***tab.scope.disabled || \'false\'***REMOVED******REMOVED***" ' +
                  'ng-click="$mdTabsCtrl.select(tab.getIndex())" ' +
                  'ng-class="***REMOVED*** ' +
                      '\'md-active\':    tab.isActive(), ' +
                      '\'md-focused\':   tab.hasFocus(), ' +
                      '\'md-disabled\':  tab.scope.disabled ' +
                  '***REMOVED***" ' +
                  'ng-disabled="tab.scope.disabled" ' +
                  'md-swipe-left="$mdTabsCtrl.nextPage()" ' +
                  'md-swipe-right="$mdTabsCtrl.previousPage()" ' +
                  'md-tabs-template="::tab.label" ' +
                  'md-scope="::tab.parent"></md-tab-item> ' +
              '<md-ink-bar></md-ink-bar> ' +
            '</md-pagination-wrapper> ' +
            '<md-tabs-dummy-wrapper class="_md-visually-hidden md-dummy-wrapper"> ' +
              '<md-dummy-tab ' +
                  'class="md-tab" ' +
                  'tabindex="-1" ' +
                  'id="tab-item-***REMOVED******REMOVED***::tab.id***REMOVED******REMOVED***" ' +
                  'role="tab" ' +
                  'aria-controls="tab-content-***REMOVED******REMOVED***::tab.id***REMOVED******REMOVED***" ' +
                  'aria-selected="***REMOVED******REMOVED***tab.isActive()***REMOVED******REMOVED***" ' +
                  'aria-disabled="***REMOVED******REMOVED***tab.scope.disabled || \'false\'***REMOVED******REMOVED***" ' +
                  'ng-focus="$mdTabsCtrl.hasFocus = true" ' +
                  'ng-blur="$mdTabsCtrl.hasFocus = false" ' +
                  'ng-repeat="tab in $mdTabsCtrl.tabs" ' +
                  'md-tabs-template="::tab.label" ' +
                  'md-scope="::tab.parent"></md-dummy-tab> ' +
            '</md-tabs-dummy-wrapper> ' +
          '</md-tabs-canvas> ' +
        '</md-tabs-wrapper> ' +
        '<md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent && $mdTabsCtrl.selectedIndex >= 0" class="_md"> ' +
          '<md-tab-content ' +
              'id="tab-content-***REMOVED******REMOVED***::tab.id***REMOVED******REMOVED***" ' +
              'class="_md" ' +
              'role="tabpanel" ' +
              'aria-labelledby="tab-item-***REMOVED******REMOVED***::tab.id***REMOVED******REMOVED***" ' +
              'md-swipe-left="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(1)" ' +
              'md-swipe-right="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(-1)" ' +
              'ng-if="$mdTabsCtrl.hasContent" ' +
              'ng-repeat="(index, tab) in $mdTabsCtrl.tabs" ' +
              'ng-class="***REMOVED*** ' +
                '\'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null, ' +
                '\'md-active\':        tab.isActive(), ' +
                '\'md-left\':          tab.isLeft(), ' +
                '\'md-right\':         tab.isRight(), ' +
                '\'md-no-scroll\':     $mdTabsCtrl.dynamicHeight ' +
              '***REMOVED***"> ' +
            '<div ' +
                'md-tabs-template="::tab.template" ' +
                'md-connected-if="tab.isActive()" ' +
                'md-scope="::tab.parent" ' +
                'ng-if="$mdTabsCtrl.enableDisconnect || tab.shouldRender()"></div> ' +
          '</md-tab-content> ' +
        '</md-tabs-content-wrapper>';
    ***REMOVED***,
    controller:       'MdTabsController',
    controllerAs:     '$mdTabsCtrl',
    bindToController: true
  ***REMOVED***;
***REMOVED***
MdTabs.$inject = ["$$mdSvgRegistry"];

angular
  .module('material.components.tabs')
  .directive('mdTabsDummyWrapper', MdTabsDummyWrapper);

/**
 * @private
 *
 * @param $mdUtil
 * @returns ***REMOVED******REMOVED***require: string, link: link***REMOVED******REMOVED***
 * @constructor
 * 
 * ngInject
 */
function MdTabsDummyWrapper ($mdUtil) ***REMOVED***
  return ***REMOVED***
    require: '^?mdTabs',
    link:    function link (scope, element, attr, ctrl) ***REMOVED***
      if (!ctrl) return;

      var observer = new MutationObserver(function(mutations) ***REMOVED***
        ctrl.updatePagination();
        ctrl.updateInkBarStyles();
      ***REMOVED***);
      var config = ***REMOVED*** childList: true, subtree: true ***REMOVED***;

      observer.observe(element[0], config);

      // Disconnect the observer
      scope.$on('$destroy', function() ***REMOVED***
        if (observer) ***REMOVED***
          observer.disconnect();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MdTabsDummyWrapper.$inject = ["$mdUtil"];

angular
    .module('material.components.tabs')
    .directive('mdTabsTemplate', MdTabsTemplate);

function MdTabsTemplate ($compile, $mdUtil) ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    link:     link,
    scope:    ***REMOVED***
      template:     '=mdTabsTemplate',
      connected:    '=?mdConnectedIf',
      compileScope: '=mdScope'
    ***REMOVED***,
    require:  '^?mdTabs'
  ***REMOVED***;
  function link (scope, element, attr, ctrl) ***REMOVED***
    if (!ctrl) return;

    var compileScope = ctrl.enableDisconnect ? scope.compileScope.$new() : scope.compileScope;

    element.html(scope.template);
    $compile(element.contents())(compileScope);

    return $mdUtil.nextTick(handleScope);

    function handleScope () ***REMOVED***
      scope.$watch('connected', function (value) ***REMOVED*** value === false ? disconnect() : reconnect(); ***REMOVED***);
      scope.$on('$destroy', reconnect);
    ***REMOVED***

    function disconnect () ***REMOVED***
      if (ctrl.enableDisconnect) $mdUtil.disconnectScope(compileScope);
    ***REMOVED***

    function reconnect () ***REMOVED***
      if (ctrl.enableDisconnect) $mdUtil.reconnectScope(compileScope);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
MdTabsTemplate.$inject = ["$compile", "$mdUtil"];

ng.material.components.tabs = angular.module("material.components.tabs");
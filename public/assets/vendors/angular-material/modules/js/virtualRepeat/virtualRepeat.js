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
 * @name material.components.virtualRepeat
 */
angular.module('material.components.virtualRepeat', [
  'material.core',
  'material.components.showHide'
])
.directive('mdVirtualRepeatContainer', VirtualRepeatContainerDirective)
.directive('mdVirtualRepeat', VirtualRepeatDirective);


/**
 * @ngdoc directive
 * @name mdVirtualRepeatContainer
 * @module material.components.virtualRepeat
 * @restrict E
 * @description
 * `md-virtual-repeat-container` provides the scroll container for md-virtual-repeat.
 *
 * VirtualRepeat is a limited substitute for ng-repeat that renders only
 * enough DOM nodes to fill the container and recycling them as the user scrolls.
 *
 * Once an element is not visible anymore, the VirtualRepeat recycles it and will reuse it for
 * another visible item by replacing the previous dataset with the new one.
 *
 * **Common Issues**
 * > When having one-time bindings inside of the view template, the VirtualRepeat will not properly
 * > update the bindings for new items, since the view will be recycled.
 *
 * **Notes:**
 * > The VirtualRepeat is a similar implementation to the Android
 * [RecyclerView](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html)
 *
 *
 *
 * @usage
 * <hljs lang="html">
 *
 * <md-virtual-repeat-container md-top-index="topIndex">
 *   <div md-virtual-repeat="i in items" md-item-size="20">Hello ***REMOVED******REMOVED***i***REMOVED******REMOVED***!</div>
 * </md-virtual-repeat-container>
 * </hljs>
 *
 * @param ***REMOVED***number=***REMOVED*** md-top-index Binds the index of the item that is at the top of the scroll
 *     container to $scope. It can both read and set the scroll position.
 * @param ***REMOVED***boolean=***REMOVED*** md-orient-horizontal Whether the container should scroll horizontally
 *     (defaults to orientation and scrolling vertically).
 * @param ***REMOVED***boolean=***REMOVED*** md-auto-shrink When present, the container will shrink to fit
 *     the number of items when that number is less than its original size.
 * @param ***REMOVED***number=***REMOVED*** md-auto-shrink-min Minimum number of items that md-auto-shrink
 *     will shrink to (default: 0).
 */
function VirtualRepeatContainerDirective() ***REMOVED***
  return ***REMOVED***
    controller: VirtualRepeatContainerController,
    template: virtualRepeatContainerTemplate,
    compile: function virtualRepeatContainerCompile($element, $attrs) ***REMOVED***
      $element
          .addClass('md-virtual-repeat-container')
          .addClass($attrs.hasOwnProperty('mdOrientHorizontal')
              ? 'md-orient-horizontal'
              : 'md-orient-vertical');
    ***REMOVED***
  ***REMOVED***;
***REMOVED***


function virtualRepeatContainerTemplate($element) ***REMOVED***
  return '<div class="md-virtual-repeat-scroller">' +
    '<div class="md-virtual-repeat-sizer"></div>' +
    '<div class="md-virtual-repeat-offsetter">' +
      $element[0].innerHTML +
    '</div></div>';
***REMOVED***

/**
 * Maximum size, in pixels, that can be explicitly set to an element. The actual value varies
 * between browsers, but IE11 has the very lowest size at a mere 1,533,917px. Ideally we could
 * *compute* this value, but Firefox always reports an element to have a size of zero if it
 * goes over the max, meaning that we'd have to binary search for the value.
 * @const ***REMOVED***number***REMOVED***
 */
var MAX_ELEMENT_SIZE = 1533917;

/**
 * Number of additional elements to render above and below the visible area inside
 * of the virtual repeat container. A higher number results in less flicker when scrolling
 * very quickly in Safari, but comes with a higher rendering and dirty-checking cost.
 * @const ***REMOVED***number***REMOVED***
 */
var NUM_EXTRA = 3;

/** ngInject */
function VirtualRepeatContainerController(
    $$rAF, $mdUtil, $parse, $rootScope, $window, $scope, $element, $attrs) ***REMOVED***
  this.$rootScope = $rootScope;
  this.$scope = $scope;
  this.$element = $element;
  this.$attrs = $attrs;

  /** @type ***REMOVED***number***REMOVED*** The width or height of the container */
  this.size = 0;
  /** @type ***REMOVED***number***REMOVED*** The scroll width or height of the scroller */
  this.scrollSize = 0;
  /** @type ***REMOVED***number***REMOVED*** The scrollLeft or scrollTop of the scroller */
  this.scrollOffset = 0;
  /** @type ***REMOVED***boolean***REMOVED*** Whether the scroller is oriented horizontally */
  this.horizontal = this.$attrs.hasOwnProperty('mdOrientHorizontal');
  /** @type ***REMOVED***!VirtualRepeatController***REMOVED*** The repeater inside of this container */
  this.repeater = null;
  /** @type ***REMOVED***boolean***REMOVED*** Whether auto-shrink is enabled */
  this.autoShrink = this.$attrs.hasOwnProperty('mdAutoShrink');
  /** @type ***REMOVED***number***REMOVED*** Minimum number of items to auto-shrink to */
  this.autoShrinkMin = parseInt(this.$attrs.mdAutoShrinkMin, 10) || 0;
  /** @type ***REMOVED***?number***REMOVED*** Original container size when shrank */
  this.originalSize = null;
  /** @type ***REMOVED***number***REMOVED*** Amount to offset the total scroll size by. */
  this.offsetSize = parseInt(this.$attrs.mdOffsetSize, 10) || 0;
  /** @type ***REMOVED***?string***REMOVED*** height or width element style on the container prior to auto-shrinking. */
  this.oldElementSize = null;

  if (this.$attrs.mdTopIndex) ***REMOVED***
    /** @type ***REMOVED***function(angular.Scope): number***REMOVED*** Binds to topIndex on Angular scope */
    this.bindTopIndex = $parse(this.$attrs.mdTopIndex);
    /** @type ***REMOVED***number***REMOVED*** The index of the item that is at the top of the scroll container */
    this.topIndex = this.bindTopIndex(this.$scope);

    if (!angular.isDefined(this.topIndex)) ***REMOVED***
      this.topIndex = 0;
      this.bindTopIndex.assign(this.$scope, 0);
    ***REMOVED***

    this.$scope.$watch(this.bindTopIndex, angular.bind(this, function(newIndex) ***REMOVED***
      if (newIndex !== this.topIndex) ***REMOVED***
        this.scrollToIndex(newIndex);
      ***REMOVED***
    ***REMOVED***));
  ***REMOVED*** else ***REMOVED***
    this.topIndex = 0;
  ***REMOVED***

  this.scroller = $element[0].querySelector('.md-virtual-repeat-scroller');
  this.sizer = this.scroller.querySelector('.md-virtual-repeat-sizer');
  this.offsetter = this.scroller.querySelector('.md-virtual-repeat-offsetter');

  // After the dom stablizes, measure the initial size of the container and
  // make a best effort at re-measuring as it changes.
  var boundUpdateSize = angular.bind(this, this.updateSize);

  $$rAF(angular.bind(this, function() ***REMOVED***
    boundUpdateSize();

    var debouncedUpdateSize = $mdUtil.debounce(boundUpdateSize, 10, null, false);
    var jWindow = angular.element($window);

    // Make one more attempt to get the size if it is 0.
    // This is not by any means a perfect approach, but there's really no
    // silver bullet here.
    if (!this.size) ***REMOVED***
      debouncedUpdateSize();
    ***REMOVED***

    jWindow.on('resize', debouncedUpdateSize);
    $scope.$on('$destroy', function() ***REMOVED***
      jWindow.off('resize', debouncedUpdateSize);
    ***REMOVED***);

    $scope.$emit('$md-resize-enable');
    $scope.$on('$md-resize', boundUpdateSize);
  ***REMOVED***));
***REMOVED***
VirtualRepeatContainerController.$inject = ["$$rAF", "$mdUtil", "$parse", "$rootScope", "$window", "$scope", "$element", "$attrs"];


/** Called by the md-virtual-repeat inside of the container at startup. */
VirtualRepeatContainerController.prototype.register = function(repeaterCtrl) ***REMOVED***
  this.repeater = repeaterCtrl;

  angular.element(this.scroller)
      .on('scroll wheel touchmove touchend', angular.bind(this, this.handleScroll_));
***REMOVED***;


/** @return ***REMOVED***boolean***REMOVED*** Whether the container is configured for horizontal scrolling. */
VirtualRepeatContainerController.prototype.isHorizontal = function() ***REMOVED***
  return this.horizontal;
***REMOVED***;


/** @return ***REMOVED***number***REMOVED*** The size (width or height) of the container. */
VirtualRepeatContainerController.prototype.getSize = function() ***REMOVED***
  return this.size;
***REMOVED***;


/**
 * Resizes the container.
 * @private
 * @param ***REMOVED***number***REMOVED*** size The new size to set.
 */
VirtualRepeatContainerController.prototype.setSize_ = function(size) ***REMOVED***
  var dimension = this.getDimensionName_();

  this.size = size;
  this.$element[0].style[dimension] = size + 'px';
***REMOVED***;


VirtualRepeatContainerController.prototype.unsetSize_ = function() ***REMOVED***
  this.$element[0].style[this.getDimensionName_()] = this.oldElementSize;
  this.oldElementSize = null;
***REMOVED***;


/** Instructs the container to re-measure its size. */
VirtualRepeatContainerController.prototype.updateSize = function() ***REMOVED***
  // If the original size is already determined, we can skip the update.
  if (this.originalSize) return;

  this.size = this.isHorizontal()
      ? this.$element[0].clientWidth
      : this.$element[0].clientHeight;

  // Recheck the scroll position after updating the size. This resolves
  // problems that can result if the scroll position was measured while the
  // element was display: none or detached from the document.
  this.handleScroll_();

  this.repeater && this.repeater.containerUpdated();
***REMOVED***;


/** @return ***REMOVED***number***REMOVED*** The container's scrollHeight or scrollWidth. */
VirtualRepeatContainerController.prototype.getScrollSize = function() ***REMOVED***
  return this.scrollSize;
***REMOVED***;


VirtualRepeatContainerController.prototype.getDimensionName_ = function() ***REMOVED***
  return this.isHorizontal() ? 'width' : 'height';
***REMOVED***;


/**
 * Sets the scroller element to the specified size.
 * @private
 * @param ***REMOVED***number***REMOVED*** size The new size.
 */
VirtualRepeatContainerController.prototype.sizeScroller_ = function(size) ***REMOVED***
  var dimension =  this.getDimensionName_();
  var crossDimension = this.isHorizontal() ? 'height' : 'width';

  // Clear any existing dimensions.
  this.sizer.innerHTML = '';

  // If the size falls within the browser's maximum explicit size for a single element, we can
  // set the size and be done. Otherwise, we have to create children that add up the the desired
  // size.
  if (size < MAX_ELEMENT_SIZE) ***REMOVED***
    this.sizer.style[dimension] = size + 'px';
  ***REMOVED*** else ***REMOVED***
    this.sizer.style[dimension] = 'auto';
    this.sizer.style[crossDimension] = 'auto';

    // Divide the total size we have to render into N max-size pieces.
    var numChildren = Math.floor(size / MAX_ELEMENT_SIZE);

    // Element template to clone for each max-size piece.
    var sizerChild = document.createElement('div');
    sizerChild.style[dimension] = MAX_ELEMENT_SIZE + 'px';
    sizerChild.style[crossDimension] = '1px';

    for (var i = 0; i < numChildren; i++) ***REMOVED***
      this.sizer.appendChild(sizerChild.cloneNode(false));
    ***REMOVED***

    // Re-use the element template for the remainder.
    sizerChild.style[dimension] = (size - (numChildren * MAX_ELEMENT_SIZE)) + 'px';
    this.sizer.appendChild(sizerChild);
  ***REMOVED***
***REMOVED***;


/**
 * If auto-shrinking is enabled, shrinks or unshrinks as appropriate.
 * @private
 * @param ***REMOVED***number***REMOVED*** size The new size.
 */
VirtualRepeatContainerController.prototype.autoShrink_ = function(size) ***REMOVED***
  var shrinkSize = Math.max(size, this.autoShrinkMin * this.repeater.getItemSize());

  if (this.autoShrink && shrinkSize !== this.size) ***REMOVED***
    if (this.oldElementSize === null) ***REMOVED***
      this.oldElementSize = this.$element[0].style[this.getDimensionName_()];
    ***REMOVED***

    var currentSize = this.originalSize || this.size;

    if (!currentSize || shrinkSize < currentSize) ***REMOVED***
      if (!this.originalSize) ***REMOVED***
        this.originalSize = this.size;
      ***REMOVED***

      // Now we update the containers size, because shrinking is enabled.
      this.setSize_(shrinkSize);
    ***REMOVED*** else if (this.originalSize !== null) ***REMOVED***
      // Set the size back to our initial size.
      this.unsetSize_();

      var _originalSize = this.originalSize;
      this.originalSize = null;

      // We determine the repeaters size again, if the original size was zero.
      // The originalSize needs to be null, to be able to determine the size.
      if (!_originalSize) this.updateSize();

      // Apply the original size or the determined size back to the container, because
      // it has been overwritten before, in the shrink block.
      this.setSize_(_originalSize || this.size);
    ***REMOVED***

    this.repeater.containerUpdated();
  ***REMOVED***
***REMOVED***;


/**
 * Sets the scrollHeight or scrollWidth. Called by the repeater based on
 * its item count and item size.
 * @param ***REMOVED***number***REMOVED*** itemsSize The total size of the items.
 */
VirtualRepeatContainerController.prototype.setScrollSize = function(itemsSize) ***REMOVED***
  var size = itemsSize + this.offsetSize;
  if (this.scrollSize === size) return;

  this.sizeScroller_(size);
  this.autoShrink_(size);
  this.scrollSize = size;
***REMOVED***;


/** @return ***REMOVED***number***REMOVED*** The container's current scroll offset. */
VirtualRepeatContainerController.prototype.getScrollOffset = function() ***REMOVED***
  return this.scrollOffset;
***REMOVED***;

/**
 * Scrolls to a given scrollTop position.
 * @param ***REMOVED***number***REMOVED*** position
 */
VirtualRepeatContainerController.prototype.scrollTo = function(position) ***REMOVED***
  this.scroller[this.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = position;
  this.handleScroll_();
***REMOVED***;

/**
 * Scrolls the item with the given index to the top of the scroll container.
 * @param ***REMOVED***number***REMOVED*** index
 */
VirtualRepeatContainerController.prototype.scrollToIndex = function(index) ***REMOVED***
  var itemSize = this.repeater.getItemSize();
  var itemsLength = this.repeater.itemsLength;
  if(index > itemsLength) ***REMOVED***
    index = itemsLength - 1;
  ***REMOVED***
  this.scrollTo(itemSize * index);
***REMOVED***;

VirtualRepeatContainerController.prototype.resetScroll = function() ***REMOVED***
  this.scrollTo(0);
***REMOVED***;


VirtualRepeatContainerController.prototype.handleScroll_ = function() ***REMOVED***
  var doc = angular.element(document)[0];
  var ltr = doc.dir != 'rtl' && doc.body.dir != 'rtl';
  if(!ltr && !this.maxSize) ***REMOVED***
    this.scroller.scrollLeft = this.scrollSize;
    this.maxSize = this.scroller.scrollLeft;
  ***REMOVED***
  var offset = this.isHorizontal() ?
      (ltr?this.scroller.scrollLeft : this.maxSize - this.scroller.scrollLeft)
      : this.scroller.scrollTop;
  if (offset === this.scrollOffset || offset > this.scrollSize - this.size) return;

  var itemSize = this.repeater.getItemSize();
  if (!itemSize) return;

  var numItems = Math.max(0, Math.floor(offset / itemSize) - NUM_EXTRA);

  var transform = (this.isHorizontal() ? 'translateX(' : 'translateY(') +
      (!this.isHorizontal() || ltr ? (numItems * itemSize) : - (numItems * itemSize))  + 'px)';

  this.scrollOffset = offset;
  this.offsetter.style.webkitTransform = transform;
  this.offsetter.style.transform = transform;

  if (this.bindTopIndex) ***REMOVED***
    var topIndex = Math.floor(offset / itemSize);
    if (topIndex !== this.topIndex && topIndex < this.repeater.getItemCount()) ***REMOVED***
      this.topIndex = topIndex;
      this.bindTopIndex.assign(this.$scope, topIndex);
      if (!this.$rootScope.$$phase) this.$scope.$digest();
    ***REMOVED***
  ***REMOVED***

  this.repeater.containerUpdated();
***REMOVED***;


/**
 * @ngdoc directive
 * @name mdVirtualRepeat
 * @module material.components.virtualRepeat
 * @restrict A
 * @priority 1000
 * @description
 * `md-virtual-repeat` specifies an element to repeat using virtual scrolling.
 *
 * Virtual repeat is a limited substitute for ng-repeat that renders only
 * enough dom nodes to fill the container and recycling them as the user scrolls.
 * Arrays, but not objects are supported for iteration.
 * Track by, as alias, and (key, value) syntax are not supported.
 *
 * @usage
 * <hljs lang="html">
 * <md-virtual-repeat-container>
 *   <div md-virtual-repeat="i in items">Hello ***REMOVED******REMOVED***i***REMOVED******REMOVED***!</div>
 * </md-virtual-repeat-container>
 *
 * <md-virtual-repeat-container md-orient-horizontal>
 *   <div md-virtual-repeat="i in items" md-item-size="20">Hello ***REMOVED******REMOVED***i***REMOVED******REMOVED***!</div>
 * </md-virtual-repeat-container>
 * </hljs>
 *
 * @param ***REMOVED***number=***REMOVED*** md-item-size The height or width of the repeated elements (which must be
 *   identical for each element). Optional. Will attempt to read the size from the dom if missing,
 *   but still assumes that all repeated nodes have same height or width.
 * @param ***REMOVED***string=***REMOVED*** md-extra-name Evaluates to an additional name to which the current iterated item
 *   can be assigned on the repeated scope (needed for use in `md-autocomplete`).
 * @param ***REMOVED***boolean=***REMOVED*** md-on-demand When present, treats the md-virtual-repeat argument as an object
 *   that can fetch rows rather than an array.
 *
 *   **NOTE:** This object must implement the following interface with two (2) methods:
 *
 *   - `getItemAtIndex: function(index) [object]` The item at that index or null if it is not yet
 *     loaded (it should start downloading the item in that case).
 *   - `getLength: function() [number]` The data length to which the repeater container
 *     should be sized. Ideally, when the count is known, this method should return it.
 *     Otherwise, return a higher number than the currently loaded items to produce an
 *     infinite-scroll behavior.
 */
function VirtualRepeatDirective($parse) ***REMOVED***
  return ***REMOVED***
    controller: VirtualRepeatController,
    priority: 1000,
    require: ['mdVirtualRepeat', '^^mdVirtualRepeatContainer'],
    restrict: 'A',
    terminal: true,
    transclude: 'element',
    compile: function VirtualRepeatCompile($element, $attrs) ***REMOVED***
      var expression = $attrs.mdVirtualRepeat;
      var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/);
      var repeatName = match[1];
      var repeatListExpression = $parse(match[2]);
      var extraName = $attrs.mdExtraName && $parse($attrs.mdExtraName);

      return function VirtualRepeatLink($scope, $element, $attrs, ctrl, $transclude) ***REMOVED***
        ctrl[0].link_(ctrl[1], $transclude, repeatName, repeatListExpression, extraName);
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
VirtualRepeatDirective.$inject = ["$parse"];


/** ngInject */
function VirtualRepeatController($scope, $element, $attrs, $browser, $document, $rootScope,
    $$rAF, $mdUtil) ***REMOVED***
  this.$scope = $scope;
  this.$element = $element;
  this.$attrs = $attrs;
  this.$browser = $browser;
  this.$document = $document;
  this.$rootScope = $rootScope;
  this.$$rAF = $$rAF;

  /** @type ***REMOVED***boolean***REMOVED*** Whether we are in on-demand mode. */
  this.onDemand = $mdUtil.parseAttributeBoolean($attrs.mdOnDemand);
  /** @type ***REMOVED***!Function***REMOVED*** Backup reference to $browser.$$checkUrlChange */
  this.browserCheckUrlChange = $browser.$$checkUrlChange;
  /** @type ***REMOVED***number***REMOVED*** Most recent starting repeat index (based on scroll offset) */
  this.newStartIndex = 0;
  /** @type ***REMOVED***number***REMOVED*** Most recent ending repeat index (based on scroll offset) */
  this.newEndIndex = 0;
  /** @type ***REMOVED***number***REMOVED*** Most recent end visible index (based on scroll offset) */
  this.newVisibleEnd = 0;
  /** @type ***REMOVED***number***REMOVED*** Previous starting repeat index (based on scroll offset) */
  this.startIndex = 0;
  /** @type ***REMOVED***number***REMOVED*** Previous ending repeat index (based on scroll offset) */
  this.endIndex = 0;
  // TODO: measure width/height of first element from dom if not provided.
  // getComputedStyle?
  /** @type ***REMOVED***?number***REMOVED*** Height/width of repeated elements. */
  this.itemSize = $scope.$eval($attrs.mdItemSize) || null;

  /** @type ***REMOVED***boolean***REMOVED*** Whether this is the first time that items are rendered. */
  this.isFirstRender = true;

  /**
   * @private ***REMOVED***boolean***REMOVED*** Whether the items in the list are already being updated. Used to prevent
   *     nested calls to virtualRepeatUpdate_.
   */
  this.isVirtualRepeatUpdating_ = false;

  /** @type ***REMOVED***number***REMOVED*** Most recently seen length of items. */
  this.itemsLength = 0;

  /**
   * @type ***REMOVED***!Function***REMOVED*** Unwatch callback for item size (when md-items-size is
   *     not specified), or angular.noop otherwise.
   */
  this.unwatchItemSize_ = angular.noop;

  /**
   * Presently rendered blocks by repeat index.
   * @type ***REMOVED***Object<number, !VirtualRepeatController.Block***REMOVED***
   */
  this.blocks = ***REMOVED******REMOVED***;
  /** @type ***REMOVED***Array<!VirtualRepeatController.Block>***REMOVED*** A pool of presently unused blocks. */
  this.pooledBlocks = [];

  $scope.$on('$destroy', angular.bind(this, this.cleanupBlocks_));
***REMOVED***
VirtualRepeatController.$inject = ["$scope", "$element", "$attrs", "$browser", "$document", "$rootScope", "$$rAF", "$mdUtil"];


/**
 * An object representing a repeated item.
 * @typedef ***REMOVED******REMOVED***element: !jqLite, new: boolean, scope: !angular.Scope***REMOVED******REMOVED***
 */
VirtualRepeatController.Block;


/**
 * Called at startup by the md-virtual-repeat postLink function.
 * @param ***REMOVED***!VirtualRepeatContainerController***REMOVED*** container The container's controller.
 * @param ***REMOVED***!Function***REMOVED*** transclude The repeated element's bound transclude function.
 * @param ***REMOVED***string***REMOVED*** repeatName The left hand side of the repeat expression, indicating
 *     the name for each item in the array.
 * @param ***REMOVED***!Function***REMOVED*** repeatListExpression A compiled expression based on the right hand side
 *     of the repeat expression. Points to the array to repeat over.
 * @param ***REMOVED***string|undefined***REMOVED*** extraName The optional extra repeatName.
 */
VirtualRepeatController.prototype.link_ =
    function(container, transclude, repeatName, repeatListExpression, extraName) ***REMOVED***
  this.container = container;
  this.transclude = transclude;
  this.repeatName = repeatName;
  this.rawRepeatListExpression = repeatListExpression;
  this.extraName = extraName;
  this.sized = false;

  this.repeatListExpression = angular.bind(this, this.repeatListExpression_);

  this.container.register(this);
***REMOVED***;


/** @private Cleans up unused blocks. */
VirtualRepeatController.prototype.cleanupBlocks_ = function() ***REMOVED***
  angular.forEach(this.pooledBlocks, function cleanupBlock(block) ***REMOVED***
    block.element.remove();
  ***REMOVED***);
***REMOVED***;


/** @private Attempts to set itemSize by measuring a repeated element in the dom */
VirtualRepeatController.prototype.readItemSize_ = function() ***REMOVED***
  if (this.itemSize) ***REMOVED***
    // itemSize was successfully read in a different asynchronous call.
    return;
  ***REMOVED***

  this.items = this.repeatListExpression(this.$scope);
  this.parentNode = this.$element[0].parentNode;
  var block = this.getBlock_(0);
  if (!block.element[0].parentNode) ***REMOVED***
    this.parentNode.appendChild(block.element[0]);
  ***REMOVED***

  this.itemSize = block.element[0][
      this.container.isHorizontal() ? 'offsetWidth' : 'offsetHeight'] || null;

  this.blocks[0] = block;
  this.poolBlock_(0);

  if (this.itemSize) ***REMOVED***
    this.containerUpdated();
  ***REMOVED***
***REMOVED***;


/**
 * Returns the user-specified repeat list, transforming it into an array-like
 * object in the case of infinite scroll/dynamic load mode.
 * @param ***REMOVED***!angular.Scope***REMOVED*** The scope.
 * @return ***REMOVED***!Array|!Object***REMOVED*** An array or array-like object for iteration.
 */
VirtualRepeatController.prototype.repeatListExpression_ = function(scope) ***REMOVED***
  var repeatList = this.rawRepeatListExpression(scope);

  if (this.onDemand && repeatList) ***REMOVED***
    var virtualList = new VirtualRepeatModelArrayLike(repeatList);
    virtualList.$$includeIndexes(this.newStartIndex, this.newVisibleEnd);
    return virtualList;
  ***REMOVED*** else ***REMOVED***
    return repeatList;
  ***REMOVED***
***REMOVED***;


/**
 * Called by the container. Informs us that the containers scroll or size has
 * changed.
 */
VirtualRepeatController.prototype.containerUpdated = function() ***REMOVED***
  // If itemSize is unknown, attempt to measure it.
  if (!this.itemSize) ***REMOVED***
    // Make sure to clean up watchers if we can (see #8178)
    if(this.unwatchItemSize_ && this.unwatchItemSize_ !== angular.noop)***REMOVED***
      this.unwatchItemSize_();
    ***REMOVED***
    this.unwatchItemSize_ = this.$scope.$watchCollection(
        this.repeatListExpression,
        angular.bind(this, function(items) ***REMOVED***
          if (items && items.length) ***REMOVED***
            this.readItemSize_();
          ***REMOVED***
        ***REMOVED***));
    if (!this.$rootScope.$$phase) this.$scope.$digest();

    return;
  ***REMOVED*** else if (!this.sized) ***REMOVED***
    this.items = this.repeatListExpression(this.$scope);
  ***REMOVED***

  if (!this.sized) ***REMOVED***
    this.unwatchItemSize_();
    this.sized = true;
    this.$scope.$watchCollection(this.repeatListExpression,
        angular.bind(this, function(items, oldItems) ***REMOVED***
          if (!this.isVirtualRepeatUpdating_) ***REMOVED***
            this.virtualRepeatUpdate_(items, oldItems);
          ***REMOVED***
        ***REMOVED***));
  ***REMOVED***

  this.updateIndexes_();

  if (this.newStartIndex !== this.startIndex ||
      this.newEndIndex !== this.endIndex ||
      this.container.getScrollOffset() > this.container.getScrollSize()) ***REMOVED***
    if (this.items instanceof VirtualRepeatModelArrayLike) ***REMOVED***
      this.items.$$includeIndexes(this.newStartIndex, this.newEndIndex);
    ***REMOVED***
    this.virtualRepeatUpdate_(this.items, this.items);
  ***REMOVED***
***REMOVED***;


/**
 * Called by the container. Returns the size of a single repeated item.
 * @return ***REMOVED***?number***REMOVED*** Size of a repeated item.
 */
VirtualRepeatController.prototype.getItemSize = function() ***REMOVED***
  return this.itemSize;
***REMOVED***;


/**
 * Called by the container. Returns the size of a single repeated item.
 * @return ***REMOVED***?number***REMOVED*** Size of a repeated item.
 */
VirtualRepeatController.prototype.getItemCount = function() ***REMOVED***
  return this.itemsLength;
***REMOVED***;


/**
 * Updates the order and visible offset of repeated blocks in response to scrolling
 * or items updates.
 * @private
 */
VirtualRepeatController.prototype.virtualRepeatUpdate_ = function(items, oldItems) ***REMOVED***
  this.isVirtualRepeatUpdating_ = true;

  var itemsLength = items && items.length || 0;
  var lengthChanged = false;

  // If the number of items shrank
  if (this.items && itemsLength < this.items.length && this.container.getScrollOffset() !== 0) ***REMOVED***
    this.items = items;
    var previousScrollOffset = this.container.getScrollOffset();
    this.container.resetScroll();
    this.container.scrollTo(previousScrollOffset);
    return;
  ***REMOVED***

  if (itemsLength !== this.itemsLength) ***REMOVED***
    lengthChanged = true;
    this.itemsLength = itemsLength;
  ***REMOVED***

  this.items = items;
  if (items !== oldItems || lengthChanged) ***REMOVED***
    this.updateIndexes_();
  ***REMOVED***

  this.parentNode = this.$element[0].parentNode;

  if (lengthChanged) ***REMOVED***
    this.container.setScrollSize(itemsLength * this.itemSize);
  ***REMOVED***

  if (this.isFirstRender) ***REMOVED***
    this.isFirstRender = false;
    var startIndex = this.$attrs.mdStartIndex ?
      this.$scope.$eval(this.$attrs.mdStartIndex) :
      this.container.topIndex;
    this.container.scrollToIndex(startIndex);
  ***REMOVED***

  // Detach and pool any blocks that are no longer in the viewport.
  Object.keys(this.blocks).forEach(function(blockIndex) ***REMOVED***
    var index = parseInt(blockIndex, 10);
    if (index < this.newStartIndex || index >= this.newEndIndex) ***REMOVED***
      this.poolBlock_(index);
    ***REMOVED***
  ***REMOVED***, this);

  // Add needed blocks.
  // For performance reasons, temporarily block browser url checks as we digest
  // the restored block scopes ($$checkUrlChange reads window.location to
  // check for changes and trigger route change, etc, which we don't need when
  // trying to scroll at 60fps).
  this.$browser.$$checkUrlChange = angular.noop;

  var i, block,
      newStartBlocks = [],
      newEndBlocks = [];

  // Collect blocks at the top.
  for (i = this.newStartIndex; i < this.newEndIndex && this.blocks[i] == null; i++) ***REMOVED***
    block = this.getBlock_(i);
    this.updateBlock_(block, i);
    newStartBlocks.push(block);
  ***REMOVED***

  // Update blocks that are already rendered.
  for (; this.blocks[i] != null; i++) ***REMOVED***
    this.updateBlock_(this.blocks[i], i);
  ***REMOVED***
  var maxIndex = i - 1;

  // Collect blocks at the end.
  for (; i < this.newEndIndex; i++) ***REMOVED***
    block = this.getBlock_(i);
    this.updateBlock_(block, i);
    newEndBlocks.push(block);
  ***REMOVED***

  // Attach collected blocks to the document.
  if (newStartBlocks.length) ***REMOVED***
    this.parentNode.insertBefore(
        this.domFragmentFromBlocks_(newStartBlocks),
        this.$element[0].nextSibling);
  ***REMOVED***
  if (newEndBlocks.length) ***REMOVED***
    this.parentNode.insertBefore(
        this.domFragmentFromBlocks_(newEndBlocks),
        this.blocks[maxIndex] && this.blocks[maxIndex].element[0].nextSibling);
  ***REMOVED***

  // Restore $$checkUrlChange.
  this.$browser.$$checkUrlChange = this.browserCheckUrlChange;

  this.startIndex = this.newStartIndex;
  this.endIndex = this.newEndIndex;

  this.isVirtualRepeatUpdating_ = false;
***REMOVED***;


/**
 * @param ***REMOVED***number***REMOVED*** index Where the block is to be in the repeated list.
 * @return ***REMOVED***!VirtualRepeatController.Block***REMOVED*** A new or pooled block to place at the specified index.
 * @private
 */
VirtualRepeatController.prototype.getBlock_ = function(index) ***REMOVED***
  if (this.pooledBlocks.length) ***REMOVED***
    return this.pooledBlocks.pop();
  ***REMOVED***

  var block;
  this.transclude(angular.bind(this, function(clone, scope) ***REMOVED***
    block = ***REMOVED***
      element: clone,
      new: true,
      scope: scope
    ***REMOVED***;

    this.updateScope_(scope, index);
    this.parentNode.appendChild(clone[0]);
  ***REMOVED***));

  return block;
***REMOVED***;


/**
 * Updates and if not in a digest cycle, digests the specified block's scope to the data
 * at the specified index.
 * @param ***REMOVED***!VirtualRepeatController.Block***REMOVED*** block The block whose scope should be updated.
 * @param ***REMOVED***number***REMOVED*** index The index to set.
 * @private
 */
VirtualRepeatController.prototype.updateBlock_ = function(block, index) ***REMOVED***
  this.blocks[index] = block;

  if (!block.new &&
      (block.scope.$index === index && block.scope[this.repeatName] === this.items[index])) ***REMOVED***
    return;
  ***REMOVED***
  block.new = false;

  // Update and digest the block's scope.
  this.updateScope_(block.scope, index);

  // Perform digest before reattaching the block.
  // Any resulting synchronous dom mutations should be much faster as a result.
  // This might break some directives, but I'm going to try it for now.
  if (!this.$rootScope.$$phase) ***REMOVED***
    block.scope.$digest();
  ***REMOVED***
***REMOVED***;


/**
 * Updates scope to the data at the specified index.
 * @param ***REMOVED***!angular.Scope***REMOVED*** scope The scope which should be updated.
 * @param ***REMOVED***number***REMOVED*** index The index to set.
 * @private
 */
VirtualRepeatController.prototype.updateScope_ = function(scope, index) ***REMOVED***
  scope.$index = index;
  scope[this.repeatName] = this.items && this.items[index];
  if (this.extraName) scope[this.extraName(this.$scope)] = this.items[index];
***REMOVED***;


/**
 * Pools the block at the specified index (Pulls its element out of the dom and stores it).
 * @param ***REMOVED***number***REMOVED*** index The index at which the block to pool is stored.
 * @private
 */
VirtualRepeatController.prototype.poolBlock_ = function(index) ***REMOVED***
  this.pooledBlocks.push(this.blocks[index]);
  this.parentNode.removeChild(this.blocks[index].element[0]);
  delete this.blocks[index];
***REMOVED***;


/**
 * Produces a dom fragment containing the elements from the list of blocks.
 * @param ***REMOVED***!Array<!VirtualRepeatController.Block>***REMOVED*** blocks The blocks whose elements
 *     should be added to the document fragment.
 * @return ***REMOVED***DocumentFragment***REMOVED***
 * @private
 */
VirtualRepeatController.prototype.domFragmentFromBlocks_ = function(blocks) ***REMOVED***
  var fragment = this.$document[0].createDocumentFragment();
  blocks.forEach(function(block) ***REMOVED***
    fragment.appendChild(block.element[0]);
  ***REMOVED***);
  return fragment;
***REMOVED***;


/**
 * Updates start and end indexes based on length of repeated items and container size.
 * @private
 */
VirtualRepeatController.prototype.updateIndexes_ = function() ***REMOVED***
  var itemsLength = this.items ? this.items.length : 0;
  var containerLength = Math.ceil(this.container.getSize() / this.itemSize);

  this.newStartIndex = Math.max(0, Math.min(
      itemsLength - containerLength,
      Math.floor(this.container.getScrollOffset() / this.itemSize)));
  this.newVisibleEnd = this.newStartIndex + containerLength + NUM_EXTRA;
  this.newEndIndex = Math.min(itemsLength, this.newVisibleEnd);
  this.newStartIndex = Math.max(0, this.newStartIndex - NUM_EXTRA);
***REMOVED***;

/**
 * This VirtualRepeatModelArrayLike class enforces the interface requirements
 * for infinite scrolling within a mdVirtualRepeatContainer. An object with this
 * interface must implement the following interface with two (2) methods:
 *
 * getItemAtIndex: function(index) -> item at that index or null if it is not yet
 *     loaded (It should start downloading the item in that case).
 *
 * getLength: function() -> number The data legnth to which the repeater container
 *     should be sized. Ideally, when the count is known, this method should return it.
 *     Otherwise, return a higher number than the currently loaded items to produce an
 *     infinite-scroll behavior.
 *
 * @usage
 * <hljs lang="html">
 *  <md-virtual-repeat-container md-orient-horizontal>
 *    <div md-virtual-repeat="i in items" md-on-demand>
 *      Hello ***REMOVED******REMOVED***i***REMOVED******REMOVED***!
 *    </div>
 *  </md-virtual-repeat-container>
 * </hljs>
 *
 */
function VirtualRepeatModelArrayLike(model) ***REMOVED***
  if (!angular.isFunction(model.getItemAtIndex) ||
      !angular.isFunction(model.getLength)) ***REMOVED***
    throw Error('When md-on-demand is enabled, the Object passed to md-virtual-repeat must implement ' +
        'functions getItemAtIndex() and getLength() ');
  ***REMOVED***

  this.model = model;
***REMOVED***


VirtualRepeatModelArrayLike.prototype.$$includeIndexes = function(start, end) ***REMOVED***
  for (var i = start; i < end; i++) ***REMOVED***
    if (!this.hasOwnProperty(i)) ***REMOVED***
      this[i] = this.model.getItemAtIndex(i);
    ***REMOVED***
  ***REMOVED***
  this.length = this.model.getLength();
***REMOVED***;


function abstractMethod() ***REMOVED***
  throw Error('Non-overridden abstract method called.');
***REMOVED***

***REMOVED***)(window, window.angular);
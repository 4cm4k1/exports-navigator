/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.sticky');
goog.require('ngmaterial.components.content');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.sticky
 * @description
 * Sticky effects for md
 *
 */
angular
  .module('material.components.sticky', [
    'material.core',
    'material.components.content'
  ])
  .factory('$mdSticky', MdSticky);

/**
 * @ngdoc service
 * @name $mdSticky
 * @module material.components.sticky
 *
 * @description
 * The `$mdSticky`service provides a mixin to make elements sticky.
 *
 * Whenever the current browser supports stickiness natively, the `$mdSticky` service will just
 * use the native browser stickiness.
 *
 * By default the `$mdSticky` service compiles the cloned element, when not specified through the `elementClone`
 * parameter, in the same scope as the actual element lives.
 *
 *
 * <h3>Notes</h3>
 * When using an element which is containing a compiled directive, which changed its DOM structure during compilation,
 * you should compile the clone yourself using the plain template.<br/><br/>
 * See the right usage below:
 * <hljs lang="js">
 *   angular.module('myModule')
 *     .directive('stickySelect', function($mdSticky, $compile) ***REMOVED***
 *       var SELECT_TEMPLATE =
 *         '<md-select ng-model="selected">' +
 *           '<md-option>Option 1</md-option>' +
 *         '</md-select>';
 *
 *       return ***REMOVED***
 *         restrict: 'E',
 *         replace: true,
 *         template: SELECT_TEMPLATE,
 *         link: function(scope,element) ***REMOVED***
 *           $mdSticky(scope, element, $compile(SELECT_TEMPLATE)(scope));
 *         ***REMOVED***
 *       ***REMOVED***;
 *     ***REMOVED***);
 * </hljs>
 *
 * @usage
 * <hljs lang="js">
 *   angular.module('myModule')
 *     .directive('stickyText', function($mdSticky, $compile) ***REMOVED***
 *       return ***REMOVED***
 *         restrict: 'E',
 *         template: '<span>Sticky Text</span>',
 *         link: function(scope,element) ***REMOVED***
 *           $mdSticky(scope, element);
 *         ***REMOVED***
 *       ***REMOVED***;
 *     ***REMOVED***);
 * </hljs>
 *
 * @returns A `$mdSticky` function that takes three arguments:
 *   - `scope`
 *   - `element`: The element that will be 'sticky'
 *   - `elementClone`: A clone of the element, that will be shown
 *     when the user starts scrolling past the original element.
 *     If not provided, it will use the result of `element.clone()` and compiles it in the given scope.
 */
function MdSticky($mdConstant, $$rAF, $mdUtil, $compile) ***REMOVED***

  var browserStickySupport = $mdUtil.checkStickySupport();

  /**
   * Registers an element as sticky, used internally by directives to register themselves
   */
  return function registerStickyElement(scope, element, stickyClone) ***REMOVED***
    var contentCtrl = element.controller('mdContent');
    if (!contentCtrl) return;

    if (browserStickySupport) ***REMOVED***
      element.css(***REMOVED***
        position: browserStickySupport,
        top: 0,
        'z-index': 2
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      var $$sticky = contentCtrl.$element.data('$$sticky');
      if (!$$sticky) ***REMOVED***
        $$sticky = setupSticky(contentCtrl);
        contentCtrl.$element.data('$$sticky', $$sticky);
      ***REMOVED***

      // Compile our cloned element, when cloned in this service, into the given scope.
      var cloneElement = stickyClone || $compile(element.clone())(scope);

      var deregister = $$sticky.add(element, cloneElement);
      scope.$on('$destroy', deregister);
    ***REMOVED***
  ***REMOVED***;

  function setupSticky(contentCtrl) ***REMOVED***
    var contentEl = contentCtrl.$element;

    // Refresh elements is very expensive, so we use the debounced
    // version when possible.
    var debouncedRefreshElements = $$rAF.throttle(refreshElements);

    // setupAugmentedScrollEvents gives us `$scrollstart` and `$scroll`,
    // more reliable than `scroll` on android.
    setupAugmentedScrollEvents(contentEl);
    contentEl.on('$scrollstart', debouncedRefreshElements);
    contentEl.on('$scroll', onScroll);

    var self;
    return self = ***REMOVED***
      prev: null,
      current: null, //the currently stickied item
      next: null,
      items: [],
      add: add,
      refreshElements: refreshElements
    ***REMOVED***;

    /***************
     * Public
     ***************/
    // Add an element and its sticky clone to this content's sticky collection
    function add(element, stickyClone) ***REMOVED***
      stickyClone.addClass('md-sticky-clone');

      var item = ***REMOVED***
        element: element,
        clone: stickyClone
      ***REMOVED***;
      self.items.push(item);

      $mdUtil.nextTick(function() ***REMOVED***
        contentEl.prepend(item.clone);
      ***REMOVED***);

      debouncedRefreshElements();

      return function remove() ***REMOVED***
        self.items.forEach(function(item, index) ***REMOVED***
          if (item.element[0] === element[0]) ***REMOVED***
            self.items.splice(index, 1);
            item.clone.remove();
          ***REMOVED***
        ***REMOVED***);
        debouncedRefreshElements();
      ***REMOVED***;
    ***REMOVED***

    function refreshElements() ***REMOVED***
      // Sort our collection of elements by their current position in the DOM.
      // We need to do this because our elements' order of being added may not
      // be the same as their order of display.
      self.items.forEach(refreshPosition);
      self.items = self.items.sort(function(a, b) ***REMOVED***
        return a.top < b.top ? -1 : 1;
      ***REMOVED***);

      // Find which item in the list should be active, 
      // based upon the content's current scroll position
      var item;
      var currentScrollTop = contentEl.prop('scrollTop');
      for (var i = self.items.length - 1; i >= 0; i--) ***REMOVED***
        if (currentScrollTop > self.items[i].top) ***REMOVED***
          item = self.items[i];
          break;
        ***REMOVED***
      ***REMOVED***
      setCurrentItem(item);
    ***REMOVED***

    /***************
     * Private
     ***************/

    // Find the `top` of an item relative to the content element,
    // and also the height.
    function refreshPosition(item) ***REMOVED***
      // Find the top of an item by adding to the offsetHeight until we reach the 
      // content element.
      var current = item.element[0];
      item.top = 0;
      item.left = 0;
      item.right = 0;
      while (current && current !== contentEl[0]) ***REMOVED***
        item.top += current.offsetTop;
        item.left += current.offsetLeft;
        if ( current.offsetParent )***REMOVED***
          item.right += current.offsetParent.offsetWidth - current.offsetWidth - current.offsetLeft; //Compute offsetRight
        ***REMOVED***
        current = current.offsetParent;
      ***REMOVED***
      item.height = item.element.prop('offsetHeight');

      var defaultVal = $mdUtil.floatingScrollbars() ? '0' : undefined;
      $mdUtil.bidi(item.clone, 'margin-left', item.left, defaultVal);
      $mdUtil.bidi(item.clone, 'margin-right', defaultVal, item.right);
    ***REMOVED***

    // As we scroll, push in and select the correct sticky element.
    function onScroll() ***REMOVED***
      var scrollTop = contentEl.prop('scrollTop');
      var isScrollingDown = scrollTop > (onScroll.prevScrollTop || 0);

      // Store the previous scroll so we know which direction we are scrolling
      onScroll.prevScrollTop = scrollTop;

      //
      // AT TOP (not scrolling)
      //
      if (scrollTop === 0) ***REMOVED***
        // If we're at the top, just clear the current item and return
        setCurrentItem(null);
        return;
      ***REMOVED***

      //
      // SCROLLING DOWN (going towards the next item)
      //
      if (isScrollingDown) ***REMOVED***

        // If we've scrolled down past the next item's position, sticky it and return
        if (self.next && self.next.top <= scrollTop) ***REMOVED***
          setCurrentItem(self.next);
          return;
        ***REMOVED***

        // If the next item is close to the current one, push the current one up out of the way
        if (self.current && self.next && self.next.top - scrollTop <= self.next.height) ***REMOVED***
          translate(self.current, scrollTop + (self.next.top - self.next.height - scrollTop));
          return;
        ***REMOVED***
      ***REMOVED***

      //
      // SCROLLING UP (not at the top & not scrolling down; must be scrolling up)
      //
      if (!isScrollingDown) ***REMOVED***

        // If we've scrolled up past the previous item's position, sticky it and return
        if (self.current && self.prev && scrollTop < self.current.top) ***REMOVED***
          setCurrentItem(self.prev);
          return;
        ***REMOVED***

        // If the next item is close to the current one, pull the current one down into view
        if (self.next && self.current && (scrollTop >= (self.next.top - self.current.height))) ***REMOVED***
          translate(self.current, scrollTop + (self.next.top - scrollTop - self.current.height));
          return;
        ***REMOVED***
      ***REMOVED***

      //
      // Otherwise, just move the current item to the proper place (scrolling up or down)
      //
      if (self.current) ***REMOVED***
        translate(self.current, scrollTop);
      ***REMOVED***
    ***REMOVED***

    function setCurrentItem(item) ***REMOVED***
      if (self.current === item) return;
      // Deactivate currently active item
      if (self.current) ***REMOVED***
        translate(self.current, null);
        setStickyState(self.current, null);
      ***REMOVED***

      // Activate new item if given
      if (item) ***REMOVED***
        setStickyState(item, 'active');
      ***REMOVED***

      self.current = item;
      var index = self.items.indexOf(item);
      // If index === -1, index + 1 = 0. It works out.
      self.next = self.items[index + 1];
      self.prev = self.items[index - 1];
      setStickyState(self.next, 'next');
      setStickyState(self.prev, 'prev');
    ***REMOVED***

    function setStickyState(item, state) ***REMOVED***
      if (!item || item.state === state) return;
      if (item.state) ***REMOVED***
        item.clone.attr('sticky-prev-state', item.state);
        item.element.attr('sticky-prev-state', item.state);
      ***REMOVED***
      item.clone.attr('sticky-state', state);
      item.element.attr('sticky-state', state);
      item.state = state;
    ***REMOVED***

    function translate(item, amount) ***REMOVED***
      if (!item) return;
      if (amount === null || amount === undefined) ***REMOVED***
        if (item.translateY) ***REMOVED***
          item.translateY = null;
          item.clone.css($mdConstant.CSS.TRANSFORM, '');
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        item.translateY = amount;

        $mdUtil.bidi( item.clone, $mdConstant.CSS.TRANSFORM,
          'translate3d(' + item.left + 'px,' + amount + 'px,0)',
          'translateY(' + amount + 'px)'
        );
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***


  // Android 4.4 don't accurately give scroll events.
  // To fix this problem, we setup a fake scroll event. We say:
  // > If a scroll or touchmove event has happened in the last DELAY milliseconds, 
  //   then send a `$scroll` event every animationFrame.
  // Additionally, we add $scrollstart and $scrollend events.
  function setupAugmentedScrollEvents(element) ***REMOVED***
    var SCROLL_END_DELAY = 200;
    var isScrolling;
    var lastScrollTime;
    element.on('scroll touchmove', function() ***REMOVED***
      if (!isScrolling) ***REMOVED***
        isScrolling = true;
        $$rAF.throttle(loopScrollEvent);
        element.triggerHandler('$scrollstart');
      ***REMOVED***
      element.triggerHandler('$scroll');
      lastScrollTime = +$mdUtil.now();
    ***REMOVED***);

    function loopScrollEvent() ***REMOVED***
      if (+$mdUtil.now() - lastScrollTime > SCROLL_END_DELAY) ***REMOVED***
        isScrolling = false;
        element.triggerHandler('$scrollend');
      ***REMOVED*** else ***REMOVED***
        element.triggerHandler('$scroll');
        $$rAF.throttle(loopScrollEvent);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

***REMOVED***
MdSticky.$inject = ["$mdConstant", "$$rAF", "$mdUtil", "$compile"];

ngmaterial.components.sticky = angular.module("material.components.sticky");
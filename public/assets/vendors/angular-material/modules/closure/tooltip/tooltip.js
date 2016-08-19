/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.tooltip');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.tooltip
 */
angular
    .module('material.components.tooltip', [ 'material.core' ])
    .directive('mdTooltip', MdTooltipDirective);

/**
 * @ngdoc directive
 * @name mdTooltip
 * @module material.components.tooltip
 * @description
 * Tooltips are used to describe elements that are interactive and primarily graphical (not textual).
 *
 * Place a `<md-tooltip>` as a child of the element it describes.
 *
 * A tooltip will activate when the user focuses, hovers over, or touches the parent.
 *
 * @usage
 * <hljs lang="html">
 * <md-button class="md-fab md-accent" aria-label="Play">
 *   <md-tooltip>
 *     Play Music
 *   </md-tooltip>
 *   <md-icon icon="img/icons/ic_play_arrow_24px.svg"></md-icon>
 * </md-button>
 * </hljs>
 *
 * @param ***REMOVED***expression=***REMOVED*** md-visible Boolean bound to whether the tooltip is currently visible.
 * @param ***REMOVED***number=***REMOVED*** md-delay How many milliseconds to wait to show the tooltip after the user focuses, hovers, or touches the
 * parent. Defaults to 0ms on non-touch devices and 75ms on touch.
 * @param ***REMOVED***boolean=***REMOVED*** md-autohide If present or provided with a boolean value, the tooltip will hide on mouse leave, regardless of focus
 * @param ***REMOVED***string=***REMOVED*** md-direction Which direction would you like the tooltip to go?  Supports left, right, top, and bottom.  Defaults to bottom.
 */
function MdTooltipDirective($timeout, $window, $$rAF, $document, $mdUtil, $mdTheming, $rootElement,
                            $animate, $q, $interpolate) ***REMOVED***

  var ENTER_EVENTS = 'focus touchstart mouseenter';
  var LEAVE_EVENTS = 'blur touchcancel mouseleave';
  var SHOW_CLASS = 'md-show';
  var TOOLTIP_SHOW_DELAY = 0;
  var TOOLTIP_WINDOW_EDGE_SPACE = 8;

  return ***REMOVED***
    restrict: 'E',
    transclude: true,
    priority: 210, // Before ngAria
    template: '<div class="md-content _md" ng-transclude></div>',
    scope: ***REMOVED***
      delay: '=?mdDelay',
      visible: '=?mdVisible',
      autohide: '=?mdAutohide',
      direction: '@?mdDirection'    // only expect raw or interpolated string value; not expression
    ***REMOVED***,
    compile: function(tElement, tAttr) ***REMOVED***
      if (!tAttr.mdDirection) ***REMOVED***
        tAttr.$set('mdDirection', 'bottom');
      ***REMOVED***

      return postLink;
    ***REMOVED***
  ***REMOVED***;

  function postLink(scope, element, attr) ***REMOVED***

    $mdTheming(element);

    var parent        = $mdUtil.getParentWithPointerEvents(element),
        content       = angular.element(element[0].getElementsByClassName('md-content')[0]),
        tooltipParent = angular.element(document.body),
        showTimeout   = null,
        debouncedOnResize = $$rAF.throttle(function () ***REMOVED*** updatePosition(); ***REMOVED***);

    if ($animate.pin) $animate.pin(element, parent);

    // Initialize element

    setDefaults();
    manipulateElement();
    bindEvents();

    // Default origin transform point is 'center top'
    // positionTooltip() is always relative to center top
    updateContentOrigin();

    configureWatchers();
    addAriaLabel();


    function setDefaults () ***REMOVED***
      scope.delay = scope.delay || TOOLTIP_SHOW_DELAY;
    ***REMOVED***

    function updateContentOrigin() ***REMOVED***
      var origin = 'center top';
      switch (scope.direction) ***REMOVED***
        case 'left'  : origin =  'right center';  break;
        case 'right' : origin =  'left center';   break;
        case 'top'   : origin =  'center bottom'; break;
        case 'bottom': origin =  'center top';    break;
      ***REMOVED***
      content.css('transform-origin', origin);
    ***REMOVED***

    function onVisibleChanged (isVisible) ***REMOVED***
      if (isVisible) showTooltip();
      else hideTooltip();
    ***REMOVED***

    function configureWatchers () ***REMOVED***
      if (element[0] && 'MutationObserver' in $window) ***REMOVED***
        var attributeObserver = new MutationObserver(function(mutations) ***REMOVED***
          mutations
            .forEach(function (mutation) ***REMOVED***
              if (mutation.attributeName === 'md-visible') ***REMOVED***
                if (!scope.visibleWatcher)
                  scope.visibleWatcher = scope.$watch('visible', onVisibleChanged );
              ***REMOVED***
              if (mutation.attributeName === 'md-direction') ***REMOVED***
                updatePosition(scope.direction);
              ***REMOVED***
            ***REMOVED***);
        ***REMOVED***);

        attributeObserver.observe(element[0], ***REMOVED*** attributes: true ***REMOVED***);

        // build watcher only if mdVisible is being used
        if (attr.hasOwnProperty('mdVisible')) ***REMOVED***
          scope.visibleWatcher = scope.$watch('visible', onVisibleChanged );
        ***REMOVED***
      ***REMOVED*** else ***REMOVED*** // MutationObserver not supported
        scope.visibleWatcher = scope.$watch('visible', onVisibleChanged );
        scope.$watch('direction', updatePosition );
      ***REMOVED***

      var onElementDestroy = function() ***REMOVED***
        scope.$destroy();
      ***REMOVED***;

      // Clean up if the element or parent was removed via jqLite's .remove.
      // A couple of notes:
      // - In these cases the scope might not have been destroyed, which is why we
      // destroy it manually. An example of this can be having `md-visible="false"` and
      // adding tooltips while they're invisible. If `md-visible` becomes true, at some
      // point, you'd usually get a lot of inputs.
      // - We use `.one`, not `.on`, because this only needs to fire once. If we were
      // using `.on`, it would get thrown into an infinite loop.
      // - This kicks off the scope's `$destroy` event which finishes the cleanup.
      element.one('$destroy', onElementDestroy);
      parent.one('$destroy', onElementDestroy);
      scope.$on('$destroy', function() ***REMOVED***
        setVisible(false);
        element.remove();
        attributeObserver && attributeObserver.disconnect();
      ***REMOVED***);

      // Updates the aria-label when the element text changes. This watch
      // doesn't need to be set up if the element doesn't have any data
      // bindings.
      if (element.text().indexOf($interpolate.startSymbol()) > -1) ***REMOVED***
        scope.$watch(function() ***REMOVED***
          return element.text().trim();
        ***REMOVED***, addAriaLabel);
      ***REMOVED***
    ***REMOVED***

    function addAriaLabel (override) ***REMOVED***
      if ((override || !parent.attr('aria-label')) && !parent.text().trim()) ***REMOVED***
        var rawText = override || element.text().trim();
        var interpolatedText = $interpolate(rawText)(parent.scope());
        parent.attr('aria-label', interpolatedText);
      ***REMOVED***
    ***REMOVED***

    function manipulateElement () ***REMOVED***
      element.detach();
      element.attr('role', 'tooltip');
    ***REMOVED***

    function bindEvents () ***REMOVED***
      var mouseActive = false;

      // add an mutationObserver when there is support for it
      // and the need for it in the form of viable host(parent[0])
      if (parent[0] && 'MutationObserver' in $window) ***REMOVED***
        // use an mutationObserver to tackle #2602
        var attributeObserver = new MutationObserver(function(mutations) ***REMOVED***
          if (mutations.some(function (mutation) ***REMOVED***
              return (mutation.attributeName === 'disabled' && parent[0].disabled);
            ***REMOVED***)) ***REMOVED***
              $mdUtil.nextTick(function() ***REMOVED***
                setVisible(false);
              ***REMOVED***);
          ***REMOVED***
        ***REMOVED***);

        attributeObserver.observe(parent[0], ***REMOVED*** attributes: true***REMOVED***);
      ***REMOVED***

      // Store whether the element was focused when the window loses focus.
      var windowBlurHandler = function() ***REMOVED***
        elementFocusedOnWindowBlur = document.activeElement === parent[0];
      ***REMOVED***;
      var elementFocusedOnWindowBlur = false;

      function windowScrollHandler() ***REMOVED***
        setVisible(false);
      ***REMOVED***

      angular.element($window)
        .on('blur', windowBlurHandler)
        .on('resize', debouncedOnResize);

      document.addEventListener('scroll', windowScrollHandler, true);
      scope.$on('$destroy', function() ***REMOVED***
        angular.element($window)
          .off('blur', windowBlurHandler)
          .off('resize', debouncedOnResize);

        parent
          .off(ENTER_EVENTS, enterHandler)
          .off(LEAVE_EVENTS, leaveHandler)
          .off('mousedown', mousedownHandler);

        // Trigger the handler in case any the tooltip was still visible.
        leaveHandler();
        document.removeEventListener('scroll', windowScrollHandler, true);
        attributeObserver && attributeObserver.disconnect();
      ***REMOVED***);

      var enterHandler = function(e) ***REMOVED***
        // Prevent the tooltip from showing when the window is receiving focus.
        if (e.type === 'focus' && elementFocusedOnWindowBlur) ***REMOVED***
          elementFocusedOnWindowBlur = false;
        ***REMOVED*** else if (!scope.visible) ***REMOVED***
          parent.on(LEAVE_EVENTS, leaveHandler);
          setVisible(true);

          // If the user is on a touch device, we should bind the tap away after
          // the `touched` in order to prevent the tooltip being removed immediately.
          if (e.type === 'touchstart') ***REMOVED***
            parent.one('touchend', function() ***REMOVED***
              $mdUtil.nextTick(function() ***REMOVED***
                $document.one('touchend', leaveHandler);
              ***REMOVED***, false);
            ***REMOVED***);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;
      var leaveHandler = function () ***REMOVED***
        var autohide = scope.hasOwnProperty('autohide') ? scope.autohide : attr.hasOwnProperty('mdAutohide');

        if (autohide || mouseActive || $document[0].activeElement !== parent[0]) ***REMOVED***
          // When a show timeout is currently in progress, then we have to cancel it.
          // Otherwise the tooltip will remain showing without focus or hover.
          if (showTimeout) ***REMOVED***
            $timeout.cancel(showTimeout);
            setVisible.queued = false;
            showTimeout = null;
          ***REMOVED***

          parent.off(LEAVE_EVENTS, leaveHandler);
          parent.triggerHandler('blur');
          setVisible(false);
        ***REMOVED***
        mouseActive = false;
      ***REMOVED***;
      var mousedownHandler = function() ***REMOVED***
        mouseActive = true;
      ***REMOVED***;

      // to avoid `synthetic clicks` we listen to mousedown instead of `click`
      parent.on('mousedown', mousedownHandler);
      parent.on(ENTER_EVENTS, enterHandler);
    ***REMOVED***

    function setVisible (value) ***REMOVED***
      // break if passed value is already in queue or there is no queue and passed value is current in the scope
      if (setVisible.queued && setVisible.value === !!value || !setVisible.queued && scope.visible === !!value) return;
      setVisible.value = !!value;

      if (!setVisible.queued) ***REMOVED***
        if (value) ***REMOVED***
          setVisible.queued = true;
          showTimeout = $timeout(function() ***REMOVED***
            scope.visible = setVisible.value;
            setVisible.queued = false;
            showTimeout = null;

            if (!scope.visibleWatcher) ***REMOVED***
              onVisibleChanged(scope.visible);
            ***REMOVED***
          ***REMOVED***, scope.delay);
        ***REMOVED*** else ***REMOVED***
          $mdUtil.nextTick(function() ***REMOVED***
            scope.visible = false;
            if (!scope.visibleWatcher)
              onVisibleChanged(false);
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    function showTooltip() ***REMOVED***
      //  Do not show the tooltip if the text is empty.
      if (!element[0].textContent.trim()) return;

      // Insert the element and position at top left, so we can get the position
      // and check if we should display it
      element.css(***REMOVED***top: 0, left: 0***REMOVED***);
      tooltipParent.append(element);

      // Check if we should display it or not.
      // This handles hide-* and show-* along with any user defined css
      if ( $mdUtil.hasComputedStyle(element, 'display', 'none')) ***REMOVED***
        scope.visible = false;
        element.detach();
        return;
      ***REMOVED***

      updatePosition();

      $animate.addClass(content, SHOW_CLASS).then(function() ***REMOVED***
        element.addClass(SHOW_CLASS);
      ***REMOVED***);
    ***REMOVED***

    function hideTooltip() ***REMOVED***
      $animate.removeClass(content, SHOW_CLASS).then(function()***REMOVED***
        element.removeClass(SHOW_CLASS);
        if (!scope.visible) element.detach();
      ***REMOVED***);
    ***REMOVED***

    function updatePosition() ***REMOVED***
      if ( !scope.visible ) return;

      updateContentOrigin();
      positionTooltip();
    ***REMOVED***

    function positionTooltip() ***REMOVED***
      var tipRect = $mdUtil.offsetRect(element, tooltipParent);
      var parentRect = $mdUtil.offsetRect(parent, tooltipParent);
      var newPosition = getPosition(scope.direction);
      var offsetParent = element.prop('offsetParent');

      // If the user provided a direction, just nudge the tooltip onto the screen
      // Otherwise, recalculate based on 'top' since default is 'bottom'
      if (scope.direction) ***REMOVED***
        newPosition = fitInParent(newPosition);
      ***REMOVED*** else if (offsetParent && newPosition.top > offsetParent.scrollHeight - tipRect.height - TOOLTIP_WINDOW_EDGE_SPACE) ***REMOVED***
        newPosition = fitInParent(getPosition('top'));
      ***REMOVED***

      element.css(***REMOVED***
        left: newPosition.left + 'px',
        top: newPosition.top + 'px'
      ***REMOVED***);

      function fitInParent (pos) ***REMOVED***
        var newPosition = ***REMOVED*** left: pos.left, top: pos.top ***REMOVED***;
        newPosition.left = Math.min( newPosition.left, tooltipParent.prop('scrollWidth') - tipRect.width - TOOLTIP_WINDOW_EDGE_SPACE );
        newPosition.left = Math.max( newPosition.left, TOOLTIP_WINDOW_EDGE_SPACE );
        newPosition.top  = Math.min( newPosition.top,  tooltipParent.prop('scrollHeight') - tipRect.height - TOOLTIP_WINDOW_EDGE_SPACE );
        newPosition.top  = Math.max( newPosition.top,  TOOLTIP_WINDOW_EDGE_SPACE );
        return newPosition;
      ***REMOVED***

      function getPosition (dir) ***REMOVED***
        return dir === 'left'
          ? ***REMOVED*** left: parentRect.left - tipRect.width - TOOLTIP_WINDOW_EDGE_SPACE,
              top: parentRect.top + parentRect.height / 2 - tipRect.height / 2 ***REMOVED***
          : dir === 'right'
          ? ***REMOVED*** left: parentRect.left + parentRect.width + TOOLTIP_WINDOW_EDGE_SPACE,
              top: parentRect.top + parentRect.height / 2 - tipRect.height / 2 ***REMOVED***
          : dir === 'top'
          ? ***REMOVED*** left: parentRect.left + parentRect.width / 2 - tipRect.width / 2,
              top: parentRect.top - tipRect.height - TOOLTIP_WINDOW_EDGE_SPACE ***REMOVED***
          : ***REMOVED*** left: parentRect.left + parentRect.width / 2 - tipRect.width / 2,
              top: parentRect.top + parentRect.height + TOOLTIP_WINDOW_EDGE_SPACE ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

  ***REMOVED***

***REMOVED***
MdTooltipDirective.$inject = ["$timeout", "$window", "$$rAF", "$document", "$mdUtil", "$mdTheming", "$rootElement", "$animate", "$q", "$interpolate"];

ngmaterial.components.tooltip = angular.module("material.components.tooltip");
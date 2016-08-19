/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.bottomSheet');
goog.require('ngmaterial.components.backdrop');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.bottomSheet
 * @description
 * BottomSheet
 */
angular
  .module('material.components.bottomSheet', [
    'material.core',
    'material.components.backdrop'
  ])
  .directive('mdBottomSheet', MdBottomSheetDirective)
  .provider('$mdBottomSheet', MdBottomSheetProvider);

/* ngInject */
function MdBottomSheetDirective($mdBottomSheet) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    link : function postLink(scope, element) ***REMOVED***
      element.addClass('_md');     // private md component indicator for styling

      // When navigation force destroys an interimElement, then
      // listen and $destroy() that interim instance...
      scope.$on('$destroy', function() ***REMOVED***
        $mdBottomSheet.destroy();
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MdBottomSheetDirective.$inject = ["$mdBottomSheet"];


/**
 * @ngdoc service
 * @name $mdBottomSheet
 * @module material.components.bottomSheet
 *
 * @description
 * `$mdBottomSheet` opens a bottom sheet over the app and provides a simple promise API.
 *
 * ## Restrictions
 *
 * - The bottom sheet's template must have an outer `<md-bottom-sheet>` element.
 * - Add the `md-grid` class to the bottom sheet for a grid layout.
 * - Add the `md-list` class to the bottom sheet for a list layout.
 *
 * @usage
 * <hljs lang="html">
 * <div ng-controller="MyController">
 *   <md-button ng-click="openBottomSheet()">
 *     Open a Bottom Sheet!
 *   </md-button>
 * </div>
 * </hljs>
 * <hljs lang="js">
 * var app = angular.module('app', ['ngMaterial']);
 * app.controller('MyController', function($scope, $mdBottomSheet) ***REMOVED***
 *   $scope.openBottomSheet = function() ***REMOVED***
 *     $mdBottomSheet.show(***REMOVED***
 *       template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
 *     ***REMOVED***);
 *   ***REMOVED***;
 * ***REMOVED***);
 * </hljs>
 */

 /**
 * @ngdoc method
 * @name $mdBottomSheet#show
 *
 * @description
 * Show a bottom sheet with the specified options.
 *
 * @param ***REMOVED***object***REMOVED*** options An options object, with the following properties:
 *
 *   - `templateUrl` - `***REMOVED***string=***REMOVED***`: The url of an html template file that will
 *   be used as the content of the bottom sheet. Restrictions: the template must
 *   have an outer `md-bottom-sheet` element.
 *   - `template` - `***REMOVED***string=***REMOVED***`: Same as templateUrl, except this is an actual
 *   template string.
 *   - `scope` - `***REMOVED***object=***REMOVED***`: the scope to link the template / controller to. If none is specified, it will create a new child scope.
 *     This scope will be destroyed when the bottom sheet is removed unless `preserveScope` is set to true.
 *   - `preserveScope` - `***REMOVED***boolean=***REMOVED***`: whether to preserve the scope when the element is removed. Default is false
 *   - `controller` - `***REMOVED***string=***REMOVED***`: The controller to associate with this bottom sheet.
 *   - `locals` - `***REMOVED***string=***REMOVED***`: An object containing key/value pairs. The keys will
 *   be used as names of values to inject into the controller. For example,
 *   `locals: ***REMOVED***three: 3***REMOVED***` would inject `three` into the controller with the value
 *   of 3.
 *   - `clickOutsideToClose` - `***REMOVED***boolean=***REMOVED***`: Whether the user can click outside the bottom sheet to
 *     close it. Default true.
 *   - `disableBackdrop` - `***REMOVED***boolean=***REMOVED***`: When set to true, the bottomsheet will not show a backdrop.
 *   - `escapeToClose` - `***REMOVED***boolean=***REMOVED***`: Whether the user can press escape to close the bottom sheet.
 *     Default true.
 *   - `resolve` - `***REMOVED***object=***REMOVED***`: Similar to locals, except it takes promises as values
 *   and the bottom sheet will not open until the promises resolve.
 *   - `controllerAs` - `***REMOVED***string=***REMOVED***`: An alias to assign the controller to on the scope.
 *   - `parent` - `***REMOVED***element=***REMOVED***`: The element to append the bottom sheet to. The `parent` may be a `function`, `string`,
 *   `object`, or null. Defaults to appending to the body of the root element (or the root element) of the application.
 *   e.g. angular.element(document.getElementById('content')) or "#content"
 *   - `disableParentScroll` - `***REMOVED***boolean=***REMOVED***`: Whether to disable scrolling while the bottom sheet is open.
 *     Default true.
 *
 * @returns ***REMOVED***promise***REMOVED*** A promise that can be resolved with `$mdBottomSheet.hide()` or
 * rejected with `$mdBottomSheet.cancel()`.
 */

/**
 * @ngdoc method
 * @name $mdBottomSheet#hide
 *
 * @description
 * Hide the existing bottom sheet and resolve the promise returned from
 * `$mdBottomSheet.show()`. This call will close the most recently opened/current bottomsheet (if any).
 *
 * @param ***REMOVED****=***REMOVED*** response An argument for the resolved promise.
 *
 */

/**
 * @ngdoc method
 * @name $mdBottomSheet#cancel
 *
 * @description
 * Hide the existing bottom sheet and reject the promise returned from
 * `$mdBottomSheet.show()`.
 *
 * @param ***REMOVED****=***REMOVED*** response An argument for the rejected promise.
 *
 */

function MdBottomSheetProvider($$interimElementProvider) ***REMOVED***
  // how fast we need to flick down to close the sheet, pixels/ms
  var CLOSING_VELOCITY = 0.5;
  var PADDING = 80; // same as css

  bottomSheetDefaults.$inject = ["$animate", "$mdConstant", "$mdUtil", "$mdTheming", "$mdBottomSheet", "$rootElement", "$mdGesture", "$log"];
  return $$interimElementProvider('$mdBottomSheet')
    .setDefaults(***REMOVED***
      methods: ['disableParentScroll', 'escapeToClose', 'clickOutsideToClose'],
      options: bottomSheetDefaults
    ***REMOVED***);

  /* ngInject */
  function bottomSheetDefaults($animate, $mdConstant, $mdUtil, $mdTheming, $mdBottomSheet, $rootElement,
                               $mdGesture, $log) ***REMOVED***
    var backdrop;

    return ***REMOVED***
      themable: true,
      onShow: onShow,
      onRemove: onRemove,
      disableBackdrop: false,
      escapeToClose: true,
      clickOutsideToClose: true,
      disableParentScroll: true
    ***REMOVED***;


    function onShow(scope, element, options, controller) ***REMOVED***

      element = $mdUtil.extractElementByName(element, 'md-bottom-sheet');

      // prevent tab focus or click focus on the bottom-sheet container
      element.attr('tabindex',"-1");

      // Once the md-bottom-sheet has `ng-cloak` applied on his template the opening animation will not work properly.
      // This is a very common problem, so we have to notify the developer about this.
      if (element.hasClass('ng-cloak')) ***REMOVED***
        var message = '$mdBottomSheet: using `<md-bottom-sheet ng-cloak >` will affect the bottom-sheet opening animations.';
        $log.warn( message, element[0] );
      ***REMOVED***

      if (!options.disableBackdrop) ***REMOVED***
        // Add a backdrop that will close on click
        backdrop = $mdUtil.createBackdrop(scope, "md-bottom-sheet-backdrop md-opaque");

        // Prevent mouse focus on backdrop; ONLY programatic focus allowed.
        // This allows clicks on backdrop to propogate to the $rootElement and
        // ESC key events to be detected properly.
        
        backdrop[0].tabIndex = -1;

        if (options.clickOutsideToClose) ***REMOVED***
          backdrop.on('click', function() ***REMOVED***
            $mdUtil.nextTick($mdBottomSheet.cancel,true);
          ***REMOVED***);
        ***REMOVED***

        $mdTheming.inherit(backdrop, options.parent);

        $animate.enter(backdrop, options.parent, null);
      ***REMOVED***

      var bottomSheet = new BottomSheet(element, options.parent);
      options.bottomSheet = bottomSheet;

      $mdTheming.inherit(bottomSheet.element, options.parent);

      if (options.disableParentScroll) ***REMOVED***
        options.restoreScroll = $mdUtil.disableScrollAround(bottomSheet.element, options.parent);
      ***REMOVED***

      return $animate.enter(bottomSheet.element, options.parent, backdrop)
        .then(function() ***REMOVED***
          var focusable = $mdUtil.findFocusTarget(element) || angular.element(
            element[0].querySelector('button') ||
            element[0].querySelector('a') ||
            element[0].querySelector($mdUtil.prefixer('ng-click', true))
          ) || backdrop;

          if (options.escapeToClose) ***REMOVED***
            options.rootElementKeyupCallback = function(e) ***REMOVED***
              if (e.keyCode === $mdConstant.KEY_CODE.ESCAPE) ***REMOVED***
                $mdUtil.nextTick($mdBottomSheet.cancel,true);
              ***REMOVED***
            ***REMOVED***;

            $rootElement.on('keyup', options.rootElementKeyupCallback);
            focusable && focusable.focus();
          ***REMOVED***
        ***REMOVED***);

    ***REMOVED***

    function onRemove(scope, element, options) ***REMOVED***

      var bottomSheet = options.bottomSheet;

      if (!options.disableBackdrop) $animate.leave(backdrop);
      return $animate.leave(bottomSheet.element).then(function() ***REMOVED***
        if (options.disableParentScroll) ***REMOVED***
          options.restoreScroll();
          delete options.restoreScroll;
        ***REMOVED***

        bottomSheet.cleanup();
      ***REMOVED***);
    ***REMOVED***

    /**
     * BottomSheet class to apply bottom-sheet behavior to an element
     */
    function BottomSheet(element, parent) ***REMOVED***
      var deregister = $mdGesture.register(parent, 'drag', ***REMOVED*** horizontal: false ***REMOVED***);
      parent.on('$md.dragstart', onDragStart)
        .on('$md.drag', onDrag)
        .on('$md.dragend', onDragEnd);

      return ***REMOVED***
        element: element,
        cleanup: function cleanup() ***REMOVED***
          deregister();
          parent.off('$md.dragstart', onDragStart);
          parent.off('$md.drag', onDrag);
          parent.off('$md.dragend', onDragEnd);
        ***REMOVED***
      ***REMOVED***;

      function onDragStart(ev) ***REMOVED***
        // Disable transitions on transform so that it feels fast
        element.css($mdConstant.CSS.TRANSITION_DURATION, '0ms');
      ***REMOVED***

      function onDrag(ev) ***REMOVED***
        var transform = ev.pointer.distanceY;
        if (transform < 5) ***REMOVED***
          // Slow down drag when trying to drag up, and stop after PADDING
          transform = Math.max(-PADDING, transform / 2);
        ***REMOVED***
        element.css($mdConstant.CSS.TRANSFORM, 'translate3d(0,' + (PADDING + transform) + 'px,0)');
      ***REMOVED***

      function onDragEnd(ev) ***REMOVED***
        if (ev.pointer.distanceY > 0 &&
            (ev.pointer.distanceY > 20 || Math.abs(ev.pointer.velocityY) > CLOSING_VELOCITY)) ***REMOVED***
          var distanceRemaining = element.prop('offsetHeight') - ev.pointer.distanceY;
          var transitionDuration = Math.min(distanceRemaining / ev.pointer.velocityY * 0.75, 500);
          element.css($mdConstant.CSS.TRANSITION_DURATION, transitionDuration + 'ms');
          $mdUtil.nextTick($mdBottomSheet.cancel,true);
        ***REMOVED*** else ***REMOVED***
          element.css($mdConstant.CSS.TRANSITION_DURATION, '');
          element.css($mdConstant.CSS.TRANSFORM, '');
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

  ***REMOVED***

***REMOVED***
MdBottomSheetProvider.$inject = ["$$interimElementProvider"];

ngmaterial.components.bottomSheet = angular.module("material.components.bottomSheet");
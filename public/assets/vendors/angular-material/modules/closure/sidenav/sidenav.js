/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.sidenav');
goog.require('ng.material.components.backdrop');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.sidenav
 *
 * @description
 * A Sidenav QP component.
 */
angular
  .module('material.components.sidenav', [
    'material.core',
    'material.components.backdrop'
  ])
  .factory('$mdSidenav', SidenavService )
  .directive('mdSidenav', SidenavDirective)
  .directive('mdSidenavFocus', SidenavFocusDirective)
  .controller('$mdSidenavController', SidenavController);


/**
 * @ngdoc service
 * @name $mdSidenav
 * @module material.components.sidenav
 *
 * @description
 * `$mdSidenav` makes it easy to interact with multiple sidenavs
 * in an app. When looking up a sidenav instance, you can either look
 * it up synchronously or wait for it to be initializied asynchronously.
 * This is done by passing the second argument to `$mdSidenav`.
 *
 * @usage
 * <hljs lang="js">
 * // Async lookup for sidenav instance; will resolve when the instance is available
 * $mdSidenav(componentId, true).then(function(instance) ***REMOVED***
 *   $log.debug( componentId + "is now ready" );
 * ***REMOVED***);
 * // Sync lookup for sidenav instance; this will resolve immediately.
 * $mdSidenav(componentId).then(function(instance) ***REMOVED***
 *   $log.debug( componentId + "is now ready" );
 * ***REMOVED***);
 * // Async toggle the given sidenav;
 * // when instance is known ready and lazy lookup is not needed.
 * $mdSidenav(componentId)
 *    .toggle()
 *    .then(function()***REMOVED***
 *      $log.debug('toggled');
 *    ***REMOVED***);
 * // Async open the given sidenav
 * $mdSidenav(componentId)
 *    .open()
 *    .then(function()***REMOVED***
 *      $log.debug('opened');
 *    ***REMOVED***);
 * // Async close the given sidenav
 * $mdSidenav(componentId)
 *    .close()
 *    .then(function()***REMOVED***
 *      $log.debug('closed');
 *    ***REMOVED***);
 * // Sync check to see if the specified sidenav is set to be open
 * $mdSidenav(componentId).isOpen();
 * // Sync check to whether given sidenav is locked open
 * // If this is true, the sidenav will be open regardless of close()
 * $mdSidenav(componentId).isLockedOpen();
 * </hljs>
 */
function SidenavService($mdComponentRegistry, $mdUtil, $q, $log) ***REMOVED***
  var errorMsg = "SideNav '***REMOVED***0***REMOVED***' is not available! Did you use md-component-id='***REMOVED***0***REMOVED***'?";
  var service = ***REMOVED***
        find    : findInstance,     //  sync  - returns proxy API
        waitFor : waitForInstance   //  async - returns promise
      ***REMOVED***;

  /**
   * Service API that supports three (3) usages:
   *   $mdSidenav().find("left")                       // sync (must already exist) or returns undefined
   *   $mdSidenav("left").toggle();                    // sync (must already exist) or returns reject promise;
   *   $mdSidenav("left",true).then( function(left)***REMOVED***   // async returns instance when available
   *    left.toggle();
   *   ***REMOVED***);
   */
  return function(handle, enableWait) ***REMOVED***
    if ( angular.isUndefined(handle) ) return service;

    var shouldWait = enableWait === true;
    var instance = service.find(handle, shouldWait);
    return  !instance && shouldWait ? service.waitFor(handle) :
            !instance && angular.isUndefined(enableWait) ? addLegacyAPI(service, handle) : instance;
  ***REMOVED***;

  /**
   * For failed instance/handle lookups, older-clients expect an response object with noops
   * that include `rejected promise APIs`
   */
  function addLegacyAPI(service, handle) ***REMOVED***
      var falseFn  = function() ***REMOVED*** return false; ***REMOVED***;
      var rejectFn = function() ***REMOVED***
            return $q.when($mdUtil.supplant(errorMsg, [handle || ""]));
          ***REMOVED***;

      return angular.extend(***REMOVED***
        isLockedOpen : falseFn,
        isOpen       : falseFn,
        toggle       : rejectFn,
        open         : rejectFn,
        close        : rejectFn,
        then : function(callback) ***REMOVED***
          return waitForInstance(handle)
            .then(callback || angular.noop);
        ***REMOVED***
       ***REMOVED***, service);
    ***REMOVED***
    /**
     * Synchronously lookup the controller instance for the specified sidNav instance which has been
     * registered with the markup `md-component-id`
     */
    function findInstance(handle, shouldWait) ***REMOVED***
      var instance = $mdComponentRegistry.get(handle);

      if (!instance && !shouldWait) ***REMOVED***

        // Report missing instance
        $log.error( $mdUtil.supplant(errorMsg, [handle || ""]) );

        // The component has not registered itself... most like NOT yet created
        // return null to indicate that the Sidenav is not in the DOM
        return undefined;
      ***REMOVED***
      return instance;
    ***REMOVED***

    /**
     * Asynchronously wait for the component instantiation,
     * Deferred lookup of component instance using $component registry
     */
    function waitForInstance(handle) ***REMOVED***
      return $mdComponentRegistry.when(handle).catch($log.error);
    ***REMOVED***
***REMOVED***
SidenavService.$inject = ["$mdComponentRegistry", "$mdUtil", "$q", "$log"];
/**
 * @ngdoc directive
 * @name mdSidenavFocus
 * @module material.components.sidenav
 *
 * @restrict A
 *
 * @description
 * `mdSidenavFocus` provides a way to specify the focused element when a sidenav opens.
 * This is completely optional, as the sidenav itself is focused by default.
 *
 * @usage
 * <hljs lang="html">
 * <md-sidenav>
 *   <form>
 *     <md-input-container>
 *       <label for="testInput">Label</label>
 *       <input id="testInput" type="text" md-sidenav-focus>
 *     </md-input-container>
 *   </form>
 * </md-sidenav>
 * </hljs>
 **/
function SidenavFocusDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    require: '^mdSidenav',
    link: function(scope, element, attr, sidenavCtrl) ***REMOVED***
      // @see $mdUtil.findFocusTarget(...)
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
/**
 * @ngdoc directive
 * @name mdSidenav
 * @module material.components.sidenav
 * @restrict E
 *
 * @description
 *
 * A Sidenav component that can be opened and closed programatically.
 *
 * By default, upon opening it will slide out on top of the main content area.
 *
 * For keyboard and screen reader accessibility, focus is sent to the sidenav wrapper by default.
 * It can be overridden with the `md-autofocus` directive on the child element you want focused.
 *
 * @usage
 * <hljs lang="html">
 * <div layout="row" ng-controller="MyController">
 *   <md-sidenav md-component-id="left" class="md-sidenav-left">
 *     Left Nav!
 *   </md-sidenav>
 *
 *   <md-content>
 *     Center Content
 *     <md-button ng-click="openLeftMenu()">
 *       Open Left Menu
 *     </md-button>
 *   </md-content>
 *
 *   <md-sidenav md-component-id="right"
 *     md-is-locked-open="$mdMedia('min-width: 333px')"
 *     class="md-sidenav-right">
 *     <form>
 *       <md-input-container>
 *         <label for="testInput">Test input</label>
 *         <input id="testInput" type="text"
 *                ng-model="data" md-autofocus>
 *       </md-input-container>
 *     </form>
 *   </md-sidenav>
 * </div>
 * </hljs>
 *
 * <hljs lang="js">
 * var app = angular.module('myApp', ['ngMaterial']);
 * app.controller('MyController', function($scope, $mdSidenav) ***REMOVED***
 *   $scope.openLeftMenu = function() ***REMOVED***
 *     $mdSidenav('left').toggle();
 *   ***REMOVED***;
 * ***REMOVED***);
 * </hljs>
 *
 * @param ***REMOVED***expression=***REMOVED*** md-is-open A model bound to whether the sidenav is opened.
 * @param ***REMOVED***boolean=***REMOVED*** md-disable-backdrop When present in the markup, the sidenav will not show a backdrop.
 * @param ***REMOVED***string=***REMOVED*** md-component-id componentId to use with $mdSidenav service.
 * @param ***REMOVED***expression=***REMOVED*** md-is-locked-open When this expression evaluates to true,
 * the sidenav 'locks open': it falls into the content's flow instead
 * of appearing over it. This overrides the `md-is-open` attribute.
 *
* The $mdMedia() servic  e is exposed to the is-locked-open attribute, which
 * can be given a media query or one of the `sm`, `gt-sm`, `md`, `gt-md`, `lg` or `gt-lg` presets.
 * Examples:
 *
 *   - `<md-sidenav md-is-locked-open="shouldLockOpen"></md-sidenav>`
 *   - `<md-sidenav md-is-locked-open="$mdMedia('min-width: 1000px')"></md-sidenav>`
 *   - `<md-sidenav md-is-locked-open="$mdMedia('sm')"></md-sidenav>` (locks open on small screens)
 */
function SidenavDirective($mdMedia, $mdUtil, $mdConstant, $mdTheming, $animate, $compile, $parse, $log, $q, $document) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    scope: ***REMOVED***
      isOpen: '=?mdIsOpen'
    ***REMOVED***,
    controller: '$mdSidenavController',
    compile: function(element) ***REMOVED***
      element.addClass('_md-closed');
      element.attr('tabIndex', '-1');
      return postLink;
    ***REMOVED***
  ***REMOVED***;

  /**
   * Directive Post Link function...
   */
  function postLink(scope, element, attr, sidenavCtrl) ***REMOVED***
    var lastParentOverFlow;
    var backdrop;
    var triggeringElement = null;
    var previousContainerStyles;
    var promise = $q.when(true);
    var isLockedOpenParsed = $parse(attr.mdIsLockedOpen);
    var isLocked = function() ***REMOVED***
      return isLockedOpenParsed(scope.$parent, ***REMOVED***
        $media: function(arg) ***REMOVED***
          $log.warn("$media is deprecated for is-locked-open. Use $mdMedia instead.");
          return $mdMedia(arg);
        ***REMOVED***,
        $mdMedia: $mdMedia
      ***REMOVED***);
    ***REMOVED***;

    // Only create the backdrop if the backdrop isn't disabled.
    if (!angular.isDefined(attr.mdDisableBackdrop)) ***REMOVED***
      backdrop = $mdUtil.createBackdrop(scope, "_md-sidenav-backdrop md-opaque ng-enter");
    ***REMOVED***

    element.addClass('_md');     // private md component indicator for styling
    $mdTheming(element);

    // The backdrop should inherit the sidenavs theme,
    // because the backdrop will take its parent theme by default.
    if ( backdrop ) $mdTheming.inherit(backdrop, element);

    element.on('$destroy', function() ***REMOVED***
      backdrop && backdrop.remove();
      sidenavCtrl.destroy();
    ***REMOVED***);

    scope.$on('$destroy', function()***REMOVED***
      backdrop && backdrop.remove();
    ***REMOVED***);

    scope.$watch(isLocked, updateIsLocked);
    scope.$watch('isOpen', updateIsOpen);


    // Publish special accessor for the Controller instance
    sidenavCtrl.$toggleOpen = toggleOpen;

    /**
     * Toggle the DOM classes to indicate `locked`
     * @param isLocked
     */
    function updateIsLocked(isLocked, oldValue) ***REMOVED***
      scope.isLockedOpen = isLocked;
      if (isLocked === oldValue) ***REMOVED***
        element.toggleClass('_md-locked-open', !!isLocked);
      ***REMOVED*** else ***REMOVED***
        $animate[isLocked ? 'addClass' : 'removeClass'](element, '_md-locked-open');
      ***REMOVED***
      if (backdrop) ***REMOVED***
        backdrop.toggleClass('_md-locked-open', !!isLocked);
      ***REMOVED***
    ***REMOVED***

    /**
     * Toggle the SideNav view and attach/detach listeners
     * @param isOpen
     */
    function updateIsOpen(isOpen) ***REMOVED***
      // Support deprecated md-sidenav-focus attribute as fallback
      var focusEl = $mdUtil.findFocusTarget(element) || $mdUtil.findFocusTarget(element,'[md-sidenav-focus]') || element;
      var parent = element.parent();

      parent[isOpen ? 'on' : 'off']('keydown', onKeyDown);
      if (backdrop) backdrop[isOpen ? 'on' : 'off']('click', close);

      var restorePositioning = updateContainerPositions(parent, isOpen);

      if ( isOpen ) ***REMOVED***
        // Capture upon opening..
        triggeringElement = $document[0].activeElement;
      ***REMOVED***

      disableParentScroll(isOpen);

      return promise = $q.all([
        isOpen && backdrop ? $animate.enter(backdrop, parent) : backdrop ?
                             $animate.leave(backdrop) : $q.when(true),
        $animate[isOpen ? 'removeClass' : 'addClass'](element, '_md-closed')
      ]).then(function() ***REMOVED***
        // Perform focus when animations are ALL done...
        if (scope.isOpen) ***REMOVED***
          focusEl && focusEl.focus();
        ***REMOVED***

        // Restores the positioning on the sidenav and backdrop.
        restorePositioning && restorePositioning();
      ***REMOVED***);
    ***REMOVED***

    function updateContainerPositions(parent, willOpen) ***REMOVED***
      var drawerEl = element[0];
      var scrollTop = parent[0].scrollTop;

      if (willOpen && scrollTop) ***REMOVED***
        previousContainerStyles = ***REMOVED***
          top: drawerEl.style.top,
          bottom: drawerEl.style.bottom,
          height: drawerEl.style.height
        ***REMOVED***;

        // When the parent is scrolled down, then we want to be able to show the sidenav at the current scroll
        // position. We're moving the sidenav down to the correct scroll position and apply the height of the
        // parent, to increase the performance. Using 100% as height, will impact the performance heavily.
        var positionStyle = ***REMOVED***
          top: scrollTop + 'px',
          bottom: 'initial',
          height: parent[0].clientHeight + 'px'
        ***REMOVED***;

        // Apply the new position styles to the sidenav and backdrop.
        element.css(positionStyle);
        backdrop.css(positionStyle);
      ***REMOVED***

      // When the sidenav is closing and we have previous defined container styles,
      // then we return a restore function, which resets the sidenav and backdrop.
      if (!willOpen && previousContainerStyles) ***REMOVED***
        return function() ***REMOVED***
          drawerEl.style.top = previousContainerStyles.top;
          drawerEl.style.bottom = previousContainerStyles.bottom;
          drawerEl.style.height = previousContainerStyles.height;

          backdrop[0].style.top = null;
          backdrop[0].style.bottom = null;
          backdrop[0].style.height = null;

          previousContainerStyles = null;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    /**
     * Prevent parent scrolling (when the SideNav is open)
     */
    function disableParentScroll(disabled) ***REMOVED***
      var parent = element.parent();
      if ( disabled && !lastParentOverFlow ) ***REMOVED***

        lastParentOverFlow = parent.css('overflow');
        parent.css('overflow', 'hidden');

      ***REMOVED*** else if (angular.isDefined(lastParentOverFlow)) ***REMOVED***

        parent.css('overflow', lastParentOverFlow);
        lastParentOverFlow = undefined;

      ***REMOVED***
    ***REMOVED***

    /**
     * Toggle the sideNav view and publish a promise to be resolved when
     * the view animation finishes.
     *
     * @param isOpen
     * @returns ***REMOVED*******REMOVED***
     */
    function toggleOpen( isOpen ) ***REMOVED***
      if (scope.isOpen == isOpen ) ***REMOVED***

        return $q.when(true);

      ***REMOVED*** else ***REMOVED***
        return $q(function(resolve)***REMOVED***
          // Toggle value to force an async `updateIsOpen()` to run
          scope.isOpen = isOpen;

          $mdUtil.nextTick(function() ***REMOVED***
            // When the current `updateIsOpen()` animation finishes
            promise.then(function(result) ***REMOVED***

              if ( !scope.isOpen ) ***REMOVED***
                // reset focus to originating element (if available) upon close
                triggeringElement && triggeringElement.focus();
                triggeringElement = null;
              ***REMOVED***

              resolve(result);
            ***REMOVED***);
          ***REMOVED***);

        ***REMOVED***);

      ***REMOVED***
    ***REMOVED***

    /**
     * Auto-close sideNav when the `escape` key is pressed.
     * @param evt
     */
    function onKeyDown(ev) ***REMOVED***
      var isEscape = (ev.keyCode === $mdConstant.KEY_CODE.ESCAPE);
      return isEscape ? close(ev) : $q.when(true);
    ***REMOVED***

    /**
     * With backdrop `clicks` or `escape` key-press, immediately
     * apply the CSS close transition... Then notify the controller
     * to close() and perform its own actions.
     */
    function close(ev) ***REMOVED***
      ev.preventDefault();

      return sidenavCtrl.close();
    ***REMOVED***

  ***REMOVED***
***REMOVED***
SidenavDirective.$inject = ["$mdMedia", "$mdUtil", "$mdConstant", "$mdTheming", "$animate", "$compile", "$parse", "$log", "$q", "$document"];

/*
 * @private
 * @ngdoc controller
 * @name SidenavController
 * @module material.components.sidenav
 *
 */
function SidenavController($scope, $element, $attrs, $mdComponentRegistry, $q) ***REMOVED***

  var self = this;

  // Use Default internal method until overridden by directive postLink

  // Synchronous getters
  self.isOpen = function() ***REMOVED*** return !!$scope.isOpen; ***REMOVED***;
  self.isLockedOpen = function() ***REMOVED*** return !!$scope.isLockedOpen; ***REMOVED***;

  // Async actions
  self.open   = function() ***REMOVED*** return self.$toggleOpen( true );  ***REMOVED***;
  self.close  = function() ***REMOVED*** return self.$toggleOpen( false ); ***REMOVED***;
  self.toggle = function() ***REMOVED*** return self.$toggleOpen( !$scope.isOpen );  ***REMOVED***;
  self.$toggleOpen = function(value) ***REMOVED*** return $q.when($scope.isOpen = value); ***REMOVED***;

  self.destroy = $mdComponentRegistry.register(self, $attrs.mdComponentId);
***REMOVED***
SidenavController.$inject = ["$scope", "$element", "$attrs", "$mdComponentRegistry", "$q"];

ng.material.components.sidenav = angular.module("material.components.sidenav");
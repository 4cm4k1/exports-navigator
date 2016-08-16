/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
(function( window, angular, undefined )***REMOVED***
"use strict";

/**
 * Initialization function that validates environment
 * requirements.
 */
angular
  .module('material.core', [
    'ngAnimate',
    'material.core.animate',
    'material.core.layout',
    'material.core.gestures',
    'material.core.theming'
  ])
  .config(MdCoreConfigure)
  .run(DetectNgTouch);


/**
 * Detect if the ng-Touch module is also being used.
 * Warn if detected.
 * ngInject
 */
function DetectNgTouch($log, $injector) ***REMOVED***
  if ( $injector.has('$swipe') ) ***REMOVED***
    var msg = "" +
      "You are using the ngTouch module. \n" +
      "Angular Material already has mobile click, tap, and swipe support... \n" +
      "ngTouch is not supported with Angular Material!";
    $log.warn(msg);
  ***REMOVED***
***REMOVED***
DetectNgTouch.$inject = ["$log", "$injector"];

/**
 * ngInject
 */
function MdCoreConfigure($provide, $mdThemingProvider) ***REMOVED***

  $provide.decorator('$$rAF', ["$delegate", rAFDecorator]);

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink')
    .warnPalette('deep-orange')
    .backgroundPalette('grey');
***REMOVED***
MdCoreConfigure.$inject = ["$provide", "$mdThemingProvider"];

/**
 * ngInject
 */
function rAFDecorator($delegate) ***REMOVED***
  /**
   * Use this to throttle events that come in often.
   * The throttled function will always use the *last* invocation before the
   * coming frame.
   *
   * For example, window resize events that fire many times a second:
   * If we set to use an raf-throttled callback on window resize, then
   * our callback will only be fired once per frame, with the last resize
   * event that happened before that frame.
   *
   * @param ***REMOVED***function***REMOVED*** callback function to debounce
   */
  $delegate.throttle = function(cb) ***REMOVED***
    var queuedArgs, alreadyQueued, queueCb, context;
    return function debounced() ***REMOVED***
      queuedArgs = arguments;
      context = this;
      queueCb = cb;
      if (!alreadyQueued) ***REMOVED***
        alreadyQueued = true;
        $delegate(function() ***REMOVED***
          queueCb.apply(context, Array.prototype.slice.call(queuedArgs));
          alreadyQueued = false;
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***;
  return $delegate;
***REMOVED***
rAFDecorator.$inject = ["$delegate"];

angular.module('material.core')
  .directive('mdAutofocus', MdAutofocusDirective)

  // Support the deprecated md-auto-focus and md-sidenav-focus as well
  .directive('mdAutoFocus', MdAutofocusDirective)
  .directive('mdSidenavFocus', MdAutofocusDirective);

/**
 * @ngdoc directive
 * @name mdAutofocus
 * @module material.core.util
 *
 * @description
 *
 * `[md-autofocus]` provides an optional way to identify the focused element when a `$mdDialog`,
 * `$mdBottomSheet`, `$mdMenu` or `$mdSidenav` opens or upon page load for input-like elements.
 *
 * When one of these opens, it will find the first nested element with the `[md-autofocus]`
 * attribute directive and optional expression. An expression may be specified as the directive
 * value to enable conditional activation of the autofocus.
 *
 * @usage
 *
 * ### Dialog
 * <hljs lang="html">
 * <md-dialog>
 *   <form>
 *     <md-input-container>
 *       <label for="testInput">Label</label>
 *       <input id="testInput" type="text" md-autofocus>
 *     </md-input-container>
 *   </form>
 * </md-dialog>
 * </hljs>
 *
 * ### Bottomsheet
 * <hljs lang="html">
 * <md-bottom-sheet class="md-list md-has-header">
 *  <md-subheader>Comment Actions</md-subheader>
 *  <md-list>
 *    <md-list-item ng-repeat="item in items">
 *
 *      <md-button md-autofocus="$index == 2">
 *        <md-icon md-svg-src="***REMOVED******REMOVED***item.icon***REMOVED******REMOVED***"></md-icon>
 *        <span class="md-inline-list-icon-label">***REMOVED******REMOVED*** item.name ***REMOVED******REMOVED***</span>
 *      </md-button>
 *
 *    </md-list-item>
 *  </md-list>
 * </md-bottom-sheet>
 * </hljs>
 *
 * ### Autocomplete
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-autofocus
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display">
 *     <span md-highlight-text="searchText">***REMOVED******REMOVED***item.display***REMOVED******REMOVED***</span>
 *   </md-autocomplete>
 * </hljs>
 *
 * ### Sidenav
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
 **/
function MdAutofocusDirective() ***REMOVED***
  return ***REMOVED***
    restrict: 'A',

    link: postLink
  ***REMOVED***
***REMOVED***

function postLink(scope, element, attrs) ***REMOVED***
  var attr = attrs.mdAutoFocus || attrs.mdAutofocus || attrs.mdSidenavFocus;

  // Setup a watcher on the proper attribute to update a class we can check for in $mdUtil
  scope.$watch(attr, function(canAutofocus) ***REMOVED***
    element.toggleClass('_md-autofocus', canAutofocus);
  ***REMOVED***);
***REMOVED***

/**
 * @ngdoc module
 * @name material.core.colorUtil
 * @description
 * Color Util
 */
angular
  .module('material.core')
  .factory('$mdColorUtil', ColorUtilFactory);

function ColorUtilFactory() ***REMOVED***
  /**
   * Converts hex value to RGBA string
   * @param color ***REMOVED***string***REMOVED***
   * @returns ***REMOVED***string***REMOVED***
   */
  function hexToRgba (color) ***REMOVED***
    var hex   = color[ 0 ] === '#' ? color.substr(1) : color,
      dig   = hex.length / 3,
      red   = hex.substr(0, dig),
      green = hex.substr(dig, dig),
      blue  = hex.substr(dig * 2);
    if (dig === 1) ***REMOVED***
      red += red;
      green += green;
      blue += blue;
    ***REMOVED***
    return 'rgba(' + parseInt(red, 16) + ',' + parseInt(green, 16) + ',' + parseInt(blue, 16) + ',0.1)';
  ***REMOVED***

  /**
   * Converts rgba value to hex string
   * @param color ***REMOVED***string***REMOVED***
   * @returns ***REMOVED***string***REMOVED***
   */
  function rgbaToHex(color) ***REMOVED***
    color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    var hex = (color && color.length === 4) ? "#" +
    ("0" + parseInt(color[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(color[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(color[3],10).toString(16)).slice(-2) : '';

    return hex.toUpperCase();
  ***REMOVED***

  /**
   * Converts an RGB color to RGBA
   * @param color ***REMOVED***string***REMOVED***
   * @returns ***REMOVED***string***REMOVED***
   */
  function rgbToRgba (color) ***REMOVED***
    return color.replace(')', ', 0.1)').replace('(', 'a(');
  ***REMOVED***

  /**
   * Converts an RGBA color to RGB
   * @param color ***REMOVED***string***REMOVED***
   * @returns ***REMOVED***string***REMOVED***
   */
  function rgbaToRgb (color) ***REMOVED***
    return color
      ? color.replace('rgba', 'rgb').replace(/,[^\),]+\)/, ')')
      : 'rgb(0,0,0)';
  ***REMOVED***

  return ***REMOVED***
    rgbaToHex: rgbaToHex,
    hexToRgba: hexToRgba,
    rgbToRgba: rgbToRgba,
    rgbaToRgb: rgbaToRgb
  ***REMOVED***
***REMOVED***
angular.module('material.core')
.factory('$mdConstant', MdConstantFactory);

/**
 * Factory function that creates the grab-bag $mdConstant service.
 * ngInject
 */
function MdConstantFactory($sniffer) ***REMOVED***

  var vendorPrefix = $sniffer.vendorPrefix;
  var isWebkit = /webkit/i.test(vendorPrefix);
  var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
  var prefixTestEl = document.createElement('div');

  function vendorProperty(name) ***REMOVED***
    // Add a dash between the prefix and name, to be able to transform the string into camelcase.
    var prefixedName = vendorPrefix + '-' + name;
    var ucPrefix = camelCase(prefixedName);
    var lcPrefix = ucPrefix.charAt(0).toLowerCase() + ucPrefix.substring(1);

    return hasStyleProperty(name)     ? name     :       // The current browser supports the un-prefixed property
           hasStyleProperty(ucPrefix) ? ucPrefix :       // The current browser only supports the prefixed property.
           hasStyleProperty(lcPrefix) ? lcPrefix : name; // Some browsers are only supporting the prefix in lowercase.
  ***REMOVED***

  function hasStyleProperty(property) ***REMOVED***
    return angular.isDefined(prefixTestEl.style[property]);
  ***REMOVED***

  function camelCase(input) ***REMOVED***
    return input.replace(SPECIAL_CHARS_REGEXP, function(matches, separator, letter, offset) ***REMOVED***
      return offset ? letter.toUpperCase() : letter;
    ***REMOVED***);
  ***REMOVED***

  return ***REMOVED***
    KEY_CODE: ***REMOVED***
      COMMA: 188,
      SEMICOLON : 186,
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT_ARROW : 37,
      UP_ARROW : 38,
      RIGHT_ARROW : 39,
      DOWN_ARROW : 40,
      TAB : 9,
      BACKSPACE: 8,
      DELETE: 46
    ***REMOVED***,
    CSS: ***REMOVED***
      /* Constants */
      TRANSITIONEND: 'transitionend' + (isWebkit ? ' webkitTransitionEnd' : ''),
      ANIMATIONEND: 'animationend' + (isWebkit ? ' webkitAnimationEnd' : ''),

      TRANSFORM: vendorProperty('transform'),
      TRANSFORM_ORIGIN: vendorProperty('transformOrigin'),
      TRANSITION: vendorProperty('transition'),
      TRANSITION_DURATION: vendorProperty('transitionDuration'),
      ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
      ANIMATION_DURATION: vendorProperty('animationDuration'),
      ANIMATION_NAME: vendorProperty('animationName'),
      ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
      ANIMATION_DIRECTION: vendorProperty('animationDirection')
    ***REMOVED***,
    /**
     * As defined in core/style/variables.scss
     *
     * $layout-breakpoint-xs:     600px !default;
     * $layout-breakpoint-sm:     960px !default;
     * $layout-breakpoint-md:     1280px !default;
     * $layout-breakpoint-lg:     1920px !default;
     *
     */
    MEDIA: ***REMOVED***
      'xs'        : '(max-width: 599px)'                         ,
      'gt-xs'     : '(min-width: 600px)'                         ,
      'sm'        : '(min-width: 600px) and (max-width: 959px)'  ,
      'gt-sm'     : '(min-width: 960px)'                         ,
      'md'        : '(min-width: 960px) and (max-width: 1279px)' ,
      'gt-md'     : '(min-width: 1280px)'                        ,
      'lg'        : '(min-width: 1280px) and (max-width: 1919px)',
      'gt-lg'     : '(min-width: 1920px)'                        ,
      'xl'        : '(min-width: 1920px)'                        ,
      'landscape' : '(orientation: landscape)'                   ,
      'portrait'  : '(orientation: portrait)'                    ,
      'print' : 'print'
    ***REMOVED***,
    MEDIA_PRIORITY: [
      'xl',
      'gt-lg',
      'lg',
      'gt-md',
      'md',
      'gt-sm',
      'sm',
      'gt-xs',
      'xs',
      'landscape',
      'portrait',
      'print'
    ]
  ***REMOVED***;
***REMOVED***
MdConstantFactory.$inject = ["$sniffer"];

  angular
    .module('material.core')
    .config( ["$provide", function($provide)***REMOVED***
       $provide.decorator('$mdUtil', ['$delegate', function ($delegate)***REMOVED***
           /**
            * Inject the iterator facade to easily support iteration and accessors
            * @see iterator below
            */
           $delegate.iterator = MdIterator;

           return $delegate;
         ***REMOVED***
       ]);
     ***REMOVED***]);

  /**
   * iterator is a list facade to easily support iteration and accessors
   *
   * @param items Array list which this iterator will enumerate
   * @param reloop Boolean enables iterator to consider the list as an endless reloop
   */
  function MdIterator(items, reloop) ***REMOVED***
    var trueFn = function() ***REMOVED*** return true; ***REMOVED***;

    if (items && !angular.isArray(items)) ***REMOVED***
      items = Array.prototype.slice.call(items);
    ***REMOVED***

    reloop = !!reloop;
    var _items = items || [ ];

    // Published API
    return ***REMOVED***
      items: getItems,
      count: count,

      inRange: inRange,
      contains: contains,
      indexOf: indexOf,
      itemAt: itemAt,

      findBy: findBy,

      add: add,
      remove: remove,

      first: first,
      last: last,
      next: angular.bind(null, findSubsequentItem, false),
      previous: angular.bind(null, findSubsequentItem, true),

      hasPrevious: hasPrevious,
      hasNext: hasNext

    ***REMOVED***;

    /**
     * Publish copy of the enumerable set
     * @returns ***REMOVED***Array|****REMOVED***
     */
    function getItems() ***REMOVED***
      return [].concat(_items);
    ***REMOVED***

    /**
     * Determine length of the list
     * @returns ***REMOVED***Array.length|*|number***REMOVED***
     */
    function count() ***REMOVED***
      return _items.length;
    ***REMOVED***

    /**
     * Is the index specified valid
     * @param index
     * @returns ***REMOVED***Array.length|*|number|boolean***REMOVED***
     */
    function inRange(index) ***REMOVED***
      return _items.length && ( index > -1 ) && (index < _items.length );
    ***REMOVED***

    /**
     * Can the iterator proceed to the next item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns ***REMOVED***Array.length|*|number|boolean***REMOVED***
     */
    function hasNext(item) ***REMOVED***
      return item ? inRange(indexOf(item) + 1) : false;
    ***REMOVED***

    /**
     * Can the iterator proceed to the previous item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns ***REMOVED***Array.length|*|number|boolean***REMOVED***
     */
    function hasPrevious(item) ***REMOVED***
      return item ? inRange(indexOf(item) - 1) : false;
    ***REMOVED***

    /**
     * Get item at specified index/position
     * @param index
     * @returns ***REMOVED*******REMOVED***
     */
    function itemAt(index) ***REMOVED***
      return inRange(index) ? _items[index] : null;
    ***REMOVED***

    /**
     * Find all elements matching the key/value pair
     * otherwise return null
     *
     * @param val
     * @param key
     *
     * @return array
     */
    function findBy(key, val) ***REMOVED***
      return _items.filter(function(item) ***REMOVED***
        return item[key] === val;
      ***REMOVED***);
    ***REMOVED***

    /**
     * Add item to list
     * @param item
     * @param index
     * @returns ***REMOVED*******REMOVED***
     */
    function add(item, index) ***REMOVED***
      if ( !item ) return -1;

      if (!angular.isNumber(index)) ***REMOVED***
        index = _items.length;
      ***REMOVED***

      _items.splice(index, 0, item);

      return indexOf(item);
    ***REMOVED***

    /**
     * Remove item from list...
     * @param item
     */
    function remove(item) ***REMOVED***
      if ( contains(item) )***REMOVED***
        _items.splice(indexOf(item), 1);
      ***REMOVED***
    ***REMOVED***

    /**
     * Get the zero-based index of the target item
     * @param item
     * @returns ***REMOVED*******REMOVED***
     */
    function indexOf(item) ***REMOVED***
      return _items.indexOf(item);
    ***REMOVED***

    /**
     * Boolean existence check
     * @param item
     * @returns ***REMOVED***boolean***REMOVED***
     */
    function contains(item) ***REMOVED***
      return item && (indexOf(item) > -1);
    ***REMOVED***

    /**
     * Return first item in the list
     * @returns ***REMOVED*******REMOVED***
     */
    function first() ***REMOVED***
      return _items.length ? _items[0] : null;
    ***REMOVED***

    /**
     * Return last item in the list...
     * @returns ***REMOVED*******REMOVED***
     */
    function last() ***REMOVED***
      return _items.length ? _items[_items.length - 1] : null;
    ***REMOVED***

    /**
     * Find the next item. If reloop is true and at the end of the list, it will go back to the
     * first item. If given, the `validate` callback will be used to determine whether the next item
     * is valid. If not valid, it will try to find the next item again.
     *
     * @param ***REMOVED***boolean***REMOVED*** backwards Specifies the direction of searching (forwards/backwards)
     * @param ***REMOVED*******REMOVED*** item The item whose subsequent item we are looking for
     * @param ***REMOVED***Function=***REMOVED*** validate The `validate` function
     * @param ***REMOVED***integer=***REMOVED*** limit The recursion limit
     *
     * @returns ***REMOVED*******REMOVED*** The subsequent item or null
     */
    function findSubsequentItem(backwards, item, validate, limit) ***REMOVED***
      validate = validate || trueFn;

      var curIndex = indexOf(item);
      while (true) ***REMOVED***
        if (!inRange(curIndex)) return null;

        var nextIndex = curIndex + (backwards ? -1 : 1);
        var foundItem = null;
        if (inRange(nextIndex)) ***REMOVED***
          foundItem = _items[nextIndex];
        ***REMOVED*** else if (reloop) ***REMOVED***
          foundItem = backwards ? last() : first();
          nextIndex = indexOf(foundItem);
        ***REMOVED***

        if ((foundItem === null) || (nextIndex === limit)) return null;
        if (validate(foundItem)) return foundItem;

        if (angular.isUndefined(limit)) limit = nextIndex;

        curIndex = nextIndex;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***


angular.module('material.core')
.factory('$mdMedia', mdMediaFactory);

/**
 * @ngdoc service
 * @name $mdMedia
 * @module material.core
 *
 * @description
 * `$mdMedia` is used to evaluate whether a given media query is true or false given the
 * current device's screen / window size. The media query will be re-evaluated on resize, allowing
 * you to register a watch.
 *
 * `$mdMedia` also has pre-programmed support for media queries that match the layout breakpoints:
 *
 *  <table class="md-api-table">
 *    <thead>
 *    <tr>
 *      <th>Breakpoint</th>
 *      <th>mediaQuery</th>
 *    </tr>
 *    </thead>
 *    <tbody>
 *    <tr>
 *      <td>xs</td>
 *      <td>(max-width: 599px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-xs</td>
 *      <td>(min-width: 600px)</td>
 *    </tr>
 *    <tr>
 *      <td>sm</td>
 *      <td>(min-width: 600px) and (max-width: 959px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-sm</td>
 *      <td>(min-width: 960px)</td>
 *    </tr>
 *    <tr>
 *      <td>md</td>
 *      <td>(min-width: 960px) and (max-width: 1279px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-md</td>
 *      <td>(min-width: 1280px)</td>
 *    </tr>
 *    <tr>
 *      <td>lg</td>
 *      <td>(min-width: 1280px) and (max-width: 1919px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-lg</td>
 *      <td>(min-width: 1920px)</td>
 *    </tr>
 *    <tr>
 *      <td>xl</td>
 *      <td>(min-width: 1920px)</td>
 *    </tr>
 *    <tr>
 *      <td>landscape</td>
 *      <td>landscape</td>
 *    </tr>
 *    <tr>
 *      <td>portrait</td>
 *      <td>portrait</td>
 *    </tr>
 *    <tr>
 *      <td>print</td>
 *      <td>print</td>
 *    </tr>
 *    </tbody>
 *  </table>
 *
 *  See Material Design's <a href="https://www.google.com/design/spec/layout/adaptive-ui.html">Layout - Adaptive UI</a> for more details.
 *
 *  <a href="https://www.google.com/design/spec/layout/adaptive-ui.html">
 *  <img src="https://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B8olV15J7abPSGFxemFiQVRtb1k/layout_adaptive_breakpoints_01.png" width="100%" height="100%"></img>
 *  </a>
 *
 * @returns ***REMOVED***boolean***REMOVED*** a boolean representing whether or not the given media query is true or false.
 *
 * @usage
 * <hljs lang="js">
 * app.controller('MyController', function($mdMedia, $scope) ***REMOVED***
 *   $scope.$watch(function() ***REMOVED*** return $mdMedia('lg'); ***REMOVED***, function(big) ***REMOVED***
 *     $scope.bigScreen = big;
 *   ***REMOVED***);
 *
 *   $scope.screenIsSmall = $mdMedia('sm');
 *   $scope.customQuery = $mdMedia('(min-width: 1234px)');
 *   $scope.anotherCustom = $mdMedia('max-width: 300px');
 * ***REMOVED***);
 * </hljs>
 */

/* ngInject */
function mdMediaFactory($mdConstant, $rootScope, $window) ***REMOVED***
  var queries = ***REMOVED******REMOVED***;
  var mqls = ***REMOVED******REMOVED***;
  var results = ***REMOVED******REMOVED***;
  var normalizeCache = ***REMOVED******REMOVED***;

  $mdMedia.getResponsiveAttribute = getResponsiveAttribute;
  $mdMedia.getQuery = getQuery;
  $mdMedia.watchResponsiveAttributes = watchResponsiveAttributes;

  return $mdMedia;

  function $mdMedia(query) ***REMOVED***
    var validated = queries[query];
    if (angular.isUndefined(validated)) ***REMOVED***
      validated = queries[query] = validate(query);
    ***REMOVED***

    var result = results[validated];
    if (angular.isUndefined(result)) ***REMOVED***
      result = add(validated);
    ***REMOVED***

    return result;
  ***REMOVED***

  function validate(query) ***REMOVED***
    return $mdConstant.MEDIA[query] ||
           ((query.charAt(0) !== '(') ? ('(' + query + ')') : query);
  ***REMOVED***

  function add(query) ***REMOVED***
    var result = mqls[query];
    if ( !result ) ***REMOVED***
      result = mqls[query] = $window.matchMedia(query);
    ***REMOVED***

    result.addListener(onQueryChange);
    return (results[result.media] = !!result.matches);
  ***REMOVED***

  function onQueryChange(query) ***REMOVED***
    $rootScope.$evalAsync(function() ***REMOVED***
      results[query.media] = !!query.matches;
    ***REMOVED***);
  ***REMOVED***

  function getQuery(name) ***REMOVED***
    return mqls[name];
  ***REMOVED***

  function getResponsiveAttribute(attrs, attrName) ***REMOVED***
    for (var i = 0; i < $mdConstant.MEDIA_PRIORITY.length; i++) ***REMOVED***
      var mediaName = $mdConstant.MEDIA_PRIORITY[i];
      if (!mqls[queries[mediaName]].matches) ***REMOVED***
        continue;
      ***REMOVED***

      var normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
      if (attrs[normalizedName]) ***REMOVED***
        return attrs[normalizedName];
      ***REMOVED***
    ***REMOVED***

    // fallback on unprefixed
    return attrs[getNormalizedName(attrs, attrName)];
  ***REMOVED***

  function watchResponsiveAttributes(attrNames, attrs, watchFn) ***REMOVED***
    var unwatchFns = [];
    attrNames.forEach(function(attrName) ***REMOVED***
      var normalizedName = getNormalizedName(attrs, attrName);
      if (angular.isDefined(attrs[normalizedName])) ***REMOVED***
        unwatchFns.push(
            attrs.$observe(normalizedName, angular.bind(void 0, watchFn, null)));
      ***REMOVED***

      for (var mediaName in $mdConstant.MEDIA) ***REMOVED***
        normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
        if (angular.isDefined(attrs[normalizedName])) ***REMOVED***
          unwatchFns.push(
              attrs.$observe(normalizedName, angular.bind(void 0, watchFn, mediaName)));
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);

    return function unwatch() ***REMOVED***
      unwatchFns.forEach(function(fn) ***REMOVED*** fn(); ***REMOVED***)
    ***REMOVED***;
  ***REMOVED***

  // Improves performance dramatically
  function getNormalizedName(attrs, attrName) ***REMOVED***
    return normalizeCache[attrName] ||
        (normalizeCache[attrName] = attrs.$normalize(attrName));
  ***REMOVED***
***REMOVED***
mdMediaFactory.$inject = ["$mdConstant", "$rootScope", "$window"];

angular
  .module('material.core')
  .config( ["$provide", function($provide) ***REMOVED***
    $provide.decorator('$mdUtil', ['$delegate', function ($delegate) ***REMOVED***

      // Inject the prefixer into our original $mdUtil service.
      $delegate.prefixer = MdPrefixer;

      return $delegate;
    ***REMOVED***]);
  ***REMOVED***]);

function MdPrefixer(initialAttributes, buildSelector) ***REMOVED***
  var PREFIXES = ['data', 'x'];

  if (initialAttributes) ***REMOVED***
    // The prefixer also accepts attributes as a parameter, and immediately builds a list or selector for
    // the specified attributes.
    return buildSelector ? _buildSelector(initialAttributes) : _buildList(initialAttributes);
  ***REMOVED***

  return ***REMOVED***
    buildList: _buildList,
    buildSelector: _buildSelector,
    hasAttribute: _hasAttribute
  ***REMOVED***;

  function _buildList(attributes) ***REMOVED***
    attributes = angular.isArray(attributes) ? attributes : [attributes];

    attributes.forEach(function(item) ***REMOVED***
      PREFIXES.forEach(function(prefix) ***REMOVED***
        attributes.push(prefix + '-' + item);
      ***REMOVED***);
    ***REMOVED***);

    return attributes;
  ***REMOVED***

  function _buildSelector(attributes) ***REMOVED***
    attributes = angular.isArray(attributes) ? attributes : [attributes];

    return _buildList(attributes)
      .map(function (item) ***REMOVED***
        return '[' + item + ']'
      ***REMOVED***)
      .join(',');
  ***REMOVED***

  function _hasAttribute(element, attribute) ***REMOVED***
    element = element[0] || element;

    var prefixedAttrs = _buildList(attribute);

    for (var i = 0; i < prefixedAttrs.length; i++) ***REMOVED***
      if (element.hasAttribute(prefixedAttrs[i])) ***REMOVED***
        return true;
      ***REMOVED***
    ***REMOVED***

    return false;
  ***REMOVED***
***REMOVED***
/*
 * This var has to be outside the angular factory, otherwise when
 * there are multiple material apps on the same page, each app
 * will create its own instance of this array and the app's IDs
 * will not be unique.
 */
var nextUniqueId = 0;

/**
 * @ngdoc module
 * @name material.core.util
 * @description
 * Util
 */
angular
  .module('material.core')
  .factory('$mdUtil', UtilFactory);

/**
 * ngInject
 */
function UtilFactory($document, $timeout, $compile, $rootScope, $$mdAnimate, $interpolate, $log, $rootElement, $window) ***REMOVED***
  // Setup some core variables for the processTemplate method
  var startSymbol = $interpolate.startSymbol(),
    endSymbol = $interpolate.endSymbol(),
    usesStandardSymbols = ((startSymbol === '***REMOVED******REMOVED***') && (endSymbol === '***REMOVED******REMOVED***'));

  /**
   * Checks if the target element has the requested style by key
   * @param ***REMOVED***DOMElement|JQLite***REMOVED*** target Target element
   * @param ***REMOVED***string***REMOVED*** key Style key
   * @param ***REMOVED***string=***REMOVED*** expectedVal Optional expected value
   * @returns ***REMOVED***boolean***REMOVED*** Whether the target element has the style or not
   */
  var hasComputedStyle = function (target, key, expectedVal) ***REMOVED***
    var hasValue = false;

    if ( target && target.length  ) ***REMOVED***
      var computedStyles = $window.getComputedStyle(target[0]);
      hasValue = angular.isDefined(computedStyles[key]) && (expectedVal ? computedStyles[key] == expectedVal : true);
    ***REMOVED***

    return hasValue;
  ***REMOVED***;

  var $mdUtil = ***REMOVED***
    dom: ***REMOVED******REMOVED***,
    now: window.performance ?
      angular.bind(window.performance, window.performance.now) : Date.now || function() ***REMOVED***
      return new Date().getTime();
    ***REMOVED***,

    /**
     * Bi-directional accessor/mutator used to easily update an element's
     * property based on the current 'dir'ectional value.
     */
    bidi : function(element, property, lValue, rValue) ***REMOVED***
      var ltr = !($document[0].dir == 'rtl' || $document[0].body.dir == 'rtl');

      // If accessor
      if ( arguments.length == 0 ) return ltr ? 'ltr' : 'rtl';

      // If mutator
      if ( ltr && angular.isDefined(lValue)) ***REMOVED***
        angular.element(element).css(property, validate(lValue));
      ***REMOVED***
      else if ( !ltr && angular.isDefined(rValue)) ***REMOVED***
        angular.element(element).css(property, validate(rValue) );
      ***REMOVED***

        // Internal utils

        function validate(value) ***REMOVED***
          return !value       ? '0'   :
                 hasPx(value) ? value : value + 'px';
        ***REMOVED***
        function hasPx(value) ***REMOVED***
          return String(value).indexOf('px') > -1;
        ***REMOVED***
    ***REMOVED***,

    clientRect: function(element, offsetParent, isOffsetRect) ***REMOVED***
      var node = getNode(element);
      offsetParent = getNode(offsetParent || node.offsetParent || document.body);
      var nodeRect = node.getBoundingClientRect();

      // The user can ask for an offsetRect: a rect relative to the offsetParent,
      // or a clientRect: a rect relative to the page
      var offsetRect = isOffsetRect ?
        offsetParent.getBoundingClientRect() :
      ***REMOVED***left: 0, top: 0, width: 0, height: 0***REMOVED***;
      return ***REMOVED***
        left: nodeRect.left - offsetRect.left,
        top: nodeRect.top - offsetRect.top,
        width: nodeRect.width,
        height: nodeRect.height
      ***REMOVED***;
    ***REMOVED***,
    offsetRect: function(element, offsetParent) ***REMOVED***
      return $mdUtil.clientRect(element, offsetParent, true);
    ***REMOVED***,

    // Annoying method to copy nodes to an array, thanks to IE
    nodesToArray: function(nodes) ***REMOVED***
      nodes = nodes || [];

      var results = [];
      for (var i = 0; i < nodes.length; ++i) ***REMOVED***
        results.push(nodes.item(i));
      ***REMOVED***
      return results;
    ***REMOVED***,

    /**
     * Calculate the positive scroll offset
     * TODO: Check with pinch-zoom in IE/Chrome;
     *       https://code.google.com/p/chromium/issues/detail?id=496285
     */
    scrollTop: function(element) ***REMOVED***
      element = angular.element(element || $document[0].body);

      var body = (element[0] == $document[0].body) ? $document[0].body : undefined;
      var scrollTop = body ? body.scrollTop + body.parentElement.scrollTop : 0;

      // Calculate the positive scroll offset
      return scrollTop || Math.abs(element[0].getBoundingClientRect().top);
    ***REMOVED***,

    /**
     * Finds the proper focus target by searching the DOM.
     *
     * @param containerEl
     * @param attributeVal
     * @returns ***REMOVED*******REMOVED***
     */
    findFocusTarget: function(containerEl, attributeVal) ***REMOVED***
      var AUTO_FOCUS = this.prefixer('md-autofocus', true);
      var elToFocus;

      elToFocus = scanForFocusable(containerEl, attributeVal || AUTO_FOCUS);

      if ( !elToFocus && attributeVal != AUTO_FOCUS) ***REMOVED***
        // Scan for deprecated attribute
        elToFocus = scanForFocusable(containerEl, this.prefixer('md-auto-focus', true));

        if ( !elToFocus ) ***REMOVED***
          // Scan for fallback to 'universal' API
          elToFocus = scanForFocusable(containerEl, AUTO_FOCUS);
        ***REMOVED***
      ***REMOVED***

      return elToFocus;

      /**
       * Can target and nested children for specified Selector (attribute)
       * whose value may be an expression that evaluates to True/False.
       */
      function scanForFocusable(target, selector) ***REMOVED***
        var elFound, items = target[0].querySelectorAll(selector);

        // Find the last child element with the focus attribute
        if ( items && items.length )***REMOVED***
          items.length && angular.forEach(items, function(it) ***REMOVED***
            it = angular.element(it);

            // Check the element for the _md-autofocus class to ensure any associated expression
            // evaluated to true.
            var isFocusable = it.hasClass('_md-autofocus');
            if (isFocusable) elFound = it;
          ***REMOVED***);
        ***REMOVED***
        return elFound;
      ***REMOVED***
    ***REMOVED***,

    /**
     * Disables scroll around the passed parent element.
     * @param element Unused
     * @param ***REMOVED***!Element|!angular.JQLite***REMOVED*** parent Element to disable scrolling within.
     *   Defaults to body if none supplied.
     */
    disableScrollAround: function(element, parent) ***REMOVED***
      $mdUtil.disableScrollAround._count = $mdUtil.disableScrollAround._count || 0;
      ++$mdUtil.disableScrollAround._count;
      if ($mdUtil.disableScrollAround._enableScrolling) return $mdUtil.disableScrollAround._enableScrolling;
      var body = $document[0].body,
        restoreBody = disableBodyScroll(),
        restoreElement = disableElementScroll(parent);

      return $mdUtil.disableScrollAround._enableScrolling = function() ***REMOVED***
        if (!--$mdUtil.disableScrollAround._count) ***REMOVED***
          restoreBody();
          restoreElement();
          delete $mdUtil.disableScrollAround._enableScrolling;
        ***REMOVED***
      ***REMOVED***;

      // Creates a virtual scrolling mask to absorb touchmove, keyboard, scrollbar clicking, and wheel events
      function disableElementScroll(element) ***REMOVED***
        element = angular.element(element || body)[0];
        var scrollMask = angular.element(
          '<div class="md-scroll-mask">' +
          '  <div class="md-scroll-mask-bar"></div>' +
          '</div>');
        element.appendChild(scrollMask[0]);

        scrollMask.on('wheel', preventDefault);
        scrollMask.on('touchmove', preventDefault);

        return function restoreScroll() ***REMOVED***
          scrollMask.off('wheel');
          scrollMask.off('touchmove');
          scrollMask[0].parentNode.removeChild(scrollMask[0]);
          delete $mdUtil.disableScrollAround._enableScrolling;
        ***REMOVED***;

        function preventDefault(e) ***REMOVED***
          e.preventDefault();
        ***REMOVED***
      ***REMOVED***

      // Converts the body to a position fixed block and translate it to the proper scroll
      // position
      function disableBodyScroll() ***REMOVED***
        var htmlNode = body.parentNode;
        var restoreHtmlStyle = htmlNode.style.cssText || '';
        var restoreBodyStyle = body.style.cssText || '';
        var scrollOffset = $mdUtil.scrollTop(body);
        var clientWidth = body.clientWidth;

        if (body.scrollHeight > body.clientHeight + 1) ***REMOVED***
          applyStyles(body, ***REMOVED***
            position: 'fixed',
            width: '100%',
            top: -scrollOffset + 'px'
          ***REMOVED***);

          htmlNode.style.overflowY = 'scroll';
        ***REMOVED***

        if (body.clientWidth < clientWidth) applyStyles(body, ***REMOVED***overflow: 'hidden'***REMOVED***);

        return function restoreScroll() ***REMOVED***
          body.style.cssText = restoreBodyStyle;
          htmlNode.style.cssText = restoreHtmlStyle;
          body.scrollTop = scrollOffset;
          htmlNode.scrollTop = scrollOffset;
        ***REMOVED***;
      ***REMOVED***

      function applyStyles(el, styles) ***REMOVED***
        for (var key in styles) ***REMOVED***
          el.style[key] = styles[key];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***,
    enableScrolling: function() ***REMOVED***
      var method = this.disableScrollAround._enableScrolling;
      method && method();
    ***REMOVED***,
    floatingScrollbars: function() ***REMOVED***
      if (this.floatingScrollbars.cached === undefined) ***REMOVED***
        var tempNode = angular.element('<div><div></div></div>').css(***REMOVED***
          width: '100%',
          'z-index': -1,
          position: 'absolute',
          height: '35px',
          'overflow-y': 'scroll'
        ***REMOVED***);
        tempNode.children().css('height', '60px');

        $document[0].body.appendChild(tempNode[0]);
        this.floatingScrollbars.cached = (tempNode[0].offsetWidth == tempNode[0].childNodes[0].offsetWidth);
        tempNode.remove();
      ***REMOVED***
      return this.floatingScrollbars.cached;
    ***REMOVED***,

    // Mobile safari only allows you to set focus in click event listeners...
    forceFocus: function(element) ***REMOVED***
      var node = element[0] || element;

      document.addEventListener('click', function focusOnClick(ev) ***REMOVED***
        if (ev.target === node && ev.$focus) ***REMOVED***
          node.focus();
          ev.stopImmediatePropagation();
          ev.preventDefault();
          node.removeEventListener('click', focusOnClick);
        ***REMOVED***
      ***REMOVED***, true);

      var newEvent = document.createEvent('MouseEvents');
      newEvent.initMouseEvent('click', false, true, window, ***REMOVED******REMOVED***, 0, 0, 0, 0,
        false, false, false, false, 0, null);
      newEvent.$material = true;
      newEvent.$focus = true;
      node.dispatchEvent(newEvent);
    ***REMOVED***,

    /**
     * facade to build md-backdrop element with desired styles
     * NOTE: Use $compile to trigger backdrop postLink function
     */
    createBackdrop: function(scope, addClass) ***REMOVED***
      return $compile($mdUtil.supplant('<md-backdrop class="***REMOVED***0***REMOVED***">', [addClass]))(scope);
    ***REMOVED***,

    /**
     * supplant() method from Crockford's `Remedial Javascript`
     * Equivalent to use of $interpolate; without dependency on
     * interpolation symbols and scope. Note: the '***REMOVED***<token>***REMOVED***' can
     * be property names, property chains, or array indices.
     */
    supplant: function(template, values, pattern) ***REMOVED***
      pattern = pattern || /\***REMOVED***([^\***REMOVED***\***REMOVED***]*)\***REMOVED***/g;
      return template.replace(pattern, function(a, b) ***REMOVED***
        var p = b.split('.'),
          r = values;
        try ***REMOVED***
          for (var s in p) ***REMOVED***
            if (p.hasOwnProperty(s) ) ***REMOVED***
              r = r[p[s]];
            ***REMOVED***
          ***REMOVED***
        ***REMOVED*** catch (e) ***REMOVED***
          r = a;
        ***REMOVED***
        return (typeof r === 'string' || typeof r === 'number') ? r : a;
      ***REMOVED***);
    ***REMOVED***,

    fakeNgModel: function() ***REMOVED***
      return ***REMOVED***
        $fake: true,
        $setTouched: angular.noop,
        $setViewValue: function(value) ***REMOVED***
          this.$viewValue = value;
          this.$render(value);
          this.$viewChangeListeners.forEach(function(cb) ***REMOVED***
            cb();
          ***REMOVED***);
        ***REMOVED***,
        $isEmpty: function(value) ***REMOVED***
          return ('' + value).length === 0;
        ***REMOVED***,
        $parsers: [],
        $formatters: [],
        $viewChangeListeners: [],
        $render: angular.noop
      ***REMOVED***;
    ***REMOVED***,

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds.
    // @param wait Integer value of msecs to delay (since last debounce reset); default value 10 msecs
    // @param invokeApply should the $timeout trigger $digest() dirty checking
    debounce: function(func, wait, scope, invokeApply) ***REMOVED***
      var timer;

      return function debounced() ***REMOVED***
        var context = scope,
          args = Array.prototype.slice.call(arguments);

        $timeout.cancel(timer);
        timer = $timeout(function() ***REMOVED***

          timer = undefined;
          func.apply(context, args);

        ***REMOVED***, wait || 10, invokeApply);
      ***REMOVED***;
    ***REMOVED***,

    // Returns a function that can only be triggered every `delay` milliseconds.
    // In other words, the function will not be called unless it has been more
    // than `delay` milliseconds since the last call.
    throttle: function throttle(func, delay) ***REMOVED***
      var recent;
      return function throttled() ***REMOVED***
        var context = this;
        var args = arguments;
        var now = $mdUtil.now();

        if (!recent || (now - recent > delay)) ***REMOVED***
          func.apply(context, args);
          recent = now;
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***,

    /**
     * Measures the number of milliseconds taken to run the provided callback
     * function. Uses a high-precision timer if available.
     */
    time: function time(cb) ***REMOVED***
      var start = $mdUtil.now();
      cb();
      return $mdUtil.now() - start;
    ***REMOVED***,

    /**
     * Create an implicit getter that caches its `getter()`
     * lookup value
     */
    valueOnUse : function (scope, key, getter) ***REMOVED***
      var value = null, args = Array.prototype.slice.call(arguments);
      var params = (args.length > 3) ? args.slice(3) : [ ];

      Object.defineProperty(scope, key, ***REMOVED***
        get: function () ***REMOVED***
          if (value === null) value = getter.apply(scope, params);
          return value;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***,

    /**
     * Get a unique ID.
     *
     * @returns ***REMOVED***string***REMOVED*** an unique numeric string
     */
    nextUid: function() ***REMOVED***
      return '' + nextUniqueId++;
    ***REMOVED***,

    // Stop watchers and events from firing on a scope without destroying it,
    // by disconnecting it from its parent and its siblings' linked lists.
    disconnectScope: function disconnectScope(scope) ***REMOVED***
      if (!scope) return;

      // we can't destroy the root scope or a scope that has been already destroyed
      if (scope.$root === scope) return;
      if (scope.$$destroyed) return;

      var parent = scope.$parent;
      scope.$$disconnected = true;

      // See Scope.$destroy
      if (parent.$$childHead === scope) parent.$$childHead = scope.$$nextSibling;
      if (parent.$$childTail === scope) parent.$$childTail = scope.$$prevSibling;
      if (scope.$$prevSibling) scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
      if (scope.$$nextSibling) scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;

      scope.$$nextSibling = scope.$$prevSibling = null;

    ***REMOVED***,

    // Undo the effects of disconnectScope above.
    reconnectScope: function reconnectScope(scope) ***REMOVED***
      if (!scope) return;

      // we can't disconnect the root node or scope already disconnected
      if (scope.$root === scope) return;
      if (!scope.$$disconnected) return;

      var child = scope;

      var parent = child.$parent;
      child.$$disconnected = false;
      // See Scope.$new for this logic...
      child.$$prevSibling = parent.$$childTail;
      if (parent.$$childHead) ***REMOVED***
        parent.$$childTail.$$nextSibling = child;
        parent.$$childTail = child;
      ***REMOVED*** else ***REMOVED***
        parent.$$childHead = parent.$$childTail = child;
      ***REMOVED***
    ***REMOVED***,

    /*
     * getClosest replicates jQuery.closest() to walk up the DOM tree until it finds a matching nodeName
     *
     * @param el Element to start walking the DOM from
     * @param tagName Tag name to find closest to el, such as 'form'
     * @param onlyParent Only start checking from the parent element, not `el`.
     */
    getClosest: function getClosest(el, tagName, onlyParent) ***REMOVED***
      if (el instanceof angular.element) el = el[0];
      tagName = tagName.toUpperCase();
      if (onlyParent) el = el.parentNode;
      if (!el) return null;
      do ***REMOVED***
        if (el.nodeName === tagName) ***REMOVED***
          return el;
        ***REMOVED***
      ***REMOVED*** while (el = el.parentNode);
      return null;
    ***REMOVED***,

    /**
     * Build polyfill for the Node.contains feature (if needed)
     */
    elementContains: function(node, child) ***REMOVED***
      var hasContains = (window.Node && window.Node.prototype && Node.prototype.contains);
      var findFn = hasContains ? angular.bind(node, node.contains) : angular.bind(node, function(arg) ***REMOVED***
        // compares the positions of two nodes and returns a bitmask
        return (node === child) || !!(this.compareDocumentPosition(arg) & 16)
      ***REMOVED***);

      return findFn(child);
    ***REMOVED***,

    /**
     * Functional equivalent for $element.filter(‘md-bottom-sheet’)
     * useful with interimElements where the element and its container are important...
     *
     * @param ***REMOVED***[]***REMOVED*** elements to scan
     * @param ***REMOVED***string***REMOVED*** name of node to find (e.g. 'md-dialog')
     * @param ***REMOVED***boolean=***REMOVED*** optional flag to allow deep scans; defaults to 'false'.
     * @param ***REMOVED***boolean=***REMOVED*** optional flag to enable log warnings; defaults to false
     */
    extractElementByName: function(element, nodeName, scanDeep, warnNotFound) ***REMOVED***
      var found = scanTree(element);
      if (!found && !!warnNotFound) ***REMOVED***
        $log.warn( $mdUtil.supplant("Unable to find node '***REMOVED***0***REMOVED***' in element '***REMOVED***1***REMOVED***'.",[nodeName, element[0].outerHTML]) );
      ***REMOVED***

      return angular.element(found || element);

      /**
       * Breadth-First tree scan for element with matching `nodeName`
       */
      function scanTree(element) ***REMOVED***
        return scanLevel(element) || (!!scanDeep ? scanChildren(element) : null);
      ***REMOVED***

      /**
       * Case-insensitive scan of current elements only (do not descend).
       */
      function scanLevel(element) ***REMOVED***
        if ( element ) ***REMOVED***
          for (var i = 0, len = element.length; i < len; i++) ***REMOVED***
            if (element[i].nodeName.toLowerCase() === nodeName) ***REMOVED***
              return element[i];
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
        return null;
      ***REMOVED***

      /**
       * Scan children of specified node
       */
      function scanChildren(element) ***REMOVED***
        var found;
        if ( element ) ***REMOVED***
          for (var i = 0, len = element.length; i < len; i++) ***REMOVED***
            var target = element[i];
            if ( !found ) ***REMOVED***
              for (var j = 0, numChild = target.childNodes.length; j < numChild; j++) ***REMOVED***
                found = found || scanTree([target.childNodes[j]]);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
        return found;
      ***REMOVED***

    ***REMOVED***,

    /**
     * Give optional properties with no value a boolean true if attr provided or false otherwise
     */
    initOptionalProperties: function(scope, attr, defaults) ***REMOVED***
      defaults = defaults || ***REMOVED******REMOVED***;
      angular.forEach(scope.$$isolateBindings, function(binding, key) ***REMOVED***
        if (binding.optional && angular.isUndefined(scope[key])) ***REMOVED***
          var attrIsDefined = angular.isDefined(attr[binding.attrName]);
          scope[key] = angular.isDefined(defaults[key]) ? defaults[key] : attrIsDefined;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***,

    /**
     * Alternative to $timeout calls with 0 delay.
     * nextTick() coalesces all calls within a single frame
     * to minimize $digest thrashing
     *
     * @param callback
     * @param digest
     * @returns ***REMOVED*******REMOVED***
     */
    nextTick: function(callback, digest, scope) ***REMOVED***
      //-- grab function reference for storing state details
      var nextTick = $mdUtil.nextTick;
      var timeout = nextTick.timeout;
      var queue = nextTick.queue || [];

      //-- add callback to the queue
      queue.push(***REMOVED***scope: scope, callback: callback***REMOVED***);

      //-- set default value for digest
      if (digest == null) digest = true;

      //-- store updated digest/queue values
      nextTick.digest = nextTick.digest || digest;
      nextTick.queue = queue;

      //-- either return existing timeout or create a new one
      return timeout || (nextTick.timeout = $timeout(processQueue, 0, false));

      /**
       * Grab a copy of the current queue
       * Clear the queue for future use
       * Process the existing queue
       * Trigger digest if necessary
       */
      function processQueue() ***REMOVED***
        var queue = nextTick.queue;
        var digest = nextTick.digest;

        nextTick.queue = [];
        nextTick.timeout = null;
        nextTick.digest = false;

        queue.forEach(function(queueItem) ***REMOVED***
          var skip = queueItem.scope && queueItem.scope.$$destroyed;
          if (!skip) ***REMOVED***
            queueItem.callback();
          ***REMOVED***
        ***REMOVED***);

        if (digest) $rootScope.$digest();
      ***REMOVED***
    ***REMOVED***,

    /**
     * Processes a template and replaces the start/end symbols if the application has
     * overriden them.
     *
     * @param template The template to process whose start/end tags may be replaced.
     * @returns ***REMOVED*******REMOVED***
     */
    processTemplate: function(template) ***REMOVED***
      if (usesStandardSymbols) ***REMOVED***
        return template;
      ***REMOVED*** else ***REMOVED***
        if (!template || !angular.isString(template)) return template;
        return template.replace(/\***REMOVED***\***REMOVED***/g, startSymbol).replace(/***REMOVED******REMOVED***/g, endSymbol);
      ***REMOVED***
    ***REMOVED***,

    /**
     * Scan up dom hierarchy for enabled parent;
     */
    getParentWithPointerEvents: function (element) ***REMOVED***
      var parent = element.parent();

      // jqLite might return a non-null, but still empty, parent; so check for parent and length
      while (hasComputedStyle(parent, 'pointer-events', 'none')) ***REMOVED***
        parent = parent.parent();
      ***REMOVED***

      return parent;
    ***REMOVED***,

    getNearestContentElement: function (element) ***REMOVED***
      var current = element.parent()[0];
      // Look for the nearest parent md-content, stopping at the rootElement.
      while (current && current !== $rootElement[0] && current !== document.body && current.nodeName.toUpperCase() !== 'MD-CONTENT') ***REMOVED***
        current = current.parentNode;
      ***REMOVED***
      return current;
    ***REMOVED***,

    /**
     * Parses an attribute value, mostly a string.
     * By default checks for negated values and returns `false´ if present.
     * Negated values are: (native falsy) and negative strings like:
     * `false` or `0`.
     * @param value Attribute value which should be parsed.
     * @param negatedCheck When set to false, won't check for negated values.
     * @returns ***REMOVED***boolean***REMOVED***
     */
    parseAttributeBoolean: function(value, negatedCheck) ***REMOVED***
      return value === '' || !!value && (negatedCheck === false || value !== 'false' && value !== '0');
    ***REMOVED***,

    hasComputedStyle: hasComputedStyle
  ***REMOVED***;


// Instantiate other namespace utility methods

  $mdUtil.dom.animator = $$mdAnimate($mdUtil);

  return $mdUtil;

  function getNode(el) ***REMOVED***
    return el[0] || el;
  ***REMOVED***

***REMOVED***
UtilFactory.$inject = ["$document", "$timeout", "$compile", "$rootScope", "$$mdAnimate", "$interpolate", "$log", "$rootElement", "$window"];

/*
 * Since removing jQuery from the demos, some code that uses `element.focus()` is broken.
 * We need to add `element.focus()`, because it's testable unlike `element[0].focus`.
 */

angular.element.prototype.focus = angular.element.prototype.focus || function() ***REMOVED***
    if (this.length) ***REMOVED***
      this[0].focus();
    ***REMOVED***
    return this;
  ***REMOVED***;
angular.element.prototype.blur = angular.element.prototype.blur || function() ***REMOVED***
    if (this.length) ***REMOVED***
      this[0].blur();
    ***REMOVED***
    return this;
  ***REMOVED***;



angular.module('material.core')
  .service('$mdAria', AriaService);

/*
 * ngInject
 */
function AriaService($$rAF, $log, $window, $interpolate) ***REMOVED***

  return ***REMOVED***
    expect: expect,
    expectAsync: expectAsync,
    expectWithText: expectWithText
  ***REMOVED***;

  /**
   * Check if expected attribute has been specified on the target element or child
   * @param element
   * @param attrName
   * @param ***REMOVED***optional***REMOVED*** defaultValue What to set the attr to if no value is found
   */
  function expect(element, attrName, defaultValue) ***REMOVED***

    var node = angular.element(element)[0] || element;

    // if node exists and neither it nor its children have the attribute
    if (node &&
       ((!node.hasAttribute(attrName) ||
        node.getAttribute(attrName).length === 0) &&
        !childHasAttribute(node, attrName))) ***REMOVED***

      defaultValue = angular.isString(defaultValue) ? defaultValue.trim() : '';
      if (defaultValue.length) ***REMOVED***
        element.attr(attrName, defaultValue);
      ***REMOVED*** else ***REMOVED***
        $log.warn('ARIA: Attribute "', attrName, '", required for accessibility, is missing on node:', node);
      ***REMOVED***

    ***REMOVED***
  ***REMOVED***

  function expectAsync(element, attrName, defaultValueGetter) ***REMOVED***
    // Problem: when retrieving the element's contents synchronously to find the label,
    // the text may not be defined yet in the case of a binding.
    // There is a higher chance that a binding will be defined if we wait one frame.
    $$rAF(function() ***REMOVED***
        expect(element, attrName, defaultValueGetter());
    ***REMOVED***);
  ***REMOVED***

  function expectWithText(element, attrName) ***REMOVED***
    var content = getText(element) || "";
    var hasBinding = content.indexOf($interpolate.startSymbol()) > -1;

    if ( hasBinding ) ***REMOVED***
      expectAsync(element, attrName, function() ***REMOVED***
        return getText(element);
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      expect(element, attrName, content);
    ***REMOVED***
  ***REMOVED***

  function getText(element) ***REMOVED***
    element = element[0] || element;
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    var text = '';

    var node;
    while (node = walker.nextNode()) ***REMOVED***
      if (!isAriaHiddenNode(node)) ***REMOVED***
        text += node.textContent;
      ***REMOVED***
    ***REMOVED***

    return text.trim() || '';

    function isAriaHiddenNode(node) ***REMOVED***
      while (node.parentNode && (node = node.parentNode) !== element) ***REMOVED***
        if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') ***REMOVED***
          return true;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  function childHasAttribute(node, attrName) ***REMOVED***
    var hasChildren = node.hasChildNodes(),
        hasAttr = false;

    function isHidden(el) ***REMOVED***
      var style = el.currentStyle ? el.currentStyle : $window.getComputedStyle(el);
      return (style.display === 'none');
    ***REMOVED***

    if (hasChildren) ***REMOVED***
      var children = node.childNodes;
      for (var i=0; i < children.length; i++) ***REMOVED***
        var child = children[i];
        if (child.nodeType === 1 && child.hasAttribute(attrName)) ***REMOVED***
          if (!isHidden(child)) ***REMOVED***
            hasAttr = true;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    return hasAttr;
  ***REMOVED***
***REMOVED***
AriaService.$inject = ["$$rAF", "$log", "$window", "$interpolate"];

var HANDLERS = ***REMOVED******REMOVED***;

/* The state of the current 'pointer'
 * The pointer represents the state of the current touch.
 * It contains normalized x and y coordinates from DOM events,
 * as well as other information abstracted from the DOM.
 */
 
var pointer, lastPointer, forceSkipClickHijack = false;

/**
 * The position of the most recent click if that click was on a label element.
 * @type ***REMOVED******REMOVED***x: number, y: number***REMOVED***?***REMOVED***
 */
var lastLabelClickPos = null;

// Used to attach event listeners once when multiple ng-apps are running.
var isInitialized = false;

angular
  .module('material.core.gestures', [ ])
  .provider('$mdGesture', MdGestureProvider)
  .factory('$$MdGestureHandler', MdGestureHandler)
  .run( attachToDocument );

/**
   * @ngdoc service
   * @name $mdGestureProvider
   * @module material.core.gestures
   *
   * @description
   * In some scenarios on Mobile devices (without jQuery), the click events should NOT be hijacked.
   * `$mdGestureProvider` is used to configure the Gesture module to ignore or skip click hijacking on mobile
   * devices.
   *
   * <hljs lang="js">
   *   app.config(function($mdGestureProvider) ***REMOVED***
   *
   *     // For mobile devices without jQuery loaded, do not
   *     // intercept click events during the capture phase.
   *     $mdGestureProvider.skipClickHijack();
   *
   *   ***REMOVED***);
   * </hljs>
   *
   */
function MdGestureProvider() ***REMOVED*** ***REMOVED***

MdGestureProvider.prototype = ***REMOVED***

  // Publish access to setter to configure a variable  BEFORE the
  // $mdGesture service is instantiated...
  skipClickHijack: function() ***REMOVED***
    return forceSkipClickHijack = true;
  ***REMOVED***,

  /**
   * $get is used to build an instance of $mdGesture
   * ngInject
   */
  $get : ["$$MdGestureHandler", "$$rAF", "$timeout", function($$MdGestureHandler, $$rAF, $timeout) ***REMOVED***
       return new MdGesture($$MdGestureHandler, $$rAF, $timeout);
  ***REMOVED***]
***REMOVED***;



/**
 * MdGesture factory construction function
 * ngInject
 */
function MdGesture($$MdGestureHandler, $$rAF, $timeout) ***REMOVED***
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var isIos = userAgent.match(/ipad|iphone|ipod/i);
  var isAndroid = userAgent.match(/android/i);
  var hasJQuery =  (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);

  var self = ***REMOVED***
    handler: addHandler,
    register: register,
    // On mobile w/out jQuery, we normally intercept clicks. Should we skip that?
    isHijackingClicks: (isIos || isAndroid) && !hasJQuery && !forceSkipClickHijack
  ***REMOVED***;

  if (self.isHijackingClicks) ***REMOVED***
    var maxClickDistance = 6;
    self.handler('click', ***REMOVED***
      options: ***REMOVED***
        maxDistance: maxClickDistance
      ***REMOVED***,
      onEnd: checkDistanceAndEmit('click')
    ***REMOVED***);

    self.handler('focus', ***REMOVED***
      options: ***REMOVED***
        maxDistance: maxClickDistance
      ***REMOVED***,
      onEnd: function(ev, pointer) ***REMOVED***
        if (pointer.distance < this.state.options.maxDistance) ***REMOVED***
          if (canFocus(ev.target)) ***REMOVED***
            this.dispatchEvent(ev, 'focus', pointer);
            ev.target.focus();
          ***REMOVED***
        ***REMOVED***

        function canFocus(element) ***REMOVED***
          var focusableElements = ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA', 'VIDEO', 'AUDIO'];

          return (element.getAttribute('tabindex') != '-1') &&
              !element.hasAttribute('DISABLED') &&
              (element.hasAttribute('tabindex') || element.hasAttribute('href') ||
              (focusableElements.indexOf(element.nodeName) != -1));
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);

    self.handler('mouseup', ***REMOVED***
      options: ***REMOVED***
        maxDistance: maxClickDistance
      ***REMOVED***,
      onEnd: checkDistanceAndEmit('mouseup')
    ***REMOVED***);

    self.handler('mousedown', ***REMOVED***
      onStart: function(ev) ***REMOVED***
        this.dispatchEvent(ev, 'mousedown');
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***

  function checkDistanceAndEmit(eventName) ***REMOVED***
    return function(ev, pointer) ***REMOVED***
      if (pointer.distance < this.state.options.maxDistance) ***REMOVED***
        this.dispatchEvent(ev, eventName, pointer);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /*
   * Register an element to listen for a handler.
   * This allows an element to override the default options for a handler.
   * Additionally, some handlers like drag and hold only dispatch events if
   * the domEvent happens inside an element that's registered to listen for these events.
   *
   * @see GestureHandler for how overriding of default options works.
   * @example $mdGesture.register(myElement, 'drag', ***REMOVED*** minDistance: 20, horziontal: false ***REMOVED***)
   */
  function register(element, handlerName, options) ***REMOVED***
    var handler = HANDLERS[handlerName.replace(/^\$md./, '')];
    if (!handler) ***REMOVED***
      throw new Error('Failed to register element with handler ' + handlerName + '. ' +
      'Available handlers: ' + Object.keys(HANDLERS).join(', '));
    ***REMOVED***
    return handler.registerElement(element, options);
  ***REMOVED***

  /*
   * add a handler to $mdGesture. see below.
   */
  function addHandler(name, definition) ***REMOVED***
    var handler = new $$MdGestureHandler(name);
    angular.extend(handler, definition);
    HANDLERS[name] = handler;

    return self;
  ***REMOVED***

  /*
   * Register handlers. These listen to touch/start/move events, interpret them,
   * and dispatch gesture events depending on options & conditions. These are all
   * instances of GestureHandler.
   * @see GestureHandler 
   */
  return self
    /*
     * The press handler dispatches an event on touchdown/touchend.
     * It's a simple abstraction of touch/mouse/pointer start and end.
     */
    .handler('press', ***REMOVED***
      onStart: function (ev, pointer) ***REMOVED***
        this.dispatchEvent(ev, '$md.pressdown');
      ***REMOVED***,
      onEnd: function (ev, pointer) ***REMOVED***
        this.dispatchEvent(ev, '$md.pressup');
      ***REMOVED***
    ***REMOVED***)

    /*
     * The hold handler dispatches an event if the user keeps their finger within
     * the same <maxDistance> area for <delay> ms.
     * The hold handler will only run if a parent of the touch target is registered
     * to listen for hold events through $mdGesture.register()
     */
    .handler('hold', ***REMOVED***
      options: ***REMOVED***
        maxDistance: 6,
        delay: 500
      ***REMOVED***,
      onCancel: function () ***REMOVED***
        $timeout.cancel(this.state.timeout);
      ***REMOVED***,
      onStart: function (ev, pointer) ***REMOVED***
        // For hold, require a parent to be registered with $mdGesture.register()
        // Because we prevent scroll events, this is necessary.
        if (!this.state.registeredParent) return this.cancel();

        this.state.pos = ***REMOVED***x: pointer.x, y: pointer.y***REMOVED***;
        this.state.timeout = $timeout(angular.bind(this, function holdDelayFn() ***REMOVED***
          this.dispatchEvent(ev, '$md.hold');
          this.cancel(); //we're done!
        ***REMOVED***), this.state.options.delay, false);
      ***REMOVED***,
      onMove: function (ev, pointer) ***REMOVED***
        // Don't scroll while waiting for hold.
        // If we don't preventDefault touchmove events here, Android will assume we don't
        // want to listen to anymore touch events. It will start scrolling and stop sending
        // touchmove events.
        ev.preventDefault();

        // If the user moves greater than <maxDistance> pixels, stop the hold timer
        // set in onStart
        var dx = this.state.pos.x - pointer.x;
        var dy = this.state.pos.y - pointer.y;
        if (Math.sqrt(dx * dx + dy * dy) > this.options.maxDistance) ***REMOVED***
          this.cancel();
        ***REMOVED***
      ***REMOVED***,
      onEnd: function () ***REMOVED***
        this.onCancel();
      ***REMOVED***
    ***REMOVED***)

    /*
     * The drag handler dispatches a drag event if the user holds and moves his finger greater than
     * <minDistance> px in the x or y direction, depending on options.horizontal.
     * The drag will be cancelled if the user moves his finger greater than <minDistance>*<cancelMultiplier> in
     * the perpindicular direction. Eg if the drag is horizontal and the user moves his finger <minDistance>*<cancelMultiplier>
     * pixels vertically, this handler won't consider the move part of a drag.
     */
    .handler('drag', ***REMOVED***
      options: ***REMOVED***
        minDistance: 6,
        horizontal: true,
        cancelMultiplier: 1.5
      ***REMOVED***,
      onStart: function (ev) ***REMOVED***
        // For drag, require a parent to be registered with $mdGesture.register()
        if (!this.state.registeredParent) this.cancel();
      ***REMOVED***,
      onMove: function (ev, pointer) ***REMOVED***
        var shouldStartDrag, shouldCancel;
        // Don't scroll while deciding if this touchmove qualifies as a drag event.
        // If we don't preventDefault touchmove events here, Android will assume we don't
        // want to listen to anymore touch events. It will start scrolling and stop sending
        // touchmove events.
        ev.preventDefault();

        if (!this.state.dragPointer) ***REMOVED***
          if (this.state.options.horizontal) ***REMOVED***
            shouldStartDrag = Math.abs(pointer.distanceX) > this.state.options.minDistance;
            shouldCancel = Math.abs(pointer.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier;
          ***REMOVED*** else ***REMOVED***
            shouldStartDrag = Math.abs(pointer.distanceY) > this.state.options.minDistance;
            shouldCancel = Math.abs(pointer.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier;
          ***REMOVED***

          if (shouldStartDrag) ***REMOVED***
            // Create a new pointer representing this drag, starting at this point where the drag started.
            this.state.dragPointer = makeStartPointer(ev);
            updatePointerState(ev, this.state.dragPointer);
            this.dispatchEvent(ev, '$md.dragstart', this.state.dragPointer);

          ***REMOVED*** else if (shouldCancel) ***REMOVED***
            this.cancel();
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          this.dispatchDragMove(ev);
        ***REMOVED***
      ***REMOVED***,
      // Only dispatch dragmove events every frame; any more is unnecessray
      dispatchDragMove: $$rAF.throttle(function (ev) ***REMOVED***
        // Make sure the drag didn't stop while waiting for the next frame
        if (this.state.isRunning) ***REMOVED***
          updatePointerState(ev, this.state.dragPointer);
          this.dispatchEvent(ev, '$md.drag', this.state.dragPointer);
        ***REMOVED***
      ***REMOVED***),
      onEnd: function (ev, pointer) ***REMOVED***
        if (this.state.dragPointer) ***REMOVED***
          updatePointerState(ev, this.state.dragPointer);
          this.dispatchEvent(ev, '$md.dragend', this.state.dragPointer);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***)

    /*
     * The swipe handler will dispatch a swipe event if, on the end of a touch,
     * the velocity and distance were high enough.
     */
    .handler('swipe', ***REMOVED***
      options: ***REMOVED***
        minVelocity: 0.65,
        minDistance: 10
      ***REMOVED***,
      onEnd: function (ev, pointer) ***REMOVED***
        var eventType;

        if (Math.abs(pointer.velocityX) > this.state.options.minVelocity &&
          Math.abs(pointer.distanceX) > this.state.options.minDistance) ***REMOVED***
          eventType = pointer.directionX == 'left' ? '$md.swipeleft' : '$md.swiperight';
          this.dispatchEvent(ev, eventType);
        ***REMOVED***
        else if (Math.abs(pointer.velocityY) > this.state.options.minVelocity &&
          Math.abs(pointer.distanceY) > this.state.options.minDistance) ***REMOVED***
          eventType = pointer.directionY == 'up' ? '$md.swipeup' : '$md.swipedown';
          this.dispatchEvent(ev, eventType);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);

***REMOVED***
MdGesture.$inject = ["$$MdGestureHandler", "$$rAF", "$timeout"];

/**
 * MdGestureHandler
 * A GestureHandler is an object which is able to dispatch custom dom events
 * based on native dom ***REMOVED***touch,pointer,mouse***REMOVED******REMOVED***start,move,end***REMOVED*** events.
 *
 * A gesture will manage its lifecycle through the start,move,end, and cancel
 * functions, which are called by native dom events.
 *
 * A gesture has the concept of 'options' (eg a swipe's required velocity), which can be
 * overridden by elements registering through $mdGesture.register()
 */
function GestureHandler (name) ***REMOVED***
  this.name = name;
  this.state = ***REMOVED******REMOVED***;
***REMOVED***

function MdGestureHandler() ***REMOVED***
  var hasJQuery =  (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);

  GestureHandler.prototype = ***REMOVED***
    options: ***REMOVED******REMOVED***,
    // jQuery listeners don't work with custom DOMEvents, so we have to dispatch events
    // differently when jQuery is loaded
    dispatchEvent: hasJQuery ?  jQueryDispatchEvent : nativeDispatchEvent,

    // These are overridden by the registered handler
    onStart: angular.noop,
    onMove: angular.noop,
    onEnd: angular.noop,
    onCancel: angular.noop,

    // onStart sets up a new state for the handler, which includes options from the
    // nearest registered parent element of ev.target.
    start: function (ev, pointer) ***REMOVED***
      if (this.state.isRunning) return;
      var parentTarget = this.getNearestParent(ev.target);
      // Get the options from the nearest registered parent
      var parentTargetOptions = parentTarget && parentTarget.$mdGesture[this.name] || ***REMOVED******REMOVED***;

      this.state = ***REMOVED***
        isRunning: true,
        // Override the default options with the nearest registered parent's options
        options: angular.extend(***REMOVED******REMOVED***, this.options, parentTargetOptions),
        // Pass in the registered parent node to the state so the onStart listener can use
        registeredParent: parentTarget
      ***REMOVED***;
      this.onStart(ev, pointer);
    ***REMOVED***,
    move: function (ev, pointer) ***REMOVED***
      if (!this.state.isRunning) return;
      this.onMove(ev, pointer);
    ***REMOVED***,
    end: function (ev, pointer) ***REMOVED***
      if (!this.state.isRunning) return;
      this.onEnd(ev, pointer);
      this.state.isRunning = false;
    ***REMOVED***,
    cancel: function (ev, pointer) ***REMOVED***
      this.onCancel(ev, pointer);
      this.state = ***REMOVED******REMOVED***;
    ***REMOVED***,

    // Find and return the nearest parent element that has been registered to
    // listen for this handler via $mdGesture.register(element, 'handlerName').
    getNearestParent: function (node) ***REMOVED***
      var current = node;
      while (current) ***REMOVED***
        if ((current.$mdGesture || ***REMOVED******REMOVED***)[this.name]) ***REMOVED***
          return current;
        ***REMOVED***
        current = current.parentNode;
      ***REMOVED***
      return null;
    ***REMOVED***,

    // Called from $mdGesture.register when an element reigsters itself with a handler.
    // Store the options the user gave on the DOMElement itself. These options will
    // be retrieved with getNearestParent when the handler starts.
    registerElement: function (element, options) ***REMOVED***
      var self = this;
      element[0].$mdGesture = element[0].$mdGesture || ***REMOVED******REMOVED***;
      element[0].$mdGesture[this.name] = options || ***REMOVED******REMOVED***;
      element.on('$destroy', onDestroy);

      return onDestroy;

      function onDestroy() ***REMOVED***
        delete element[0].$mdGesture[self.name];
        element.off('$destroy', onDestroy);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

  return GestureHandler;

  /*
   * Dispatch an event with jQuery
   * TODO: Make sure this sends bubbling events
   *
   * @param srcEvent the original DOM touch event that started this.
   * @param eventType the name of the custom event to send (eg 'click' or '$md.drag')
   * @param eventPointer the pointer object that matches this event.
   */
  function jQueryDispatchEvent(srcEvent, eventType, eventPointer) ***REMOVED***
    eventPointer = eventPointer || pointer;
    var eventObj = new angular.element.Event(eventType);

    eventObj.$material = true;
    eventObj.pointer = eventPointer;
    eventObj.srcEvent = srcEvent;

    angular.extend(eventObj, ***REMOVED***
      clientX: eventPointer.x,
      clientY: eventPointer.y,
      screenX: eventPointer.x,
      screenY: eventPointer.y,
      pageX: eventPointer.x,
      pageY: eventPointer.y,
      ctrlKey: srcEvent.ctrlKey,
      altKey: srcEvent.altKey,
      shiftKey: srcEvent.shiftKey,
      metaKey: srcEvent.metaKey
    ***REMOVED***);
    angular.element(eventPointer.target).trigger(eventObj);
  ***REMOVED***

  /*
   * NOTE: nativeDispatchEvent is very performance sensitive.
   * @param srcEvent the original DOM touch event that started this.
   * @param eventType the name of the custom event to send (eg 'click' or '$md.drag')
   * @param eventPointer the pointer object that matches this event.
   */
  function nativeDispatchEvent(srcEvent, eventType, eventPointer) ***REMOVED***
    eventPointer = eventPointer || pointer;
    var eventObj;

    if (eventType === 'click' || eventType == 'mouseup' || eventType == 'mousedown' ) ***REMOVED***
      eventObj = document.createEvent('MouseEvents');
      eventObj.initMouseEvent(
        eventType, true, true, window, srcEvent.detail,
        eventPointer.x, eventPointer.y, eventPointer.x, eventPointer.y,
        srcEvent.ctrlKey, srcEvent.altKey, srcEvent.shiftKey, srcEvent.metaKey,
        srcEvent.button, srcEvent.relatedTarget || null
      );

    ***REMOVED*** else ***REMOVED***
      eventObj = document.createEvent('CustomEvent');
      eventObj.initCustomEvent(eventType, true, true, ***REMOVED******REMOVED***);
    ***REMOVED***
    eventObj.$material = true;
    eventObj.pointer = eventPointer;
    eventObj.srcEvent = srcEvent;
    eventPointer.target.dispatchEvent(eventObj);
  ***REMOVED***

***REMOVED***

/**
 * Attach Gestures: hook document and check shouldHijack clicks
 * ngInject
 */
function attachToDocument( $mdGesture, $$MdGestureHandler ) ***REMOVED***

  // Polyfill document.contains for IE11.
  // TODO: move to util
  document.contains || (document.contains = function (node) ***REMOVED***
    return document.body.contains(node);
  ***REMOVED***);

  if (!isInitialized && $mdGesture.isHijackingClicks ) ***REMOVED***
    /*
     * If hijack clicks is true, we preventDefault any click that wasn't
     * sent by ngMaterial. This is because on older Android & iOS, a false, or 'ghost',
     * click event will be sent ~400ms after a touchend event happens.
     * The only way to know if this click is real is to prevent any normal
     * click events, and add a flag to events sent by material so we know not to prevent those.
     * 
     * Two exceptions to click events that should be prevented are:
     *  - click events sent by the keyboard (eg form submit)
     *  - events that originate from an Ionic app
     */
    document.addEventListener('click'    , clickHijacker     , true);
    document.addEventListener('mouseup'  , mouseInputHijacker, true);
    document.addEventListener('mousedown', mouseInputHijacker, true);
    document.addEventListener('focus'    , mouseInputHijacker, true);

    isInitialized = true;
  ***REMOVED***

  function mouseInputHijacker(ev) ***REMOVED***
    var isKeyClick = !ev.clientX && !ev.clientY;
    if (!isKeyClick && !ev.$material && !ev.isIonicTap
      && !isInputEventFromLabelClick(ev)) ***REMOVED***
      ev.preventDefault();
      ev.stopPropagation();
    ***REMOVED***
  ***REMOVED***

  function clickHijacker(ev) ***REMOVED***
    var isKeyClick = ev.clientX === 0 && ev.clientY === 0;
    if (!isKeyClick && !ev.$material && !ev.isIonicTap
      && !isInputEventFromLabelClick(ev)) ***REMOVED***
      ev.preventDefault();
      ev.stopPropagation();
      lastLabelClickPos = null;
    ***REMOVED*** else ***REMOVED***
      lastLabelClickPos = null;
      if (ev.target.tagName.toLowerCase() == 'label') ***REMOVED***
        lastLabelClickPos = ***REMOVED***x: ev.x, y: ev.y***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***


  // Listen to all events to cover all platforms.
  var START_EVENTS = 'mousedown touchstart pointerdown';
  var MOVE_EVENTS = 'mousemove touchmove pointermove';
  var END_EVENTS = 'mouseup mouseleave touchend touchcancel pointerup pointercancel';

  angular.element(document)
    .on(START_EVENTS, gestureStart)
    .on(MOVE_EVENTS, gestureMove)
    .on(END_EVENTS, gestureEnd)
    // For testing
    .on('$$mdGestureReset', function gestureClearCache () ***REMOVED***
      lastPointer = pointer = null;
    ***REMOVED***);

  /*
   * When a DOM event happens, run all registered gesture handlers' lifecycle
   * methods which match the DOM event.
   * Eg when a 'touchstart' event happens, runHandlers('start') will call and
   * run `handler.cancel()` and `handler.start()` on all registered handlers.
   */
  function runHandlers(handlerEvent, event) ***REMOVED***
    var handler;
    for (var name in HANDLERS) ***REMOVED***
      handler = HANDLERS[name];
      if( handler instanceof $$MdGestureHandler ) ***REMOVED***

        if (handlerEvent === 'start') ***REMOVED***
          // Run cancel to reset any handlers' state
          handler.cancel();
        ***REMOVED***
        handler[handlerEvent](event, pointer);

      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  /*
   * gestureStart vets if a start event is legitimate (and not part of a 'ghost click' from iOS/Android)
   * If it is legitimate, we initiate the pointer state and mark the current pointer's type
   * For example, for a touchstart event, mark the current pointer as a 'touch' pointer, so mouse events
   * won't effect it.
   */
  function gestureStart(ev) ***REMOVED***
    // If we're already touched down, abort
    if (pointer) return;

    var now = +Date.now();

    // iOS & old android bug: after a touch event, a click event is sent 350 ms later.
    // If <400ms have passed, don't allow an event of a different type than the previous event
    if (lastPointer && !typesMatch(ev, lastPointer) && (now - lastPointer.endTime < 1500)) ***REMOVED***
      return;
    ***REMOVED***

    pointer = makeStartPointer(ev);

    runHandlers('start', ev);
  ***REMOVED***
  /*
   * If a move event happens of the right type, update the pointer and run all the move handlers.
   * "of the right type": if a mousemove happens but our pointer started with a touch event, do nothing.
   */
  function gestureMove(ev) ***REMOVED***
    if (!pointer || !typesMatch(ev, pointer)) return;

    updatePointerState(ev, pointer);
    runHandlers('move', ev);
  ***REMOVED***
  /*
   * If an end event happens of the right type, update the pointer, run endHandlers, and save the pointer as 'lastPointer'
   */
  function gestureEnd(ev) ***REMOVED***
    if (!pointer || !typesMatch(ev, pointer)) return;

    updatePointerState(ev, pointer);
    pointer.endTime = +Date.now();

    runHandlers('end', ev);

    lastPointer = pointer;
    pointer = null;
  ***REMOVED***

***REMOVED***
attachToDocument.$inject = ["$mdGesture", "$$MdGestureHandler"];

// ********************
// Module Functions
// ********************

/*
 * Initiate the pointer. x, y, and the pointer's type.
 */
function makeStartPointer(ev) ***REMOVED***
  var point = getEventPoint(ev);
  var startPointer = ***REMOVED***
    startTime: +Date.now(),
    target: ev.target,
    // 'p' for pointer events, 'm' for mouse, 't' for touch
    type: ev.type.charAt(0)
  ***REMOVED***;
  startPointer.startX = startPointer.x = point.pageX;
  startPointer.startY = startPointer.y = point.pageY;
  return startPointer;
***REMOVED***

/*
 * return whether the pointer's type matches the event's type.
 * Eg if a touch event happens but the pointer has a mouse type, return false.
 */
function typesMatch(ev, pointer) ***REMOVED***
  return ev && pointer && ev.type.charAt(0) === pointer.type;
***REMOVED***

/**
 * Gets whether the given event is an input event that was caused by clicking on an
 * associated label element.
 *
 * This is necessary because the browser will, upon clicking on a label element, fire an
 * *extra* click event on its associated input (if any). mdGesture is able to flag the label
 * click as with `$material` correctly, but not the second input click.
 *
 * In order to determine whether an input event is from a label click, we compare the (x, y) for
 * the event to the (x, y) for the most recent label click (which is cleared whenever a non-label
 * click occurs). Unfortunately, there are no event properties that tie the input and the label
 * together (such as relatedTarget).
 *
 * @param ***REMOVED***MouseEvent***REMOVED*** event
 * @returns ***REMOVED***boolean***REMOVED***
 */
function isInputEventFromLabelClick(event) ***REMOVED***
  return lastLabelClickPos
      && lastLabelClickPos.x == event.x
      && lastLabelClickPos.y == event.y;
***REMOVED***

/*
 * Update the given pointer based upon the given DOMEvent.
 * Distance, velocity, direction, duration, etc
 */
function updatePointerState(ev, pointer) ***REMOVED***
  var point = getEventPoint(ev);
  var x = pointer.x = point.pageX;
  var y = pointer.y = point.pageY;

  pointer.distanceX = x - pointer.startX;
  pointer.distanceY = y - pointer.startY;
  pointer.distance = Math.sqrt(
    pointer.distanceX * pointer.distanceX + pointer.distanceY * pointer.distanceY
  );

  pointer.directionX = pointer.distanceX > 0 ? 'right' : pointer.distanceX < 0 ? 'left' : '';
  pointer.directionY = pointer.distanceY > 0 ? 'down' : pointer.distanceY < 0 ? 'up' : '';

  pointer.duration = +Date.now() - pointer.startTime;
  pointer.velocityX = pointer.distanceX / pointer.duration;
  pointer.velocityY = pointer.distanceY / pointer.duration;
***REMOVED***

/*
 * Normalize the point where the DOM event happened whether it's touch or mouse.
 * @returns point event obj with pageX and pageY on it.
 */
function getEventPoint(ev) ***REMOVED***
  ev = ev.originalEvent || ev; // support jQuery events
  return (ev.touches && ev.touches[0]) ||
    (ev.changedTouches && ev.changedTouches[0]) ||
    ev;
***REMOVED***

angular
  .module('material.core')
  .service('$mdCompiler', mdCompilerService);

function mdCompilerService($q, $templateRequest, $injector, $compile, $controller) ***REMOVED***
  /* jshint validthis: true */

  /*
   * @ngdoc service
   * @name $mdCompiler
   * @module material.core
   * @description
   * The $mdCompiler service is an abstraction of angular's compiler, that allows the developer
   * to easily compile an element with a templateUrl, controller, and locals.
   *
   * @usage
   * <hljs lang="js">
   * $mdCompiler.compile(***REMOVED***
   *   templateUrl: 'modal.html',
   *   controller: 'ModalCtrl',
   *   locals: ***REMOVED***
   *     modal: myModalInstance;
   *   ***REMOVED***
   * ***REMOVED***).then(function(compileData) ***REMOVED***
   *   compileData.element; // modal.html's template in an element
   *   compileData.link(myScope); //attach controller & scope to element
   * ***REMOVED***);
   * </hljs>
   */

   /*
    * @ngdoc method
    * @name $mdCompiler#compile
    * @description A helper to compile an HTML template/templateUrl with a given controller,
    * locals, and scope.
    * @param ***REMOVED***object***REMOVED*** options An options object, with the following properties:
    *
    *    - `controller` - `***REMOVED***(string=|function()=***REMOVED***` Controller fn that should be associated with
    *      newly created scope or the name of a registered controller if passed as a string.
    *    - `controllerAs` - `***REMOVED***string=***REMOVED***` A controller alias name. If present the controller will be
    *      published to scope under the `controllerAs` name.
    *    - `template` - `***REMOVED***string=***REMOVED***` An html template as a string.
    *    - `templateUrl` - `***REMOVED***string=***REMOVED***` A path to an html template.
    *    - `transformTemplate` - `***REMOVED***function(template)=***REMOVED***` A function which transforms the template after
    *      it is loaded. It will be given the template string as a parameter, and should
    *      return a a new string representing the transformed template.
    *    - `resolve` - `***REMOVED***Object.<string, function>=***REMOVED***` - An optional map of dependencies which should
    *      be injected into the controller. If any of these dependencies are promises, the compiler
    *      will wait for them all to be resolved, or if one is rejected before the controller is
    *      instantiated `compile()` will fail..
    *      * `key` - `***REMOVED***string***REMOVED***`: a name of a dependency to be injected into the controller.
    *      * `factory` - `***REMOVED***string|function***REMOVED***`: If `string` then it is an alias for a service.
    *        Otherwise if function, then it is injected and the return value is treated as the
    *        dependency. If the result is a promise, it is resolved before its value is
    *        injected into the controller.
    *
    * @returns ***REMOVED***object=***REMOVED*** promise A promise, which will be resolved with a `compileData` object.
    * `compileData` has the following properties:
    *
    *   - `element` - `***REMOVED***element***REMOVED***`: an uncompiled element matching the provided template.
    *   - `link` - `***REMOVED***function(scope)***REMOVED***`: A link function, which, when called, will compile
    *     the element and instantiate the provided controller (if given).
    *   - `locals` - `***REMOVED***object***REMOVED***`: The locals which will be passed into the controller once `link` is
    *     called. If `bindToController` is true, they will be coppied to the ctrl instead
    *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
    */
  this.compile = function(options) ***REMOVED***
    var templateUrl = options.templateUrl;
    var template = options.template || '';
    var controller = options.controller;
    var controllerAs = options.controllerAs;
    var resolve = angular.extend(***REMOVED******REMOVED***, options.resolve || ***REMOVED******REMOVED***);
    var locals = angular.extend(***REMOVED******REMOVED***, options.locals || ***REMOVED******REMOVED***);
    var transformTemplate = options.transformTemplate || angular.identity;
    var bindToController = options.bindToController;

    // Take resolve values and invoke them.
    // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
    // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) ***REMOVED******REMOVED***)
    angular.forEach(resolve, function(value, key) ***REMOVED***
      if (angular.isString(value)) ***REMOVED***
        resolve[key] = $injector.get(value);
      ***REMOVED*** else ***REMOVED***
        resolve[key] = $injector.invoke(value);
      ***REMOVED***
    ***REMOVED***);
    //Add the locals, which are just straight values to inject
    //eg locals: ***REMOVED*** three: 3 ***REMOVED***, will inject three into the controller
    angular.extend(resolve, locals);

    if (templateUrl) ***REMOVED***
      resolve.$template = $templateRequest(templateUrl)
        .then(function(response) ***REMOVED***
          return response;
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      resolve.$template = $q.when(template);
    ***REMOVED***

    // Wait for all the resolves to finish if they are promises
    return $q.all(resolve).then(function(locals) ***REMOVED***

      var compiledData;
      var template = transformTemplate(locals.$template, options);
      var element = options.element || angular.element('<div>').html(template.trim()).contents();
      var linkFn = $compile(element);

      // Return a linking function that can be used later when the element is ready
      return compiledData = ***REMOVED***
        locals: locals,
        element: element,
        link: function link(scope) ***REMOVED***
          locals.$scope = scope;

          //Instantiate controller if it exists, because we have scope
          if (controller) ***REMOVED***
            var invokeCtrl = $controller(controller, locals, true);
            if (bindToController) ***REMOVED***
              angular.extend(invokeCtrl.instance, locals);
            ***REMOVED***
            var ctrl = invokeCtrl();
            //See angular-route source for this logic
            element.data('$ngControllerController', ctrl);
            element.children().data('$ngControllerController', ctrl);

            if (controllerAs) ***REMOVED***
              scope[controllerAs] = ctrl;
            ***REMOVED***

            // Publish reference to this controller
            compiledData.controller = ctrl;
          ***REMOVED***
          return linkFn(scope);
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***);

  ***REMOVED***;
***REMOVED***
mdCompilerService.$inject = ["$q", "$templateRequest", "$injector", "$compile", "$controller"];

angular.module('material.core')
  .provider('$$interimElement', InterimElementProvider);

/*
 * @ngdoc service
 * @name $$interimElement
 * @module material.core
 *
 * @description
 *
 * Factory that contructs `$$interimElement.$service` services.
 * Used internally in material design for elements that appear on screen temporarily.
 * The service provides a promise-like API for interacting with the temporary
 * elements.
 *
 * ```js
 * app.service('$mdToast', function($$interimElement) ***REMOVED***
 *   var $mdToast = $$interimElement(toastDefaultOptions);
 *   return $mdToast;
 * ***REMOVED***);
 * ```
 * @param ***REMOVED***object=***REMOVED*** defaultOptions Options used by default for the `show` method on the service.
 *
 * @returns ***REMOVED***$$interimElement.$service***REMOVED***
 *
 */

function InterimElementProvider() ***REMOVED***
  createInterimElementProvider.$get = InterimElementFactory;
  InterimElementFactory.$inject = ["$document", "$q", "$$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$mdUtil", "$mdCompiler", "$mdTheming", "$injector"];
  return createInterimElementProvider;

  /**
   * Returns a new provider which allows configuration of a new interimElement
   * service. Allows configuration of default options & methods for options,
   * as well as configuration of 'preset' methods (eg dialog.basic(): basic is a preset method)
   */
  function createInterimElementProvider(interimFactoryName) ***REMOVED***
    var EXPOSED_METHODS = ['onHide', 'onShow', 'onRemove'];

    var customMethods = ***REMOVED******REMOVED***;
    var providerConfig = ***REMOVED***
      presets: ***REMOVED******REMOVED***
    ***REMOVED***;

    var provider = ***REMOVED***
      setDefaults: setDefaults,
      addPreset: addPreset,
      addMethod: addMethod,
      $get: factory
    ***REMOVED***;

    /**
     * all interim elements will come with the 'build' preset
     */
    provider.addPreset('build', ***REMOVED***
      methods: ['controller', 'controllerAs', 'resolve',
        'template', 'templateUrl', 'themable', 'transformTemplate', 'parent']
    ***REMOVED***);

    factory.$inject = ["$$interimElement", "$injector"];
    return provider;

    /**
     * Save the configured defaults to be used when the factory is instantiated
     */
    function setDefaults(definition) ***REMOVED***
      providerConfig.optionsFactory = definition.options;
      providerConfig.methods = (definition.methods || []).concat(EXPOSED_METHODS);
      return provider;
    ***REMOVED***

    /**
     * Add a method to the factory that isn't specific to any interim element operations
     */

    function addMethod(name, fn) ***REMOVED***
      customMethods[name] = fn;
      return provider;
    ***REMOVED***

    /**
     * Save the configured preset to be used when the factory is instantiated
     */
    function addPreset(name, definition) ***REMOVED***
      definition = definition || ***REMOVED******REMOVED***;
      definition.methods = definition.methods || [];
      definition.options = definition.options || function() ***REMOVED*** return ***REMOVED******REMOVED***; ***REMOVED***;

      if (/^cancel|hide|show$/.test(name)) ***REMOVED***
        throw new Error("Preset '" + name + "' in " + interimFactoryName + " is reserved!");
      ***REMOVED***
      if (definition.methods.indexOf('_options') > -1) ***REMOVED***
        throw new Error("Method '_options' in " + interimFactoryName + " is reserved!");
      ***REMOVED***
      providerConfig.presets[name] = ***REMOVED***
        methods: definition.methods.concat(EXPOSED_METHODS),
        optionsFactory: definition.options,
        argOption: definition.argOption
      ***REMOVED***;
      return provider;
    ***REMOVED***

    function addPresetMethod(presetName, methodName, method) ***REMOVED***
      providerConfig.presets[presetName][methodName] = method;
    ***REMOVED***

    /**
     * Create a factory that has the given methods & defaults implementing interimElement
     */
    /* ngInject */
    function factory($$interimElement, $injector) ***REMOVED***
      var defaultMethods;
      var defaultOptions;
      var interimElementService = $$interimElement();

      /*
       * publicService is what the developer will be using.
       * It has methods hide(), cancel(), show(), build(), and any other
       * presets which were set during the config phase.
       */
      var publicService = ***REMOVED***
        hide: interimElementService.hide,
        cancel: interimElementService.cancel,
        show: showInterimElement,

        // Special internal method to destroy an interim element without animations
        // used when navigation changes causes a $scope.$destroy() action
        destroy : destroyInterimElement
      ***REMOVED***;


      defaultMethods = providerConfig.methods || [];
      // This must be invoked after the publicService is initialized
      defaultOptions = invokeFactory(providerConfig.optionsFactory, ***REMOVED******REMOVED***);

      // Copy over the simple custom methods
      angular.forEach(customMethods, function(fn, name) ***REMOVED***
        publicService[name] = fn;
      ***REMOVED***);

      angular.forEach(providerConfig.presets, function(definition, name) ***REMOVED***
        var presetDefaults = invokeFactory(definition.optionsFactory, ***REMOVED******REMOVED***);
        var presetMethods = (definition.methods || []).concat(defaultMethods);

        // Every interimElement built with a preset has a field called `$type`,
        // which matches the name of the preset.
        // Eg in preset 'confirm', options.$type === 'confirm'
        angular.extend(presetDefaults, ***REMOVED*** $type: name ***REMOVED***);

        // This creates a preset class which has setter methods for every
        // method given in the `.addPreset()` function, as well as every
        // method given in the `.setDefaults()` function.
        //
        // @example
        // .setDefaults(***REMOVED***
        //   methods: ['hasBackdrop', 'clickOutsideToClose', 'escapeToClose', 'targetEvent'],
        //   options: dialogDefaultOptions
        // ***REMOVED***)
        // .addPreset('alert', ***REMOVED***
        //   methods: ['title', 'ok'],
        //   options: alertDialogOptions
        // ***REMOVED***)
        //
        // Set values will be passed to the options when interimElement.show() is called.
        function Preset(opts) ***REMOVED***
          this._options = angular.extend(***REMOVED******REMOVED***, presetDefaults, opts);
        ***REMOVED***
        angular.forEach(presetMethods, function(name) ***REMOVED***
          Preset.prototype[name] = function(value) ***REMOVED***
            this._options[name] = value;
            return this;
          ***REMOVED***;
        ***REMOVED***);

        // Create shortcut method for one-linear methods
        if (definition.argOption) ***REMOVED***
          var methodName = 'show' + name.charAt(0).toUpperCase() + name.slice(1);
          publicService[methodName] = function(arg) ***REMOVED***
            var config = publicService[name](arg);
            return publicService.show(config);
          ***REMOVED***;
        ***REMOVED***

        // eg $mdDialog.alert() will return a new alert preset
        publicService[name] = function(arg) ***REMOVED***
          // If argOption is supplied, eg `argOption: 'content'`, then we assume
          // if the argument is not an options object then it is the `argOption` option.
          //
          // @example `$mdToast.simple('hello')` // sets options.content to hello
          //                                     // because argOption === 'content'
          if (arguments.length && definition.argOption &&
              !angular.isObject(arg) && !angular.isArray(arg))  ***REMOVED***

            return (new Preset())[definition.argOption](arg);

          ***REMOVED*** else ***REMOVED***
            return new Preset(arg);
          ***REMOVED***

        ***REMOVED***;
      ***REMOVED***);

      return publicService;

      /**
       *
       */
      function showInterimElement(opts) ***REMOVED***
        // opts is either a preset which stores its options on an _options field,
        // or just an object made up of options
        opts = opts || ***REMOVED*** ***REMOVED***;
        if (opts._options) opts = opts._options;

        return interimElementService.show(
          angular.extend(***REMOVED******REMOVED***, defaultOptions, opts)
        );
      ***REMOVED***

      /**
       *  Special method to hide and destroy an interimElement WITHOUT
       *  any 'leave` or hide animations ( an immediate force hide/remove )
       *
       *  NOTE: This calls the onRemove() subclass method for each component...
       *  which must have code to respond to `options.$destroy == true`
       */
      function destroyInterimElement(opts) ***REMOVED***
          return interimElementService.destroy(opts);
      ***REMOVED***

      /**
       * Helper to call $injector.invoke with a local of the factory name for
       * this provider.
       * If an $mdDialog is providing options for a dialog and tries to inject
       * $mdDialog, a circular dependency error will happen.
       * We get around that by manually injecting $mdDialog as a local.
       */
      function invokeFactory(factory, defaultVal) ***REMOVED***
        var locals = ***REMOVED******REMOVED***;
        locals[interimFactoryName] = publicService;
        return $injector.invoke(factory || function() ***REMOVED*** return defaultVal; ***REMOVED***, ***REMOVED******REMOVED***, locals);
      ***REMOVED***

    ***REMOVED***

  ***REMOVED***

  /* ngInject */
  function InterimElementFactory($document, $q, $$q, $rootScope, $timeout, $rootElement, $animate,
                                 $mdUtil, $mdCompiler, $mdTheming, $injector ) ***REMOVED***
    return function createInterimElementService() ***REMOVED***
      var SHOW_CANCELLED = false;

      /*
       * @ngdoc service
       * @name $$interimElement.$service
       *
       * @description
       * A service used to control inserting and removing an element into the DOM.
       *
       */
      var service, stack = [];

      // Publish instance $$interimElement service;
      // ... used as $mdDialog, $mdToast, $mdMenu, and $mdSelect

      return service = ***REMOVED***
        show: show,
        hide: hide,
        cancel: cancel,
        destroy : destroy,
        $injector_: $injector
      ***REMOVED***;

      /*
       * @ngdoc method
       * @name $$interimElement.$service#show
       * @kind function
       *
       * @description
       * Adds the `$interimElement` to the DOM and returns a special promise that will be resolved or rejected
       * with hide or cancel, respectively. To external cancel/hide, developers should use the
       *
       * @param ***REMOVED*******REMOVED*** options is hashMap of settings
       * @returns a Promise
       *
       */
      function show(options) ***REMOVED***
        options = options || ***REMOVED******REMOVED***;
        var interimElement = new InterimElement(options || ***REMOVED******REMOVED***);
        // When an interim element is currently showing, we have to cancel it.
        // Just hiding it, will resolve the InterimElement's promise, the promise should be
        // rejected instead.
        var hideExisting = !options.skipHide && stack.length ? service.cancel() : $q.when(true);

        // This hide()s only the current interim element before showing the next, new one
        // NOTE: this is not reversible (e.g. interim elements are not stackable)

        hideExisting.finally(function() ***REMOVED***

          stack.push(interimElement);
          interimElement
            .show()
            .catch(function( reason ) ***REMOVED***
              //$log.error("InterimElement.show() error: " + reason );
              return reason;
            ***REMOVED***);

        ***REMOVED***);

        // Return a promise that will be resolved when the interim
        // element is hidden or cancelled...

        return interimElement.deferred.promise;
      ***REMOVED***

      /*
       * @ngdoc method
       * @name $$interimElement.$service#hide
       * @kind function
       *
       * @description
       * Removes the `$interimElement` from the DOM and resolves the promise returned from `show`
       *
       * @param ***REMOVED*******REMOVED*** resolveParam Data to resolve the promise with
       * @returns a Promise that will be resolved after the element has been removed.
       *
       */
      function hide(reason, options) ***REMOVED***
        if ( !stack.length ) return $q.when(reason);
        options = options || ***REMOVED******REMOVED***;

        if (options.closeAll) ***REMOVED***
          var promise = $q.all(stack.reverse().map(closeElement));
          stack = [];
          return promise;
        ***REMOVED*** else if (options.closeTo !== undefined) ***REMOVED***
          return $q.all(stack.splice(options.closeTo).map(closeElement));
        ***REMOVED*** else ***REMOVED***
          var interim = stack.pop();
          return closeElement(interim);
        ***REMOVED***

        function closeElement(interim) ***REMOVED***
          interim
            .remove(reason, false, options || ***REMOVED*** ***REMOVED***)
            .catch(function( reason ) ***REMOVED***
              //$log.error("InterimElement.hide() error: " + reason );
              return reason;
            ***REMOVED***);
          return interim.deferred.promise;
        ***REMOVED***
      ***REMOVED***

      /*
       * @ngdoc method
       * @name $$interimElement.$service#cancel
       * @kind function
       *
       * @description
       * Removes the `$interimElement` from the DOM and rejects the promise returned from `show`
       *
       * @param ***REMOVED*******REMOVED*** reason Data to reject the promise with
       * @returns Promise that will be resolved after the element has been removed.
       *
       */
      function cancel(reason, options) ***REMOVED***
        var interim = stack.pop();
        if ( !interim ) return $q.when(reason);

        interim
          .remove(reason, true, options || ***REMOVED*** ***REMOVED***)
          .catch(function( reason ) ***REMOVED***
            //$log.error("InterimElement.cancel() error: " + reason );
            return reason;
          ***REMOVED***);

        // Since Angular 1.6.7, promises will be logged to $exceptionHandler when the promise
        // is not handling the rejection. We create a pseudo catch handler, which will prevent the
        // promise from being logged to the $exceptionHandler.
        return interim.deferred.promise.catch(angular.noop);
      ***REMOVED***

      /*
       * Special method to quick-remove the interim element without animations
       * Note: interim elements are in "interim containers"
       */
      function destroy(target) ***REMOVED***
        var interim = !target ? stack.shift() : null;
        var cntr = angular.element(target).length ? angular.element(target)[0].parentNode : null;

        if (cntr) ***REMOVED***
            // Try to find the interim element in the stack which corresponds to the supplied DOM element.
            var filtered = stack.filter(function(entry) ***REMOVED***
                  var currNode = entry.options.element[0];
                  return  (currNode === cntr);
                ***REMOVED***);

            // Note: this function might be called when the element already has been removed, in which
            //       case we won't find any matches. That's ok.
            if (filtered.length > 0) ***REMOVED***
              interim = filtered[0];
              stack.splice(stack.indexOf(interim), 1);
            ***REMOVED***
        ***REMOVED***

        return interim ? interim.remove(SHOW_CANCELLED, false, ***REMOVED***'$destroy':true***REMOVED***) : $q.when(SHOW_CANCELLED);
      ***REMOVED***

      /*
       * Internal Interim Element Object
       * Used internally to manage the DOM element and related data
       */
      function InterimElement(options) ***REMOVED***
        var self, element, showAction = $q.when(true);

        options = configureScopeAndTransitions(options);

        return self = ***REMOVED***
          options : options,
          deferred: $q.defer(),
          show    : createAndTransitionIn,
          remove  : transitionOutAndRemove
        ***REMOVED***;

        /**
         * Compile, link, and show this interim element
         * Use optional autoHided and transition-in effects
         */
        function createAndTransitionIn() ***REMOVED***
          return $q(function(resolve, reject)***REMOVED***

            compileElement(options)
              .then(function( compiledData ) ***REMOVED***
                element = linkElement( compiledData, options );

                showAction = showElement(element, options, compiledData.controller)
                  .then(resolve, rejectAll);

              ***REMOVED***, rejectAll);

            function rejectAll(fault) ***REMOVED***
              // Force the '$md<xxx>.show()' promise to reject
              self.deferred.reject(fault);

              // Continue rejection propagation
              reject(fault);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***

        /**
         * After the show process has finished/rejected:
         * - announce 'removing',
         * - perform the transition-out, and
         * - perform optional clean up scope.
         */
        function transitionOutAndRemove(response, isCancelled, opts) ***REMOVED***

          // abort if the show() and compile failed
          if ( !element ) return $q.when(false);

          options = angular.extend(options || ***REMOVED******REMOVED***, opts || ***REMOVED******REMOVED***);
          options.cancelAutoHide && options.cancelAutoHide();
          options.element.triggerHandler('$mdInterimElementRemove');

          if ( options.$destroy === true ) ***REMOVED***

            return hideElement(options.element, options).then(function()***REMOVED***
              (isCancelled && rejectAll(response)) || resolveAll(response);
            ***REMOVED***);

          ***REMOVED*** else ***REMOVED***

            $q.when(showAction)
                .finally(function() ***REMOVED***
                  hideElement(options.element, options).then(function() ***REMOVED***

                    (isCancelled && rejectAll(response)) || resolveAll(response);

                  ***REMOVED***, rejectAll);
                ***REMOVED***);

            return self.deferred.promise;
          ***REMOVED***


          /**
           * The `show()` returns a promise that will be resolved when the interim
           * element is hidden or cancelled...
           */
          function resolveAll(response) ***REMOVED***
            self.deferred.resolve(response);
          ***REMOVED***

          /**
           * Force the '$md<xxx>.show()' promise to reject
           */
          function rejectAll(fault) ***REMOVED***
            self.deferred.reject(fault);
          ***REMOVED***
        ***REMOVED***

        /**
         * Prepare optional isolated scope and prepare $animate with default enter and leave
         * transitions for the new element instance.
         */
        function configureScopeAndTransitions(options) ***REMOVED***
          options = options || ***REMOVED*** ***REMOVED***;
          if ( options.template ) ***REMOVED***
            options.template = $mdUtil.processTemplate(options.template);
          ***REMOVED***

          return angular.extend(***REMOVED***
            preserveScope: false,
            cancelAutoHide : angular.noop,
            scope: options.scope || $rootScope.$new(options.isolateScope),

            /**
             * Default usage to enable $animate to transition-in; can be easily overridden via 'options'
             */
            onShow: function transitionIn(scope, element, options) ***REMOVED***
              return $animate.enter(element, options.parent);
            ***REMOVED***,

            /**
             * Default usage to enable $animate to transition-out; can be easily overridden via 'options'
             */
            onRemove: function transitionOut(scope, element) ***REMOVED***
              // Element could be undefined if a new element is shown before
              // the old one finishes compiling.
              return element && $animate.leave(element) || $q.when();
            ***REMOVED***
          ***REMOVED***, options );

        ***REMOVED***

        /**
         * Compile an element with a templateUrl, controller, and locals
         */
        function compileElement(options) ***REMOVED***

          var compiled = !options.skipCompile ? $mdCompiler.compile(options) : null;

          return compiled || $q(function (resolve) ***REMOVED***
              resolve(***REMOVED***
                locals: ***REMOVED******REMOVED***,
                link: function () ***REMOVED***
                  return options.element;
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***);
        ***REMOVED***

        /**
         *  Link an element with compiled configuration
         */
        function linkElement(compileData, options)***REMOVED***
          angular.extend(compileData.locals, options);

          var element = compileData.link(options.scope);

          // Search for parent at insertion time, if not specified
          options.element = element;
          options.parent = findParent(element, options);
          if (options.themable) $mdTheming(element);

          return element;
        ***REMOVED***

        /**
         * Search for parent at insertion time, if not specified
         */
        function findParent(element, options) ***REMOVED***
          var parent = options.parent;

          // Search for parent at insertion time, if not specified
          if (angular.isFunction(parent)) ***REMOVED***
            parent = parent(options.scope, element, options);
          ***REMOVED*** else if (angular.isString(parent)) ***REMOVED***
            parent = angular.element($document[0].querySelector(parent));
          ***REMOVED*** else ***REMOVED***
            parent = angular.element(parent);
          ***REMOVED***

          // If parent querySelector/getter function fails, or it's just null,
          // find a default.
          if (!(parent || ***REMOVED******REMOVED***).length) ***REMOVED***
            var el;
            if ($rootElement[0] && $rootElement[0].querySelector) ***REMOVED***
              el = $rootElement[0].querySelector(':not(svg) > body');
            ***REMOVED***
            if (!el) el = $rootElement[0];
            if (el.nodeName == '#comment') ***REMOVED***
              el = $document[0].body;
            ***REMOVED***
            return angular.element(el);
          ***REMOVED***

          return parent;
        ***REMOVED***

        /**
         * If auto-hide is enabled, start timer and prepare cancel function
         */
        function startAutoHide() ***REMOVED***
          var autoHideTimer, cancelAutoHide = angular.noop;

          if (options.hideDelay) ***REMOVED***
            autoHideTimer = $timeout(service.hide, options.hideDelay) ;
            cancelAutoHide = function() ***REMOVED***
              $timeout.cancel(autoHideTimer);
            ***REMOVED***
          ***REMOVED***

          // Cache for subsequent use
          options.cancelAutoHide = function() ***REMOVED***
            cancelAutoHide();
            options.cancelAutoHide = undefined;
          ***REMOVED***
        ***REMOVED***

        /**
         * Show the element ( with transitions), notify complete and start
         * optional auto-Hide
         */
        function showElement(element, options, controller) ***REMOVED***
          // Trigger onShowing callback before the `show()` starts
          var notifyShowing = options.onShowing || angular.noop;
          // Trigger onComplete callback when the `show()` finishes
          var notifyComplete = options.onComplete || angular.noop;

          notifyShowing(options.scope, element, options, controller);

          return $q(function (resolve, reject) ***REMOVED***
            try ***REMOVED***
              // Start transitionIn
              $q.when(options.onShow(options.scope, element, options, controller))
                .then(function () ***REMOVED***
                  notifyComplete(options.scope, element, options);
                  startAutoHide();

                  resolve(element);

                ***REMOVED***, reject );

            ***REMOVED*** catch(e) ***REMOVED***
              reject(e.message);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***

        function hideElement(element, options) ***REMOVED***
          var announceRemoving = options.onRemoving || angular.noop;

          return $$q(function (resolve, reject) ***REMOVED***
            try ***REMOVED***
              // Start transitionIn
              var action = $$q.when( options.onRemove(options.scope, element, options) || true );

              // Trigger callback *before* the remove operation starts
              announceRemoving(element, action);

              if ( options.$destroy == true ) ***REMOVED***

                // For $destroy, onRemove should be synchronous
                resolve(element);

              ***REMOVED*** else ***REMOVED***

                // Wait until transition-out is done
                action.then(function () ***REMOVED***

                  if (!options.preserveScope && options.scope ) ***REMOVED***
                    options.scope.$destroy();
                  ***REMOVED***

                  resolve(element);

                ***REMOVED***, reject );
              ***REMOVED***

            ***REMOVED*** catch(e) ***REMOVED***
              reject(e);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***

      ***REMOVED***
    ***REMOVED***;

  ***REMOVED***

***REMOVED***

(function() ***REMOVED***
  'use strict';

  var $mdUtil, $interpolate, $log;

  var SUFFIXES = /(-gt)?-(sm|md|lg|print)/g;
  var WHITESPACE = /\s+/g;

  var FLEX_OPTIONS = ['grow', 'initial', 'auto', 'none', 'noshrink', 'nogrow' ];
  var LAYOUT_OPTIONS = ['row', 'column'];
  var ALIGNMENT_MAIN_AXIS= [ "", "start", "center", "end", "stretch", "space-around", "space-between" ];
  var ALIGNMENT_CROSS_AXIS= [ "", "start", "center", "end", "stretch" ];

  var config = ***REMOVED***
    /**
     * Enable directive attribute-to-class conversions
     * Developers can use `<body md-layout-css />` to quickly
     * disable the Layout directives and prohibit the injection of Layout classNames
     */
    enabled: true,

    /**
     * List of mediaQuery breakpoints and associated suffixes
     *
     *   [
     *    ***REMOVED*** suffix: "sm", mediaQuery: "screen and (max-width: 599px)" ***REMOVED***,
     *    ***REMOVED*** suffix: "md", mediaQuery: "screen and (min-width: 600px) and (max-width: 959px)" ***REMOVED***
     *   ]
     */
    breakpoints: []
  ***REMOVED***;

  registerLayoutAPI( angular.module('material.core.layout', ['ng']) );

  /**
   *   registerLayoutAPI()
   *
   *   The original ngMaterial Layout solution used attribute selectors and CSS.
   *
   *  ```html
   *  <div layout="column"> My Content </div>
   *  ```
   *
   *  ```css
   *  [layout] ***REMOVED***
   *    box-sizing: border-box;
   *    display:flex;
   *  ***REMOVED***
   *  [layout=column] ***REMOVED***
   *    flex-direction : column
   *  ***REMOVED***
   *  ```
   *
   *  Use of attribute selectors creates significant performance impacts in some
   *  browsers... mainly IE.
   *
   *  This module registers directives that allow the same layout attributes to be
   *  interpreted and converted to class selectors. The directive will add equivalent classes to each element that
   *  contains a Layout directive.
   *
   * ```html
   *   <div layout="column" class="layout layout-column"> My Content </div>
   *```
   *
   *  ```css
   *  .layout ***REMOVED***
   *    box-sizing: border-box;
   *    display:flex;
   *  ***REMOVED***
   *  .layout-column ***REMOVED***
   *    flex-direction : column
   *  ***REMOVED***
   *  ```
   */
  function registerLayoutAPI(module)***REMOVED***
    var PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

    // NOTE: these are also defined in constants::MEDIA_PRIORITY and constants::MEDIA
    var BREAKPOINTS     = [ "", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "xl", "print" ];
    var API_WITH_VALUES = [ "layout", "flex", "flex-order", "flex-offset", "layout-align" ];
    var API_NO_VALUES   = [ "show", "hide", "layout-padding", "layout-margin" ];


    // Build directive registration functions for the standard Layout API... for all breakpoints.
    angular.forEach(BREAKPOINTS, function(mqb) ***REMOVED***

      // Attribute directives with expected, observable value(s)
      angular.forEach( API_WITH_VALUES, function(name)***REMOVED***
        var fullName = mqb ? name + "-" + mqb : name;
        module.directive( directiveNormalize(fullName), attributeWithObserve(fullName));
      ***REMOVED***);

      // Attribute directives with no expected value(s)
      angular.forEach( API_NO_VALUES, function(name)***REMOVED***
        var fullName = mqb ? name + "-" + mqb : name;
        module.directive( directiveNormalize(fullName), attributeWithoutValue(fullName));
      ***REMOVED***);

    ***REMOVED***);

    // Register other, special directive functions for the Layout features:
    module
      .directive('mdLayoutCss'  , disableLayoutDirective )
      .directive('ngCloak'      ,  buildCloakInterceptor('ng-cloak'))

      .directive('layoutWrap'   , attributeWithoutValue('layout-wrap'))
      .directive('layoutNowrap' , attributeWithoutValue('layout-nowrap'))
      .directive('layoutNoWrap' , attributeWithoutValue('layout-no-wrap'))
      .directive('layoutFill'   , attributeWithoutValue('layout-fill'))

      // !! Deprecated attributes: use the `-lt` (aka less-than) notations

      .directive('layoutLtMd'     , warnAttrNotSupported('layout-lt-md', true))
      .directive('layoutLtLg'     , warnAttrNotSupported('layout-lt-lg', true))
      .directive('flexLtMd'       , warnAttrNotSupported('flex-lt-md', true))
      .directive('flexLtLg'       , warnAttrNotSupported('flex-lt-lg', true))

      .directive('layoutAlignLtMd', warnAttrNotSupported('layout-align-lt-md'))
      .directive('layoutAlignLtLg', warnAttrNotSupported('layout-align-lt-lg'))
      .directive('flexOrderLtMd'  , warnAttrNotSupported('flex-order-lt-md'))
      .directive('flexOrderLtLg'  , warnAttrNotSupported('flex-order-lt-lg'))
      .directive('offsetLtMd'     , warnAttrNotSupported('flex-offset-lt-md'))
      .directive('offsetLtLg'     , warnAttrNotSupported('flex-offset-lt-lg'))

      .directive('hideLtMd'       , warnAttrNotSupported('hide-lt-md'))
      .directive('hideLtLg'       , warnAttrNotSupported('hide-lt-lg'))
      .directive('showLtMd'       , warnAttrNotSupported('show-lt-md'))
      .directive('showLtLg'       , warnAttrNotSupported('show-lt-lg'));

    /**
     * Converts snake_case to camelCase.
     * Also there is special case for Moz prefix starting with upper case letter.
     * @param name Name to normalize
     */
    function directiveNormalize(name) ***REMOVED***
      return name
        .replace(PREFIX_REGEXP, '')
        .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) ***REMOVED***
          return offset ? letter.toUpperCase() : letter;
        ***REMOVED***);
    ***REMOVED***

  ***REMOVED***

  /**
   * Special directive that will disable ALL Layout conversions of layout
   * attribute(s) to classname(s).
   *
   * <link rel="stylesheet" href="angular-material.min.css">
   * <link rel="stylesheet" href="angular-material.layout.css">
   *
   * <body md-layout-css>
   *  ...
   * </body>
   *
   * Note: Using md-layout-css directive requires the developer to load the Material
   * Layout Attribute stylesheet (which only uses attribute selectors):
   *
   *       `angular-material.layout.css`
   *
   * Another option is to use the LayoutProvider to configure and disable the attribute
   * conversions; this would obviate the use of the `md-layout-css` directive
   *
   */
  function disableLayoutDirective() ***REMOVED***
    return ***REMOVED***
      restrict : 'A',
      priority : '900',
      compile  : function(element, attr) ***REMOVED***
        config.enabled = false;
        return angular.noop;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * Tail-hook ngCloak to delay the uncloaking while Layout transformers
   * finish processing. Eliminates flicker with Material.Layoouts
   */
  function buildCloakInterceptor(className) ***REMOVED***
    return [ '$timeout', function($timeout)***REMOVED***
      return ***REMOVED***
        restrict : 'A',
        priority : -10,   // run after normal ng-cloak
        compile  : function( element ) ***REMOVED***
          if (!config.enabled) return angular.noop;

          // Re-add the cloak
          element.addClass(className);

          return function( scope, element ) ***REMOVED***
            // Wait while layout injectors configure, then uncloak
            // NOTE: $rAF does not delay enough... and this is a 1x-only event,
            //       $timeout is acceptable.
            $timeout( function()***REMOVED***
              element.removeClass(className);
            ***REMOVED***, 10, false);
          ***REMOVED***;
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***];
  ***REMOVED***


  // *********************************************************************************
  //
  // These functions create registration functions for ngMaterial Layout attribute directives
  // This provides easy translation to switch ngMaterial attribute selectors to
  // CLASS selectors and directives; which has huge performance implications
  // for IE Browsers
  //
  // *********************************************************************************

  /**
   * Creates a directive registration function where a possible dynamic attribute
   * value will be observed/watched.
   * @param ***REMOVED***string***REMOVED*** className attribute name; eg `layout-gt-md` with value ="row"
   */
  function attributeWithObserve(className) ***REMOVED***

    return ['$mdUtil', '$interpolate', "$log", function(_$mdUtil_, _$interpolate_, _$log_) ***REMOVED***
      $mdUtil = _$mdUtil_;
      $interpolate = _$interpolate_;
      $log = _$log_;

      return ***REMOVED***
        restrict: 'A',
        compile: function(element, attr) ***REMOVED***
          var linkFn;
          if (config.enabled) ***REMOVED***
            // immediately replace static (non-interpolated) invalid values...

            validateAttributeUsage(className, attr, element, $log);

            validateAttributeValue( className,
              getNormalizedAttrValue(className, attr, ""),
              buildUpdateFn(element, className, attr)
            );

            linkFn = translateWithValueToCssClass;
          ***REMOVED***

          // Use for postLink to account for transforms after ng-transclude.
          return linkFn || angular.noop;
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***];

    /**
     * Add as transformed class selector(s), then
     * remove the deprecated attribute selector
     */
    function translateWithValueToCssClass(scope, element, attrs) ***REMOVED***
      var updateFn = updateClassWithValue(element, className, attrs);
      var unwatch = attrs.$observe(attrs.$normalize(className), updateFn);

      updateFn(getNormalizedAttrValue(className, attrs, ""));
      scope.$on("$destroy", function() ***REMOVED*** unwatch() ***REMOVED***);
    ***REMOVED***
  ***REMOVED***

  /**
   * Creates a registration function for ngMaterial Layout attribute directive.
   * This is a `simple` transpose of attribute usage to class usage; where we ignore
   * any attribute value
   */
  function attributeWithoutValue(className) ***REMOVED***
    return ['$mdUtil', '$interpolate', "$log", function(_$mdUtil_, _$interpolate_, _$log_) ***REMOVED***
      $mdUtil = _$mdUtil_;
      $interpolate = _$interpolate_;
      $log = _$log_;

      return ***REMOVED***
        restrict: 'A',
        compile: function(element, attr) ***REMOVED***
          var linkFn;
          if (config.enabled) ***REMOVED***
            // immediately replace static (non-interpolated) invalid values...

            validateAttributeValue( className,
              getNormalizedAttrValue(className, attr, ""),
              buildUpdateFn(element, className, attr)
            );

            translateToCssClass(null, element);

            // Use for postLink to account for transforms after ng-transclude.
            linkFn = translateToCssClass;
          ***REMOVED***

          return linkFn || angular.noop;
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***];

    /**
     * Add as transformed class selector, then
     * remove the deprecated attribute selector
     */
    function translateToCssClass(scope, element) ***REMOVED***
      element.addClass(className);
    ***REMOVED***
  ***REMOVED***



  /**
   * After link-phase, do NOT remove deprecated layout attribute selector.
   * Instead watch the attribute so interpolated data-bindings to layout
   * selectors will continue to be supported.
   *
   * $observe() the className and update with new class (after removing the last one)
   *
   * e.g. `layout="***REMOVED******REMOVED***layoutDemo.direction***REMOVED******REMOVED***"` will update...
   *
   * NOTE: The value must match one of the specified styles in the CSS.
   * For example `flex-gt-md="***REMOVED******REMOVED***size***REMOVED******REMOVED***`  where `scope.size == 47` will NOT work since
   * only breakpoints for 0, 5, 10, 15... 100, 33, 34, 66, 67 are defined.
   *
   */
  function updateClassWithValue(element, className) ***REMOVED***
    var lastClass;

    return function updateClassFn(newValue) ***REMOVED***
      var value = validateAttributeValue(className, newValue || "");
      if ( angular.isDefined(value) ) ***REMOVED***
        if (lastClass) element.removeClass(lastClass);
        lastClass = !value ? className : className + "-" + value.replace(WHITESPACE, "-");
        element.addClass(lastClass);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * Provide console warning that this layout attribute has been deprecated
   *
   */
  function warnAttrNotSupported(className) ***REMOVED***
    var parts = className.split("-");
    return ["$log", function($log) ***REMOVED***
      $log.warn(className + "has been deprecated. Please use a `" + parts[0] + "-gt-<xxx>` variant.");
      return angular.noop;
    ***REMOVED***];
  ***REMOVED***

  /**
   * Centralize warnings for known flexbox issues (especially IE-related issues)
   */
  function validateAttributeUsage(className, attr, element, $log)***REMOVED***
    var message, usage, url;
    var nodeName = element[0].nodeName.toLowerCase();

    switch(className.replace(SUFFIXES,"")) ***REMOVED***
      case "flex":
        if ((nodeName == "md-button") || (nodeName == "fieldset"))***REMOVED***
          // @see https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers
          // Use <div flex> wrapper inside (preferred) or outside

          usage = "<" + nodeName + " " + className + "></" + nodeName + ">";
          url = "https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers";
          message = "Markup '***REMOVED***0***REMOVED***' may not work as expected in IE Browsers. Consult '***REMOVED***1***REMOVED***' for details.";

          $log.warn( $mdUtil.supplant(message, [usage, url]) );
        ***REMOVED***
    ***REMOVED***

  ***REMOVED***


  /**
   * For the Layout attribute value, validate or replace with default
   * fallback value
   */
  function validateAttributeValue(className, value, updateFn) ***REMOVED***
    var origValue = value;

    if (!needsInterpolation(value)) ***REMOVED***
      switch (className.replace(SUFFIXES,"")) ***REMOVED***
        case 'layout'        :
          if ( !findIn(value, LAYOUT_OPTIONS) ) ***REMOVED***
            value = LAYOUT_OPTIONS[0];    // 'row';
          ***REMOVED***
          break;

        case 'flex'          :
          if (!findIn(value, FLEX_OPTIONS)) ***REMOVED***
            if (isNaN(value)) ***REMOVED***
              value = '';
            ***REMOVED***
          ***REMOVED***
          break;

        case 'flex-offset' :
        case 'flex-order'    :
          if (!value || isNaN(+value)) ***REMOVED***
            value = '0';
          ***REMOVED***
          break;

        case 'layout-align'  :
          var axis = extractAlignAxis(value);
          value = $mdUtil.supplant("***REMOVED***main***REMOVED***-***REMOVED***cross***REMOVED***",axis);
          break;

        case 'layout-padding' :
        case 'layout-margin'  :
        case 'layout-fill'    :
        case 'layout-wrap'    :
        case 'layout-nowrap'  :
        case 'layout-nowrap' :
          value = '';
          break;
      ***REMOVED***

      if (value != origValue) ***REMOVED***
        (updateFn || angular.noop)(value);
      ***REMOVED***
    ***REMOVED***

    return value;
  ***REMOVED***

  /**
   * Replace current attribute value with fallback value
   */
  function buildUpdateFn(element, className, attrs) ***REMOVED***
    return function updateAttrValue(fallback) ***REMOVED***
      if (!needsInterpolation(fallback)) ***REMOVED***
        // Do not modify the element's attribute value; so
        // uses '<ui-layout layout="/api/sidebar.html" />' will not
        // be affected. Just update the attrs value.
        attrs[attrs.$normalize(className)] = fallback;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * See if the original value has interpolation symbols:
   * e.g.  flex-gt-md="***REMOVED******REMOVED***triggerPoint***REMOVED******REMOVED***"
   */
  function needsInterpolation(value) ***REMOVED***
    return (value || "").indexOf($interpolate.startSymbol()) > -1;
  ***REMOVED***

  function getNormalizedAttrValue(className, attrs, defaultVal) ***REMOVED***
    var normalizedAttr = attrs.$normalize(className);
    return attrs[normalizedAttr] ? attrs[normalizedAttr].replace(WHITESPACE, "-") : defaultVal || null;
  ***REMOVED***

  function findIn(item, list, replaceWith) ***REMOVED***
    item = replaceWith && item ? item.replace(WHITESPACE, replaceWith) : item;

    var found = false;
    if (item) ***REMOVED***
      list.forEach(function(it) ***REMOVED***
        it = replaceWith ? it.replace(WHITESPACE, replaceWith) : it;
        found = found || (it === item);
      ***REMOVED***);
    ***REMOVED***
    return found;
  ***REMOVED***

  function extractAlignAxis(attrValue) ***REMOVED***
    var axis = ***REMOVED***
      main : "start",
      cross: "stretch"
    ***REMOVED***, values;

    attrValue = (attrValue || "");

    if ( attrValue.indexOf("-") == 0 || attrValue.indexOf(" ") == 0) ***REMOVED***
      // For missing main-axis values
      attrValue = "none" + attrValue;
    ***REMOVED***

    values = attrValue.toLowerCase().trim().replace(WHITESPACE, "-").split("-");
    if ( values.length && (values[0] === "space") ) ***REMOVED***
      // for main-axis values of "space-around" or "space-between"
      values = [ values[0]+"-"+values[1],values[2] ];
    ***REMOVED***

    if ( values.length > 0 ) axis.main  = values[0] || axis.main;
    if ( values.length > 1 ) axis.cross = values[1] || axis.cross;

    if ( ALIGNMENT_MAIN_AXIS.indexOf(axis.main) < 0 )   axis.main = "start";
    if ( ALIGNMENT_CROSS_AXIS.indexOf(axis.cross) < 0 ) axis.cross = "stretch";

    return axis;
  ***REMOVED***


***REMOVED***)();

  /**
   * @ngdoc module
   * @name material.core.componentRegistry
   *
   * @description
   * A component instance registration service.
   * Note: currently this as a private service in the SideNav component.
   */
  angular.module('material.core')
    .factory('$mdComponentRegistry', ComponentRegistry);

  /*
   * @private
   * @ngdoc factory
   * @name ComponentRegistry
   * @module material.core.componentRegistry
   *
   */
  function ComponentRegistry($log, $q) ***REMOVED***

    var self;
    var instances = [ ];
    var pendings = ***REMOVED*** ***REMOVED***;

    return self = ***REMOVED***
      /**
       * Used to print an error when an instance for a handle isn't found.
       */
      notFoundError: function(handle, msgContext) ***REMOVED***
        $log.error( (msgContext || "") + 'No instance found for handle', handle);
      ***REMOVED***,
      /**
       * Return all registered instances as an array.
       */
      getInstances: function() ***REMOVED***
        return instances;
      ***REMOVED***,

      /**
       * Get a registered instance.
       * @param handle the String handle to look up for a registered instance.
       */
      get: function(handle) ***REMOVED***
        if ( !isValidID(handle) ) return null;

        var i, j, instance;
        for(i = 0, j = instances.length; i < j; i++) ***REMOVED***
          instance = instances[i];
          if(instance.$$mdHandle === handle) ***REMOVED***
            return instance;
          ***REMOVED***
        ***REMOVED***
        return null;
      ***REMOVED***,

      /**
       * Register an instance.
       * @param instance the instance to register
       * @param handle the handle to identify the instance under.
       */
      register: function(instance, handle) ***REMOVED***
        if ( !handle ) return angular.noop;

        instance.$$mdHandle = handle;
        instances.push(instance);
        resolveWhen();

        return deregister;

        /**
         * Remove registration for an instance
         */
        function deregister() ***REMOVED***
          var index = instances.indexOf(instance);
          if (index !== -1) ***REMOVED***
            instances.splice(index, 1);
          ***REMOVED***
        ***REMOVED***

        /**
         * Resolve any pending promises for this instance
         */
        function resolveWhen() ***REMOVED***
          var dfd = pendings[handle];
          if ( dfd ) ***REMOVED***
            dfd.forEach(function (promise) ***REMOVED***
              promise.resolve(instance);
            ***REMOVED***);
            delete pendings[handle];
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***,

      /**
       * Async accessor to registered component instance
       * If not available then a promise is created to notify
       * all listeners when the instance is registered.
       */
      when : function(handle) ***REMOVED***
        if ( isValidID(handle) ) ***REMOVED***
          var deferred = $q.defer();
          var instance = self.get(handle);

          if ( instance )  ***REMOVED***
            deferred.resolve( instance );
          ***REMOVED*** else ***REMOVED***
            if (pendings[handle] === undefined) ***REMOVED***
              pendings[handle] = [];
            ***REMOVED***
            pendings[handle].push(deferred);
          ***REMOVED***

          return deferred.promise;
        ***REMOVED***
        return $q.reject("Invalid `md-component-id` value.");
      ***REMOVED***

    ***REMOVED***;

    function isValidID(handle)***REMOVED***
      return handle && (handle !== "");
    ***REMOVED***

  ***REMOVED***
  ComponentRegistry.$inject = ["$log", "$q"];

(function() ***REMOVED***
  'use strict';

  /**
   * @ngdoc service
   * @name $mdButtonInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-button.  See $mdInkRipple service for all possible configuration options.
   *
   * @param ***REMOVED***object=***REMOVED*** scope Scope within the current context
   * @param ***REMOVED***object=***REMOVED*** element The element the ripple effect should be applied to
   * @param ***REMOVED***object=***REMOVED*** options (Optional) Configuration options to override the default ripple configuration
   */

  angular.module('material.core')
    .factory('$mdButtonInkRipple', MdButtonInkRipple);

  function MdButtonInkRipple($mdInkRipple) ***REMOVED***
    return ***REMOVED***
      attach: function attachRipple(scope, element, options) ***REMOVED***
        options = angular.extend(optionsForElement(element), options);

        return $mdInkRipple.attach(scope, element, options);
      ***REMOVED***
    ***REMOVED***;

    function optionsForElement(element) ***REMOVED***
      if (element.hasClass('md-icon-button')) ***REMOVED***
        return ***REMOVED***
          isMenuItem: element.hasClass('md-menu-item'),
          fitRipple: true,
          center: true
        ***REMOVED***;
      ***REMOVED*** else ***REMOVED***
        return ***REMOVED***
          isMenuItem: element.hasClass('md-menu-item'),
          dimBackground: true
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  MdButtonInkRipple.$inject = ["$mdInkRipple"];;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

    /**
   * @ngdoc service
   * @name $mdCheckboxInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-checkbox.  See $mdInkRipple service for all possible configuration options.
   *
   * @param ***REMOVED***object=***REMOVED*** scope Scope within the current context
   * @param ***REMOVED***object=***REMOVED*** element The element the ripple effect should be applied to
   * @param ***REMOVED***object=***REMOVED*** options (Optional) Configuration options to override the defaultripple configuration
   */

  angular.module('material.core')
    .factory('$mdCheckboxInkRipple', MdCheckboxInkRipple);

  function MdCheckboxInkRipple($mdInkRipple) ***REMOVED***
    return ***REMOVED***
      attach: attach
    ***REMOVED***;

    function attach(scope, element, options) ***REMOVED***
      return $mdInkRipple.attach(scope, element, angular.extend(***REMOVED***
        center: true,
        dimBackground: false,
        fitRipple: true
      ***REMOVED***, options));
    ***REMOVED***;
  ***REMOVED***
  MdCheckboxInkRipple.$inject = ["$mdInkRipple"];;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  /**
   * @ngdoc service
   * @name $mdListInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-list.  See $mdInkRipple service for all possible configuration options.
   *
   * @param ***REMOVED***object=***REMOVED*** scope Scope within the current context
   * @param ***REMOVED***object=***REMOVED*** element The element the ripple effect should be applied to
   * @param ***REMOVED***object=***REMOVED*** options (Optional) Configuration options to override the defaultripple configuration
   */

  angular.module('material.core')
    .factory('$mdListInkRipple', MdListInkRipple);

  function MdListInkRipple($mdInkRipple) ***REMOVED***
    return ***REMOVED***
      attach: attach
    ***REMOVED***;

    function attach(scope, element, options) ***REMOVED***
      return $mdInkRipple.attach(scope, element, angular.extend(***REMOVED***
        center: false,
        dimBackground: true,
        outline: false,
        rippleSize: 'full'
      ***REMOVED***, options));
    ***REMOVED***;
  ***REMOVED***
  MdListInkRipple.$inject = ["$mdInkRipple"];;
***REMOVED***)();

/**
 * @ngdoc module
 * @name material.core.ripple
 * @description
 * Ripple
 */
angular.module('material.core')
    .provider('$mdInkRipple', InkRippleProvider)
    .directive('mdInkRipple', InkRippleDirective)
    .directive('mdNoInk', attrNoDirective)
    .directive('mdNoBar', attrNoDirective)
    .directive('mdNoStretch', attrNoDirective);

var DURATION = 450;

/**
 * @ngdoc directive
 * @name mdInkRipple
 * @module material.core.ripple
 *
 * @description
 * The `md-ink-ripple` directive allows you to specify the ripple color or id a ripple is allowed.
 *
 * @param ***REMOVED***string|boolean***REMOVED*** md-ink-ripple A color string `#FF0000` or boolean (`false` or `0`) for preventing ripple
 *
 * @usage
 * ### String values
 * <hljs lang="html">
 *   <ANY md-ink-ripple="#FF0000">
 *     Ripples in red
 *   </ANY>
 *
 *   <ANY md-ink-ripple="false">
 *     Not rippling
 *   </ANY>
 * </hljs>
 *
 * ### Interpolated values
 * <hljs lang="html">
 *   <ANY md-ink-ripple="***REMOVED******REMOVED*** randomColor() ***REMOVED******REMOVED***">
 *     Ripples with the return value of 'randomColor' function
 *   </ANY>
 *
 *   <ANY md-ink-ripple="***REMOVED******REMOVED*** canRipple() ***REMOVED******REMOVED***">
 *     Ripples if 'canRipple' function return value is not 'false' or '0'
 *   </ANY>
 * </hljs>
 */
function InkRippleDirective ($mdButtonInkRipple, $mdCheckboxInkRipple) ***REMOVED***
  return ***REMOVED***
    controller: angular.noop,
    link:       function (scope, element, attr) ***REMOVED***
      attr.hasOwnProperty('mdInkRippleCheckbox')
          ? $mdCheckboxInkRipple.attach(scope, element)
          : $mdButtonInkRipple.attach(scope, element);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
InkRippleDirective.$inject = ["$mdButtonInkRipple", "$mdCheckboxInkRipple"];

/**
 * @ngdoc service
 * @name $mdInkRipple
 * @module material.core.ripple
 *
 * @description
 * `$mdInkRipple` is a service for adding ripples to any element
 *
 * @usage
 * <hljs lang="js">
 * app.factory('$myElementInkRipple', function($mdInkRipple) ***REMOVED***
 *   return ***REMOVED***
 *     attach: function (scope, element, options) ***REMOVED***
 *       return $mdInkRipple.attach(scope, element, angular.extend(***REMOVED***
 *         center: false,
 *         dimBackground: true
 *       ***REMOVED***, options));
 *     ***REMOVED***
 *   ***REMOVED***;
 * ***REMOVED***);
 *
 * app.controller('myController', function ($scope, $element, $myElementInkRipple) ***REMOVED***
 *   $scope.onClick = function (ev) ***REMOVED***
 *     $myElementInkRipple.attach($scope, angular.element(ev.target), ***REMOVED*** center: true ***REMOVED***);
 *   ***REMOVED***
 * ***REMOVED***);
 * </hljs>
 *
 * ### Disabling ripples globally
 * If you want to disable ink ripples globally, for all components, you can call the
 * `disableInkRipple` method in your app's config.
 *
 * <hljs lang="js">
 * app.config(function ($mdInkRippleProvider) ***REMOVED***
 *   $mdInkRippleProvider.disableInkRipple();
 * ***REMOVED***);
 */

function InkRippleProvider () ***REMOVED***
  var isDisabledGlobally = false;

  return ***REMOVED***
    disableInkRipple: disableInkRipple,
    $get: ["$injector", function($injector) ***REMOVED***
      return ***REMOVED*** attach: attach ***REMOVED***;

      /**
       * @ngdoc method
       * @name $mdInkRipple#attach
       *
       * @description
       * Attaching given scope, element and options to inkRipple controller
       *
       * @param ***REMOVED***object=***REMOVED*** scope Scope within the current context
       * @param ***REMOVED***object=***REMOVED*** element The element the ripple effect should be applied to
       * @param ***REMOVED***object=***REMOVED*** options (Optional) Configuration options to override the defaultRipple configuration
       * * `center` -  Whether the ripple should start from the center of the container element
       * * `dimBackground` - Whether the background should be dimmed with the ripple color
       * * `colorElement` - The element the ripple should take its color from, defined by css property `color`
       * * `fitRipple` - Whether the ripple should fill the element
       */
      function attach (scope, element, options) ***REMOVED***
        if (isDisabledGlobally || element.controller('mdNoInk')) return angular.noop;
        return $injector.instantiate(InkRippleCtrl, ***REMOVED***
          $scope:        scope,
          $element:      element,
          rippleOptions: options
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***]
  ***REMOVED***;

  /**
   * @ngdoc method
   * @name $mdInkRipple#disableInkRipple
   *
   * @description
   * A config-time method that, when called, disables ripples globally.
   */
  function disableInkRipple () ***REMOVED***
    isDisabledGlobally = true;
  ***REMOVED***
***REMOVED***

/**
 * Controller used by the ripple service in order to apply ripples
 * ngInject
 */
function InkRippleCtrl ($scope, $element, rippleOptions, $window, $timeout, $mdUtil, $mdColorUtil) ***REMOVED***
  this.$window    = $window;
  this.$timeout   = $timeout;
  this.$mdUtil    = $mdUtil;
  this.$mdColorUtil    = $mdColorUtil;
  this.$scope     = $scope;
  this.$element   = $element;
  this.options    = rippleOptions;
  this.mousedown  = false;
  this.ripples    = [];
  this.timeout    = null; // Stores a reference to the most-recent ripple timeout
  this.lastRipple = null;

  $mdUtil.valueOnUse(this, 'container', this.createContainer);

  this.$element.addClass('md-ink-ripple');

  // attach method for unit tests
  ($element.controller('mdInkRipple') || ***REMOVED******REMOVED***).createRipple = angular.bind(this, this.createRipple);
  ($element.controller('mdInkRipple') || ***REMOVED******REMOVED***).setColor = angular.bind(this, this.color);

  this.bindEvents();
***REMOVED***
InkRippleCtrl.$inject = ["$scope", "$element", "rippleOptions", "$window", "$timeout", "$mdUtil", "$mdColorUtil"];


/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup or mouseleave event)
 */
function autoCleanup (self, cleanupFn) ***REMOVED***

  if ( self.mousedown || self.lastRipple ) ***REMOVED***
    self.mousedown = false;
    self.$mdUtil.nextTick( angular.bind(self, cleanupFn), false);
  ***REMOVED***

***REMOVED***


/**
 * Returns the color that the ripple should be (either based on CSS or hard-coded)
 * @returns ***REMOVED***string***REMOVED***
 */
InkRippleCtrl.prototype.color = function (value) ***REMOVED***
  var self = this;

  // If assigning a color value, apply it to background and the ripple color
  if (angular.isDefined(value)) ***REMOVED***
    self._color = self._parseColor(value);
  ***REMOVED***

  // If color lookup, use assigned, defined, or inherited
  return self._color || self._parseColor( self.inkRipple() ) || self._parseColor( getElementColor() );

  /**
   * Finds the color element and returns its text color for use as default ripple color
   * @returns ***REMOVED***string***REMOVED***
   */
  function getElementColor () ***REMOVED***
    var items = self.options && self.options.colorElement ? self.options.colorElement : [];
    var elem =  items.length ? items[ 0 ] : self.$element[ 0 ];

    return elem ? self.$window.getComputedStyle(elem).color : 'rgb(0,0,0)';
  ***REMOVED***
***REMOVED***;

/**
 * Updating the ripple colors based on the current inkRipple value
 * or the element's computed style color
 */
InkRippleCtrl.prototype.calculateColor = function () ***REMOVED***
  return this.color();
***REMOVED***;


/**
 * Takes a string color and converts it to RGBA format
 * @param color ***REMOVED***string***REMOVED***
 * @param [multiplier] ***REMOVED***int***REMOVED***
 * @returns ***REMOVED***string***REMOVED***
 */

InkRippleCtrl.prototype._parseColor = function parseColor (color, multiplier) ***REMOVED***
  multiplier = multiplier || 1;
  var colorUtil = this.$mdColorUtil;

  if (!color) return;
  if (color.indexOf('rgba') === 0) return color.replace(/\d?\.?\d*\s*\)\s*$/, (0.1 * multiplier).toString() + ')');
  if (color.indexOf('rgb') === 0) return colorUtil.rgbToRgba(color);
  if (color.indexOf('#') === 0) return colorUtil.hexToRgba(color);

***REMOVED***;

/**
 * Binds events to the root element for
 */
InkRippleCtrl.prototype.bindEvents = function () ***REMOVED***
  this.$element.on('mousedown', angular.bind(this, this.handleMousedown));
  this.$element.on('mouseup touchend', angular.bind(this, this.handleMouseup));
  this.$element.on('mouseleave', angular.bind(this, this.handleMouseup));
  this.$element.on('touchmove', angular.bind(this, this.handleTouchmove));
***REMOVED***;

/**
 * Create a new ripple on every mousedown event from the root element
 * @param event ***REMOVED***MouseEvent***REMOVED***
 */
InkRippleCtrl.prototype.handleMousedown = function (event) ***REMOVED***
  if ( this.mousedown ) return;

  // When jQuery is loaded, we have to get the original event
  if (event.hasOwnProperty('originalEvent')) event = event.originalEvent;
  this.mousedown = true;
  if (this.options.center) ***REMOVED***
    this.createRipple(this.container.prop('clientWidth') / 2, this.container.prop('clientWidth') / 2);
  ***REMOVED*** else ***REMOVED***

    // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
    if (event.srcElement !== this.$element[0]) ***REMOVED***
      var layerRect = this.$element[0].getBoundingClientRect();
      var layerX = event.clientX - layerRect.left;
      var layerY = event.clientY - layerRect.top;

      this.createRipple(layerX, layerY);
    ***REMOVED*** else ***REMOVED***
      this.createRipple(event.offsetX, event.offsetY);
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup, touchend or mouseleave event)
 */
InkRippleCtrl.prototype.handleMouseup = function () ***REMOVED***
  autoCleanup(this, this.clearRipples);
***REMOVED***;

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (by
 * touchmove)
 */
InkRippleCtrl.prototype.handleTouchmove = function () ***REMOVED***
  autoCleanup(this, this.deleteRipples);
***REMOVED***;

/**
 * Cycles through all ripples and attempts to remove them.
 */
InkRippleCtrl.prototype.deleteRipples = function () ***REMOVED***
  for (var i = 0; i < this.ripples.length; i++) ***REMOVED***
    this.ripples[ i ].remove();
  ***REMOVED***
***REMOVED***;

/**
 * Cycles through all ripples and attempts to remove them with fade.
 * Depending on logic within `fadeInComplete`, some removals will be postponed.
 */
InkRippleCtrl.prototype.clearRipples = function () ***REMOVED***
  for (var i = 0; i < this.ripples.length; i++) ***REMOVED***
    this.fadeInComplete(this.ripples[ i ]);
  ***REMOVED***
***REMOVED***;

/**
 * Creates the ripple container element
 * @returns ***REMOVED*******REMOVED***
 */
InkRippleCtrl.prototype.createContainer = function () ***REMOVED***
  var container = angular.element('<div class="md-ripple-container"></div>');
  this.$element.append(container);
  return container;
***REMOVED***;

InkRippleCtrl.prototype.clearTimeout = function () ***REMOVED***
  if (this.timeout) ***REMOVED***
    this.$timeout.cancel(this.timeout);
    this.timeout = null;
  ***REMOVED***
***REMOVED***;

InkRippleCtrl.prototype.isRippleAllowed = function () ***REMOVED***
  var element = this.$element[0];
  do ***REMOVED***
    if (!element.tagName || element.tagName === 'BODY') break;

    if (element && angular.isFunction(element.hasAttribute)) ***REMOVED***
      if (element.hasAttribute('disabled')) return false;
      if (this.inkRipple() === 'false' || this.inkRipple() === '0') return false;
    ***REMOVED***

  ***REMOVED*** while (element = element.parentNode);
  return true;
***REMOVED***;

/**
 * The attribute `md-ink-ripple` may be a static or interpolated
 * color value OR a boolean indicator (used to disable ripples)
 */
InkRippleCtrl.prototype.inkRipple = function () ***REMOVED***
  return this.$element.attr('md-ink-ripple');
***REMOVED***;

/**
 * Creates a new ripple and adds it to the container.  Also tracks ripple in `this.ripples`.
 * @param left
 * @param top
 */
InkRippleCtrl.prototype.createRipple = function (left, top) ***REMOVED***
  if (!this.isRippleAllowed()) return;

  var ctrl        = this;
  var colorUtil   = ctrl.$mdColorUtil;
  var ripple      = angular.element('<div class="md-ripple"></div>');
  var width       = this.$element.prop('clientWidth');
  var height      = this.$element.prop('clientHeight');
  var x           = Math.max(Math.abs(width - left), left) * 2;
  var y           = Math.max(Math.abs(height - top), top) * 2;
  var size        = getSize(this.options.fitRipple, x, y);
  var color       = this.calculateColor();

  ripple.css(***REMOVED***
    left:            left + 'px',
    top:             top + 'px',
    background:      'black',
    width:           size + 'px',
    height:          size + 'px',
    backgroundColor: colorUtil.rgbaToRgb(color),
    borderColor:     colorUtil.rgbaToRgb(color)
  ***REMOVED***);
  this.lastRipple = ripple;

  // we only want one timeout to be running at a time
  this.clearTimeout();
  this.timeout    = this.$timeout(function () ***REMOVED***
    ctrl.clearTimeout();
    if (!ctrl.mousedown) ctrl.fadeInComplete(ripple);
  ***REMOVED***, DURATION * 0.35, false);

  if (this.options.dimBackground) this.container.css(***REMOVED*** backgroundColor: color ***REMOVED***);
  this.container.append(ripple);
  this.ripples.push(ripple);
  ripple.addClass('md-ripple-placed');

  this.$mdUtil.nextTick(function () ***REMOVED***

    ripple.addClass('md-ripple-scaled md-ripple-active');
    ctrl.$timeout(function () ***REMOVED***
      ctrl.clearRipples();
    ***REMOVED***, DURATION, false);

  ***REMOVED***, false);

  function getSize (fit, x, y) ***REMOVED***
    return fit
        ? Math.max(x, y)
        : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  ***REMOVED***
***REMOVED***;



/**
 * After fadeIn finishes, either kicks off the fade-out animation or queues the element for removal on mouseup
 * @param ripple
 */
InkRippleCtrl.prototype.fadeInComplete = function (ripple) ***REMOVED***
  if (this.lastRipple === ripple) ***REMOVED***
    if (!this.timeout && !this.mousedown) ***REMOVED***
      this.removeRipple(ripple);
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    this.removeRipple(ripple);
  ***REMOVED***
***REMOVED***;

/**
 * Kicks off the animation for removing a ripple
 * @param ripple ***REMOVED***Element***REMOVED***
 */
InkRippleCtrl.prototype.removeRipple = function (ripple) ***REMOVED***
  var ctrl  = this;
  var index = this.ripples.indexOf(ripple);
  if (index < 0) return;
  this.ripples.splice(this.ripples.indexOf(ripple), 1);
  ripple.removeClass('md-ripple-active');
  if (this.ripples.length === 0) this.container.css(***REMOVED*** backgroundColor: '' ***REMOVED***);
  // use a 2-second timeout in order to allow for the animation to finish
  // we don't actually care how long the animation takes
  this.$timeout(function () ***REMOVED***
    ctrl.fadeOutComplete(ripple);
  ***REMOVED***, DURATION, false);
***REMOVED***;

/**
 * Removes the provided ripple from the DOM
 * @param ripple
 */
InkRippleCtrl.prototype.fadeOutComplete = function (ripple) ***REMOVED***
  ripple.remove();
  this.lastRipple = null;
***REMOVED***;

/**
 * Used to create an empty directive.  This is used to track flag-directives whose children may have
 * functionality based on them.
 *
 * Example: `md-no-ink` will potentially be used by all child directives.
 */
function attrNoDirective () ***REMOVED***
  return ***REMOVED*** controller: angular.noop ***REMOVED***;
***REMOVED***

(function() ***REMOVED***
  'use strict';

    /**
   * @ngdoc service
   * @name $mdTabInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-tabs.  See $mdInkRipple service for all possible configuration options.
   *
   * @param ***REMOVED***object=***REMOVED*** scope Scope within the current context
   * @param ***REMOVED***object=***REMOVED*** element The element the ripple effect should be applied to
   * @param ***REMOVED***object=***REMOVED*** options (Optional) Configuration options to override the defaultripple configuration
   */

  angular.module('material.core')
    .factory('$mdTabInkRipple', MdTabInkRipple);

  function MdTabInkRipple($mdInkRipple) ***REMOVED***
    return ***REMOVED***
      attach: attach
    ***REMOVED***;

    function attach(scope, element, options) ***REMOVED***
      return $mdInkRipple.attach(scope, element, angular.extend(***REMOVED***
        center: false,
        dimBackground: true,
        outline: false,
        rippleSize: 'full'
      ***REMOVED***, options));
    ***REMOVED***;
  ***REMOVED***
  MdTabInkRipple.$inject = ["$mdInkRipple"];;
***REMOVED***)();

angular.module('material.core.theming.palette', [])
.constant('$mdColorPalette', ***REMOVED***
  'red': ***REMOVED***
    '50': '#ffebee',
    '100': '#ffcdd2',
    '200': '#ef9a9a',
    '300': '#e57373',
    '400': '#ef5350',
    '500': '#f44336',
    '600': '#e53935',
    '700': '#d32f2f',
    '800': '#c62828',
    '900': '#b71c1c',
    'A100': '#ff8a80',
    'A200': '#ff5252',
    'A400': '#ff1744',
    'A700': '#d50000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100',
    'contrastStrongLightColors': '400 500 600 700 A200 A400 A700'
  ***REMOVED***,
  'pink': ***REMOVED***
    '50': '#fce4ec',
    '100': '#f8bbd0',
    '200': '#f48fb1',
    '300': '#f06292',
    '400': '#ec407a',
    '500': '#e91e63',
    '600': '#d81b60',
    '700': '#c2185b',
    '800': '#ad1457',
    '900': '#880e4f',
    'A100': '#ff80ab',
    'A200': '#ff4081',
    'A400': '#f50057',
    'A700': '#c51162',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '500 600 A200 A400 A700'
  ***REMOVED***,
  'purple': ***REMOVED***
    '50': '#f3e5f5',
    '100': '#e1bee7',
    '200': '#ce93d8',
    '300': '#ba68c8',
    '400': '#ab47bc',
    '500': '#9c27b0',
    '600': '#8e24aa',
    '700': '#7b1fa2',
    '800': '#6a1b9a',
    '900': '#4a148c',
    'A100': '#ea80fc',
    'A200': '#e040fb',
    'A400': '#d500f9',
    'A700': '#aa00ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400 A700'
  ***REMOVED***,
  'deep-purple': ***REMOVED***
    '50': '#ede7f6',
    '100': '#d1c4e9',
    '200': '#b39ddb',
    '300': '#9575cd',
    '400': '#7e57c2',
    '500': '#673ab7',
    '600': '#5e35b1',
    '700': '#512da8',
    '800': '#4527a0',
    '900': '#311b92',
    'A100': '#b388ff',
    'A200': '#7c4dff',
    'A400': '#651fff',
    'A700': '#6200ea',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200'
  ***REMOVED***,
  'indigo': ***REMOVED***
    '50': '#e8eaf6',
    '100': '#c5cae9',
    '200': '#9fa8da',
    '300': '#7986cb',
    '400': '#5c6bc0',
    '500': '#3f51b5',
    '600': '#3949ab',
    '700': '#303f9f',
    '800': '#283593',
    '900': '#1a237e',
    'A100': '#8c9eff',
    'A200': '#536dfe',
    'A400': '#3d5afe',
    'A700': '#304ffe',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400'
  ***REMOVED***,
  'blue': ***REMOVED***
    '50': '#e3f2fd',
    '100': '#bbdefb',
    '200': '#90caf9',
    '300': '#64b5f6',
    '400': '#42a5f5',
    '500': '#2196f3',
    '600': '#1e88e5',
    '700': '#1976d2',
    '800': '#1565c0',
    '900': '#0d47a1',
    'A100': '#82b1ff',
    'A200': '#448aff',
    'A400': '#2979ff',
    'A700': '#2962ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100',
    'contrastStrongLightColors': '500 600 700 A200 A400 A700'
  ***REMOVED***,
  'light-blue': ***REMOVED***
    '50': '#e1f5fe',
    '100': '#b3e5fc',
    '200': '#81d4fa',
    '300': '#4fc3f7',
    '400': '#29b6f6',
    '500': '#03a9f4',
    '600': '#039be5',
    '700': '#0288d1',
    '800': '#0277bd',
    '900': '#01579b',
    'A100': '#80d8ff',
    'A200': '#40c4ff',
    'A400': '#00b0ff',
    'A700': '#0091ea',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '600 700 800 900 A700',
    'contrastStrongLightColors': '600 700 800 A700'
  ***REMOVED***,
  'cyan': ***REMOVED***
    '50': '#e0f7fa',
    '100': '#b2ebf2',
    '200': '#80deea',
    '300': '#4dd0e1',
    '400': '#26c6da',
    '500': '#00bcd4',
    '600': '#00acc1',
    '700': '#0097a7',
    '800': '#00838f',
    '900': '#006064',
    'A100': '#84ffff',
    'A200': '#18ffff',
    'A400': '#00e5ff',
    'A700': '#00b8d4',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '700 800 900',
    'contrastStrongLightColors': '700 800 900'
  ***REMOVED***,
  'teal': ***REMOVED***
    '50': '#e0f2f1',
    '100': '#b2dfdb',
    '200': '#80cbc4',
    '300': '#4db6ac',
    '400': '#26a69a',
    '500': '#009688',
    '600': '#00897b',
    '700': '#00796b',
    '800': '#00695c',
    '900': '#004d40',
    'A100': '#a7ffeb',
    'A200': '#64ffda',
    'A400': '#1de9b6',
    'A700': '#00bfa5',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700'
  ***REMOVED***,
  'green': ***REMOVED***
    '50': '#e8f5e9',
    '100': '#c8e6c9',
    '200': '#a5d6a7',
    '300': '#81c784',
    '400': '#66bb6a',
    '500': '#4caf50',
    '600': '#43a047',
    '700': '#388e3c',
    '800': '#2e7d32',
    '900': '#1b5e20',
    'A100': '#b9f6ca',
    'A200': '#69f0ae',
    'A400': '#00e676',
    'A700': '#00c853',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700'
  ***REMOVED***,
  'light-green': ***REMOVED***
    '50': '#f1f8e9',
    '100': '#dcedc8',
    '200': '#c5e1a5',
    '300': '#aed581',
    '400': '#9ccc65',
    '500': '#8bc34a',
    '600': '#7cb342',
    '700': '#689f38',
    '800': '#558b2f',
    '900': '#33691e',
    'A100': '#ccff90',
    'A200': '#b2ff59',
    'A400': '#76ff03',
    'A700': '#64dd17',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '700 800 900',
    'contrastStrongLightColors': '700 800 900'
  ***REMOVED***,
  'lime': ***REMOVED***
    '50': '#f9fbe7',
    '100': '#f0f4c3',
    '200': '#e6ee9c',
    '300': '#dce775',
    '400': '#d4e157',
    '500': '#cddc39',
    '600': '#c0ca33',
    '700': '#afb42b',
    '800': '#9e9d24',
    '900': '#827717',
    'A100': '#f4ff81',
    'A200': '#eeff41',
    'A400': '#c6ff00',
    'A700': '#aeea00',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '900',
    'contrastStrongLightColors': '900'
  ***REMOVED***,
  'yellow': ***REMOVED***
    '50': '#fffde7',
    '100': '#fff9c4',
    '200': '#fff59d',
    '300': '#fff176',
    '400': '#ffee58',
    '500': '#ffeb3b',
    '600': '#fdd835',
    '700': '#fbc02d',
    '800': '#f9a825',
    '900': '#f57f17',
    'A100': '#ffff8d',
    'A200': '#ffff00',
    'A400': '#ffea00',
    'A700': '#ffd600',
    'contrastDefaultColor': 'dark'
  ***REMOVED***,
  'amber': ***REMOVED***
    '50': '#fff8e1',
    '100': '#ffecb3',
    '200': '#ffe082',
    '300': '#ffd54f',
    '400': '#ffca28',
    '500': '#ffc107',
    '600': '#ffb300',
    '700': '#ffa000',
    '800': '#ff8f00',
    '900': '#ff6f00',
    'A100': '#ffe57f',
    'A200': '#ffd740',
    'A400': '#ffc400',
    'A700': '#ffab00',
    'contrastDefaultColor': 'dark'
  ***REMOVED***,
  'orange': ***REMOVED***
    '50': '#fff3e0',
    '100': '#ffe0b2',
    '200': '#ffcc80',
    '300': '#ffb74d',
    '400': '#ffa726',
    '500': '#ff9800',
    '600': '#fb8c00',
    '700': '#f57c00',
    '800': '#ef6c00',
    '900': '#e65100',
    'A100': '#ffd180',
    'A200': '#ffab40',
    'A400': '#ff9100',
    'A700': '#ff6d00',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '800 900',
    'contrastStrongLightColors': '800 900'
  ***REMOVED***,
  'deep-orange': ***REMOVED***
    '50': '#fbe9e7',
    '100': '#ffccbc',
    '200': '#ffab91',
    '300': '#ff8a65',
    '400': '#ff7043',
    '500': '#ff5722',
    '600': '#f4511e',
    '700': '#e64a19',
    '800': '#d84315',
    '900': '#bf360c',
    'A100': '#ff9e80',
    'A200': '#ff6e40',
    'A400': '#ff3d00',
    'A700': '#dd2c00',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200',
    'contrastStrongLightColors': '500 600 700 800 900 A400 A700'
  ***REMOVED***,
  'brown': ***REMOVED***
    '50': '#efebe9',
    '100': '#d7ccc8',
    '200': '#bcaaa4',
    '300': '#a1887f',
    '400': '#8d6e63',
    '500': '#795548',
    '600': '#6d4c41',
    '700': '#5d4037',
    '800': '#4e342e',
    '900': '#3e2723',
    'A100': '#d7ccc8',
    'A200': '#bcaaa4',
    'A400': '#8d6e63',
    'A700': '#5d4037',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200',
    'contrastStrongLightColors': '300 400'
  ***REMOVED***,
  'grey': ***REMOVED***
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    'A100': '#ffffff',
    'A200': '#000000',
    'A400': '#303030',
    'A700': '#616161',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '600 700 800 900 A200 A400 A700'
  ***REMOVED***,
  'blue-grey': ***REMOVED***
    '50': '#eceff1',
    '100': '#cfd8dc',
    '200': '#b0bec5',
    '300': '#90a4ae',
    '400': '#78909c',
    '500': '#607d8b',
    '600': '#546e7a',
    '700': '#455a64',
    '800': '#37474f',
    '900': '#263238',
    'A100': '#cfd8dc',
    'A200': '#b0bec5',
    'A400': '#78909c',
    'A700': '#455a64',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100 A200',
    'contrastStrongLightColors': '400 500 700'
  ***REMOVED***
***REMOVED***);

/**
 * @ngdoc module
 * @name material.core.theming
 * @description
 * Theming
 */
angular.module('material.core.theming', ['material.core.theming.palette'])
  .directive('mdTheme', ThemingDirective)
  .directive('mdThemable', ThemableDirective)
  .provider('$mdTheming', ThemingProvider)
  .run(generateAllThemes);

/**
 * @ngdoc service
 * @name $mdThemingProvider
 * @module material.core.theming
 *
 * @description Provider to configure the `$mdTheming` service.
 */

/**
 * @ngdoc method
 * @name $mdThemingProvider#setNonce
 * @param ***REMOVED***string***REMOVED*** nonceValue The nonce to be added as an attribute to the theme style tags.
 * Setting a value allows the use CSP policy without using the unsafe-inline directive.
 */

/**
 * @ngdoc method
 * @name $mdThemingProvider#setDefaultTheme
 * @param ***REMOVED***string***REMOVED*** themeName Default theme name to be applied to elements. Default value is `default`.
 */

/**
 * @ngdoc method
 * @name $mdThemingProvider#alwaysWatchTheme
 * @param ***REMOVED***boolean***REMOVED*** watch Whether or not to always watch themes for changes and re-apply
 * classes when they change. Default is `false`. Enabling can reduce performance.
 */

/* Some Example Valid Theming Expressions
 * =======================================
 *
 * Intention group expansion: (valid for primary, accent, warn, background)
 *
 * ***REMOVED******REMOVED***primary-100***REMOVED******REMOVED*** - grab shade 100 from the primary palette
 * ***REMOVED******REMOVED***primary-100-0.7***REMOVED******REMOVED*** - grab shade 100, apply opacity of 0.7
 * ***REMOVED******REMOVED***primary-100-contrast***REMOVED******REMOVED*** - grab shade 100's contrast color
 * ***REMOVED******REMOVED***primary-hue-1***REMOVED******REMOVED*** - grab the shade assigned to hue-1 from the primary palette
 * ***REMOVED******REMOVED***primary-hue-1-0.7***REMOVED******REMOVED*** - apply 0.7 opacity to primary-hue-1
 * ***REMOVED******REMOVED***primary-color***REMOVED******REMOVED*** - Generates .md-hue-1, .md-hue-2, .md-hue-3 with configured shades set for each hue
 * ***REMOVED******REMOVED***primary-color-0.7***REMOVED******REMOVED*** - Apply 0.7 opacity to each of the above rules
 * ***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED*** - Generates .md-hue-1, .md-hue-2, .md-hue-3 with configured contrast (ie. text) color shades set for each hue
 * ***REMOVED******REMOVED***primary-contrast-0.7***REMOVED******REMOVED*** - Apply 0.7 opacity to each of the above rules
 *
 * Foreground expansion: Applies rgba to black/white foreground text
 *
 * ***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED*** - used for primary text
 * ***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED*** - used for secondary text/divider
 * ***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED*** - used for disabled text
 * ***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED*** - used for dividers
 *
 */

// In memory generated CSS rules; registered by theme.name
var GENERATED = ***REMOVED*** ***REMOVED***;

// In memory storage of defined themes and color palettes (both loaded by CSS, and user specified)
var PALETTES;

// Text Colors on light and dark backgrounds
// @see https://www.google.com/design/spec/style/color.html#color-text-background-colors
var DARK_FOREGROUND = ***REMOVED***
  name: 'dark',
  '1': 'rgba(0,0,0,0.87)',
  '2': 'rgba(0,0,0,0.54)',
  '3': 'rgba(0,0,0,0.38)',
  '4': 'rgba(0,0,0,0.12)'
***REMOVED***;
var LIGHT_FOREGROUND = ***REMOVED***
  name: 'light',
  '1': 'rgba(255,255,255,1.0)',
  '2': 'rgba(255,255,255,0.7)',
  '3': 'rgba(255,255,255,0.5)',
  '4': 'rgba(255,255,255,0.12)'
***REMOVED***;

var DARK_SHADOW = '1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)';
var LIGHT_SHADOW = '';

var DARK_CONTRAST_COLOR = colorToRgbaArray('rgba(0,0,0,0.87)');
var LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgba(255,255,255,0.87)');
var STRONG_LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgb(255,255,255)');

var THEME_COLOR_TYPES = ['primary', 'accent', 'warn', 'background'];
var DEFAULT_COLOR_TYPE = 'primary';

// A color in a theme will use these hues by default, if not specified by user.
var LIGHT_DEFAULT_HUES = ***REMOVED***
  'accent': ***REMOVED***
    'default': 'A200',
    'hue-1': 'A100',
    'hue-2': 'A400',
    'hue-3': 'A700'
  ***REMOVED***,
  'background': ***REMOVED***
    'default': '50',
    'hue-1': 'A100',
    'hue-2': '100',
    'hue-3': '300'
  ***REMOVED***
***REMOVED***;

var DARK_DEFAULT_HUES = ***REMOVED***
  'background': ***REMOVED***
    'default': 'A400',
    'hue-1': '800',
    'hue-2': '900',
    'hue-3': 'A200'
  ***REMOVED***
***REMOVED***;
THEME_COLOR_TYPES.forEach(function(colorType) ***REMOVED***
  // Color types with unspecified default hues will use these default hue values
  var defaultDefaultHues = ***REMOVED***
    'default': '500',
    'hue-1': '300',
    'hue-2': '800',
    'hue-3': 'A100'
  ***REMOVED***;
  if (!LIGHT_DEFAULT_HUES[colorType]) LIGHT_DEFAULT_HUES[colorType] = defaultDefaultHues;
  if (!DARK_DEFAULT_HUES[colorType]) DARK_DEFAULT_HUES[colorType] = defaultDefaultHues;
***REMOVED***);

var VALID_HUE_VALUES = [
  '50', '100', '200', '300', '400', '500', '600',
  '700', '800', '900', 'A100', 'A200', 'A400', 'A700'
];

// Whether or not themes are to be generated on-demand (vs. eagerly).
var generateOnDemand = false;

// Nonce to be added as an attribute to the generated themes style tags.
var nonce = null;
var disableTheming = false;

function ThemingProvider($mdColorPalette) ***REMOVED***
  PALETTES = ***REMOVED*** ***REMOVED***;
  var THEMES = ***REMOVED*** ***REMOVED***;

  var themingProvider;
  var defaultTheme = 'default';
  var alwaysWatchTheme = false;

  // Load JS Defined Palettes
  angular.extend(PALETTES, $mdColorPalette);

  // Default theme defined in core.js

  ThemingService.$inject = ["$rootScope", "$log"];
  return themingProvider = ***REMOVED***
    definePalette: definePalette,
    extendPalette: extendPalette,
    theme: registerTheme,

    /**
     * Easy way to disable theming without having to use
     * `.constant("$MD_THEME_CSS","");` This disables
     * all dynamic theme style sheet generations and injections...
     */
    disableTheming: function() ***REMOVED***
      disableTheming = true;
    ***REMOVED***,

    setNonce: function(nonceValue) ***REMOVED***
      nonce = nonceValue;
    ***REMOVED***,
    setDefaultTheme: function(theme) ***REMOVED***
      defaultTheme = theme;
    ***REMOVED***,
    alwaysWatchTheme: function(alwaysWatch) ***REMOVED***
      alwaysWatchTheme = alwaysWatch;
    ***REMOVED***,
    generateThemesOnDemand: function(onDemand) ***REMOVED***
      generateOnDemand = onDemand;
    ***REMOVED***,
    $get: ThemingService,
    _LIGHT_DEFAULT_HUES: LIGHT_DEFAULT_HUES,
    _DARK_DEFAULT_HUES: DARK_DEFAULT_HUES,
    _PALETTES: PALETTES,
    _THEMES: THEMES,
    _parseRules: parseRules,
    _rgba: rgba
  ***REMOVED***;

  // Example: $mdThemingProvider.definePalette('neonRed', ***REMOVED*** 50: '#f5fafa', ... ***REMOVED***);
  function definePalette(name, map) ***REMOVED***
    map = map || ***REMOVED******REMOVED***;
    PALETTES[name] = checkPaletteValid(name, map);
    return themingProvider;
  ***REMOVED***

  // Returns an new object which is a copy of a given palette `name` with variables from
  // `map` overwritten
  // Example: var neonRedMap = $mdThemingProvider.extendPalette('red', ***REMOVED*** 50: '#f5fafafa' ***REMOVED***);
  function extendPalette(name, map) ***REMOVED***
    return checkPaletteValid(name,  angular.extend(***REMOVED******REMOVED***, PALETTES[name] || ***REMOVED******REMOVED***, map) );
  ***REMOVED***

  // Make sure that palette has all required hues
  function checkPaletteValid(name, map) ***REMOVED***
    var missingColors = VALID_HUE_VALUES.filter(function(field) ***REMOVED***
      return !map[field];
    ***REMOVED***);
    if (missingColors.length) ***REMOVED***
      throw new Error("Missing colors %1 in palette %2!"
                      .replace('%1', missingColors.join(', '))
                      .replace('%2', name));
    ***REMOVED***

    return map;
  ***REMOVED***

  // Register a theme (which is a collection of color palettes to use with various states
  // ie. warn, accent, primary )
  // Optionally inherit from an existing theme
  // $mdThemingProvider.theme('custom-theme').primaryPalette('red');
  function registerTheme(name, inheritFrom) ***REMOVED***
    if (THEMES[name]) return THEMES[name];

    inheritFrom = inheritFrom || 'default';

    var parentTheme = typeof inheritFrom === 'string' ? THEMES[inheritFrom] : inheritFrom;
    var theme = new Theme(name);

    if (parentTheme) ***REMOVED***
      angular.forEach(parentTheme.colors, function(color, colorType) ***REMOVED***
        theme.colors[colorType] = ***REMOVED***
          name: color.name,
          // Make sure a COPY of the hues is given to the child color,
          // not the same reference.
          hues: angular.extend(***REMOVED******REMOVED***, color.hues)
        ***REMOVED***;
      ***REMOVED***);
    ***REMOVED***
    THEMES[name] = theme;

    return theme;
  ***REMOVED***

  function Theme(name) ***REMOVED***
    var self = this;
    self.name = name;
    self.colors = ***REMOVED******REMOVED***;

    self.dark = setDark;
    setDark(false);

    function setDark(isDark) ***REMOVED***
      isDark = arguments.length === 0 ? true : !!isDark;

      // If no change, abort
      if (isDark === self.isDark) return;

      self.isDark = isDark;

      self.foregroundPalette = self.isDark ? LIGHT_FOREGROUND : DARK_FOREGROUND;
      self.foregroundShadow = self.isDark ? DARK_SHADOW : LIGHT_SHADOW;

      // Light and dark themes have different default hues.
      // Go through each existing color type for this theme, and for every
      // hue value that is still the default hue value from the previous light/dark setting,
      // set it to the default hue value from the new light/dark setting.
      var newDefaultHues = self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES;
      var oldDefaultHues = self.isDark ? LIGHT_DEFAULT_HUES : DARK_DEFAULT_HUES;
      angular.forEach(newDefaultHues, function(newDefaults, colorType) ***REMOVED***
        var color = self.colors[colorType];
        var oldDefaults = oldDefaultHues[colorType];
        if (color) ***REMOVED***
          for (var hueName in color.hues) ***REMOVED***
            if (color.hues[hueName] === oldDefaults[hueName]) ***REMOVED***
              color.hues[hueName] = newDefaults[hueName];
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);

      return self;
    ***REMOVED***

    THEME_COLOR_TYPES.forEach(function(colorType) ***REMOVED***
      var defaultHues = (self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES)[colorType];
      self[colorType + 'Palette'] = function setPaletteType(paletteName, hues) ***REMOVED***
        var color = self.colors[colorType] = ***REMOVED***
          name: paletteName,
          hues: angular.extend(***REMOVED******REMOVED***, defaultHues, hues)
        ***REMOVED***;

        Object.keys(color.hues).forEach(function(name) ***REMOVED***
          if (!defaultHues[name]) ***REMOVED***
            throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4"
              .replace('%1', name)
              .replace('%2', self.name)
              .replace('%3', paletteName)
              .replace('%4', Object.keys(defaultHues).join(', '))
            );
          ***REMOVED***
        ***REMOVED***);
        Object.keys(color.hues).map(function(key) ***REMOVED***
          return color.hues[key];
        ***REMOVED***).forEach(function(hueValue) ***REMOVED***
          if (VALID_HUE_VALUES.indexOf(hueValue) == -1) ***REMOVED***
            throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5"
              .replace('%1', hueValue)
              .replace('%2', self.name)
              .replace('%3', colorType)
              .replace('%4', paletteName)
              .replace('%5', VALID_HUE_VALUES.join(', '))
            );
          ***REMOVED***
        ***REMOVED***);
        return self;
      ***REMOVED***;

      self[colorType + 'Color'] = function() ***REMOVED***
        var args = Array.prototype.slice.call(arguments);
        console.warn('$mdThemingProviderTheme.' + colorType + 'Color() has been deprecated. ' +
                     'Use $mdThemingProviderTheme.' + colorType + 'Palette() instead.');
        return self[colorType + 'Palette'].apply(self, args);
      ***REMOVED***;
    ***REMOVED***);
  ***REMOVED***

  /**
   * @ngdoc service
   * @name $mdTheming
   *
   * @description
   *
   * Service that makes an element apply theming related classes to itself.
   *
   * ```js
   * app.directive('myFancyDirective', function($mdTheming) ***REMOVED***
   *   return ***REMOVED***
   *     restrict: 'e',
   *     link: function(scope, el, attrs) ***REMOVED***
   *       $mdTheming(el);
   *     ***REMOVED***
   *   ***REMOVED***;
   * ***REMOVED***);
   * ```
   * @param ***REMOVED***el=***REMOVED*** element to apply theming to
   */
  /* ngInject */
  function ThemingService($rootScope, $log) ***REMOVED***
        // Allow us to be invoked via a linking function signature.
    var applyTheme = function (scope, el) ***REMOVED***
          if (el === undefined) ***REMOVED*** el = scope; scope = undefined; ***REMOVED***
          if (scope === undefined) ***REMOVED*** scope = $rootScope; ***REMOVED***
          applyTheme.inherit(el, el);
        ***REMOVED***;

    applyTheme.THEMES = angular.extend(***REMOVED******REMOVED***, THEMES);
    applyTheme.PALETTES = angular.extend(***REMOVED******REMOVED***, PALETTES);
    applyTheme.inherit = inheritTheme;
    applyTheme.registered = registered;
    applyTheme.defaultTheme = function() ***REMOVED*** return defaultTheme; ***REMOVED***;
    applyTheme.generateTheme = function(name) ***REMOVED*** generateTheme(THEMES[name], name, nonce); ***REMOVED***;

    return applyTheme;

    /**
     * Determine is specified theme name is a valid, registered theme
     */
    function registered(themeName) ***REMOVED***
      if (themeName === undefined || themeName === '') return true;
      return applyTheme.THEMES[themeName] !== undefined;
    ***REMOVED***

    /**
     * Get theme name for the element, then update with Theme CSS class
     */
    function inheritTheme (el, parent) ***REMOVED***
      var ctrl = parent.controller('mdTheme');
      var attrThemeValue = el.attr('md-theme-watch');
      var watchTheme = (alwaysWatchTheme || angular.isDefined(attrThemeValue)) && attrThemeValue != 'false';

      updateThemeClass(lookupThemeName());

      el.on('$destroy', watchTheme ? $rootScope.$watch(lookupThemeName, updateThemeClass) : angular.noop );

      /**
       * Find the theme name from the parent controller or element data
       */
      function lookupThemeName() ***REMOVED***
        // As a few components (dialog) add their controllers later, we should also watch for a controller init.
        ctrl = parent.controller('mdTheme') || el.data('$mdThemeController');
        return ctrl && ctrl.$mdTheme || (defaultTheme == 'default' ? '' : defaultTheme);
      ***REMOVED***

      /**
       * Remove old theme class and apply a new one
       * NOTE: if not a valid theme name, then the current name is not changed
       */
      function updateThemeClass(theme) ***REMOVED***
        if (!theme) return;
        if (!registered(theme)) ***REMOVED***
          $log.warn('Attempted to use unregistered theme \'' + theme + '\'. ' +
                    'Register it with $mdThemingProvider.theme().');
        ***REMOVED***

        var oldTheme = el.data('$mdThemeName');
        if (oldTheme) el.removeClass('md-' + oldTheme +'-theme');
        el.addClass('md-' + theme + '-theme');
        el.data('$mdThemeName', theme);
        if (ctrl) ***REMOVED***
          el.data('$mdThemeController', ctrl);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

  ***REMOVED***
***REMOVED***
ThemingProvider.$inject = ["$mdColorPalette"];

function ThemingDirective($mdTheming, $interpolate, $log) ***REMOVED***
  return ***REMOVED***
    priority: 100,
    link: ***REMOVED***
      pre: function(scope, el, attrs) ***REMOVED***
        var registeredCallbacks = [];
        var ctrl = ***REMOVED***
          registerChanges: function (cb, context) ***REMOVED***
            if (context) ***REMOVED***
              cb = angular.bind(context, cb);
            ***REMOVED***

            registeredCallbacks.push(cb);

            return function () ***REMOVED***
              var index = registeredCallbacks.indexOf(cb);

              if (index > -1) ***REMOVED***
                registeredCallbacks.splice(index, 1);
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***,
          $setTheme: function (theme) ***REMOVED***
            if (!$mdTheming.registered(theme)) ***REMOVED***
              $log.warn('attempted to use unregistered theme \'' + theme + '\'');
            ***REMOVED***
            ctrl.$mdTheme = theme;

            registeredCallbacks.forEach(function (cb) ***REMOVED***
              cb();
            ***REMOVED***)
          ***REMOVED***
        ***REMOVED***;
        el.data('$mdThemeController', ctrl);
        ctrl.$setTheme($interpolate(attrs.mdTheme)(scope));
        attrs.$observe('mdTheme', ctrl.$setTheme);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
ThemingDirective.$inject = ["$mdTheming", "$interpolate", "$log"];

function ThemableDirective($mdTheming) ***REMOVED***
  return $mdTheming;
***REMOVED***
ThemableDirective.$inject = ["$mdTheming"];

function parseRules(theme, colorType, rules) ***REMOVED***
  checkValidPalette(theme, colorType);

  rules = rules.replace(/THEME_NAME/g, theme.name);
  var generatedRules = [];
  var color = theme.colors[colorType];

  var themeNameRegex = new RegExp('.md-' + theme.name + '-theme', 'g');
  // Matches '***REMOVED******REMOVED*** primary-color ***REMOVED******REMOVED***', etc
  var hueRegex = new RegExp('(\'|")?***REMOVED******REMOVED***\\s*(' + colorType + ')-(color|contrast)-?(\\d\\.?\\d*)?\\s****REMOVED******REMOVED***(\"|\')?','g');
  var simpleVariableRegex = /'?"?\***REMOVED***\***REMOVED***\s*([a-zA-Z]+)-(A?\d+|hue\-[0-3]|shadow|default)-?(\d\.?\d*)?(contrast)?\s*\***REMOVED***\***REMOVED***'?"?/g;
  var palette = PALETTES[color.name];

  // find and replace simple variables where we use a specific hue, not an entire palette
  // eg. "***REMOVED******REMOVED***primary-100***REMOVED******REMOVED***"
  //\(' + THEME_COLOR_TYPES.join('\|') + '\)'
  rules = rules.replace(simpleVariableRegex, function(match, colorType, hue, opacity, contrast) ***REMOVED***
    if (colorType === 'foreground') ***REMOVED***
      if (hue == 'shadow') ***REMOVED***
        return theme.foregroundShadow;
      ***REMOVED*** else ***REMOVED***
        return theme.foregroundPalette[hue] || theme.foregroundPalette['1'];
      ***REMOVED***
    ***REMOVED***

    // `default` is also accepted as a hue-value, because the background palettes are
    // using it as a name for the default hue.
    if (hue.indexOf('hue') === 0 || hue === 'default') ***REMOVED***
      hue = theme.colors[colorType].hues[hue];
    ***REMOVED***

    return rgba( (PALETTES[ theme.colors[colorType].name ][hue] || '')[contrast ? 'contrast' : 'value'], opacity );
  ***REMOVED***);

  // For each type, generate rules for each hue (ie. default, md-hue-1, md-hue-2, md-hue-3)
  angular.forEach(color.hues, function(hueValue, hueName) ***REMOVED***
    var newRule = rules
      .replace(hueRegex, function(match, _, colorType, hueType, opacity) ***REMOVED***
        return rgba(palette[hueValue][hueType === 'color' ? 'value' : 'contrast'], opacity);
      ***REMOVED***);
    if (hueName !== 'default') ***REMOVED***
      newRule = newRule.replace(themeNameRegex, '.md-' + theme.name + '-theme.md-' + hueName);
    ***REMOVED***

    // Don't apply a selector rule to the default theme, making it easier to override
    // styles of the base-component
    if (theme.name == 'default') ***REMOVED***
      var themeRuleRegex = /((?:(?:(?: |>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)+) )?)((?:(?:\w|\.|-)+)?)\.md-default-theme((?: |>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)/g;
      newRule = newRule.replace(themeRuleRegex, function(match, prefix, target, suffix) ***REMOVED***
        return match + ', ' + prefix + target + suffix;
      ***REMOVED***);
    ***REMOVED***
    generatedRules.push(newRule);
  ***REMOVED***);

  return generatedRules;
***REMOVED***

var rulesByType = ***REMOVED******REMOVED***;

// Generate our themes at run time given the state of THEMES and PALETTES
function generateAllThemes($injector, $mdTheming) ***REMOVED***
  var head = document.head;
  var firstChild = head ? head.firstElementChild : null;
  var themeCss = !disableTheming && $injector.has('$MD_THEME_CSS') ? $injector.get('$MD_THEME_CSS') : '';

  if ( !firstChild ) return;
  if (themeCss.length === 0) return; // no rules, so no point in running this expensive task

  // Expose contrast colors for palettes to ensure that text is always readable
  angular.forEach(PALETTES, sanitizePalette);

  // MD_THEME_CSS is a string generated by the build process that includes all the themable
  // components as templates

  // Break the CSS into individual rules
  var rules = themeCss
                  .split(/\***REMOVED***(?!(\***REMOVED***|'|"|;))/)
                  .filter(function(rule) ***REMOVED*** return rule && rule.length; ***REMOVED***)
                  .map(function(rule) ***REMOVED*** return rule.trim() + '***REMOVED***'; ***REMOVED***);


  var ruleMatchRegex = new RegExp('md-(' + THEME_COLOR_TYPES.join('|') + ')', 'g');

  THEME_COLOR_TYPES.forEach(function(type) ***REMOVED***
    rulesByType[type] = '';
  ***REMOVED***);


  // Sort the rules based on type, allowing us to do color substitution on a per-type basis
  rules.forEach(function(rule) ***REMOVED***
    var match = rule.match(ruleMatchRegex);
    // First: test that if the rule has '.md-accent', it goes into the accent set of rules
    for (var i = 0, type; type = THEME_COLOR_TYPES[i]; i++) ***REMOVED***
      if (rule.indexOf('.md-' + type) > -1) ***REMOVED***
        return rulesByType[type] += rule;
      ***REMOVED***
    ***REMOVED***

    // If no eg 'md-accent' class is found, try to just find 'accent' in the rule and guess from
    // there
    for (i = 0; type = THEME_COLOR_TYPES[i]; i++) ***REMOVED***
      if (rule.indexOf(type) > -1) ***REMOVED***
        return rulesByType[type] += rule;
      ***REMOVED***
    ***REMOVED***

    // Default to the primary array
    return rulesByType[DEFAULT_COLOR_TYPE] += rule;
  ***REMOVED***);

  // If themes are being generated on-demand, quit here. The user will later manually
  // call generateTheme to do this on a theme-by-theme basis.
  if (generateOnDemand) return;

  angular.forEach($mdTheming.THEMES, function(theme) ***REMOVED***
    if (!GENERATED[theme.name] && !($mdTheming.defaultTheme() !== 'default' && theme.name === 'default')) ***REMOVED***
      generateTheme(theme, theme.name, nonce);
    ***REMOVED***
  ***REMOVED***);


  // *************************
  // Internal functions
  // *************************

  // The user specifies a 'default' contrast color as either light or dark,
  // then explicitly lists which hues are the opposite contrast (eg. A100 has dark, A200 has light)
  function sanitizePalette(palette, name) ***REMOVED***
    var defaultContrast = palette.contrastDefaultColor;
    var lightColors = palette.contrastLightColors || [];
    var strongLightColors = palette.contrastStrongLightColors || [];
    var darkColors = palette.contrastDarkColors || [];

    // These colors are provided as space-separated lists
    if (typeof lightColors === 'string') lightColors = lightColors.split(' ');
    if (typeof strongLightColors === 'string') strongLightColors = strongLightColors.split(' ');
    if (typeof darkColors === 'string') darkColors = darkColors.split(' ');

    // Cleanup after ourselves
    delete palette.contrastDefaultColor;
    delete palette.contrastLightColors;
    delete palette.contrastStrongLightColors;
    delete palette.contrastDarkColors;

    // Change ***REMOVED*** 'A100': '#fffeee' ***REMOVED*** to ***REMOVED*** 'A100': ***REMOVED*** value: '#fffeee', contrast:DARK_CONTRAST_COLOR ***REMOVED***
    angular.forEach(palette, function(hueValue, hueName) ***REMOVED***
      if (angular.isObject(hueValue)) return; // Already converted
      // Map everything to rgb colors
      var rgbValue = colorToRgbaArray(hueValue);
      if (!rgbValue) ***REMOVED***
        throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected."
                        .replace('%1', hueValue)
                        .replace('%2', palette.name)
                        .replace('%3', hueName));
      ***REMOVED***

      palette[hueName] = ***REMOVED***
        value: rgbValue,
        contrast: getContrastColor()
      ***REMOVED***;
      function getContrastColor() ***REMOVED***
        if (defaultContrast === 'light') ***REMOVED***
          if (darkColors.indexOf(hueName) > -1) ***REMOVED***
            return DARK_CONTRAST_COLOR;
          ***REMOVED*** else ***REMOVED***
            return strongLightColors.indexOf(hueName) > -1 ? STRONG_LIGHT_CONTRAST_COLOR
              : LIGHT_CONTRAST_COLOR;
          ***REMOVED***
        ***REMOVED*** else ***REMOVED***
          if (lightColors.indexOf(hueName) > -1) ***REMOVED***
            return strongLightColors.indexOf(hueName) > -1 ? STRONG_LIGHT_CONTRAST_COLOR
              : LIGHT_CONTRAST_COLOR;
          ***REMOVED*** else ***REMOVED***
            return DARK_CONTRAST_COLOR;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
generateAllThemes.$inject = ["$injector", "$mdTheming"];

function generateTheme(theme, name, nonce) ***REMOVED***
  var head = document.head;
  var firstChild = head ? head.firstElementChild : null;

  if (!GENERATED[name]) ***REMOVED***
    // For each theme, use the color palettes specified for
    // `primary`, `warn` and `accent` to generate CSS rules.
    THEME_COLOR_TYPES.forEach(function(colorType) ***REMOVED***
      var styleStrings = parseRules(theme, colorType, rulesByType[colorType]);
      while (styleStrings.length) ***REMOVED***
        var styleContent = styleStrings.shift();
        if (styleContent) ***REMOVED***
          var style = document.createElement('style');
          style.setAttribute('md-theme-style', '');
          if (nonce) ***REMOVED***
            style.setAttribute('nonce', nonce);
          ***REMOVED***
          style.appendChild(document.createTextNode(styleContent));
          head.insertBefore(style, firstChild);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);

    GENERATED[theme.name] = true;
  ***REMOVED***

***REMOVED***


function checkValidPalette(theme, colorType) ***REMOVED***
  // If theme attempts to use a palette that doesnt exist, throw error
  if (!PALETTES[ (theme.colors[colorType] || ***REMOVED******REMOVED***).name ]) ***REMOVED***
    throw new Error(
      "You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3"
                    .replace('%1', theme.name)
                    .replace('%2', colorType)
                    .replace('%3', Object.keys(PALETTES).join(', '))
    );
  ***REMOVED***
***REMOVED***

function colorToRgbaArray(clr) ***REMOVED***
  if (angular.isArray(clr) && clr.length == 3) return clr;
  if (/^rgb/.test(clr)) ***REMOVED***
    return clr.replace(/(^\s*rgba?\(|\)\s*$)/g, '').split(',').map(function(value, i) ***REMOVED***
      return i == 3 ? parseFloat(value, 10) : parseInt(value, 10);
    ***REMOVED***);
  ***REMOVED***
  if (clr.charAt(0) == '#') clr = clr.substring(1);
  if (!/^([a-fA-F0-9]***REMOVED***3***REMOVED***)***REMOVED***1,2***REMOVED***$/g.test(clr)) return;

  var dig = clr.length / 3;
  var red = clr.substr(0, dig);
  var grn = clr.substr(dig, dig);
  var blu = clr.substr(dig * 2);
  if (dig === 1) ***REMOVED***
    red += red;
    grn += grn;
    blu += blu;
  ***REMOVED***
  return [parseInt(red, 16), parseInt(grn, 16), parseInt(blu, 16)];
***REMOVED***

function rgba(rgbArray, opacity) ***REMOVED***
  if ( !rgbArray ) return "rgb('0,0,0')";

  if (rgbArray.length == 4) ***REMOVED***
    rgbArray = angular.copy(rgbArray);
    opacity ? rgbArray.pop() : opacity = rgbArray.pop();
  ***REMOVED***
  return opacity && (typeof opacity == 'number' || (typeof opacity == 'string' && opacity.length)) ?
    'rgba(' + rgbArray.join(',') + ',' + opacity + ')' :
    'rgb(' + rgbArray.join(',') + ')';
***REMOVED***

// Polyfill angular < 1.4 (provide $animateCss)
angular
  .module('material.core')
  .factory('$$mdAnimate', ["$q", "$timeout", "$mdConstant", "$animateCss", function($q, $timeout, $mdConstant, $animateCss)***REMOVED***

     // Since $$mdAnimate is injected into $mdUtil... use a wrapper function
     // to subsequently inject $mdUtil as an argument to the AnimateDomUtils

     return function($mdUtil) ***REMOVED***
       return AnimateDomUtils( $mdUtil, $q, $timeout, $mdConstant, $animateCss);
     ***REMOVED***;
   ***REMOVED***]);

/**
 * Factory function that requires special injections
 */
function AnimateDomUtils($mdUtil, $q, $timeout, $mdConstant, $animateCss) ***REMOVED***
  var self;
  return self = ***REMOVED***
    /**
     *
     */
    translate3d : function( target, from, to, options ) ***REMOVED***
      return $animateCss(target,***REMOVED***
        from:from,
        to:to,
        addClass:options.transitionInClass,
        removeClass:options.transitionOutClass
      ***REMOVED***)
      .start()
      .then(function()***REMOVED***
          // Resolve with reverser function...
          return reverseTranslate;
      ***REMOVED***);

      /**
       * Specific reversal of the request translate animation above...
       */
      function reverseTranslate (newFrom) ***REMOVED***
        return $animateCss(target, ***REMOVED***
           to: newFrom || from,
           addClass: options.transitionOutClass,
           removeClass: options.transitionInClass
        ***REMOVED***).start();

      ***REMOVED***
    ***REMOVED***,

    /**
     * Listen for transitionEnd event (with optional timeout)
     * Announce completion or failure via promise handlers
     */
    waitTransitionEnd: function (element, opts) ***REMOVED***
      var TIMEOUT = 3000; // fallback is 3 secs

      return $q(function(resolve, reject)***REMOVED***
        opts = opts || ***REMOVED*** ***REMOVED***;

        // If there is no transition is found, resolve immediately
        //
        // NOTE: using $mdUtil.nextTick() causes delays/issues
        if (noTransitionFound(opts.cachedTransitionStyles)) ***REMOVED***
          TIMEOUT = 0;
        ***REMOVED***

        var timer = $timeout(finished, opts.timeout || TIMEOUT);
        element.on($mdConstant.CSS.TRANSITIONEND, finished);

        /**
         * Upon timeout or transitionEnd, reject or resolve (respectively) this promise.
         * NOTE: Make sure this transitionEnd didn't bubble up from a child
         */
        function finished(ev) ***REMOVED***
          if ( ev && ev.target !== element[0]) return;

          if ( ev  ) $timeout.cancel(timer);
          element.off($mdConstant.CSS.TRANSITIONEND, finished);

          // Never reject since ngAnimate may cause timeouts due missed transitionEnd events
          resolve();

        ***REMOVED***

        /**
         * Checks whether or not there is a transition.
         *
         * @param styles The cached styles to use for the calculation. If null, getComputedStyle()
         * will be used.
         *
         * @returns ***REMOVED***boolean***REMOVED*** True if there is no transition/duration; false otherwise.
         */
        function noTransitionFound(styles) ***REMOVED***
          styles = styles || window.getComputedStyle(element[0]);

          return styles.transitionDuration == '0s' || (!styles.transition && !styles.transitionProperty);
        ***REMOVED***

      ***REMOVED***);
    ***REMOVED***,

    calculateTransformValues: function (element, originator) ***REMOVED***
      var origin = originator.element;
      var bounds = originator.bounds;

      if (origin || bounds) ***REMOVED***
        var originBnds = origin ? self.clientRect(origin) || currentBounds() : self.copyRect(bounds);
        var dialogRect = self.copyRect(element[0].getBoundingClientRect());
        var dialogCenterPt = self.centerPointFor(dialogRect);
        var originCenterPt = self.centerPointFor(originBnds);

        return ***REMOVED***
          centerX: originCenterPt.x - dialogCenterPt.x,
          centerY: originCenterPt.y - dialogCenterPt.y,
          scaleX: Math.round(100 * Math.min(0.5, originBnds.width / dialogRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.5, originBnds.height / dialogRect.height)) / 100
        ***REMOVED***;
      ***REMOVED***
      return ***REMOVED***centerX: 0, centerY: 0, scaleX: 0.5, scaleY: 0.5***REMOVED***;

      /**
       * This is a fallback if the origin information is no longer valid, then the
       * origin bounds simply becomes the current bounds for the dialogContainer's parent
       */
      function currentBounds() ***REMOVED***
        var cntr = element ? element.parent() : null;
        var parent = cntr ? cntr.parent() : null;

        return parent ? self.clientRect(parent) : null;
      ***REMOVED***
    ***REMOVED***,

    /**
     * Calculate the zoom transform from dialog to origin.
     *
     * We use this to set the dialog position immediately;
     * then the md-transition-in actually translates back to
     * `translate3d(0,0,0) scale(1.0)`...
     *
     * NOTE: all values are rounded to the nearest integer
     */
    calculateZoomToOrigin: function (element, originator) ***REMOVED***
      var zoomTemplate = "translate3d( ***REMOVED***centerX***REMOVED***px, ***REMOVED***centerY***REMOVED***px, 0 ) scale( ***REMOVED***scaleX***REMOVED***, ***REMOVED***scaleY***REMOVED*** )";
      var buildZoom = angular.bind(null, $mdUtil.supplant, zoomTemplate);

      return buildZoom(self.calculateTransformValues(element, originator));
    ***REMOVED***,

    /**
     * Calculate the slide transform from panel to origin.
     * NOTE: all values are rounded to the nearest integer
     */
    calculateSlideToOrigin: function (element, originator) ***REMOVED***
      var slideTemplate = "translate3d( ***REMOVED***centerX***REMOVED***px, ***REMOVED***centerY***REMOVED***px, 0 )";
      var buildSlide = angular.bind(null, $mdUtil.supplant, slideTemplate);

      return buildSlide(self.calculateTransformValues(element, originator));
    ***REMOVED***,

    /**
     * Enhance raw values to represent valid css stylings...
     */
    toCss : function( raw ) ***REMOVED***
      var css = ***REMOVED*** ***REMOVED***;
      var lookups = 'left top right bottom width height x y min-width min-height max-width max-height';

      angular.forEach(raw, function(value,key) ***REMOVED***
        if ( angular.isUndefined(value) ) return;

        if ( lookups.indexOf(key) >= 0 ) ***REMOVED***
          css[key] = value + 'px';
        ***REMOVED*** else ***REMOVED***
          switch (key) ***REMOVED***
            case 'transition':
              convertToVendor(key, $mdConstant.CSS.TRANSITION, value);
              break;
            case 'transform':
              convertToVendor(key, $mdConstant.CSS.TRANSFORM, value);
              break;
            case 'transformOrigin':
              convertToVendor(key, $mdConstant.CSS.TRANSFORM_ORIGIN, value);
              break;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***);

      return css;

      function convertToVendor(key, vendor, value) ***REMOVED***
        angular.forEach(vendor.split(' '), function (key) ***REMOVED***
          css[key] = value;
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***,

    /**
     * Convert the translate CSS value to key/value pair(s).
     */
    toTransformCss: function (transform, addTransition, transition) ***REMOVED***
      var css = ***REMOVED******REMOVED***;
      angular.forEach($mdConstant.CSS.TRANSFORM.split(' '), function (key) ***REMOVED***
        css[key] = transform;
      ***REMOVED***);

      if (addTransition) ***REMOVED***
        transition = transition || "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important";
        css['transition'] = transition;
      ***REMOVED***

      return css;
    ***REMOVED***,

    /**
     *  Clone the Rect and calculate the height/width if needed
     */
    copyRect: function (source, destination) ***REMOVED***
      if (!source) return null;

      destination = destination || ***REMOVED******REMOVED***;

      angular.forEach('left top right bottom width height'.split(' '), function (key) ***REMOVED***
        destination[key] = Math.round(source[key])
      ***REMOVED***);

      destination.width = destination.width || (destination.right - destination.left);
      destination.height = destination.height || (destination.bottom - destination.top);

      return destination;
    ***REMOVED***,

    /**
     * Calculate ClientRect of element; return null if hidden or zero size
     */
    clientRect: function (element) ***REMOVED***
      var bounds = angular.element(element)[0].getBoundingClientRect();
      var isPositiveSizeClientRect = function (rect) ***REMOVED***
        return rect && (rect.width > 0) && (rect.height > 0);
      ***REMOVED***;

      // If the event origin element has zero size, it has probably been hidden.
      return isPositiveSizeClientRect(bounds) ? self.copyRect(bounds) : null;
    ***REMOVED***,

    /**
     *  Calculate 'rounded' center point of Rect
     */
    centerPointFor: function (targetRect) ***REMOVED***
      return targetRect ? ***REMOVED***
        x: Math.round(targetRect.left + (targetRect.width / 2)),
        y: Math.round(targetRect.top + (targetRect.height / 2))
      ***REMOVED*** : ***REMOVED*** x : 0, y : 0 ***REMOVED***;
    ***REMOVED***

  ***REMOVED***;
***REMOVED***;


"use strict";

if (angular.version.minor >= 4) ***REMOVED***
  angular.module('material.core.animate', []);
***REMOVED*** else ***REMOVED***
(function() ***REMOVED***

  var forEach = angular.forEach;

  var WEBKIT = angular.isDefined(document.documentElement.style.WebkitAppearance);
  var TRANSITION_PROP = WEBKIT ? 'WebkitTransition' : 'transition';
  var ANIMATION_PROP = WEBKIT ? 'WebkitAnimation' : 'animation';
  var PREFIX = WEBKIT ? '-webkit-' : '';

  var TRANSITION_EVENTS = (WEBKIT ? 'webkitTransitionEnd ' : '') + 'transitionend';
  var ANIMATION_EVENTS = (WEBKIT ? 'webkitAnimationEnd ' : '') + 'animationend';

  var $$ForceReflowFactory = ['$document', function($document) ***REMOVED***
    return function() ***REMOVED***
      return $document[0].body.clientWidth + 1;
    ***REMOVED***
  ***REMOVED***];

  var $$rAFMutexFactory = ['$$rAF', function($$rAF) ***REMOVED***
    return function() ***REMOVED***
      var passed = false;
      $$rAF(function() ***REMOVED***
        passed = true;
      ***REMOVED***);
      return function(fn) ***REMOVED***
        passed ? fn() : $$rAF(fn);
      ***REMOVED***;
    ***REMOVED***;
  ***REMOVED***];

  var $$AnimateRunnerFactory = ['$q', '$$rAFMutex', function($q, $$rAFMutex) ***REMOVED***
    var INITIAL_STATE = 0;
    var DONE_PENDING_STATE = 1;
    var DONE_COMPLETE_STATE = 2;

    function AnimateRunner(host) ***REMOVED***
      this.setHost(host);

      this._doneCallbacks = [];
      this._runInAnimationFrame = $$rAFMutex();
      this._state = 0;
    ***REMOVED***

    AnimateRunner.prototype = ***REMOVED***
      setHost: function(host) ***REMOVED***
        this.host = host || ***REMOVED******REMOVED***;
      ***REMOVED***,

      done: function(fn) ***REMOVED***
        if (this._state === DONE_COMPLETE_STATE) ***REMOVED***
          fn();
        ***REMOVED*** else ***REMOVED***
          this._doneCallbacks.push(fn);
        ***REMOVED***
      ***REMOVED***,

      progress: angular.noop,

      getPromise: function() ***REMOVED***
        if (!this.promise) ***REMOVED***
          var self = this;
          this.promise = $q(function(resolve, reject) ***REMOVED***
            self.done(function(status) ***REMOVED***
              status === false ? reject() : resolve();
            ***REMOVED***);
          ***REMOVED***);
        ***REMOVED***
        return this.promise;
      ***REMOVED***,

      then: function(resolveHandler, rejectHandler) ***REMOVED***
        return this.getPromise().then(resolveHandler, rejectHandler);
      ***REMOVED***,

      'catch': function(handler) ***REMOVED***
        return this.getPromise()['catch'](handler);
      ***REMOVED***,

      'finally': function(handler) ***REMOVED***
        return this.getPromise()['finally'](handler);
      ***REMOVED***,

      pause: function() ***REMOVED***
        if (this.host.pause) ***REMOVED***
          this.host.pause();
        ***REMOVED***
      ***REMOVED***,

      resume: function() ***REMOVED***
        if (this.host.resume) ***REMOVED***
          this.host.resume();
        ***REMOVED***
      ***REMOVED***,

      end: function() ***REMOVED***
        if (this.host.end) ***REMOVED***
          this.host.end();
        ***REMOVED***
        this._resolve(true);
      ***REMOVED***,

      cancel: function() ***REMOVED***
        if (this.host.cancel) ***REMOVED***
          this.host.cancel();
        ***REMOVED***
        this._resolve(false);
      ***REMOVED***,

      complete: function(response) ***REMOVED***
        var self = this;
        if (self._state === INITIAL_STATE) ***REMOVED***
          self._state = DONE_PENDING_STATE;
          self._runInAnimationFrame(function() ***REMOVED***
            self._resolve(response);
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***,

      _resolve: function(response) ***REMOVED***
        if (this._state !== DONE_COMPLETE_STATE) ***REMOVED***
          forEach(this._doneCallbacks, function(fn) ***REMOVED***
            fn(response);
          ***REMOVED***);
          this._doneCallbacks.length = 0;
          this._state = DONE_COMPLETE_STATE;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    return AnimateRunner;
  ***REMOVED***];

  angular
    .module('material.core.animate', [])
    .factory('$$forceReflow', $$ForceReflowFactory)
    .factory('$$AnimateRunner', $$AnimateRunnerFactory)
    .factory('$$rAFMutex', $$rAFMutexFactory)
    .factory('$animateCss', ['$window', '$$rAF', '$$AnimateRunner', '$$forceReflow', '$$jqLite', '$timeout', '$animate',
                     function($window,   $$rAF,   $$AnimateRunner,   $$forceReflow,   $$jqLite,   $timeout, $animate) ***REMOVED***

      function init(element, options) ***REMOVED***

        var temporaryStyles = [];
        var node = getDomNode(element);
        var areAnimationsAllowed = node && $animate.enabled();

        var hasCompleteStyles = false;
        var hasCompleteClasses = false;

        if (areAnimationsAllowed) ***REMOVED***
          if (options.transitionStyle) ***REMOVED***
            temporaryStyles.push([PREFIX + 'transition', options.transitionStyle]);
          ***REMOVED***

          if (options.keyframeStyle) ***REMOVED***
            temporaryStyles.push([PREFIX + 'animation', options.keyframeStyle]);
          ***REMOVED***

          if (options.delay) ***REMOVED***
            temporaryStyles.push([PREFIX + 'transition-delay', options.delay + 's']);
          ***REMOVED***

          if (options.duration) ***REMOVED***
            temporaryStyles.push([PREFIX + 'transition-duration', options.duration + 's']);
          ***REMOVED***

          hasCompleteStyles = options.keyframeStyle ||
              (options.to && (options.duration > 0 || options.transitionStyle));
          hasCompleteClasses = !!options.addClass || !!options.removeClass;

          blockTransition(element, true);
        ***REMOVED***

        var hasCompleteAnimation = areAnimationsAllowed && (hasCompleteStyles || hasCompleteClasses);

        applyAnimationFromStyles(element, options);

        var animationClosed = false;
        var events, eventFn;

        return ***REMOVED***
          close: $window.close,
          start: function() ***REMOVED***
            var runner = new $$AnimateRunner();
            waitUntilQuiet(function() ***REMOVED***
              blockTransition(element, false);
              if (!hasCompleteAnimation) ***REMOVED***
                return close();
              ***REMOVED***

              forEach(temporaryStyles, function(entry) ***REMOVED***
                var key = entry[0];
                var value = entry[1];
                node.style[camelCase(key)] = value;
              ***REMOVED***);

              applyClasses(element, options);

              var timings = computeTimings(element);
              if (timings.duration === 0) ***REMOVED***
                return close();
              ***REMOVED***

              var moreStyles = [];

              if (options.easing) ***REMOVED***
                if (timings.transitionDuration) ***REMOVED***
                  moreStyles.push([PREFIX + 'transition-timing-function', options.easing]);
                ***REMOVED***
                if (timings.animationDuration) ***REMOVED***
                  moreStyles.push([PREFIX + 'animation-timing-function', options.easing]);
                ***REMOVED***
              ***REMOVED***

              if (options.delay && timings.animationDelay) ***REMOVED***
                moreStyles.push([PREFIX + 'animation-delay', options.delay + 's']);
              ***REMOVED***

              if (options.duration && timings.animationDuration) ***REMOVED***
                moreStyles.push([PREFIX + 'animation-duration', options.duration + 's']);
              ***REMOVED***

              forEach(moreStyles, function(entry) ***REMOVED***
                var key = entry[0];
                var value = entry[1];
                node.style[camelCase(key)] = value;
                temporaryStyles.push(entry);
              ***REMOVED***);

              var maxDelay = timings.delay;
              var maxDelayTime = maxDelay * 1000;
              var maxDuration = timings.duration;
              var maxDurationTime = maxDuration * 1000;
              var startTime = Date.now();

              events = [];
              if (timings.transitionDuration) ***REMOVED***
                events.push(TRANSITION_EVENTS);
              ***REMOVED***
              if (timings.animationDuration) ***REMOVED***
                events.push(ANIMATION_EVENTS);
              ***REMOVED***
              events = events.join(' ');
              eventFn = function(event) ***REMOVED***
                event.stopPropagation();
                var ev = event.originalEvent || event;
                var timeStamp = ev.timeStamp || Date.now();
                var elapsedTime = parseFloat(ev.elapsedTime.toFixed(3));
                if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) ***REMOVED***
                  close();
                ***REMOVED***
              ***REMOVED***;
              element.on(events, eventFn);

              applyAnimationToStyles(element, options);

              $timeout(close, maxDelayTime + maxDurationTime * 1.5, false);
            ***REMOVED***);

            return runner;

            function close() ***REMOVED***
              if (animationClosed) return;
              animationClosed = true;

              if (events && eventFn) ***REMOVED***
                element.off(events, eventFn);
              ***REMOVED***
              applyClasses(element, options);
              applyAnimationStyles(element, options);
              forEach(temporaryStyles, function(entry) ***REMOVED***
                node.style[camelCase(entry[0])] = '';
              ***REMOVED***);
              runner.complete(true);
              return runner;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      function applyClasses(element, options) ***REMOVED***
        if (options.addClass) ***REMOVED***
          $$jqLite.addClass(element, options.addClass);
          options.addClass = null;
        ***REMOVED***
        if (options.removeClass) ***REMOVED***
          $$jqLite.removeClass(element, options.removeClass);
          options.removeClass = null;
        ***REMOVED***
      ***REMOVED***

      function computeTimings(element) ***REMOVED***
        var node = getDomNode(element);
        var cs = $window.getComputedStyle(node)
        var tdr = parseMaxTime(cs[prop('transitionDuration')]);
        var adr = parseMaxTime(cs[prop('animationDuration')]);
        var tdy = parseMaxTime(cs[prop('transitionDelay')]);
        var ady = parseMaxTime(cs[prop('animationDelay')]);

        adr *= (parseInt(cs[prop('animationIterationCount')], 10) || 1);
        var duration = Math.max(adr, tdr);
        var delay = Math.max(ady, tdy);

        return ***REMOVED***
          duration: duration,
          delay: delay,
          animationDuration: adr,
          transitionDuration: tdr,
          animationDelay: ady,
          transitionDelay: tdy
        ***REMOVED***;

        function prop(key) ***REMOVED***
          return WEBKIT ? 'Webkit' + key.charAt(0).toUpperCase() + key.substr(1)
                        : key;
        ***REMOVED***
      ***REMOVED***

      function parseMaxTime(str) ***REMOVED***
        var maxValue = 0;
        var values = (str || "").split(/\s*,\s*/);
        forEach(values, function(value) ***REMOVED***
          // it's always safe to consider only second values and omit `ms` values since
          // getComputedStyle will always handle the conversion for us
          if (value.charAt(value.length - 1) == 's') ***REMOVED***
            value = value.substring(0, value.length - 1);
          ***REMOVED***
          value = parseFloat(value) || 0;
          maxValue = maxValue ? Math.max(value, maxValue) : value;
        ***REMOVED***);
        return maxValue;
      ***REMOVED***

      var cancelLastRAFRequest;
      var rafWaitQueue = [];
      function waitUntilQuiet(callback) ***REMOVED***
        if (cancelLastRAFRequest) ***REMOVED***
          cancelLastRAFRequest(); //cancels the request
        ***REMOVED***
        rafWaitQueue.push(callback);
        cancelLastRAFRequest = $$rAF(function() ***REMOVED***
          cancelLastRAFRequest = null;

          // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.
          // PLEASE EXAMINE THE `$$forceReflow` service to understand why.
          var pageWidth = $$forceReflow();

          // we use a for loop to ensure that if the queue is changed
          // during this looping then it will consider new requests
          for (var i = 0; i < rafWaitQueue.length; i++) ***REMOVED***
            rafWaitQueue[i](pageWidth);
          ***REMOVED***
          rafWaitQueue.length = 0;
        ***REMOVED***);
      ***REMOVED***

      function applyAnimationStyles(element, options) ***REMOVED***
        applyAnimationFromStyles(element, options);
        applyAnimationToStyles(element, options);
      ***REMOVED***

      function applyAnimationFromStyles(element, options) ***REMOVED***
        if (options.from) ***REMOVED***
          element.css(options.from);
          options.from = null;
        ***REMOVED***
      ***REMOVED***

      function applyAnimationToStyles(element, options) ***REMOVED***
        if (options.to) ***REMOVED***
          element.css(options.to);
          options.to = null;
        ***REMOVED***
      ***REMOVED***

      function getDomNode(element) ***REMOVED***
        for (var i = 0; i < element.length; i++) ***REMOVED***
          if (element[i].nodeType === 1) return element[i];
        ***REMOVED***
      ***REMOVED***

      function blockTransition(element, bool) ***REMOVED***
        var node = getDomNode(element);
        var key = camelCase(PREFIX + 'transition-delay');
        node.style[key] = bool ? '-9999s' : '';
      ***REMOVED***

      return init;
    ***REMOVED***]);

  /**
   * Older browsers [FF31] expect camelCase
   * property keys.
   * e.g.
   *  animation-duration --> animationDuration
   */
  function camelCase(str) ***REMOVED***
    return str.replace(/-[a-z]/g, function(str) ***REMOVED***
      return str.charAt(1).toUpperCase();
    ***REMOVED***);
  ***REMOVED***

***REMOVED***)();

***REMOVED***

(function()***REMOVED*** 
angular.module("material.core").constant("$MD_THEME_CSS", "/*  Only used with Theme processes */html.md-THEME_NAME-theme, body.md-THEME_NAME-theme ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***background-color***REMOVED******REMOVED***'; ***REMOVED***md-autocomplete.md-THEME_NAME-theme ***REMOVED***  background: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***'; ***REMOVED***  md-autocomplete.md-THEME_NAME-theme[disabled]:not([md-floating-label]) ***REMOVED***    background: '***REMOVED******REMOVED***background-100***REMOVED******REMOVED***'; ***REMOVED***  md-autocomplete.md-THEME_NAME-theme button md-icon path ***REMOVED***    fill: '***REMOVED******REMOVED***background-600***REMOVED******REMOVED***'; ***REMOVED***  md-autocomplete.md-THEME_NAME-theme button:after ***REMOVED***    background: '***REMOVED******REMOVED***background-600-0.3***REMOVED******REMOVED***'; ***REMOVED***.md-autocomplete-suggestions-container.md-THEME_NAME-theme ***REMOVED***  background: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***'; ***REMOVED***  .md-autocomplete-suggestions-container.md-THEME_NAME-theme li ***REMOVED***    color: '***REMOVED******REMOVED***background-900***REMOVED******REMOVED***'; ***REMOVED***    .md-autocomplete-suggestions-container.md-THEME_NAME-theme li .highlight ***REMOVED***      color: '***REMOVED******REMOVED***background-600***REMOVED******REMOVED***'; ***REMOVED***    .md-autocomplete-suggestions-container.md-THEME_NAME-theme li:hover, .md-autocomplete-suggestions-container.md-THEME_NAME-theme li.selected ***REMOVED***      background: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***md-backdrop ***REMOVED***  background-color: '***REMOVED******REMOVED***background-900-0.0***REMOVED******REMOVED***'; ***REMOVED***  md-backdrop.md-opaque.md-THEME_NAME-theme ***REMOVED***    background-color: '***REMOVED******REMOVED***background-900-1.0***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme:not([disabled]):hover ***REMOVED***  background-color: '***REMOVED******REMOVED***background-500-0.2***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme:not([disabled]).md-focused ***REMOVED***  background-color: '***REMOVED******REMOVED***background-500-0.2***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover ***REMOVED***  background-color: transparent; ***REMOVED***.md-button.md-THEME_NAME-theme.md-fab ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-fab md-icon ***REMOVED***    color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover ***REMOVED***    background-color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused ***REMOVED***    background-color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme.md-primary ***REMOVED***  color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-primary.md-raised, .md-button.md-THEME_NAME-theme.md-primary.md-fab ***REMOVED***    color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***';    background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]) md-icon, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]) md-icon ***REMOVED***      color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover ***REMOVED***      background-color: '***REMOVED******REMOVED***primary-600***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused ***REMOVED***      background-color: '***REMOVED******REMOVED***primary-600***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-primary:not([disabled]) md-icon ***REMOVED***    color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme.md-fab ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]) .md-icon ***REMOVED***    color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover ***REMOVED***    background-color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused ***REMOVED***    background-color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme.md-raised ***REMOVED***  color: '***REMOVED******REMOVED***background-900***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-raised:not([disabled]) md-icon ***REMOVED***    color: '***REMOVED******REMOVED***background-900***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover ***REMOVED***    background-color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused ***REMOVED***    background-color: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme.md-warn ***REMOVED***  color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-warn.md-raised, .md-button.md-THEME_NAME-theme.md-warn.md-fab ***REMOVED***    color: '***REMOVED******REMOVED***warn-contrast***REMOVED******REMOVED***';    background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]) md-icon, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]) md-icon ***REMOVED***      color: '***REMOVED******REMOVED***warn-contrast***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover ***REMOVED***      background-color: '***REMOVED******REMOVED***warn-600***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused ***REMOVED***      background-color: '***REMOVED******REMOVED***warn-600***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-warn:not([disabled]) md-icon ***REMOVED***    color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme.md-accent ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-accent.md-raised, .md-button.md-THEME_NAME-theme.md-accent.md-fab ***REMOVED***    color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***';    background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]) md-icon, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]) md-icon ***REMOVED***      color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover ***REMOVED***      background-color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***    .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused ***REMOVED***      background-color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***  .md-button.md-THEME_NAME-theme.md-accent:not([disabled]) md-icon ***REMOVED***    color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme[disabled], .md-button.md-THEME_NAME-theme.md-raised[disabled], .md-button.md-THEME_NAME-theme.md-fab[disabled], .md-button.md-THEME_NAME-theme.md-accent[disabled], .md-button.md-THEME_NAME-theme.md-warn[disabled] ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***';  cursor: default; ***REMOVED***  .md-button.md-THEME_NAME-theme[disabled] md-icon, .md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon, .md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon, .md-button.md-THEME_NAME-theme.md-accent[disabled] md-icon, .md-button.md-THEME_NAME-theme.md-warn[disabled] md-icon ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme.md-raised[disabled], .md-button.md-THEME_NAME-theme.md-fab[disabled] ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***.md-button.md-THEME_NAME-theme[disabled] ***REMOVED***  background-color: transparent; ***REMOVED***._md a.md-THEME_NAME-theme:not(.md-button).md-primary ***REMOVED***  color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  ._md a.md-THEME_NAME-theme:not(.md-button).md-primary:hover ***REMOVED***    color: '***REMOVED******REMOVED***primary-700***REMOVED******REMOVED***'; ***REMOVED***._md a.md-THEME_NAME-theme:not(.md-button).md-accent ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  ._md a.md-THEME_NAME-theme:not(.md-button).md-accent:hover ***REMOVED***    color: '***REMOVED******REMOVED***accent-700***REMOVED******REMOVED***'; ***REMOVED***._md a.md-THEME_NAME-theme:not(.md-button).md-accent ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  ._md a.md-THEME_NAME-theme:not(.md-button).md-accent:hover ***REMOVED***    color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***._md a.md-THEME_NAME-theme:not(.md-button).md-warn ***REMOVED***  color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***  ._md a.md-THEME_NAME-theme:not(.md-button).md-warn:hover ***REMOVED***    color: '***REMOVED******REMOVED***warn-700***REMOVED******REMOVED***'; ***REMOVED***md-bottom-sheet.md-THEME_NAME-theme ***REMOVED***  background-color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***';  border-top-color: '***REMOVED******REMOVED***background-300***REMOVED******REMOVED***'; ***REMOVED***  md-bottom-sheet.md-THEME_NAME-theme.md-list md-list-item ***REMOVED***    color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***  md-bottom-sheet.md-THEME_NAME-theme .md-subheader ***REMOVED***    background-color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***'; ***REMOVED***  md-bottom-sheet.md-THEME_NAME-theme .md-subheader ***REMOVED***    color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***md-card.md-THEME_NAME-theme ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***background-hue-1***REMOVED******REMOVED***';  border-radius: 2px; ***REMOVED***  md-card.md-THEME_NAME-theme .md-card-image ***REMOVED***    border-radius: 2px 2px 0 0; ***REMOVED***  md-card.md-THEME_NAME-theme md-card-header md-card-avatar md-icon ***REMOVED***    color: '***REMOVED******REMOVED***background-color***REMOVED******REMOVED***';    background-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-card.md-THEME_NAME-theme md-card-header md-card-header-text .md-subhead ***REMOVED***    color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***  md-card.md-THEME_NAME-theme md-card-title md-card-title-text:not(:only-child) .md-subhead ***REMOVED***    color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***background-600***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme.md-checked.md-focused ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***accent-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme ._md-icon ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme.md-checked ._md-icon ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme.md-checked ._md-icon:after ***REMOVED***  border-color: '***REMOVED******REMOVED***accent-contrast-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-600***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***background-600***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary ._md-icon ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked ._md-icon ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked.md-focused ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked ._md-icon:after ***REMOVED***  border-color: '***REMOVED******REMOVED***primary-contrast-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-indeterminate[disabled] ._md-container ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***warn-600***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***warn-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn ._md-icon ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked ._md-icon ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked.md-focused:not([disabled]) ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked ._md-icon:after ***REMOVED***  border-color: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme[disabled] ._md-icon ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme[disabled].md-checked ._md-icon ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme[disabled].md-checked ._md-icon:after ***REMOVED***  border-color: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme[disabled] ._md-icon:after ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-checkbox.md-THEME_NAME-theme[disabled] ._md-label ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-chips.md-THEME_NAME-theme .md-chips ***REMOVED***  box-shadow: 0 1px '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***  md-chips.md-THEME_NAME-theme .md-chips.md-focused ***REMOVED***    box-shadow: 0 2px '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  md-chips.md-THEME_NAME-theme .md-chips ._md-chip-input-container input ***REMOVED***    color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***    md-chips.md-THEME_NAME-theme .md-chips ._md-chip-input-container input::-webkit-input-placeholder ***REMOVED***      color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***    md-chips.md-THEME_NAME-theme .md-chips ._md-chip-input-container input:-moz-placeholder ***REMOVED***      color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***    md-chips.md-THEME_NAME-theme .md-chips ._md-chip-input-container input::-moz-placeholder ***REMOVED***      color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***    md-chips.md-THEME_NAME-theme .md-chips ._md-chip-input-container input:-ms-input-placeholder ***REMOVED***      color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***    md-chips.md-THEME_NAME-theme .md-chips ._md-chip-input-container input::-webkit-input-placeholder ***REMOVED***      color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-chips.md-THEME_NAME-theme md-chip ***REMOVED***  background: '***REMOVED******REMOVED***background-300***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***background-800***REMOVED******REMOVED***'; ***REMOVED***  md-chips.md-THEME_NAME-theme md-chip md-icon ***REMOVED***    color: '***REMOVED******REMOVED***background-700***REMOVED******REMOVED***'; ***REMOVED***  md-chips.md-THEME_NAME-theme md-chip.md-focused ***REMOVED***    background: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***';    color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-chips.md-THEME_NAME-theme md-chip.md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***  md-chips.md-THEME_NAME-theme md-chip._md-chip-editing ***REMOVED***    background: transparent;    color: '***REMOVED******REMOVED***background-800***REMOVED******REMOVED***'; ***REMOVED***md-chips.md-THEME_NAME-theme md-chip-remove .md-button md-icon path ***REMOVED***  fill: '***REMOVED******REMOVED***background-500***REMOVED******REMOVED***'; ***REMOVED***.md-contact-suggestion span.md-contact-email ***REMOVED***  color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***md-content.md-THEME_NAME-theme ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***background-default***REMOVED******REMOVED***'; ***REMOVED***/** Theme styles for mdCalendar. */.md-calendar.md-THEME_NAME-theme ***REMOVED***  background: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***background-A200-0.87***REMOVED******REMOVED***'; ***REMOVED***  .md-calendar.md-THEME_NAME-theme tr:last-child td ***REMOVED***    border-bottom-color: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-calendar-day-header ***REMOVED***  background: '***REMOVED******REMOVED***background-300***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***background-A200-0.87***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today .md-calendar-date-selection-indicator ***REMOVED***  border: 1px solid '***REMOVED******REMOVED***primary-500***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today.md-calendar-date-disabled ***REMOVED***  color: '***REMOVED******REMOVED***primary-500-0.6***REMOVED******REMOVED***'; ***REMOVED***.md-calendar-date.md-focus .md-THEME_NAME-theme .md-calendar-date-selection-indicator, .md-THEME_NAME-theme .md-calendar-date-selection-indicator:hover ***REMOVED***  background: '***REMOVED******REMOVED***background-300***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-calendar-date.md-calendar-selected-date .md-calendar-date-selection-indicator,.md-THEME_NAME-theme .md-calendar-date.md-focus.md-calendar-selected-date .md-calendar-date-selection-indicator ***REMOVED***  background: '***REMOVED******REMOVED***primary-500***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***primary-500-contrast***REMOVED******REMOVED***';  border-color: transparent; ***REMOVED***.md-THEME_NAME-theme .md-calendar-date-disabled,.md-THEME_NAME-theme .md-calendar-month-label-disabled ***REMOVED***  color: '***REMOVED******REMOVED***background-A200-0.435***REMOVED******REMOVED***'; ***REMOVED***/** Theme styles for mdDatepicker. */.md-THEME_NAME-theme .md-datepicker-input ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input::-webkit-input-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input:-moz-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input::-moz-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input:-ms-input-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input::-webkit-input-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-input-container ***REMOVED***  border-bottom-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused ***REMOVED***    border-bottom-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-invalid ***REMOVED***    border-bottom-color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-calendar-pane ***REMOVED***  border-color: '***REMOVED******REMOVED***background-hue-1***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-triangle-button .md-datepicker-expand-triangle ***REMOVED***  border-top-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-triangle-button:hover .md-datepicker-expand-triangle ***REMOVED***  border-top-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon ***REMOVED***  fill: '***REMOVED******REMOVED***primary-500***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-input-container,.md-THEME_NAME-theme .md-datepicker-input-mask-opaque ***REMOVED***  background: '***REMOVED******REMOVED***background-hue-1***REMOVED******REMOVED***'; ***REMOVED***.md-THEME_NAME-theme .md-datepicker-calendar ***REMOVED***  background: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***'; ***REMOVED***md-dialog.md-THEME_NAME-theme ***REMOVED***  border-radius: 4px;  background-color: '***REMOVED******REMOVED***background-hue-1***REMOVED******REMOVED***'; ***REMOVED***  md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions, md-dialog.md-THEME_NAME-theme.md-content-overflow md-dialog-actions ***REMOVED***    border-top-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***md-divider.md-THEME_NAME-theme ***REMOVED***  border-top-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***.layout-row > md-divider.md-THEME_NAME-theme,.layout-xs-row > md-divider.md-THEME_NAME-theme, .layout-gt-xs-row > md-divider.md-THEME_NAME-theme,.layout-sm-row > md-divider.md-THEME_NAME-theme, .layout-gt-sm-row > md-divider.md-THEME_NAME-theme,.layout-md-row > md-divider.md-THEME_NAME-theme, .layout-gt-md-row > md-divider.md-THEME_NAME-theme,.layout-lg-row > md-divider.md-THEME_NAME-theme, .layout-gt-lg-row > md-divider.md-THEME_NAME-theme,.layout-xl-row > md-divider.md-THEME_NAME-theme ***REMOVED***  border-right-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***md-icon.md-THEME_NAME-theme ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***  md-icon.md-THEME_NAME-theme.md-primary ***REMOVED***    color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  md-icon.md-THEME_NAME-theme.md-accent ***REMOVED***    color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  md-icon.md-THEME_NAME-theme.md-warn ***REMOVED***    color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme .md-input ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***';  border-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***  md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme > md-icon ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme label,md-input-container.md-THEME_NAME-theme ._md-placeholder ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme label.md-required:after ***REMOVED***  color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-focused):not(.md-input-invalid) label.md-required:after ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme .md-input-messages-animation, md-input-container.md-THEME_NAME-theme .md-input-message-animation ***REMOVED***  color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***  md-input-container.md-THEME_NAME-theme .md-input-messages-animation .md-char-counter, md-input-container.md-THEME_NAME-theme .md-input-message-animation .md-char-counter ***REMOVED***    color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input, md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-resized .md-input ***REMOVED***  border-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label ***REMOVED***  color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused md-icon ***REMOVED***  color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input ***REMOVED***  border-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input ***REMOVED***  border-color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label ***REMOVED***  color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input ***REMOVED***  border-color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme.md-input-invalid label ***REMOVED***  color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input-message-animation, md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter ***REMOVED***  color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***'; ***REMOVED***md-input-container.md-THEME_NAME-theme .md-input[disabled],[disabled] md-input-container.md-THEME_NAME-theme .md-input ***REMOVED***  border-bottom-color: transparent;  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***';  background-image: linear-gradient(to right, \"***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***\" 0%, \"***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***\" 33%, transparent 0%);  background-image: -ms-linear-gradient(left, transparent 0%, \"***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***\" 100%); ***REMOVED***md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h3, md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h4,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h4 ***REMOVED***  color: '***REMOVED******REMOVED***foreground-1***REMOVED******REMOVED***'; ***REMOVED***md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text p,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text p ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-list.md-THEME_NAME-theme ._md-proxy-focus.md-focused div._md-no-style ***REMOVED***  background-color: '***REMOVED******REMOVED***background-100***REMOVED******REMOVED***'; ***REMOVED***md-list.md-THEME_NAME-theme md-list-item .md-avatar-icon ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***background-color***REMOVED******REMOVED***'; ***REMOVED***md-list.md-THEME_NAME-theme md-list-item > md-icon ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***  md-list.md-THEME_NAME-theme md-list-item > md-icon.md-highlight ***REMOVED***    color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***    md-list.md-THEME_NAME-theme md-list-item > md-icon.md-highlight.md-accent ***REMOVED***      color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-menu-content.md-THEME_NAME-theme ***REMOVED***  background-color: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***'; ***REMOVED***  md-menu-content.md-THEME_NAME-theme md-menu-item ***REMOVED***    color: '***REMOVED******REMOVED***background-A200-0.87***REMOVED******REMOVED***'; ***REMOVED***    md-menu-content.md-THEME_NAME-theme md-menu-item md-icon ***REMOVED***      color: '***REMOVED******REMOVED***background-A200-0.54***REMOVED******REMOVED***'; ***REMOVED***    md-menu-content.md-THEME_NAME-theme md-menu-item .md-button[disabled] ***REMOVED***      color: '***REMOVED******REMOVED***background-A200-0.25***REMOVED******REMOVED***'; ***REMOVED***      md-menu-content.md-THEME_NAME-theme md-menu-item .md-button[disabled] md-icon ***REMOVED***        color: '***REMOVED******REMOVED***background-A200-0.25***REMOVED******REMOVED***'; ***REMOVED***  md-menu-content.md-THEME_NAME-theme md-menu-divider ***REMOVED***    background-color: '***REMOVED******REMOVED***background-A200-0.11***REMOVED******REMOVED***'; ***REMOVED***.md-panel ***REMOVED***  background-color: '***REMOVED******REMOVED***background-900-0.0***REMOVED******REMOVED***'; ***REMOVED***  .md-panel._md-panel-backdrop.md-THEME_NAME-theme ***REMOVED***    background-color: '***REMOVED******REMOVED***background-900-1.0***REMOVED******REMOVED***'; ***REMOVED***md-menu-bar.md-THEME_NAME-theme > button.md-button ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***';  border-radius: 2px; ***REMOVED***md-menu-bar.md-THEME_NAME-theme md-menu._md-open > button, md-menu-bar.md-THEME_NAME-theme md-menu > button:focus ***REMOVED***  outline: none;  background: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***md-menu-bar.md-THEME_NAME-theme._md-open:not(._md-keyboard-mode) md-menu:hover > button ***REMOVED***  background-color: '***REMOVED******REMOVED*** background-500-0.2***REMOVED******REMOVED***'; ***REMOVED***md-menu-bar.md-THEME_NAME-theme:not(._md-keyboard-mode):not(._md-open) md-menu button:hover,md-menu-bar.md-THEME_NAME-theme:not(._md-keyboard-mode):not(._md-open) md-menu button:focus ***REMOVED***  background: transparent; ***REMOVED***md-menu-content.md-THEME_NAME-theme .md-menu > .md-button:after ***REMOVED***  color: '***REMOVED******REMOVED***background-A200-0.54***REMOVED******REMOVED***'; ***REMOVED***md-menu-content.md-THEME_NAME-theme .md-menu._md-open > .md-button ***REMOVED***  background-color: '***REMOVED******REMOVED*** background-500-0.2***REMOVED******REMOVED***'; ***REMOVED***md-toolbar.md-THEME_NAME-theme.md-menu-toolbar ***REMOVED***  background-color: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***background-A200***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler ***REMOVED***    background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***';    color: '***REMOVED******REMOVED***background-A100-0.87***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler md-icon ***REMOVED***      color: '***REMOVED******REMOVED***background-A100-0.87***REMOVED******REMOVED***'; ***REMOVED***md-nav-bar.md-THEME_NAME-theme .md-nav-bar ***REMOVED***  background-color: transparent;  border-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***md-nav-bar.md-THEME_NAME-theme .md-button._md-nav-button.md-unselected ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-nav-bar.md-THEME_NAME-theme md-nav-ink-bar ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***';  background: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme ._md-container ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-100***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme.md-warn ._md-container ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-100***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme.md-warn ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme.md-accent ._md-container ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme.md-accent ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn ._md-bar1 ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-100***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn ._md-dashed:before ***REMOVED***  background: radial-gradient(\"***REMOVED******REMOVED***warn-100***REMOVED******REMOVED***\" 0%, \"***REMOVED******REMOVED***warn-100***REMOVED******REMOVED***\" 16%, transparent 42%); ***REMOVED***md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent ._md-bar1 ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***'; ***REMOVED***md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent ._md-dashed:before ***REMOVED***  background: radial-gradient(\"***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***\" 0%, \"***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***\" 16%, transparent 42%); ***REMOVED***md-radio-button.md-THEME_NAME-theme ._md-off ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***md-radio-button.md-THEME_NAME-theme ._md-on ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-button.md-THEME_NAME-theme.md-checked ._md-off ***REMOVED***  border-color: '***REMOVED******REMOVED***accent-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***accent-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-button.md-THEME_NAME-theme ._md-container .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary ._md-on, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary ._md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary ._md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary ._md-on ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked ._md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked ._md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked ._md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked ._md-off ***REMOVED***  border-color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary ._md-container .md-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary ._md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary ._md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary ._md-container .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-600***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn ._md-on, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn ._md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn ._md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn ._md-on ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked ._md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked ._md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked ._md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked ._md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked ._md-off ***REMOVED***  border-color: '***REMOVED******REMOVED***warn-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***warn-color-0.87***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn ._md-container .md-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn ._md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn ._md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn ._md-container .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***warn-600***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme[disabled],md-radio-button.md-THEME_NAME-theme[disabled] ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-radio-group.md-THEME_NAME-theme[disabled] ._md-container ._md-off,  md-radio-button.md-THEME_NAME-theme[disabled] ._md-container ._md-off ***REMOVED***    border-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-radio-group.md-THEME_NAME-theme[disabled] ._md-container ._md-on,  md-radio-button.md-THEME_NAME-theme[disabled] ._md-container ._md-on ***REMOVED***    border-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme .md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***accent-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme.md-primary .md-checked:not([disabled]) .md-ink-ripple, md-radio-group.md-THEME_NAME-theme .md-checked:not([disabled]).md-primary .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme .md-checked.md-primary .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***warn-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-primary .md-checked ._md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-primary ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-warn .md-checked ._md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-warn ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-progress-circular.md-THEME_NAME-theme path ***REMOVED***  stroke: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-progress-circular.md-THEME_NAME-theme.md-warn path ***REMOVED***  stroke: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-progress-circular.md-THEME_NAME-theme.md-accent path ***REMOVED***  stroke: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-select.md-THEME_NAME-theme[disabled] ._md-select-value ***REMOVED***  border-bottom-color: transparent;  background-image: linear-gradient(to right, \"***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***\" 0%, \"***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***\" 33%, transparent 0%);  background-image: -ms-linear-gradient(left, transparent 0%, \"***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***\" 100%); ***REMOVED***md-select.md-THEME_NAME-theme ._md-select-value ***REMOVED***  border-bottom-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***  md-select.md-THEME_NAME-theme ._md-select-value._md-select-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-select.md-THEME_NAME-theme.ng-invalid.ng-dirty ._md-select-value ***REMOVED***  color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***' !important;  border-bottom-color: '***REMOVED******REMOVED***warn-A700***REMOVED******REMOVED***' !important; ***REMOVED***md-select.md-THEME_NAME-theme:not([disabled]):focus ._md-select-value ***REMOVED***  border-bottom-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED*** foreground-1 ***REMOVED******REMOVED***'; ***REMOVED***  md-select.md-THEME_NAME-theme:not([disabled]):focus ._md-select-value._md-select-placeholder ***REMOVED***    color: '***REMOVED******REMOVED*** foreground-1 ***REMOVED******REMOVED***'; ***REMOVED***md-select.md-THEME_NAME-theme:not([disabled]):focus.md-accent ._md-select-value ***REMOVED***  border-bottom-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-select.md-THEME_NAME-theme:not([disabled]):focus.md-warn ._md-select-value ***REMOVED***  border-bottom-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-select.md-THEME_NAME-theme[disabled] ._md-select-value ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-select.md-THEME_NAME-theme[disabled] ._md-select-value._md-select-placeholder ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-select-menu.md-THEME_NAME-theme md-content ***REMOVED***  background: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***'; ***REMOVED***  md-select-menu.md-THEME_NAME-theme md-content md-optgroup ***REMOVED***    color: '***REMOVED******REMOVED***background-600-0.87***REMOVED******REMOVED***'; ***REMOVED***  md-select-menu.md-THEME_NAME-theme md-content md-option ***REMOVED***    color: '***REMOVED******REMOVED***background-900-0.87***REMOVED******REMOVED***'; ***REMOVED***    md-select-menu.md-THEME_NAME-theme md-content md-option[disabled] ._md-text ***REMOVED***      color: '***REMOVED******REMOVED***background-400-0.87***REMOVED******REMOVED***'; ***REMOVED***    md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]):focus, md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]):hover ***REMOVED***      background: '***REMOVED******REMOVED***background-200***REMOVED******REMOVED***'; ***REMOVED***    md-select-menu.md-THEME_NAME-theme md-content md-option[selected] ***REMOVED***      color: '***REMOVED******REMOVED***primary-500***REMOVED******REMOVED***'; ***REMOVED***      md-select-menu.md-THEME_NAME-theme md-content md-option[selected]:focus ***REMOVED***        color: '***REMOVED******REMOVED***primary-600***REMOVED******REMOVED***'; ***REMOVED***      md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent ***REMOVED***        color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***        md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent:focus ***REMOVED***          color: '***REMOVED******REMOVED***accent-A700***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-600***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-ripple ***REMOVED***  color: '***REMOVED******REMOVED***background-600***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme ._md-icon ***REMOVED***  border-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme[selected] ._md-icon ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.87***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme[selected].md-focused ._md-container:before ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.26***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme[selected] ._md-icon:after ***REMOVED***  border-color: '***REMOVED******REMOVED***primary-contrast-0.87***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme .md-indeterminate[disabled] ._md-container ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***._md-checkbox-enabled.md-THEME_NAME-theme md-option ._md-text ***REMOVED***  color: '***REMOVED******REMOVED***background-900-0.87***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-track ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-track-ticks ***REMOVED***  color: '***REMOVED******REMOVED***background-contrast***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-focus-ring ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-A200-0.2***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-disabled-thumb ***REMOVED***  border-color: '***REMOVED******REMOVED***background-color***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***background-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme._md-min ._md-thumb:after ***REMOVED***  background-color: '***REMOVED******REMOVED***background-color***REMOVED******REMOVED***';  border-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme._md-min ._md-focus-ring ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-3-0.38***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme._md-min[md-discrete] ._md-thumb:after ***REMOVED***  background-color: '***REMOVED******REMOVED***background-contrast***REMOVED******REMOVED***';  border-color: transparent; ***REMOVED***md-slider.md-THEME_NAME-theme._md-min[md-discrete] ._md-sign ***REMOVED***  background-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***  md-slider.md-THEME_NAME-theme._md-min[md-discrete] ._md-sign:after ***REMOVED***    border-top-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme._md-min[md-discrete][md-vertical] ._md-sign:after ***REMOVED***  border-top-color: transparent;  border-left-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-track._md-track-fill ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-thumb:after ***REMOVED***  border-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-sign ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  md-slider.md-THEME_NAME-theme ._md-sign:after ***REMOVED***    border-top-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme[md-vertical] ._md-sign:after ***REMOVED***  border-top-color: transparent;  border-left-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme ._md-thumb-text ***REMOVED***  color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-warn ._md-focus-ring ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-200-0.38***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-warn ._md-track._md-track-fill ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-warn ._md-thumb:after ***REMOVED***  border-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-warn ._md-sign ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***  md-slider.md-THEME_NAME-theme.md-warn ._md-sign:after ***REMOVED***    border-top-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-warn[md-vertical] ._md-sign:after ***REMOVED***  border-top-color: transparent;  border-left-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-warn ._md-thumb-text ***REMOVED***  color: '***REMOVED******REMOVED***warn-contrast***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-primary ._md-focus-ring ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-200-0.38***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-primary ._md-track._md-track-fill ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-primary ._md-thumb:after ***REMOVED***  border-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-primary ._md-sign ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  md-slider.md-THEME_NAME-theme.md-primary ._md-sign:after ***REMOVED***    border-top-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-primary[md-vertical] ._md-sign:after ***REMOVED***  border-top-color: transparent;  border-left-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme.md-primary ._md-thumb-text ***REMOVED***  color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme[disabled] ._md-thumb:after ***REMOVED***  border-color: transparent; ***REMOVED***md-slider.md-THEME_NAME-theme[disabled]:not(._md-min) ._md-thumb:after, md-slider.md-THEME_NAME-theme[disabled][md-discrete] ._md-thumb:after ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***';  border-color: transparent; ***REMOVED***md-slider.md-THEME_NAME-theme[disabled][readonly] ._md-sign ***REMOVED***  background-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***  md-slider.md-THEME_NAME-theme[disabled][readonly] ._md-sign:after ***REMOVED***    border-top-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme[disabled][readonly][md-vertical] ._md-sign:after ***REMOVED***  border-top-color: transparent;  border-left-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***md-slider.md-THEME_NAME-theme[disabled][readonly] ._md-disabled-thumb ***REMOVED***  border-color: transparent;  background-color: transparent; ***REMOVED***md-slider-container[disabled] > *:first-child:not(md-slider),md-slider-container[disabled] > *:last-child:not(md-slider) ***REMOVED***  color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***md-sidenav.md-THEME_NAME-theme, md-sidenav.md-THEME_NAME-theme md-content ***REMOVED***  background-color: '***REMOVED******REMOVED***background-hue-1***REMOVED******REMOVED***'; ***REMOVED***.md-subheader.md-THEME_NAME-theme ***REMOVED***  color: '***REMOVED******REMOVED*** foreground-2-0.23 ***REMOVED******REMOVED***';  background-color: '***REMOVED******REMOVED***background-default***REMOVED******REMOVED***'; ***REMOVED***  .md-subheader.md-THEME_NAME-theme.md-primary ***REMOVED***    color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  .md-subheader.md-THEME_NAME-theme.md-accent ***REMOVED***    color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  .md-subheader.md-THEME_NAME-theme.md-warn ***REMOVED***    color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***background-500***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme ._md-thumb ***REMOVED***  background-color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***background-500***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked ._md-thumb ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color-0.5***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-focused ._md-thumb:before ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-primary ._md-thumb ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-primary ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.5***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-primary.md-focused ._md-thumb:before ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-ink-ripple ***REMOVED***  color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-warn ._md-thumb ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-warn ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color-0.5***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme.md-checked.md-warn.md-focused ._md-thumb:before ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color-0.26***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme[disabled] ._md-thumb ***REMOVED***  background-color: '***REMOVED******REMOVED***background-400***REMOVED******REMOVED***'; ***REMOVED***md-switch.md-THEME_NAME-theme[disabled] ._md-bar ***REMOVED***  background-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme md-tabs-wrapper ***REMOVED***  background-color: transparent;  border-color: '***REMOVED******REMOVED***foreground-4***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme .md-paginator md-icon ***REMOVED***  color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme md-ink-bar ***REMOVED***  color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***';  background: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme .md-tab ***REMOVED***  color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme .md-tab[disabled], md-tabs.md-THEME_NAME-theme .md-tab[disabled] md-icon ***REMOVED***    color: '***REMOVED******REMOVED***foreground-3***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme .md-tab.md-active, md-tabs.md-THEME_NAME-theme .md-tab.md-active md-icon, md-tabs.md-THEME_NAME-theme .md-tab.md-focused, md-tabs.md-THEME_NAME-theme .md-tab.md-focused md-icon ***REMOVED***    color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme .md-tab.md-focused ***REMOVED***    background: '***REMOVED******REMOVED***primary-color-0.1***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme .md-tab .md-ripple-container ***REMOVED***    color: '***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) ***REMOVED***    color: '***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***'; ***REMOVED***    md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused ***REMOVED***      background: '***REMOVED******REMOVED***accent-contrast-0.1***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-ink-bar ***REMOVED***    color: '***REMOVED******REMOVED***primary-600-1***REMOVED******REMOVED***';    background: '***REMOVED******REMOVED***primary-600-1***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) ***REMOVED***    color: '***REMOVED******REMOVED***primary-100***REMOVED******REMOVED***'; ***REMOVED***    md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused ***REMOVED***      background: '***REMOVED******REMOVED***primary-contrast-0.1***REMOVED******REMOVED***'; ***REMOVED***md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***  md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) ***REMOVED***    color: '***REMOVED******REMOVED***warn-100***REMOVED******REMOVED***'; ***REMOVED***    md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***warn-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused ***REMOVED***      background: '***REMOVED******REMOVED***warn-contrast-0.1***REMOVED******REMOVED***'; ***REMOVED***md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) ***REMOVED***    color: '***REMOVED******REMOVED***primary-100***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused ***REMOVED***      background: '***REMOVED******REMOVED***primary-contrast-0.1***REMOVED******REMOVED***'; ***REMOVED***md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper ***REMOVED***  background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) ***REMOVED***    color: '***REMOVED******REMOVED***accent-A100***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused ***REMOVED***      background: '***REMOVED******REMOVED***accent-contrast-0.1***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-ink-bar ***REMOVED***    color: '***REMOVED******REMOVED***primary-600-1***REMOVED******REMOVED***';    background: '***REMOVED******REMOVED***primary-600-1***REMOVED******REMOVED***'; ***REMOVED***md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper ***REMOVED***  background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) ***REMOVED***    color: '***REMOVED******REMOVED***warn-100***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon ***REMOVED***      color: '***REMOVED******REMOVED***warn-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused ***REMOVED***      background: '***REMOVED******REMOVED***warn-contrast-0.1***REMOVED******REMOVED***'; ***REMOVED***md-toast.md-THEME_NAME-theme .md-toast-content ***REMOVED***  background-color: #323232;  color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***'; ***REMOVED***  md-toast.md-THEME_NAME-theme .md-toast-content .md-button ***REMOVED***    color: '***REMOVED******REMOVED***background-50***REMOVED******REMOVED***'; ***REMOVED***    md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight ***REMOVED***      color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***'; ***REMOVED***      md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-primary ***REMOVED***        color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***'; ***REMOVED***      md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-warn ***REMOVED***        color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***'; ***REMOVED***md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) ***REMOVED***  background-color: '***REMOVED******REMOVED***primary-color***REMOVED******REMOVED***';  color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-icon ***REMOVED***    color: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***';    fill: '***REMOVED******REMOVED***primary-contrast***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) .md-button[disabled] md-icon ***REMOVED***    color: '***REMOVED******REMOVED***primary-contrast-0.26***REMOVED******REMOVED***';    fill: '***REMOVED******REMOVED***primary-contrast-0.26***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent ***REMOVED***    background-color: '***REMOVED******REMOVED***accent-color***REMOVED******REMOVED***';    color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-ink-ripple ***REMOVED***      color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-icon ***REMOVED***      color: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***';      fill: '***REMOVED******REMOVED***accent-contrast***REMOVED******REMOVED***'; ***REMOVED***    md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-button[disabled] md-icon ***REMOVED***      color: '***REMOVED******REMOVED***accent-contrast-0.26***REMOVED******REMOVED***';      fill: '***REMOVED******REMOVED***accent-contrast-0.26***REMOVED******REMOVED***'; ***REMOVED***  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn ***REMOVED***    background-color: '***REMOVED******REMOVED***warn-color***REMOVED******REMOVED***';    color: '***REMOVED******REMOVED***warn-contrast***REMOVED******REMOVED***'; ***REMOVED***md-tooltip.md-THEME_NAME-theme ***REMOVED***  color: '***REMOVED******REMOVED***background-A100***REMOVED******REMOVED***'; ***REMOVED***  md-tooltip.md-THEME_NAME-theme ._md-content ***REMOVED***    background-color: '***REMOVED******REMOVED***foreground-2***REMOVED******REMOVED***'; ***REMOVED***"); 
***REMOVED***)();


***REMOVED***)(window, window.angular);
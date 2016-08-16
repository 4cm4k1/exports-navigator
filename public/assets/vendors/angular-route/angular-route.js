/**
 * @license AngularJS v1.5.8
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) ***REMOVED***'use strict';

/* global shallowCopy: true */

/**
 * Creates a shallow copy of an object, an array or a primitive.
 *
 * Assumes that there are no proto properties for objects.
 */
function shallowCopy(src, dst) ***REMOVED***
  if (isArray(src)) ***REMOVED***
    dst = dst || [];

    for (var i = 0, ii = src.length; i < ii; i++) ***REMOVED***
      dst[i] = src[i];
    ***REMOVED***
  ***REMOVED*** else if (isObject(src)) ***REMOVED***
    dst = dst || ***REMOVED******REMOVED***;

    for (var key in src) ***REMOVED***
      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) ***REMOVED***
        dst[key] = src[key];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  return dst || src;
***REMOVED***

/* global shallowCopy: false */

// There are necessary for `shallowCopy()` (included via `src/shallowCopy.js`).
// They are initialized inside the `$RouteProvider`, to ensure `window.angular` is available.
var isArray;
var isObject;

/**
 * @ngdoc module
 * @name ngRoute
 * @description
 *
 * # ngRoute
 *
 * The `ngRoute` module provides routing and deeplinking services and directives for angular apps.
 *
 * ## Example
 * See ***REMOVED***@link ngRoute.$route#example $route***REMOVED*** for an example of configuring and using `ngRoute`.
 *
 *
 * <div doc-module-components="ngRoute"></div>
 */
 /* global -ngRouteModule */
var ngRouteModule = angular.module('ngRoute', ['ng']).
                        provider('$route', $RouteProvider),
    $routeMinErr = angular.$$minErr('ngRoute');

/**
 * @ngdoc provider
 * @name $routeProvider
 *
 * @description
 *
 * Used for configuring routes.
 *
 * ## Example
 * See ***REMOVED***@link ngRoute.$route#example $route***REMOVED*** for an example of configuring and using `ngRoute`.
 *
 * ## Dependencies
 * Requires the ***REMOVED***@link ngRoute `ngRoute`***REMOVED*** module to be installed.
 */
function $RouteProvider() ***REMOVED***
  isArray = angular.isArray;
  isObject = angular.isObject;

  function inherit(parent, extra) ***REMOVED***
    return angular.extend(Object.create(parent), extra);
  ***REMOVED***

  var routes = ***REMOVED******REMOVED***;

  /**
   * @ngdoc method
   * @name $routeProvider#when
   *
   * @param ***REMOVED***string***REMOVED*** path Route path (matched against `$location.path`). If `$location.path`
   *    contains redundant trailing slash or is missing one, the route will still match and the
   *    `$location.path` will be updated to add or drop the trailing slash to exactly match the
   *    route definition.
   *
   *    * `path` can contain named groups starting with a colon: e.g. `:name`. All characters up
   *        to the next slash are matched and stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain named groups starting with a colon and ending with a star:
   *        e.g.`:name*`. All characters are eagerly stored in `$routeParams` under the given `name`
   *        when the route matches.
   *    * `path` can contain optional named groups with a question mark: e.g.`:name?`.
   *
   *    For example, routes like `/color/:color/largecode/:largecode*\/edit` will match
   *    `/color/brown/largecode/code/with/slashes/edit` and extract:
   *
   *    * `color: brown`
   *    * `largecode: code/with/slashes`.
   *
   *
   * @param ***REMOVED***Object***REMOVED*** route Mapping information to be assigned to `$route.current` on route
   *    match.
   *
   *    Object properties:
   *
   *    - `controller` – `***REMOVED***(string|function()=***REMOVED***` – Controller fn that should be associated with
   *      newly created scope or the name of a ***REMOVED***@link angular.Module#controller registered
   *      controller***REMOVED*** if passed as a string.
   *    - `controllerAs` – `***REMOVED***string=***REMOVED***` – An identifier name for a reference to the controller.
   *      If present, the controller will be published to scope under the `controllerAs` name.
   *    - `template` – `***REMOVED***string=|function()=***REMOVED***` – html template as a string or a function that
   *      returns an html template as a string which should be used by ***REMOVED***@link
   *      ngRoute.directive:ngView ngView***REMOVED*** or ***REMOVED***@link ng.directive:ngInclude ngInclude***REMOVED*** directives.
   *      This property takes precedence over `templateUrl`.
   *
   *      If `template` is a function, it will be called with the following parameters:
   *
   *      - `***REMOVED***Array.<Object>***REMOVED***` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `templateUrl` – `***REMOVED***string=|function()=***REMOVED***` – path or function that returns a path to an html
   *      template that should be used by ***REMOVED***@link ngRoute.directive:ngView ngView***REMOVED***.
   *
   *      If `templateUrl` is a function, it will be called with the following parameters:
   *
   *      - `***REMOVED***Array.<Object>***REMOVED***` - route parameters extracted from the current
   *        `$location.path()` by applying the current route
   *
   *    - `resolve` - `***REMOVED***Object.<string, function>=***REMOVED***` - An optional map of dependencies which should
   *      be injected into the controller. If any of these dependencies are promises, the router
   *      will wait for them all to be resolved or one to be rejected before the controller is
   *      instantiated.
   *      If all the promises are resolved successfully, the values of the resolved promises are
   *      injected and ***REMOVED***@link ngRoute.$route#$routeChangeSuccess $routeChangeSuccess***REMOVED*** event is
   *      fired. If any of the promises are rejected the
   *      ***REMOVED***@link ngRoute.$route#$routeChangeError $routeChangeError***REMOVED*** event is fired.
   *      For easier access to the resolved dependencies from the template, the `resolve` map will
   *      be available on the scope of the route, under `$resolve` (by default) or a custom name
   *      specified by the `resolveAs` property (see below). This can be particularly useful, when
   *      working with ***REMOVED***@link angular.Module#component components***REMOVED*** as route templates.<br />
   *      <div class="alert alert-warning">
   *        **Note:** If your scope already contains a property with this name, it will be hidden
   *        or overwritten. Make sure, you specify an appropriate name for this property, that
   *        does not collide with other properties on the scope.
   *      </div>
   *      The map object is:
   *
   *      - `key` – `***REMOVED***string***REMOVED***`: a name of a dependency to be injected into the controller.
   *      - `factory` - `***REMOVED***string|function***REMOVED***`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is ***REMOVED***@link auto.$injector#invoke injected***REMOVED***
   *        and the return value is treated as the dependency. If the result is a promise, it is
   *        resolved before its value is injected into the controller. Be aware that
   *        `ngRoute.$routeParams` will still refer to the previous route within these resolve
   *        functions.  Use `$route.current.params` to access the new route parameters, instead.
   *
   *    - `resolveAs` - `***REMOVED***string=***REMOVED***` - The name under which the `resolve` map will be available on
   *      the scope of the route. If omitted, defaults to `$resolve`.
   *
   *    - `redirectTo` – `***REMOVED***(string|function())=***REMOVED***` – value to update
   *      ***REMOVED***@link ng.$location $location***REMOVED*** path with and trigger route redirection.
   *
   *      If `redirectTo` is a function, it will be called with the following parameters:
   *
   *      - `***REMOVED***Object.<string>***REMOVED***` - route parameters extracted from the current
   *        `$location.path()` by applying the current route templateUrl.
   *      - `***REMOVED***string***REMOVED***` - current `$location.path()`
   *      - `***REMOVED***Object***REMOVED***` - current `$location.search()`
   *
   *      The custom `redirectTo` function is expected to return a string which will be used
   *      to update `$location.path()` and `$location.search()`.
   *
   *    - `[reloadOnSearch=true]` - `***REMOVED***boolean=***REMOVED***` - reload route when only `$location.search()`
   *      or `$location.hash()` changes.
   *
   *      If the option is set to `false` and url in the browser changes, then
   *      `$routeUpdate` event is broadcasted on the root scope.
   *
   *    - `[caseInsensitiveMatch=false]` - `***REMOVED***boolean=***REMOVED***` - match routes without being case sensitive
   *
   *      If the option is set to `true`, then the particular route can be matched without being
   *      case sensitive
   *
   * @returns ***REMOVED***Object***REMOVED*** self
   *
   * @description
   * Adds a new route definition to the `$route` service.
   */
  this.when = function(path, route) ***REMOVED***
    //copy original route object to preserve params inherited from proto chain
    var routeCopy = shallowCopy(route);
    if (angular.isUndefined(routeCopy.reloadOnSearch)) ***REMOVED***
      routeCopy.reloadOnSearch = true;
    ***REMOVED***
    if (angular.isUndefined(routeCopy.caseInsensitiveMatch)) ***REMOVED***
      routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch;
    ***REMOVED***
    routes[path] = angular.extend(
      routeCopy,
      path && pathRegExp(path, routeCopy)
    );

    // create redirection for trailing slashes
    if (path) ***REMOVED***
      var redirectPath = (path[path.length - 1] == '/')
            ? path.substr(0, path.length - 1)
            : path + '/';

      routes[redirectPath] = angular.extend(
        ***REMOVED***redirectTo: path***REMOVED***,
        pathRegExp(redirectPath, routeCopy)
      );
    ***REMOVED***

    return this;
  ***REMOVED***;

  /**
   * @ngdoc property
   * @name $routeProvider#caseInsensitiveMatch
   * @description
   *
   * A boolean property indicating if routes defined
   * using this provider should be matched using a case insensitive
   * algorithm. Defaults to `false`.
   */
  this.caseInsensitiveMatch = false;

   /**
    * @param path ***REMOVED***string***REMOVED*** path
    * @param opts ***REMOVED***Object***REMOVED*** options
    * @return ***REMOVED***?Object***REMOVED***
    *
    * @description
    * Normalizes the given path, returning a regular expression
    * and the original path.
    *
    * Inspired by pathRexp in visionmedia/express/lib/utils.js.
    */
  function pathRegExp(path, opts) ***REMOVED***
    var insensitive = opts.caseInsensitiveMatch,
        ret = ***REMOVED***
          originalPath: path,
          regexp: path
        ***REMOVED***,
        keys = ret.keys = [];

    path = path
      .replace(/([().])/g, '\\$1')
      .replace(/(\/)?:(\w+)(\*\?|[\?\*])?/g, function(_, slash, key, option) ***REMOVED***
        var optional = (option === '?' || option === '*?') ? '?' : null;
        var star = (option === '*' || option === '*?') ? '*' : null;
        keys.push(***REMOVED*** name: key, optional: !!optional ***REMOVED***);
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (star && '(.+?)' || '([^/]+)')
          + (optional || '')
          + ')'
          + (optional || '');
      ***REMOVED***)
      .replace(/([\/$\*])/g, '\\$1');

    ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
    return ret;
  ***REMOVED***

  /**
   * @ngdoc method
   * @name $routeProvider#otherwise
   *
   * @description
   * Sets route definition that will be used on route change when no other route definition
   * is matched.
   *
   * @param ***REMOVED***Object|string***REMOVED*** params Mapping information to be assigned to `$route.current`.
   * If called with a string, the value maps to `redirectTo`.
   * @returns ***REMOVED***Object***REMOVED*** self
   */
  this.otherwise = function(params) ***REMOVED***
    if (typeof params === 'string') ***REMOVED***
      params = ***REMOVED***redirectTo: params***REMOVED***;
    ***REMOVED***
    this.when(null, params);
    return this;
  ***REMOVED***;


  this.$get = ['$rootScope',
               '$location',
               '$routeParams',
               '$q',
               '$injector',
               '$templateRequest',
               '$sce',
      function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) ***REMOVED***

    /**
     * @ngdoc service
     * @name $route
     * @requires $location
     * @requires $routeParams
     *
     * @property ***REMOVED***Object***REMOVED*** current Reference to the current route definition.
     * The route definition contains:
     *
     *   - `controller`: The controller constructor as defined in the route definition.
     *   - `locals`: A map of locals which is used by ***REMOVED***@link ng.$controller $controller***REMOVED*** service for
     *     controller instantiation. The `locals` contain
     *     the resolved values of the `resolve` map. Additionally the `locals` also contain:
     *
     *     - `$scope` - The current route scope.
     *     - `$template` - The current route template HTML.
     *
     *     The `locals` will be assigned to the route scope's `$resolve` property. You can override
     *     the property name, using `resolveAs` in the route definition. See
     *     ***REMOVED***@link ngRoute.$routeProvider $routeProvider***REMOVED*** for more info.
     *
     * @property ***REMOVED***Object***REMOVED*** routes Object with all route configuration Objects as its properties.
     *
     * @description
     * `$route` is used for deep-linking URLs to controllers and views (HTML partials).
     * It watches `$location.url()` and tries to map the path to an existing route definition.
     *
     * Requires the ***REMOVED***@link ngRoute `ngRoute`***REMOVED*** module to be installed.
     *
     * You can define routes through ***REMOVED***@link ngRoute.$routeProvider $routeProvider***REMOVED***'s API.
     *
     * The `$route` service is typically used in conjunction with the
     * ***REMOVED***@link ngRoute.directive:ngView `ngView`***REMOVED*** directive and the
     * ***REMOVED***@link ngRoute.$routeParams `$routeParams`***REMOVED*** service.
     *
     * @example
     * This example shows how changing the URL hash causes the `$route` to match a route against the
     * URL, and the `ngView` pulls in the partial.
     *
     * <example name="$route-service" module="ngRouteExample"
     *          deps="angular-route.js" fixBase="true">
     *   <file name="index.html">
     *     <div ng-controller="MainController">
     *       Choose:
     *       <a href="Book/Moby">Moby</a> |
     *       <a href="Book/Moby/ch/1">Moby: Ch1</a> |
     *       <a href="Book/Gatsby">Gatsby</a> |
     *       <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
     *       <a href="Book/Scarlet">Scarlet Letter</a><br/>
     *
     *       <div ng-view></div>
     *
     *       <hr />
     *
     *       <pre>$location.path() = ***REMOVED******REMOVED***$location.path()***REMOVED******REMOVED***</pre>
     *       <pre>$route.current.templateUrl = ***REMOVED******REMOVED***$route.current.templateUrl***REMOVED******REMOVED***</pre>
     *       <pre>$route.current.params = ***REMOVED******REMOVED***$route.current.params***REMOVED******REMOVED***</pre>
     *       <pre>$route.current.scope.name = ***REMOVED******REMOVED***$route.current.scope.name***REMOVED******REMOVED***</pre>
     *       <pre>$routeParams = ***REMOVED******REMOVED***$routeParams***REMOVED******REMOVED***</pre>
     *     </div>
     *   </file>
     *
     *   <file name="book.html">
     *     controller: ***REMOVED******REMOVED***name***REMOVED******REMOVED***<br />
     *     Book Id: ***REMOVED******REMOVED***params.bookId***REMOVED******REMOVED***<br />
     *   </file>
     *
     *   <file name="chapter.html">
     *     controller: ***REMOVED******REMOVED***name***REMOVED******REMOVED***<br />
     *     Book Id: ***REMOVED******REMOVED***params.bookId***REMOVED******REMOVED***<br />
     *     Chapter Id: ***REMOVED******REMOVED***params.chapterId***REMOVED******REMOVED***
     *   </file>
     *
     *   <file name="script.js">
     *     angular.module('ngRouteExample', ['ngRoute'])
     *
     *      .controller('MainController', function($scope, $route, $routeParams, $location) ***REMOVED***
     *          $scope.$route = $route;
     *          $scope.$location = $location;
     *          $scope.$routeParams = $routeParams;
     *      ***REMOVED***)
     *
     *      .controller('BookController', function($scope, $routeParams) ***REMOVED***
     *          $scope.name = "BookController";
     *          $scope.params = $routeParams;
     *      ***REMOVED***)
     *
     *      .controller('ChapterController', function($scope, $routeParams) ***REMOVED***
     *          $scope.name = "ChapterController";
     *          $scope.params = $routeParams;
     *      ***REMOVED***)
     *
     *     .config(function($routeProvider, $locationProvider) ***REMOVED***
     *       $routeProvider
     *        .when('/Book/:bookId', ***REMOVED***
     *         templateUrl: 'book.html',
     *         controller: 'BookController',
     *         resolve: ***REMOVED***
     *           // I will cause a 1 second delay
     *           delay: function($q, $timeout) ***REMOVED***
     *             var delay = $q.defer();
     *             $timeout(delay.resolve, 1000);
     *             return delay.promise;
     *           ***REMOVED***
     *         ***REMOVED***
     *       ***REMOVED***)
     *       .when('/Book/:bookId/ch/:chapterId', ***REMOVED***
     *         templateUrl: 'chapter.html',
     *         controller: 'ChapterController'
     *       ***REMOVED***);
     *
     *       // configure html5 to get links working on jsfiddle
     *       $locationProvider.html5Mode(true);
     *     ***REMOVED***);
     *
     *   </file>
     *
     *   <file name="protractor.js" type="protractor">
     *     it('should load and compile correct template', function() ***REMOVED***
     *       element(by.linkText('Moby: Ch1')).click();
     *       var content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: ChapterController/);
     *       expect(content).toMatch(/Book Id\: Moby/);
     *       expect(content).toMatch(/Chapter Id\: 1/);
     *
     *       element(by.partialLinkText('Scarlet')).click();
     *
     *       content = element(by.css('[ng-view]')).getText();
     *       expect(content).toMatch(/controller\: BookController/);
     *       expect(content).toMatch(/Book Id\: Scarlet/);
     *     ***REMOVED***);
     *   </file>
     * </example>
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeStart
     * @eventType broadcast on root scope
     * @description
     * Broadcasted before a route change. At this  point the route services starts
     * resolving all of the dependencies needed for the route change to occur.
     * Typically this involves fetching the view template as well as any dependencies
     * defined in `resolve` route property. Once  all of the dependencies are resolved
     * `$routeChangeSuccess` is fired.
     *
     * The route change (and the `$location` change that triggered it) can be prevented
     * by calling `preventDefault` method of the event. See ***REMOVED***@link ng.$rootScope.Scope#$on***REMOVED***
     * for more details about event object.
     *
     * @param ***REMOVED***Object***REMOVED*** angularEvent Synthetic event object.
     * @param ***REMOVED***Route***REMOVED*** next Future route information.
     * @param ***REMOVED***Route***REMOVED*** current Current route information.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeSuccess
     * @eventType broadcast on root scope
     * @description
     * Broadcasted after a route change has happened successfully.
     * The `resolve` dependencies are now available in the `current.locals` property.
     *
     * ***REMOVED***@link ngRoute.directive:ngView ngView***REMOVED*** listens for the directive
     * to instantiate the controller and render the view.
     *
     * @param ***REMOVED***Object***REMOVED*** angularEvent Synthetic event object.
     * @param ***REMOVED***Route***REMOVED*** current Current route information.
     * @param ***REMOVED***Route|Undefined***REMOVED*** previous Previous route information, or undefined if current is
     * first route entered.
     */

    /**
     * @ngdoc event
     * @name $route#$routeChangeError
     * @eventType broadcast on root scope
     * @description
     * Broadcasted if any of the resolve promises are rejected.
     *
     * @param ***REMOVED***Object***REMOVED*** angularEvent Synthetic event object
     * @param ***REMOVED***Route***REMOVED*** current Current route information.
     * @param ***REMOVED***Route***REMOVED*** previous Previous route information.
     * @param ***REMOVED***Route***REMOVED*** rejection Rejection of the promise. Usually the error of the failed promise.
     */

    /**
     * @ngdoc event
     * @name $route#$routeUpdate
     * @eventType broadcast on root scope
     * @description
     * The `reloadOnSearch` property has been set to false, and we are reusing the same
     * instance of the Controller.
     *
     * @param ***REMOVED***Object***REMOVED*** angularEvent Synthetic event object
     * @param ***REMOVED***Route***REMOVED*** current Current/previous route information.
     */

    var forceReload = false,
        preparedRoute,
        preparedRouteIsUpdateOnly,
        $route = ***REMOVED***
          routes: routes,

          /**
           * @ngdoc method
           * @name $route#reload
           *
           * @description
           * Causes `$route` service to reload the current route even if
           * ***REMOVED***@link ng.$location $location***REMOVED*** hasn't changed.
           *
           * As a result of that, ***REMOVED***@link ngRoute.directive:ngView ngView***REMOVED***
           * creates new scope and reinstantiates the controller.
           */
          reload: function() ***REMOVED***
            forceReload = true;

            var fakeLocationEvent = ***REMOVED***
              defaultPrevented: false,
              preventDefault: function fakePreventDefault() ***REMOVED***
                this.defaultPrevented = true;
                forceReload = false;
              ***REMOVED***
            ***REMOVED***;

            $rootScope.$evalAsync(function() ***REMOVED***
              prepareRoute(fakeLocationEvent);
              if (!fakeLocationEvent.defaultPrevented) commitRoute();
            ***REMOVED***);
          ***REMOVED***,

          /**
           * @ngdoc method
           * @name $route#updateParams
           *
           * @description
           * Causes `$route` service to update the current URL, replacing
           * current route parameters with those specified in `newParams`.
           * Provided property names that match the route's path segment
           * definitions will be interpolated into the location's path, while
           * remaining properties will be treated as query params.
           *
           * @param ***REMOVED***!Object<string, string>***REMOVED*** newParams mapping of URL parameter names to values
           */
          updateParams: function(newParams) ***REMOVED***
            if (this.current && this.current.$$route) ***REMOVED***
              newParams = angular.extend(***REMOVED******REMOVED***, this.current.params, newParams);
              $location.path(interpolate(this.current.$$route.originalPath, newParams));
              // interpolate modifies newParams, only query params are left
              $location.search(newParams);
            ***REMOVED*** else ***REMOVED***
              throw $routeMinErr('norout', 'Tried updating route when with no current route');
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***;

    $rootScope.$on('$locationChangeStart', prepareRoute);
    $rootScope.$on('$locationChangeSuccess', commitRoute);

    return $route;

    /////////////////////////////////////////////////////

    /**
     * @param on ***REMOVED***string***REMOVED*** current url
     * @param route ***REMOVED***Object***REMOVED*** route regexp to match the url against
     * @return ***REMOVED***?Object***REMOVED***
     *
     * @description
     * Check if the route matches the current url.
     *
     * Inspired by match in
     * visionmedia/express/lib/router/router.js.
     */
    function switchRouteMatcher(on, route) ***REMOVED***
      var keys = route.keys,
          params = ***REMOVED******REMOVED***;

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) ***REMOVED***
        var key = keys[i - 1];

        var val = m[i];

        if (key && val) ***REMOVED***
          params[key.name] = val;
        ***REMOVED***
      ***REMOVED***
      return params;
    ***REMOVED***

    function prepareRoute($locationEvent) ***REMOVED***
      var lastRoute = $route.current;

      preparedRoute = parseRoute();
      preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route
          && angular.equals(preparedRoute.pathParams, lastRoute.pathParams)
          && !preparedRoute.reloadOnSearch && !forceReload;

      if (!preparedRouteIsUpdateOnly && (lastRoute || preparedRoute)) ***REMOVED***
        if ($rootScope.$broadcast('$routeChangeStart', preparedRoute, lastRoute).defaultPrevented) ***REMOVED***
          if ($locationEvent) ***REMOVED***
            $locationEvent.preventDefault();
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    function commitRoute() ***REMOVED***
      var lastRoute = $route.current;
      var nextRoute = preparedRoute;

      if (preparedRouteIsUpdateOnly) ***REMOVED***
        lastRoute.params = nextRoute.params;
        angular.copy(lastRoute.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', lastRoute);
      ***REMOVED*** else if (nextRoute || lastRoute) ***REMOVED***
        forceReload = false;
        $route.current = nextRoute;
        if (nextRoute) ***REMOVED***
          if (nextRoute.redirectTo) ***REMOVED***
            if (angular.isString(nextRoute.redirectTo)) ***REMOVED***
              $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params)
                       .replace();
            ***REMOVED*** else ***REMOVED***
              $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search()))
                       .replace();
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        $q.when(nextRoute).
          then(resolveLocals).
          then(function(locals) ***REMOVED***
            // after route change
            if (nextRoute == $route.current) ***REMOVED***
              if (nextRoute) ***REMOVED***
                nextRoute.locals = locals;
                angular.copy(nextRoute.params, $routeParams);
              ***REMOVED***
              $rootScope.$broadcast('$routeChangeSuccess', nextRoute, lastRoute);
            ***REMOVED***
          ***REMOVED***, function(error) ***REMOVED***
            if (nextRoute == $route.current) ***REMOVED***
              $rootScope.$broadcast('$routeChangeError', nextRoute, lastRoute, error);
            ***REMOVED***
          ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    function resolveLocals(route) ***REMOVED***
      if (route) ***REMOVED***
        var locals = angular.extend(***REMOVED******REMOVED***, route.resolve);
        angular.forEach(locals, function(value, key) ***REMOVED***
          locals[key] = angular.isString(value) ?
              $injector.get(value) :
              $injector.invoke(value, null, null, key);
        ***REMOVED***);
        var template = getTemplateFor(route);
        if (angular.isDefined(template)) ***REMOVED***
          locals['$template'] = template;
        ***REMOVED***
        return $q.all(locals);
      ***REMOVED***
    ***REMOVED***


    function getTemplateFor(route) ***REMOVED***
      var template, templateUrl;
      if (angular.isDefined(template = route.template)) ***REMOVED***
        if (angular.isFunction(template)) ***REMOVED***
          template = template(route.params);
        ***REMOVED***
      ***REMOVED*** else if (angular.isDefined(templateUrl = route.templateUrl)) ***REMOVED***
        if (angular.isFunction(templateUrl)) ***REMOVED***
          templateUrl = templateUrl(route.params);
        ***REMOVED***
        if (angular.isDefined(templateUrl)) ***REMOVED***
          route.loadedTemplateUrl = $sce.valueOf(templateUrl);
          template = $templateRequest(templateUrl);
        ***REMOVED***
      ***REMOVED***
      return template;
    ***REMOVED***


    /**
     * @returns ***REMOVED***Object***REMOVED*** the current active route, by matching it against the URL
     */
    function parseRoute() ***REMOVED***
      // Match a route
      var params, match;
      angular.forEach(routes, function(route, path) ***REMOVED***
        if (!match && (params = switchRouteMatcher($location.path(), route))) ***REMOVED***
          match = inherit(route, ***REMOVED***
            params: angular.extend(***REMOVED******REMOVED***, $location.search(), params),
            pathParams: params***REMOVED***);
          match.$$route = route;
        ***REMOVED***
      ***REMOVED***);
      // No route matched; fallback to "otherwise" route
      return match || routes[null] && inherit(routes[null], ***REMOVED***params: ***REMOVED******REMOVED***, pathParams:***REMOVED******REMOVED******REMOVED***);
    ***REMOVED***

    /**
     * @returns ***REMOVED***string***REMOVED*** interpolation of the redirect path with the parameters
     */
    function interpolate(string, params) ***REMOVED***
      var result = [];
      angular.forEach((string || '').split(':'), function(segment, i) ***REMOVED***
        if (i === 0) ***REMOVED***
          result.push(segment);
        ***REMOVED*** else ***REMOVED***
          var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/);
          var key = segmentMatch[1];
          result.push(params[key]);
          result.push(segmentMatch[2] || '');
          delete params[key];
        ***REMOVED***
      ***REMOVED***);
      return result.join('');
    ***REMOVED***
  ***REMOVED***];
***REMOVED***

ngRouteModule.provider('$routeParams', $RouteParamsProvider);


/**
 * @ngdoc service
 * @name $routeParams
 * @requires $route
 *
 * @description
 * The `$routeParams` service allows you to retrieve the current set of route parameters.
 *
 * Requires the ***REMOVED***@link ngRoute `ngRoute`***REMOVED*** module to be installed.
 *
 * The route parameters are a combination of ***REMOVED***@link ng.$location `$location`***REMOVED***'s
 * ***REMOVED***@link ng.$location#search `search()`***REMOVED*** and ***REMOVED***@link ng.$location#path `path()`***REMOVED***.
 * The `path` parameters are extracted when the ***REMOVED***@link ngRoute.$route `$route`***REMOVED*** path is matched.
 *
 * In case of parameter name collision, `path` params take precedence over `search` params.
 *
 * The service guarantees that the identity of the `$routeParams` object will remain unchanged
 * (but its properties will likely change) even when a route change occurs.
 *
 * Note that the `$routeParams` are only updated *after* a route change completes successfully.
 * This means that you cannot rely on `$routeParams` being correct in route resolve functions.
 * Instead you can use `$route.current.params` to access the new route's parameters.
 *
 * @example
 * ```js
 *  // Given:
 *  // URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
 *  // Route: /Chapter/:chapterId/Section/:sectionId
 *  //
 *  // Then
 *  $routeParams ==> ***REMOVED***chapterId:'1', sectionId:'2', search:'moby'***REMOVED***
 * ```
 */
function $RouteParamsProvider() ***REMOVED***
  this.$get = function() ***REMOVED*** return ***REMOVED******REMOVED***; ***REMOVED***;
***REMOVED***

ngRouteModule.directive('ngView', ngViewFactory);
ngRouteModule.directive('ngView', ngViewFillContentFactory);


/**
 * @ngdoc directive
 * @name ngView
 * @restrict ECA
 *
 * @description
 * # Overview
 * `ngView` is a directive that complements the ***REMOVED***@link ngRoute.$route $route***REMOVED*** service by
 * including the rendered template of the current route into the main layout (`index.html`) file.
 * Every time the current route changes, the included view changes with it according to the
 * configuration of the `$route` service.
 *
 * Requires the ***REMOVED***@link ngRoute `ngRoute`***REMOVED*** module to be installed.
 *
 * @animations
 * | Animation                        | Occurs                              |
 * |----------------------------------|-------------------------------------|
 * | ***REMOVED***@link ng.$animate#enter enter***REMOVED***  | when the new element is inserted to the DOM |
 * | ***REMOVED***@link ng.$animate#leave leave***REMOVED***  | when the old element is removed from to the DOM  |
 *
 * The enter and leave animation occur concurrently.
 *
 * @knownIssue If `ngView` is contained in an asynchronously loaded template (e.g. in another
 *             directive's templateUrl or in a template loaded using `ngInclude`), then you need to
 *             make sure that `$route` is instantiated in time to capture the initial
 *             `$locationChangeStart` event and load the appropriate view. One way to achieve this
 *             is to have it as a dependency in a `.run` block:
 *             `myModule.run(['$route', function() ***REMOVED******REMOVED***]);`
 *
 * @scope
 * @priority 400
 * @param ***REMOVED***string=***REMOVED*** onload Expression to evaluate whenever the view updates.
 *
 * @param ***REMOVED***string=***REMOVED*** autoscroll Whether `ngView` should call ***REMOVED***@link ng.$anchorScroll
 *                  $anchorScroll***REMOVED*** to scroll the viewport after the view is updated.
 *
 *                  - If the attribute is not set, disable scrolling.
 *                  - If the attribute is set without value, enable scrolling.
 *                  - Otherwise enable scrolling only if the `autoscroll` attribute value evaluated
 *                    as an expression yields a truthy value.
 * @example
    <example name="ngView-directive" module="ngViewExample"
             deps="angular-route.js;angular-animate.js"
             animations="true" fixBase="true">
      <file name="index.html">
        <div ng-controller="MainCtrl as main">
          Choose:
          <a href="Book/Moby">Moby</a> |
          <a href="Book/Moby/ch/1">Moby: Ch1</a> |
          <a href="Book/Gatsby">Gatsby</a> |
          <a href="Book/Gatsby/ch/4?key=value">Gatsby: Ch4</a> |
          <a href="Book/Scarlet">Scarlet Letter</a><br/>

          <div class="view-animate-container">
            <div ng-view class="view-animate"></div>
          </div>
          <hr />

          <pre>$location.path() = ***REMOVED******REMOVED***main.$location.path()***REMOVED******REMOVED***</pre>
          <pre>$route.current.templateUrl = ***REMOVED******REMOVED***main.$route.current.templateUrl***REMOVED******REMOVED***</pre>
          <pre>$route.current.params = ***REMOVED******REMOVED***main.$route.current.params***REMOVED******REMOVED***</pre>
          <pre>$routeParams = ***REMOVED******REMOVED***main.$routeParams***REMOVED******REMOVED***</pre>
        </div>
      </file>

      <file name="book.html">
        <div>
          controller: ***REMOVED******REMOVED***book.name***REMOVED******REMOVED***<br />
          Book Id: ***REMOVED******REMOVED***book.params.bookId***REMOVED******REMOVED***<br />
        </div>
      </file>

      <file name="chapter.html">
        <div>
          controller: ***REMOVED******REMOVED***chapter.name***REMOVED******REMOVED***<br />
          Book Id: ***REMOVED******REMOVED***chapter.params.bookId***REMOVED******REMOVED***<br />
          Chapter Id: ***REMOVED******REMOVED***chapter.params.chapterId***REMOVED******REMOVED***
        </div>
      </file>

      <file name="animations.css">
        .view-animate-container ***REMOVED***
          position:relative;
          height:100px!important;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
        ***REMOVED***

        .view-animate ***REMOVED***
          padding:10px;
        ***REMOVED***

        .view-animate.ng-enter, .view-animate.ng-leave ***REMOVED***
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s;

          display:block;
          width:100%;
          border-left:1px solid black;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:10px;
        ***REMOVED***

        .view-animate.ng-enter ***REMOVED***
          left:100%;
        ***REMOVED***
        .view-animate.ng-enter.ng-enter-active ***REMOVED***
          left:0;
        ***REMOVED***
        .view-animate.ng-leave.ng-leave-active ***REMOVED***
          left:-100%;
        ***REMOVED***
      </file>

      <file name="script.js">
        angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
          .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) ***REMOVED***
              $routeProvider
                .when('/Book/:bookId', ***REMOVED***
                  templateUrl: 'book.html',
                  controller: 'BookCtrl',
                  controllerAs: 'book'
                ***REMOVED***)
                .when('/Book/:bookId/ch/:chapterId', ***REMOVED***
                  templateUrl: 'chapter.html',
                  controller: 'ChapterCtrl',
                  controllerAs: 'chapter'
                ***REMOVED***);

              $locationProvider.html5Mode(true);
          ***REMOVED***])
          .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) ***REMOVED***
              this.$route = $route;
              this.$location = $location;
              this.$routeParams = $routeParams;
          ***REMOVED***])
          .controller('BookCtrl', ['$routeParams', function($routeParams) ***REMOVED***
            this.name = "BookCtrl";
            this.params = $routeParams;
          ***REMOVED***])
          .controller('ChapterCtrl', ['$routeParams', function($routeParams) ***REMOVED***
            this.name = "ChapterCtrl";
            this.params = $routeParams;
          ***REMOVED***]);

      </file>

      <file name="protractor.js" type="protractor">
        it('should load and compile correct template', function() ***REMOVED***
          element(by.linkText('Moby: Ch1')).click();
          var content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: ChapterCtrl/);
          expect(content).toMatch(/Book Id\: Moby/);
          expect(content).toMatch(/Chapter Id\: 1/);

          element(by.partialLinkText('Scarlet')).click();

          content = element(by.css('[ng-view]')).getText();
          expect(content).toMatch(/controller\: BookCtrl/);
          expect(content).toMatch(/Book Id\: Scarlet/);
        ***REMOVED***);
      </file>
    </example>
 */


/**
 * @ngdoc event
 * @name ngView#$viewContentLoaded
 * @eventType emit on the current ngView scope
 * @description
 * Emitted every time the ngView content is reloaded.
 */
ngViewFactory.$inject = ['$route', '$anchorScroll', '$animate'];
function ngViewFactory($route, $anchorScroll, $animate) ***REMOVED***
  return ***REMOVED***
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    link: function(scope, $element, attr, ctrl, $transclude) ***REMOVED***
        var currentScope,
            currentElement,
            previousLeaveAnimation,
            autoScrollExp = attr.autoscroll,
            onloadExp = attr.onload || '';

        scope.$on('$routeChangeSuccess', update);
        update();

        function cleanupLastView() ***REMOVED***
          if (previousLeaveAnimation) ***REMOVED***
            $animate.cancel(previousLeaveAnimation);
            previousLeaveAnimation = null;
          ***REMOVED***

          if (currentScope) ***REMOVED***
            currentScope.$destroy();
            currentScope = null;
          ***REMOVED***
          if (currentElement) ***REMOVED***
            previousLeaveAnimation = $animate.leave(currentElement);
            previousLeaveAnimation.then(function() ***REMOVED***
              previousLeaveAnimation = null;
            ***REMOVED***);
            currentElement = null;
          ***REMOVED***
        ***REMOVED***

        function update() ***REMOVED***
          var locals = $route.current && $route.current.locals,
              template = locals && locals.$template;

          if (angular.isDefined(template)) ***REMOVED***
            var newScope = scope.$new();
            var current = $route.current;

            // Note: This will also link all children of ng-view that were contained in the original
            // html. If that content contains controllers, ... they could pollute/change the scope.
            // However, using ng-view on an element with additional content does not make sense...
            // Note: We can't remove them in the cloneAttchFn of $transclude as that
            // function is called before linking the content, which would apply child
            // directives to non existing elements.
            var clone = $transclude(newScope, function(clone) ***REMOVED***
              $animate.enter(clone, null, currentElement || $element).then(function onNgViewEnter() ***REMOVED***
                if (angular.isDefined(autoScrollExp)
                  && (!autoScrollExp || scope.$eval(autoScrollExp))) ***REMOVED***
                  $anchorScroll();
                ***REMOVED***
              ***REMOVED***);
              cleanupLastView();
            ***REMOVED***);

            currentElement = clone;
            currentScope = current.scope = newScope;
            currentScope.$emit('$viewContentLoaded');
            currentScope.$eval(onloadExp);
          ***REMOVED*** else ***REMOVED***
            cleanupLastView();
          ***REMOVED***
        ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

// This directive is called during the $transclude call of the first `ngView` directive.
// It will replace and compile the content of the element with the loaded template.
// We need this directive so that the element content is already filled when
// the link function of another directive on the same element as ngView
// is called.
ngViewFillContentFactory.$inject = ['$compile', '$controller', '$route'];
function ngViewFillContentFactory($compile, $controller, $route) ***REMOVED***
  return ***REMOVED***
    restrict: 'ECA',
    priority: -400,
    link: function(scope, $element) ***REMOVED***
      var current = $route.current,
          locals = current.locals;

      $element.html(locals.$template);

      var link = $compile($element.contents());

      if (current.controller) ***REMOVED***
        locals.$scope = scope;
        var controller = $controller(current.controller, locals);
        if (current.controllerAs) ***REMOVED***
          scope[current.controllerAs] = controller;
        ***REMOVED***
        $element.data('$ngControllerController', controller);
        $element.children().data('$ngControllerController', controller);
      ***REMOVED***
      scope[current.resolveAs || '$resolve'] = locals;

      link(scope);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***


***REMOVED***)(window, window.angular);

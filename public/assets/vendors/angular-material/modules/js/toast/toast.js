/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
(function( window, angular, undefined )***REMOVED***
"use strict";

/**
  * @ngdoc module
  * @name material.components.toast
  * @description
  * Toast
  */
angular.module('material.components.toast', [
  'material.core',
  'material.components.button'
])
  .directive('mdToast', MdToastDirective)
  .provider('$mdToast', MdToastProvider);

/* ngInject */
function MdToastDirective($mdToast) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    link: function postLink(scope, element) ***REMOVED***
      element.addClass('_md');     // private md component indicator for styling
      
      // When navigation force destroys an interimElement, then
      // listen and $destroy() that interim instance...
      scope.$on('$destroy', function() ***REMOVED***
        $mdToast.destroy();
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MdToastDirective.$inject = ["$mdToast"];

/**
  * @ngdoc service
  * @name $mdToast
  * @module material.components.toast
  *
  * @description
  * `$mdToast` is a service to build a toast notification on any position
  * on the screen with an optional duration, and provides a simple promise API.
  *
  * The toast will be always positioned at the `bottom`, when the screen size is
  * between `600px` and `959px` (`sm` breakpoint)
  *
  * ## Restrictions on custom toasts
  * - The toast's template must have an outer `<md-toast>` element.
  * - For a toast action, use element with class `md-action`.
  * - Add the class `md-capsule` for curved corners.
  *
  * ## Parent container notes
  *
  * The toast is positioned using absolute positioning relative to it's first non-static parent
  * container. Thus, if the requested parent container uses static positioning, we will temporarily
  * set it's positioning to `relative` while the toast is visible and reset it when the toast is
  * hidden.
  *
  * Because of this, it is usually best to ensure that the parent container has a fixed height and
  * prevents scrolling by setting the `overflow: hidden;` style. Since the position is based off of
  * the parent's height, the toast may be mispositioned if you allow the parent to scroll.
  *
  * You can, however, have a scrollable element inside of the container; just make sure the
  * container itself does not scroll.
  *
  * <hljs lang="html">
  * <div layout-fill id="toast-container">
  *   <md-content>
  *     I can have lots of content and scroll!
  *   </md-content>
  * </div>
  * </hljs>
  *
  * @usage
  * <hljs lang="html">
  * <div ng-controller="MyController">
  *   <md-button ng-click="openToast()">
  *     Open a Toast!
  *   </md-button>
  * </div>
  * </hljs>
  *
  * <hljs lang="js">
  * var app = angular.module('app', ['ngMaterial']);
  * app.controller('MyController', function($scope, $mdToast) ***REMOVED***
  *   $scope.openToast = function($event) ***REMOVED***
  *     $mdToast.show($mdToast.simple().textContent('Hello!'));
  *     // Could also do $mdToast.showSimple('Hello');
  *   ***REMOVED***;
  * ***REMOVED***);
  * </hljs>
  */

/**
 * @ngdoc method
 * @name $mdToast#showSimple
 * 
 * @param ***REMOVED***string***REMOVED*** message The message to display inside the toast
 * @description
 * Convenience method which builds and shows a simple toast.
 *
 * @returns ***REMOVED***promise***REMOVED*** A promise that can be resolved with `$mdToast.hide()` or
 * rejected with `$mdToast.cancel()`.
 *
 */

 /**
  * @ngdoc method
  * @name $mdToast#simple
  *
  * @description
  * Builds a preconfigured toast.
  *
  * @returns ***REMOVED***obj***REMOVED*** a `$mdToastPreset` with the following chainable configuration methods.
  *
  * _**Note:** These configuration methods are provided in addition to the methods provided by
  * the `build()` and `show()` methods below._
  *
  * <table class="md-api-table methods">
  *    <thead>
  *      <tr>
  *        <th>Method</th>
  *        <th>Description</th>
  *      </tr>
  *    </thead>
  *    <tbody>
  *      <tr>
  *        <td>`.textContent(string)`</td>
  *        <td>Sets the toast content to the specified string</td>
  *      </tr>
  *      <tr>
  *        <td>`.action(string)`</td>
  *        <td>
  *          Adds an action button. <br/>
  *          If clicked, the promise (returned from `show()`)
  *          will resolve with the value `'ok'`; otherwise, it is resolved with `true` after a `hideDelay`
  *          timeout
  *        </td>
  *      </tr>
  *      <tr>
  *        <td>`.highlightAction(boolean)`</td>
  *        <td>
  *          Whether or not the action button will have an additional highlight class.<br/>
  *          By default the `accent` color will be applied to the action button.
  *        </td>
  *      </tr>
  *      <tr>
  *        <td>`.highlightClass(string)`</td>
  *        <td>
  *          If set, the given class will be applied to the highlighted action button.<br/>
  *          This allows you to specify the highlight color easily. Highlight classes are `md-primary`, `md-warn`
  *          and `md-accent`
  *        </td>
  *      </tr>
  *      <tr>
  *        <td>`.capsule(boolean)`</td>
  *        <td>Whether or not to add the `md-capsule` class to the toast to provide rounded corners</td>
  *      </tr>
  *      <tr>
  *        <td>`.theme(string)`</td>
  *        <td>Sets the theme on the toast to the requested theme. Default is `$mdThemingProvider`'s default.</td>
  *      </tr>
  *    </tbody>
  * </table>
  *
  */

/**
  * @ngdoc method
  * @name $mdToast#updateTextContent
  *
  * @description
  * Updates the content of an existing toast. Useful for updating things like counts, etc.
  *
  */

 /**
  * @ngdoc method
  * @name $mdToast#build
  *
  * @description
  * Creates a custom `$mdToastPreset` that you can configure.
  *
  * @returns ***REMOVED***obj***REMOVED*** a `$mdToastPreset` with the chainable configuration methods for shows' options (see below).
  */

 /**
  * @ngdoc method
  * @name $mdToast#show
  *
  * @description Shows the toast.
  *
  * @param ***REMOVED***object***REMOVED*** optionsOrPreset Either provide an `$mdToastPreset` returned from `simple()`
  * and `build()`, or an options object with the following properties:
  *
  *   - `templateUrl` - `***REMOVED***string=***REMOVED***`: The url of an html template file that will
  *     be used as the content of the toast. Restrictions: the template must
  *     have an outer `md-toast` element.
  *   - `template` - `***REMOVED***string=***REMOVED***`: Same as templateUrl, except this is an actual
  *     template string.
  *   - `autoWrap` - `***REMOVED***boolean=***REMOVED***`: Whether or not to automatically wrap the template content with a
  *     `<div class="md-toast-content">` if one is not provided. Defaults to true. Can be disabled if you provide a
  *     custom toast directive.
  *   - `scope` - `***REMOVED***object=***REMOVED***`: the scope to link the template / controller to. If none is specified, it will create a new child scope.
  *     This scope will be destroyed when the toast is removed unless `preserveScope` is set to true.
  *   - `preserveScope` - `***REMOVED***boolean=***REMOVED***`: whether to preserve the scope when the element is removed. Default is false
  *   - `hideDelay` - `***REMOVED***number=***REMOVED***`: How many milliseconds the toast should stay
  *     active before automatically closing.  Set to 0 or false to have the toast stay open until
  *     closed manually. Default: 3000.
  *   - `position` - `***REMOVED***string=***REMOVED***`: Sets the position of the toast. <br/>
  *     Available: any combination of `'bottom'`, `'left'`, `'top'`, `'right'`, `'end'` and `'start'`.
  *     The properties `'end'` and `'start'` are dynamic and can be used for RTL support.<br/>
  *     Default combination: `'bottom left'`.
  *   - `controller` - `***REMOVED***string=***REMOVED***`: The controller to associate with this toast.
  *     The controller will be injected the local `$mdToast.hide( )`, which is a function
  *     used to hide the toast.
  *   - `locals` - `***REMOVED***string=***REMOVED***`: An object containing key/value pairs. The keys will
  *     be used as names of values to inject into the controller. For example,
  *     `locals: ***REMOVED***three: 3***REMOVED***` would inject `three` into the controller with the value
  *     of 3.
  *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
  *   - `resolve` - `***REMOVED***object=***REMOVED***`: Similar to locals, except it takes promises as values
  *     and the toast will not open until the promises resolve.
  *   - `controllerAs` - `***REMOVED***string=***REMOVED***`: An alias to assign the controller to on the scope.
  *   - `parent` - `***REMOVED***element=***REMOVED***`: The element to append the toast to. Defaults to appending
  *     to the root element of the application.
  *
  * @returns ***REMOVED***promise***REMOVED*** A promise that can be resolved with `$mdToast.hide()` or
  * rejected with `$mdToast.cancel()`. `$mdToast.hide()` will resolve either with a Boolean
  * value == 'true' or the value passed as an argument to `$mdToast.hide()`.
  * And `$mdToast.cancel()` will resolve the promise with a Boolean value == 'false'
  */

/**
  * @ngdoc method
  * @name $mdToast#hide
  *
  * @description
  * Hide an existing toast and resolve the promise returned from `$mdToast.show()`.
  *
  * @param ***REMOVED****=***REMOVED*** response An argument for the resolved promise.
  *
  * @returns ***REMOVED***promise***REMOVED*** a promise that is called when the existing element is removed from the DOM.
  * The promise is resolved with either a Boolean value == 'true' or the value passed as the
  * argument to `.hide()`.
  *
  */

/**
  * @ngdoc method
  * @name $mdToast#cancel
  *
  * @description
  * `DEPRECATED` - The promise returned from opening a toast is used only to notify about the closing of the toast.
  * As such, there isn't any reason to also allow that promise to be rejected,
  * since it's not clear what the difference between resolve and reject would be.
  *
  * Hide the existing toast and reject the promise returned from
  * `$mdToast.show()`.
  *
  * @param ***REMOVED****=***REMOVED*** response An argument for the rejected promise.
  *
  * @returns ***REMOVED***promise***REMOVED*** a promise that is called when the existing element is removed from the DOM
  * The promise is resolved with a Boolean value == 'false'.
  *
  */

function MdToastProvider($$interimElementProvider) ***REMOVED***
  // Differentiate promise resolves: hide timeout (value == true) and hide action clicks (value == ok).
  var ACTION_RESOLVE = 'ok';

  var activeToastContent;
  var $mdToast = $$interimElementProvider('$mdToast')
    .setDefaults(***REMOVED***
      methods: ['position', 'hideDelay', 'capsule', 'parent', 'position' ],
      options: toastDefaultOptions
    ***REMOVED***)
    .addPreset('simple', ***REMOVED***
      argOption: 'textContent',
      methods: ['textContent', 'content', 'action', 'highlightAction', 'highlightClass', 'theme', 'parent' ],
      options: /* ngInject */ ["$mdToast", "$mdTheming", function($mdToast, $mdTheming) ***REMOVED***
        return ***REMOVED***
          template:
            '<md-toast md-theme="***REMOVED******REMOVED*** toast.theme ***REMOVED******REMOVED***" ng-class="***REMOVED***\'md-capsule\': toast.capsule***REMOVED***">' +
            '  <div class="md-toast-content">' +
            '    <span flex class="md-toast-text" role="alert" aria-relevant="all" aria-atomic="true">' +
            '      ***REMOVED******REMOVED*** toast.content ***REMOVED******REMOVED***' +
            '    </span>' +
            '    <md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()" ' +
            '        ng-class="highlightClasses">' +
            '      ***REMOVED******REMOVED*** toast.action ***REMOVED******REMOVED***' +
            '    </md-button>' +
            '  </div>' +
            '</md-toast>',
          controller: /* ngInject */ ["$scope", function mdToastCtrl($scope) ***REMOVED***
            var self = this;

            if (self.highlightAction) ***REMOVED***
              $scope.highlightClasses = [
                'md-highlight',
                self.highlightClass
              ]
            ***REMOVED***

            $scope.$watch(function() ***REMOVED*** return activeToastContent; ***REMOVED***, function() ***REMOVED***
              self.content = activeToastContent;
            ***REMOVED***);

            this.resolve = function() ***REMOVED***
              $mdToast.hide( ACTION_RESOLVE );
            ***REMOVED***;
          ***REMOVED***],
          theme: $mdTheming.defaultTheme(),
          controllerAs: 'toast',
          bindToController: true
        ***REMOVED***;
      ***REMOVED***]
    ***REMOVED***)
    .addMethod('updateTextContent', updateTextContent)
    .addMethod('updateContent', updateTextContent);

    function updateTextContent(newContent) ***REMOVED***
      activeToastContent = newContent;
    ***REMOVED***

  toastDefaultOptions.$inject = ["$animate", "$mdToast", "$mdUtil", "$mdMedia"];
    return $mdToast;

  /* ngInject */
  function toastDefaultOptions($animate, $mdToast, $mdUtil, $mdMedia) ***REMOVED***
    var SWIPE_EVENTS = '$md.swipeleft $md.swiperight $md.swipeup $md.swipedown';
    return ***REMOVED***
      onShow: onShow,
      onRemove: onRemove,
      position: 'bottom left',
      themable: true,
      hideDelay: 3000,
      autoWrap: true,
      transformTemplate: function(template, options) ***REMOVED***
        var shouldAddWrapper = options.autoWrap && template && !/md-toast-content/g.test(template);

        if (shouldAddWrapper) ***REMOVED***
          // Root element of template will be <md-toast>. We need to wrap all of its content inside of
          // of <div class="md-toast-content">. All templates provided here should be static, developer-controlled
          // content (meaning we're not attempting to guard against XSS).
          var templateRoot = document.createElement('md-template');
          templateRoot.innerHTML = template;

          // Iterate through all root children, to detect possible md-toast directives.
          for (var i = 0; i < templateRoot.children.length; i++) ***REMOVED***
            if (templateRoot.children[i].nodeName === 'MD-TOAST') ***REMOVED***
              var wrapper = angular.element('<div class="md-toast-content">');

              // Wrap the children of the `md-toast` directive in jqLite, to be able to append multiple
              // nodes with the same execution.
              wrapper.append(angular.element(templateRoot.children[i].childNodes));

              // Append the new wrapped element to the `md-toast` directive.
              templateRoot.children[i].appendChild(wrapper[0]);
            ***REMOVED***
          ***REMOVED***


          return templateRoot.outerHTML;
        ***REMOVED***

        return template || '';
      ***REMOVED***
    ***REMOVED***;

    function onShow(scope, element, options) ***REMOVED***
      activeToastContent = options.textContent || options.content; // support deprecated #content method

      var isSmScreen = !$mdMedia('gt-sm');

      element = $mdUtil.extractElementByName(element, 'md-toast', true);
      options.element = element;

      options.onSwipe = function(ev, gesture) ***REMOVED***
        //Add the relevant swipe class to the element so it can animate correctly
        var swipe = ev.type.replace('$md.','');
        var direction = swipe.replace('swipe', '');

        // If the swipe direction is down/up but the toast came from top/bottom don't fade away
        // Unless the screen is small, then the toast always on bottom
        if ((direction === 'down' && options.position.indexOf('top') != -1 && !isSmScreen) ||
            (direction === 'up' && (options.position.indexOf('bottom') != -1 || isSmScreen))) ***REMOVED***
          return;
        ***REMOVED***

        if ((direction === 'left' || direction === 'right') && isSmScreen) ***REMOVED***
          return;
        ***REMOVED***

        element.addClass('_md-' + swipe);
        $mdUtil.nextTick($mdToast.cancel);
      ***REMOVED***;
      options.openClass = toastOpenClass(options.position);


      // 'top left' -> 'md-top md-left'
      options.parent.addClass(options.openClass);

      // static is the default position
      if ($mdUtil.hasComputedStyle(options.parent, 'position', 'static')) ***REMOVED***
        options.parent.css('position', 'relative');
      ***REMOVED***

      element.on(SWIPE_EVENTS, options.onSwipe);
      element.addClass(isSmScreen ? '_md-bottom' : options.position.split(' ').map(function(pos) ***REMOVED***
        return '_md-' + pos;
      ***REMOVED***).join(' '));

      if (options.parent) options.parent.addClass('_md-toast-animating');
      return $animate.enter(element, options.parent).then(function() ***REMOVED***
        if (options.parent) options.parent.removeClass('_md-toast-animating');
      ***REMOVED***);
    ***REMOVED***

    function onRemove(scope, element, options) ***REMOVED***
      element.off(SWIPE_EVENTS, options.onSwipe);
      if (options.parent) options.parent.addClass('_md-toast-animating');
      if (options.openClass) options.parent.removeClass(options.openClass);

      return ((options.$destroy == true) ? element.remove() : $animate.leave(element))
        .then(function () ***REMOVED***
          if (options.parent) options.parent.removeClass('_md-toast-animating');
          if ($mdUtil.hasComputedStyle(options.parent, 'position', 'static')) ***REMOVED***
            options.parent.css('position', '');
          ***REMOVED***
        ***REMOVED***);
    ***REMOVED***

    function toastOpenClass(position) ***REMOVED***
      // For mobile, always open full-width on bottom
      if (!$mdMedia('gt-xs')) ***REMOVED***
        return '_md-toast-open-bottom';
      ***REMOVED***

      return '_md-toast-open-' +
        (position.indexOf('top') > -1 ? 'top' : 'bottom');
    ***REMOVED***
  ***REMOVED***

***REMOVED***
MdToastProvider.$inject = ["$$interimElementProvider"];

***REMOVED***)(window, window.angular);
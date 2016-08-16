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
 * @name material.components.dialog
 */
angular
  .module('material.components.dialog', [
    'material.core',
    'material.components.backdrop'
  ])
  .directive('mdDialog', MdDialogDirective)
  .provider('$mdDialog', MdDialogProvider);

/**
 * @ngdoc directive
 * @name mdDialog
 * @module material.components.dialog
 *
 * @restrict E
 *
 * @description
 * `<md-dialog>` - The dialog's template must be inside this element.
 *
 * Inside, use an `<md-dialog-content>` element for the dialog's content, and use
 * an `<md-dialog-actions>` element for the dialog's actions.
 *
 * ## CSS
 * - `.md-dialog-content` - class that sets the padding on the content as the spec file
 *
 * ## Notes
 * - If you specify an `id` for the `<md-dialog>`, the `<md-dialog-content>` will have the same `id`
 * prefixed with `dialogContent_`.
 *
 * @usage
 * ### Dialog template
 * <hljs lang="html">
 * <md-dialog aria-label="List dialog">
 *   <md-dialog-content>
 *     <md-list>
 *       <md-list-item ng-repeat="item in items">
 *         <p>Number ***REMOVED******REMOVED***item***REMOVED******REMOVED***</p>
 *       </md-list-item>
 *     </md-list>
 *   </md-dialog-content>
 *   <md-dialog-actions>
 *     <md-button ng-click="closeDialog()" class="md-primary">Close Dialog</md-button>
 *   </md-dialog-actions>
 * </md-dialog>
 * </hljs>
 */
function MdDialogDirective($$rAF, $mdTheming, $mdDialog) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    link: function(scope, element) ***REMOVED***
      element.addClass('_md');     // private md component indicator for styling

      $mdTheming(element);
      $$rAF(function() ***REMOVED***
        var images;
        var content = element[0].querySelector('md-dialog-content');

        if (content) ***REMOVED***
          images = content.getElementsByTagName('img');
          addOverflowClass();
          //-- delayed image loading may impact scroll height, check after images are loaded
          angular.element(images).on('load', addOverflowClass);
        ***REMOVED***

        scope.$on('$destroy', function() ***REMOVED***
          $mdDialog.destroy(element);
        ***REMOVED***);

        /**
         *
         */
        function addOverflowClass() ***REMOVED***
          element.toggleClass('md-content-overflow', content.scrollHeight > content.clientHeight);
        ***REMOVED***


      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
MdDialogDirective.$inject = ["$$rAF", "$mdTheming", "$mdDialog"];

/**
 * @ngdoc service
 * @name $mdDialog
 * @module material.components.dialog
 *
 * @description
 * `$mdDialog` opens a dialog over the app to inform users about critical information or require
 *  them to make decisions. There are two approaches for setup: a simple promise API
 *  and regular object syntax.
 *
 * ## Restrictions
 *
 * - The dialog is always given an isolate scope.
 * - The dialog's template must have an outer `<md-dialog>` element.
 *   Inside, use an `<md-dialog-content>` element for the dialog's content, and use
 *   an `<md-dialog-actions>` element for the dialog's actions.
 * - Dialogs must cover the entire application to keep interactions inside of them.
 * Use the `parent` option to change where dialogs are appended.
 *
 * ## Sizing
 * - Complex dialogs can be sized with `flex="percentage"`, i.e. `flex="66"`.
 * - Default max-width is 80% of the `rootElement` or `parent`.
 *
 * ## CSS
 * - `.md-dialog-content` - class that sets the padding on the content as the spec file
 *
 * @usage
 * <hljs lang="html">
 * <div  ng-app="demoApp" ng-controller="EmployeeController">
 *   <div>
 *     <md-button ng-click="showAlert()" class="md-raised md-warn">
 *       Employee Alert!
 *       </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="showDialog($event)" class="md-raised">
 *       Custom Dialog
 *       </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="closeAlert()" ng-disabled="!hasAlert()" class="md-raised">
 *       Close Alert
 *     </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="showGreeting($event)" class="md-raised md-primary" >
 *       Greet Employee
 *       </md-button>
 *   </div>
 * </div>
 * </hljs>
 *
 * ### JavaScript: object syntax
 * <hljs lang="js">
 * (function(angular, undefined)***REMOVED***
 *   "use strict";
 *
 *   angular
 *    .module('demoApp', ['ngMaterial'])
 *    .controller('AppCtrl', AppController);
 *
 *   function AppController($scope, $mdDialog) ***REMOVED***
 *     var alert;
 *     $scope.showAlert = showAlert;
 *     $scope.showDialog = showDialog;
 *     $scope.items = [1, 2, 3];
 *
 *     // Internal method
 *     function showAlert() ***REMOVED***
 *       alert = $mdDialog.alert(***REMOVED***
 *         title: 'Attention',
 *         textContent: 'This is an example of how easy dialogs can be!',
 *         ok: 'Close'
 *       ***REMOVED***);
 *
 *       $mdDialog
 *         .show( alert )
 *         .finally(function() ***REMOVED***
 *           alert = undefined;
 *         ***REMOVED***);
 *     ***REMOVED***
 *
 *     function showDialog($event) ***REMOVED***
 *        var parentEl = angular.element(document.body);
 *        $mdDialog.show(***REMOVED***
 *          parent: parentEl,
 *          targetEvent: $event,
 *          template:
 *            '<md-dialog aria-label="List dialog">' +
 *            '  <md-dialog-content>'+
 *            '    <md-list>'+
 *            '      <md-list-item ng-repeat="item in items">'+
 *            '       <p>Number ***REMOVED******REMOVED***item***REMOVED******REMOVED***</p>' +
 *            '      </md-item>'+
 *            '    </md-list>'+
 *            '  </md-dialog-content>' +
 *            '  <md-dialog-actions>' +
 *            '    <md-button ng-click="closeDialog()" class="md-primary">' +
 *            '      Close Dialog' +
 *            '    </md-button>' +
 *            '  </md-dialog-actions>' +
 *            '</md-dialog>',
 *          locals: ***REMOVED***
 *            items: $scope.items
 *          ***REMOVED***,
 *          controller: DialogController
 *       ***REMOVED***);
 *       function DialogController($scope, $mdDialog, items) ***REMOVED***
 *         $scope.items = items;
 *         $scope.closeDialog = function() ***REMOVED***
 *           $mdDialog.hide();
 *         ***REMOVED***
 *       ***REMOVED***
 *     ***REMOVED***
 *   ***REMOVED***
 * ***REMOVED***)(angular);
 * </hljs>
 *
 * ### Pre-Rendered Dialogs
 * By using the `contentElement` option, it is possible to use an already existing element in the DOM.
 *
 * <hljs lang="js">
 *   $scope.showPrerenderedDialog = function() ***REMOVED***
 *     $mdDialog.show(***REMOVED***
 *       contentElement: '#myStaticDialog'
 *       parent: angular.element(document.body)
 *     ***REMOVED***);
 *   ***REMOVED***;
 * </hljs>
 *
 * When using a string as value, `$mdDialog` will automatically query the DOM for the specified CSS selector.
 *
 * <hljs lang="html">
 *   <div style="visibility: hidden">
 *     <div class="md-dialog-container" id="myStaticDialog">
 *       <md-dialog>
 *         This is a pre-rendered dialog.
 *       </md-dialog>
 *     </div>
 *   </div>
 * </hljs>
 *
 * **Notice**: It is important, to use the `.md-dialog-container` as the content element, otherwise the dialog
 * will not show up.
 *
 * It also possible to use a DOM element for the `contentElement` option.
 * - `contentElement: document.querySelector('#myStaticDialog')`
 * - `contentElement: angular.element(TEMPLATE)`
 *
 * When using a `template` as content element, it will be not compiled upon open.
 * This allows you to compile the element yourself and use it each time the dialog opens.
 *
 * ### JavaScript: promise API syntax, custom dialog template
 * <hljs lang="js">
 * (function(angular, undefined)***REMOVED***
 *   "use strict";
 *
 *   angular
 *     .module('demoApp', ['ngMaterial'])
 *     .controller('EmployeeController', EmployeeEditor)
 *     .controller('GreetingController', GreetingController);
 *
 *   // Fictitious Employee Editor to show how to use simple and complex dialogs.
 *
 *   function EmployeeEditor($scope, $mdDialog) ***REMOVED***
 *     var alert;
 *
 *     $scope.showAlert = showAlert;
 *     $scope.closeAlert = closeAlert;
 *     $scope.showGreeting = showCustomGreeting;
 *
 *     $scope.hasAlert = function() ***REMOVED*** return !!alert ***REMOVED***;
 *     $scope.userName = $scope.userName || 'Bobby';
 *
 *     // Dialog #1 - Show simple alert dialog and cache
 *     // reference to dialog instance
 *
 *     function showAlert() ***REMOVED***
 *       alert = $mdDialog.alert()
 *         .title('Attention, ' + $scope.userName)
 *         .textContent('This is an example of how easy dialogs can be!')
 *         .ok('Close');
 *
 *       $mdDialog
 *           .show( alert )
 *           .finally(function() ***REMOVED***
 *             alert = undefined;
 *           ***REMOVED***);
 *     ***REMOVED***
 *
 *     // Close the specified dialog instance and resolve with 'finished' flag
 *     // Normally this is not needed, just use '$mdDialog.hide()' to close
 *     // the most recent dialog popup.
 *
 *     function closeAlert() ***REMOVED***
 *       $mdDialog.hide( alert, "finished" );
 *       alert = undefined;
 *     ***REMOVED***
 *
 *     // Dialog #2 - Demonstrate more complex dialogs construction and popup.
 *
 *     function showCustomGreeting($event) ***REMOVED***
 *         $mdDialog.show(***REMOVED***
 *           targetEvent: $event,
 *           template:
 *             '<md-dialog>' +
 *
 *             '  <md-dialog-content>Hello ***REMOVED******REMOVED*** employee ***REMOVED******REMOVED***!</md-dialog-content>' +
 *
 *             '  <md-dialog-actions>' +
 *             '    <md-button ng-click="closeDialog()" class="md-primary">' +
 *             '      Close Greeting' +
 *             '    </md-button>' +
 *             '  </md-dialog-actions>' +
 *             '</md-dialog>',
 *           controller: 'GreetingController',
 *           onComplete: afterShowAnimation,
 *           locals: ***REMOVED*** employee: $scope.userName ***REMOVED***
 *         ***REMOVED***);
 *
 *         // When the 'enter' animation finishes...
 *
 *         function afterShowAnimation(scope, element, options) ***REMOVED***
 *            // post-show code here: DOM element focus, etc.
 *         ***REMOVED***
 *     ***REMOVED***
 *
 *     // Dialog #3 - Demonstrate use of ControllerAs and passing $scope to dialog
 *     //             Here we used ng-controller="GreetingController as vm" and
 *     //             $scope.vm === <controller instance>
 *
 *     function showCustomGreeting() ***REMOVED***
 *
 *        $mdDialog.show(***REMOVED***
 *           clickOutsideToClose: true,
 *
 *           scope: $scope,        // use parent scope in template
 *           preserveScope: true,  // do not forget this if use parent scope

 *           // Since GreetingController is instantiated with ControllerAs syntax
 *           // AND we are passing the parent '$scope' to the dialog, we MUST
 *           // use 'vm.<xxx>' in the template markup
 *
 *           template: '<md-dialog>' +
 *                     '  <md-dialog-content>' +
 *                     '     Hi There ***REMOVED******REMOVED***vm.employee***REMOVED******REMOVED***' +
 *                     '  </md-dialog-content>' +
 *                     '</md-dialog>',
 *
 *           controller: function DialogController($scope, $mdDialog) ***REMOVED***
 *             $scope.closeDialog = function() ***REMOVED***
 *               $mdDialog.hide();
 *             ***REMOVED***
 *           ***REMOVED***
 *        ***REMOVED***);
 *     ***REMOVED***
 *
 *   ***REMOVED***
 *
 *   // Greeting controller used with the more complex 'showCustomGreeting()' custom dialog
 *
 *   function GreetingController($scope, $mdDialog, employee) ***REMOVED***
 *     // Assigned from construction <code>locals</code> options...
 *     $scope.employee = employee;
 *
 *     $scope.closeDialog = function() ***REMOVED***
 *       // Easily hides most recent dialog shown...
 *       // no specific instance reference is needed.
 *       $mdDialog.hide();
 *     ***REMOVED***;
 *   ***REMOVED***
 *
 * ***REMOVED***)(angular);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdDialog#alert
 *
 * @description
 * Builds a preconfigured dialog with the specified message.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdDialogPreset` with the chainable configuration methods:
 *
 * - $mdDialogPreset#title(string) - Sets the alert title.
 * - $mdDialogPreset#textContent(string) - Sets the alert message.
 * - $mdDialogPreset#htmlContent(string) - Sets the alert message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#ok(string) - Sets the alert "Okay" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the alert dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#confirm
 *
 * @description
 * Builds a preconfigured dialog with the specified message. You can call show and the promise returned
 * will be resolved only if the user clicks the confirm action on the dialog.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdDialogPreset#title(string) - Sets the confirm title.
 * - $mdDialogPreset#textContent(string) - Sets the confirm message.
 * - $mdDialogPreset#htmlContent(string) - Sets the confirm message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#ok(string) - Sets the confirm "Okay" button text.
 * - $mdDialogPreset#cancel(string) - Sets the confirm "Cancel" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the confirm dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#prompt
 *
 * @description
 * Builds a preconfigured dialog with the specified message and input box. You can call show and the promise returned
 * will be resolved only if the user clicks the prompt action on the dialog, passing the input value as the first argument.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdDialogPreset#title(string) - Sets the prompt title.
 * - $mdDialogPreset#textContent(string) - Sets the prompt message.
 * - $mdDialogPreset#htmlContent(string) - Sets the prompt message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#placeholder(string) - Sets the placeholder text for the input.
 * - $mdDialogPreset#initialValue(string) - Sets the initial value for the prompt input.
 * - $mdDialogPreset#ok(string) - Sets the prompt "Okay" button text.
 * - $mdDialogPreset#cancel(string) - Sets the prompt "Cancel" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the prompt dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#show
 *
 * @description
 * Show a dialog with the specified options.
 *
 * @param ***REMOVED***object***REMOVED*** optionsOrPreset Either provide an `$mdDialogPreset` returned from `alert()`, and
 * `confirm()`, or an options object with the following properties:
 *   - `templateUrl` - `***REMOVED***string=***REMOVED***`: The url of a template that will be used as the content
 *   of the dialog.
 *   - `template` - `***REMOVED***string=***REMOVED***`: HTML template to show in the dialog. This **must** be trusted HTML
 *      with respect to Angular's [$sce service](https://docs.angularjs.org/api/ng/service/$sce).
 *      This template should **never** be constructed with any kind of user input or user data.
 *   - `contentElement` - `***REMOVED***string|Element***REMOVED***`: Instead of using a template, which will be compiled each time a
 *     dialog opens, you can also use a DOM element.<br/>
 *     * When specifying an element, which is present on the DOM, `$mdDialog` will temporary fetch the element into
 *       the dialog and restores it at the old DOM position upon close.
 *     * When specifying a string, the string be used as a CSS selector, to lookup for the element in the DOM.
 *   - `autoWrap` - `***REMOVED***boolean=***REMOVED***`: Whether or not to automatically wrap the template with a
 *     `<md-dialog>` tag if one is not provided. Defaults to true. Can be disabled if you provide a
 *     custom dialog directive.
 *   - `targetEvent` - `***REMOVED***DOMClickEvent=***REMOVED***`: A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *   - `openFrom` - `***REMOVED***string|Element|object***REMOVED***`: The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) from which the Dialog will
 *     originate.
 *   - `closeTo` - `***REMOVED***string|Element|object***REMOVED***`: The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) to which the Dialog will
 *     target.
 *   - `scope` - `***REMOVED***object=***REMOVED***`: the scope to link the template / controller to. If none is specified,
 *     it will create a new isolate scope.
 *     This scope will be destroyed when the dialog is removed unless `preserveScope` is set to true.
 *   - `preserveScope` - `***REMOVED***boolean=***REMOVED***`: whether to preserve the scope when the element is removed. Default is false
 *   - `disableParentScroll` - `***REMOVED***boolean=***REMOVED***`: Whether to disable scrolling while the dialog is open.
 *     Default true.
 *   - `hasBackdrop` - `***REMOVED***boolean=***REMOVED***`: Whether there should be an opaque backdrop behind the dialog.
 *     Default true.
 *   - `clickOutsideToClose` - `***REMOVED***boolean=***REMOVED***`: Whether the user can click outside the dialog to
 *     close it. Default false.
 *   - `escapeToClose` - `***REMOVED***boolean=***REMOVED***`: Whether the user can press escape to close the dialog.
 *     Default true.
 *   - `focusOnOpen` - `***REMOVED***boolean=***REMOVED***`: An option to override focus behavior on open. Only disable if
 *     focusing some other way, as focus management is required for dialogs to be accessible.
 *     Defaults to true.
 *   - `controller` - `***REMOVED***function|string=***REMOVED***`: The controller to associate with the dialog. The controller
 *     will be injected with the local `$mdDialog`, which passes along a scope for the dialog.
 *   - `locals` - `***REMOVED***object=***REMOVED***`: An object containing key/value pairs. The keys will be used as names
 *     of values to inject into the controller. For example, `locals: ***REMOVED***three: 3***REMOVED***` would inject
 *     `three` into the controller, with the value 3. If `bindToController` is true, they will be
 *     copied to the controller instead.
 *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
 *   - `resolve` - `***REMOVED***object=***REMOVED***`: Similar to locals, except it takes promises as values, and the
 *     dialog will not open until all of the promises resolve.
 *   - `controllerAs` - `***REMOVED***string=***REMOVED***`: An alias to assign the controller to on the scope.
 *   - `parent` - `***REMOVED***element=***REMOVED***`: The element to append the dialog to. Defaults to appending
 *     to the root element of the application.
 *   - `onShowing` `***REMOVED***function=***REMOVED*** Callback function used to announce the show() action is
 *     starting.
 *   - `onComplete` `***REMOVED***function=***REMOVED***`: Callback function used to announce when the show() action is
 *     finished.
 *   - `onRemoving` `***REMOVED***function=***REMOVED***`: Callback function used to announce the close/hide() action is
 *     starting. This allows developers to run custom animations in parallel the close animations.
 *   - `fullscreen` `***REMOVED***boolean=***REMOVED***`: An option to apply `.md-dialog-fullscreen` class on open.
 * @returns ***REMOVED***promise***REMOVED*** A promise that can be resolved with `$mdDialog.hide()` or
 * rejected with `$mdDialog.cancel()`.
 */

/**
 * @ngdoc method
 * @name $mdDialog#hide
 *
 * @description
 * Hide an existing dialog and resolve the promise returned from `$mdDialog.show()`.
 *
 * @param ***REMOVED****=***REMOVED*** response An argument for the resolved promise.
 *
 * @returns ***REMOVED***promise***REMOVED*** A promise that is resolved when the dialog has been closed.
 */

/**
 * @ngdoc method
 * @name $mdDialog#cancel
 *
 * @description
 * Hide an existing dialog and reject the promise returned from `$mdDialog.show()`.
 *
 * @param ***REMOVED****=***REMOVED*** response An argument for the rejected promise.
 *
 * @returns ***REMOVED***promise***REMOVED*** A promise that is resolved when the dialog has been closed.
 */

function MdDialogProvider($$interimElementProvider) ***REMOVED***
  // Elements to capture and redirect focus when the user presses tab at the dialog boundary.
  var topFocusTrap, bottomFocusTrap;

  advancedDialogOptions.$inject = ["$mdDialog", "$mdTheming", "$mdConstant"];
  dialogDefaultOptions.$inject = ["$mdDialog", "$mdAria", "$mdUtil", "$mdConstant", "$animate", "$document", "$window", "$rootElement", "$log", "$injector"];
  return $$interimElementProvider('$mdDialog')
    .setDefaults(***REMOVED***
      methods: ['disableParentScroll', 'hasBackdrop', 'clickOutsideToClose', 'escapeToClose',
          'targetEvent', 'closeTo', 'openFrom', 'parent', 'fullscreen', 'contentElement'],
      options: dialogDefaultOptions
    ***REMOVED***)
    .addPreset('alert', ***REMOVED***
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'theme',
          'css'],
      options: advancedDialogOptions
    ***REMOVED***)
    .addPreset('confirm', ***REMOVED***
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'cancel',
          'theme', 'css'],
      options: advancedDialogOptions
    ***REMOVED***)
    .addPreset('prompt', ***REMOVED***
      methods: ['title', 'htmlContent', 'textContent', 'initialValue', 'content', 'placeholder', 'ariaLabel',
          'ok', 'cancel', 'theme', 'css'],
      options: advancedDialogOptions
    ***REMOVED***);

  /* ngInject */
  function advancedDialogOptions($mdDialog, $mdTheming, $mdConstant) ***REMOVED***
    return ***REMOVED***
      template: [
        '<md-dialog md-theme="***REMOVED******REMOVED*** dialog.theme ***REMOVED******REMOVED***" aria-label="***REMOVED******REMOVED*** dialog.ariaLabel ***REMOVED******REMOVED***" ng-class="dialog.css">',
        '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">',
        '    <h2 class="md-title">***REMOVED******REMOVED*** dialog.title ***REMOVED******REMOVED***</h2>',
        '    <div ng-if="::dialog.mdHtmlContent" class="_md-dialog-content-body" ',
        '        ng-bind-html="::dialog.mdHtmlContent"></div>',
        '    <div ng-if="::!dialog.mdHtmlContent" class="_md-dialog-content-body">',
        '      <p>***REMOVED******REMOVED***::dialog.mdTextContent***REMOVED******REMOVED***</p>',
        '    </div>',
        '    <md-input-container md-no-float ng-if="::dialog.$type == \'prompt\'" class="md-prompt-input-container">',
        '      <input ng-keypress="dialog.keypress($event)" md-autofocus ng-model="dialog.result" ' +
        '             placeholder="***REMOVED******REMOVED***::dialog.placeholder***REMOVED******REMOVED***">',
        '    </md-input-container>',
        '  </md-dialog-content>',
        '  <md-dialog-actions>',
        '    <md-button ng-if="dialog.$type === \'confirm\' || dialog.$type === \'prompt\'"' +
        '               ng-click="dialog.abort()" class="md-primary">',
        '      ***REMOVED******REMOVED*** dialog.cancel ***REMOVED******REMOVED***',
        '    </md-button>',
        '    <md-button ng-click="dialog.hide()" class="md-primary" md-autofocus="dialog.$type===\'alert\'">',
        '      ***REMOVED******REMOVED*** dialog.ok ***REMOVED******REMOVED***',
        '    </md-button>',
        '  </md-dialog-actions>',
        '</md-dialog>'
      ].join('').replace(/\s\s+/g, ''),
      controller: function mdDialogCtrl() ***REMOVED***
        var isPrompt = this.$type == 'prompt';

        if (isPrompt && this.initialValue) ***REMOVED***
          this.result = this.initialValue;
        ***REMOVED***

        this.hide = function() ***REMOVED***
          $mdDialog.hide(isPrompt ? this.result : true);
        ***REMOVED***;
        this.abort = function() ***REMOVED***
          $mdDialog.cancel();
        ***REMOVED***;
        this.keypress = function($event) ***REMOVED***
          if ($event.keyCode === $mdConstant.KEY_CODE.ENTER) ***REMOVED***
            $mdDialog.hide(this.result)
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***,
      controllerAs: 'dialog',
      bindToController: true,
      theme: $mdTheming.defaultTheme()
    ***REMOVED***;
  ***REMOVED***

  /* ngInject */
  function dialogDefaultOptions($mdDialog, $mdAria, $mdUtil, $mdConstant, $animate, $document, $window, $rootElement, $log, $injector) ***REMOVED***
    return ***REMOVED***
      hasBackdrop: true,
      isolateScope: true,
      onShow: onShow,
      onShowing: beforeShow,
      onRemove: onRemove,
      clickOutsideToClose: false,
      escapeToClose: true,
      targetEvent: null,
      contentElement: null,
      closeTo: null,
      openFrom: null,
      focusOnOpen: true,
      disableParentScroll: true,
      autoWrap: true,
      fullscreen: false,
      transformTemplate: function(template, options) ***REMOVED***
        // Make the dialog container focusable, because otherwise the focus will be always redirected to
        // an element outside of the container, and the focus trap won't work probably..
        // Also the tabindex is needed for the `escapeToClose` functionality, because
        // the keyDown event can't be triggered when the focus is outside of the container.
        return '<div class="md-dialog-container" tabindex="-1">' + validatedTemplate(template) + '</div>';

        /**
         * The specified template should contain a <md-dialog> wrapper element....
         */
        function validatedTemplate(template) ***REMOVED***
          if (options.autoWrap && !/<\/md-dialog>/g.test(template)) ***REMOVED***
            return '<md-dialog>' + (template || '') + '</md-dialog>';
          ***REMOVED*** else ***REMOVED***
            return template || '';
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

    function beforeShow(scope, element, options, controller) ***REMOVED***
      if (controller) ***REMOVED***
        controller.mdHtmlContent = controller.htmlContent || options.htmlContent || '';
        controller.mdTextContent = controller.textContent || options.textContent ||
            controller.content || options.content || '';

        if (controller.mdHtmlContent && !$injector.has('$sanitize')) ***REMOVED***
          throw Error('The ngSanitize module must be loaded in order to use htmlContent.');
        ***REMOVED***

        if (controller.mdHtmlContent && controller.mdTextContent) ***REMOVED***
          throw Error('md-dialog cannot have both `htmlContent` and `textContent`');
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    /** Show method for dialogs */
    function onShow(scope, element, options, controller) ***REMOVED***
      angular.element($document[0].body).addClass('md-dialog-is-showing');

      if (options.contentElement) ***REMOVED***
        var contentEl = options.contentElement;

        if (angular.isString(contentEl)) ***REMOVED***
          contentEl = document.querySelector(contentEl);
          options.elementInsertionSibling = contentEl.nextElementSibling;
          options.elementInsertionParent = contentEl.parentNode;
        ***REMOVED*** else ***REMOVED***
          contentEl = contentEl[0] || contentEl;
          // When the element is not visible in the DOM, then we can treat is as same
          // as a normal dialog would do. Removing it at close etc.
          // ---
          // When the element is visible in the DOM, then we restore it at close of the dialog.
          if (document.contains(contentEl)) ***REMOVED***
            options.elementInsertionSibling = contentEl.nextElementSibling;
            options.elementInsertionParent = contentEl.parentNode;
          ***REMOVED***
        ***REMOVED***

        options.elementInsertionEntry = contentEl;
        element = angular.element(contentEl);
      ***REMOVED***

      captureParentAndFromToElements(options);
      configureAria(element.find('md-dialog'), options);
      showBackdrop(scope, element, options);

      return dialogPopIn(element, options)
        .then(function() ***REMOVED***
          activateListeners(element, options);
          lockScreenReader(element, options);
          warnDeprecatedActions();
          focusOnOpen();
        ***REMOVED***);

      /**
       * Check to see if they used the deprecated .md-actions class and log a warning
       */
      function warnDeprecatedActions() ***REMOVED***
        if (element[0].querySelector('.md-actions')) ***REMOVED***
          $log.warn('Using a class of md-actions is deprecated, please use <md-dialog-actions>.');
        ***REMOVED***
      ***REMOVED***

      /**
       * For alerts, focus on content... otherwise focus on
       * the close button (or equivalent)
       */
      function focusOnOpen() ***REMOVED***
        if (options.focusOnOpen) ***REMOVED***
          var target = $mdUtil.findFocusTarget(element) || findCloseButton();
          target.focus();
        ***REMOVED***

        /**
         * If no element with class dialog-close, try to find the last
         * button child in md-actions and assume it is a close button.
         *
         * If we find no actions at all, log a warning to the console.
         */
        function findCloseButton() ***REMOVED***
          var closeButton = element[0].querySelector('.dialog-close');
          if (!closeButton) ***REMOVED***
            var actionButtons = element[0].querySelectorAll('.md-actions button, md-dialog-actions button');
            closeButton = actionButtons[actionButtons.length - 1];
          ***REMOVED***
          return angular.element(closeButton);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    /**
     * Remove function for all dialogs
     */
    function onRemove(scope, element, options) ***REMOVED***
      options.deactivateListeners();
      options.unlockScreenReader();
      options.hideBackdrop(options.$destroy);

      // Remove the focus traps that we added earlier for keeping focus within the dialog.
      if (topFocusTrap && topFocusTrap.parentNode) ***REMOVED***
        topFocusTrap.parentNode.removeChild(topFocusTrap);
      ***REMOVED***

      if (bottomFocusTrap && bottomFocusTrap.parentNode) ***REMOVED***
        bottomFocusTrap.parentNode.removeChild(bottomFocusTrap);
      ***REMOVED***

      // For navigation $destroy events, do a quick, non-animated removal,
      // but for normal closes (from clicks, etc) animate the removal
      return !!options.$destroy ? detachAndClean() : animateRemoval().then( detachAndClean );

      /**
       * For normal closes, animate the removal.
       * For forced closes (like $destroy events), skip the animations
       */
      function animateRemoval() ***REMOVED***
        return dialogPopOut(element, options);
      ***REMOVED***

      function removeContentElement() ***REMOVED***
        if (!options.contentElement) return;

        options.reverseContainerStretch();

        if (!options.elementInsertionParent) ***REMOVED***
          // When the contentElement has no parent, then it's a virtual DOM element, which should
          // be removed at close, as same as normal templates inside of a dialog.
          options.elementInsertionEntry.parentNode.removeChild(options.elementInsertionEntry);
        ***REMOVED*** else if (!options.elementInsertionSibling) ***REMOVED***
          // When the contentElement doesn't have any sibling, then it can be simply appended to the
          // parent, because it plays no role, which index it had before.
          options.elementInsertionParent.appendChild(options.elementInsertionEntry);
        ***REMOVED*** else ***REMOVED***
          // When the contentElement has a sibling, which marks the previous position of the contentElement
          // in the DOM, we insert it correctly before the sibling, to have the same index as before.
          options.elementInsertionParent.insertBefore(options.elementInsertionEntry, options.elementInsertionSibling);
        ***REMOVED***
      ***REMOVED***

      /**
       * Detach the element
       */
      function detachAndClean() ***REMOVED***
        angular.element($document[0].body).removeClass('md-dialog-is-showing');
        // Only remove the element, if it's not provided through the contentElement option.
        if (!options.contentElement) ***REMOVED***
          element.remove();
        ***REMOVED*** else ***REMOVED***
          removeContentElement();
        ***REMOVED***

        if (!options.$destroy) options.origin.focus();
      ***REMOVED***
    ***REMOVED***

    /**
     * Capture originator/trigger/from/to element information (if available)
     * and the parent container for the dialog; defaults to the $rootElement
     * unless overridden in the options.parent
     */
    function captureParentAndFromToElements(options) ***REMOVED***
          options.origin = angular.extend(***REMOVED***
            element: null,
            bounds: null,
            focus: angular.noop
          ***REMOVED***, options.origin || ***REMOVED******REMOVED***);

          options.parent   = getDomElement(options.parent, $rootElement);
          options.closeTo  = getBoundingClientRect(getDomElement(options.closeTo));
          options.openFrom = getBoundingClientRect(getDomElement(options.openFrom));

          if ( options.targetEvent ) ***REMOVED***
            options.origin   = getBoundingClientRect(options.targetEvent.target, options.origin);
          ***REMOVED***

          /**
           * Identify the bounding RECT for the target element
           *
           */
          function getBoundingClientRect (element, orig) ***REMOVED***
            var source = angular.element((element || ***REMOVED******REMOVED***));
            if (source && source.length) ***REMOVED***
              // Compute and save the target element's bounding rect, so that if the
              // element is hidden when the dialog closes, we can shrink the dialog
              // back to the same position it expanded from.
              //
              // Checking if the source is a rect object or a DOM element
              var bounds = ***REMOVED***top:0,left:0,height:0,width:0***REMOVED***;
              var hasFn = angular.isFunction(source[0].getBoundingClientRect);

              return angular.extend(orig || ***REMOVED******REMOVED***, ***REMOVED***
                  element : hasFn ? source : undefined,
                  bounds  : hasFn ? source[0].getBoundingClientRect() : angular.extend(***REMOVED******REMOVED***, bounds, source[0]),
                  focus   : angular.bind(source, source.focus),
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***

          /**
           * If the specifier is a simple string selector, then query for
           * the DOM element.
           */
          function getDomElement(element, defaultElement) ***REMOVED***
            if (angular.isString(element)) ***REMOVED***
              element = $document[0].querySelector(element);
            ***REMOVED***

            // If we have a reference to a raw dom element, always wrap it in jqLite
            return angular.element(element || defaultElement);
          ***REMOVED***

        ***REMOVED***

    /**
     * Listen for escape keys and outside clicks to auto close
     */
    function activateListeners(element, options) ***REMOVED***
      var window = angular.element($window);
      var onWindowResize = $mdUtil.debounce(function() ***REMOVED***
        stretchDialogContainerToViewport(element, options);
      ***REMOVED***, 60);

      var removeListeners = [];
      var smartClose = function() ***REMOVED***
        // Only 'confirm' dialogs have a cancel button... escape/clickOutside will
        // cancel or fallback to hide.
        var closeFn = ( options.$type == 'alert' ) ? $mdDialog.hide : $mdDialog.cancel;
        $mdUtil.nextTick(closeFn, true);
      ***REMOVED***;

      if (options.escapeToClose) ***REMOVED***
        var parentTarget = options.parent;
        var keyHandlerFn = function(ev) ***REMOVED***
          if (ev.keyCode === $mdConstant.KEY_CODE.ESCAPE) ***REMOVED***
            ev.stopPropagation();
            ev.preventDefault();

            smartClose();
          ***REMOVED***
        ***REMOVED***;

        // Add keydown listeners
        element.on('keydown', keyHandlerFn);
        parentTarget.on('keydown', keyHandlerFn);

        // Queue remove listeners function
        removeListeners.push(function() ***REMOVED***

          element.off('keydown', keyHandlerFn);
          parentTarget.off('keydown', keyHandlerFn);

        ***REMOVED***);
      ***REMOVED***

      // Register listener to update dialog on window resize
      window.on('resize', onWindowResize);

      removeListeners.push(function() ***REMOVED***
        window.off('resize', onWindowResize);
      ***REMOVED***);

      if (options.clickOutsideToClose) ***REMOVED***
        var target = element;
        var sourceElem;

        // Keep track of the element on which the mouse originally went down
        // so that we can only close the backdrop when the 'click' started on it.
        // A simple 'click' handler does not work,
        // it sets the target object as the element the mouse went down on.
        var mousedownHandler = function(ev) ***REMOVED***
          sourceElem = ev.target;
        ***REMOVED***;

        // We check if our original element and the target is the backdrop
        // because if the original was the backdrop and the target was inside the dialog
        // we don't want to dialog to close.
        var mouseupHandler = function(ev) ***REMOVED***
          if (sourceElem === target[0] && ev.target === target[0]) ***REMOVED***
            ev.stopPropagation();
            ev.preventDefault();

            smartClose();
          ***REMOVED***
        ***REMOVED***;

        // Add listeners
        target.on('mousedown', mousedownHandler);
        target.on('mouseup', mouseupHandler);

        // Queue remove listeners function
        removeListeners.push(function() ***REMOVED***
          target.off('mousedown', mousedownHandler);
          target.off('mouseup', mouseupHandler);
        ***REMOVED***);
      ***REMOVED***

      // Attach specific `remove` listener handler
      options.deactivateListeners = function() ***REMOVED***
        removeListeners.forEach(function(removeFn) ***REMOVED***
          removeFn();
        ***REMOVED***);
        options.deactivateListeners = null;
      ***REMOVED***;
    ***REMOVED***

    /**
     * Show modal backdrop element...
     */
    function showBackdrop(scope, element, options) ***REMOVED***

      if (options.disableParentScroll) ***REMOVED***
        // !! DO this before creating the backdrop; since disableScrollAround()
        //    configures the scroll offset; which is used by mdBackDrop postLink()
        options.restoreScroll = $mdUtil.disableScrollAround(element, options.parent);
      ***REMOVED***

      if (options.hasBackdrop) ***REMOVED***
        options.backdrop = $mdUtil.createBackdrop(scope, "_md-dialog-backdrop md-opaque");
        $animate.enter(options.backdrop, options.parent);
      ***REMOVED***

      /**
       * Hide modal backdrop element...
       */
      options.hideBackdrop = function hideBackdrop($destroy) ***REMOVED***
        if (options.backdrop) ***REMOVED***
          if ( !!$destroy ) options.backdrop.remove();
          else              $animate.leave(options.backdrop);
        ***REMOVED***

        if (options.disableParentScroll) ***REMOVED***
          options.restoreScroll();
          delete options.restoreScroll;
        ***REMOVED***

        options.hideBackdrop = null;
      ***REMOVED***
    ***REMOVED***

    /**
     * Inject ARIA-specific attributes appropriate for Dialogs
     */
    function configureAria(element, options) ***REMOVED***

      var role = (options.$type === 'alert') ? 'alertdialog' : 'dialog';
      var dialogContent = element.find('md-dialog-content');
      var existingDialogId = element.attr('id');
      var dialogContentId = 'dialogContent_' + (existingDialogId || $mdUtil.nextUid());

      element.attr(***REMOVED***
        'role': role,
        'tabIndex': '-1'
      ***REMOVED***);

      if (dialogContent.length === 0) ***REMOVED***
        dialogContent = element;
        // If the dialog element already had an ID, don't clobber it.
        if (existingDialogId) ***REMOVED***
          dialogContentId = existingDialogId;
        ***REMOVED***
      ***REMOVED***

      dialogContent.attr('id', dialogContentId);
      element.attr('aria-describedby', dialogContentId);

      if (options.ariaLabel) ***REMOVED***
        $mdAria.expect(element, 'aria-label', options.ariaLabel);
      ***REMOVED***
      else ***REMOVED***
        $mdAria.expectAsync(element, 'aria-label', function() ***REMOVED***
          var words = dialogContent.text().split(/\s+/);
          if (words.length > 3) words = words.slice(0, 3).concat('...');
          return words.join(' ');
        ***REMOVED***);
      ***REMOVED***

      // Set up elements before and after the dialog content to capture focus and
      // redirect back into the dialog.
      topFocusTrap = document.createElement('div');
      topFocusTrap.classList.add('_md-dialog-focus-trap');
      topFocusTrap.tabIndex = 0;

      bottomFocusTrap = topFocusTrap.cloneNode(false);

      // When focus is about to move out of the dialog, we want to intercept it and redirect it
      // back to the dialog element.
      var focusHandler = function() ***REMOVED***
        element.focus();
      ***REMOVED***;
      topFocusTrap.addEventListener('focus', focusHandler);
      bottomFocusTrap.addEventListener('focus', focusHandler);

      // The top focus trap inserted immeidately before the md-dialog element (as a sibling).
      // The bottom focus trap is inserted at the very end of the md-dialog element (as a child).
      element[0].parentNode.insertBefore(topFocusTrap, element[0]);
      element.after(bottomFocusTrap);
    ***REMOVED***

    /**
     * Prevents screen reader interaction behind modal window
     * on swipe interfaces
     */
    function lockScreenReader(element, options) ***REMOVED***
      var isHidden = true;

      // get raw DOM node
      walkDOM(element[0]);

      options.unlockScreenReader = function() ***REMOVED***
        isHidden = false;
        walkDOM(element[0]);

        options.unlockScreenReader = null;
      ***REMOVED***;

      /**
       * Walk DOM to apply or remove aria-hidden on sibling nodes
       * and parent sibling nodes
       *
       */
      function walkDOM(element) ***REMOVED***
        while (element.parentNode) ***REMOVED***
          if (element === document.body) ***REMOVED***
            return;
          ***REMOVED***
          var children = element.parentNode.children;
          for (var i = 0; i < children.length; i++) ***REMOVED***
            // skip over child if it is an ascendant of the dialog
            // or a script or style tag
            if (element !== children[i] && !isNodeOneOf(children[i], ['SCRIPT', 'STYLE'])) ***REMOVED***
              children[i].setAttribute('aria-hidden', isHidden);
            ***REMOVED***
          ***REMOVED***

          walkDOM(element = element.parentNode);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

    /**
     * Ensure the dialog container fill-stretches to the viewport
     */
    function stretchDialogContainerToViewport(container, options) ***REMOVED***
      var isFixed = $window.getComputedStyle($document[0].body).position == 'fixed';
      var backdrop = options.backdrop ? $window.getComputedStyle(options.backdrop[0]) : null;
      var height = backdrop ? Math.min($document[0].body.clientHeight, Math.ceil(Math.abs(parseInt(backdrop.height, 10)))) : 0;

      var previousStyles = ***REMOVED***
        top: container.css('top'),
        height: container.css('height')
      ***REMOVED***;

      container.css(***REMOVED***
        top: (isFixed ? $mdUtil.scrollTop(options.parent) : 0) + 'px',
        height: height ? height + 'px' : '100%'
      ***REMOVED***);

      return function() ***REMOVED***
        // Reverts the modified styles back to the previous values.
        // This is needed for contentElements, which should have the same styles after close
        // as before.
        container.css(previousStyles);
      ***REMOVED***;
    ***REMOVED***

    /**
     *  Dialog open and pop-in animation
     */
    function dialogPopIn(container, options) ***REMOVED***
      // Add the `md-dialog-container` to the DOM
      options.parent.append(container);
      options.reverseContainerStretch = stretchDialogContainerToViewport(container, options);

      var dialogEl = container.find('md-dialog');
      var animator = $mdUtil.dom.animator;
      var buildTranslateToOrigin = animator.calculateZoomToOrigin;
      var translateOptions = ***REMOVED***transitionInClass: '_md-transition-in', transitionOutClass: '_md-transition-out'***REMOVED***;
      var from = animator.toTransformCss(buildTranslateToOrigin(dialogEl, options.openFrom || options.origin));
      var to = animator.toTransformCss("");  // defaults to center display (or parent or $rootElement)

      if (options.fullscreen) ***REMOVED***
        dialogEl.addClass('md-dialog-fullscreen');
      ***REMOVED***

      return animator
        .translate3d(dialogEl, from, to, translateOptions)
        .then(function(animateReversal) ***REMOVED***
          // Build a reversal translate function synced to this translation...
          options.reverseAnimate = function() ***REMOVED***
            delete options.reverseAnimate;

            if (options.closeTo) ***REMOVED***
              // Using the opposite classes to create a close animation to the closeTo element
              translateOptions = ***REMOVED***transitionInClass: '_md-transition-out', transitionOutClass: '_md-transition-in'***REMOVED***;
              from = to;
              to = animator.toTransformCss(buildTranslateToOrigin(dialogEl, options.closeTo));

              return animator
                .translate3d(dialogEl, from, to,translateOptions);
            ***REMOVED***

            return animateReversal(
              to = animator.toTransformCss(
                // in case the origin element has moved or is hidden,
                // let's recalculate the translateCSS
                buildTranslateToOrigin(dialogEl, options.origin)
              )
            );

          ***REMOVED***;

          // Builds a function, which clears the animations / transforms of the dialog element.
          // Required for contentElements, which should not have the the animation styling after
          // the dialog is closed.
          options.clearAnimate = function() ***REMOVED***
            delete options.clearAnimate;
            return animator
              .translate3d(dialogEl, to, animator.toTransformCss(''), ***REMOVED******REMOVED***);
          ***REMOVED***;

          return true;
        ***REMOVED***);
    ***REMOVED***

    /**
     * Dialog close and pop-out animation
     */
    function dialogPopOut(container, options) ***REMOVED***
      return options.reverseAnimate().then(function() ***REMOVED***
        if (options.contentElement) ***REMOVED***
          // When we use a contentElement, we want the element to be the same as before.
          // That means, that we have to clear all the animation properties, like transform.
          options.clearAnimate();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***

    /**
     * Utility function to filter out raw DOM nodes
     */
    function isNodeOneOf(elem, nodeTypeArray) ***REMOVED***
      if (nodeTypeArray.indexOf(elem.nodeName) !== -1) ***REMOVED***
        return true;
      ***REMOVED***
    ***REMOVED***

  ***REMOVED***
***REMOVED***
MdDialogProvider.$inject = ["$$interimElementProvider"];

***REMOVED***)(window, window.angular);
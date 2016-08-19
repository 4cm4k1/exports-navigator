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
 * @name material.components.panel
 */
angular
    .module('material.components.panel', [
      'material.core',
      'material.components.backdrop'
    ])
    .service('$mdPanel', MdPanelService);


/*****************************************************************************
 *                            PUBLIC DOCUMENTATION                           *
 *****************************************************************************/

/**
 * @ngdoc service
 * @name $mdPanel
 * @module material.components.panel
 *
 * @description
 * `$mdPanel` is a robust, low-level service for creating floating panels on
 * the screen. It can be used to implement tooltips, dialogs, pop-ups, etc.
 *
 * @usage
 * <hljs lang="js">
 * (function(angular, undefined) ***REMOVED***
 *   ‘use strict’;
 *
 *   angular
 *       .module('demoApp', ['ngMaterial'])
 *       .controller('DemoDialogController', DialogController);
 *
 *   var panelRef;
 *
 *   function showPanel($event) ***REMOVED***
 *     var panelPosition = $mdPanelPosition
 *         .absolute()
 *         .top('50%')
 *         .left('50%');
 *
 *     var panelAnimation = $mdPanelAnimation
 *         .targetEvent($event)
 *         .defaultAnimation('md-panel-animate-fly')
 *         .closeTo('.show-button');
 *
 *     var config = ***REMOVED***
 *       attachTo: angular.element(document.body),
 *       controller: DialogController,
 *       controllerAs: 'ctrl',
 *       position: panelPosition,
 *       animation: panelAnimation,
 *       targetEvent: $event,
 *       templateUrl: 'dialog-template.html',
 *       clickOutsideToClose: true,
 *       escapeToClose: true,
 *       focusOnOpen: true
 *     ***REMOVED***
 *     panelRef = $mdPanel.create(config);
 *     panelRef.open()
 *         .finally(function() ***REMOVED***
 *           panelRef = undefined;
 *         ***REMOVED***);
 *   ***REMOVED***
 *
 *   function DialogController(MdPanelRef, toppings) ***REMOVED***
 *     var toppings;
 *
 *     function closeDialog() ***REMOVED***
 *       MdPanelRef.close();
 *     ***REMOVED***
 *   ***REMOVED***
 * ***REMOVED***)(angular);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdPanel#create
 * @description
 * Creates a panel with the specified options.
 *
 * @param config ***REMOVED***Object=***REMOVED*** Specific configuration object that may contain
 * the following properties:
 *
 *   - `template` - `***REMOVED***string=***REMOVED***`: HTML template to show in the panel. This
 *     **must** be trusted HTML with respect to Angular’s
 *     [$sce service](https://docs.angularjs.org/api/ng/service/$sce).
 *   - `templateUrl` - `***REMOVED***string=***REMOVED***`: The URL that will be used as the content of
 *     the panel.
 *   - `controller` - `***REMOVED***(function|string)=***REMOVED***`: The controller to associate with
 *     the panel. The controller can inject a reference to the returned
 *     panelRef, which allows the panel to be closed, hidden, and shown. Any
 *     fields passed in through locals or resolve will be bound to the
 *     controller.
 *   - `controllerAs` - `***REMOVED***string=***REMOVED***`: An alias to assign the controller to on
 *     the scope.
 *   - `bindToController` - `***REMOVED***boolean=***REMOVED***`: Binds locals to the controller
 *     instead of passing them in. Defaults to true, as this is a best
 *     practice.
 *   - `locals` - `***REMOVED***Object=***REMOVED***`: An object containing key/value pairs. The keys
 *     will be used as names of values to inject into the controller. For
 *     example, `locals: ***REMOVED***three: 3***REMOVED***` would inject `three` into the controller,
 *     with the value 3.
 *   - `resolve` - `***REMOVED***Object=***REMOVED***`: Similar to locals, except it takes promises as
 *     values. The panel will not open until all of the promises resolve.
 *   - `attachTo` - `***REMOVED***(string|!angular.JQLite|!Element)=***REMOVED***`: The element to
 *     attach the panel to. Defaults to appending to the root element of the
 *     application.
 *   - `propagateContainerEvents` - `***REMOVED***boolean=***REMOVED***`: Whether pointer or touch
 *     events should be allowed to propagate 'go through' the container, aka the
 *     wrapper, of the panel. Defaults to false.
 *   - `panelClass` - `***REMOVED***string=***REMOVED***`: A css class to apply to the panel element.
 *     This class should define any borders, box-shadow, etc. for the panel.
 *   - `zIndex` - `***REMOVED***number=***REMOVED***`: The z-index to place the panel at.
 *     Defaults to 80.
 *   - `position` - `***REMOVED***MdPanelPosition=***REMOVED***`: An MdPanelPosition object that
 *     specifies the alignment of the panel. For more information, see
 *     `MdPanelPosition`.
 *   - `clickOutsideToClose` - `***REMOVED***boolean=***REMOVED***`: Whether the user can click
 *     outside the panel to close it. Defaults to false.
 *   - `escapeToClose` - `***REMOVED***boolean=***REMOVED***`: Whether the user can press escape to
 *     close the panel. Defaults to false.
 *   - `trapFocus` - `***REMOVED***boolean=***REMOVED***`: Whether focus should be trapped within the
 *     panel. If `trapFocus` is true, the user will not be able to interact
 *     with the rest of the page until the panel is dismissed. Defaults to
 *     false.
 *   - `focusOnOpen` - `***REMOVED***boolean=***REMOVED***`: An option to override focus behavior on
 *     open. Only disable if focusing some other way, as focus management is
 *     required for panels to be accessible. Defaults to true.
 *   - `fullscreen` - `***REMOVED***boolean=***REMOVED***`: Whether the panel should be full screen.
 *     Applies the class `._md-panel-fullscreen` to the panel on open. Defaults
 *     to false.
 *   - `animation` - `***REMOVED***MdPanelAnimation=***REMOVED***`: An MdPanelAnimation object that
 *     specifies the animation of the panel. For more information, see
 *     `MdPanelAnimation`.
 *   - `hasBackdrop` - `***REMOVED***boolean=***REMOVED***`: Whether there should be an opaque backdrop
 *     behind the panel. Defaults to false.
 *   - `disableParentScroll` - `***REMOVED***boolean=***REMOVED***`: Whether the user can scroll the
 *     page behind the panel. Defaults to false.
 *   - `onDomAdded` - `***REMOVED***function=***REMOVED***`: Callback function used to announce when
 *     the panel is added to the DOM.
 *   - `onOpenComplete` - `***REMOVED***function=***REMOVED***`: Callback function used to announce
 *     when the open() action is finished.
 *   - `onRemoving` - `***REMOVED***function=***REMOVED***`: Callback function used to announce the
 *     close/hide() action is starting.
 *   - `onDomRemoved` - `***REMOVED***function=***REMOVED***`: Callback function used to announce when the
 *     panel is removed from the DOM.
 *   - `origin` - `***REMOVED***(string|!angular.JQLite|!Element)=***REMOVED***`: The element to
 *     focus on when the panel closes. This is commonly the element which triggered
 *     the opening of the panel. If you do not use `origin`, you need to control
 *     the focus manually.
 *
 * @returns ***REMOVED***MdPanelRef***REMOVED*** panelRef
 */


/**
 * @ngdoc method
 * @name $mdPanel#open
 * @description
 * Calls the create method above, then opens the panel. This is a shortcut for
 * creating and then calling open manually. If custom methods need to be
 * called when the panel is added to the DOM or opened, do not use this method.
 * Instead create the panel, chain promises on the domAdded and openComplete
 * methods, and call open from the returned panelRef.
 *
 * @param ***REMOVED***Object=***REMOVED*** config Specific configuration object that may contain
 * the properties defined in `$mdPanel.create`.
 *
 * @returns ***REMOVED***angular.$q.Promise<MdPanelRef>***REMOVED*** panelRef A promise that resolves
 * to an instance of the panel.
 */


/**
 * @ngdoc method
 * @name $mdPanel#newPanelPosition
 * @description
 * Returns a new instance of the MdPanelPosition object. Use this to create
 * the position config object.
 *
 * @returns ***REMOVED***MdPanelPosition***REMOVED*** panelPosition
 */


/**
 * @ngdoc method
 * @name $mdPanel#newPanelAnimation
 * @description
 * Returns a new instance of the MdPanelAnimation object. Use this to create
 * the animation config object.
 *
 * @returns ***REMOVED***MdPanelAnimation***REMOVED*** panelAnimation
 */


/*****************************************************************************
 *                                 MdPanelRef                                *
 *****************************************************************************/


/**
 * @ngdoc type
 * @name MdPanelRef
 * @module material.components.panel
 * @description
 * A reference to a created panel. This reference contains a unique id for the
 * panel, along with the following properties:
 *   - `id` - `***REMOVED***string***REMOVED***: The unique id for the panel. This id is used to track
 *     when a panel was interacted with.
 *   - `config` - `***REMOVED***Object=***REMOVED***`: The entire config object that was used in
 *     create.
 *   - `isAttached` - `***REMOVED***boolean***REMOVED***`: Whether the panel is attached to the DOM.
 *     Visibility to the user does not factor into isAttached.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#open
 * @description
 * Attaches and shows the panel.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel is
 * opened.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#close
 * @description
 * Hides and detaches the panel. Note that this will **not** destroy the panel. If you
 * don't intend on using the panel again, call the ***REMOVED***@link #destroy destroy***REMOVED*** method
 * afterwards.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel is
 * closed.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#attach
 * @description
 * Create the panel elements and attach them to the DOM. The panel will be
 * hidden by default.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel is
 * attached.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#detach
 * @description
 * Removes the panel from the DOM. This will NOT hide the panel before removing it.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel is
 * detached.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#show
 * @description
 * Shows the panel.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel has
 * shown and animations are completed.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#hide
 * @description
 * Hides the panel.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel has
 * hidden and animations are completed.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#destroy
 * @description
 * Destroys the panel. The panel cannot be opened again after this is called.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#addClass
 * @description
 * Adds a class to the panel. DO NOT use this to hide/show the panel.
 *
 * @param ***REMOVED***string***REMOVED*** newClass Class to be added.
 * @param ***REMOVED***boolean***REMOVED*** toElement Whether or not to add the class to the panel
 *    element instead of the container.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#removeClass
 * @description
 * Removes a class from the panel. DO NOT use this to hide/show the panel.
 *
 * @param ***REMOVED***string***REMOVED*** oldClass Class to be removed.
 * @param ***REMOVED***boolean***REMOVED*** fromElement Whether or not to remove the class from the
 * panel element instead of the container.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#toggleClass
 * @description
 * Toggles a class on the panel. DO NOT use this to hide/show the panel.
 *
 * @param ***REMOVED***string***REMOVED*** toggleClass Class to be toggled.
 * @param ***REMOVED***boolean***REMOVED*** onElement Whether or not to remove the class from the panel
 *    element instead of the container.
 */

/**
 * @ngdoc method
 * @name MdPanelRef#updatePosition
 * @description
 * Updates the position configuration of a panel. Use this to update the
 * position of a panel that is open, without having to close and re-open the
 * panel.
 *
 * @param ***REMOVED***!MdPanelPosition***REMOVED*** position
 */


/*****************************************************************************
 *                               MdPanelPosition                            *
 *****************************************************************************/


/**
 * @ngdoc type
 * @name MdPanelPosition
 * @module material.components.panel
 * @description
 * Object for configuring the position of the panel. Examples:
 *
 * Centering the panel:
 * `new MdPanelPosition().absolute().center();`
 *
 * Overlapping the panel with an element:
 * `new MdPanelPosition()
 *     .relativeTo(someElement)
 *     .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.ALIGN_TOPS);`
 *
 * Aligning the panel with the bottom of an element:
 * `new MdPanelPosition()
 *     .relativeTo(someElement)
 *     .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#absolute
 * @description
 * Positions the panel absolutely relative to the parent element. If the parent
 * is document.body, this is equivalent to positioning the panel absolutely
 * within the viewport.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#relativeTo
 * @description
 * Positions the panel relative to a specific element.
 * @param ***REMOVED***string|!Element|!angular.JQLite***REMOVED*** element Query selector,
 *     DOM element, or angular element to position the panel with respect to.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#top
 * @description
 * Sets the value of `top` for the panel. Clears any previously set vertical
 * position.
 * @param ***REMOVED***string=***REMOVED*** top Value of `top`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#bottom
 * @description
 * Sets the value of `bottom` for the panel. Clears any previously set vertical
 * position.
 * @param ***REMOVED***string=***REMOVED*** bottom Value of `bottom`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#start
 * @description
 * Sets the panel to the start of the page - `left` if `ltr` or `right` for `rtl`. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** start Value of position. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#end
 * @description
 * Sets the panel to the end of the page - `right` if `ltr` or `left` for `rtl`. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** end Value of position. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#left
 * @description
 * Sets the value of `left` for the panel. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** left Value of `left`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#right
 * @description
 * Sets the value of `right` for the panel. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** right Value of `right`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#centerHorizontally
 * @description
 * Centers the panel horizontally in the viewport. Clears any previously set
 * horizontal position.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#centerVertically
 * @description
 * Centers the panel vertically in the viewport. Clears any previously set
 * vertical position.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#center
 * @description
 * Centers the panel horizontally and vertically in the viewport. This is
 * equivalent to calling both `centerHorizontally` and `centerVertically`.
 * Clears any previously set horizontal and vertical positions.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#addPanelPosition
 * @param ***REMOVED***string***REMOVED*** xPosition
 * @param ***REMOVED***string***REMOVED*** yPosition
 * @description
 * Sets the x and y position for the panel relative to another element. Can be
 * called multiple times to specify an ordered list of panel positions. The
 * first position which allows the panel to be completely on-screen will be
 * chosen; the last position will be chose whether it is on-screen or not.
 *
 * xPosition must be one of the following values available on
 * $mdPanel.xPosition:
 *
 * CENTER | ALIGN_START | ALIGN_END | OFFSET_START | OFFSET_END
 *
 *    *************
 *    *           *
 *    *   PANEL   *
 *    *           *
 *    *************
 *   A B    C    D E
 *
 * A: OFFSET_START (for LTR displays)
 * B: ALIGN_START (for LTR displays)
 * C: CENTER
 * D: ALIGN_END (for LTR displays)
 * E: OFFSET_END (for LTR displays)
 *
 * yPosition must be one of the following values available on
 * $mdPanel.yPosition:
 *
 * CENTER | ALIGN_TOPS | ALIGN_BOTTOMS | ABOVE | BELOW
 *
 *   F
 *   G *************
 *     *           *
 *   H *   PANEL   *
 *     *           *
 *   I *************
 *   J
 *
 * F: BELOW
 * G: ALIGN_TOPS
 * H: CENTER
 * I: ALIGN_BOTTOMS
 * J: ABOVE
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#withOffsetX
 * @description
 * Sets the value of the offset in the x-direction.
 * @param ***REMOVED***string***REMOVED*** offsetX
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelPosition#withOffsetY
 * @description
 * Sets the value of the offset in the y-direction.
 * @param ***REMOVED***string***REMOVED*** offsetY
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */


/*****************************************************************************
 *                               MdPanelAnimation                            *
 *****************************************************************************/


/**
 * @ngdoc object
 * @name MdPanelAnimation
 * @description
 * Animation configuration object. To use, create an MdPanelAnimation with the
 * desired properties, then pass the object as part of $mdPanel creation.
 *
 * Example:
 *
 * var panelAnimation = new MdPanelAnimation()
 *     .openFrom(myButtonEl)
 *     .closeTo('.my-button')
 *     .withAnimation($mdPanel.animation.SCALE);
 *
 * $mdPanel.create(***REMOVED***
 *   animation: panelAnimation
 * ***REMOVED***);
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#openFrom
 * @description
 * Specifies where to start the open animation. `openFrom` accepts a
 * click event object, query selector, DOM element, or a Rect object that
 * is used to determine the bounds. When passed a click event, the location
 * of the click will be used as the position to start the animation.
 *
 * @param ***REMOVED***string|!Element|!Event|***REMOVED***top: number, left: number***REMOVED******REMOVED***
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#closeTo
 * @description
 * Specifies where to animate the panel close. `closeTo` accepts a
 * query selector, DOM element, or a Rect object that is used to determine
 * the bounds.
 *
 * @param ***REMOVED***string|!Element|***REMOVED***top: number, left: number***REMOVED******REMOVED***
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */

/**
 * @ngdoc method
 * @name MdPanelAnimation#withAnimation
 * @description
 * Specifies the animation class.
 *
 * There are several default animations that can be used:
 * ($mdPanel.animation)
 *   SLIDE: The panel slides in and out from the specified
 *       elements. It will not fade in or out.
 *   SCALE: The panel scales in and out. Slide and fade are
 *       included in this animation.
 *   FADE: The panel fades in and out.
 *
 * Custom classes will by default fade in and out unless
 * "transition: opacity 1ms" is added to the to custom class.
 *
 * @param ***REMOVED***string|***REMOVED***open: string, close: string***REMOVED******REMOVED*** cssClass
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */


/*****************************************************************************
 *                                IMPLEMENTATION                             *
 *****************************************************************************/


// Default z-index for the panel.
var defaultZIndex = 80;
var MD_PANEL_HIDDEN = '_md-panel-hidden';

var FOCUS_TRAP_TEMPLATE = angular.element(
    '<div class="_md-panel-focus-trap" tabindex="0"></div>');


/**
 * A service that is used for controlling/displaying panels on the screen.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** $rootElement
 * @param ***REMOVED***!angular.Scope***REMOVED*** $rootScope
 * @param ***REMOVED***!angular.$injector***REMOVED*** $injector
 * @param ***REMOVED***!angular.$window***REMOVED*** $window
 * @final @constructor ngInject
 */
function MdPanelService($rootElement, $rootScope, $injector, $window) ***REMOVED***
  /**
   * Default config options for the panel.
   * Anything angular related needs to be done later. Therefore
   *     scope: $rootScope.$new(true),
   *     attachTo: $rootElement,
   * are added later.
   * @private ***REMOVED***!Object***REMOVED***
   */
  this._defaultConfigOptions = ***REMOVED***
    bindToController: true,
    clickOutsideToClose: false,
    disableParentScroll: false,
    escapeToClose: false,
    focusOnOpen: true,
    fullscreen: false,
    hasBackdrop: false,
    propagateContainerEvents: false,
    transformTemplate: angular.bind(this, this._wrapTemplate),
    trapFocus: false,
    zIndex: defaultZIndex
  ***REMOVED***;

  /** @private ***REMOVED***!Object***REMOVED*** */
  this._config = ***REMOVED******REMOVED***;

  /** @private @const */
  this._$rootElement = $rootElement;

  /** @private @const */
  this._$rootScope = $rootScope;

  /** @private @const */
  this._$injector = $injector;

  /** @private @const */
  this._$window = $window;


  /**
   * Default animations that can be used within the panel.
   * @type ***REMOVED***enum***REMOVED***
   */
  this.animation = MdPanelAnimation.animation;

  /**
   * Possible values of xPosition for positioning the panel relative to
   * another element.
   * @type ***REMOVED***enum***REMOVED***
   */
  this.xPosition = MdPanelPosition.xPosition;

  /**
   * Possible values of yPosition for positioning the panel relative to
   * another element.
   * @type ***REMOVED***enum***REMOVED***
   */
  this.yPosition = MdPanelPosition.yPosition;
***REMOVED***
MdPanelService.$inject = ["$rootElement", "$rootScope", "$injector", "$window"];


/**
 * Creates a panel with the specified options.
 * @param ***REMOVED***!Object=***REMOVED*** config Configuration object for the panel.
 * @returns ***REMOVED***!MdPanelRef***REMOVED***
 */
MdPanelService.prototype.create = function(config) ***REMOVED***
  var configSettings = config || ***REMOVED******REMOVED***;

  this._config = ***REMOVED***
    scope: this._$rootScope.$new(true),
    attachTo: this._$rootElement
  ***REMOVED***;
  angular.extend(this._config, this._defaultConfigOptions, configSettings);

  var instanceId = 'panel_' + this._$injector.get('$mdUtil').nextUid();
  var instanceConfig = angular.extend(***REMOVED*** id: instanceId ***REMOVED***, this._config);

  return new MdPanelRef(instanceConfig, this._$injector);
***REMOVED***;


/**
 * Creates and opens a panel with the specified options.
 * @param ***REMOVED***!Object=***REMOVED*** config Configuration object for the panel.
 * @returns ***REMOVED***!angular.$q.Promise<MdPanelRef>***REMOVED*** The panel created from create.
 */
MdPanelService.prototype.open = function(config) ***REMOVED***
  var panelRef = this.create(config);
  return panelRef.open().then(function() ***REMOVED***
    return panelRef;
  ***REMOVED***);
***REMOVED***;


/**
 * Returns a new instance of the MdPanelPosition. Use this to create the
 * positioning object.
 *
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelService.prototype.newPanelPosition = function() ***REMOVED***
  return new MdPanelPosition(this._$injector);
***REMOVED***;


/**
 * Returns a new instance of the MdPanelAnimation. Use this to create the
 * animation object.
 *
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */
MdPanelService.prototype.newPanelAnimation = function() ***REMOVED***
  return new MdPanelAnimation(this._$injector);
***REMOVED***;


/**
 * Wraps the users template in two elements, md-panel-outer-wrapper, which
 * covers the entire attachTo element, and md-panel, which contains only the
 * template. This allows the panel control over positioning, animations,
 * and similar properties.
 *
 * @param ***REMOVED***string***REMOVED*** origTemplate The original template.
 * @returns ***REMOVED***string***REMOVED*** The wrapped template.
 * @private
 */
MdPanelService.prototype._wrapTemplate = function(origTemplate) ***REMOVED***
  var template = origTemplate || '';

  // The panel should be initially rendered offscreen so we can calculate
  // height and width for positioning.
  return '' +
      '<div class="md-panel-outer-wrapper">' +
      '  <div class="md-panel" style="left: -9999px;">' + template + '</div>' +
      '</div>';
***REMOVED***;


/*****************************************************************************
 *                                 MdPanelRef                                *
 *****************************************************************************/


/**
 * A reference to a created panel. This reference contains a unique id for the
 * panel, along with properties/functions used to control the panel.
 *
 * @param ***REMOVED***!Object***REMOVED*** config
 * @param ***REMOVED***!angular.$injector***REMOVED*** $injector
 * @final @constructor
 */
function MdPanelRef(config, $injector) ***REMOVED***
  // Injected variables.
  /** @private @const ***REMOVED***!angular.$q***REMOVED*** */
  this._$q = $injector.get('$q');

  /** @private @const ***REMOVED***!angular.$mdCompiler***REMOVED*** */
  this._$mdCompiler = $injector.get('$mdCompiler');

  /** @private @const ***REMOVED***!angular.$mdConstant***REMOVED*** */
  this._$mdConstant = $injector.get('$mdConstant');

  /** @private @const ***REMOVED***!angular.$mdUtil***REMOVED*** */
  this._$mdUtil = $injector.get('$mdUtil');

  /** @private @const ***REMOVED***!angular.Scope***REMOVED*** */
  this._$rootScope = $injector.get('$rootScope');

  /** @private @const ***REMOVED***!angular.$animate***REMOVED*** */
  this._$animate = $injector.get('$animate');

  /** @private @const ***REMOVED***!MdPanelRef***REMOVED*** */
  this._$mdPanel = $injector.get('$mdPanel');

  /** @private @const ***REMOVED***!angular.$log***REMOVED*** */
  this._$log = $injector.get('$log');

  /** @private @const ***REMOVED***!angular.$window***REMOVED*** */
  this._$window = $injector.get('$window');

  /** @private @const ***REMOVED***!Function***REMOVED*** */
  this._$$rAF = $injector.get('$$rAF');

  // Public variables.
  /**
   * Unique id for the panelRef.
   * @type ***REMOVED***string***REMOVED***
   */
  this.id = config.id;

  /** @type ***REMOVED***!Object***REMOVED*** */
  this.config = config;

  /**
   * Whether the panel is attached. This is synchronous. When attach is called,
   * isAttached is set to true. When detach is called, isAttached is set to
   * false.
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.isAttached = false;

  // Private variables.
  /** @private ***REMOVED***!angular.JQLite|undefined***REMOVED*** */
  this._panelContainer;

  /** @private ***REMOVED***!angular.JQLite|undefined***REMOVED*** */
  this._panelEl;

  /** @private ***REMOVED***Array<function()>***REMOVED*** */
  this._removeListeners = [];

  /** @private ***REMOVED***!angular.JQLite|undefined***REMOVED*** */
  this._topFocusTrap;

  /** @private ***REMOVED***!angular.JQLite|undefined***REMOVED*** */
  this._bottomFocusTrap;

  /** @private ***REMOVED***!$mdPanel|undefined***REMOVED*** */
  this._backdropRef;

  /** @private ***REMOVED***Function?***REMOVED*** */
  this._restoreScroll = null;
***REMOVED***


/**
 * Opens an already created and configured panel. If the panel is already
 * visible, does nothing.
 *
 * @returns ***REMOVED***!angular.$q.Promise<!MdPanelRef>***REMOVED*** A promise that is resolved when
 * the panel is opened and animations finish.
 */
MdPanelRef.prototype.open = function() ***REMOVED***
  var self = this;
  return this._$q(function(resolve, reject) ***REMOVED***
    var done = self._done(resolve, self);
    var show = self._simpleBind(self.show, self);

    self.attach()
        .then(show)
        .then(done)
        .catch(reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Closes the panel.
 *
 * @returns ***REMOVED***!angular.$q.Promise<!MdPanelRef>***REMOVED*** A promise that is resolved when the panel is
 * closed and animations finish.
 */
MdPanelRef.prototype.close = function() ***REMOVED***
  var self = this;

  return this._$q(function(resolve, reject) ***REMOVED***
    var done = self._done(resolve, self);
    var detach = self._simpleBind(self.detach, self);

    self.hide()
        .then(detach)
        .then(done)
        .catch(reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Attaches the panel. The panel will be hidden afterwards.
 *
 * @returns ***REMOVED***!angular.$q.Promise<!MdPanelRef>***REMOVED*** A promise that is resolved when
 * the panel is attached.
 */
MdPanelRef.prototype.attach = function() ***REMOVED***
  if (this.isAttached && this._panelEl) ***REMOVED***
    return this._$q.when(this);
  ***REMOVED***

  var self = this;
  return this._$q(function(resolve, reject) ***REMOVED***
    var done = self._done(resolve, self);
    var onDomAdded = self.config['onDomAdded'] || angular.noop;
    var addListeners = function(response) ***REMOVED***
        self.isAttached = true;
        self._addEventListeners();
        return response;
    ***REMOVED***;

    self._$q.all([
        self._createBackdrop(),
        self._createPanel()
            .then(addListeners)
            .catch(reject)
    ]).then(onDomAdded)
      .then(done)
      .catch(reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Only detaches the panel. Will NOT hide the panel first.
 *
 * @returns ***REMOVED***!angular.$q.Promise<!MdPanelRef>***REMOVED*** A promise that is resolved when the panel is
 * detached.
 */
MdPanelRef.prototype.detach = function() ***REMOVED***
  if (!this.isAttached) ***REMOVED***
    return this._$q.when(this);
  ***REMOVED***

  var self = this;
  var onDomRemoved = self.config['onDomRemoved'] || angular.noop;

  var detachFn = function() ***REMOVED***
    self._removeEventListeners();

    // Remove the focus traps that we added earlier for keeping focus within
    // the panel.
    if (self._topFocusTrap && self._topFocusTrap.parentNode) ***REMOVED***
      self._topFocusTrap.parentNode.removeChild(self._topFocusTrap);
    ***REMOVED***

    if (self._bottomFocusTrap && self._bottomFocusTrap.parentNode) ***REMOVED***
      self._bottomFocusTrap.parentNode.removeChild(self._bottomFocusTrap);
    ***REMOVED***

    self._panelContainer.remove();
    self.isAttached = false;
    return self._$q.when(self);
  ***REMOVED***;

  if (this._restoreScroll) ***REMOVED***
    this._restoreScroll();
    this._restoreScroll = null;
  ***REMOVED***

  return this._$q(function(resolve, reject) ***REMOVED***
    var done = self._done(resolve, self);

    self._$q.all([
      detachFn(),
      self._backdropRef ? self._backdropRef.detach() : true
    ]).then(onDomRemoved)
      .then(done)
      .catch(reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Destroys the panel. The Panel cannot be opened again after this.
 */
MdPanelRef.prototype.destroy = function() ***REMOVED***
  this.config.scope.$destroy();
  this.config.locals = null;
***REMOVED***;


/**
 * Shows the panel.
 *
 * @returns ***REMOVED***!angular.$q.Promise<!MdPanelRef>***REMOVED*** A promise that is resolved when the panel has
 * shown and animations finish.
 */
MdPanelRef.prototype.show = function() ***REMOVED***
  if (!this._panelContainer) ***REMOVED***
    return this._$q(function(resolve, reject) ***REMOVED***
      reject('Panel does not exist yet. Call open() or attach().');
    ***REMOVED***);
  ***REMOVED***

  if (!this._panelContainer.hasClass(MD_PANEL_HIDDEN)) ***REMOVED***
    return this._$q.when(this);
  ***REMOVED***

  var self = this;
  var animatePromise = function() ***REMOVED***
    self.removeClass(MD_PANEL_HIDDEN);
    return self._animateOpen();
  ***REMOVED***;

  return this._$q(function(resolve, reject) ***REMOVED***
    var done = self._done(resolve, self);
    var onOpenComplete = self.config['onOpenComplete'] || angular.noop;

    self._$q.all([
      self._backdropRef ? self._backdropRef.show() : self,
      animatePromise().then(function() ***REMOVED*** self._focusOnOpen(); ***REMOVED***, reject)
    ]).then(onOpenComplete)
      .then(done)
      .catch(reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Hides the panel.
 *
 * @returns ***REMOVED***!angular.$q.Promise<!MdPanelRef>***REMOVED*** A promise that is resolved when the panel has
 * hidden and animations finish.
 */
MdPanelRef.prototype.hide = function() ***REMOVED***
  if (!this._panelContainer) ***REMOVED***
    return this._$q(function(resolve, reject) ***REMOVED***
      reject('Panel does not exist yet. Call open() or attach().');
    ***REMOVED***);
  ***REMOVED***

  if (this._panelContainer.hasClass(MD_PANEL_HIDDEN)) ***REMOVED***
    return this._$q.when(this);
  ***REMOVED***

  var self = this;

  return this._$q(function(resolve, reject) ***REMOVED***
    var done = self._done(resolve, self);
    var onRemoving = self.config['onRemoving'] || angular.noop;

    var focusOnOrigin = function() ***REMOVED***
      var origin = self.config['origin'];
      if (origin) ***REMOVED***
        getElement(origin).focus();
      ***REMOVED***
    ***REMOVED***;

    var hidePanel = function() ***REMOVED***
      self.addClass(MD_PANEL_HIDDEN);
    ***REMOVED***;

    self._$q.all([
      self._backdropRef ? self._backdropRef.hide() : self,
      self._animateClose()
          .then(onRemoving)
          .then(hidePanel)
          .then(focusOnOrigin)
          .catch(reject)
    ]).then(done, reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Add a class to the panel. DO NOT use this to hide/show the panel.
 *
 * @param ***REMOVED***string***REMOVED*** newClass Class to be added.
 * @param ***REMOVED***boolean***REMOVED*** toElement Whether or not to add the class to the panel
 *    element instead of the container.
 */
MdPanelRef.prototype.addClass = function(newClass, toElement) ***REMOVED***
  if (!this._panelContainer) ***REMOVED***
    throw new Error('Panel does not exist yet. Call open() or attach().');
  ***REMOVED***

  if (!toElement && !this._panelContainer.hasClass(newClass)) ***REMOVED***
    this._panelContainer.addClass(newClass);
  ***REMOVED*** else if (toElement && !this._panelEl.hasClass(newClass)) ***REMOVED***
    this._panelEl.addClass(newClass);
  ***REMOVED***
***REMOVED***;


/**
 * Remove a class from the panel. DO NOT use this to hide/show the panel.
 *
 * @param ***REMOVED***string***REMOVED*** oldClass Class to be removed.
 * @param ***REMOVED***boolean***REMOVED*** fromElement Whether or not to remove the class from the
 *    panel element instead of the container.
 */
MdPanelRef.prototype.removeClass = function(oldClass, fromElement) ***REMOVED***
  if (!this._panelContainer) ***REMOVED***
    throw new Error('Panel does not exist yet. Call open() or attach().');
  ***REMOVED***

  if (!fromElement && this._panelContainer.hasClass(oldClass)) ***REMOVED***
    this._panelContainer.removeClass(oldClass);
  ***REMOVED*** else if (fromElement && this._panelEl.hasClass(oldClass)) ***REMOVED***
    this._panelEl.removeClass(oldClass);
  ***REMOVED***
***REMOVED***;


/**
 * Toggle a class on the panel. DO NOT use this to hide/show the panel.
 *
 * @param ***REMOVED***string***REMOVED*** toggleClass The class to toggle.
 * @param ***REMOVED***boolean***REMOVED*** onElement Whether or not to toggle the class on the panel
 *    element instead of the container.
 */
MdPanelRef.prototype.toggleClass = function(toggleClass, onElement) ***REMOVED***
  if (!this._panelContainer) ***REMOVED***
    throw new Error('Panel does not exist yet. Call open() or attach().');
  ***REMOVED***

  if (!onElement) ***REMOVED***
    this._panelContainer.toggleClass(toggleClass);
  ***REMOVED*** else ***REMOVED***
    this._panelEl.toggleClass(toggleClass);
  ***REMOVED***
***REMOVED***;


/**
 * Creates a panel and adds it to the dom.
 *
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the panel is
 * created.
 * @private
 */
MdPanelRef.prototype._createPanel = function() ***REMOVED***
  var self = this;

  return this._$q(function(resolve, reject) ***REMOVED***
    if (!self.config.locals) ***REMOVED***
      self.config.locals = ***REMOVED******REMOVED***;
    ***REMOVED***

    self.config.locals.mdPanelRef = self;
    self._$mdCompiler.compile(self.config)
        .then(function(compileData) ***REMOVED***
          self._panelContainer = compileData.link(self.config['scope']);
          getElement(self.config['attachTo']).append(self._panelContainer);

          if (self.config['disableParentScroll']) ***REMOVED***
            self._restoreScroll = self._$mdUtil.disableScrollAround(
              null,
              self._panelContainer,
              ***REMOVED*** disableScrollMask: true ***REMOVED***
            );
          ***REMOVED***

          self._panelEl = angular.element(
              self._panelContainer[0].querySelector('.md-panel'));

          // Add a custom CSS class to the panel element.
          if (self.config['panelClass']) ***REMOVED***
            self._panelEl.addClass(self.config['panelClass']);
          ***REMOVED***

          // Handle click and touch events for the panel container.
          if (self.config['propagateContainerEvents']) ***REMOVED***
            self._panelContainer.css('pointer-events', 'none');
          ***REMOVED***

          // Panel may be outside the $rootElement, tell ngAnimate to animate
          // regardless.
          if (self._$animate.pin) ***REMOVED***
            self._$animate.pin(self._panelContainer,
                getElement(self.config['attachTo']));
          ***REMOVED***

          self._configureTrapFocus();
          self._addStyles().then(function() ***REMOVED***
            resolve(self);
          ***REMOVED***, reject);
        ***REMOVED***, reject);
  ***REMOVED***);
***REMOVED***;


/**
 * Adds the styles for the panel, such as positioning and z-index.
 * @return ***REMOVED***!angular.$q.Promise<MdPanelRef>***REMOVED***
 * @private
 */
MdPanelRef.prototype._addStyles = function() ***REMOVED***
  var self = this;
  return this._$q(function(resolve) ***REMOVED***
    self._panelContainer.css('z-index', self.config['zIndex']);
    self._panelEl.css('z-index', self.config['zIndex'] + 1);

    var hideAndResolve = function() ***REMOVED***
      // Remove left: -9999px and add hidden class.
      self._panelEl.css('left', '');
      self._panelContainer.addClass(MD_PANEL_HIDDEN);
      resolve(self);
    ***REMOVED***;

    if (self.config['fullscreen']) ***REMOVED***
      self._panelEl.addClass('_md-panel-fullscreen');
      hideAndResolve();
      return; // Don't setup positioning.
    ***REMOVED***

    var positionConfig = self.config['position'];
    if (!positionConfig) ***REMOVED***
      hideAndResolve();
      return; // Don't setup positioning.
    ***REMOVED***

    // Wait for angular to finish processing the template, then position it
    // correctly. This is necessary so that the panel will have a defined height
    // and width.
    self._$rootScope['$$postDigest'](function() ***REMOVED***
      self._updatePosition(true);
      resolve(self);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***;


/**
 * Updates the position configuration of a panel
 * @param ***REMOVED***!MdPanelPosition***REMOVED*** position
 */
MdPanelRef.prototype.updatePosition = function(position) ***REMOVED***
  if (!this._panelContainer) ***REMOVED***
    throw new Error('Panel does not exist yet. Call open() or attach().');
  ***REMOVED***

  this.config['position'] = position;
  this._updatePosition();
***REMOVED***;


/**
 * Calculates and updates the position of the panel.
 * @param ***REMOVED***boolean=***REMOVED*** init
 * @private
 */
MdPanelRef.prototype._updatePosition = function(init) ***REMOVED***
  var positionConfig = this.config['position'];

  if (positionConfig) ***REMOVED***
    positionConfig._setPanelPosition(this._panelEl);

    // Hide the panel now that position is known.
    if (init) ***REMOVED***
      this._panelContainer.addClass(MD_PANEL_HIDDEN);
    ***REMOVED***

    this._panelEl.css(MdPanelPosition.absPosition.TOP, positionConfig.getTop());
    this._panelEl.css(MdPanelPosition.absPosition.BOTTOM, positionConfig.getBottom());
    this._panelEl.css(MdPanelPosition.absPosition.LEFT, positionConfig.getLeft());
    this._panelEl.css(MdPanelPosition.absPosition.RIGHT, positionConfig.getRight());

    // Use the vendor prefixed version of transform.
    var prefixedTransform = this._$mdConstant.CSS.TRANSFORM;
    this._panelEl.css(prefixedTransform, positionConfig.getTransform());
  ***REMOVED***
***REMOVED***;


/**
 * Focuses on the panel or the first focus target.
 * @private
 */
MdPanelRef.prototype._focusOnOpen = function() ***REMOVED***
  if (this.config['focusOnOpen']) ***REMOVED***
    // Wait for the template to finish rendering to guarantee md-autofocus has
    // finished adding the class md-autofocus, otherwise the focusable element
    // isn't available to focus.
    var self = this;
    this._$rootScope['$$postDigest'](function() ***REMOVED***
      var target = self._$mdUtil.findFocusTarget(self._panelEl) ||
          self._panelEl;
      target.focus();
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;


/**
 * Shows the backdrop.
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED*** A promise that is resolved when the backdrop
 * is created and attached.
 * @private
 */
MdPanelRef.prototype._createBackdrop = function() ***REMOVED***
  if (this.config.hasBackdrop) ***REMOVED***
    if (!this._backdropRef) ***REMOVED***
      var backdropAnimation = this._$mdPanel.newPanelAnimation()
          .openFrom(this.config.attachTo)
          .withAnimation(***REMOVED***
            open: '_md-opaque-enter',
            close: '_md-opaque-leave'
          ***REMOVED***);
      var backdropConfig = ***REMOVED***
        animation: backdropAnimation,
        attachTo: this.config.attachTo,
        focusOnOpen: false,
        panelClass: '_md-panel-backdrop',
        zIndex: this.config.zIndex - 1
      ***REMOVED***;
      this._backdropRef = this._$mdPanel.create(backdropConfig);
    ***REMOVED***
    if (!this._backdropRef.isAttached) ***REMOVED***
      return this._backdropRef.attach();
    ***REMOVED***
  ***REMOVED***
***REMOVED***;


/**
 * Listen for escape keys and outside clicks to auto close.
 * @private
 */
MdPanelRef.prototype._addEventListeners = function() ***REMOVED***
  this._configureEscapeToClose();
  this._configureClickOutsideToClose();
  this._configureScrollListener();
***REMOVED***;


/**
 * Remove event listeners added in _addEventListeners.
 * @private
 */
MdPanelRef.prototype._removeEventListeners = function() ***REMOVED***
  this._removeListeners && this._removeListeners.forEach(function(removeFn) ***REMOVED***
    removeFn();
  ***REMOVED***);
  this._removeListeners = [];
***REMOVED***;


/**
 * Setup the escapeToClose event listeners.
 * @private
 */
MdPanelRef.prototype._configureEscapeToClose = function() ***REMOVED***
  if (this.config['escapeToClose']) ***REMOVED***
    var parentTarget = getElement(this.config['attachTo']);
    var self = this;

    var keyHandlerFn = function(ev) ***REMOVED***
      if (ev.keyCode === self._$mdConstant.KEY_CODE.ESCAPE) ***REMOVED***
        ev.stopPropagation();
        ev.preventDefault();

        self.close();
      ***REMOVED***
    ***REMOVED***;

    // Add keydown listeners
    this._panelContainer.on('keydown', keyHandlerFn);
    parentTarget.on('keydown', keyHandlerFn);

    // Queue remove listeners function
    this._removeListeners.push(function() ***REMOVED***
      self._panelContainer.off('keydown', keyHandlerFn);
      parentTarget.off('keydown', keyHandlerFn);
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;


/**
 * Setup the clickOutsideToClose event listeners.
 * @private
 */
MdPanelRef.prototype._configureClickOutsideToClose = function() ***REMOVED***
  if (this.config['clickOutsideToClose']) ***REMOVED***
    var target = this._panelContainer;
    var sourceElem;

    // Keep track of the element on which the mouse originally went down
    // so that we can only close the backdrop when the 'click' started on it.
    // A simple 'click' handler does not work,
    // it sets the target object as the element the mouse went down on.
    var mousedownHandler = function(ev) ***REMOVED***
      sourceElem = ev.target;
    ***REMOVED***;

    // We check if our original element and the target is the backdrop
    // because if the original was the backdrop and the target was inside the
    // panel we don't want to panel to close.
    var self = this;
    var mouseupHandler = function(ev) ***REMOVED***
      if (sourceElem === target[0] && ev.target === target[0]) ***REMOVED***
        ev.stopPropagation();
        ev.preventDefault();

        self.close();
      ***REMOVED***
    ***REMOVED***;

    // Add listeners
    target.on('mousedown', mousedownHandler);
    target.on('mouseup', mouseupHandler);

    // Queue remove listeners function
    this._removeListeners.push(function() ***REMOVED***
      target.off('mousedown', mousedownHandler);
      target.off('mouseup', mouseupHandler);
    ***REMOVED***);
  ***REMOVED***
***REMOVED***;


/**
 * Configures the listeners for updating the panel position on scroll.
 * @private
*/
MdPanelRef.prototype._configureScrollListener = function() ***REMOVED***
  var updatePosition = angular.bind(this, this._updatePosition);
  var debouncedUpdatePosition = this._$$rAF.throttle(updatePosition);
  var self = this;

  var onScroll = function() ***REMOVED***
    if (!self.config['disableParentScroll']) ***REMOVED***
      debouncedUpdatePosition();
    ***REMOVED***
  ***REMOVED***;

  // Add listeners.
  this._$window.addEventListener('scroll', onScroll, true);

  // Queue remove listeners function.
  this._removeListeners.push(function() ***REMOVED***
    self._$window.removeEventListener('scroll', onScroll, true);
  ***REMOVED***);
***REMOVED***;


/**
 * Setup the focus traps. These traps will wrap focus when tabbing past the
 * panel. When shift-tabbing, the focus will stick in place.
 * @private
 */
MdPanelRef.prototype._configureTrapFocus = function() ***REMOVED***
  // Focus doesn't remain instead of the panel without this.
  this._panelEl.attr('tabIndex', '-1');
  if (this.config['trapFocus']) ***REMOVED***
    var element = this._panelEl;
    // Set up elements before and after the panel to capture focus and
    // redirect back into the panel.
    this._topFocusTrap = FOCUS_TRAP_TEMPLATE.clone()[0];
    this._bottomFocusTrap = FOCUS_TRAP_TEMPLATE.clone()[0];

    // When focus is about to move out of the panel, we want to intercept it
    // and redirect it back to the panel element.
    var focusHandler = function() ***REMOVED***
      element.focus();
    ***REMOVED***;
    this._topFocusTrap.addEventListener('focus', focusHandler);
    this._bottomFocusTrap.addEventListener('focus', focusHandler);

    // Queue remove listeners function
    this._removeListeners.push(this._simpleBind(function() ***REMOVED***
      this._topFocusTrap.removeEventListener('focus', focusHandler);
      this._bottomFocusTrap.removeEventListener('focus', focusHandler);
    ***REMOVED***, this));

    // The top focus trap inserted immediately before the md-panel element (as
    // a sibling). The bottom focus trap inserted immediately after the
    // md-panel element (as a sibling).
    element[0].parentNode.insertBefore(this._topFocusTrap, element[0]);
    element.after(this._bottomFocusTrap);
  ***REMOVED***
***REMOVED***;


/**
 * Animate the panel opening.
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED***
 * @private
 */
MdPanelRef.prototype._animateOpen = function() ***REMOVED***
  this.addClass('md-panel-is-showing');
  var animationConfig = this.config['animation'];
  if (!animationConfig) ***REMOVED***
    // Promise is in progress, return it.
    this.addClass('_md-panel-shown');
    return this._$q.when(this);
  ***REMOVED***

  var self = this;
  return this._$q(function(resolve) ***REMOVED***
    var done = self._done(resolve, self);
    var warnAndOpen = function() ***REMOVED***
      self._$log.warn(
          'MdPanel Animations failed. Showing panel without animating.');
      done();
    ***REMOVED***;

    animationConfig.animateOpen(self._panelEl)
        .then(done, warnAndOpen);
  ***REMOVED***);
***REMOVED***;


/**
 * Animate the panel closing.
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED***
 * @private
 */
MdPanelRef.prototype._animateClose = function() ***REMOVED***
  var animationConfig = this.config['animation'];
  if (!animationConfig) ***REMOVED***
    this.removeClass('md-panel-is-showing');
    this.removeClass('_md-panel-shown');
    return this._$q.when(this);
  ***REMOVED***

  var self = this;
  return this._$q(function(resolve) ***REMOVED***
    var done = function() ***REMOVED***
      self.removeClass('md-panel-is-showing');
      resolve(self);
    ***REMOVED***;
    var warnAndClose = function() ***REMOVED***
      self._$log.warn(
          'MdPanel Animations failed. Hiding panel without animating.');
      done();
    ***REMOVED***;

    animationConfig.animateClose(self._panelEl)
        .then(done, warnAndClose);
  ***REMOVED***);
***REMOVED***;


/**
 * Faster, more basic than angular.bind
 * http://jsperf.com/angular-bind-vs-custom-vs-native
 * @param ***REMOVED***function***REMOVED*** callback
 * @param ***REMOVED***!Object***REMOVED*** self
 * @return ***REMOVED***function***REMOVED*** Callback function with a bound self.
 */
MdPanelRef.prototype._simpleBind = function(callback, self) ***REMOVED***
  return function(value) ***REMOVED***
    return callback.apply(self, value);
  ***REMOVED***;
***REMOVED***;


/**
 * @param ***REMOVED***function***REMOVED*** callback
 * @param ***REMOVED***!Object***REMOVED*** self
 * @return ***REMOVED***function***REMOVED*** Callback function with a self param.
 */
MdPanelRef.prototype._done = function(callback, self) ***REMOVED***
  return function() ***REMOVED***
    callback(self);
  ***REMOVED***;
***REMOVED***;


/*****************************************************************************
 *                               MdPanelPosition                             *
 *****************************************************************************/


/**
 * Position configuration object. To use, create an MdPanelPosition with the
 * desired properties, then pass the object as part of $mdPanel creation.
 *
 * Example:
 *
 * var panelPosition = new MdPanelPosition()
 *     .relativeTo(myButtonEl)
 *     .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.ALIGN_TOPS);
 *
 * $mdPanel.create(***REMOVED***
 *   position: panelPosition
 * ***REMOVED***);
 *
 * @param ***REMOVED***!angular.$injector***REMOVED*** $injector
 * @final @constructor
 */
function MdPanelPosition($injector) ***REMOVED***
  /** @private @const ***REMOVED***!angular.$window***REMOVED*** */
  this._$window = $injector.get('$window');

  /** @private ***REMOVED***boolean***REMOVED*** */
  this._isRTL = $injector.get('$mdUtil').bidi() === 'rtl';

  /** @private ***REMOVED***boolean***REMOVED*** */
  this._absolute = false;

  /** @private ***REMOVED***!angular.JQLite***REMOVED*** */
  this._relativeToEl;

  /** @private ***REMOVED***string***REMOVED*** */
  this._top = '';

  /** @private ***REMOVED***string***REMOVED*** */
  this._bottom = '';

  /** @private ***REMOVED***string***REMOVED*** */
  this._left = '';

  /** @private ***REMOVED***string***REMOVED*** */
  this._right = '';

  /** @private ***REMOVED***!Array<string>***REMOVED*** */
  this._translateX = [];

  /** @private ***REMOVED***!Array<string>***REMOVED*** */
  this._translateY = [];

  /** @private ***REMOVED***!Array<***REMOVED***x:string, y:string***REMOVED***>***REMOVED*** */
  this._positions = [];

  /** @private ***REMOVED***?***REMOVED***x:string, y:string***REMOVED******REMOVED*** */
  this._actualPosition;
***REMOVED***


/**
 * Possible values of xPosition.
 * @enum ***REMOVED***string***REMOVED***
 */
MdPanelPosition.xPosition = ***REMOVED***
  CENTER: 'center',
  ALIGN_START: 'align-start',
  ALIGN_END: 'align-end',
  OFFSET_START: 'offset-start',
  OFFSET_END: 'offset-end'
***REMOVED***;


/**
 * Possible values of yPosition.
 * @enum ***REMOVED***string***REMOVED***
 */
MdPanelPosition.yPosition = ***REMOVED***
  CENTER: 'center',
  ALIGN_TOPS: 'align-tops',
  ALIGN_BOTTOMS: 'align-bottoms',
  ABOVE: 'above',
  BELOW: 'below'
***REMOVED***;


/**
 * Possible values of absolute position.
 * @enum ***REMOVED***string***REMOVED***
 */
MdPanelPosition.absPosition = ***REMOVED***
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
***REMOVED***;


/**
 * Sets absolute positioning for the panel.
 * @return ***REMOVED***!MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.absolute = function() ***REMOVED***
  this._absolute = true;
  return this;
***REMOVED***;

/**
 * Sets the value of a position for the panel. Clears any previously set position.
 * @param ***REMOVED***string***REMOVED*** position Position to set
 * @param ***REMOVED***string=***REMOVED*** value Value of the position. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 * @private
 */
MdPanelPosition.prototype._setPosition = function(position, value) ***REMOVED***
  if (position === MdPanelPosition.absPosition.RIGHT || position === MdPanelPosition.absPosition.LEFT) ***REMOVED***
    this._left = this._right = '';
  ***REMOVED***
  else if (position === MdPanelPosition.absPosition.BOTTOM || position === MdPanelPosition.absPosition.TOP) ***REMOVED***
    this._top = this._bottom = '';
  ***REMOVED***
  else ***REMOVED***
    var positions = Object.keys(MdPanelPosition.absPosition).join().toLowerCase();

    throw new Error('Position must be one of ' + positions + '.');
  ***REMOVED***

  this['_' +  position] = angular.isString(value) ? value : '0';

  return this;
***REMOVED***;


/**
 * Sets the value of `top` for the panel. Clears any previously set vertical
 * position.
 * @param ***REMOVED***string=***REMOVED*** top Value of `top`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.top = function(top) ***REMOVED***
  return this._setPosition(MdPanelPosition.absPosition.TOP, top);
***REMOVED***;


/**
 * Sets the value of `bottom` for the panel. Clears any previously set vertical
 * position.
 * @param ***REMOVED***string=***REMOVED*** bottom Value of `bottom`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.bottom = function(bottom) ***REMOVED***
  return this._setPosition(MdPanelPosition.absPosition.BOTTOM, bottom);
***REMOVED***;


/**
 * Sets the panel to the start of the page - `left` if `ltr` or `right` for `rtl`. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** start Value of position. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.start = function(start) ***REMOVED***
  var position = this._isRTL ? MdPanelPosition.absPosition.RIGHT : MdPanelPosition.absPosition.LEFT;
  return this._setPosition(position, start);
***REMOVED***;


/**
 * Sets the panel to the end of the page - `right` if `ltr` or `left` for `rtl`. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** end Value of position. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.end = function(end) ***REMOVED***
  var position = this._isRTL ? MdPanelPosition.absPosition.LEFT : MdPanelPosition.absPosition.RIGHT;
  return this._setPosition(position, end);
***REMOVED***;


/**
 * Sets the value of `left` for the panel. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** left Value of `left`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.left = function(left) ***REMOVED***
  return this._setPosition(MdPanelPosition.absPosition.LEFT, left);
***REMOVED***;


/**
 * Sets the value of `right` for the panel. Clears any previously set
 * horizontal position.
 * @param ***REMOVED***string=***REMOVED*** right Value of `right`. Defaults to '0'.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
*/
MdPanelPosition.prototype.right = function(right) ***REMOVED***
  return this._setPosition(MdPanelPosition.absPosition.RIGHT, right);
***REMOVED***;


/**
 * Centers the panel horizontally in the viewport. Clears any previously set
 * horizontal position.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.centerHorizontally = function() ***REMOVED***
  this._left = '50%';
  this._right = '';
  this._translateX = ['-50%'];
  return this;
***REMOVED***;


/**
 * Centers the panel vertically in the viewport. Clears any previously set
 * vertical position.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.centerVertically = function() ***REMOVED***
  this._top = '50%';
  this._bottom = '';
  this._translateY = ['-50%'];
  return this;
***REMOVED***;


/**
 * Centers the panel horizontally and vertically in the viewport. This is
 * equivalent to calling both `centerHorizontally` and `centerVertically`.
 * Clears any previously set horizontal and vertical positions.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.center = function() ***REMOVED***
  return this.centerHorizontally().centerVertically();
***REMOVED***;


/**
 * Sets element for relative positioning.
 * @param ***REMOVED***string|!Element|!angular.JQLite***REMOVED*** element Query selector,
 *     DOM element, or angular element to set the panel relative to.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.relativeTo = function(element) ***REMOVED***
  this._absolute = false;
  this._relativeToEl = getElement(element);
  return this;
***REMOVED***;


/**
 * Sets the x and y positions for the panel relative to another element.
 * @param ***REMOVED***string***REMOVED*** xPosition must be one of the MdPanelPosition.xPosition values.
 * @param ***REMOVED***string***REMOVED*** yPosition must be one of the MdPanelPosition.yPosition values.
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.addPanelPosition = function(xPosition, yPosition) ***REMOVED***
  if (!this._relativeToEl) ***REMOVED***
    throw new Error('addPanelPosition can only be used with relative ' +
        'positioning. Set relativeTo first.');
  ***REMOVED***

  this._validateXPosition(xPosition);
  this._validateYPosition(yPosition);

  this._positions.push(***REMOVED***
      x: xPosition,
      y: yPosition,
  ***REMOVED***);
  return this;
***REMOVED***;


/**
 * Ensure that yPosition is a valid position name. Throw an exception if not.
 * @param ***REMOVED***string***REMOVED*** yPosition
 */
MdPanelPosition.prototype._validateYPosition = function(yPosition) ***REMOVED***
  // empty is ok
  if (yPosition == null) ***REMOVED***
      return;
  ***REMOVED***

  var positionKeys = Object.keys(MdPanelPosition.yPosition);
  var positionValues = [];
  for (var key, i = 0; key = positionKeys[i]; i++) ***REMOVED***
    var position = MdPanelPosition.yPosition[key];
    positionValues.push(position);

    if (position === yPosition) ***REMOVED***
      return;
    ***REMOVED***
  ***REMOVED***

  throw new Error('Panel y position only accepts the following values:\n' +
    positionValues.join(' | '));
***REMOVED***;


/**
 * Ensure that xPosition is a valid position name. Throw an exception if not.
 * @param ***REMOVED***string***REMOVED*** xPosition
 */
MdPanelPosition.prototype._validateXPosition = function(xPosition) ***REMOVED***
  // empty is ok
  if (xPosition == null) ***REMOVED***
      return;
  ***REMOVED***

  var positionKeys = Object.keys(MdPanelPosition.xPosition);
  var positionValues = [];
  for (var key, i = 0; key = positionKeys[i]; i++) ***REMOVED***
    var position = MdPanelPosition.xPosition[key];
    positionValues.push(position);
    if (position === xPosition) ***REMOVED***
      return;
    ***REMOVED***
  ***REMOVED***

  throw new Error('Panel x Position only accepts the following values:\n' +
      positionValues.join(' | '));
***REMOVED***;


/**
 * Sets the value of the offset in the x-direction. This will add
 * to any previously set offsets.
 * @param ***REMOVED***string***REMOVED*** offsetX
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.withOffsetX = function(offsetX) ***REMOVED***
  this._translateX.push(offsetX);
  return this;
***REMOVED***;


/**
 * Sets the value of the offset in the y-direction. This will add
 * to any previously set offsets.
 * @param ***REMOVED***string***REMOVED*** offsetY
 * @returns ***REMOVED***MdPanelPosition***REMOVED***
 */
MdPanelPosition.prototype.withOffsetY = function(offsetY) ***REMOVED***
  this._translateY.push(offsetY);
  return this;
***REMOVED***;


/**
 * Gets the value of `top` for the panel.
 * @returns ***REMOVED***string***REMOVED***
 */
MdPanelPosition.prototype.getTop = function() ***REMOVED***
  return this._top;
***REMOVED***;


/**
 * Gets the value of `bottom` for the panel.
 * @returns ***REMOVED***string***REMOVED***
 */
MdPanelPosition.prototype.getBottom = function() ***REMOVED***
  return this._bottom;
***REMOVED***;


/**
 * Gets the value of `left` for the panel.
 * @returns ***REMOVED***string***REMOVED***
 */
MdPanelPosition.prototype.getLeft = function() ***REMOVED***
  return this._left;
***REMOVED***;


/**
 * Gets the value of `right` for the panel.
 * @returns ***REMOVED***string***REMOVED***
 */
MdPanelPosition.prototype.getRight = function() ***REMOVED***
  return this._right;
***REMOVED***;


/**
 * Gets the value of `transform` for the panel.
 * @returns ***REMOVED***string***REMOVED***
 */
MdPanelPosition.prototype.getTransform = function() ***REMOVED***
  var translateX = this._reduceTranslateValues('translateX', this._translateX);
  var translateY = this._reduceTranslateValues('translateY', this._translateY);

  // It's important to trim the result, because the browser will ignore the set
  // operation if the string contains only whitespace.
  return (translateX + ' ' + translateY).trim();
***REMOVED***;

/**
 * True if the panel is completely on-screen with this positioning; false
 * otherwise.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** panelEl
 * @return ***REMOVED***boolean***REMOVED***
 */
MdPanelPosition.prototype._isOnscreen = function(panelEl) ***REMOVED***
  // this works because we always use fixed positioning for the panel,
  // which is relative to the viewport.
  // TODO(gmoothart): take into account _translateX and _translateY to the
  //   extent feasible.

  var left = parseInt(this.getLeft());
  var top = parseInt(this.getTop());
  var right = left + panelEl[0].offsetWidth;
  var bottom = top + panelEl[0].offsetHeight;

  return (left >= 0) &&
    (top >= 0) &&
    (bottom <= this._$window.innerHeight) &&
    (right <= this._$window.innerWidth);
***REMOVED***;


/**
 * Gets the first x/y position that can fit on-screen.
 * @returns ***REMOVED******REMOVED***x: string, y: string***REMOVED******REMOVED***
 */
MdPanelPosition.prototype.getActualPosition = function() ***REMOVED***
  return this._actualPosition;
***REMOVED***;


/**
 * Reduces a list of translate values to a string that can be used within
 * transform.
 * @param ***REMOVED***string***REMOVED*** translateFn
 * @param ***REMOVED***!Array<string>***REMOVED*** values
 * @returns ***REMOVED***string***REMOVED***
 * @private
 */
MdPanelPosition.prototype._reduceTranslateValues =
    function(translateFn, values) ***REMOVED***
      return values.map(function(translation) ***REMOVED***
        return translateFn + '(' + translation + ')';
      ***REMOVED***).join(' ');
    ***REMOVED***;


/**
 * Sets the panel position based on the created panel element and best x/y
 * positioning.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** panelEl
 * @private
 */
MdPanelPosition.prototype._setPanelPosition = function(panelEl) ***REMOVED***
  // Only calculate the position if necessary.
  if (this._absolute) ***REMOVED***
    return;
  ***REMOVED***

  if (this._actualPosition) ***REMOVED***
    this._calculatePanelPosition(panelEl, this._actualPosition);
    return;
  ***REMOVED***

  for (var i = 0; i < this._positions.length; i++) ***REMOVED***
    this._actualPosition = this._positions[i];
    this._calculatePanelPosition(panelEl, this._actualPosition);
    if (this._isOnscreen(panelEl)) ***REMOVED***
      break;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;


/**
 * Switching between 'start' and 'end'
 * @param ***REMOVED***string***REMOVED*** position Horizontal position of the panel
 * @returns ***REMOVED***string***REMOVED*** Reversed position
 * @private
 */
MdPanelPosition.prototype._reverseXPosition = function(position) ***REMOVED***
  if (position === MdPanelPosition.xPosition.CENTER) ***REMOVED***
    return;
  ***REMOVED***

  var start = 'start';
  var end = 'end';

  return position.indexOf(start) > -1 ? position.replace(start, end) : position.replace(end, start);
***REMOVED***;


/**
 * Handles horizontal positioning in rtl or ltr environments
 * @param ***REMOVED***string***REMOVED*** position Horizontal position of the panel
 * @returns ***REMOVED***string***REMOVED*** The correct position according the page direction
 * @private
 */
MdPanelPosition.prototype._bidi = function(position) ***REMOVED***
  return this._isRTL ? this._reverseXPosition(position) : position;
***REMOVED***;


/**
 * Calculates the panel position based on the created panel element and the
 * provided positioning.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** panelEl
 * @param ***REMOVED***!***REMOVED***x:string, y:string***REMOVED******REMOVED*** position
 * @private
 */
MdPanelPosition.prototype._calculatePanelPosition = function(panelEl, position) ***REMOVED***

  var panelBounds = panelEl[0].getBoundingClientRect();
  var panelWidth = panelBounds.width;
  var panelHeight = panelBounds.height;

  var targetBounds = this._relativeToEl[0].getBoundingClientRect();

  var targetLeft = targetBounds.left;
  var targetRight = targetBounds.right;
  var targetWidth = targetBounds.width;

  switch (this._bidi(position.x)) ***REMOVED***
    case MdPanelPosition.xPosition.OFFSET_START:
      this._left = targetLeft - panelWidth + 'px';
      break;
    case MdPanelPosition.xPosition.ALIGN_END:
      this._left = targetRight - panelWidth + 'px';
      break;
    case MdPanelPosition.xPosition.CENTER:
      var left = targetLeft + (0.5 * targetWidth) - (0.5 * panelWidth);
      this._left = left + 'px';
      break;
    case MdPanelPosition.xPosition.ALIGN_START:
      this._left = targetLeft + 'px';
      break;
    case MdPanelPosition.xPosition.OFFSET_END:
      this._left = targetRight + 'px';
      break;
  ***REMOVED***

  var targetTop = targetBounds.top;
  var targetBottom = targetBounds.bottom;
  var targetHeight = targetBounds.height;

  switch (position.y) ***REMOVED***
    case MdPanelPosition.yPosition.ABOVE:
      this._top = targetTop - panelHeight + 'px';
      break;
    case MdPanelPosition.yPosition.ALIGN_BOTTOMS:
      this._top = targetBottom - panelHeight + 'px';
      break;
    case MdPanelPosition.yPosition.CENTER:
      var top = targetTop + (0.5 * targetHeight) - (0.5 * panelHeight);
      this._top = top + 'px';
      break;
    case MdPanelPosition.yPosition.ALIGN_TOPS:
      this._top = targetTop + 'px';
      break;
    case MdPanelPosition.yPosition.BELOW:
      this._top = targetBottom + 'px';
      break;
  ***REMOVED***
***REMOVED***;


/*****************************************************************************
 *                               MdPanelAnimation                            *
 *****************************************************************************/


/**
 * Animation configuration object. To use, create an MdPanelAnimation with the
 * desired properties, then pass the object as part of $mdPanel creation.
 *
 * Example:
 *
 * var panelAnimation = new MdPanelAnimation()
 *     .openFrom(myButtonEl)
 *     .closeTo('.my-button')
 *     .withAnimation($mdPanel.animation.SCALE);
 *
 * $mdPanel.create(***REMOVED***
 *   animation: panelAnimation
 * ***REMOVED***);
 *
 * @param ***REMOVED***!angular.$injector***REMOVED*** $injector
 * @final @constructor
 */
function MdPanelAnimation($injector) ***REMOVED***
  /** @private @const ***REMOVED***!angular.$mdUtil***REMOVED*** */
  this._$mdUtil = $injector.get('$mdUtil');

  /**
   * @private ***REMOVED******REMOVED***element: !angular.JQLite|undefined, bounds: !DOMRect***REMOVED***|
   *    undefined***REMOVED***
   */
  this._openFrom;

  /**
   * @private ***REMOVED******REMOVED***element: !angular.JQLite|undefined, bounds: !DOMRect***REMOVED***|
   *    undefined***REMOVED***
   */
  this._closeTo;

  /** @private ***REMOVED***string|***REMOVED***open: string, close: string***REMOVED*** */
  this._animationClass = '';
***REMOVED***


/**
 * Possible default animations.
 * @enum ***REMOVED***string***REMOVED***
 */
MdPanelAnimation.animation = ***REMOVED***
  SLIDE: 'md-panel-animate-slide',
  SCALE: 'md-panel-animate-scale',
  FADE: 'md-panel-animate-fade'
***REMOVED***;


/**
 * Specifies where to start the open animation. `openFrom` accepts a
 * click event object, query selector, DOM element, or a Rect object that
 * is used to determine the bounds. When passed a click event, the location
 * of the click will be used as the position to start the animation.
 *
 * @param ***REMOVED***string|!Element|!Event|***REMOVED***top: number, left: number***REMOVED******REMOVED*** openFrom
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */
MdPanelAnimation.prototype.openFrom = function(openFrom) ***REMOVED***
  // Check if 'openFrom' is an Event.
  openFrom = openFrom.target ? openFrom.target : openFrom;

  this._openFrom = this._getPanelAnimationTarget(openFrom);

  if (!this._closeTo) ***REMOVED***
    this._closeTo = this._openFrom;
  ***REMOVED***
  return this;
***REMOVED***;


/**
 * Specifies where to animate the panel close. `closeTo` accepts a
 * query selector, DOM element, or a Rect object that is used to determine
 * the bounds.
 *
 * @param ***REMOVED***string|!Element|***REMOVED***top: number, left: number***REMOVED******REMOVED*** closeTo
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */
MdPanelAnimation.prototype.closeTo = function(closeTo) ***REMOVED***
  this._closeTo = this._getPanelAnimationTarget(closeTo);
  return this;
***REMOVED***;


/**
 * Returns the element and bounds for the animation target.
 * @param ***REMOVED***string|!Element|***REMOVED***top: number, left: number***REMOVED******REMOVED*** location
 * @returns ***REMOVED******REMOVED***element: !angular.JQLite|undefined, bounds: !DOMRect***REMOVED******REMOVED***
 * @private
 */
MdPanelAnimation.prototype._getPanelAnimationTarget = function(location) ***REMOVED***
  if (angular.isDefined(location.top) || angular.isDefined(location.left)) ***REMOVED***
    return ***REMOVED***
      element: undefined,
      bounds: ***REMOVED***
        top: location.top || 0,
        left: location.left || 0
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED*** else ***REMOVED***
    return this._getBoundingClientRect(getElement(location));
  ***REMOVED***
***REMOVED***;


/**
 * Specifies the animation class.
 *
 * There are several default animations that can be used:
 * (MdPanelAnimation.animation)
 *   SLIDE: The panel slides in and out from the specified
 *        elements.
 *   SCALE: The panel scales in and out.
 *   FADE: The panel fades in and out.
 *
 * @param ***REMOVED***string|***REMOVED***open: string, close: string***REMOVED******REMOVED*** cssClass
 * @returns ***REMOVED***MdPanelAnimation***REMOVED***
 */

MdPanelAnimation.prototype.withAnimation = function(cssClass) ***REMOVED***
  this._animationClass = cssClass;
  return this;
***REMOVED***;


/**
 * Animate the panel open.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** panelEl
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED***
 */
MdPanelAnimation.prototype.animateOpen = function(panelEl) ***REMOVED***
  var animator = this._$mdUtil.dom.animator;

  this._fixBounds(panelEl);
  var animationOptions = ***REMOVED******REMOVED***;

  // Include the panel transformations when calculating the animations.
  var panelTransform = panelEl[0].style.transform || '';

  var openFrom = animator.toTransformCss(panelTransform);
  var openTo = animator.toTransformCss(panelTransform);

  switch (this._animationClass) ***REMOVED***
    case MdPanelAnimation.animation.SLIDE:
      // Slide should start with opacity: 1.
      panelEl.css('opacity', '1');

      animationOptions = ***REMOVED***
        transitionInClass: '_md-panel-animate-enter'
      ***REMOVED***;

      var openSlide = animator.calculateSlideToOrigin(
              panelEl, this._openFrom) || '';
      openFrom = animator.toTransformCss(openSlide + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.SCALE:
      animationOptions = ***REMOVED***
        transitionInClass: '_md-panel-animate-enter'
      ***REMOVED***;

      var openScale = animator.calculateZoomToOrigin(
              panelEl, this._openFrom) || '';
      openFrom = animator.toTransformCss(openScale + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.FADE:
      animationOptions = ***REMOVED***
        transitionInClass: '_md-panel-animate-enter'
      ***REMOVED***;
      break;

    default:
      if (angular.isString(this._animationClass)) ***REMOVED***
        animationOptions = ***REMOVED***
          transitionInClass: this._animationClass
        ***REMOVED***;
      ***REMOVED*** else ***REMOVED***
        animationOptions = ***REMOVED***
          transitionInClass: this._animationClass['open'],
          transitionOutClass: this._animationClass['close'],
        ***REMOVED***;
      ***REMOVED***
  ***REMOVED***

  return animator
      .translate3d(panelEl, openFrom, openTo, animationOptions);
***REMOVED***;


/**
 * Animate the panel close.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** panelEl
 * @returns ***REMOVED***!angular.$q.Promise***REMOVED***
 */
MdPanelAnimation.prototype.animateClose = function(panelEl) ***REMOVED***
  var animator = this._$mdUtil.dom.animator;
  var reverseAnimationOptions = ***REMOVED******REMOVED***;

  // Include the panel transformations when calculating the animations.
  var panelTransform = panelEl[0].style.transform || '';

  var closeFrom = animator.toTransformCss(panelTransform);
  var closeTo = animator.toTransformCss(panelTransform);

  switch (this._animationClass) ***REMOVED***
    case MdPanelAnimation.animation.SLIDE:
      // Slide should start with opacity: 1.
      panelEl.css('opacity', '1');
      reverseAnimationOptions = ***REMOVED***
        transitionInClass: '_md-panel-animate-leave'
      ***REMOVED***;

      var closeSlide = animator.calculateSlideToOrigin(
              panelEl, this._closeTo) || '';
      closeTo = animator.toTransformCss(closeSlide + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.SCALE:
      reverseAnimationOptions = ***REMOVED***
        transitionInClass: '_md-panel-animate-scale-out _md-panel-animate-leave'
      ***REMOVED***;

      var closeScale = animator.calculateZoomToOrigin(
              panelEl, this._closeTo) || '';
      closeTo = animator.toTransformCss(closeScale + ' ' + panelTransform);
      break;

    case MdPanelAnimation.animation.FADE:
      reverseAnimationOptions = ***REMOVED***
        transitionInClass: '_md-panel-animate-fade-out _md-panel-animate-leave'
      ***REMOVED***;
      break;

    default:
      if (angular.isString(this._animationClass)) ***REMOVED***
        reverseAnimationOptions = ***REMOVED***
          transitionOutClass: this._animationClass
        ***REMOVED***;
      ***REMOVED*** else ***REMOVED***
        reverseAnimationOptions = ***REMOVED***
          transitionInClass: this._animationClass['close'],
          transitionOutClass: this._animationClass['open']
        ***REMOVED***;
      ***REMOVED***
  ***REMOVED***

  return animator
      .translate3d(panelEl, closeFrom, closeTo, reverseAnimationOptions);
***REMOVED***;


/**
 * Set the height and width to match the panel if not provided.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** panelEl
 * @private
 */
MdPanelAnimation.prototype._fixBounds = function(panelEl) ***REMOVED***
  var panelWidth = panelEl[0].offsetWidth;
  var panelHeight = panelEl[0].offsetHeight;

  if (this._openFrom && this._openFrom.bounds.height == null) ***REMOVED***
    this._openFrom.bounds.height = panelHeight;
  ***REMOVED***
  if (this._openFrom && this._openFrom.bounds.width == null) ***REMOVED***
    this._openFrom.bounds.width = panelWidth;
  ***REMOVED***
  if (this._closeTo && this._closeTo.bounds.height == null) ***REMOVED***
    this._closeTo.bounds.height = panelHeight;
  ***REMOVED***
  if (this._closeTo && this._closeTo.bounds.width == null) ***REMOVED***
    this._closeTo.bounds.width = panelWidth;
  ***REMOVED***
***REMOVED***;


/**
 * Identify the bounding RECT for the target element.
 * @param ***REMOVED***!angular.JQLite***REMOVED*** element
 * @returns ***REMOVED******REMOVED***element: !angular.JQLite|undefined, bounds: !DOMRect***REMOVED******REMOVED***
 * @private
 */
MdPanelAnimation.prototype._getBoundingClientRect = function(element) ***REMOVED***
  if (element instanceof angular.element) ***REMOVED***
    return ***REMOVED***
      element: element,
      bounds: element[0].getBoundingClientRect()
    ***REMOVED***;
  ***REMOVED***
***REMOVED***;


/*****************************************************************************
 *                                Util Methods                               *
 *****************************************************************************/

/**
 * Returns the angular element associated with a css selector or element.
 * @param el ***REMOVED***string|!angular.JQLite|!Element***REMOVED***
 * @returns ***REMOVED***!angular.JQLite***REMOVED***
 */
function getElement(el) ***REMOVED***
  var queryResult = angular.isString(el) ?
      document.querySelector(el) : el;
  return angular.element(queryResult);
***REMOVED***

***REMOVED***)(window, window.angular);
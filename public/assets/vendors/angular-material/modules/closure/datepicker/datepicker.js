/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
goog.provide('ngmaterial.components.datepicker');
goog.require('ngmaterial.components.icon');
goog.require('ngmaterial.components.virtualRepeat');
goog.require('ngmaterial.core');
/**
 * @ngdoc module
 * @name material.components.datepicker
 * @description Module for the datepicker component.
 */

angular.module('material.components.datepicker', [
  'material.core',
  'material.components.icon',
  'material.components.virtualRepeat'
]);

(function() ***REMOVED***
  'use strict';

  /**
   * @ngdoc directive
   * @name mdCalendar
   * @module material.components.datepicker
   *
   * @param ***REMOVED***Date***REMOVED*** ng-model The component's model. Should be a Date object.
   * @param ***REMOVED***Date=***REMOVED*** md-min-date Expression representing the minimum date.
   * @param ***REMOVED***Date=***REMOVED*** md-max-date Expression representing the maximum date.
   * @param ***REMOVED***(function(Date): boolean)=***REMOVED*** md-date-filter Function expecting a date and returning a boolean whether it can be selected or not.
   *
   * @description
   * `<md-calendar>` is a component that renders a calendar that can be used to select a date.
   * It is a part of the `<md-datepicker` pane, however it can also be used on it's own.
   *
   * @usage
   *
   * <hljs lang="html">
   *   <md-calendar ng-model="birthday"></md-calendar>
   * </hljs>
   */
  angular.module('material.components.datepicker')
    .directive('mdCalendar', calendarDirective);

  // POST RELEASE
  // TODO(jelbourn): Mac Cmd + left / right == Home / End
  // TODO(jelbourn): Refactor month element creation to use cloneNode (performance).
  // TODO(jelbourn): Define virtual scrolling constants (compactness) users can override.
  // TODO(jelbourn): Animated month transition on ng-model change (virtual-repeat)
  // TODO(jelbourn): Scroll snapping (virtual repeat)
  // TODO(jelbourn): Remove superfluous row from short months (virtual-repeat)
  // TODO(jelbourn): Month headers stick to top when scrolling.
  // TODO(jelbourn): Previous month opacity is lowered when partially scrolled out of view.
  // TODO(jelbourn): Support md-calendar standalone on a page (as a tabstop w/ aria-live
  //     announcement and key handling).
  // Read-only calendar (not just date-picker).

  function calendarDirective() ***REMOVED***
    return ***REMOVED***
      template: function(tElement, tAttr) ***REMOVED***
        // TODO(crisbeto): This is a workaround that allows the calendar to work, without
        // a datepicker, until issue #8585 gets resolved. It can safely be removed
        // afterwards. This ensures that the virtual repeater scrolls to the proper place on load by
        // deferring the execution until the next digest. It's necessary only if the calendar is used
        // without a datepicker, otherwise it's already wrapped in an ngIf.
        var extraAttrs = tAttr.hasOwnProperty('ngIf') ? '' : 'ng-if="calendarCtrl.isInitialized"';
        var template = '' +
          '<div ng-switch="calendarCtrl.currentView" ' + extraAttrs + '>' +
            '<md-calendar-year ng-switch-when="year"></md-calendar-year>' +
            '<md-calendar-month ng-switch-default></md-calendar-month>' +
          '</div>';

        return template;
      ***REMOVED***,
      scope: ***REMOVED***
        minDate: '=mdMinDate',
        maxDate: '=mdMaxDate',
        dateFilter: '=mdDateFilter',
        _currentView: '@mdCurrentView'
      ***REMOVED***,
      require: ['ngModel', 'mdCalendar'],
      controller: CalendarCtrl,
      controllerAs: 'calendarCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) ***REMOVED***
        var ngModelCtrl = controllers[0];
        var mdCalendarCtrl = controllers[1];
        mdCalendarCtrl.configureNgModel(ngModelCtrl);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * Occasionally the hideVerticalScrollbar method might read an element's
   * width as 0, because it hasn't been laid out yet. This value will be used
   * as a fallback, in order to prevent scenarios where the element's width
   * would otherwise have been set to 0. This value is the "usual" width of a
   * calendar within a floating calendar pane.
   */
  var FALLBACK_WIDTH = 340;

  /** Next identifier for calendar instance. */
  var nextUniqueId = 0;

  /**
   * Controller for the mdCalendar component.
   * ngInject @constructor
   */
  function CalendarCtrl($element, $scope, $$mdDateUtil, $mdUtil,
    $mdConstant, $mdTheming, $$rAF, $attrs) ***REMOVED***

    $mdTheming($element);

    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.$element = $element;

    /** @final ***REMOVED***!angular.Scope***REMOVED*** */
    this.$scope = $scope;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.$mdUtil = $mdUtil;

    /** @final */
    this.keyCode = $mdConstant.KEY_CODE;

    /** @final */
    this.$$rAF = $$rAF;

    /** @final ***REMOVED***Date***REMOVED*** */
    this.today = this.dateUtil.createDateAtMidnight();

    /** @type ***REMOVED***!angular.NgModelController***REMOVED*** */
    this.ngModelCtrl = null;

    /**
     * The currently visible calendar view. Note the prefix on the scope value,
     * which is necessary, because the datepicker seems to reset the real one value if the
     * calendar is open, but the value on the datepicker's scope is empty.
     * @type ***REMOVED***String***REMOVED***
     */
    this.currentView = this._currentView || 'month';

    /** @type ***REMOVED***String***REMOVED*** Class applied to the selected date cell. */
    this.SELECTED_DATE_CLASS = 'md-calendar-selected-date';

    /** @type ***REMOVED***String***REMOVED*** Class applied to the cell for today. */
    this.TODAY_CLASS = 'md-calendar-date-today';

    /** @type ***REMOVED***String***REMOVED*** Class applied to the focused cell. */
    this.FOCUSED_DATE_CLASS = 'md-focus';

    /** @final ***REMOVED***number***REMOVED*** Unique ID for this calendar instance. */
    this.id = nextUniqueId++;

    /**
     * The date that is currently focused or showing in the calendar. This will initially be set
     * to the ng-model value if set, otherwise to today. It will be updated as the user navigates
     * to other months. The cell corresponding to the displayDate does not necesarily always have
     * focus in the document (such as for cases when the user is scrolling the calendar).
     * @type ***REMOVED***Date***REMOVED***
     */
    this.displayDate = null;

    /**
     * The selected date. Keep track of this separately from the ng-model value so that we
     * can know, when the ng-model value changes, what the previous value was before it's updated
     * in the component's UI.
     *
     * @type ***REMOVED***Date***REMOVED***
     */
    this.selectedDate = null;

    /**
     * Used to toggle initialize the root element in the next digest.
     * @type ***REMOVED***Boolean***REMOVED***
     */
    this.isInitialized = false;

    /**
     * Cache for the  width of the element without a scrollbar. Used to hide the scrollbar later on
     * and to avoid extra reflows when switching between views.
     * @type ***REMOVED***Number***REMOVED***
     */
    this.width = 0;

    /**
     * Caches the width of the scrollbar in order to be used when hiding it and to avoid extra reflows.
     * @type ***REMOVED***Number***REMOVED***
     */
    this.scrollbarWidth = 0;

    // Unless the user specifies so, the calendar should not be a tab stop.
    // This is necessary because ngAria might add a tabindex to anything with an ng-model
    // (based on whether or not the user has turned that particular feature on/off).
    if (!$attrs.tabindex) ***REMOVED***
      $element.attr('tabindex', '-1');
    ***REMOVED***

    $element.on('keydown', angular.bind(this, this.handleKeyEvent));
  ***REMOVED***
  CalendarCtrl.$inject = ["$element", "$scope", "$$mdDateUtil", "$mdUtil", "$mdConstant", "$mdTheming", "$$rAF", "$attrs"];

  /**
   * Sets up the controller's reference to ngModelController.
   * @param ***REMOVED***!angular.NgModelController***REMOVED*** ngModelCtrl
   */
  CalendarCtrl.prototype.configureNgModel = function(ngModelCtrl) ***REMOVED***
    var self = this;

    self.ngModelCtrl = ngModelCtrl;

    self.$mdUtil.nextTick(function() ***REMOVED***
      self.isInitialized = true;
    ***REMOVED***);

    ngModelCtrl.$render = function() ***REMOVED***
      var value = this.$viewValue;

      // Notify the child scopes of any changes.
      self.$scope.$broadcast('md-calendar-parent-changed', value);

      // Set up the selectedDate if it hasn't been already.
      if (!self.selectedDate) ***REMOVED***
        self.selectedDate = value;
      ***REMOVED***

      // Also set up the displayDate.
      if (!self.displayDate) ***REMOVED***
        self.displayDate = self.selectedDate || self.today;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***;

  /**
   * Sets the ng-model value for the calendar and emits a change event.
   * @param ***REMOVED***Date***REMOVED*** date
   */
  CalendarCtrl.prototype.setNgModelValue = function(date) ***REMOVED***
    var value = this.dateUtil.createDateAtMidnight(date);
    this.focus(value);
    this.$scope.$emit('md-calendar-change', value);
    this.ngModelCtrl.$setViewValue(value);
    this.ngModelCtrl.$render();
    return value;
  ***REMOVED***;

  /**
   * Sets the current view that should be visible in the calendar
   * @param ***REMOVED***string***REMOVED*** newView View name to be set.
   * @param ***REMOVED***number|Date***REMOVED*** time Date object or a timestamp for the new display date.
   */
  CalendarCtrl.prototype.setCurrentView = function(newView, time) ***REMOVED***
    var self = this;

    self.$mdUtil.nextTick(function() ***REMOVED***
      self.currentView = newView;

      if (time) ***REMOVED***
        self.displayDate = angular.isDate(time) ? time : new Date(time);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  /**
   * Focus the cell corresponding to the given date.
   * @param ***REMOVED***Date***REMOVED*** date The date to be focused.
   */
  CalendarCtrl.prototype.focus = function(date) ***REMOVED***
    if (this.dateUtil.isValidDate(date)) ***REMOVED***
      var previousFocus = this.$element[0].querySelector('.md-focus');
      if (previousFocus) ***REMOVED***
        previousFocus.classList.remove(this.FOCUSED_DATE_CLASS);
      ***REMOVED***

      var cellId = this.getDateId(date, this.currentView);
      var cell = document.getElementById(cellId);
      if (cell) ***REMOVED***
        cell.classList.add(this.FOCUSED_DATE_CLASS);
        cell.focus();
        this.displayDate = date;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      var rootElement = this.$element[0].querySelector('[ng-switch]');

      if (rootElement) ***REMOVED***
        rootElement.focus();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

  /**
   * Normalizes the key event into an action name. The action will be broadcast
   * to the child controllers.
   * @param ***REMOVED***KeyboardEvent***REMOVED*** event
   * @returns ***REMOVED***String***REMOVED*** The action that should be taken, or null if the key
   * does not match a calendar shortcut.
   */
  CalendarCtrl.prototype.getActionFromKeyEvent = function(event) ***REMOVED***
    var keyCode = this.keyCode;

    switch (event.which) ***REMOVED***
      case keyCode.ENTER: return 'select';

      case keyCode.RIGHT_ARROW: return 'move-right';
      case keyCode.LEFT_ARROW: return 'move-left';

      // TODO(crisbeto): Might want to reconsider using metaKey, because it maps
      // to the "Windows" key on PC, which opens the start menu or resizes the browser.
      case keyCode.DOWN_ARROW: return event.metaKey ? 'move-page-down' : 'move-row-down';
      case keyCode.UP_ARROW: return event.metaKey ? 'move-page-up' : 'move-row-up';

      case keyCode.PAGE_DOWN: return 'move-page-down';
      case keyCode.PAGE_UP: return 'move-page-up';

      case keyCode.HOME: return 'start';
      case keyCode.END: return 'end';

      default: return null;
    ***REMOVED***
  ***REMOVED***;

  /**
   * Handles a key event in the calendar with the appropriate action. The action will either
   * be to select the focused date or to navigate to focus a new date.
   * @param ***REMOVED***KeyboardEvent***REMOVED*** event
   */
  CalendarCtrl.prototype.handleKeyEvent = function(event) ***REMOVED***
    var self = this;

    this.$scope.$apply(function() ***REMOVED***
      // Capture escape and emit back up so that a wrapping component
      // (such as a date-picker) can decide to close.
      if (event.which == self.keyCode.ESCAPE || event.which == self.keyCode.TAB) ***REMOVED***
        self.$scope.$emit('md-calendar-close');

        if (event.which == self.keyCode.TAB) ***REMOVED***
          event.preventDefault();
        ***REMOVED***

        return;
      ***REMOVED***

      // Broadcast the action that any child controllers should take.
      var action = self.getActionFromKeyEvent(event);
      if (action) ***REMOVED***
        event.preventDefault();
        event.stopPropagation();
        self.$scope.$broadcast('md-calendar-parent-action', action);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  /**
   * Hides the vertical scrollbar on the calendar scroller of a child controller by
   * setting the width on the calendar scroller and the `overflow: hidden` wrapper
   * around the scroller, and then setting a padding-right on the scroller equal
   * to the width of the browser's scrollbar.
   *
   * This will cause a reflow.
   *
   * @param ***REMOVED***object***REMOVED*** childCtrl The child controller whose scrollbar should be hidden.
   */
  CalendarCtrl.prototype.hideVerticalScrollbar = function(childCtrl) ***REMOVED***
    var self = this;
    var element = childCtrl.$element[0];
    var scrollMask = element.querySelector('.md-calendar-scroll-mask');

    if (self.width > 0) ***REMOVED***
      setWidth();
    ***REMOVED*** else ***REMOVED***
      self.$$rAF(function() ***REMOVED***
        var scroller = childCtrl.calendarScroller;

        self.scrollbarWidth = scroller.offsetWidth - scroller.clientWidth;
        self.width = element.querySelector('table').offsetWidth;
        setWidth();
      ***REMOVED***);
    ***REMOVED***

    function setWidth() ***REMOVED***
      var width = self.width || FALLBACK_WIDTH;
      var scrollbarWidth = self.scrollbarWidth;
      var scroller = childCtrl.calendarScroller;

      scrollMask.style.width = width + 'px';
      scroller.style.width = (width + scrollbarWidth) + 'px';
      scroller.style.paddingRight = scrollbarWidth + 'px';
    ***REMOVED***
  ***REMOVED***;

  /**
   * Gets an identifier for a date unique to the calendar instance for internal
   * purposes. Not to be displayed.
   * @param ***REMOVED***Date***REMOVED*** date The date for which the id is being generated
   * @param ***REMOVED***string***REMOVED*** namespace Namespace for the id. (month, year etc.)
   * @returns ***REMOVED***string***REMOVED***
   */
  CalendarCtrl.prototype.getDateId = function(date, namespace) ***REMOVED***
    if (!namespace) ***REMOVED***
      throw new Error('A namespace for the date id has to be specified.');
    ***REMOVED***

    return [
      'md',
      this.id,
      namespace,
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ].join('-');
  ***REMOVED***;

  /**
   * Util to trigger an extra digest on a parent scope, in order to to ensure that
   * any child virtual repeaters have updated. This is necessary, because the virtual
   * repeater doesn't update the $index the first time around since the content isn't
   * in place yet. The case, in which this is an issue, is when the repeater has less
   * than a page of content (e.g. a month or year view has a min or max date).
   */
  CalendarCtrl.prototype.updateVirtualRepeat = function() ***REMOVED***
    var scope = this.$scope;
    var virtualRepeatResizeListener = scope.$on('$md-resize-enable', function() ***REMOVED***
      if (!scope.$$phase) ***REMOVED***
        scope.$apply();
      ***REMOVED***

      virtualRepeatResizeListener();
    ***REMOVED***);
  ***REMOVED***;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  angular.module('material.components.datepicker')
    .directive('mdCalendarMonth', calendarDirective);

  /**
   * Height of one calendar month tbody. This must be made known to the virtual-repeat and is
   * subsequently used for scrolling to specific months.
   */
  var TBODY_HEIGHT = 265;

  /**
   * Height of a calendar month with a single row. This is needed to calculate the offset for
   * rendering an extra month in virtual-repeat that only contains one row.
   */
  var TBODY_SINGLE_ROW_HEIGHT = 45;

  /** Private directive that represents a list of months inside the calendar. */
  function calendarDirective() ***REMOVED***
    return ***REMOVED***
      template:
        '<table aria-hidden="true" class="md-calendar-day-header"><thead></thead></table>' +
        '<div class="md-calendar-scroll-mask">' +
        '<md-virtual-repeat-container class="md-calendar-scroll-container" ' +
              'md-offset-size="' + (TBODY_SINGLE_ROW_HEIGHT - TBODY_HEIGHT) + '">' +
            '<table role="grid" tabindex="0" class="md-calendar" aria-readonly="true">' +
              '<tbody ' +
                  'md-calendar-month-body ' +
                  'role="rowgroup" ' +
                  'md-virtual-repeat="i in monthCtrl.items" ' +
                  'md-month-offset="$index" ' +
                  'class="md-calendar-month" ' +
                  'md-start-index="monthCtrl.getSelectedMonthIndex()" ' +
                  'md-item-size="' + TBODY_HEIGHT + '"></tbody>' +
            '</table>' +
          '</md-virtual-repeat-container>' +
        '</div>',
      require: ['^^mdCalendar', 'mdCalendarMonth'],
      controller: CalendarMonthCtrl,
      controllerAs: 'monthCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) ***REMOVED***
        var calendarCtrl = controllers[0];
        var monthCtrl = controllers[1];
        monthCtrl.initialize(calendarCtrl);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * Controller for the calendar month component.
   * ngInject @constructor
   */
  function CalendarMonthCtrl($element, $scope, $animate, $q,
    $$mdDateUtil, $mdDateLocale) ***REMOVED***

    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.$element = $element;

    /** @final ***REMOVED***!angular.Scope***REMOVED*** */
    this.$scope = $scope;

    /** @final ***REMOVED***!angular.$animate***REMOVED*** */
    this.$animate = $animate;

    /** @final ***REMOVED***!angular.$q***REMOVED*** */
    this.$q = $q;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @final ***REMOVED***HTMLElement***REMOVED*** */
    this.calendarScroller = $element[0].querySelector('.md-virtual-repeat-scroller');

    /** @type ***REMOVED***Date***REMOVED*** */
    this.firstRenderableDate = null;

    /** @type ***REMOVED***boolean***REMOVED*** */
    this.isInitialized = false;

    /** @type ***REMOVED***boolean***REMOVED*** */
    this.isMonthTransitionInProgress = false;

    var self = this;

    /**
     * Handles a click event on a date cell.
     * Created here so that every cell can use the same function instance.
     * @this ***REMOVED***HTMLTableCellElement***REMOVED*** The cell that was clicked.
     */
    this.cellClickHandler = function() ***REMOVED***
      var timestamp = $$mdDateUtil.getTimestampFromNode(this);
      self.$scope.$apply(function() ***REMOVED***
        self.calendarCtrl.setNgModelValue(timestamp);
      ***REMOVED***);
    ***REMOVED***;

    /**
     * Handles click events on the month headers. Switches
     * the calendar to the year view.
     * @this ***REMOVED***HTMLTableCellElement***REMOVED*** The cell that was clicked.
     */
    this.headerClickHandler = function() ***REMOVED***
      self.calendarCtrl.setCurrentView('year', $$mdDateUtil.getTimestampFromNode(this));
    ***REMOVED***;
  ***REMOVED***
  CalendarMonthCtrl.$inject = ["$element", "$scope", "$animate", "$q", "$$mdDateUtil", "$mdDateLocale"];

  /*** Initialization ***/

  /**
   * Initialize the controller by saving a reference to the calendar and
   * setting up the object that will be iterated by the virtual repeater.
   */
  CalendarMonthCtrl.prototype.initialize = function(calendarCtrl) ***REMOVED***
    var minDate = calendarCtrl.minDate;
    var maxDate = calendarCtrl.maxDate;
    this.calendarCtrl = calendarCtrl;

    /**
     * Dummy array-like object for virtual-repeat to iterate over. The length is the total
     * number of months that can be viewed. This is shorter than ideal because of (potential)
     * Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1181658.
     */
    this.items = ***REMOVED*** length: 2000 ***REMOVED***;

    if (maxDate && minDate) ***REMOVED***
      // Limit the number of months if min and max dates are set.
      var numMonths = this.dateUtil.getMonthDistance(minDate, maxDate) + 1;
      numMonths = Math.max(numMonths, 1);
      // Add an additional month as the final dummy month for rendering purposes.
      numMonths += 1;
      this.items.length = numMonths;
    ***REMOVED***

    this.firstRenderableDate = this.dateUtil.incrementMonths(calendarCtrl.today, -this.items.length / 2);

    if (minDate && minDate > this.firstRenderableDate) ***REMOVED***
      this.firstRenderableDate = minDate;
    ***REMOVED*** else if (maxDate) ***REMOVED***
      // Calculate the difference between the start date and max date.
      // Subtract 1 because it's an inclusive difference and 1 for the final dummy month.
      var monthDifference = this.items.length - 2;
      this.firstRenderableDate = this.dateUtil.incrementMonths(maxDate, -(this.items.length - 2));
    ***REMOVED***

    this.attachScopeListeners();
    calendarCtrl.updateVirtualRepeat();

    // Fire the initial render, since we might have missed it the first time it fired.
    calendarCtrl.ngModelCtrl && calendarCtrl.ngModelCtrl.$render();
  ***REMOVED***;

  /**
   * Gets the "index" of the currently selected date as it would be in the virtual-repeat.
   * @returns ***REMOVED***number***REMOVED***
   */
  CalendarMonthCtrl.prototype.getSelectedMonthIndex = function() ***REMOVED***
    var calendarCtrl = this.calendarCtrl;
    return this.dateUtil.getMonthDistance(this.firstRenderableDate,
        calendarCtrl.displayDate || calendarCtrl.selectedDate || calendarCtrl.today);
  ***REMOVED***;

  /**
   * Change the selected date in the calendar (ngModel value has already been changed).
   * @param ***REMOVED***Date***REMOVED*** date
   */
  CalendarMonthCtrl.prototype.changeSelectedDate = function(date) ***REMOVED***
    var self = this;
    var calendarCtrl = self.calendarCtrl;
    var previousSelectedDate = calendarCtrl.selectedDate;
    calendarCtrl.selectedDate = date;

    this.changeDisplayDate(date).then(function() ***REMOVED***
      var selectedDateClass = calendarCtrl.SELECTED_DATE_CLASS;
      var namespace = 'month';

      // Remove the selected class from the previously selected date, if any.
      if (previousSelectedDate) ***REMOVED***
        var prevDateCell = document.getElementById(calendarCtrl.getDateId(previousSelectedDate, namespace));
        if (prevDateCell) ***REMOVED***
          prevDateCell.classList.remove(selectedDateClass);
          prevDateCell.setAttribute('aria-selected', 'false');
        ***REMOVED***
      ***REMOVED***

      // Apply the select class to the new selected date if it is set.
      if (date) ***REMOVED***
        var dateCell = document.getElementById(calendarCtrl.getDateId(date, namespace));
        if (dateCell) ***REMOVED***
          dateCell.classList.add(selectedDateClass);
          dateCell.setAttribute('aria-selected', 'true');
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  /**
   * Change the date that is being shown in the calendar. If the given date is in a different
   * month, the displayed month will be transitioned.
   * @param ***REMOVED***Date***REMOVED*** date
   */
  CalendarMonthCtrl.prototype.changeDisplayDate = function(date) ***REMOVED***
    // Initialization is deferred until this function is called because we want to reflect
    // the starting value of ngModel.
    if (!this.isInitialized) ***REMOVED***
      this.buildWeekHeader();
      this.calendarCtrl.hideVerticalScrollbar(this);
      this.isInitialized = true;
      return this.$q.when();
    ***REMOVED***

    // If trying to show an invalid date or a transition is in progress, do nothing.
    if (!this.dateUtil.isValidDate(date) || this.isMonthTransitionInProgress) ***REMOVED***
      return this.$q.when();
    ***REMOVED***

    this.isMonthTransitionInProgress = true;
    var animationPromise = this.animateDateChange(date);

    this.calendarCtrl.displayDate = date;

    var self = this;
    animationPromise.then(function() ***REMOVED***
      self.isMonthTransitionInProgress = false;
    ***REMOVED***);

    return animationPromise;
  ***REMOVED***;

  /**
   * Animates the transition from the calendar's current month to the given month.
   * @param ***REMOVED***Date***REMOVED*** date
   * @returns ***REMOVED***angular.$q.Promise***REMOVED*** The animation promise.
   */
  CalendarMonthCtrl.prototype.animateDateChange = function(date) ***REMOVED***
    if (this.dateUtil.isValidDate(date)) ***REMOVED***
      var monthDistance = this.dateUtil.getMonthDistance(this.firstRenderableDate, date);
      this.calendarScroller.scrollTop = monthDistance * TBODY_HEIGHT;
    ***REMOVED***

    return this.$q.when();
  ***REMOVED***;

  /**
   * Builds and appends a day-of-the-week header to the calendar.
   * This should only need to be called once during initialization.
   */
  CalendarMonthCtrl.prototype.buildWeekHeader = function() ***REMOVED***
    var firstDayOfWeek = this.dateLocale.firstDayOfWeek;
    var shortDays = this.dateLocale.shortDays;

    var row = document.createElement('tr');
    for (var i = 0; i < 7; i++) ***REMOVED***
      var th = document.createElement('th');
      th.textContent = shortDays[(i + firstDayOfWeek) % 7];
      row.appendChild(th);
    ***REMOVED***

    this.$element.find('thead').append(row);
  ***REMOVED***;

  /**
   * Attaches listeners for the scope events that are broadcast by the calendar.
   */
  CalendarMonthCtrl.prototype.attachScopeListeners = function() ***REMOVED***
    var self = this;

    self.$scope.$on('md-calendar-parent-changed', function(event, value) ***REMOVED***
      self.changeSelectedDate(value);
    ***REMOVED***);

    self.$scope.$on('md-calendar-parent-action', angular.bind(this, this.handleKeyEvent));
  ***REMOVED***;

  /**
   * Handles the month-specific keyboard interactions.
   * @param ***REMOVED***Object***REMOVED*** event Scope event object passed by the calendar.
   * @param ***REMOVED***String***REMOVED*** action Action, corresponding to the key that was pressed.
   */
  CalendarMonthCtrl.prototype.handleKeyEvent = function(event, action) ***REMOVED***
    var calendarCtrl = this.calendarCtrl;
    var displayDate = calendarCtrl.displayDate;

    if (action === 'select') ***REMOVED***
      calendarCtrl.setNgModelValue(displayDate);
    ***REMOVED*** else ***REMOVED***
      var date = null;
      var dateUtil = this.dateUtil;

      switch (action) ***REMOVED***
        case 'move-right': date = dateUtil.incrementDays(displayDate, 1); break;
        case 'move-left': date = dateUtil.incrementDays(displayDate, -1); break;

        case 'move-page-down': date = dateUtil.incrementMonths(displayDate, 1); break;
        case 'move-page-up': date = dateUtil.incrementMonths(displayDate, -1); break;

        case 'move-row-down': date = dateUtil.incrementDays(displayDate, 7); break;
        case 'move-row-up': date = dateUtil.incrementDays(displayDate, -7); break;

        case 'start': date = dateUtil.getFirstDateOfMonth(displayDate); break;
        case 'end': date = dateUtil.getLastDateOfMonth(displayDate); break;
      ***REMOVED***

      if (date) ***REMOVED***
        date = this.dateUtil.clampDate(date, calendarCtrl.minDate, calendarCtrl.maxDate);

        this.changeDisplayDate(date).then(function() ***REMOVED***
          calendarCtrl.focus(date);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  angular.module('material.components.datepicker')
      .directive('mdCalendarMonthBody', mdCalendarMonthBodyDirective);

  /**
   * Private directive consumed by md-calendar-month. Having this directive lets the calender use
   * md-virtual-repeat and also cleanly separates the month DOM construction functions from
   * the rest of the calendar controller logic.
   * ngInject
   */
  function mdCalendarMonthBodyDirective($compile, $$mdSvgRegistry) ***REMOVED***
    var ARROW_ICON = $compile('<md-icon md-svg-src="' +
      $$mdSvgRegistry.mdTabsArrow + '"></md-icon>')(***REMOVED******REMOVED***)[0];

    return ***REMOVED***
      require: ['^^mdCalendar', '^^mdCalendarMonth', 'mdCalendarMonthBody'],
      scope: ***REMOVED*** offset: '=mdMonthOffset' ***REMOVED***,
      controller: CalendarMonthBodyCtrl,
      controllerAs: 'mdMonthBodyCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) ***REMOVED***
        var calendarCtrl = controllers[0];
        var monthCtrl = controllers[1];
        var monthBodyCtrl = controllers[2];

        monthBodyCtrl.calendarCtrl = calendarCtrl;
        monthBodyCtrl.monthCtrl = monthCtrl;
        monthBodyCtrl.arrowIcon = ARROW_ICON.cloneNode(true);
        monthBodyCtrl.generateContent();

        // The virtual-repeat re-uses the same DOM elements, so there are only a limited number
        // of repeated items that are linked, and then those elements have their bindings updated.
        // Since the months are not generated by bindings, we simply regenerate the entire thing
        // when the binding (offset) changes.
        scope.$watch(function() ***REMOVED*** return monthBodyCtrl.offset; ***REMOVED***, function(offset, oldOffset) ***REMOVED***
          if (offset !== oldOffset) ***REMOVED***
            monthBodyCtrl.generateContent();
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  mdCalendarMonthBodyDirective.$inject = ["$compile", "$$mdSvgRegistry"];

  /**
   * Controller for a single calendar month.
   * ngInject @constructor
   */
  function CalendarMonthBodyCtrl($element, $$mdDateUtil, $mdDateLocale) ***REMOVED***
    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.$element = $element;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @type ***REMOVED***Object***REMOVED*** Reference to the month view. */
    this.monthCtrl = null;

    /** @type ***REMOVED***Object***REMOVED*** Reference to the calendar. */
    this.calendarCtrl = null;

    /**
     * Number of months from the start of the month "items" that the currently rendered month
     * occurs. Set via angular data binding.
     * @type ***REMOVED***number***REMOVED***
     */
    this.offset = null;

    /**
     * Date cell to focus after appending the month to the document.
     * @type ***REMOVED***HTMLElement***REMOVED***
     */
    this.focusAfterAppend = null;
  ***REMOVED***
  CalendarMonthBodyCtrl.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"];

  /** Generate and append the content for this month to the directive element. */
  CalendarMonthBodyCtrl.prototype.generateContent = function() ***REMOVED***
    var date = this.dateUtil.incrementMonths(this.monthCtrl.firstRenderableDate, this.offset);

    this.$element.empty();
    this.$element.append(this.buildCalendarForMonth(date));

    if (this.focusAfterAppend) ***REMOVED***
      this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS);
      this.focusAfterAppend.focus();
      this.focusAfterAppend = null;
    ***REMOVED***
  ***REMOVED***;

  /**
   * Creates a single cell to contain a date in the calendar with all appropriate
   * attributes and classes added. If a date is given, the cell content will be set
   * based on the date.
   * @param ***REMOVED***Date=***REMOVED*** opt_date
   * @returns ***REMOVED***HTMLElement***REMOVED***
   */
  CalendarMonthBodyCtrl.prototype.buildDateCell = function(opt_date) ***REMOVED***
    var monthCtrl = this.monthCtrl;
    var calendarCtrl = this.calendarCtrl;

    // TODO(jelbourn): cloneNode is likely a faster way of doing this.
    var cell = document.createElement('td');
    cell.tabIndex = -1;
    cell.classList.add('md-calendar-date');
    cell.setAttribute('role', 'gridcell');

    if (opt_date) ***REMOVED***
      cell.setAttribute('tabindex', '-1');
      cell.setAttribute('aria-label', this.dateLocale.longDateFormatter(opt_date));
      cell.id = calendarCtrl.getDateId(opt_date, 'month');

      // Use `data-timestamp` attribute because IE10 does not support the `dataset` property.
      cell.setAttribute('data-timestamp', opt_date.getTime());

      // TODO(jelourn): Doing these comparisons for class addition during generation might be slow.
      // It may be better to finish the construction and then query the node and add the class.
      if (this.dateUtil.isSameDay(opt_date, calendarCtrl.today)) ***REMOVED***
        cell.classList.add(calendarCtrl.TODAY_CLASS);
      ***REMOVED***

      if (this.dateUtil.isValidDate(calendarCtrl.selectedDate) &&
          this.dateUtil.isSameDay(opt_date, calendarCtrl.selectedDate)) ***REMOVED***
        cell.classList.add(calendarCtrl.SELECTED_DATE_CLASS);
        cell.setAttribute('aria-selected', 'true');
      ***REMOVED***

      var cellText = this.dateLocale.dates[opt_date.getDate()];

      if (this.isDateEnabled(opt_date)) ***REMOVED***
        // Add a indicator for select, hover, and focus states.
        var selectionIndicator = document.createElement('span');
        selectionIndicator.classList.add('md-calendar-date-selection-indicator');
        selectionIndicator.textContent = cellText;
        cell.appendChild(selectionIndicator);
        cell.addEventListener('click', monthCtrl.cellClickHandler);

        if (calendarCtrl.displayDate && this.dateUtil.isSameDay(opt_date, calendarCtrl.displayDate)) ***REMOVED***
          this.focusAfterAppend = cell;
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
        cell.classList.add('md-calendar-date-disabled');
        cell.textContent = cellText;
      ***REMOVED***
    ***REMOVED***

    return cell;
  ***REMOVED***;

  /**
   * Check whether date is in range and enabled
   * @param ***REMOVED***Date=***REMOVED*** opt_date
   * @return ***REMOVED***boolean***REMOVED*** Whether the date is enabled.
   */
  CalendarMonthBodyCtrl.prototype.isDateEnabled = function(opt_date) ***REMOVED***
    return this.dateUtil.isDateWithinRange(opt_date,
          this.calendarCtrl.minDate, this.calendarCtrl.maxDate) &&
          (!angular.isFunction(this.calendarCtrl.dateFilter)
           || this.calendarCtrl.dateFilter(opt_date));
  ***REMOVED***;

  /**
   * Builds a `tr` element for the calendar grid.
   * @param rowNumber The week number within the month.
   * @returns ***REMOVED***HTMLElement***REMOVED***
   */
  CalendarMonthBodyCtrl.prototype.buildDateRow = function(rowNumber) ***REMOVED***
    var row = document.createElement('tr');
    row.setAttribute('role', 'row');

    // Because of an NVDA bug (with Firefox), the row needs an aria-label in order
    // to prevent the entire row being read aloud when the user moves between rows.
    // See http://community.nvda-project.org/ticket/4643.
    row.setAttribute('aria-label', this.dateLocale.weekNumberFormatter(rowNumber));

    return row;
  ***REMOVED***;

  /**
   * Builds the <tbody> content for the given date's month.
   * @param ***REMOVED***Date=***REMOVED*** opt_dateInMonth
   * @returns ***REMOVED***DocumentFragment***REMOVED*** A document fragment containing the <tr> elements.
   */
  CalendarMonthBodyCtrl.prototype.buildCalendarForMonth = function(opt_dateInMonth) ***REMOVED***
    var date = this.dateUtil.isValidDate(opt_dateInMonth) ? opt_dateInMonth : new Date();

    var firstDayOfMonth = this.dateUtil.getFirstDateOfMonth(date);
    var firstDayOfTheWeek = this.getLocaleDay_(firstDayOfMonth);
    var numberOfDaysInMonth = this.dateUtil.getNumberOfDaysInMonth(date);

    // Store rows for the month in a document fragment so that we can append them all at once.
    var monthBody = document.createDocumentFragment();

    var rowNumber = 1;
    var row = this.buildDateRow(rowNumber);
    monthBody.appendChild(row);

    // If this is the final month in the list of items, only the first week should render,
    // so we should return immediately after the first row is complete and has been
    // attached to the body.
    var isFinalMonth = this.offset === this.monthCtrl.items.length - 1;

    // Add a label for the month. If the month starts on a Sun/Mon/Tues, the month label
    // goes on a row above the first of the month. Otherwise, the month label takes up the first
    // two cells of the first row.
    var blankCellOffset = 0;
    var monthLabelCell = document.createElement('td');
    var monthLabelCellContent = document.createElement('span');

    monthLabelCellContent.textContent = this.dateLocale.monthHeaderFormatter(date);
    monthLabelCell.appendChild(monthLabelCellContent);
    monthLabelCell.classList.add('md-calendar-month-label');
    // If the entire month is after the max date, render the label as a disabled state.
    if (this.calendarCtrl.maxDate && firstDayOfMonth > this.calendarCtrl.maxDate) ***REMOVED***
      monthLabelCell.classList.add('md-calendar-month-label-disabled');
    ***REMOVED*** else ***REMOVED***
      monthLabelCell.addEventListener('click', this.monthCtrl.headerClickHandler);
      monthLabelCell.setAttribute('data-timestamp', firstDayOfMonth.getTime());
      monthLabelCell.setAttribute('aria-label', this.dateLocale.monthFormatter(date));
      monthLabelCell.appendChild(this.arrowIcon.cloneNode(true));
    ***REMOVED***

    if (firstDayOfTheWeek <= 2) ***REMOVED***
      monthLabelCell.setAttribute('colspan', '7');

      var monthLabelRow = this.buildDateRow();
      monthLabelRow.appendChild(monthLabelCell);
      monthBody.insertBefore(monthLabelRow, row);

      if (isFinalMonth) ***REMOVED***
        return monthBody;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      blankCellOffset = 3;
      monthLabelCell.setAttribute('colspan', '3');
      row.appendChild(monthLabelCell);
    ***REMOVED***

    // Add a blank cell for each day of the week that occurs before the first of the month.
    // For example, if the first day of the month is a Tuesday, add blank cells for Sun and Mon.
    // The blankCellOffset is needed in cases where the first N cells are used by the month label.
    for (var i = blankCellOffset; i < firstDayOfTheWeek; i++) ***REMOVED***
      row.appendChild(this.buildDateCell());
    ***REMOVED***

    // Add a cell for each day of the month, keeping track of the day of the week so that
    // we know when to start a new row.
    var dayOfWeek = firstDayOfTheWeek;
    var iterationDate = firstDayOfMonth;
    for (var d = 1; d <= numberOfDaysInMonth; d++) ***REMOVED***
      // If we've reached the end of the week, start a new row.
      if (dayOfWeek === 7) ***REMOVED***
        // We've finished the first row, so we're done if this is the final month.
        if (isFinalMonth) ***REMOVED***
          return monthBody;
        ***REMOVED***
        dayOfWeek = 0;
        rowNumber++;
        row = this.buildDateRow(rowNumber);
        monthBody.appendChild(row);
      ***REMOVED***

      iterationDate.setDate(d);
      var cell = this.buildDateCell(iterationDate);
      row.appendChild(cell);

      dayOfWeek++;
    ***REMOVED***

    // Ensure that the last row of the month has 7 cells.
    while (row.childNodes.length < 7) ***REMOVED***
      row.appendChild(this.buildDateCell());
    ***REMOVED***

    // Ensure that all months have 6 rows. This is necessary for now because the virtual-repeat
    // requires that all items have exactly the same height.
    while (monthBody.childNodes.length < 6) ***REMOVED***
      var whitespaceRow = this.buildDateRow();
      for (var j = 0; j < 7; j++) ***REMOVED***
        whitespaceRow.appendChild(this.buildDateCell());
      ***REMOVED***
      monthBody.appendChild(whitespaceRow);
    ***REMOVED***

    return monthBody;
  ***REMOVED***;

  /**
   * Gets the day-of-the-week index for a date for the current locale.
   * @private
   * @param ***REMOVED***Date***REMOVED*** date
   * @returns ***REMOVED***number***REMOVED*** The column index of the date in the calendar.
   */
  CalendarMonthBodyCtrl.prototype.getLocaleDay_ = function(date) ***REMOVED***
    return (date.getDay() + (7 - this.dateLocale.firstDayOfWeek)) % 7;
  ***REMOVED***;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  angular.module('material.components.datepicker')
    .directive('mdCalendarYear', calendarDirective);

  /**
   * Height of one calendar year tbody. This must be made known to the virtual-repeat and is
   * subsequently used for scrolling to specific years.
   */
  var TBODY_HEIGHT = 88;

  /** Private component, representing a list of years in the calendar. */
  function calendarDirective() ***REMOVED***
    return ***REMOVED***
      template:
        '<div class="md-calendar-scroll-mask">' +
          '<md-virtual-repeat-container class="md-calendar-scroll-container">' +
            '<table role="grid" tabindex="0" class="md-calendar" aria-readonly="true">' +
              '<tbody ' +
                  'md-calendar-year-body ' +
                  'role="rowgroup" ' +
                  'md-virtual-repeat="i in yearCtrl.items" ' +
                  'md-year-offset="$index" class="md-calendar-year" ' +
                  'md-start-index="yearCtrl.getFocusedYearIndex()" ' +
                  'md-item-size="' + TBODY_HEIGHT + '"></tbody>' +
            '</table>' +
          '</md-virtual-repeat-container>' +
        '</div>',
      require: ['^^mdCalendar', 'mdCalendarYear'],
      controller: CalendarYearCtrl,
      controllerAs: 'yearCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) ***REMOVED***
        var calendarCtrl = controllers[0];
        var yearCtrl = controllers[1];
        yearCtrl.initialize(calendarCtrl);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * Controller for the mdCalendar component.
   * ngInject @constructor
   */
  function CalendarYearCtrl($element, $scope, $animate, $q, $$mdDateUtil) ***REMOVED***

    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.$element = $element;

    /** @final ***REMOVED***!angular.Scope***REMOVED*** */
    this.$scope = $scope;

    /** @final ***REMOVED***!angular.$animate***REMOVED*** */
    this.$animate = $animate;

    /** @final ***REMOVED***!angular.$q***REMOVED*** */
    this.$q = $q;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final ***REMOVED***HTMLElement***REMOVED*** */
    this.calendarScroller = $element[0].querySelector('.md-virtual-repeat-scroller');

    /** @type ***REMOVED***Date***REMOVED*** */
    this.firstRenderableDate = null;

    /** @type ***REMOVED***boolean***REMOVED*** */
    this.isInitialized = false;

    /** @type ***REMOVED***boolean***REMOVED*** */
    this.isMonthTransitionInProgress = false;

    var self = this;

    /**
     * Handles a click event on a date cell.
     * Created here so that every cell can use the same function instance.
     * @this ***REMOVED***HTMLTableCellElement***REMOVED*** The cell that was clicked.
     */
    this.cellClickHandler = function() ***REMOVED***
      self.calendarCtrl.setCurrentView('month', $$mdDateUtil.getTimestampFromNode(this));
    ***REMOVED***;
  ***REMOVED***
  CalendarYearCtrl.$inject = ["$element", "$scope", "$animate", "$q", "$$mdDateUtil"];

  /**
   * Initialize the controller by saving a reference to the calendar and
   * setting up the object that will be iterated by the virtual repeater.
   */
  CalendarYearCtrl.prototype.initialize = function(calendarCtrl) ***REMOVED***
    var minDate = calendarCtrl.minDate;
    var maxDate = calendarCtrl.maxDate;
    this.calendarCtrl = calendarCtrl;

    /**
     * Dummy array-like object for virtual-repeat to iterate over. The length is the total
     * number of months that can be viewed. This is shorter than ideal because of (potential)
     * Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1181658.
     */
    this.items = ***REMOVED*** length: 400 ***REMOVED***;

    this.firstRenderableDate = this.dateUtil.incrementYears(calendarCtrl.today, - (this.items.length / 2));

    if (minDate && minDate > this.firstRenderableDate) ***REMOVED***
      this.firstRenderableDate = minDate;
    ***REMOVED*** else if (maxDate) ***REMOVED***
      // Calculate the year difference between the start date and max date.
      // Subtract 1 because it's an inclusive difference.
      this.firstRenderableDate = this.dateUtil.incrementMonths(maxDate, - (this.items.length - 1));
    ***REMOVED***

    if (maxDate && minDate) ***REMOVED***
      // Limit the number of years if min and max dates are set.
      var numYears = this.dateUtil.getYearDistance(this.firstRenderableDate, maxDate) + 1;
      this.items.length = Math.max(numYears, 1);
    ***REMOVED***

    this.attachScopeListeners();
    calendarCtrl.updateVirtualRepeat();

    // Fire the initial render, since we might have missed it the first time it fired.
    calendarCtrl.ngModelCtrl && calendarCtrl.ngModelCtrl.$render();
  ***REMOVED***;

  /**
   * Gets the "index" of the currently selected date as it would be in the virtual-repeat.
   * @returns ***REMOVED***number***REMOVED***
   */
  CalendarYearCtrl.prototype.getFocusedYearIndex = function() ***REMOVED***
    var calendarCtrl = this.calendarCtrl;
    return this.dateUtil.getYearDistance(this.firstRenderableDate,
      calendarCtrl.displayDate || calendarCtrl.selectedDate || calendarCtrl.today);
  ***REMOVED***;

  /**
   * Change the date that is highlighted in the calendar.
   * @param ***REMOVED***Date***REMOVED*** date
   */
  CalendarYearCtrl.prototype.changeDate = function(date) ***REMOVED***
    // Initialization is deferred until this function is called because we want to reflect
    // the starting value of ngModel.
    if (!this.isInitialized) ***REMOVED***
      this.calendarCtrl.hideVerticalScrollbar(this);
      this.isInitialized = true;
      return this.$q.when();
    ***REMOVED*** else if (this.dateUtil.isValidDate(date) && !this.isMonthTransitionInProgress) ***REMOVED***
      var self = this;
      var animationPromise = this.animateDateChange(date);

      self.isMonthTransitionInProgress = true;
      self.calendarCtrl.displayDate = date;

      return animationPromise.then(function() ***REMOVED***
        self.isMonthTransitionInProgress = false;
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***;

  /**
   * Animates the transition from the calendar's current month to the given month.
   * @param ***REMOVED***Date***REMOVED*** date
   * @returns ***REMOVED***angular.$q.Promise***REMOVED*** The animation promise.
   */
  CalendarYearCtrl.prototype.animateDateChange = function(date) ***REMOVED***
    if (this.dateUtil.isValidDate(date)) ***REMOVED***
      var monthDistance = this.dateUtil.getYearDistance(this.firstRenderableDate, date);
      this.calendarScroller.scrollTop = monthDistance * TBODY_HEIGHT;
    ***REMOVED***

    return this.$q.when();
  ***REMOVED***;

  /**
   * Handles the year-view-specific keyboard interactions.
   * @param ***REMOVED***Object***REMOVED*** event Scope event object passed by the calendar.
   * @param ***REMOVED***String***REMOVED*** action Action, corresponding to the key that was pressed.
   */
  CalendarYearCtrl.prototype.handleKeyEvent = function(event, action) ***REMOVED***
    var calendarCtrl = this.calendarCtrl;
    var displayDate = calendarCtrl.displayDate;

    if (action === 'select') ***REMOVED***
      this.changeDate(displayDate).then(function() ***REMOVED***
        calendarCtrl.setCurrentView('month', displayDate);
        calendarCtrl.focus(displayDate);
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
      var date = null;
      var dateUtil = this.dateUtil;

      switch (action) ***REMOVED***
        case 'move-right': date = dateUtil.incrementMonths(displayDate, 1); break;
        case 'move-left': date = dateUtil.incrementMonths(displayDate, -1); break;

        case 'move-row-down': date = dateUtil.incrementMonths(displayDate, 6); break;
        case 'move-row-up': date = dateUtil.incrementMonths(displayDate, -6); break;
      ***REMOVED***

      if (date) ***REMOVED***
        var min = calendarCtrl.minDate ? dateUtil.incrementMonths(dateUtil.getFirstDateOfMonth(calendarCtrl.minDate), 1) : null;
        var max = calendarCtrl.maxDate ? dateUtil.getFirstDateOfMonth(calendarCtrl.maxDate) : null;
        date = dateUtil.getFirstDateOfMonth(this.dateUtil.clampDate(date, min, max));

        this.changeDate(date).then(function() ***REMOVED***
          calendarCtrl.focus(date);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

  /**
   * Attaches listeners for the scope events that are broadcast by the calendar.
   */
  CalendarYearCtrl.prototype.attachScopeListeners = function() ***REMOVED***
    var self = this;

    self.$scope.$on('md-calendar-parent-changed', function(event, value) ***REMOVED***
      self.changeDate(value);
    ***REMOVED***);

    self.$scope.$on('md-calendar-parent-action', angular.bind(self, self.handleKeyEvent));
  ***REMOVED***;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  angular.module('material.components.datepicker')
      .directive('mdCalendarYearBody', mdCalendarYearDirective);

  /**
   * Private component, consumed by the md-calendar-year, which separates the DOM construction logic
   * and allows for the year view to use md-virtual-repeat.
   */
  function mdCalendarYearDirective() ***REMOVED***
    return ***REMOVED***
      require: ['^^mdCalendar', '^^mdCalendarYear', 'mdCalendarYearBody'],
      scope: ***REMOVED*** offset: '=mdYearOffset' ***REMOVED***,
      controller: CalendarYearBodyCtrl,
      controllerAs: 'mdYearBodyCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) ***REMOVED***
        var calendarCtrl = controllers[0];
        var yearCtrl = controllers[1];
        var yearBodyCtrl = controllers[2];

        yearBodyCtrl.calendarCtrl = calendarCtrl;
        yearBodyCtrl.yearCtrl = yearCtrl;
        yearBodyCtrl.generateContent();

        scope.$watch(function() ***REMOVED*** return yearBodyCtrl.offset; ***REMOVED***, function(offset, oldOffset) ***REMOVED***
          if (offset != oldOffset) ***REMOVED***
            yearBodyCtrl.generateContent();
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***

  /**
   * Controller for a single year.
   * ngInject @constructor
   */
  function CalendarYearBodyCtrl($element, $$mdDateUtil, $mdDateLocale) ***REMOVED***
    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.$element = $element;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @type ***REMOVED***Object***REMOVED*** Reference to the calendar. */
    this.calendarCtrl = null;

    /** @type ***REMOVED***Object***REMOVED*** Reference to the year view. */
    this.yearCtrl = null;

    /**
     * Number of months from the start of the month "items" that the currently rendered month
     * occurs. Set via angular data binding.
     * @type ***REMOVED***number***REMOVED***
     */
    this.offset = null;

    /**
     * Date cell to focus after appending the month to the document.
     * @type ***REMOVED***HTMLElement***REMOVED***
     */
    this.focusAfterAppend = null;
  ***REMOVED***
  CalendarYearBodyCtrl.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"];

  /** Generate and append the content for this year to the directive element. */
  CalendarYearBodyCtrl.prototype.generateContent = function() ***REMOVED***
    var date = this.dateUtil.incrementYears(this.yearCtrl.firstRenderableDate, this.offset);

    this.$element.empty();
    this.$element.append(this.buildCalendarForYear(date));

    if (this.focusAfterAppend) ***REMOVED***
      this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS);
      this.focusAfterAppend.focus();
      this.focusAfterAppend = null;
    ***REMOVED***
  ***REMOVED***;

  /**
   * Creates a single cell to contain a year in the calendar.
   * @param ***REMOVED***number***REMOVED*** opt_year Four-digit year.
   * @param ***REMOVED***number***REMOVED*** opt_month Zero-indexed month.
   * @returns ***REMOVED***HTMLElement***REMOVED***
   */
  CalendarYearBodyCtrl.prototype.buildMonthCell = function(year, month) ***REMOVED***
    var calendarCtrl = this.calendarCtrl;
    var yearCtrl = this.yearCtrl;
    var cell = this.buildBlankCell();

    // Represent this month/year as a date.
    var firstOfMonth = new Date(year, month, 1);
    cell.setAttribute('aria-label', this.dateLocale.monthFormatter(firstOfMonth));
    cell.id = calendarCtrl.getDateId(firstOfMonth, 'year');

    // Use `data-timestamp` attribute because IE10 does not support the `dataset` property.
    cell.setAttribute('data-timestamp', firstOfMonth.getTime());

    if (this.dateUtil.isSameMonthAndYear(firstOfMonth, calendarCtrl.today)) ***REMOVED***
      cell.classList.add(calendarCtrl.TODAY_CLASS);
    ***REMOVED***

    if (this.dateUtil.isValidDate(calendarCtrl.selectedDate) &&
        this.dateUtil.isSameMonthAndYear(firstOfMonth, calendarCtrl.selectedDate)) ***REMOVED***
      cell.classList.add(calendarCtrl.SELECTED_DATE_CLASS);
      cell.setAttribute('aria-selected', 'true');
    ***REMOVED***

    var cellText = this.dateLocale.shortMonths[month];

    if (this.dateUtil.isMonthWithinRange(firstOfMonth,
        calendarCtrl.minDate, calendarCtrl.maxDate)) ***REMOVED***
      var selectionIndicator = document.createElement('span');
      selectionIndicator.classList.add('md-calendar-date-selection-indicator');
      selectionIndicator.textContent = cellText;
      cell.appendChild(selectionIndicator);
      cell.addEventListener('click', yearCtrl.cellClickHandler);

      if (calendarCtrl.displayDate && this.dateUtil.isSameMonthAndYear(firstOfMonth, calendarCtrl.displayDate)) ***REMOVED***
        this.focusAfterAppend = cell;
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      cell.classList.add('md-calendar-date-disabled');
      cell.textContent = cellText;
    ***REMOVED***

    return cell;
  ***REMOVED***;

  /**
   * Builds a blank cell.
   * @return ***REMOVED***HTMLTableCellElement***REMOVED***
   */
  CalendarYearBodyCtrl.prototype.buildBlankCell = function() ***REMOVED***
    var cell = document.createElement('td');
    cell.tabIndex = -1;
    cell.classList.add('md-calendar-date');
    cell.setAttribute('role', 'gridcell');

    cell.setAttribute('tabindex', '-1');
    return cell;
  ***REMOVED***;

  /**
   * Builds the <tbody> content for the given year.
   * @param ***REMOVED***Date***REMOVED*** date Date for which the content should be built.
   * @returns ***REMOVED***DocumentFragment***REMOVED*** A document fragment containing the months within the year.
   */
  CalendarYearBodyCtrl.prototype.buildCalendarForYear = function(date) ***REMOVED***
    // Store rows for the month in a document fragment so that we can append them all at once.
    var year = date.getFullYear();
    var yearBody = document.createDocumentFragment();

    var monthCell, i;
    // First row contains label and Jan-Jun.
    var firstRow = document.createElement('tr');
    var labelCell = document.createElement('td');
    labelCell.className = 'md-calendar-month-label';
    labelCell.textContent = year;
    firstRow.appendChild(labelCell);

    for (i = 0; i < 6; i++) ***REMOVED***
      firstRow.appendChild(this.buildMonthCell(year, i));
    ***REMOVED***
    yearBody.appendChild(firstRow);

    // Second row contains a blank cell and Jul-Dec.
    var secondRow = document.createElement('tr');
    secondRow.appendChild(this.buildBlankCell());
    for (i = 6; i < 12; i++) ***REMOVED***
      secondRow.appendChild(this.buildMonthCell(year, i));
    ***REMOVED***
    yearBody.appendChild(secondRow);

    return yearBody;
  ***REMOVED***;
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  /**
   * @ngdoc service
   * @name $mdDateLocaleProvider
   * @module material.components.datepicker
   *
   * @description
   * The `$mdDateLocaleProvider` is the provider that creates the `$mdDateLocale` service.
   * This provider that allows the user to specify messages, formatters, and parsers for date
   * internationalization. The `$mdDateLocale` service itself is consumed by Angular Material
   * components that deal with dates.
   *
   * @property ***REMOVED***(Array<string>)=***REMOVED*** months Array of month names (in order).
   * @property ***REMOVED***(Array<string>)=***REMOVED*** shortMonths Array of abbreviated month names.
   * @property ***REMOVED***(Array<string>)=***REMOVED*** days Array of the days of the week (in order).
   * @property ***REMOVED***(Array<string>)=***REMOVED*** shortDays Array of abbreviated dayes of the week.
   * @property ***REMOVED***(Array<string>)=***REMOVED*** dates Array of dates of the month. Only necessary for locales
   *     using a numeral system other than [1, 2, 3...].
   * @property ***REMOVED***(Array<string>)=***REMOVED*** firstDayOfWeek The first day of the week. Sunday = 0, Monday = 1,
   *    etc.
   * @property ***REMOVED***(function(string): Date)=***REMOVED*** parseDate Function to parse a date object from a string.
   * @property ***REMOVED***(function(Date): string)=***REMOVED*** formatDate Function to format a date object to a string.
   * @property ***REMOVED***(function(Date): string)=***REMOVED*** monthHeaderFormatter Function that returns the label for
   *     a month given a date.
   * @property ***REMOVED***(function(Date): string)=***REMOVED*** monthFormatter Function that returns the full name of a month
   *     for a giben date.
   * @property ***REMOVED***(function(number): string)=***REMOVED*** weekNumberFormatter Function that returns a label for
   *     a week given the week number.
   * @property ***REMOVED***(string)=***REMOVED*** msgCalendar Translation of the label "Calendar" for the current locale.
   * @property ***REMOVED***(string)=***REMOVED*** msgOpenCalendar Translation of the button label "Open calendar" for the
   *     current locale.
   *
   * @usage
   * <hljs lang="js">
   *   myAppModule.config(function($mdDateLocaleProvider) ***REMOVED***
   *
   *     // Example of a French localization.
   *     $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', ...];
   *     $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', ...];
   *     $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', ...];
   *     $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', ...];
   *
   *     // Can change week display to start on Monday.
   *     $mdDateLocaleProvider.firstDayOfWeek = 1;
   *
   *     // Optional.
   *     $mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, ...];
   *
   *     // Example uses moment.js to parse and format dates.
   *     $mdDateLocaleProvider.parseDate = function(dateString) ***REMOVED***
   *       var m = moment(dateString, 'L', true);
   *       return m.isValid() ? m.toDate() : new Date(NaN);
   *     ***REMOVED***;
   *
   *     $mdDateLocaleProvider.formatDate = function(date) ***REMOVED***
   *       var m = moment(date);
   *       return m.isValid() ? m.format('L') : '';
   *     ***REMOVED***;
   *
   *     $mdDateLocaleProvider.monthHeaderFormatter = function(date) ***REMOVED***
   *       return myShortMonths[date.getMonth()] + ' ' + date.getFullYear();
   *     ***REMOVED***;
   *
   *     // In addition to date display, date components also need localized messages
   *     // for aria-labels for screen-reader users.
   *
   *     $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) ***REMOVED***
   *       return 'Semaine ' + weekNumber;
   *     ***REMOVED***;
   *
   *     $mdDateLocaleProvider.msgCalendar = 'Calendrier';
   *     $mdDateLocaleProvider.msgOpenCalendar = 'Ouvrir le calendrier';
   *
   * ***REMOVED***);
   * </hljs>
   *
   */

  angular.module('material.components.datepicker').config(["$provide", function($provide) ***REMOVED***
    // TODO(jelbourn): Assert provided values are correctly formatted. Need assertions.

    /** @constructor */
    function DateLocaleProvider() ***REMOVED***
      /** Array of full month names. E.g., ['January', 'Febuary', ...] */
      this.months = null;

      /** Array of abbreviated month names. E.g., ['Jan', 'Feb', ...] */
      this.shortMonths = null;

      /** Array of full day of the week names. E.g., ['Monday', 'Tuesday', ...] */
      this.days = null;

      /** Array of abbreviated dat of the week names. E.g., ['M', 'T', ...] */
      this.shortDays = null;

      /** Array of dates of a month (1 - 31). Characters might be different in some locales. */
      this.dates = null;

      /** Index of the first day of the week. 0 = Sunday, 1 = Monday, etc. */
      this.firstDayOfWeek = 0;

      /**
       * Function that converts the date portion of a Date to a string.
       * @type ***REMOVED***(function(Date): string)***REMOVED***
       */
      this.formatDate = null;

      /**
       * Function that converts a date string to a Date object (the date portion)
       * @type ***REMOVED***function(string): Date***REMOVED***
       */
      this.parseDate = null;

      /**
       * Function that formats a Date into a month header string.
       * @type ***REMOVED***function(Date): string***REMOVED***
       */
      this.monthHeaderFormatter = null;

      /**
       * Function that formats a week number into a label for the week.
       * @type ***REMOVED***function(number): string***REMOVED***
       */
      this.weekNumberFormatter = null;

      /**
       * Function that formats a date into a long aria-label that is read
       * when the focused date changes.
       * @type ***REMOVED***function(Date): string***REMOVED***
       */
      this.longDateFormatter = null;

      /**
       * ARIA label for the calendar "dialog" used in the datepicker.
       * @type ***REMOVED***string***REMOVED***
       */
      this.msgCalendar = '';

      /**
       * ARIA label for the datepicker's "Open calendar" buttons.
       * @type ***REMOVED***string***REMOVED***
       */
      this.msgOpenCalendar = '';
    ***REMOVED***

    /**
     * Factory function that returns an instance of the dateLocale service.
     * ngInject
     * @param $locale
     * @returns ***REMOVED***DateLocale***REMOVED***
     */
    DateLocaleProvider.prototype.$get = function($locale, $filter) ***REMOVED***
      /**
       * Default date-to-string formatting function.
       * @param ***REMOVED***!Date***REMOVED*** date
       * @returns ***REMOVED***string***REMOVED***
       */
      function defaultFormatDate(date) ***REMOVED***
        if (!date) ***REMOVED***
          return '';
        ***REMOVED***

        // All of the dates created through ng-material *should* be set to midnight.
        // If we encounter a date where the localeTime shows at 11pm instead of midnight,
        // we have run into an issue with DST where we need to increment the hour by one:
        // var d = new Date(1992, 9, 8, 0, 0, 0);
        // d.toLocaleString(); // == "10/7/1992, 11:00:00 PM"
        var localeTime = date.toLocaleTimeString();
        var formatDate = date;
        if (date.getHours() == 0 &&
            (localeTime.indexOf('11:') !== -1 || localeTime.indexOf('23:') !== -1)) ***REMOVED***
          formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 0, 0);
        ***REMOVED***

        return $filter('date')(formatDate, 'M/d/yyyy');
      ***REMOVED***

      /**
       * Default string-to-date parsing function.
       * @param ***REMOVED***string***REMOVED*** dateString
       * @returns ***REMOVED***!Date***REMOVED***
       */
      function defaultParseDate(dateString) ***REMOVED***
        return new Date(dateString);
      ***REMOVED***

      /**
       * Default function to determine whether a string makes sense to be
       * parsed to a Date object.
       *
       * This is very permissive and is just a basic sanity check to ensure that
       * things like single integers aren't able to be parsed into dates.
       * @param ***REMOVED***string***REMOVED*** dateString
       * @returns ***REMOVED***boolean***REMOVED***
       */
      function defaultIsDateComplete(dateString) ***REMOVED***
        dateString = dateString.trim();

        // Looks for three chunks of content (either numbers or text) separated
        // by delimiters.
        var re = /^(([a-zA-Z]***REMOVED***3,***REMOVED***|[0-9]***REMOVED***1,4***REMOVED***)([ \.,]+|[\/\-]))***REMOVED***2***REMOVED***([a-zA-Z]***REMOVED***3,***REMOVED***|[0-9]***REMOVED***1,4***REMOVED***)$/;
        return re.test(dateString);
      ***REMOVED***

      /**
       * Default date-to-string formatter to get a month header.
       * @param ***REMOVED***!Date***REMOVED*** date
       * @returns ***REMOVED***string***REMOVED***
       */
      function defaultMonthHeaderFormatter(date) ***REMOVED***
        return service.shortMonths[date.getMonth()] + ' ' + date.getFullYear();
      ***REMOVED***

      /**
       * Default formatter for a month.
       * @param ***REMOVED***!Date***REMOVED*** date
       * @returns ***REMOVED***string***REMOVED***
       */
      function defaultMonthFormatter(date) ***REMOVED***
        return service.months[date.getMonth()] + ' ' + date.getFullYear();
      ***REMOVED***

      /**
       * Default week number formatter.
       * @param number
       * @returns ***REMOVED***string***REMOVED***
       */
      function defaultWeekNumberFormatter(number) ***REMOVED***
        return 'Week ' + number;
      ***REMOVED***

      /**
       * Default formatter for date cell aria-labels.
       * @param ***REMOVED***!Date***REMOVED*** date
       * @returns ***REMOVED***string***REMOVED***
       */
      function defaultLongDateFormatter(date) ***REMOVED***
        // Example: 'Thursday June 18 2015'
        return [
          service.days[date.getDay()],
          service.months[date.getMonth()],
          service.dates[date.getDate()],
          date.getFullYear()
        ].join(' ');
      ***REMOVED***

      // The default "short" day strings are the first character of each day,
      // e.g., "Monday" => "M".
      var defaultShortDays = $locale.DATETIME_FORMATS.SHORTDAY.map(function(day) ***REMOVED***
        return day.substring(0, 1);
      ***REMOVED***);

      // The default dates are simply the numbers 1 through 31.
      var defaultDates = Array(32);
      for (var i = 1; i <= 31; i++) ***REMOVED***
        defaultDates[i] = i;
      ***REMOVED***

      // Default ARIA messages are in English (US).
      var defaultMsgCalendar = 'Calendar';
      var defaultMsgOpenCalendar = 'Open calendar';

      var service = ***REMOVED***
        months: this.months || $locale.DATETIME_FORMATS.MONTH,
        shortMonths: this.shortMonths || $locale.DATETIME_FORMATS.SHORTMONTH,
        days: this.days || $locale.DATETIME_FORMATS.DAY,
        shortDays: this.shortDays || defaultShortDays,
        dates: this.dates || defaultDates,
        firstDayOfWeek: this.firstDayOfWeek || 0,
        formatDate: this.formatDate || defaultFormatDate,
        parseDate: this.parseDate || defaultParseDate,
        isDateComplete: this.isDateComplete || defaultIsDateComplete,
        monthHeaderFormatter: this.monthHeaderFormatter || defaultMonthHeaderFormatter,
        monthFormatter: this.monthFormatter || defaultMonthFormatter,
        weekNumberFormatter: this.weekNumberFormatter || defaultWeekNumberFormatter,
        longDateFormatter: this.longDateFormatter || defaultLongDateFormatter,
        msgCalendar: this.msgCalendar || defaultMsgCalendar,
        msgOpenCalendar: this.msgOpenCalendar || defaultMsgOpenCalendar
      ***REMOVED***;

      return service;
    ***REMOVED***;
    DateLocaleProvider.prototype.$get.$inject = ["$locale", "$filter"];

    $provide.provider('$mdDateLocale', new DateLocaleProvider());
  ***REMOVED***]);
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  /**
   * Utility for performing date calculations to facilitate operation of the calendar and
   * datepicker.
   */
  angular.module('material.components.datepicker').factory('$$mdDateUtil', function() ***REMOVED***
    return ***REMOVED***
      getFirstDateOfMonth: getFirstDateOfMonth,
      getNumberOfDaysInMonth: getNumberOfDaysInMonth,
      getDateInNextMonth: getDateInNextMonth,
      getDateInPreviousMonth: getDateInPreviousMonth,
      isInNextMonth: isInNextMonth,
      isInPreviousMonth: isInPreviousMonth,
      getDateMidpoint: getDateMidpoint,
      isSameMonthAndYear: isSameMonthAndYear,
      getWeekOfMonth: getWeekOfMonth,
      incrementDays: incrementDays,
      incrementMonths: incrementMonths,
      getLastDateOfMonth: getLastDateOfMonth,
      isSameDay: isSameDay,
      getMonthDistance: getMonthDistance,
      isValidDate: isValidDate,
      setDateTimeToMidnight: setDateTimeToMidnight,
      createDateAtMidnight: createDateAtMidnight,
      isDateWithinRange: isDateWithinRange,
      incrementYears: incrementYears,
      getYearDistance: getYearDistance,
      clampDate: clampDate,
      getTimestampFromNode: getTimestampFromNode,
      isMonthWithinRange: isMonthWithinRange
    ***REMOVED***;

    /**
     * Gets the first day of the month for the given date's month.
     * @param ***REMOVED***Date***REMOVED*** date
     * @returns ***REMOVED***Date***REMOVED***
     */
    function getFirstDateOfMonth(date) ***REMOVED***
      return new Date(date.getFullYear(), date.getMonth(), 1);
    ***REMOVED***

    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns ***REMOVED***number***REMOVED***
     */
    function getNumberOfDaysInMonth(date) ***REMOVED***
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    ***REMOVED***

    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns ***REMOVED***Date***REMOVED***
     */
    function getDateInNextMonth(date) ***REMOVED***
      return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    ***REMOVED***

    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns ***REMOVED***Date***REMOVED***
     */
    function getDateInPreviousMonth(date) ***REMOVED***
      return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    ***REMOVED***

    /**
     * Gets whether two dates have the same month and year.
     * @param ***REMOVED***Date***REMOVED*** d1
     * @param ***REMOVED***Date***REMOVED*** d2
     * @returns ***REMOVED***boolean***REMOVED***
     */
    function isSameMonthAndYear(d1, d2) ***REMOVED***
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    ***REMOVED***

    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param ***REMOVED***Date***REMOVED*** d1
     * @param ***REMOVED***Date***REMOVED*** d2
     * @returns ***REMOVED***boolean***REMOVED***
     */
    function isSameDay(d1, d2) ***REMOVED***
      return d1.getDate() == d2.getDate() && isSameMonthAndYear(d1, d2);
    ***REMOVED***

    /**
     * Gets whether a date is in the month immediately after some date.
     * @param ***REMOVED***Date***REMOVED*** startDate The date from which to compare.
     * @param ***REMOVED***Date***REMOVED*** endDate The date to check.
     * @returns ***REMOVED***boolean***REMOVED***
     */
    function isInNextMonth(startDate, endDate) ***REMOVED***
      var nextMonth = getDateInNextMonth(startDate);
      return isSameMonthAndYear(nextMonth, endDate);
    ***REMOVED***

    /**
     * Gets whether a date is in the month immediately before some date.
     * @param ***REMOVED***Date***REMOVED*** startDate The date from which to compare.
     * @param ***REMOVED***Date***REMOVED*** endDate The date to check.
     * @returns ***REMOVED***boolean***REMOVED***
     */
    function isInPreviousMonth(startDate, endDate) ***REMOVED***
      var previousMonth = getDateInPreviousMonth(startDate);
      return isSameMonthAndYear(endDate, previousMonth);
    ***REMOVED***

    /**
     * Gets the midpoint between two dates.
     * @param ***REMOVED***Date***REMOVED*** d1
     * @param ***REMOVED***Date***REMOVED*** d2
     * @returns ***REMOVED***Date***REMOVED***
     */
    function getDateMidpoint(d1, d2) ***REMOVED***
      return createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    ***REMOVED***

    /**
     * Gets the week of the month that a given date occurs in.
     * @param ***REMOVED***Date***REMOVED*** date
     * @returns ***REMOVED***number***REMOVED*** Index of the week of the month (zero-based).
     */
    function getWeekOfMonth(date) ***REMOVED***
      var firstDayOfMonth = getFirstDateOfMonth(date);
      return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    ***REMOVED***

    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param ***REMOVED***Date***REMOVED*** date
     * @param ***REMOVED***number***REMOVED*** numberOfDays
     * @returns ***REMOVED***Date***REMOVED***
     */
    function incrementDays(date, numberOfDays) ***REMOVED***
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays);
    ***REMOVED***

    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param ***REMOVED***Date***REMOVED*** date
     * @param ***REMOVED***number***REMOVED*** numberOfMonths
     * @returns ***REMOVED***Date***REMOVED***
     */
    function incrementMonths(date, numberOfMonths) ***REMOVED***
      // If the same date in the target month does not actually exist, the Date object will
      // automatically advance *another* month by the number of missing days.
      // For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
      // So, we check if the month overflowed and go to the last day of the target month instead.
      var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1);
      var numberOfDaysInMonth = getNumberOfDaysInMonth(dateInTargetMonth);
      if (numberOfDaysInMonth < date.getDate()) ***REMOVED***
        dateInTargetMonth.setDate(numberOfDaysInMonth);
      ***REMOVED*** else ***REMOVED***
        dateInTargetMonth.setDate(date.getDate());
      ***REMOVED***

      return dateInTargetMonth;
    ***REMOVED***

    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param ***REMOVED***Date***REMOVED*** start
     * @param ***REMOVED***Date***REMOVED*** end
     * @returns ***REMOVED***number***REMOVED*** Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    function getMonthDistance(start, end) ***REMOVED***
      return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    ***REMOVED***

    /**
     * Gets the last day of the month for the given date.
     * @param ***REMOVED***Date***REMOVED*** date
     * @returns ***REMOVED***Date***REMOVED***
     */
    function getLastDateOfMonth(date) ***REMOVED***
      return new Date(date.getFullYear(), date.getMonth(), getNumberOfDaysInMonth(date));
    ***REMOVED***

    /**
     * Checks whether a date is valid.
     * @param ***REMOVED***Date***REMOVED*** date
     * @return ***REMOVED***boolean***REMOVED*** Whether the date is a valid Date.
     */
    function isValidDate(date) ***REMOVED***
      return date != null && date.getTime && !isNaN(date.getTime());
    ***REMOVED***

    /**
     * Sets a date's time to midnight.
     * @param ***REMOVED***Date***REMOVED*** date
     */
    function setDateTimeToMidnight(date) ***REMOVED***
      if (isValidDate(date)) ***REMOVED***
        date.setHours(0, 0, 0, 0);
      ***REMOVED***
    ***REMOVED***

    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param ***REMOVED***number|Date=***REMOVED*** opt_value
     * @return ***REMOVED***Date***REMOVED*** New date with time set to midnight.
     */
    function createDateAtMidnight(opt_value) ***REMOVED***
      var date;
      if (angular.isUndefined(opt_value)) ***REMOVED***
        date = new Date();
      ***REMOVED*** else ***REMOVED***
        date = new Date(opt_value);
      ***REMOVED***
      setDateTimeToMidnight(date);
      return date;
    ***REMOVED***

     /**
      * Checks if a date is within a min and max range, ignoring the time component.
      * If minDate or maxDate are not dates, they are ignored.
      * @param ***REMOVED***Date***REMOVED*** date
      * @param ***REMOVED***Date***REMOVED*** minDate
      * @param ***REMOVED***Date***REMOVED*** maxDate
      */
     function isDateWithinRange(date, minDate, maxDate) ***REMOVED***
       var dateAtMidnight = createDateAtMidnight(date);
       var minDateAtMidnight = isValidDate(minDate) ? createDateAtMidnight(minDate) : null;
       var maxDateAtMidnight = isValidDate(maxDate) ? createDateAtMidnight(maxDate) : null;
       return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
           (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
     ***REMOVED***

    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param ***REMOVED***Date***REMOVED*** date
     * @param ***REMOVED***number***REMOVED*** numberOfYears
     * @returns ***REMOVED***Date***REMOVED***
     */
     function incrementYears(date, numberOfYears) ***REMOVED***
       return incrementMonths(date, numberOfYears * 12);
     ***REMOVED***

     /**
      * Get the integer distance between two years. This *only* considers the year portion of the
      * Date instances.
      *
      * @param ***REMOVED***Date***REMOVED*** start
      * @param ***REMOVED***Date***REMOVED*** end
      * @returns ***REMOVED***number***REMOVED*** Number of months between `start` and `end`. If `end` is before `start`
      *     chronologically, this number will be negative.
      */
     function getYearDistance(start, end) ***REMOVED***
       return end.getFullYear() - start.getFullYear();
     ***REMOVED***

     /**
      * Clamps a date between a minimum and a maximum date.
      * @param ***REMOVED***Date***REMOVED*** date Date to be clamped
      * @param ***REMOVED***Date=***REMOVED*** minDate Minimum date
      * @param ***REMOVED***Date=***REMOVED*** maxDate Maximum date
      * @return ***REMOVED***Date***REMOVED***
      */
     function clampDate(date, minDate, maxDate) ***REMOVED***
       var boundDate = date;
       if (minDate && date < minDate) ***REMOVED***
         boundDate = new Date(minDate.getTime());
       ***REMOVED***
       if (maxDate && date > maxDate) ***REMOVED***
         boundDate = new Date(maxDate.getTime());
       ***REMOVED***
       return boundDate;
     ***REMOVED***

     /**
      * Extracts and parses the timestamp from a DOM node.
      * @param  ***REMOVED***HTMLElement***REMOVED*** node Node from which the timestamp will be extracted.
      * @return ***REMOVED***number***REMOVED*** Time since epoch.
      */
     function getTimestampFromNode(node) ***REMOVED***
       if (node && node.hasAttribute('data-timestamp')) ***REMOVED***
         return Number(node.getAttribute('data-timestamp'));
       ***REMOVED***
     ***REMOVED***

     /**
      * Checks if a month is within a min and max range, ignoring the date and time components.
      * If minDate or maxDate are not dates, they are ignored.
      * @param ***REMOVED***Date***REMOVED*** date
      * @param ***REMOVED***Date***REMOVED*** minDate
      * @param ***REMOVED***Date***REMOVED*** maxDate
      */
     function isMonthWithinRange(date, minDate, maxDate) ***REMOVED***
       var month = date.getMonth();
       var year = date.getFullYear();

       return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
        (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
     ***REMOVED***
  ***REMOVED***);
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  // POST RELEASE
  // TODO(jelbourn): Demo that uses moment.js
  // TODO(jelbourn): make sure this plays well with validation and ngMessages.
  // TODO(jelbourn): calendar pane doesn't open up outside of visible viewport.
  // TODO(jelbourn): forward more attributes to the internal input (required, autofocus, etc.)
  // TODO(jelbourn): something better for mobile (calendar panel takes up entire screen?)
  // TODO(jelbourn): input behavior (masking? auto-complete?)
  // TODO(jelbourn): UTC mode


  angular.module('material.components.datepicker')
      .directive('mdDatepicker', datePickerDirective);

  /**
   * @ngdoc directive
   * @name mdDatepicker
   * @module material.components.datepicker
   *
   * @param ***REMOVED***Date***REMOVED*** ng-model The component's model. Expects a JavaScript Date object.
   * @param ***REMOVED***expression=***REMOVED*** ng-change Expression evaluated when the model value changes.
   * @param ***REMOVED***expression=***REMOVED*** ng-focus Expression evaluated when the input is focused or the calendar is opened.
   * @param ***REMOVED***expression=***REMOVED*** ng-blur Expression evaluated when focus is removed from the input or the calendar is closed.
   * @param ***REMOVED***Date=***REMOVED*** md-min-date Expression representing a min date (inclusive).
   * @param ***REMOVED***Date=***REMOVED*** md-max-date Expression representing a max date (inclusive).
   * @param ***REMOVED***(function(Date): boolean)=***REMOVED*** md-date-filter Function expecting a date and returning a boolean whether it can be selected or not.
   * @param ***REMOVED***String=***REMOVED*** md-placeholder The date input placeholder value.
   * @param ***REMOVED***String=***REMOVED*** md-open-on-focus When present, the calendar will be opened when the input is focused.
   * @param ***REMOVED***Boolean=***REMOVED*** md-is-open Expression that can be used to open the datepicker's calendar on-demand.
   * @param ***REMOVED***String=***REMOVED*** md-current-view Default open view of the calendar pane. Can be either "month" or "year".
   * @param ***REMOVED***String=***REMOVED*** md-hide-icons Determines which datepicker icons should be hidden. Note that this may cause the
   * datepicker to not align properly with other components. **Use at your own risk.** Possible values are:
   * * `"all"` - Hides all icons.
   * * `"calendar"` - Only hides the calendar icon.
   * * `"triangle"` - Only hides the triangle icon.
   * @param ***REMOVED***boolean=***REMOVED*** ng-disabled Whether the datepicker is disabled.
   * @param ***REMOVED***boolean=***REMOVED*** ng-required Whether a value is required for the datepicker.
   *
   * @description
   * `<md-datepicker>` is a component used to select a single date.
   * For information on how to configure internationalization for the date picker,
   * see `$mdDateLocaleProvider`.
   *
   * This component supports [ngMessages](https://docs.angularjs.org/api/ngMessages/directive/ngMessages).
   * Supported attributes are:
   * * `required`: whether a required date is not set.
   * * `mindate`: whether the selected date is before the minimum allowed date.
   * * `maxdate`: whether the selected date is after the maximum allowed date.
   * * `debounceInterval`: ms to delay input processing (since last debounce reset); default value 500ms
   *
   * @usage
   * <hljs lang="html">
   *   <md-datepicker ng-model="birthday"></md-datepicker>
   * </hljs>
   *
   */

  function datePickerDirective($$mdSvgRegistry, $mdUtil, $mdAria) ***REMOVED***
    return ***REMOVED***
      template: function(tElement, tAttrs) ***REMOVED***
        // Buttons are not in the tab order because users can open the calendar via keyboard
        // interaction on the text input, and multiple tab stops for one component (picker)
        // may be confusing.
        var hiddenIcons = tAttrs.mdHideIcons;

        var calendarButton = (hiddenIcons === 'all' || hiddenIcons === 'calendar') ? '' :
          '<md-button class="md-datepicker-button md-icon-button" type="button" ' +
              'tabindex="-1" aria-hidden="true" ' +
              'ng-click="ctrl.openCalendarPane($event)">' +
            '<md-icon class="md-datepicker-calendar-icon" aria-label="md-calendar" ' +
                     'md-svg-src="' + $$mdSvgRegistry.mdCalendar + '"></md-icon>' +
          '</md-button>';

        var triangleButton = (hiddenIcons === 'all' || hiddenIcons === 'triangle') ? '' :
          '<md-button type="button" md-no-ink ' +
              'class="md-datepicker-triangle-button md-icon-button" ' +
              'ng-click="ctrl.openCalendarPane($event)" ' +
              'aria-label="***REMOVED******REMOVED***::ctrl.dateLocale.msgOpenCalendar***REMOVED******REMOVED***">' +
            '<div class="md-datepicker-expand-triangle"></div>' +
          '</md-button>';

        return '' +
        calendarButton +
        '<div class="md-datepicker-input-container" ' +
            'ng-class="***REMOVED***\'md-datepicker-focused\': ctrl.isFocused***REMOVED***">' +
          '<input class="md-datepicker-input" aria-haspopup="true" ' +
              'ng-focus="ctrl.setFocused(true)" ng-blur="ctrl.setFocused(false)">' +
          triangleButton +
        '</div>' +

        // This pane will be detached from here and re-attached to the document body.
        '<div class="md-datepicker-calendar-pane md-whiteframe-z1">' +
          '<div class="md-datepicker-input-mask">' +
            '<div class="md-datepicker-input-mask-opaque"></div>' +
          '</div>' +
          '<div class="md-datepicker-calendar">' +
            '<md-calendar role="dialog" aria-label="***REMOVED******REMOVED***::ctrl.dateLocale.msgCalendar***REMOVED******REMOVED***" ' +
                'md-current-view="***REMOVED******REMOVED***::ctrl.currentView***REMOVED******REMOVED***"' +
                'md-min-date="ctrl.minDate"' +
                'md-max-date="ctrl.maxDate"' +
                'md-date-filter="ctrl.dateFilter"' +
                'ng-model="ctrl.date" ng-if="ctrl.isCalendarOpen">' +
            '</md-calendar>' +
          '</div>' +
        '</div>';
      ***REMOVED***,
      require: ['ngModel', 'mdDatepicker', '?^mdInputContainer', '?^form'],
      scope: ***REMOVED***
        minDate: '=mdMinDate',
        maxDate: '=mdMaxDate',
        placeholder: '@mdPlaceholder',
        currentView: '@mdCurrentView',
        dateFilter: '=mdDateFilter',
        isOpen: '=?mdIsOpen',
        debounceInterval: '=mdDebounceInterval'
      ***REMOVED***,
      controller: DatePickerCtrl,
      controllerAs: 'ctrl',
      bindToController: true,
      link: function(scope, element, attr, controllers) ***REMOVED***
        var ngModelCtrl = controllers[0];
        var mdDatePickerCtrl = controllers[1];
        var mdInputContainer = controllers[2];
        var parentForm = controllers[3];
        var mdNoAsterisk = $mdUtil.parseAttributeBoolean(attr.mdNoAsterisk);

        mdDatePickerCtrl.configureNgModel(ngModelCtrl, mdInputContainer);

        if (mdInputContainer) ***REMOVED***
          // We need to move the spacer after the datepicker itself,
          // because md-input-container adds it after the
          // md-datepicker-input by default. The spacer gets wrapped in a
          // div, because it floats and gets aligned next to the datepicker.
          // There are easier ways of working around this with CSS (making the
          // datepicker 100% wide, change the `display` etc.), however they
          // break the alignment with any other form controls.
          var spacer = element[0].querySelector('.md-errors-spacer');

          if (spacer) ***REMOVED***
            element.after(angular.element('<div>').append(spacer));
          ***REMOVED***

          mdInputContainer.setHasPlaceholder(attr.mdPlaceholder);
          mdInputContainer.input = element;
          mdInputContainer.element
            .addClass(INPUT_CONTAINER_CLASS)
            .toggleClass(HAS_ICON_CLASS, attr.mdHideIcons !== 'calendar' && attr.mdHideIcons !== 'all');

          if (!mdInputContainer.label) ***REMOVED***
            $mdAria.expect(element, 'aria-label', attr.mdPlaceholder);
          ***REMOVED*** else if(!mdNoAsterisk) ***REMOVED***
            attr.$observe('required', function(value) ***REMOVED***
              mdInputContainer.label.toggleClass('md-required', !!value);
            ***REMOVED***);
          ***REMOVED***

          scope.$watch(mdInputContainer.isErrorGetter || function() ***REMOVED***
            return ngModelCtrl.$invalid && (ngModelCtrl.$touched || (parentForm && parentForm.$submitted));
          ***REMOVED***, mdInputContainer.setInvalid);
        ***REMOVED*** else if (parentForm) ***REMOVED***
          // If invalid, highlights the input when the parent form is submitted.
          var parentSubmittedWatcher = scope.$watch(function() ***REMOVED***
            return parentForm.$submitted;
          ***REMOVED***, function(isSubmitted) ***REMOVED***
            if (isSubmitted) ***REMOVED***
              mdDatePickerCtrl.updateErrorState();
              parentSubmittedWatcher();
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
  datePickerDirective.$inject = ["$$mdSvgRegistry", "$mdUtil", "$mdAria"];

  /** Additional offset for the input's `size` attribute, which is updated based on its content. */
  var EXTRA_INPUT_SIZE = 3;

  /** Class applied to the container if the date is invalid. */
  var INVALID_CLASS = 'md-datepicker-invalid';

  /** Class applied to the datepicker when it's open. */
  var OPEN_CLASS = 'md-datepicker-open';

  /** Class applied to the md-input-container, if a datepicker is placed inside it */
  var INPUT_CONTAINER_CLASS = '_md-datepicker-floating-label';

  /** Class to be applied when the calendar icon is enabled. */
  var HAS_ICON_CLASS = '_md-datepicker-has-calendar-icon';

  /** Default time in ms to debounce input event by. */
  var DEFAULT_DEBOUNCE_INTERVAL = 500;

  /**
   * Height of the calendar pane used to check if the pane is going outside the boundary of
   * the viewport. See calendar.scss for how $md-calendar-height is computed; an extra 20px is
   * also added to space the pane away from the exact edge of the screen.
   *
   *  This is computed statically now, but can be changed to be measured if the circumstances
   *  of calendar sizing are changed.
   */
  var CALENDAR_PANE_HEIGHT = 368;

  /**
   * Width of the calendar pane used to check if the pane is going outside the boundary of
   * the viewport. See calendar.scss for how $md-calendar-width is computed; an extra 20px is
   * also added to space the pane away from the exact edge of the screen.
   *
   *  This is computed statically now, but can be changed to be measured if the circumstances
   *  of calendar sizing are changed.
   */
  var CALENDAR_PANE_WIDTH = 360;

  /**
   * Controller for md-datepicker.
   *
   * ngInject @constructor
   */
  function DatePickerCtrl($scope, $element, $attrs, $window, $mdConstant,
    $mdTheming, $mdUtil, $mdDateLocale, $$mdDateUtil, $$rAF, $mdGesture) ***REMOVED***

    /** @final */
    this.$window = $window;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.$mdConstant = $mdConstant;

    /* @final */
    this.$mdUtil = $mdUtil;

    /** @final */
    this.$$rAF = $$rAF;

    /**
     * The root document element. This is used for attaching a top-level click handler to
     * close the calendar panel when a click outside said panel occurs. We use `documentElement`
     * instead of body because, when scrolling is disabled, some browsers consider the body element
     * to be completely off the screen and propagate events directly to the html element.
     * @type ***REMOVED***!angular.JQLite***REMOVED***
     */
    this.documentElement = angular.element(document.documentElement);

    /** @type ***REMOVED***!angular.NgModelController***REMOVED*** */
    this.ngModelCtrl = null;

    /** @type ***REMOVED***HTMLInputElement***REMOVED*** */
    this.inputElement = $element[0].querySelector('input');

    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.ngInputElement = angular.element(this.inputElement);

    /** @type ***REMOVED***HTMLElement***REMOVED*** */
    this.inputContainer = $element[0].querySelector('.md-datepicker-input-container');

    /** @type ***REMOVED***HTMLElement***REMOVED*** Floating calendar pane. */
    this.calendarPane = $element[0].querySelector('.md-datepicker-calendar-pane');

    /** @type ***REMOVED***HTMLElement***REMOVED*** Calendar icon button. */
    this.calendarButton = $element[0].querySelector('.md-datepicker-button');

    /**
     * Element covering everything but the input in the top of the floating calendar pane.
     * @type ***REMOVED***HTMLElement***REMOVED***
     */
    this.inputMask = $element[0].querySelector('.md-datepicker-input-mask-opaque');

    /** @final ***REMOVED***!angular.JQLite***REMOVED*** */
    this.$element = $element;

    /** @final ***REMOVED***!angular.Attributes***REMOVED*** */
    this.$attrs = $attrs;

    /** @final ***REMOVED***!angular.Scope***REMOVED*** */
    this.$scope = $scope;

    /** @type ***REMOVED***Date***REMOVED*** */
    this.date = null;

    /** @type ***REMOVED***boolean***REMOVED*** */
    this.isFocused = false;

    /** @type ***REMOVED***boolean***REMOVED*** */
    this.isDisabled;
    this.setDisabled($element[0].disabled || angular.isString($attrs.disabled));

    /** @type ***REMOVED***boolean***REMOVED*** Whether the date-picker's calendar pane is open. */
    this.isCalendarOpen = false;

    /** @type ***REMOVED***boolean***REMOVED*** Whether the calendar should open when the input is focused. */
    this.openOnFocus = $attrs.hasOwnProperty('mdOpenOnFocus');

    /** @final */
    this.mdInputContainer = null;

    /**
     * Element from which the calendar pane was opened. Keep track of this so that we can return
     * focus to it when the pane is closed.
     * @type ***REMOVED***HTMLElement***REMOVED***
     */
    this.calendarPaneOpenedFrom = null;

    /** @type ***REMOVED***String***REMOVED*** Unique id for the calendar pane. */
    this.calendarPane.id = 'md-date-pane' + $mdUtil.nextUid();

    /** Pre-bound click handler is saved so that the event listener can be removed. */
    this.bodyClickHandler = angular.bind(this, this.handleBodyClick);

    /**
     * Name of the event that will trigger a close. Necessary to sniff the browser, because
     * the resize event doesn't make sense on mobile and can have a negative impact since it
     * triggers whenever the browser zooms in on a focused input.
     */
    this.windowEventName = ($mdGesture.isIos || $mdGesture.isAndroid) ? 'orientationchange' : 'resize';

    /** Pre-bound close handler so that the event listener can be removed. */
    this.windowEventHandler = $mdUtil.debounce(angular.bind(this, this.closeCalendarPane), 100);

    /** Pre-bound handler for the window blur event. Allows for it to be removed later. */
    this.windowBlurHandler = angular.bind(this, this.handleWindowBlur);

    // Unless the user specifies so, the datepicker should not be a tab stop.
    // This is necessary because ngAria might add a tabindex to anything with an ng-model
    // (based on whether or not the user has turned that particular feature on/off).
    if (!$attrs.tabindex) ***REMOVED***
      $element.attr('tabindex', '-1');
    ***REMOVED***

    $mdTheming($element);
    $mdTheming(angular.element(this.calendarPane));

    this.installPropertyInterceptors();
    this.attachChangeListeners();
    this.attachInteractionListeners();

    var self = this;

    $scope.$on('$destroy', function() ***REMOVED***
      self.detachCalendarPane();
    ***REMOVED***);

    if ($attrs.mdIsOpen) ***REMOVED***
      $scope.$watch('ctrl.isOpen', function(shouldBeOpen) ***REMOVED***
        if (shouldBeOpen) ***REMOVED***
          self.openCalendarPane(***REMOVED***
            target: self.inputElement
          ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
          self.closeCalendarPane();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
  DatePickerCtrl.$inject = ["$scope", "$element", "$attrs", "$window", "$mdConstant", "$mdTheming", "$mdUtil", "$mdDateLocale", "$$mdDateUtil", "$$rAF", "$mdGesture"];

  /**
   * Sets up the controller's reference to ngModelController.
   * @param ***REMOVED***!angular.NgModelController***REMOVED*** ngModelCtrl
   */
  DatePickerCtrl.prototype.configureNgModel = function(ngModelCtrl, mdInputContainer) ***REMOVED***
    this.ngModelCtrl = ngModelCtrl;
    this.mdInputContainer = mdInputContainer;

    var self = this;
    ngModelCtrl.$render = function() ***REMOVED***
      var value = self.ngModelCtrl.$viewValue;

      if (value && !(value instanceof Date)) ***REMOVED***
        throw Error('The ng-model for md-datepicker must be a Date instance. ' +
            'Currently the model is a: ' + (typeof value));
      ***REMOVED***

      self.date = value;
      self.inputElement.value = self.dateLocale.formatDate(value);
      self.mdInputContainer && self.mdInputContainer.setHasValue(!!value);
      self.resizeInputElement();
      self.updateErrorState();
    ***REMOVED***;

    // Responds to external error state changes (e.g. ng-required based on another input).
    ngModelCtrl.$viewChangeListeners.unshift(angular.bind(this, this.updateErrorState));
  ***REMOVED***;

  /**
   * Attach event listeners for both the text input and the md-calendar.
   * Events are used instead of ng-model so that updates don't infinitely update the other
   * on a change. This should also be more performant than using a $watch.
   */
  DatePickerCtrl.prototype.attachChangeListeners = function() ***REMOVED***
    var self = this;

    self.$scope.$on('md-calendar-change', function(event, date) ***REMOVED***
      self.ngModelCtrl.$setViewValue(date);
      self.date = date;
      self.inputElement.value = self.dateLocale.formatDate(date);
      self.mdInputContainer && self.mdInputContainer.setHasValue(!!date);
      self.closeCalendarPane();
      self.resizeInputElement();
      self.updateErrorState();
    ***REMOVED***);

    self.ngInputElement.on('input', angular.bind(self, self.resizeInputElement));

    var debounceInterval = angular.isDefined(this.debounceInterval) ?
        this.debounceInterval : DEFAULT_DEBOUNCE_INTERVAL;
    self.ngInputElement.on('input', self.$mdUtil.debounce(self.handleInputEvent,
        debounceInterval, self));
  ***REMOVED***;

  /** Attach event listeners for user interaction. */
  DatePickerCtrl.prototype.attachInteractionListeners = function() ***REMOVED***
    var self = this;
    var $scope = this.$scope;
    var keyCodes = this.$mdConstant.KEY_CODE;

    // Add event listener through angular so that we can triggerHandler in unit tests.
    self.ngInputElement.on('keydown', function(event) ***REMOVED***
      if (event.altKey && event.keyCode == keyCodes.DOWN_ARROW) ***REMOVED***
        self.openCalendarPane(event);
        $scope.$digest();
      ***REMOVED***
    ***REMOVED***);

    if (self.openOnFocus) ***REMOVED***
      self.ngInputElement.on('focus', angular.bind(self, self.openCalendarPane));
      angular.element(self.$window).on('blur', self.windowBlurHandler);

      $scope.$on('$destroy', function() ***REMOVED***
        angular.element(self.$window).off('blur', self.windowBlurHandler);
      ***REMOVED***);
    ***REMOVED***

    $scope.$on('md-calendar-close', function() ***REMOVED***
      self.closeCalendarPane();
    ***REMOVED***);
  ***REMOVED***;

  /**
   * Capture properties set to the date-picker and imperitively handle internal changes.
   * This is done to avoid setting up additional $watches.
   */
  DatePickerCtrl.prototype.installPropertyInterceptors = function() ***REMOVED***
    var self = this;

    if (this.$attrs.ngDisabled) ***REMOVED***
      // The expression is to be evaluated against the directive element's scope and not
      // the directive's isolate scope.
      var scope = this.$scope.$parent;

      if (scope) ***REMOVED***
        scope.$watch(this.$attrs.ngDisabled, function(isDisabled) ***REMOVED***
          self.setDisabled(isDisabled);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***

    Object.defineProperty(this, 'placeholder', ***REMOVED***
      get: function() ***REMOVED*** return self.inputElement.placeholder; ***REMOVED***,
      set: function(value) ***REMOVED*** self.inputElement.placeholder = value || ''; ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

  /**
   * Sets whether the date-picker is disabled.
   * @param ***REMOVED***boolean***REMOVED*** isDisabled
   */
  DatePickerCtrl.prototype.setDisabled = function(isDisabled) ***REMOVED***
    this.isDisabled = isDisabled;
    this.inputElement.disabled = isDisabled;

    if (this.calendarButton) ***REMOVED***
      this.calendarButton.disabled = isDisabled;
    ***REMOVED***
  ***REMOVED***;

  /**
   * Sets the custom ngModel.$error flags to be consumed by ngMessages. Flags are:
   *   - mindate: whether the selected date is before the minimum date.
   *   - maxdate: whether the selected flag is after the maximum date.
   *   - filtered: whether the selected date is allowed by the custom filtering function.
   *   - valid: whether the entered text input is a valid date
   *
   * The 'required' flag is handled automatically by ngModel.
   *
   * @param ***REMOVED***Date=***REMOVED*** opt_date Date to check. If not given, defaults to the datepicker's model value.
   */
  DatePickerCtrl.prototype.updateErrorState = function(opt_date) ***REMOVED***
    var date = opt_date || this.date;

    // Clear any existing errors to get rid of anything that's no longer relevant.
    this.clearErrorState();

    if (this.dateUtil.isValidDate(date)) ***REMOVED***
      // Force all dates to midnight in order to ignore the time portion.
      date = this.dateUtil.createDateAtMidnight(date);

      if (this.dateUtil.isValidDate(this.minDate)) ***REMOVED***
        var minDate = this.dateUtil.createDateAtMidnight(this.minDate);
        this.ngModelCtrl.$setValidity('mindate', date >= minDate);
      ***REMOVED***

      if (this.dateUtil.isValidDate(this.maxDate)) ***REMOVED***
        var maxDate = this.dateUtil.createDateAtMidnight(this.maxDate);
        this.ngModelCtrl.$setValidity('maxdate', date <= maxDate);
      ***REMOVED***

      if (angular.isFunction(this.dateFilter)) ***REMOVED***
        this.ngModelCtrl.$setValidity('filtered', this.dateFilter(date));
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
      // The date is seen as "not a valid date" if there is *something* set
      // (i.e.., not null or undefined), but that something isn't a valid date.
      this.ngModelCtrl.$setValidity('valid', date == null);
    ***REMOVED***

    // TODO(jelbourn): Change this to classList.toggle when we stop using PhantomJS in unit tests
    // because it doesn't conform to the DOMTokenList spec.
    // See https://github.com/ariya/phantomjs/issues/12782.
    if (!this.ngModelCtrl.$valid) ***REMOVED***
      this.inputContainer.classList.add(INVALID_CLASS);
    ***REMOVED***
  ***REMOVED***;

  /** Clears any error flags set by `updateErrorState`. */
  DatePickerCtrl.prototype.clearErrorState = function() ***REMOVED***
    this.inputContainer.classList.remove(INVALID_CLASS);
    ['mindate', 'maxdate', 'filtered', 'valid'].forEach(function(field) ***REMOVED***
      this.ngModelCtrl.$setValidity(field, true);
    ***REMOVED***, this);
  ***REMOVED***;

  /** Resizes the input element based on the size of its content. */
  DatePickerCtrl.prototype.resizeInputElement = function() ***REMOVED***
    this.inputElement.size = this.inputElement.value.length + EXTRA_INPUT_SIZE;
  ***REMOVED***;

  /**
   * Sets the model value if the user input is a valid date.
   * Adds an invalid class to the input element if not.
   */
  DatePickerCtrl.prototype.handleInputEvent = function() ***REMOVED***
    var inputString = this.inputElement.value;
    var parsedDate = inputString ? this.dateLocale.parseDate(inputString) : null;
    this.dateUtil.setDateTimeToMidnight(parsedDate);

    // An input string is valid if it is either empty (representing no date)
    // or if it parses to a valid date that the user is allowed to select.
    var isValidInput = inputString == '' || (
      this.dateUtil.isValidDate(parsedDate) &&
      this.dateLocale.isDateComplete(inputString) &&
      this.isDateEnabled(parsedDate)
    );

    // The datepicker's model is only updated when there is a valid input.
    if (isValidInput) ***REMOVED***
      this.ngModelCtrl.$setViewValue(parsedDate);
      this.date = parsedDate;
    ***REMOVED***

    this.updateErrorState(parsedDate);
  ***REMOVED***;

  /**
   * Check whether date is in range and enabled
   * @param ***REMOVED***Date=***REMOVED*** opt_date
   * @return ***REMOVED***boolean***REMOVED*** Whether the date is enabled.
   */
  DatePickerCtrl.prototype.isDateEnabled = function(opt_date) ***REMOVED***
    return this.dateUtil.isDateWithinRange(opt_date, this.minDate, this.maxDate) &&
          (!angular.isFunction(this.dateFilter) || this.dateFilter(opt_date));
  ***REMOVED***;

  /** Position and attach the floating calendar to the document. */
  DatePickerCtrl.prototype.attachCalendarPane = function() ***REMOVED***
    var calendarPane = this.calendarPane;
    var body = document.body;

    calendarPane.style.transform = '';
    this.$element.addClass(OPEN_CLASS);
    this.mdInputContainer && this.mdInputContainer.element.addClass(OPEN_CLASS);
    angular.element(body).addClass('md-datepicker-is-showing');

    var elementRect = this.inputContainer.getBoundingClientRect();
    var bodyRect = body.getBoundingClientRect();

    // Check to see if the calendar pane would go off the screen. If so, adjust position
    // accordingly to keep it within the viewport.
    var paneTop = elementRect.top - bodyRect.top;
    var paneLeft = elementRect.left - bodyRect.left;

    // If ng-material has disabled body scrolling (for example, if a dialog is open),
    // then it's possible that the already-scrolled body has a negative top/left. In this case,
    // we want to treat the "real" top as (0 - bodyRect.top). In a normal scrolling situation,
    // though, the top of the viewport should just be the body's scroll position.
    var viewportTop = (bodyRect.top < 0 && document.body.scrollTop == 0) ?
        -bodyRect.top :
        document.body.scrollTop;

    var viewportLeft = (bodyRect.left < 0 && document.body.scrollLeft == 0) ?
        -bodyRect.left :
        document.body.scrollLeft;

    var viewportBottom = viewportTop + this.$window.innerHeight;
    var viewportRight = viewportLeft + this.$window.innerWidth;

    // If the right edge of the pane would be off the screen and shifting it left by the
    // difference would not go past the left edge of the screen. If the calendar pane is too
    // big to fit on the screen at all, move it to the left of the screen and scale the entire
    // element down to fit.
    if (paneLeft + CALENDAR_PANE_WIDTH > viewportRight) ***REMOVED***
      if (viewportRight - CALENDAR_PANE_WIDTH > 0) ***REMOVED***
        paneLeft = viewportRight - CALENDAR_PANE_WIDTH;
      ***REMOVED*** else ***REMOVED***
        paneLeft = viewportLeft;
        var scale = this.$window.innerWidth / CALENDAR_PANE_WIDTH;
        calendarPane.style.transform = 'scale(' + scale + ')';
      ***REMOVED***

      calendarPane.classList.add('md-datepicker-pos-adjusted');
    ***REMOVED***

    // If the bottom edge of the pane would be off the screen and shifting it up by the
    // difference would not go past the top edge of the screen.
    if (paneTop + CALENDAR_PANE_HEIGHT > viewportBottom &&
        viewportBottom - CALENDAR_PANE_HEIGHT > viewportTop) ***REMOVED***
      paneTop = viewportBottom - CALENDAR_PANE_HEIGHT;
      calendarPane.classList.add('md-datepicker-pos-adjusted');
    ***REMOVED***

    calendarPane.style.left = paneLeft + 'px';
    calendarPane.style.top = paneTop + 'px';
    document.body.appendChild(calendarPane);

    // The top of the calendar pane is a transparent box that shows the text input underneath.
    // Since the pane is floating, though, the page underneath the pane *adjacent* to the input is
    // also shown unless we cover it up. The inputMask does this by filling up the remaining space
    // based on the width of the input.
    this.inputMask.style.left = elementRect.width + 'px';

    // Add CSS class after one frame to trigger open animation.
    this.$$rAF(function() ***REMOVED***
      calendarPane.classList.add('md-pane-open');
    ***REMOVED***);
  ***REMOVED***;

  /** Detach the floating calendar pane from the document. */
  DatePickerCtrl.prototype.detachCalendarPane = function() ***REMOVED***
    this.$element.removeClass(OPEN_CLASS);
    this.mdInputContainer && this.mdInputContainer.element.removeClass(OPEN_CLASS);
    angular.element(document.body).removeClass('md-datepicker-is-showing');
    this.calendarPane.classList.remove('md-pane-open');
    this.calendarPane.classList.remove('md-datepicker-pos-adjusted');

    if (this.isCalendarOpen) ***REMOVED***
      this.$mdUtil.enableScrolling();
    ***REMOVED***

    if (this.calendarPane.parentNode) ***REMOVED***
      // Use native DOM removal because we do not want any of the
      // angular state of this element to be disposed.
      this.calendarPane.parentNode.removeChild(this.calendarPane);
    ***REMOVED***
  ***REMOVED***;

  /**
   * Open the floating calendar pane.
   * @param ***REMOVED***Event***REMOVED*** event
   */
  DatePickerCtrl.prototype.openCalendarPane = function(event) ***REMOVED***
    if (!this.isCalendarOpen && !this.isDisabled && !this.inputFocusedOnWindowBlur) ***REMOVED***
      this.isCalendarOpen = this.isOpen = true;
      this.calendarPaneOpenedFrom = event.target;

      // Because the calendar pane is attached directly to the body, it is possible that the
      // rest of the component (input, etc) is in a different scrolling container, such as
      // an md-content. This means that, if the container is scrolled, the pane would remain
      // stationary. To remedy this, we disable scrolling while the calendar pane is open, which
      // also matches the native behavior for things like `<select>` on Mac and Windows.
      this.$mdUtil.disableScrollAround(this.calendarPane);

      this.attachCalendarPane();
      this.focusCalendar();
      this.evalAttr('ngFocus');

      // Attach click listener inside of a timeout because, if this open call was triggered by a
      // click, we don't want it to be immediately propogated up to the body and handled.
      var self = this;
      this.$mdUtil.nextTick(function() ***REMOVED***
        // Use 'touchstart` in addition to click in order to work on iOS Safari, where click
        // events aren't propogated under most circumstances.
        // See http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        self.documentElement.on('click touchstart', self.bodyClickHandler);
      ***REMOVED***, false);

      window.addEventListener(this.windowEventName, this.windowEventHandler);
    ***REMOVED***
  ***REMOVED***;

  /** Close the floating calendar pane. */
  DatePickerCtrl.prototype.closeCalendarPane = function() ***REMOVED***
    if (this.isCalendarOpen) ***REMOVED***
      var self = this;

      self.detachCalendarPane();
      self.ngModelCtrl.$setTouched();
      self.evalAttr('ngBlur');

      self.documentElement.off('click touchstart', self.bodyClickHandler);
      window.removeEventListener(self.windowEventName, self.windowEventHandler);

      self.calendarPaneOpenedFrom.focus();
      self.calendarPaneOpenedFrom = null;

      if (self.openOnFocus) ***REMOVED***
        // Ensures that all focus events have fired before resetting
        // the calendar. Prevents the calendar from reopening immediately
        // in IE when md-open-on-focus is set. Also it needs to trigger
        // a digest, in order to prevent issues where the calendar wasn't
        // showing up on the next open.
        self.$mdUtil.nextTick(reset);
      ***REMOVED*** else ***REMOVED***
        reset();
      ***REMOVED***
    ***REMOVED***

    function reset()***REMOVED***
      self.isCalendarOpen = self.isOpen = false;
    ***REMOVED***
  ***REMOVED***;

  /** Gets the controller instance for the calendar in the floating pane. */
  DatePickerCtrl.prototype.getCalendarCtrl = function() ***REMOVED***
    return angular.element(this.calendarPane.querySelector('md-calendar')).controller('mdCalendar');
  ***REMOVED***;

  /** Focus the calendar in the floating pane. */
  DatePickerCtrl.prototype.focusCalendar = function() ***REMOVED***
    // Use a timeout in order to allow the calendar to be rendered, as it is gated behind an ng-if.
    var self = this;
    this.$mdUtil.nextTick(function() ***REMOVED***
      self.getCalendarCtrl().focus();
    ***REMOVED***, false);
  ***REMOVED***;

  /**
   * Sets whether the input is currently focused.
   * @param ***REMOVED***boolean***REMOVED*** isFocused
   */
  DatePickerCtrl.prototype.setFocused = function(isFocused) ***REMOVED***
    if (!isFocused) ***REMOVED***
      this.ngModelCtrl.$setTouched();
    ***REMOVED***

    // The ng* expressions shouldn't be evaluated when mdOpenOnFocus is on,
    // because they also get called when the calendar is opened/closed.
    if (!this.openOnFocus) ***REMOVED***
      this.evalAttr(isFocused ? 'ngFocus' : 'ngBlur');
    ***REMOVED***

    this.isFocused = isFocused;
  ***REMOVED***;

  /**
   * Handles a click on the document body when the floating calendar pane is open.
   * Closes the floating calendar pane if the click is not inside of it.
   * @param ***REMOVED***MouseEvent***REMOVED*** event
   */
  DatePickerCtrl.prototype.handleBodyClick = function(event) ***REMOVED***
    if (this.isCalendarOpen) ***REMOVED***
      var isInCalendar = this.$mdUtil.getClosest(event.target, 'md-calendar');

      if (!isInCalendar) ***REMOVED***
        this.closeCalendarPane();
      ***REMOVED***

      this.$scope.$digest();
    ***REMOVED***
  ***REMOVED***;

  /**
   * Handles the event when the user navigates away from the current tab. Keeps track of
   * whether the input was focused when the event happened, in order to prevent the calendar
   * from re-opening.
   */
  DatePickerCtrl.prototype.handleWindowBlur = function() ***REMOVED***
    this.inputFocusedOnWindowBlur = document.activeElement === this.inputElement;
  ***REMOVED***;

  /**
   * Evaluates an attribute expression against the parent scope.
   * @param ***REMOVED***String***REMOVED*** attr Name of the attribute to be evaluated.
   */
  DatePickerCtrl.prototype.evalAttr = function(attr) ***REMOVED***
    if (this.$attrs[attr]) ***REMOVED***
      this.$scope.$parent.$eval(this.$attrs[attr]);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***)();

ngmaterial.components.datepicker = angular.module("material.components.datepicker");
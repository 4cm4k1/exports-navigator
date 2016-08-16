/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.chips');
goog.require('ng.material.components.autocomplete');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.chips
 */
/*
 * @see js folder for chips implementation
 */
angular.module('material.components.chips', [
  'material.core',
  'material.components.autocomplete'
]);

angular
  .module('material.components.chips')
  .controller('MdChipCtrl', MdChipCtrl);

/**
 * Controller for the MdChip component. Responsible for handling keyboard
 * events and editting the chip if needed.
 *
 * @param $scope
 * @param $element
 * @param $mdConstant
 * @param $timeout
 * @param $mdUtil
 * @constructor
 */
function MdChipCtrl ($scope, $element, $mdConstant, $timeout, $mdUtil) ***REMOVED***
  /**
   * @type ***REMOVED***$scope***REMOVED***
   */
  this.$scope = $scope;

  /**
   * @type ***REMOVED***$element***REMOVED***
   */
  this.$element = $element;

  /**
   * @type ***REMOVED***$mdConstant***REMOVED***
   */
  this.$mdConstant = $mdConstant;

  /**
   * @type ***REMOVED***$timeout***REMOVED***
   */
  this.$timeout = $timeout;

  /**
   * @type ***REMOVED***$mdUtil***REMOVED***
   */
  this.$mdUtil = $mdUtil;

  /**
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.isEditting = false;

  /**
   * @type ***REMOVED***MdChipsCtrl***REMOVED***
   */
  this.parentController = undefined;

  /**
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.enableChipEdit = false;
***REMOVED***
MdChipCtrl.$inject = ["$scope", "$element", "$mdConstant", "$timeout", "$mdUtil"];


/**
 * @param ***REMOVED***MdChipsCtrl***REMOVED*** controller
 */
MdChipCtrl.prototype.init = function(controller) ***REMOVED***
  this.parentController = controller;
  this.enableChipEdit = this.parentController.enableChipEdit;

  if (this.enableChipEdit) ***REMOVED***
    this.$element.on('keydown', this.chipKeyDown.bind(this));
    this.$element.on('mousedown', this.chipMouseDown.bind(this));
    this.getChipContent().addClass('_md-chip-content-edit-is-enabled');
  ***REMOVED***
***REMOVED***;


/**
 * @return ***REMOVED***Object***REMOVED***
 */
MdChipCtrl.prototype.getChipContent = function() ***REMOVED***
  var chipContents = this.$element[0].getElementsByClassName('_md-chip-content');
  return angular.element(chipContents[0]);
***REMOVED***;


/**
 * @return ***REMOVED***Object***REMOVED***
 */
MdChipCtrl.prototype.getContentElement = function() ***REMOVED***
  return angular.element(this.getChipContent().children()[0]);
***REMOVED***;


/**
 * @return ***REMOVED***number***REMOVED***
 */
MdChipCtrl.prototype.getChipIndex = function() ***REMOVED***
  return parseInt(this.$element.attr('index'));
***REMOVED***;


/**
 * Presents an input element to edit the contents of the chip.
 */
MdChipCtrl.prototype.goOutOfEditMode = function() ***REMOVED***
  if (!this.isEditting) return;

  this.isEditting = false;
  this.$element.removeClass('_md-chip-editing');
  this.getChipContent()[0].contentEditable = 'false';
  var chipIndex = this.getChipIndex();

  var content = this.getContentElement().text();
  if (content) ***REMOVED***
    this.parentController.updateChipContents(
        chipIndex,
        this.getContentElement().text()
    );

    this.$mdUtil.nextTick(function() ***REMOVED***
      if (this.parentController.selectedChip === chipIndex) ***REMOVED***
        this.parentController.focusChip(chipIndex);
      ***REMOVED***
    ***REMOVED***.bind(this));
  ***REMOVED*** else ***REMOVED***
    this.parentController.removeChipAndFocusInput(chipIndex);
  ***REMOVED***
***REMOVED***;


/**
 * Given an HTML element. Selects contents of it.
 * @param node
 */
MdChipCtrl.prototype.selectNodeContents = function(node) ***REMOVED***
  var range, selection;
  if (document.body.createTextRange) ***REMOVED***
    range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  ***REMOVED*** else if (window.getSelection) ***REMOVED***
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  ***REMOVED***
***REMOVED***;


/**
 * Presents an input element to edit the contents of the chip.
 */
MdChipCtrl.prototype.goInEditMode = function() ***REMOVED***
  this.isEditting = true;
  this.$element.addClass('_md-chip-editing');
  this.getChipContent()[0].contentEditable = 'true';
  this.getChipContent().on('blur', function() ***REMOVED***
    this.goOutOfEditMode();
  ***REMOVED***.bind(this));

  this.selectNodeContents(this.getChipContent()[0]);
***REMOVED***;


/**
 * Handles the keydown event on the chip element. If enable-chip-edit attribute is
 * set to true, space or enter keys can trigger going into edit mode. Enter can also
 * trigger submitting if the chip is already being edited.
 * @param event
 */
MdChipCtrl.prototype.chipKeyDown = function(event) ***REMOVED***
  if (!this.isEditting &&
    (event.keyCode === this.$mdConstant.KEY_CODE.ENTER ||
    event.keyCode === this.$mdConstant.KEY_CODE.SPACE)) ***REMOVED***
    event.preventDefault();
    this.goInEditMode();
  ***REMOVED*** else if (this.isEditting &&
    event.keyCode === this.$mdConstant.KEY_CODE.ENTER) ***REMOVED***
    event.preventDefault();
    this.goOutOfEditMode();
  ***REMOVED***
***REMOVED***;


/**
 * Handles the double click event
 */
MdChipCtrl.prototype.chipMouseDown = function() ***REMOVED***
  if(this.getChipIndex() == this.parentController.selectedChip &&
    this.enableChipEdit &&
    !this.isEditting) ***REMOVED***
    this.goInEditMode();
  ***REMOVED***
***REMOVED***;

angular
    .module('material.components.chips')
    .directive('mdChip', MdChip);

/**
 * @ngdoc directive
 * @name mdChip
 * @module material.components.chips
 *
 * @description
 * `<md-chip>` is a component used within `<md-chips>` and is responsible for rendering individual
 * chips.
 *
 *
 * @usage
 * <hljs lang="html">
 *   <md-chip>***REMOVED******REMOVED***$chip***REMOVED******REMOVED***</md-chip>
 * </hljs>
 *
 */

// This hint text is hidden within a chip but used by screen readers to
// inform the user how they can interact with a chip.
var DELETE_HINT_TEMPLATE = '\
    <span ng-if="!$mdChipsCtrl.readonly" class="_md-visually-hidden">\
      ***REMOVED******REMOVED***$mdChipsCtrl.deleteHint***REMOVED******REMOVED***\
    </span>';

/**
 * MDChip Directive Definition
 *
 * @param $mdTheming
 * @param $mdUtil
 * ngInject
 */
function MdChip($mdTheming, $mdUtil) ***REMOVED***
  var hintTemplate = $mdUtil.processTemplate(DELETE_HINT_TEMPLATE);

  return ***REMOVED***
    restrict: 'E',
    require: ['^?mdChips', 'mdChip'],
    compile:  compile,
    controller: 'MdChipCtrl'
  ***REMOVED***;

  function compile(element, attr) ***REMOVED***
    // Append the delete template
    element.append($mdUtil.processTemplate(hintTemplate));

    return function postLink(scope, element, attr, ctrls) ***REMOVED***
      var chipsController = ctrls.shift();
      var chipController  = ctrls.shift();
      $mdTheming(element);

      if (chipsController) ***REMOVED***
        chipController.init(chipsController);

        angular
          .element(element[0]
          .querySelector('._md-chip-content'))
          .on('blur', function () ***REMOVED***
            chipsController.resetSelectedChip();
            chipsController.$scope.$applyAsync();
          ***REMOVED***);
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
MdChip.$inject = ["$mdTheming", "$mdUtil"];

angular
    .module('material.components.chips')
    .directive('mdChipRemove', MdChipRemove);

/**
 * @ngdoc directive
 * @name mdChipRemove
 * @module material.components.chips
 *
 * @description
 * `<md-chip-remove>`
 * Designates an element to be used as the delete button for a chip. This
 * element is passed as a child of the `md-chips` element.
 *
 * @usage
 * <hljs lang="html">
 *   <md-chips><button md-chip-remove>DEL</button></md-chips>
 * </hljs>
 */


/**
 * MdChipRemove Directive Definition.
 * 
 * @param $compile
 * @param $timeout
 * @returns ***REMOVED******REMOVED***restrict: string, require: string[], link: Function, scope: boolean***REMOVED******REMOVED***
 * @constructor
 */
function MdChipRemove ($timeout) ***REMOVED***
  return ***REMOVED***
    restrict: 'A',
    require: '^mdChips',
    scope: false,
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attr, ctrl) ***REMOVED***
    element.on('click', function(event) ***REMOVED***
      scope.$apply(function() ***REMOVED***
        ctrl.removeChip(scope.$$replacedScope.$index);
      ***REMOVED***);
    ***REMOVED***);

    // Child elements aren't available until after a $timeout tick as they are hidden by an
    // `ng-if`. see http://goo.gl/zIWfuw
    $timeout(function() ***REMOVED***
      element.attr(***REMOVED*** tabindex: -1, 'aria-hidden': true ***REMOVED***);
      element.find('button').attr('tabindex', '-1');
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
MdChipRemove.$inject = ["$timeout"];

angular
    .module('material.components.chips')
    .directive('mdChipTransclude', MdChipTransclude);

function MdChipTransclude ($compile) ***REMOVED***
  return ***REMOVED***
    restrict: 'EA',
    terminal: true,
    link: link,
    scope: false
  ***REMOVED***;
  function link (scope, element, attr) ***REMOVED***
    var ctrl = scope.$parent.$mdChipsCtrl,
        newScope = ctrl.parent.$new(false, ctrl.parent);
    newScope.$$replacedScope = scope;
    newScope.$chip = scope.$chip;
    newScope.$index = scope.$index;
    newScope.$mdChipsCtrl = ctrl;

    var newHtml = ctrl.$scope.$eval(attr.mdChipTransclude);

    element.html(newHtml);
    $compile(element.contents())(newScope);
  ***REMOVED***
***REMOVED***
MdChipTransclude.$inject = ["$compile"];

angular
    .module('material.components.chips')
    .controller('MdChipsCtrl', MdChipsCtrl);

/**
 * Controller for the MdChips component. Responsible for adding to and
 * removing from the list of chips, marking chips as selected, and binding to
 * the models of various input components.
 *
 * @param $scope
 * @param $mdConstant
 * @param $log
 * @param $element
 * @param $mdUtil
 * @constructor
 */
function MdChipsCtrl ($scope, $mdConstant, $log, $element, $timeout, $mdUtil) ***REMOVED***
  /** @type ***REMOVED***$timeout***REMOVED*** **/
  this.$timeout = $timeout;

  /** @type ***REMOVED***Object***REMOVED*** */
  this.$mdConstant = $mdConstant;

  /** @type ***REMOVED***angular.$scope***REMOVED*** */
  this.$scope = $scope;

  /** @type ***REMOVED***angular.$scope***REMOVED*** */
  this.parent = $scope.$parent;

  /** @type ***REMOVED***$log***REMOVED*** */
  this.$log = $log;

  /** @type ***REMOVED***$element***REMOVED*** */
  this.$element = $element;

  /** @type ***REMOVED***angular.NgModelController***REMOVED*** */
  this.ngModelCtrl = null;

  /** @type ***REMOVED***angular.NgModelController***REMOVED*** */
  this.userInputNgModelCtrl = null;

  /** @type ***REMOVED***Element***REMOVED*** */
  this.userInputElement = null;

  /** @type ***REMOVED***Array.<Object>***REMOVED*** */
  this.items = [];

  /** @type ***REMOVED***number***REMOVED*** */
  this.selectedChip = -1;

  /** @type ***REMOVED***boolean***REMOVED*** */
  this.hasAutocomplete = false;

  /** @type ***REMOVED***string***REMOVED*** */
  this.enableChipEdit = $mdUtil.parseAttributeBoolean(this.mdEnableChipEdit);

  /**
   * Hidden hint text for how to delete a chip. Used to give context to screen readers.
   * @type ***REMOVED***string***REMOVED***
   */
  this.deleteHint = 'Press delete to remove this chip.';

  /**
   * Hidden label for the delete button. Used to give context to screen readers.
   * @type ***REMOVED***string***REMOVED***
   */
  this.deleteButtonLabel = 'Remove';

  /**
   * Model used by the input element.
   * @type ***REMOVED***string***REMOVED***
   */
  this.chipBuffer = '';

  /**
   * Whether to use the transformChip expression to transform the chip buffer
   * before appending it to the list.
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.useTransformChip = false;

  /**
   * Whether to use the onAdd expression to notify of chip additions.
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.useOnAdd = false;

  /**
   * Whether to use the onRemove expression to notify of chip removals.
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.useOnRemove = false;

  /**
   * Whether to use the onSelect expression to notify the component's user
   * after selecting a chip from the list.
   * @type ***REMOVED***boolean***REMOVED***
   */
  this.useOnSelect = false;
***REMOVED***
MdChipsCtrl.$inject = ["$scope", "$mdConstant", "$log", "$element", "$timeout", "$mdUtil"];

/**
 * Handles the keydown event on the input element: by default <enter> appends
 * the buffer to the chip list, while backspace removes the last chip in the
 * list if the current buffer is empty.
 * @param event
 */
MdChipsCtrl.prototype.inputKeydown = function(event) ***REMOVED***
  var chipBuffer = this.getChipBuffer();

  // If we have an autocomplete, and it handled the event, we have nothing to do
  if (this.hasAutocomplete && event.isDefaultPrevented && event.isDefaultPrevented()) ***REMOVED***
    return;
  ***REMOVED***

  if (event.keyCode === this.$mdConstant.KEY_CODE.BACKSPACE) ***REMOVED***
    if (chipBuffer) return;
    event.preventDefault();
    event.stopPropagation();
    if (this.items.length) this.selectAndFocusChipSafe(this.items.length - 1);
    return;
  ***REMOVED***

  // By default <enter> appends the buffer to the chip list.
  if (!this.separatorKeys || this.separatorKeys.length < 1) ***REMOVED***
    this.separatorKeys = [this.$mdConstant.KEY_CODE.ENTER];
  ***REMOVED***

  // Support additional separator key codes in an array of `md-separator-keys`.
  if (this.separatorKeys.indexOf(event.keyCode) !== -1) ***REMOVED***
    if ((this.hasAutocomplete && this.requireMatch) || !chipBuffer) return;
    event.preventDefault();

    // Only append the chip and reset the chip buffer if the max chips limit isn't reached.
    if (this.hasMaxChipsReached()) return;

    this.appendChip(chipBuffer.trim());
    this.resetChipBuffer();
  ***REMOVED***
***REMOVED***;


/**
 * Updates the content of the chip at given index
 * @param chipIndex
 * @param chipContents
 */
MdChipsCtrl.prototype.updateChipContents = function(chipIndex, chipContents)***REMOVED***
  if(chipIndex >= 0 && chipIndex < this.items.length) ***REMOVED***
    this.items[chipIndex] = chipContents;
    this.ngModelCtrl.$setDirty();
  ***REMOVED***
***REMOVED***;


/**
 * Returns true if a chip is currently being edited. False otherwise.
 * @return ***REMOVED***boolean***REMOVED***
 */
MdChipsCtrl.prototype.isEditingChip = function()***REMOVED***
  return !!this.$element[0].getElementsByClassName('_md-chip-editing').length;
***REMOVED***;


/**
 * Handles the keydown event on the chip elements: backspace removes the selected chip, arrow
 * keys switch which chips is active
 * @param event
 */
MdChipsCtrl.prototype.chipKeydown = function (event) ***REMOVED***
  if (this.getChipBuffer()) return;
  if (this.isEditingChip()) return;
  
  switch (event.keyCode) ***REMOVED***
    case this.$mdConstant.KEY_CODE.BACKSPACE:
    case this.$mdConstant.KEY_CODE.DELETE:
      if (this.selectedChip < 0) return;
      event.preventDefault();
      this.removeAndSelectAdjacentChip(this.selectedChip);
      break;
    case this.$mdConstant.KEY_CODE.LEFT_ARROW:
      event.preventDefault();
      if (this.selectedChip < 0) this.selectedChip = this.items.length;
      if (this.items.length) this.selectAndFocusChipSafe(this.selectedChip - 1);
      break;
    case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
      event.preventDefault();
      this.selectAndFocusChipSafe(this.selectedChip + 1);
      break;
    case this.$mdConstant.KEY_CODE.ESCAPE:
    case this.$mdConstant.KEY_CODE.TAB:
      if (this.selectedChip < 0) return;
      event.preventDefault();
      this.onFocus();
      break;
  ***REMOVED***
***REMOVED***;

/**
 * Get the input's placeholder - uses `placeholder` when list is empty and `secondary-placeholder`
 * when the list is non-empty. If `secondary-placeholder` is not provided, `placeholder` is used
 * always.
 */
MdChipsCtrl.prototype.getPlaceholder = function() ***REMOVED***
  // Allow `secondary-placeholder` to be blank.
  var useSecondary = (this.items && this.items.length &&
      (this.secondaryPlaceholder == '' || this.secondaryPlaceholder));
  return useSecondary ? this.secondaryPlaceholder : this.placeholder;
***REMOVED***;

/**
 * Removes chip at ***REMOVED***@code index***REMOVED*** and selects the adjacent chip.
 * @param index
 */
MdChipsCtrl.prototype.removeAndSelectAdjacentChip = function(index) ***REMOVED***
  var selIndex = this.getAdjacentChipIndex(index);
  this.removeChip(index);
  this.$timeout(angular.bind(this, function () ***REMOVED***
      this.selectAndFocusChipSafe(selIndex);
  ***REMOVED***));
***REMOVED***;

/**
 * Sets the selected chip index to -1.
 */
MdChipsCtrl.prototype.resetSelectedChip = function() ***REMOVED***
  this.selectedChip = -1;
***REMOVED***;

/**
 * Gets the index of an adjacent chip to select after deletion. Adjacency is
 * determined as the next chip in the list, unless the target chip is the
 * last in the list, then it is the chip immediately preceding the target. If
 * there is only one item in the list, -1 is returned (select none).
 * The number returned is the index to select AFTER the target has been
 * removed.
 * If the current chip is not selected, then -1 is returned to select none.
 */
MdChipsCtrl.prototype.getAdjacentChipIndex = function(index) ***REMOVED***
  var len = this.items.length - 1;
  return (len == 0) ? -1 :
      (index == len) ? index -1 : index;
***REMOVED***;

/**
 * Append the contents of the buffer to the chip list. This method will first
 * call out to the md-transform-chip method, if provided.
 *
 * @param newChip
 */
MdChipsCtrl.prototype.appendChip = function(newChip) ***REMOVED***
  if (this.useTransformChip && this.transformChip) ***REMOVED***
    var transformedChip = this.transformChip(***REMOVED***'$chip': newChip***REMOVED***);

    // Check to make sure the chip is defined before assigning it, otherwise, we'll just assume
    // they want the string version.
    if (angular.isDefined(transformedChip)) ***REMOVED***
      newChip = transformedChip;
    ***REMOVED***
  ***REMOVED***

  // If items contains an identical object to newChip, do not append
  if (angular.isObject(newChip))***REMOVED***
    var identical = this.items.some(function(item)***REMOVED***
      return angular.equals(newChip, item);
    ***REMOVED***);
    if (identical) return;
  ***REMOVED***

  // Check for a null (but not undefined), or existing chip and cancel appending
  if (newChip == null || this.items.indexOf(newChip) + 1) return;

  // Append the new chip onto our list
  var index = this.items.push(newChip);

  // Update model validation
  this.ngModelCtrl.$setDirty();
  this.validateModel();

  // If they provide the md-on-add attribute, notify them of the chip addition
  if (this.useOnAdd && this.onAdd) ***REMOVED***
    this.onAdd(***REMOVED*** '$chip': newChip, '$index': index ***REMOVED***);
  ***REMOVED***
***REMOVED***;

/**
 * Sets whether to use the md-transform-chip expression. This expression is
 * bound to scope and controller in ***REMOVED***@code MdChipsDirective***REMOVED*** as
 * ***REMOVED***@code transformChip***REMOVED***. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useTransformChipExpression = function() ***REMOVED***
  this.useTransformChip = true;
***REMOVED***;

/**
 * Sets whether to use the md-on-add expression. This expression is
 * bound to scope and controller in ***REMOVED***@code MdChipsDirective***REMOVED*** as
 * ***REMOVED***@code onAdd***REMOVED***. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useOnAddExpression = function() ***REMOVED***
  this.useOnAdd = true;
***REMOVED***;

/**
 * Sets whether to use the md-on-remove expression. This expression is
 * bound to scope and controller in ***REMOVED***@code MdChipsDirective***REMOVED*** as
 * ***REMOVED***@code onRemove***REMOVED***. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useOnRemoveExpression = function() ***REMOVED***
  this.useOnRemove = true;
***REMOVED***;

/*
 * Sets whether to use the md-on-select expression. This expression is
 * bound to scope and controller in ***REMOVED***@code MdChipsDirective***REMOVED*** as
 * ***REMOVED***@code onSelect***REMOVED***. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useOnSelectExpression = function() ***REMOVED***
  this.useOnSelect = true;
***REMOVED***;

/**
 * Gets the input buffer. The input buffer can be the model bound to the
 * default input item ***REMOVED***@code this.chipBuffer***REMOVED***, the ***REMOVED***@code selectedItem***REMOVED***
 * model of an ***REMOVED***@code md-autocomplete***REMOVED***, or, through some magic, the model
 * bound to any inpput or text area element found within a
 * ***REMOVED***@code md-input-container***REMOVED*** element.
 * @return ***REMOVED***Object|string***REMOVED***
 */
MdChipsCtrl.prototype.getChipBuffer = function() ***REMOVED***
  return !this.userInputElement ? this.chipBuffer :
      this.userInputNgModelCtrl ? this.userInputNgModelCtrl.$viewValue :
          this.userInputElement[0].value;
***REMOVED***;

/**
 * Resets the input buffer for either the internal input or user provided input element.
 */
MdChipsCtrl.prototype.resetChipBuffer = function() ***REMOVED***
  if (this.userInputElement) ***REMOVED***
    if (this.userInputNgModelCtrl) ***REMOVED***
      this.userInputNgModelCtrl.$setViewValue('');
      this.userInputNgModelCtrl.$render();
    ***REMOVED*** else ***REMOVED***
      this.userInputElement[0].value = '';
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    this.chipBuffer = '';
  ***REMOVED***
***REMOVED***;

MdChipsCtrl.prototype.hasMaxChipsReached = function() ***REMOVED***
  if (angular.isString(this.maxChips)) this.maxChips = parseInt(this.maxChips, 10) || 0;

  return this.maxChips > 0 && this.items.length >= this.maxChips;
***REMOVED***;

/**
 * Updates the validity properties for the ngModel.
 */
MdChipsCtrl.prototype.validateModel = function() ***REMOVED***
  this.ngModelCtrl.$setValidity('md-max-chips', !this.hasMaxChipsReached());
***REMOVED***;

/**
 * Removes the chip at the given index.
 * @param index
 */
MdChipsCtrl.prototype.removeChip = function(index) ***REMOVED***
  var removed = this.items.splice(index, 1);

  // Update model validation
  this.ngModelCtrl.$setDirty();
  this.validateModel();

  if (removed && removed.length && this.useOnRemove && this.onRemove) ***REMOVED***
    this.onRemove(***REMOVED*** '$chip': removed[0], '$index': index ***REMOVED***);
  ***REMOVED***
***REMOVED***;

MdChipsCtrl.prototype.removeChipAndFocusInput = function (index) ***REMOVED***
  this.removeChip(index);
  this.onFocus();
***REMOVED***;
/**
 * Selects the chip at `index`,
 * @param index
 */
MdChipsCtrl.prototype.selectAndFocusChipSafe = function(index) ***REMOVED***
  if (!this.items.length) ***REMOVED***
    this.selectChip(-1);
    this.onFocus();
    return;
  ***REMOVED***
  if (index === this.items.length) return this.onFocus();
  index = Math.max(index, 0);
  index = Math.min(index, this.items.length - 1);
  this.selectChip(index);
  this.focusChip(index);
***REMOVED***;

/**
 * Marks the chip at the given index as selected.
 * @param index
 */
MdChipsCtrl.prototype.selectChip = function(index) ***REMOVED***
  if (index >= -1 && index <= this.items.length) ***REMOVED***
    this.selectedChip = index;

    // Fire the onSelect if provided
    if (this.useOnSelect && this.onSelect) ***REMOVED***
      this.onSelect(***REMOVED***'$chip': this.items[this.selectedChip] ***REMOVED***);
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    this.$log.warn('Selected Chip index out of bounds; ignoring.');
  ***REMOVED***
***REMOVED***;

/**
 * Selects the chip at `index` and gives it focus.
 * @param index
 */
MdChipsCtrl.prototype.selectAndFocusChip = function(index) ***REMOVED***
  this.selectChip(index);
  if (index != -1) ***REMOVED***
    this.focusChip(index);
  ***REMOVED***
***REMOVED***;

/**
 * Call `focus()` on the chip at `index`
 */
MdChipsCtrl.prototype.focusChip = function(index) ***REMOVED***
  this.$element[0].querySelector('md-chip[index="' + index + '"] ._md-chip-content').focus();
***REMOVED***;

/**
 * Configures the required interactions with the ngModel Controller.
 * Specifically, set ***REMOVED***@code this.items***REMOVED*** to the ***REMOVED***@code NgModelCtrl#$viewVale***REMOVED***.
 * @param ngModelCtrl
 */
MdChipsCtrl.prototype.configureNgModel = function(ngModelCtrl) ***REMOVED***
  this.ngModelCtrl = ngModelCtrl;

  var self = this;
  ngModelCtrl.$render = function() ***REMOVED***
    // model is updated. do something.
    self.items = self.ngModelCtrl.$viewValue;
  ***REMOVED***;
***REMOVED***;

MdChipsCtrl.prototype.onFocus = function () ***REMOVED***
  var input = this.$element[0].querySelector('input');
  input && input.focus();
  this.resetSelectedChip();
***REMOVED***;

MdChipsCtrl.prototype.onInputFocus = function () ***REMOVED***
  this.inputHasFocus = true;
  this.resetSelectedChip();
***REMOVED***;

MdChipsCtrl.prototype.onInputBlur = function () ***REMOVED***
  this.inputHasFocus = false;
***REMOVED***;

/**
 * Configure event bindings on a user-provided input element.
 * @param inputElement
 */
MdChipsCtrl.prototype.configureUserInput = function(inputElement) ***REMOVED***
  this.userInputElement = inputElement;

  // Find the NgModelCtrl for the input element
  var ngModelCtrl = inputElement.controller('ngModel');
  // `.controller` will look in the parent as well.
  if (ngModelCtrl != this.ngModelCtrl) ***REMOVED***
    this.userInputNgModelCtrl = ngModelCtrl;
  ***REMOVED***

  var scope = this.$scope;
  var ctrl = this;

  // Run all of the events using evalAsync because a focus may fire a blur in the same digest loop
  var scopeApplyFn = function(event, fn) ***REMOVED***
    scope.$evalAsync(angular.bind(ctrl, fn, event));
  ***REMOVED***;

  // Bind to keydown and focus events of input
  inputElement
      .attr(***REMOVED*** tabindex: 0 ***REMOVED***)
      .on('keydown', function(event) ***REMOVED*** scopeApplyFn(event, ctrl.inputKeydown) ***REMOVED***)
      .on('focus', function(event) ***REMOVED*** scopeApplyFn(event, ctrl.onInputFocus) ***REMOVED***)
      .on('blur', function(event) ***REMOVED*** scopeApplyFn(event, ctrl.onInputBlur) ***REMOVED***)
***REMOVED***;

MdChipsCtrl.prototype.configureAutocomplete = function(ctrl) ***REMOVED***
  if ( ctrl ) ***REMOVED***
    this.hasAutocomplete = true;

    ctrl.registerSelectedItemWatcher(angular.bind(this, function (item) ***REMOVED***
      if (item) ***REMOVED***
        // Only append the chip and reset the chip buffer if the max chips limit isn't reached.
        if (this.hasMaxChipsReached()) return;

        this.appendChip(item);
        this.resetChipBuffer();
      ***REMOVED***
    ***REMOVED***));

    this.$element.find('input')
        .on('focus',angular.bind(this, this.onInputFocus) )
        .on('blur', angular.bind(this, this.onInputBlur) );
  ***REMOVED***
***REMOVED***;

MdChipsCtrl.prototype.hasFocus = function () ***REMOVED***
  return this.inputHasFocus || this.selectedChip >= 0;
***REMOVED***;

  angular
      .module('material.components.chips')
      .directive('mdChips', MdChips);

  /**
   * @ngdoc directive
   * @name mdChips
   * @module material.components.chips
   *
   * @description
   * `<md-chips>` is an input component for building lists of strings or objects. The list items are
   * displayed as 'chips'. This component can make use of an `<input>` element or an 
   * `<md-autocomplete>` element.
   *
   * ### Custom templates
   * A custom template may be provided to render the content of each chip. This is achieved by
   * specifying an `<md-chip-template>` element containing the custom content as a child of
   * `<md-chips>`.
   *
   * Note: Any attributes on
   * `<md-chip-template>` will be dropped as only the innerHTML is used for the chip template. The
   * variables `$chip` and `$index` are available in the scope of `<md-chip-template>`, representing
   * the chip object and its index in the list of chips, respectively.
   * To override the chip delete control, include an element (ideally a button) with the attribute
   * `md-chip-remove`. A click listener to remove the chip will be added automatically. The element
   * is also placed as a sibling to the chip content (on which there are also click listeners) to
   * avoid a nested ng-click situation.
   *
   * <h3> Pending Features </h3>
   * <ul style="padding-left:20px;">
   *
   *   <ul>Style
   *     <li>Colours for hover, press states (ripple?).</li>
   *   </ul>
   *
   *   <ul>Validation
   *     <li>allow a validation callback</li>
   *     <li>hilighting style for invalid chips</li>
   *   </ul>
   *
   *   <ul>Item mutation
   *     <li>Support `
   *       <md-chip-edit>` template, show/hide the edit element on tap/click? double tap/double
   *       click?
   *     </li>
   *   </ul>
   *
   *   <ul>Truncation and Disambiguation (?)
   *     <li>Truncate chip text where possible, but do not truncate entries such that two are
   *     indistinguishable.</li>
   *   </ul>
   *
   *   <ul>Drag and Drop
   *     <li>Drag and drop chips between related `<md-chips>` elements.
   *     </li>
   *   </ul>
   * </ul>
   *
   *  <span style="font-size:.8em;text-align:center">
   *    Warning: This component is a WORK IN PROGRESS. If you use it now,
   *    it will probably break on you in the future.
   *  </span>
   *
   * @param ***REMOVED***string=|object=***REMOVED*** ng-model A model to bind the list of items to
   * @param ***REMOVED***string=***REMOVED*** placeholder Placeholder text that will be forwarded to the input.
   * @param ***REMOVED***string=***REMOVED*** secondary-placeholder Placeholder text that will be forwarded to the input,
   *    displayed when there is at least one item in the list
   * @param ***REMOVED***boolean=***REMOVED*** readonly Disables list manipulation (deleting or adding list items), hiding
   *    the input and delete buttons. If no `ng-model` is provided, the chips will automatically be
   *    marked as readonly.
   * @param ***REMOVED***string=***REMOVED*** md-enable-chip-edit Set this to "true" to enable editing of chip contents. The user can 
   *    go into edit mode with pressing "space", "enter", or double clicking on the chip. Chip edit is only
   *    supported for chips with basic template.
   * @param ***REMOVED***number=***REMOVED*** md-max-chips The maximum number of chips allowed to add through user input.
   *    <br/><br/>The validation property `md-max-chips` can be used when the max chips
   *    amount is reached.
   * @param ***REMOVED***expression***REMOVED*** md-transform-chip An expression of form `myFunction($chip)` that when called
   *    expects one of the following return values:
   *    - an object representing the `$chip` input string
   *    - `undefined` to simply add the `$chip` input string, or
   *    - `null` to prevent the chip from being appended
   * @param ***REMOVED***expression=***REMOVED*** md-on-add An expression which will be called when a chip has been
   *    added.
   * @param ***REMOVED***expression=***REMOVED*** md-on-remove An expression which will be called when a chip has been
   *    removed.
   * @param ***REMOVED***expression=***REMOVED*** md-on-select An expression which will be called when a chip is selected.
   * @param ***REMOVED***boolean***REMOVED*** md-require-match If true, and the chips template contains an autocomplete,
   *    only allow selection of pre-defined chips (i.e. you cannot add new ones).
   * @param ***REMOVED***string=***REMOVED*** delete-hint A string read by screen readers instructing users that pressing
   *    the delete key will remove the chip.
   * @param ***REMOVED***string=***REMOVED*** delete-button-label A label for the delete button. Also hidden and read by
   *    screen readers.
   * @param ***REMOVED***expression=***REMOVED*** md-separator-keys An array of key codes used to separate chips.
   *
   * @usage
   * <hljs lang="html">
   *   <md-chips
   *       ng-model="myItems"
   *       placeholder="Add an item"
   *       readonly="isReadOnly">
   *   </md-chips>
   * </hljs>
   *
   * <h3>Validation</h3>
   * When using [ngMessages](https://docs.angularjs.org/api/ngMessages), you can show errors based
   * on our custom validators.
   * <hljs lang="html">
   *   <form name="userForm">
   *     <md-chips
   *       name="fruits"
   *       ng-model="myItems"
   *       placeholder="Add an item"
   *       md-max-chips="5">
   *     </md-chips>
   *     <div ng-messages="userForm.fruits.$error" ng-if="userForm.$dirty">
   *       <div ng-message="md-max-chips">You reached the maximum amount of chips</div>
   *    </div>
   *   </form>
   * </hljs>
   *
   */


  var MD_CHIPS_TEMPLATE = '\
      <md-chips-wrap\
          ng-keydown="$mdChipsCtrl.chipKeydown($event)"\
          ng-class="***REMOVED*** \'md-focused\': $mdChipsCtrl.hasFocus(), \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly***REMOVED***"\
          class="md-chips">\
        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"\
            index="***REMOVED******REMOVED***$index***REMOVED******REMOVED***"\
            ng-class="***REMOVED***\'md-focused\': $mdChipsCtrl.selectedChip == $index, \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly***REMOVED***">\
          <div class="_md-chip-content"\
              tabindex="-1"\
              aria-hidden="true"\
              ng-click="!$mdChipsCtrl.readonly && $mdChipsCtrl.focusChip($index)"\
              ng-focus="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"\
              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>\
          <div ng-if="!$mdChipsCtrl.readonly"\
               class="_md-chip-remove-container"\
               md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>\
        </md-chip>\
        <div class="_md-chip-input-container">\
          <div ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl"\
               md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>\
        </div>\
      </md-chips-wrap>';

  var CHIP_INPUT_TEMPLATE = '\
        <input\
            class="md-input"\
            tabindex="0"\
            placeholder="***REMOVED******REMOVED***$mdChipsCtrl.getPlaceholder()***REMOVED******REMOVED***"\
            aria-label="***REMOVED******REMOVED***$mdChipsCtrl.getPlaceholder()***REMOVED******REMOVED***"\
            ng-model="$mdChipsCtrl.chipBuffer"\
            ng-focus="$mdChipsCtrl.onInputFocus()"\
            ng-blur="$mdChipsCtrl.onInputBlur()"\
            ng-trim="false"\
            ng-keydown="$mdChipsCtrl.inputKeydown($event)">';

  var CHIP_DEFAULT_TEMPLATE = '\
      <span>***REMOVED******REMOVED***$chip***REMOVED******REMOVED***</span>';

  var CHIP_REMOVE_TEMPLATE = '\
      <button\
          class="_md-chip-remove"\
          ng-if="!$mdChipsCtrl.readonly"\
          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"\
          type="button"\
          aria-hidden="true"\
          tabindex="-1">\
        <md-icon md-svg-src="***REMOVED******REMOVED*** $mdChipsCtrl.mdCloseIcon ***REMOVED******REMOVED***"></md-icon>\
        <span class="_md-visually-hidden">\
          ***REMOVED******REMOVED***$mdChipsCtrl.deleteButtonLabel***REMOVED******REMOVED***\
        </span>\
      </button>';

  /**
   * MDChips Directive Definition
   */
  function MdChips ($mdTheming, $mdUtil, $compile, $log, $timeout, $$mdSvgRegistry) ***REMOVED***
    // Run our templates through $mdUtil.processTemplate() to allow custom start/end symbols
    var templates = getTemplates();

    return ***REMOVED***
      template: function(element, attrs) ***REMOVED***
        // Clone the element into an attribute. By prepending the attribute
        // name with '$', Angular won't write it into the DOM. The cloned
        // element propagates to the link function via the attrs argument,
        // where various contained-elements can be consumed.
        attrs['$mdUserTemplate'] = element.clone();
        return templates.chips;
      ***REMOVED***,
      require: ['mdChips'],
      restrict: 'E',
      controller: 'MdChipsCtrl',
      controllerAs: '$mdChipsCtrl',
      bindToController: true,
      compile: compile,
      scope: ***REMOVED***
        readonly: '=readonly',
        placeholder: '@',
        mdEnableChipEdit: '@',
        secondaryPlaceholder: '@',
        maxChips: '@mdMaxChips',
        transformChip: '&mdTransformChip',
        onAppend: '&mdOnAppend',
        onAdd: '&mdOnAdd',
        onRemove: '&mdOnRemove',
        onSelect: '&mdOnSelect',
        deleteHint: '@',
        deleteButtonLabel: '@',
        separatorKeys: '=?mdSeparatorKeys',
        requireMatch: '=?mdRequireMatch'
      ***REMOVED***
    ***REMOVED***;

    /**
     * Builds the final template for `md-chips` and returns the postLink function.
     *
     * Building the template involves 3 key components:
     * static chips
     * chip template
     * input control
     *
     * If no `ng-model` is provided, only the static chip work needs to be done.
     *
     * If no user-passed `md-chip-template` exists, the default template is used. This resulting
     * template is appended to the chip content element.
     *
     * The remove button may be overridden by passing an element with an md-chip-remove attribute.
     *
     * If an `input` or `md-autocomplete` element is provided by the caller, it is set aside for
     * transclusion later. The transclusion happens in `postLink` as the parent scope is required.
     * If no user input is provided, a default one is appended to the input container node in the
     * template.
     *
     * Static Chips (i.e. `md-chip` elements passed from the caller) are gathered and set aside for
     * transclusion in the `postLink` function.
     *
     *
     * @param element
     * @param attr
     * @returns ***REMOVED***Function***REMOVED***
     */
    function compile(element, attr) ***REMOVED***
      // Grab the user template from attr and reset the attribute to null.
      var userTemplate = attr['$mdUserTemplate'];
      attr['$mdUserTemplate'] = null;

      var chipTemplate = getTemplateByQuery('md-chips>md-chip-template');

      var chipRemoveSelector = $mdUtil
        .prefixer()
        .buildList('md-chip-remove')
        .map(function(attr) ***REMOVED***
          return 'md-chips>*[' + attr + ']';
        ***REMOVED***)
        .join(',');

      // Set the chip remove, chip contents and chip input templates. The link function will put
      // them on the scope for transclusion later.
      var chipRemoveTemplate   = getTemplateByQuery(chipRemoveSelector) || templates.remove,
          chipContentsTemplate = chipTemplate || templates.default,
          chipInputTemplate    = getTemplateByQuery('md-chips>md-autocomplete')
              || getTemplateByQuery('md-chips>input')
              || templates.input,
          staticChips = userTemplate.find('md-chip');

      // Warn of malformed template. See #2545
      if (userTemplate[0].querySelector('md-chip-template>*[md-chip-remove]')) ***REMOVED***
        $log.warn('invalid placement of md-chip-remove within md-chip-template.');
      ***REMOVED***

      function getTemplateByQuery (query) ***REMOVED***
        if (!attr.ngModel) return;
        var element = userTemplate[0].querySelector(query);
        return element && element.outerHTML;
      ***REMOVED***

      /**
       * Configures controller and transcludes.
       */
      return function postLink(scope, element, attrs, controllers) ***REMOVED***
        $mdUtil.initOptionalProperties(scope, attr);

        $mdTheming(element);
        var mdChipsCtrl = controllers[0];
        if(chipTemplate) ***REMOVED***
          // Chip editing functionality assumes we are using the default chip template.
          mdChipsCtrl.enableChipEdit = false;
        ***REMOVED***

        mdChipsCtrl.chipContentsTemplate = chipContentsTemplate;
        mdChipsCtrl.chipRemoveTemplate   = chipRemoveTemplate;
        mdChipsCtrl.chipInputTemplate    = chipInputTemplate;

        mdChipsCtrl.mdCloseIcon = $$mdSvgRegistry.mdClose;

        element
            .attr(***REMOVED*** 'aria-hidden': true, tabindex: -1 ***REMOVED***)
            .on('focus', function () ***REMOVED*** mdChipsCtrl.onFocus(); ***REMOVED***);

        if (attr.ngModel) ***REMOVED***
          mdChipsCtrl.configureNgModel(element.controller('ngModel'));

          // If an `md-transform-chip` attribute was set, tell the controller to use the expression
          // before appending chips.
          if (attrs.mdTransformChip) mdChipsCtrl.useTransformChipExpression();

          // If an `md-on-append` attribute was set, tell the controller to use the expression
          // when appending chips.
          //
          // DEPRECATED: Will remove in official 1.0 release
          if (attrs.mdOnAppend) mdChipsCtrl.useOnAppendExpression();

          // If an `md-on-add` attribute was set, tell the controller to use the expression
          // when adding chips.
          if (attrs.mdOnAdd) mdChipsCtrl.useOnAddExpression();

          // If an `md-on-remove` attribute was set, tell the controller to use the expression
          // when removing chips.
          if (attrs.mdOnRemove) mdChipsCtrl.useOnRemoveExpression();

          // If an `md-on-select` attribute was set, tell the controller to use the expression
          // when selecting chips.
          if (attrs.mdOnSelect) mdChipsCtrl.useOnSelectExpression();

          // The md-autocomplete and input elements won't be compiled until after this directive
          // is complete (due to their nested nature). Wait a tick before looking for them to
          // configure the controller.
          if (chipInputTemplate != templates.input) ***REMOVED***
            // The autocomplete will not appear until the readonly attribute is not true (i.e.
            // false or undefined), so we have to watch the readonly and then on the next tick
            // after the chip transclusion has run, we can configure the autocomplete and user
            // input.
            scope.$watch('$mdChipsCtrl.readonly', function(readonly) ***REMOVED***
              if (!readonly) ***REMOVED***
                $mdUtil.nextTick(function()***REMOVED***
                  if (chipInputTemplate.indexOf('<md-autocomplete') === 0)
                    mdChipsCtrl
                        .configureAutocomplete(element.find('md-autocomplete')
                            .controller('mdAutocomplete'));
                  mdChipsCtrl.configureUserInput(element.find('input'));
                ***REMOVED***);
              ***REMOVED***
            ***REMOVED***);
          ***REMOVED***

          // At the next tick, if we find an input, make sure it has the md-input class
          $mdUtil.nextTick(function() ***REMOVED***
            var input = element.find('input');

            input && input.toggleClass('md-input', true);
          ***REMOVED***);
        ***REMOVED***

        // Compile with the parent's scope and prepend any static chips to the wrapper.
        if (staticChips.length > 0) ***REMOVED***
          var compiledStaticChips = $compile(staticChips.clone())(scope.$parent);
          $timeout(function() ***REMOVED*** element.find('md-chips-wrap').prepend(compiledStaticChips); ***REMOVED***);
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***

    function getTemplates() ***REMOVED***
      return ***REMOVED***
        chips: $mdUtil.processTemplate(MD_CHIPS_TEMPLATE),
        input: $mdUtil.processTemplate(CHIP_INPUT_TEMPLATE),
        default: $mdUtil.processTemplate(CHIP_DEFAULT_TEMPLATE),
        remove: $mdUtil.processTemplate(CHIP_REMOVE_TEMPLATE)
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  MdChips.$inject = ["$mdTheming", "$mdUtil", "$compile", "$log", "$timeout", "$$mdSvgRegistry"];

angular
    .module('material.components.chips')
    .controller('MdContactChipsCtrl', MdContactChipsCtrl);



/**
 * Controller for the MdContactChips component
 * @constructor
 */
function MdContactChipsCtrl () ***REMOVED***
  /** @type ***REMOVED***Object***REMOVED*** */
  this.selectedItem = null;

  /** @type ***REMOVED***string***REMOVED*** */
  this.searchText = '';
***REMOVED***


MdContactChipsCtrl.prototype.queryContact = function(searchText) ***REMOVED***
  var results = this.contactQuery(***REMOVED***'$query': searchText***REMOVED***);
  return this.filterSelected ?
      results.filter(angular.bind(this, this.filterSelectedContacts)) : results;
***REMOVED***;


MdContactChipsCtrl.prototype.itemName = function(item) ***REMOVED***
  return item[this.contactName];
***REMOVED***;


MdContactChipsCtrl.prototype.filterSelectedContacts = function(contact) ***REMOVED***
  return this.contacts.indexOf(contact) == -1;
***REMOVED***;

angular
  .module('material.components.chips')
  .directive('mdContactChips', MdContactChips);

/**
 * @ngdoc directive
 * @name mdContactChips
 * @module material.components.chips
 *
 * @description
 * `<md-contact-chips>` is an input component based on `md-chips` and makes use of an
 * `md-autocomplete` element. The component allows the caller to supply a query expression which
 * returns  a list of possible contacts. The user can select one of these and add it to the list of
 * chips.
 *
 * You may also use the `md-highlight-text` directive along with its parameters to control the
 * appearance of the matched text inside of the contacts' autocomplete popup.
 *
 * @param ***REMOVED***string=|object=***REMOVED*** ng-model A model to bind the list of items to
 * @param ***REMOVED***string=***REMOVED*** placeholder Placeholder text that will be forwarded to the input.
 * @param ***REMOVED***string=***REMOVED*** secondary-placeholder Placeholder text that will be forwarded to the input,
 *    displayed when there is at least on item in the list
 * @param ***REMOVED***expression***REMOVED*** md-contacts An expression expected to return contacts matching the search
 *    test, `$query`. If this expression involves a promise, a loading bar is displayed while
 *    waiting for it to resolve.
 * @param ***REMOVED***string***REMOVED*** md-contact-name The field name of the contact object representing the
 *    contact's name.
 * @param ***REMOVED***string***REMOVED*** md-contact-email The field name of the contact object representing the
 *    contact's email address.
 * @param ***REMOVED***string***REMOVED*** md-contact-image The field name of the contact object representing the
 *    contact's image.
 *
 *
 * @param ***REMOVED***expression=***REMOVED*** filter-selected Whether to filter selected contacts from the list of
 *    suggestions shown in the autocomplete. This attribute has been removed but may come back.
 *
 *
 *
 * @usage
 * <hljs lang="html">
 *   <md-contact-chips
 *       ng-model="ctrl.contacts"
 *       md-contacts="ctrl.querySearch($query)"
 *       md-contact-name="name"
 *       md-contact-image="image"
 *       md-contact-email="email"
 *       placeholder="To">
 *   </md-contact-chips>
 * </hljs>
 *
 */


var MD_CONTACT_CHIPS_TEMPLATE = '\
      <md-chips class="md-contact-chips"\
          ng-model="$mdContactChipsCtrl.contacts"\
          md-require-match="$mdContactChipsCtrl.requireMatch"\
          md-autocomplete-snap>\
          <md-autocomplete\
              md-menu-class="md-contact-chips-suggestions"\
              md-selected-item="$mdContactChipsCtrl.selectedItem"\
              md-search-text="$mdContactChipsCtrl.searchText"\
              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"\
              md-item-text="$mdContactChipsCtrl.itemName(item)"\
              md-no-cache="true"\
              md-autoselect\
              placeholder="***REMOVED******REMOVED***$mdContactChipsCtrl.contacts.length == 0 ?\
                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder***REMOVED******REMOVED***">\
            <div class="md-contact-suggestion">\
              <img \
                  ng-src="***REMOVED******REMOVED***item[$mdContactChipsCtrl.contactImage]***REMOVED******REMOVED***"\
                  alt="***REMOVED******REMOVED***item[$mdContactChipsCtrl.contactName]***REMOVED******REMOVED***"\
                  ng-if="item[$mdContactChipsCtrl.contactImage]" />\
              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText"\
                    md-highlight-flags="***REMOVED******REMOVED***$mdContactChipsCtrl.highlightFlags***REMOVED******REMOVED***">\
                ***REMOVED******REMOVED***item[$mdContactChipsCtrl.contactName]***REMOVED******REMOVED***\
              </span>\
              <span class="md-contact-email" >***REMOVED******REMOVED***item[$mdContactChipsCtrl.contactEmail]***REMOVED******REMOVED***</span>\
            </div>\
          </md-autocomplete>\
          <md-chip-template>\
            <div class="md-contact-avatar">\
              <img \
                  ng-src="***REMOVED******REMOVED***$chip[$mdContactChipsCtrl.contactImage]***REMOVED******REMOVED***"\
                  alt="***REMOVED******REMOVED***$chip[$mdContactChipsCtrl.contactName]***REMOVED******REMOVED***"\
                  ng-if="$chip[$mdContactChipsCtrl.contactImage]" />\
            </div>\
            <div class="md-contact-name">\
              ***REMOVED******REMOVED***$chip[$mdContactChipsCtrl.contactName]***REMOVED******REMOVED***\
            </div>\
          </md-chip-template>\
      </md-chips>';


/**
 * MDContactChips Directive Definition
 *
 * @param $mdTheming
 * @returns ***REMOVED*******REMOVED***
 * ngInject
 */
function MdContactChips($mdTheming, $mdUtil) ***REMOVED***
  return ***REMOVED***
    template: function(element, attrs) ***REMOVED***
      return MD_CONTACT_CHIPS_TEMPLATE;
    ***REMOVED***,
    restrict: 'E',
    controller: 'MdContactChipsCtrl',
    controllerAs: '$mdContactChipsCtrl',
    bindToController: true,
    compile: compile,
    scope: ***REMOVED***
      contactQuery: '&mdContacts',
      placeholder: '@',
      secondaryPlaceholder: '@',
      contactName: '@mdContactName',
      contactImage: '@mdContactImage',
      contactEmail: '@mdContactEmail',
      contacts: '=ngModel',
      requireMatch: '=?mdRequireMatch',
      highlightFlags: '@?mdHighlightFlags'
    ***REMOVED***
  ***REMOVED***;

  function compile(element, attr) ***REMOVED***
    return function postLink(scope, element, attrs, controllers) ***REMOVED***

      $mdUtil.initOptionalProperties(scope, attr);
      $mdTheming(element);

      element.attr('tabindex', '-1');
    ***REMOVED***;
  ***REMOVED***
***REMOVED***
MdContactChips.$inject = ["$mdTheming", "$mdUtil"];

ng.material.components.chips = angular.module("material.components.chips");
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
 * @name material.components.gridList
 */
angular.module('material.components.gridList', ['material.core'])
       .directive('mdGridList', GridListDirective)
       .directive('mdGridTile', GridTileDirective)
       .directive('mdGridTileFooter', GridTileCaptionDirective)
       .directive('mdGridTileHeader', GridTileCaptionDirective)
       .factory('$mdGridLayout', GridLayoutFactory);

/**
 * @ngdoc directive
 * @name mdGridList
 * @module material.components.gridList
 * @restrict E
 * @description
 * Grid lists are an alternative to standard list views. Grid lists are distinct
 * from grids used for layouts and other visual presentations.
 *
 * A grid list is best suited to presenting a homogenous data type, typically
 * images, and is optimized for visual comprehension and differentiating between
 * like data types.
 *
 * A grid list is a continuous element consisting of tessellated, regular
 * subdivisions called cells that contain tiles (`md-grid-tile`).
 *
 * <img src="//material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7OVlEaXZ5YmU1Xzg/components_grids_usage2.png"
 *    style="width: 300px; height: auto; margin-right: 16px;" alt="Concept of grid explained visually">
 * <img src="//material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7VGhsOE5idWlJWXM/components_grids_usage3.png"
 *    style="width: 300px; height: auto;" alt="Grid concepts legend">
 *
 * Cells are arrayed vertically and horizontally within the grid.
 *
 * Tiles hold content and can span one or more cells vertically or horizontally.
 *
 * ### Responsive Attributes
 *
 * The `md-grid-list` directive supports "responsive" attributes, which allow
 * different `md-cols`, `md-gutter` and `md-row-height` values depending on the
 * currently matching media query.
 *
 * In order to set a responsive attribute, first define the fallback value with
 * the standard attribute name, then add additional attributes with the
 * following convention: `***REMOVED***base-attribute-name***REMOVED***-***REMOVED***media-query-name***REMOVED***="***REMOVED***value***REMOVED***"`
 * (ie. `md-cols-lg="8"`)
 *
 * @param ***REMOVED***number***REMOVED*** md-cols Number of columns in the grid.
 * @param ***REMOVED***string***REMOVED*** md-row-height One of
 * <ul>
 *   <li>CSS length - Fixed height rows (eg. `8px` or `1rem`)</li>
 *   <li>`***REMOVED***width***REMOVED***:***REMOVED***height***REMOVED***` - Ratio of width to height (eg.
 *   `md-row-height="16:9"`)</li>
 *   <li>`"fit"` - Height will be determined by subdividing the available
 *   height by the number of rows</li>
 * </ul>
 * @param ***REMOVED***string=***REMOVED*** md-gutter The amount of space between tiles in CSS units
 *     (default 1px)
 * @param ***REMOVED***expression=***REMOVED*** md-on-layout Expression to evaluate after layout. Event
 *     object is available as `$event`, and contains performance information.
 *
 * @usage
 * Basic:
 * <hljs lang="html">
 * <md-grid-list md-cols="5" md-gutter="1em" md-row-height="4:3">
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Fixed-height rows:
 * <hljs lang="html">
 * <md-grid-list md-cols="4" md-row-height="200px" ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Fit rows:
 * <hljs lang="html">
 * <md-grid-list md-cols="4" md-row-height="fit" style="height: 400px;" ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Using responsive attributes:
 * <hljs lang="html">
 * <md-grid-list
 *     md-cols-sm="2"
 *     md-cols-md="4"
 *     md-cols-lg="8"
 *     md-cols-gt-lg="12"
 *     ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 */
function GridListDirective($interpolate, $mdConstant, $mdGridLayout, $mdMedia) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    controller: GridListController,
    scope: ***REMOVED***
      mdOnLayout: '&'
    ***REMOVED***,
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attrs, ctrl) ***REMOVED***
    element.addClass('_md');     // private md component indicator for styling
    
    // Apply semantics
    element.attr('role', 'list');

    // Provide the controller with a way to trigger layouts.
    ctrl.layoutDelegate = layoutDelegate;

    var invalidateLayout = angular.bind(ctrl, ctrl.invalidateLayout),
        unwatchAttrs = watchMedia();
      scope.$on('$destroy', unwatchMedia);

    /**
     * Watches for changes in media, invalidating layout as necessary.
     */
    function watchMedia() ***REMOVED***
      for (var mediaName in $mdConstant.MEDIA) ***REMOVED***
        $mdMedia(mediaName); // initialize
        $mdMedia.getQuery($mdConstant.MEDIA[mediaName])
            .addListener(invalidateLayout);
      ***REMOVED***
      return $mdMedia.watchResponsiveAttributes(
          ['md-cols', 'md-row-height', 'md-gutter'], attrs, layoutIfMediaMatch);
    ***REMOVED***

    function unwatchMedia() ***REMOVED***
      ctrl.layoutDelegate = angular.noop;

      unwatchAttrs();
      for (var mediaName in $mdConstant.MEDIA) ***REMOVED***
        $mdMedia.getQuery($mdConstant.MEDIA[mediaName])
            .removeListener(invalidateLayout);
      ***REMOVED***
    ***REMOVED***

    /**
     * Performs grid layout if the provided mediaName matches the currently
     * active media type.
     */
    function layoutIfMediaMatch(mediaName) ***REMOVED***
      if (mediaName == null) ***REMOVED***
        // TODO(shyndman): It would be nice to only layout if we have
        // instances of attributes using this media type
        ctrl.invalidateLayout();
      ***REMOVED*** else if ($mdMedia(mediaName)) ***REMOVED***
        ctrl.invalidateLayout();
      ***REMOVED***
    ***REMOVED***

    var lastLayoutProps;

    /**
     * Invokes the layout engine, and uses its results to lay out our
     * tile elements.
     *
     * @param ***REMOVED***boolean***REMOVED*** tilesInvalidated Whether tiles have been
     *    added/removed/moved since the last layout. This is to avoid situations
     *    where tiles are replaced with properties identical to their removed
     *    counterparts.
     */
    function layoutDelegate(tilesInvalidated) ***REMOVED***
      var tiles = getTileElements();
      var props = ***REMOVED***
        tileSpans: getTileSpans(tiles),
        colCount: getColumnCount(),
        rowMode: getRowMode(),
        rowHeight: getRowHeight(),
        gutter: getGutter()
      ***REMOVED***;

      if (!tilesInvalidated && angular.equals(props, lastLayoutProps)) ***REMOVED***
        return;
      ***REMOVED***

      var performance =
        $mdGridLayout(props.colCount, props.tileSpans, tiles)
          .map(function(tilePositions, rowCount) ***REMOVED***
            return ***REMOVED***
              grid: ***REMOVED***
                element: element,
                style: getGridStyle(props.colCount, rowCount,
                    props.gutter, props.rowMode, props.rowHeight)
              ***REMOVED***,
              tiles: tilePositions.map(function(ps, i) ***REMOVED***
                return ***REMOVED***
                  element: angular.element(tiles[i]),
                  style: getTileStyle(ps.position, ps.spans,
                      props.colCount, rowCount,
                      props.gutter, props.rowMode, props.rowHeight)
                ***REMOVED***
              ***REMOVED***)
            ***REMOVED***
          ***REMOVED***)
          .reflow()
          .performance();

      // Report layout
      scope.mdOnLayout(***REMOVED***
        $event: ***REMOVED***
          performance: performance
        ***REMOVED***
      ***REMOVED***);

      lastLayoutProps = props;
    ***REMOVED***

    // Use $interpolate to do some simple string interpolation as a convenience.

    var startSymbol = $interpolate.startSymbol();
    var endSymbol = $interpolate.endSymbol();

    // Returns an expression wrapped in the interpolator's start and end symbols.
    function expr(exprStr) ***REMOVED***
      return startSymbol + exprStr + endSymbol;
    ***REMOVED***

    // The amount of space a single 1x1 tile would take up (either width or height), used as
    // a basis for other calculations. This consists of taking the base size percent (as would be
    // if evenly dividing the size between cells), and then subtracting the size of one gutter.
    // However, since there are no gutters on the edges, each tile only uses a fration
    // (gutterShare = numGutters / numCells) of the gutter size. (Imagine having one gutter per
    // tile, and then breaking up the extra gutter on the edge evenly among the cells).
    var UNIT = $interpolate(expr('share') + '% - (' + expr('gutter') + ' * ' + expr('gutterShare') + ')');

    // The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
    // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
    // row/column (offset).
    var POSITION  = $interpolate('calc((' + expr('unit') + ' + ' + expr('gutter') + ') * ' + expr('offset') + ')');

    // The actual size of a tile, e.g., width or height, taking rowSpan or colSpan into account.
    // This is computed by multiplying the base unit by the rowSpan/colSpan, and then adding back
    // in the space that the gutter would normally have used (which was already accounted for in
    // the base unit calculation).
    var DIMENSION = $interpolate('calc((' + expr('unit') + ') * ' + expr('span') + ' + (' + expr('span') + ' - 1) * ' + expr('gutter') + ')');

    /**
     * Gets the styles applied to a tile element described by the given parameters.
     * @param ***REMOVED******REMOVED***row: number, col: number***REMOVED******REMOVED*** position The row and column indices of the tile.
     * @param ***REMOVED******REMOVED***row: number, col: number***REMOVED******REMOVED*** spans The rowSpan and colSpan of the tile.
     * @param ***REMOVED***number***REMOVED*** colCount The number of columns.
     * @param ***REMOVED***number***REMOVED*** rowCount The number of rows.
     * @param ***REMOVED***string***REMOVED*** gutter The amount of space between tiles. This will be something like
     *     '5px' or '2em'.
     * @param ***REMOVED***string***REMOVED*** rowMode The row height mode. Can be one of:
     *     'fixed': all rows have a fixed size, given by rowHeight,
     *     'ratio': row height defined as a ratio to width, or
     *     'fit': fit to the grid-list element height, divinding evenly among rows.
     * @param ***REMOVED***string|number***REMOVED*** rowHeight The height of a row. This is only used for 'fixed' mode and
     *     for 'ratio' mode. For 'ratio' mode, this is the *ratio* of width-to-height (e.g., 0.75).
     * @returns ***REMOVED***Object***REMOVED*** Map of CSS properties to be applied to the style element. Will define
     *     values for top, left, width, height, marginTop, and paddingTop.
     */
    function getTileStyle(position, spans, colCount, rowCount, gutter, rowMode, rowHeight) ***REMOVED***
      // TODO(shyndman): There are style caching opportunities here.

      // Percent of the available horizontal space that one column takes up.
      var hShare = (1 / colCount) * 100;

      // Fraction of the gutter size that each column takes up.
      var hGutterShare = (colCount - 1) / colCount;

      // Base horizontal size of a column.
      var hUnit = UNIT(***REMOVED***share: hShare, gutterShare: hGutterShare, gutter: gutter***REMOVED***);

      // The width and horizontal position of each tile is always calculated the same way, but the
      // height and vertical position depends on the rowMode.
      var style = ***REMOVED***
        left: POSITION(***REMOVED*** unit: hUnit, offset: position.col, gutter: gutter ***REMOVED***),
        width: DIMENSION(***REMOVED*** unit: hUnit, span: spans.col, gutter: gutter ***REMOVED***),
        // resets
        paddingTop: '',
        marginTop: '',
        top: '',
        height: ''
      ***REMOVED***;

      switch (rowMode) ***REMOVED***
        case 'fixed':
          // In fixed mode, simply use the given rowHeight.
          style.top = POSITION(***REMOVED*** unit: rowHeight, offset: position.row, gutter: gutter ***REMOVED***);
          style.height = DIMENSION(***REMOVED*** unit: rowHeight, span: spans.row, gutter: gutter ***REMOVED***);
          break;

        case 'ratio':
          // Percent of the available vertical space that one row takes up. Here, rowHeight holds
          // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
          var vShare = hShare / rowHeight;

          // Base veritcal size of a row.
          var vUnit = UNIT(***REMOVED*** share: vShare, gutterShare: hGutterShare, gutter: gutter ***REMOVED***);

          // padidngTop and marginTop are used to maintain the given aspect ratio, as
          // a percentage-based value for these properties is applied to the *width* of the
          // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
          style.paddingTop = DIMENSION(***REMOVED*** unit: vUnit, span: spans.row, gutter: gutter***REMOVED***);
          style.marginTop = POSITION(***REMOVED*** unit: vUnit, offset: position.row, gutter: gutter ***REMOVED***);
          break;

        case 'fit':
          // Fraction of the gutter size that each column takes up.
          var vGutterShare = (rowCount - 1) / rowCount;

          // Percent of the available vertical space that one row takes up.
          var vShare = (1 / rowCount) * 100;

          // Base vertical size of a row.
          var vUnit = UNIT(***REMOVED***share: vShare, gutterShare: vGutterShare, gutter: gutter***REMOVED***);

          style.top = POSITION(***REMOVED***unit: vUnit, offset: position.row, gutter: gutter***REMOVED***);
          style.height = DIMENSION(***REMOVED***unit: vUnit, span: spans.row, gutter: gutter***REMOVED***);
          break;
      ***REMOVED***

      return style;
    ***REMOVED***

    function getGridStyle(colCount, rowCount, gutter, rowMode, rowHeight) ***REMOVED***
      var style = ***REMOVED******REMOVED***;

      switch(rowMode) ***REMOVED***
        case 'fixed':
          style.height = DIMENSION(***REMOVED*** unit: rowHeight, span: rowCount, gutter: gutter ***REMOVED***);
          style.paddingBottom = '';
          break;

        case 'ratio':
          // rowHeight is width / height
          var hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount,
              hShare = (1 / colCount) * 100,
              vShare = hShare * (1 / rowHeight),
              vUnit = UNIT(***REMOVED*** share: vShare, gutterShare: hGutterShare, gutter: gutter ***REMOVED***);

          style.height = '';
          style.paddingBottom = DIMENSION(***REMOVED*** unit: vUnit, span: rowCount, gutter: gutter***REMOVED***);
          break;

        case 'fit':
          // noop, as the height is user set
          break;
      ***REMOVED***

      return style;
    ***REMOVED***

    function getTileElements() ***REMOVED***
      return [].filter.call(element.children(), function(ele) ***REMOVED***
        return ele.tagName == 'MD-GRID-TILE' && !ele.$$mdDestroyed;
      ***REMOVED***);
    ***REMOVED***

    /**
     * Gets an array of objects containing the rowspan and colspan for each tile.
     * @returns ***REMOVED***Array<***REMOVED***row: number, col: number***REMOVED***>***REMOVED***
     */
    function getTileSpans(tileElements) ***REMOVED***
      return [].map.call(tileElements, function(ele) ***REMOVED***
        var ctrl = angular.element(ele).controller('mdGridTile');
        return ***REMOVED***
          row: parseInt(
              $mdMedia.getResponsiveAttribute(ctrl.$attrs, 'md-rowspan'), 10) || 1,
          col: parseInt(
              $mdMedia.getResponsiveAttribute(ctrl.$attrs, 'md-colspan'), 10) || 1
        ***REMOVED***;
      ***REMOVED***);
    ***REMOVED***

    function getColumnCount() ***REMOVED***
      var colCount = parseInt($mdMedia.getResponsiveAttribute(attrs, 'md-cols'), 10);
      if (isNaN(colCount)) ***REMOVED***
        throw 'md-grid-list: md-cols attribute was not found, or contained a non-numeric value';
      ***REMOVED***
      return colCount;
    ***REMOVED***

    function getGutter() ***REMOVED***
      return applyDefaultUnit($mdMedia.getResponsiveAttribute(attrs, 'md-gutter') || 1);
    ***REMOVED***

    function getRowHeight() ***REMOVED***
      var rowHeight = $mdMedia.getResponsiveAttribute(attrs, 'md-row-height');
      if (!rowHeight) ***REMOVED***
        throw 'md-grid-list: md-row-height attribute was not found';
      ***REMOVED***

      switch (getRowMode()) ***REMOVED***
        case 'fixed':
          return applyDefaultUnit(rowHeight);
        case 'ratio':
          var whRatio = rowHeight.split(':');
          return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
        case 'fit':
          return 0; // N/A
      ***REMOVED***
    ***REMOVED***

    function getRowMode() ***REMOVED***
      var rowHeight = $mdMedia.getResponsiveAttribute(attrs, 'md-row-height');
      if (!rowHeight) ***REMOVED***
        throw 'md-grid-list: md-row-height attribute was not found';
      ***REMOVED***

      if (rowHeight == 'fit') ***REMOVED***
        return 'fit';
      ***REMOVED*** else if (rowHeight.indexOf(':') !== -1) ***REMOVED***
        return 'ratio';
      ***REMOVED*** else ***REMOVED***
        return 'fixed';
      ***REMOVED***
    ***REMOVED***

    function applyDefaultUnit(val) ***REMOVED***
      return /\D$/.test(val) ? val : val + 'px';
    ***REMOVED***
  ***REMOVED***
***REMOVED***
GridListDirective.$inject = ["$interpolate", "$mdConstant", "$mdGridLayout", "$mdMedia"];

/* ngInject */
function GridListController($mdUtil) ***REMOVED***
  this.layoutInvalidated = false;
  this.tilesInvalidated = false;
  this.$timeout_ = $mdUtil.nextTick;
  this.layoutDelegate = angular.noop;
***REMOVED***
GridListController.$inject = ["$mdUtil"];

GridListController.prototype = ***REMOVED***
  invalidateTiles: function() ***REMOVED***
    this.tilesInvalidated = true;
    this.invalidateLayout();
  ***REMOVED***,

  invalidateLayout: function() ***REMOVED***
    if (this.layoutInvalidated) ***REMOVED***
      return;
    ***REMOVED***
    this.layoutInvalidated = true;
    this.$timeout_(angular.bind(this, this.layout));
  ***REMOVED***,

  layout: function() ***REMOVED***
    try ***REMOVED***
      this.layoutDelegate(this.tilesInvalidated);
    ***REMOVED*** finally ***REMOVED***
      this.layoutInvalidated = false;
      this.tilesInvalidated = false;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;


/* ngInject */
function GridLayoutFactory($mdUtil) ***REMOVED***
  var defaultAnimator = GridTileAnimator;

  /**
   * Set the reflow animator callback
   */
  GridLayout.animateWith = function(customAnimator) ***REMOVED***
    defaultAnimator = !angular.isFunction(customAnimator) ? GridTileAnimator : customAnimator;
  ***REMOVED***;

  return GridLayout;

  /**
   * Publish layout function
   */
  function GridLayout(colCount, tileSpans) ***REMOVED***
      var self, layoutInfo, gridStyles, layoutTime, mapTime, reflowTime;

      layoutTime = $mdUtil.time(function() ***REMOVED***
        layoutInfo = calculateGridFor(colCount, tileSpans);
      ***REMOVED***);

      return self = ***REMOVED***

        /**
         * An array of objects describing each tile's position in the grid.
         */
        layoutInfo: function() ***REMOVED***
          return layoutInfo;
        ***REMOVED***,

        /**
         * Maps grid positioning to an element and a set of styles using the
         * provided updateFn.
         */
        map: function(updateFn) ***REMOVED***
          mapTime = $mdUtil.time(function() ***REMOVED***
            var info = self.layoutInfo();
            gridStyles = updateFn(info.positioning, info.rowCount);
          ***REMOVED***);
          return self;
        ***REMOVED***,

        /**
         * Default animator simply sets the element.css( <styles> ). An alternate
         * animator can be provided as an argument. The function has the following
         * signature:
         *
         *    function(***REMOVED***grid: ***REMOVED***element: JQLite, style: Object***REMOVED***, tiles: Array<***REMOVED***element: JQLite, style: Object***REMOVED***>)
         */
        reflow: function(animatorFn) ***REMOVED***
          reflowTime = $mdUtil.time(function() ***REMOVED***
            var animator = animatorFn || defaultAnimator;
            animator(gridStyles.grid, gridStyles.tiles);
          ***REMOVED***);
          return self;
        ***REMOVED***,

        /**
         * Timing for the most recent layout run.
         */
        performance: function() ***REMOVED***
          return ***REMOVED***
            tileCount: tileSpans.length,
            layoutTime: layoutTime,
            mapTime: mapTime,
            reflowTime: reflowTime,
            totalTime: layoutTime + mapTime + reflowTime
          ***REMOVED***;
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***

  /**
   * Default Gridlist animator simple sets the css for each element;
   * NOTE: any transitions effects must be manually set in the CSS.
   * e.g.
   *
   *  md-grid-tile ***REMOVED***
   *    transition: all 700ms ease-out 50ms;
   *  ***REMOVED***
   *
   */
  function GridTileAnimator(grid, tiles) ***REMOVED***
    grid.element.css(grid.style);
    tiles.forEach(function(t) ***REMOVED***
      t.element.css(t.style);
    ***REMOVED***)
  ***REMOVED***

  /**
   * Calculates the positions of tiles.
   *
   * The algorithm works as follows:
   *    An Array<Number> with length colCount (spaceTracker) keeps track of
   *    available tiling positions, where elements of value 0 represents an
   *    empty position. Space for a tile is reserved by finding a sequence of
   *    0s with length <= than the tile's colspan. When such a space has been
   *    found, the occupied tile positions are incremented by the tile's
   *    rowspan value, as these positions have become unavailable for that
   *    many rows.
   *
   *    If the end of a row has been reached without finding space for the
   *    tile, spaceTracker's elements are each decremented by 1 to a minimum
   *    of 0. Rows are searched in this fashion until space is found.
   */
  function calculateGridFor(colCount, tileSpans) ***REMOVED***
    var curCol = 0,
        curRow = 0,
        spaceTracker = newSpaceTracker();

    return ***REMOVED***
      positioning: tileSpans.map(function(spans, i) ***REMOVED***
        return ***REMOVED***
          spans: spans,
          position: reserveSpace(spans, i)
        ***REMOVED***;
      ***REMOVED***),
      rowCount: curRow + Math.max.apply(Math, spaceTracker)
    ***REMOVED***;

    function reserveSpace(spans, i) ***REMOVED***
      if (spans.col > colCount) ***REMOVED***
        throw 'md-grid-list: Tile at position ' + i + ' has a colspan ' +
            '(' + spans.col + ') that exceeds the column count ' +
            '(' + colCount + ')';
      ***REMOVED***

      var start = 0,
          end = 0;

      // TODO(shyndman): This loop isn't strictly necessary if you can
      // determine the minimum number of rows before a space opens up. To do
      // this, recognize that you've iterated across an entire row looking for
      // space, and if so fast-forward by the minimum rowSpan count. Repeat
      // until the required space opens up.
      while (end - start < spans.col) ***REMOVED***
        if (curCol >= colCount) ***REMOVED***
          nextRow();
          continue;
        ***REMOVED***

        start = spaceTracker.indexOf(0, curCol);
        if (start === -1 || (end = findEnd(start + 1)) === -1) ***REMOVED***
          start = end = 0;
          nextRow();
          continue;
        ***REMOVED***

        curCol = end + 1;
      ***REMOVED***

      adjustRow(start, spans.col, spans.row);
      curCol = start + spans.col;

      return ***REMOVED***
        col: start,
        row: curRow
      ***REMOVED***;
    ***REMOVED***

    function nextRow() ***REMOVED***
      curCol = 0;
      curRow++;
      adjustRow(0, colCount, -1); // Decrement row spans by one
    ***REMOVED***

    function adjustRow(from, cols, by) ***REMOVED***
      for (var i = from; i < from + cols; i++) ***REMOVED***
        spaceTracker[i] = Math.max(spaceTracker[i] + by, 0);
      ***REMOVED***
    ***REMOVED***

    function findEnd(start) ***REMOVED***
      var i;
      for (i = start; i < spaceTracker.length; i++) ***REMOVED***
        if (spaceTracker[i] !== 0) ***REMOVED***
          return i;
        ***REMOVED***
      ***REMOVED***

      if (i === spaceTracker.length) ***REMOVED***
        return i;
      ***REMOVED***
    ***REMOVED***

    function newSpaceTracker() ***REMOVED***
      var tracker = [];
      for (var i = 0; i < colCount; i++) ***REMOVED***
        tracker.push(0);
      ***REMOVED***
      return tracker;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
GridLayoutFactory.$inject = ["$mdUtil"];

/**
 * @ngdoc directive
 * @name mdGridTile
 * @module material.components.gridList
 * @restrict E
 * @description
 * Tiles contain the content of an `md-grid-list`. They span one or more grid
 * cells vertically or horizontally, and use `md-grid-tile-***REMOVED***footer,header***REMOVED***` to
 * display secondary content.
 *
 * ### Responsive Attributes
 *
 * The `md-grid-tile` directive supports "responsive" attributes, which allow
 * different `md-rowspan` and `md-colspan` values depending on the currently
 * matching media query.
 *
 * In order to set a responsive attribute, first define the fallback value with
 * the standard attribute name, then add additional attributes with the
 * following convention: `***REMOVED***base-attribute-name***REMOVED***-***REMOVED***media-query-name***REMOVED***="***REMOVED***value***REMOVED***"`
 * (ie. `md-colspan-sm="4"`)
 *
 * @param ***REMOVED***number=***REMOVED*** md-colspan The number of columns to span (default 1). Cannot
 *    exceed the number of columns in the grid. Supports interpolation.
 * @param ***REMOVED***number=***REMOVED*** md-rowspan The number of rows to span (default 1). Supports
 *     interpolation.
 *
 * @usage
 * With header:
 * <hljs lang="html">
 * <md-grid-tile>
 *   <md-grid-tile-header>
 *     <h3>This is a header</h3>
 *   </md-grid-tile-header>
 * </md-grid-tile>
 * </hljs>
 *
 * With footer:
 * <hljs lang="html">
 * <md-grid-tile>
 *   <md-grid-tile-footer>
 *     <h3>This is a footer</h3>
 *   </md-grid-tile-footer>
 * </md-grid-tile>
 * </hljs>
 *
 * Spanning multiple rows/columns:
 * <hljs lang="html">
 * <md-grid-tile md-colspan="2" md-rowspan="3">
 * </md-grid-tile>
 * </hljs>
 *
 * Responsive attributes:
 * <hljs lang="html">
 * <md-grid-tile md-colspan="1" md-colspan-sm="3" md-colspan-md="5">
 * </md-grid-tile>
 * </hljs>
 */
function GridTileDirective($mdMedia) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    require: '^mdGridList',
    template: '<figure ng-transclude></figure>',
    transclude: true,
    scope: ***REMOVED******REMOVED***,
    // Simple controller that exposes attributes to the grid directive
    controller: ["$attrs", function($attrs) ***REMOVED***
      this.$attrs = $attrs;
    ***REMOVED***],
    link: postLink
  ***REMOVED***;

  function postLink(scope, element, attrs, gridCtrl) ***REMOVED***
    // Apply semantics
    element.attr('role', 'listitem');

    // If our colspan or rowspan changes, trigger a layout
    var unwatchAttrs = $mdMedia.watchResponsiveAttributes(['md-colspan', 'md-rowspan'],
        attrs, angular.bind(gridCtrl, gridCtrl.invalidateLayout));

    // Tile registration/deregistration
    gridCtrl.invalidateTiles();
    scope.$on('$destroy', function() ***REMOVED***
      // Mark the tile as destroyed so it is no longer considered in layout,
      // even if the DOM element sticks around (like during a leave animation)
      element[0].$$mdDestroyed = true;
      unwatchAttrs();
      gridCtrl.invalidateLayout();
    ***REMOVED***);

    if (angular.isDefined(scope.$parent.$index)) ***REMOVED***
      scope.$watch(function() ***REMOVED*** return scope.$parent.$index; ***REMOVED***,
        function indexChanged(newIdx, oldIdx) ***REMOVED***
          if (newIdx === oldIdx) ***REMOVED***
            return;
          ***REMOVED***
          gridCtrl.invalidateTiles();
        ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
GridTileDirective.$inject = ["$mdMedia"];


function GridTileCaptionDirective() ***REMOVED***
  return ***REMOVED***
    template: '<figcaption ng-transclude></figcaption>',
    transclude: true
  ***REMOVED***;
***REMOVED***

***REMOVED***)(window, window.angular);
/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0
 */
(function( window, angular, undefined )***REMOVED***
"use strict";

(function () ***REMOVED***
  "use strict";

  /**
   *  Use a RegExp to check if the `md-colors="<expression>"` is static string
   *  or one that should be observed and dynamically interpolated.
   */
  var STATIC_COLOR_EXPRESSION = /^***REMOVED***((\s|,)*?["'a-zA-Z-]+?\s*?:\s*?('|")[a-zA-Z0-9-.]*('|"))+\s****REMOVED***$/;
  var colorPalettes = undefined;

  /**
   * @ngdoc module
   * @name material.components.colors
   *
   * @description
   * Define $mdColors service and a `md-colors=""` attribute directive
   */
  angular
    .module('material.components.colors', ['material.core'])
    .directive('mdColors', MdColorsDirective)
    .service('$mdColors', MdColorsService);

  /**
   * @ngdoc service
   * @name $mdColors
   * @module material.components.colors
   *
   * @description
   * With only defining themes, one couldn't get non ngMaterial elements colored with Material colors,
   * `$mdColors` service is used by the md-color directive to convert the 1..n color expressions to RGBA values and will apply
   * those values to element as CSS property values.
   *
   *  @usage
   *  <hljs lang="js">
   *    angular.controller('myCtrl', function ($mdColors) ***REMOVED***
   *      var color = $mdColors.getThemeColor('myTheme-red-200-0.5');
   *      ...
   *    ***REMOVED***);
   *  </hljs>
   *
   */
  function MdColorsService($mdTheming, $mdUtil, $log) ***REMOVED***
    colorPalettes = colorPalettes || Object.keys($mdTheming.PALETTES);

    // Publish service instance
    return ***REMOVED***
      applyThemeColors: applyThemeColors,
      getThemeColor: getThemeColor,
      hasTheme: hasTheme
    ***REMOVED***;

    // ********************************************
    // Internal Methods
    // ********************************************

    /**
     * @ngdoc method
     * @name $mdColors#applyThemeColors
     *
     * @description
     * Gets a color json object, keys are css properties and values are string of the wanted color
     * Then calculate the rgba() values based on the theme color parts
     *
     * @param ***REMOVED***DOMElement***REMOVED*** element the element to apply the styles on.
     * @param ***REMOVED***object***REMOVED*** colorExpression json object, keys are css properties and values are string of the wanted color,
     * for example: `***REMOVED***color: 'red-A200-0.3'***REMOVED***`.
     *
     * @usage
     * <hljs lang="js">
     *   app.directive('myDirective', function($mdColors) ***REMOVED***
     *     return ***REMOVED***
     *       ...
     *       link: function (scope, elem) ***REMOVED***
     *         $mdColors.applyThemeColors(elem, ***REMOVED***color: 'red'***REMOVED***);
     *       ***REMOVED***
     *    ***REMOVED***
     *   ***REMOVED***);
     * </hljs>
     */
    function applyThemeColors(element, colorExpression) ***REMOVED***
      try ***REMOVED***
        if (colorExpression) ***REMOVED***
          // Assign the calculate RGBA color values directly as inline CSS
          element.css(interpolateColors(colorExpression));
        ***REMOVED***
      ***REMOVED*** catch (e) ***REMOVED***
        $log.error(e.message);
      ***REMOVED***

    ***REMOVED***

    /**
     * @ngdoc method
     * @name $mdColors#getThemeColor
     *
     * @description
     * Get parsed color from expression
     *
     * @param ***REMOVED***string***REMOVED*** expression string of a color expression (for instance `'red-700-0.8'`)
     *
     * @returns ***REMOVED***string***REMOVED*** a css color expression (for instance `rgba(211, 47, 47, 0.8)`)
     *
     * @usage
     *  <hljs lang="js">
     *    angular.controller('myCtrl', function ($mdColors) ***REMOVED***
     *      var color = $mdColors.getThemeColor('myTheme-red-200-0.5');
     *      ...
     *    ***REMOVED***);
     *  </hljs>
     */
    function getThemeColor(expression) ***REMOVED***
      var color = extractColorOptions(expression);

      return parseColor(color);
    ***REMOVED***

    /**
     * Return the parsed color
     * @param color hashmap of color definitions
     * @param contrast whether use contrast color for foreground
     * @returns rgba color string
     */
    function parseColor(color, contrast) ***REMOVED***
      contrast = contrast || false;
      var rgbValues = $mdTheming.PALETTES[color.palette][color.hue];

      rgbValues = contrast ? rgbValues.contrast : rgbValues.value;

      return $mdUtil.supplant('rgba(***REMOVED***0***REMOVED***, ***REMOVED***1***REMOVED***, ***REMOVED***2***REMOVED***, ***REMOVED***3***REMOVED***)',
        [rgbValues[0], rgbValues[1], rgbValues[2], rgbValues[3] || color.opacity]
      );
    ***REMOVED***

    /**
     * Convert the color expression into an object with scope-interpolated values
     * Then calculate the rgba() values based on the theme color parts
     *
     * @results Hashmap of CSS properties with associated `rgba( )` string vales
     *
     *
     */
    function interpolateColors(themeColors) ***REMOVED***
      var rgbColors = ***REMOVED******REMOVED***;

      var hasColorProperty = themeColors.hasOwnProperty('color');

      angular.forEach(themeColors, function (value, key) ***REMOVED***
        var color = extractColorOptions(value);
        var hasBackground = key.indexOf('background') > -1;

        rgbColors[key] = parseColor(color);
        if (hasBackground && !hasColorProperty) ***REMOVED***
          rgbColors['color'] = parseColor(color, true);
        ***REMOVED***
      ***REMOVED***);

      return rgbColors;
    ***REMOVED***

    /**
     * Check if expression has defined theme
     * e.g.
     * 'myTheme-primary' => true
     * 'red-800' => false
     */
    function hasTheme(expression) ***REMOVED***
      return angular.isDefined($mdTheming.THEMES[expression.split('-')[0]]);
    ***REMOVED***

    /**
     * For the evaluated expression, extract the color parts into a hash map
     */
    function extractColorOptions(expression) ***REMOVED***
      var parts = expression.split('-');
      var hasTheme = angular.isDefined($mdTheming.THEMES[parts[0]]);
      var theme = hasTheme ? parts.splice(0, 1)[0] : $mdTheming.defaultTheme();

      return ***REMOVED***
        theme: theme,
        palette: extractPalette(parts, theme),
        hue: extractHue(parts, theme),
        opacity: parts[2] || 1
      ***REMOVED***;
    ***REMOVED***

    /**
     * Calculate the theme palette name
     */
    function extractPalette(parts, theme) ***REMOVED***
      // If the next section is one of the palettes we assume it's a two word palette
      // Two word palette can be also written in camelCase, forming camelCase to dash-case

      var isTwoWord = parts.length > 1 && colorPalettes.indexOf(parts[1]) !== -1;
      var palette = parts[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      if (isTwoWord)  palette = parts[0] + '-' + parts.splice(1, 1);

      if (colorPalettes.indexOf(palette) === -1) ***REMOVED***
        // If the palette is not in the palette list it's one of primary/accent/warn/background
        var scheme = $mdTheming.THEMES[theme].colors[palette];
        if (!scheme) ***REMOVED***
          throw new Error($mdUtil.supplant('mdColors: couldn\'t find \'***REMOVED***palette***REMOVED***\' in the palettes.', ***REMOVED***palette: palette***REMOVED***));
        ***REMOVED***
        palette = scheme.name;
      ***REMOVED***

      return palette;
    ***REMOVED***

    function extractHue(parts, theme) ***REMOVED***
      var themeColors = $mdTheming.THEMES[theme].colors;

      if (parts[1] === 'hue') ***REMOVED***
        var hueNumber = parseInt(parts.splice(2, 1)[0], 10);

        if (hueNumber < 1 || hueNumber > 3) ***REMOVED***
          throw new Error($mdUtil.supplant('mdColors: \'hue-***REMOVED***hueNumber***REMOVED***\' is not a valid hue, can be only \'hue-1\', \'hue-2\' and \'hue-3\'', ***REMOVED***hueNumber: hueNumber***REMOVED***));
        ***REMOVED***
        parts[1] = 'hue-' + hueNumber;

        if (!(parts[0] in themeColors)) ***REMOVED***
          throw new Error($mdUtil.supplant('mdColors: \'hue-x\' can only be used with [***REMOVED***availableThemes***REMOVED***], but was used with \'***REMOVED***usedTheme***REMOVED***\'', ***REMOVED***
            availableThemes: Object.keys(themeColors).join(', '),
            usedTheme: parts[0]
          ***REMOVED***));
        ***REMOVED***

        return themeColors[parts[0]].hues[parts[1]];
      ***REMOVED***

      return parts[1] || themeColors[parts[0] in themeColors ? parts[0] : 'primary'].hues['default'];
    ***REMOVED***
  ***REMOVED***
  MdColorsService.$inject = ["$mdTheming", "$mdUtil", "$log"];

  /**
   * @ngdoc directive
   * @name mdColors
   * @module material.components.colors
   *
   * @restrict A
   *
   * @description
   * `mdColors` directive will apply the theme-based color expression as RGBA CSS style values.
   *
   *   The format will be similar to our color defining in the scss files:
   *
   *   ## `[?theme]-[palette]-[?hue]-[?opacity]`
   *   - [theme]    - default value is the default theme
   *   - [palette]  - can be either palette name or primary/accent/warn/background
   *   - [hue]      - default is 500 (hue-x can be used with primary/accent/warn/background)
   *   - [opacity]  - default is 1
   *
   *   > `?` indicates optional parameter
   *
   * @usage
   * <hljs lang="html">
   *   <div md-colors="***REMOVED***background: 'myTheme-accent-900-0.43'***REMOVED***">
   *     <div md-colors="***REMOVED***color: 'red-A100', border-color: 'primary-600'***REMOVED***">
   *       <span>Color demo</span>
   *     </div>
   *   </div>
   * </hljs>
   *
   * `mdColors` directive will automatically watch for changes in the expression if it recognizes an interpolation
   * expression or a function. For performance options, you can use `::` prefix to the `md-colors` expression
   * to indicate a one-time data binding.
   * <hljs lang="html">
   *   <md-card md-colors="::***REMOVED***background: '***REMOVED******REMOVED***theme***REMOVED******REMOVED***-primary-700'***REMOVED***">
   *   </md-card>
   * </hljs>
   *
   */
  function MdColorsDirective($mdColors, $mdUtil, $log, $parse) ***REMOVED***
    return ***REMOVED***
      restrict: 'A',
      require: ['^?mdTheme'],
      compile: function (tElem, tAttrs) ***REMOVED***
        var shouldWatch = shouldColorsWatch();

        return function (scope, element, attrs, ctrl) ***REMOVED***
          var mdThemeController = ctrl[0];

          var lastColors = ***REMOVED******REMOVED***;

          var parseColors = function (theme) ***REMOVED***
            if (typeof theme !== 'string') ***REMOVED***
              theme = '';
            ***REMOVED***

            if (!attrs.mdColors) ***REMOVED***
              attrs.mdColors = '***REMOVED******REMOVED***';
            ***REMOVED***

            /**
             * Json.parse() does not work because the keys are not quoted;
             * use $parse to convert to a hash map
             */
            var colors = $parse(attrs.mdColors)(scope);

            /**
             * If mdTheme is defined up the DOM tree
             * we add mdTheme theme to colors who doesn't specified a theme
             *
             * # example
             * <hljs lang="html">
             *   <div md-theme="myTheme">
             *     <div md-colors="***REMOVED***background: 'primary-600'***REMOVED***">
             *       <span md-colors="***REMOVED***background: 'mySecondTheme-accent-200'***REMOVED***">Color demo</span>
             *     </div>
             *   </div>
             * </hljs>
             *
             * 'primary-600' will be 'myTheme-primary-600',
             * but 'mySecondTheme-accent-200' will stay the same cause it has a theme prefix
             */
            if (mdThemeController) ***REMOVED***
              Object.keys(colors).forEach(function (prop) ***REMOVED***
                var color = colors[prop];
                if (!$mdColors.hasTheme(color)) ***REMOVED***
                  colors[prop] = (theme || mdThemeController.$mdTheme) + '-' + color;
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***

            cleanElement(colors);

            return colors;
          ***REMOVED***;

          var cleanElement = function (colors) ***REMOVED***
            if (!angular.equals(colors, lastColors)) ***REMOVED***
              var keys = Object.keys(lastColors);

              if (lastColors.background && !keys['color']) ***REMOVED***
                keys.push('color');
              ***REMOVED***

              keys.forEach(function (key) ***REMOVED***
                element.css(key, '');
              ***REMOVED***);
            ***REMOVED***

            lastColors = colors;
          ***REMOVED***;

          /**
           * Registering for mgTheme changes and asking mdTheme controller run our callback whenever a theme changes
           */
          var unregisterChanges = angular.noop;

          if (mdThemeController) ***REMOVED***
            unregisterChanges = mdThemeController.registerChanges(function (theme) ***REMOVED***
              $mdColors.applyThemeColors(element, parseColors(theme));
            ***REMOVED***);
          ***REMOVED***

          scope.$on('$destroy', function () ***REMOVED***
            unregisterChanges();
          ***REMOVED***);

          try ***REMOVED***
            if (shouldWatch) ***REMOVED***
              scope.$watch(parseColors, angular.bind(this,
                $mdColors.applyThemeColors, element
              ), true);
            ***REMOVED***
            else ***REMOVED***
              $mdColors.applyThemeColors(element, parseColors());
            ***REMOVED***

          ***REMOVED***
          catch (e) ***REMOVED***
            $log.error(e.message);
          ***REMOVED***

        ***REMOVED***;

        function shouldColorsWatch() ***REMOVED***
          // Simulate 1x binding and mark mdColorsWatch == false
          var rawColorExpression = tAttrs.mdColors;
          var bindOnce = rawColorExpression.indexOf('::') > -1;
          var isStatic = bindOnce ? true : STATIC_COLOR_EXPRESSION.test(tAttrs.mdColors);

          // Remove it for the postLink...
          tAttrs.mdColors = rawColorExpression.replace('::', '');

          var hasWatchAttr = angular.isDefined(tAttrs.mdColorsWatch);

          return (bindOnce || isStatic) ? false :
            hasWatchAttr ? $mdUtil.parseAttributeBoolean(tAttrs.mdColorsWatch) : true;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;

  ***REMOVED***
  MdColorsDirective.$inject = ["$mdColors", "$mdUtil", "$log", "$parse"];


***REMOVED***)();

***REMOVED***)(window, window.angular);
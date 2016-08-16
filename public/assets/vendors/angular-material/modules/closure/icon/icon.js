/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.icon');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.icon
 * @description
 * Icon
 */
angular.module('material.components.icon', ['material.core']);

angular
  .module('material.components.icon')
  .directive('mdIcon', ['$mdIcon', '$mdTheming', '$mdAria', '$sce', mdIconDirective]);

/**
 * @ngdoc directive
 * @name mdIcon
 * @module material.components.icon
 *
 * @restrict E
 *
 * @description
 * The `md-icon` directive makes it easier to use vector-based icons in your app (as opposed to
 * raster-based icons types like PNG). The directive supports both icon fonts and SVG icons.
 *
 * Icons should be consider view-only elements that should not be used directly as buttons; instead nest a `<md-icon>`
 * inside a `md-button` to add hover and click features.
 *
 * ### Icon fonts
 * Icon fonts are a technique in which you use a font where the glyphs in the font are
 * your icons instead of text. Benefits include a straightforward way to bundle everything into a
 * single HTTP request, simple scaling, easy color changing, and more.
 *
 * `md-icon` lets you consume an icon font by letting you reference specific icons in that font
 * by name rather than character code.
 *
 * ### SVG
 * For SVGs, the problem with using `<img>` or a CSS `background-image` is that you can't take
 * advantage of some SVG features, such as styling specific parts of the icon with CSS or SVG
 * animation.
 *
 * `md-icon` makes it easier to use SVG icons by *inlining* the SVG into an `<svg>` element in the
 * document. The most straightforward way of referencing an SVG icon is via URL, just like a
 * traditional `<img>`. `$mdIconProvider`, as a convenience, lets you _name_ an icon so you can
 * reference it by name instead of URL throughout your templates.
 *
 * Additionally, you may not want to make separate HTTP requests for every icon, so you can bundle
 * your SVG icons together and pre-load them with $mdIconProvider as an icon set. An icon set can
 * also be given a name, which acts as a namespace for individual icons, so you can reference them
 * like `"social:cake"`.
 *
 * When using SVGs, both external SVGs (via URLs) or sets of SVGs [from icon sets] can be
 * easily loaded and used.When use font-icons, developers must following three (3) simple steps:
 *
 * <ol>
 * <li>Load the font library. e.g.<br/>
 *    `<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
 *    rel="stylesheet">`
 * </li>
 * <li>
 *   Use either (a) font-icon class names or (b) font ligatures to render the font glyph by using
 *   its textual name
 * </li>
 * <li>
 *   Use `<md-icon md-font-icon="classname" />` or <br/>
 *   use `<md-icon md-font-set="font library classname or alias"> textual_name </md-icon>` or <br/>
 *   use `<md-icon md-font-set="font library classname or alias"> numerical_character_reference </md-icon>`
 * </li>
 * </ol>
 *
 * Full details for these steps can be found:
 *
 * <ul>
 * <li>http://google.github.io/material-design-icons/</li>
 * <li>http://google.github.io/material-design-icons/#icon-font-for-the-web</li>
 * </ul>
 *
 * The Material Design icon style <code>.material-icons</code> and the icon font references are published in
 * Material Design Icons:
 *
 * <ul>
 * <li>http://www.google.com/design/icons/</li>
 * <li>https://www.google.com/design/icons/#ic_accessibility</li>
 * </ul>
 *
 * <h2 id="material_design_icons">Material Design Icons</h2>
 * Using the Material Design Icon-Selector, developers can easily and quickly search for a Material Design font-icon and
 * determine its textual name and character reference code. Click on any icon to see the slide-up information
 * panel with details regarding a SVG download or information on the font-icon usage.
 *
 * <a href="https://www.google.com/design/icons/#ic_accessibility" target="_blank" style="border-bottom:none;">
 * <img src="https://cloud.githubusercontent.com/assets/210413/7902490/fe8dd14c-0780-11e5-98fb-c821cc6475e6.png"
 *      aria-label="Material Design Icon-Selector" style="max-width:75%;padding-left:10%">
 * </a>
 *
 * <span class="image_caption">
 *  Click on the image above to link to the
 *  <a href="https://www.google.com/design/icons/#ic_accessibility" target="_blank">Material Design Icon-Selector</a>.
 * </span>
 *
 * @param ***REMOVED***string***REMOVED*** md-font-icon String name of CSS icon associated with the font-face will be used
 * to render the icon. Requires the fonts and the named CSS styles to be preloaded.
 * @param ***REMOVED***string***REMOVED*** md-font-set CSS style name associated with the font library; which will be assigned as
 * the class for the font-icon ligature. This value may also be an alias that is used to lookup the classname;
 * internally use `$mdIconProvider.fontSet(<alias>)` to determine the style name.
 * @param ***REMOVED***string***REMOVED*** md-svg-src String URL (or expression) used to load, cache, and display an
 *     external SVG.
 * @param ***REMOVED***string***REMOVED*** md-svg-icon md-svg-icon String name used for lookup of the icon from the internal cache;
 *     interpolated strings or expressions may also be used. Specific set names can be used with
 *     the syntax `<set name>:<icon name>`.<br/><br/>
 * To use icon sets, developers are required to pre-register the sets using the `$mdIconProvider` service.
 * @param ***REMOVED***string=***REMOVED*** aria-label Labels icon for accessibility. If an empty string is provided, icon
 * will be hidden from accessibility layer with `aria-hidden="true"`. If there's no aria-label on the icon
 * nor a label on the parent element, a warning will be logged to the console.
 * @param ***REMOVED***string=***REMOVED*** alt Labels icon for accessibility. If an empty string is provided, icon
 * will be hidden from accessibility layer with `aria-hidden="true"`. If there's no alt on the icon
 * nor a label on the parent element, a warning will be logged to the console.
 *
 * @usage
 * When using SVGs:
 * <hljs lang="html">
 *
 *  <!-- Icon ID; may contain optional icon set prefix; icons must registered using $mdIconProvider -->
 *  <md-icon md-svg-icon="social:android"    aria-label="android " ></md-icon>
 *
 *  <!-- Icon urls; may be preloaded in templateCache -->
 *  <md-icon md-svg-src="/android.svg"       aria-label="android " ></md-icon>
 *  <md-icon md-svg-src="***REMOVED******REMOVED*** getAndroid() ***REMOVED******REMOVED***" aria-label="android " ></md-icon>
 *
 * </hljs>
 *
 * Use the <code>$mdIconProvider</code> to configure your application with
 * svg iconsets.
 *
 * <hljs lang="js">
 *  angular.module('appSvgIconSets', ['ngMaterial'])
 *    .controller('DemoCtrl', function($scope) ***REMOVED******REMOVED***)
 *    .config(function($mdIconProvider) ***REMOVED***
 *      $mdIconProvider
 *         .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
 *         .defaultIconSet('img/icons/sets/core-icons.svg', 24);
 *     ***REMOVED***);
 * </hljs>
 *
 *
 * When using Font Icons with classnames:
 * <hljs lang="html">
 *
 *  <md-icon md-font-icon="android" aria-label="android" ></md-icon>
 *  <md-icon class="icon_home"      aria-label="Home"    ></md-icon>
 *
 * </hljs>
 *
 * When using Material Font Icons with ligatures:
 * <hljs lang="html">
 *  <!--
 *  For Material Design Icons
 *  The class '.material-icons' is auto-added if a style has NOT been specified
 *  since `material-icons` is the default fontset. So your markup:
 *  -->
 *  <md-icon> face </md-icon>
 *  <!-- becomes this at runtime: -->
 *  <md-icon md-font-set="material-icons"> face </md-icon>
 *  <!-- If the fontset does not support ligature names, then we need to use the ligature unicode.-->
 *  <md-icon> &#xE87C; </md-icon>
 *  <!-- The class '.material-icons' must be manually added if other styles are also specified-->
 *  <md-icon class="material-icons md-light md-48"> face </md-icon>
 * </hljs>
 *
 * When using other Font-Icon libraries:
 *
 * <hljs lang="js">
 *  // Specify a font-icon style alias
 *  angular.config(function($mdIconProvider) ***REMOVED***
 *    $mdIconProvider.fontSet('md', 'material-icons');
 *  ***REMOVED***);
 * </hljs>
 *
 * <hljs lang="html">
 *  <md-icon md-font-set="md">favorite</md-icon>
 * </hljs>
 *
 */
function mdIconDirective($mdIcon, $mdTheming, $mdAria, $sce) ***REMOVED***

  return ***REMOVED***
    restrict: 'E',
    link : postLink
  ***REMOVED***;


  /**
   * Directive postLink
   * Supports embedded SVGs, font-icons, & external SVGs
   */
  function postLink(scope, element, attr) ***REMOVED***
    $mdTheming(element);

    prepareForFontIcon();

    // Keep track of the content of the svg src so we can compare against it later to see if the
    // attribute is static (and thus safe).
    var originalSvgSrc = element[0].getAttribute(attr.$attr.mdSvgSrc);

    // If using a font-icon, then the textual name of the icon itself
    // provides the aria-label.

    var label = attr.alt || attr.mdFontIcon || attr.mdSvgIcon || element.text();
    var attrName = attr.$normalize(attr.$attr.mdSvgIcon || attr.$attr.mdSvgSrc || '');

    if ( !attr['aria-label'] ) ***REMOVED***

      if (label !== '' && !parentsHaveText() ) ***REMOVED***

        $mdAria.expect(element, 'aria-label', label);
        $mdAria.expect(element, 'role', 'img');

      ***REMOVED*** else if ( !element.text() ) ***REMOVED***
        // If not a font-icon with ligature, then
        // hide from the accessibility layer.

        $mdAria.expect(element, 'aria-hidden', 'true');
      ***REMOVED***
    ***REMOVED***

    if (attrName) ***REMOVED***
      // Use either pre-configured SVG or URL source, respectively.
      attr.$observe(attrName, function(attrVal) ***REMOVED***

        // If using svg-src and the value is static (i.e., is exactly equal to the compile-time
        // `md-svg-src` value), then it is implicitly trusted.
        if (!isInlineSvg(attrVal) && attrVal === originalSvgSrc) ***REMOVED***
          attrVal = $sce.trustAsUrl(attrVal);
        ***REMOVED***

        element.empty();
        if (attrVal) ***REMOVED***
          $mdIcon(attrVal)
            .then(function(svg) ***REMOVED***
              element.empty();
              element.append(svg);
            ***REMOVED***);
        ***REMOVED***

      ***REMOVED***);
    ***REMOVED***

    function parentsHaveText() ***REMOVED***
      var parent = element.parent();
      if (parent.attr('aria-label') || parent.text()) ***REMOVED***
        return true;
      ***REMOVED***
      else if(parent.parent().attr('aria-label') || parent.parent().text()) ***REMOVED***
        return true;
      ***REMOVED***
      return false;
    ***REMOVED***

    function prepareForFontIcon() ***REMOVED***
      if (!attr.mdSvgIcon && !attr.mdSvgSrc) ***REMOVED***
        if (attr.mdFontIcon) ***REMOVED***
          element.addClass('md-font ' + attr.mdFontIcon);
        ***REMOVED***
        element.addClass($mdIcon.fontSet(attr.mdFontSet));
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  /**
   * Gets whether the given svg src is an inline ("data:" style) SVG.
   * @param ***REMOVED***string***REMOVED*** svgSrc The svg src.
   * @returns ***REMOVED***boolean***REMOVED*** Whether the src is an inline SVG.
   */
  function isInlineSvg(svgSrc) ***REMOVED***
    var dataUrlRegex = /^data:image\/svg\+xml[\s*;\w\-\=]*?(base64)?,(.*)$/i;
    return dataUrlRegex.test(svgSrc);
  ***REMOVED***
***REMOVED***

  angular
    .module('material.components.icon')
    .constant('$$mdSvgRegistry', ***REMOVED***
        'mdTabsArrow':   'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4=',
        'mdClose':       'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xOSA2LjQxbC0xLjQxLTEuNDEtNS41OSA1LjU5LTUuNTktNS41OS0xLjQxIDEuNDEgNS41OSA1LjU5LTUuNTkgNS41OSAxLjQxIDEuNDEgNS41OS01LjU5IDUuNTkgNS41OSAxLjQxLTEuNDEtNS41OS01LjU5eiIvPjwvZz48L3N2Zz4=',
        'mdCancel':      'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xMiAyYy01LjUzIDAtMTAgNC40Ny0xMCAxMHM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTAtNC40Ny0xMC0xMC0xMHptNSAxMy41OWwtMS40MSAxLjQxLTMuNTktMy41OS0zLjU5IDMuNTktMS40MS0xLjQxIDMuNTktMy41OS0zLjU5LTMuNTkgMS40MS0xLjQxIDMuNTkgMy41OSAzLjU5LTMuNTkgMS40MSAxLjQxLTMuNTkgMy41OSAzLjU5IDMuNTl6Ii8+PC9nPjwvc3ZnPg==',
        'mdMenu':        'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0zLDZIMjFWOEgzVjZNMywxMUgyMVYxM0gzVjExTTMsMTZIMjFWMThIM1YxNloiIC8+PC9zdmc+',
        'mdToggleArrow': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGQ9Ik0yNCAxNmwtMTIgMTIgMi44MyAyLjgzIDkuMTctOS4xNyA5LjE3IDkuMTcgMi44My0yLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==',
        'mdCalendar':    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg=='
    ***REMOVED***)
    .provider('$mdIcon', MdIconProvider);

/**
 * @ngdoc service
 * @name $mdIconProvider
 * @module material.components.icon
 *
 * @description
 * `$mdIconProvider` is used only to register icon IDs with URLs. These configuration features allow
 * icons and icon sets to be pre-registered and associated with source URLs **before** the `<md-icon />`
 * directives are compiled.
 *
 * If using font-icons, the developer is responsible for loading the fonts.
 *
 * If using SVGs, loading of the actual svg files are deferred to on-demand requests and are loaded
 * internally by the `$mdIcon` service using the `$templateRequest` service. When an SVG is
 * requested by name/ID, the `$mdIcon` service searches its registry for the associated source URL;
 * that URL is used to on-demand load and parse the SVG dynamically.
 *
 * **Notice:** Most font-icons libraries do not support ligatures (for example `fontawesome`).<br/>
 *  In such cases you are not able to use the icon's ligature name - Like so:
 *
 *  <hljs lang="html">
 *    <md-icon md-font-set="fa">fa-bell</md-icon>
 *  </hljs>
 *
 * You should instead use the given unicode, instead of the ligature name.
 *
 * <p ng-hide="true"> ##// Notice we can't use a hljs element here, because the characters will be escaped.</p>
 *  ```html
 *    <md-icon md-font-set="fa">&#xf0f3</md-icon>
 *  ```
 *
 * All unicode ligatures are prefixed with the `&#x` string.
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultFontSet( 'fa' )                   // This sets our default fontset className.
    *          .defaultIconSet('my/app/icons.svg')       // Register a default set of SVG icons
    *          .iconSet('social', 'my/app/social.svg')   // Register a named icon set of SVGs
    *          .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
    *          .icon('work:chair', 'my/app/chair.svg');  // Register icon in a specific set
    *   ***REMOVED***);
 * </hljs>
 *
 * SVG icons and icon sets can be easily pre-loaded and cached using either (a) a build process or (b) a runtime
 * **startup** process (shown below):
 *
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
    *
    *     // Register a default set of SVG icon definitions
    *     $mdIconProvider.defaultIconSet('my/app/icons.svg')
    *
    *   ***REMOVED***)
 *   .run(function($templateRequest)***REMOVED***
    *
    *     // Pre-fetch icons sources by URL and cache in the $templateCache...
    *     // subsequent $templateRequest calls will look there first.
    *
    *     var urls = [ 'imy/app/icons.svg', 'img/icons/android.svg'];
    *
    *     angular.forEach(urls, function(url) ***REMOVED***
    *       $templateRequest(url);
    *     ***REMOVED***);
    *
    *   ***REMOVED***);
 *
 * </hljs>
 *
 * NOTE: the loaded SVG data is subsequently cached internally for future requests.
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#icon
 *
 * @description
 * Register a source URL for a specific icon name; the name may include optional 'icon set' name prefix.
 * These icons  will later be retrieved from the cache using `$mdIcon( <icon name> )`
 *
 * @param ***REMOVED***string***REMOVED*** id Icon name/id used to register the icon
 * @param ***REMOVED***string***REMOVED*** url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param ***REMOVED***number=***REMOVED*** viewBoxSize Sets the width and height the icon's viewBox.
 * It is ignored for icons with an existing viewBox. Default size is 24.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
    *          .icon('work:chair', 'my/app/chair.svg');  // Register icon in a specific set
    *   ***REMOVED***);
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#iconSet
 *
 * @description
 * Register a source URL for a 'named' set of icons; group of SVG definitions where each definition
 * has an icon id. Individual icons can be subsequently retrieved from this cached set using
 * `$mdIcon(<icon set name>:<icon name>)`
 *
 * @param ***REMOVED***string***REMOVED*** id Icon name/id used to register the iconset
 * @param ***REMOVED***string***REMOVED*** url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param ***REMOVED***number=***REMOVED*** viewBoxSize Sets the width and height of the viewBox of all icons in the set.
 * It is ignored for icons with an existing viewBox. All icons in the icon set should be the same size.
 * Default value is 24.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdIconProvider` reference; used to support method call chains for the API
 *
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .iconSet('social', 'my/app/social.svg')   // Register a named icon set
    *   ***REMOVED***);
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#defaultIconSet
 *
 * @description
 * Register a source URL for the default 'named' set of icons. Unless explicitly registered,
 * subsequent lookups of icons will failover to search this 'default' icon set.
 * Icon can be retrieved from this cached, default set using `$mdIcon(<name>)`
 *
 * @param ***REMOVED***string***REMOVED*** url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param ***REMOVED***number=***REMOVED*** viewBoxSize Sets the width and height of the viewBox of all icons in the set.
 * It is ignored for icons with an existing viewBox. All icons in the icon set should be the same size.
 * Default value is 24.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultIconSet( 'my/app/social.svg' )   // Register a default icon set
    *   ***REMOVED***);
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#defaultFontSet
 *
 * @description
 * When using Font-Icons, Angular Material assumes the the Material Design icons will be used and automatically
 * configures the default font-set == 'material-icons'. Note that the font-set references the font-icon library
 * class style that should be applied to the `<md-icon>`.
 *
 * Configuring the default means that the attributes
 * `md-font-set="material-icons"` or `class="material-icons"` do not need to be explicitly declared on the
 * `<md-icon>` markup. For example:
 *
 *  `<md-icon> face </md-icon>`
 *  will render as
 *  `<span class="material-icons"> face </span>`, and
 *
 *  `<md-icon md-font-set="fa"> face </md-icon>`
 *  will render as
 *  `<span class="fa"> face </span>`
 *
 * @param ***REMOVED***string***REMOVED*** name of the font-library style that should be applied to the md-icon DOM element
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
   *     $mdIconProvider.defaultFontSet( 'fa' );
   *   ***REMOVED***);
 * </hljs>
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#fontSet
 *
 * @description
 * When using a font set for `<md-icon>` you must specify the correct font classname in the `md-font-set`
 * attribute. If the fonset className is really long, your markup may become cluttered... an easy
 * solution is to define an `alias` for your fontset:
 *
 * @param ***REMOVED***string***REMOVED*** alias of the specified fontset.
 * @param ***REMOVED***string***REMOVED*** className of the fontset.
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
   *     // In this case, we set an alias for the `material-icons` fontset.
   *     $mdIconProvider.fontSet('md', 'material-icons');
   *   ***REMOVED***);
 * </hljs>
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#defaultViewBoxSize
 *
 * @description
 * While `<md-icon />` markup can also be style with sizing CSS, this method configures
 * the default width **and** height used for all icons; unless overridden by specific CSS.
 * The default sizing is (24px, 24px).
 * @param ***REMOVED***number=***REMOVED*** viewBoxSize Sets the width and height of the viewBox for an icon or an icon set.
 * All icons in a set should be the same size. The default value is 24.
 *
 * @returns ***REMOVED***obj***REMOVED*** an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) ***REMOVED***
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultViewBoxSize(36)   // Register a default icon size (width == height)
    *   ***REMOVED***);
 * </hljs>
 *
 */

var config = ***REMOVED***
  defaultViewBoxSize: 24,
  defaultFontSet: 'material-icons',
  fontSets: []
***REMOVED***;

function MdIconProvider() ***REMOVED***
***REMOVED***

MdIconProvider.prototype = ***REMOVED***
  icon: function(id, url, viewBoxSize) ***REMOVED***
    if (id.indexOf(':') == -1) id = '$default:' + id;

    config[id] = new ConfigurationItem(url, viewBoxSize);
    return this;
  ***REMOVED***,

  iconSet: function(id, url, viewBoxSize) ***REMOVED***
    config[id] = new ConfigurationItem(url, viewBoxSize);
    return this;
  ***REMOVED***,

  defaultIconSet: function(url, viewBoxSize) ***REMOVED***
    var setName = '$default';

    if (!config[setName]) ***REMOVED***
      config[setName] = new ConfigurationItem(url, viewBoxSize);
    ***REMOVED***

    config[setName].viewBoxSize = viewBoxSize || config.defaultViewBoxSize;

    return this;
  ***REMOVED***,

  defaultViewBoxSize: function(viewBoxSize) ***REMOVED***
    config.defaultViewBoxSize = viewBoxSize;
    return this;
  ***REMOVED***,

  /**
   * Register an alias name associated with a font-icon library style ;
   */
  fontSet: function fontSet(alias, className) ***REMOVED***
    config.fontSets.push(***REMOVED***
      alias: alias,
      fontSet: className || alias
    ***REMOVED***);
    return this;
  ***REMOVED***,

  /**
   * Specify a default style name associated with a font-icon library
   * fallback to Material Icons.
   *
   */
  defaultFontSet: function defaultFontSet(className) ***REMOVED***
    config.defaultFontSet = !className ? '' : className;
    return this;
  ***REMOVED***,

  defaultIconSize: function defaultIconSize(iconSize) ***REMOVED***
    config.defaultIconSize = iconSize;
    return this;
  ***REMOVED***,

  $get: ['$templateRequest', '$q', '$log', '$templateCache', '$mdUtil', '$sce', function($templateRequest, $q, $log, $templateCache, $mdUtil, $sce) ***REMOVED***
    return MdIconService(config, $templateRequest, $q, $log, $mdUtil, $sce);
  ***REMOVED***]
***REMOVED***;

/**
 *  Configuration item stored in the Icon registry; used for lookups
 *  to load if not already cached in the `loaded` cache
 */
function ConfigurationItem(url, viewBoxSize) ***REMOVED***
  this.url = url;
  this.viewBoxSize = viewBoxSize || config.defaultViewBoxSize;
***REMOVED***

/**
 * @ngdoc service
 * @name $mdIcon
 * @module material.components.icon
 *
 * @description
 * The `$mdIcon` service is a function used to lookup SVG icons.
 *
 * @param ***REMOVED***string***REMOVED*** id Query value for a unique Id or URL. If the argument is a URL, then the service will retrieve the icon element
 * from its internal cache or load the icon and cache it first. If the value is not a URL-type string, then an ID lookup is
 * performed. The Id may be a unique icon ID or may include an iconSet ID prefix.
 *
 * For the **id** query to work properly, this means that all id-to-URL mappings must have been previously configured
 * using the `$mdIconProvider`.
 *
 * @returns ***REMOVED***angular.$q.Promise***REMOVED*** A promise that gets resolved to a clone of the initial SVG DOM element; which was
 * created from the SVG markup in the SVG data file. If an error occurs (e.g. the icon cannot be found) the promise
 * will get rejected. 
 *
 * @usage
 * <hljs lang="js">
 * function SomeDirective($mdIcon) ***REMOVED***
  *
  *   // See if the icon has already been loaded, if not
  *   // then lookup the icon from the registry cache, load and cache
  *   // it for future requests.
  *   // NOTE: ID queries require configuration with $mdIconProvider
  *
  *   $mdIcon('android').then(function(iconEl)    ***REMOVED*** element.append(iconEl); ***REMOVED***);
  *   $mdIcon('work:chair').then(function(iconEl) ***REMOVED*** element.append(iconEl); ***REMOVED***);
  *
  *   // Load and cache the external SVG using a URL
  *
  *   $mdIcon('img/icons/android.svg').then(function(iconEl) ***REMOVED***
  *     element.append(iconEl);
  *   ***REMOVED***);
  * ***REMOVED***;
 * </hljs>
 *
 * NOTE: The `<md-icon />  ` directive internally uses the `$mdIcon` service to query, loaded, and instantiate
 * SVG DOM elements.
 */

/* ngInject */
function MdIconService(config, $templateRequest, $q, $log, $mdUtil, $sce) ***REMOVED***
  var iconCache = ***REMOVED******REMOVED***;
  var urlRegex = /[-\w@:%\+.~#?&//=]***REMOVED***2,***REMOVED***\.[a-z]***REMOVED***2,4***REMOVED***\b(\/[-\w@:%\+.~#?&//=]*)?/i;
  var dataUrlRegex = /^data:image\/svg\+xml[\s*;\w\-\=]*?(base64)?,(.*)$/i;

  Icon.prototype = ***REMOVED***clone: cloneSVG, prepare: prepareAndStyle***REMOVED***;
  getIcon.fontSet = findRegisteredFontSet;

  // Publish service...
  return getIcon;

  /**
   * Actual $mdIcon service is essentially a lookup function
   */
  function getIcon(id) ***REMOVED***
    id = id || '';

    // If the "id" provided is not a string, the only other valid value is a $sce trust wrapper
    // over a URL string. If the value is not trusted, this will intentionally throw an error
    // because the user is attempted to use an unsafe URL, potentially opening themselves up
    // to an XSS attack.
    if (!angular.isString(id)) ***REMOVED***
      id = $sce.getTrustedUrl(id);
    ***REMOVED***

    // If already loaded and cached, use a clone of the cached icon.
    // Otherwise either load by URL, or lookup in the registry and then load by URL, and cache.

    if (iconCache[id]) ***REMOVED***
      return $q.when(transformClone(iconCache[id]));
    ***REMOVED***

    if (urlRegex.test(id) || dataUrlRegex.test(id)) ***REMOVED***
      return loadByURL(id).then(cacheIcon(id));
    ***REMOVED***

    if (id.indexOf(':') == -1) ***REMOVED***
      id = '$default:' + id;
    ***REMOVED***

    var load = config[id] ? loadByID : loadFromIconSet;
    return load(id)
      .then(cacheIcon(id));
  ***REMOVED***

  /**
   * Lookup registered fontSet style using its alias...
   * If not found,
   */
  function findRegisteredFontSet(alias) ***REMOVED***
    var useDefault = angular.isUndefined(alias) || !(alias && alias.length);
    if (useDefault) return config.defaultFontSet;

    var result = alias;
    angular.forEach(config.fontSets, function(it) ***REMOVED***
      if (it.alias == alias) result = it.fontSet || result;
    ***REMOVED***);

    return result;
  ***REMOVED***

  function transformClone(cacheElement) ***REMOVED***
    var clone = cacheElement.clone();
    var cacheSuffix = '_cache' + $mdUtil.nextUid();

    // We need to modify for each cached icon the id attributes.
    // This is needed because SVG id's are treated as normal DOM ids
    // and should not have a duplicated id.
    if (clone.id) clone.id += cacheSuffix;
    angular.forEach(clone.querySelectorAll('[id]'), function(item) ***REMOVED***
      item.id += cacheSuffix;
    ***REMOVED***);

    return clone;
  ***REMOVED***

  /**
   * Prepare and cache the loaded icon for the specified `id`
   */
  function cacheIcon(id) ***REMOVED***

    return function updateCache(icon) ***REMOVED***
      iconCache[id] = isIcon(icon) ? icon : new Icon(icon, config[id]);

      return iconCache[id].clone();
    ***REMOVED***;
  ***REMOVED***

  /**
   * Lookup the configuration in the registry, if !registered throw an error
   * otherwise load the icon [on-demand] using the registered URL.
   *
   */
  function loadByID(id) ***REMOVED***
    var iconConfig = config[id];
    return loadByURL(iconConfig.url).then(function(icon) ***REMOVED***
      return new Icon(icon, iconConfig);
    ***REMOVED***);
  ***REMOVED***

  /**
   *    Loads the file as XML and uses querySelector( <id> ) to find
   *    the desired node...
   */
  function loadFromIconSet(id) ***REMOVED***
    var setName = id.substring(0, id.lastIndexOf(':')) || '$default';
    var iconSetConfig = config[setName];

    return !iconSetConfig ? announceIdNotFound(id) : loadByURL(iconSetConfig.url).then(extractFromSet);

    function extractFromSet(set) ***REMOVED***
      var iconName = id.slice(id.lastIndexOf(':') + 1);
      var icon = set.querySelector('#' + iconName);
      return !icon ? announceIdNotFound(id) : new Icon(icon, iconSetConfig);
    ***REMOVED***

    function announceIdNotFound(id) ***REMOVED***
      var msg = 'icon ' + id + ' not found';
      $log.warn(msg);

      return $q.reject(msg || id);
    ***REMOVED***
  ***REMOVED***

  /**
   * Load the icon by URL (may use the $templateCache).
   * Extract the data for later conversion to Icon
   */
  function loadByURL(url) ***REMOVED***
    /* Load the icon from embedded data URL. */
    function loadByDataUrl(url) ***REMOVED***
      var results = dataUrlRegex.exec(url);
      var isBase64 = /base64/i.test(url);
      var data = isBase64 ? window.atob(results[2]) : results[2];

      return $q.when(angular.element(data)[0]);
    ***REMOVED***

    /* Load the icon by URL using HTTP. */
    function loadByHttpUrl(url) ***REMOVED***
      return $q(function(resolve, reject) ***REMOVED***
        // Catch HTTP or generic errors not related to incorrect icon IDs.
        var announceAndReject = function(err) ***REMOVED***
            var msg = angular.isString(err) ? err : (err.message || err.data || err.statusText);
            $log.warn(msg);
            reject(err);
          ***REMOVED***,
          extractSvg = function(response) ***REMOVED***
            var svg = angular.element('<div>').append(response).find('svg')[0];
            resolve(svg);
          ***REMOVED***;

        $templateRequest(url, true).then(extractSvg, announceAndReject);
      ***REMOVED***);
    ***REMOVED***

    return dataUrlRegex.test(url)
      ? loadByDataUrl(url)
      : loadByHttpUrl(url);
  ***REMOVED***

  /**
   * Check target signature to see if it is an Icon instance.
   */
  function isIcon(target) ***REMOVED***
    return angular.isDefined(target.element) && angular.isDefined(target.config);
  ***REMOVED***

  /**
   *  Define the Icon class
   */
  function Icon(el, config) ***REMOVED***
    if (el && el.tagName != 'svg') ***REMOVED***
      el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').append(el)[0];
    ***REMOVED***

    // Inject the namespace if not available...
    if (!el.getAttribute('xmlns')) ***REMOVED***
      el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    ***REMOVED***

    this.element = el;
    this.config = config;
    this.prepare();
  ***REMOVED***

  /**
   *  Prepare the DOM element that will be cached in the
   *  loaded iconCache store.
   */
  function prepareAndStyle() ***REMOVED***
    var viewBoxSize = this.config ? this.config.viewBoxSize : config.defaultViewBoxSize;
    angular.forEach(***REMOVED***
      'fit': '',
      'height': '100%',
      'width': '100%',
      'preserveAspectRatio': 'xMidYMid meet',
      'viewBox': this.element.getAttribute('viewBox') || ('0 0 ' + viewBoxSize + ' ' + viewBoxSize),
      'focusable': false // Disable IE11s default behavior to make SVGs focusable
    ***REMOVED***, function(val, attr) ***REMOVED***
      this.element.setAttribute(attr, val);
    ***REMOVED***, this);
  ***REMOVED***

  /**
   * Clone the Icon DOM element.
   */
  function cloneSVG() ***REMOVED***
    // If the element or any of its children have a style attribute, then a CSP policy without
    // 'unsafe-inline' in the style-src directive, will result in a violation.
    return this.element.cloneNode(true);
  ***REMOVED***

***REMOVED***
MdIconService.$inject = ["config", "$templateRequest", "$q", "$log", "$mdUtil", "$sce"];

ng.material.components.icon = angular.module("material.components.icon");
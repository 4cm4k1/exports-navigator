/**
 *
 * Angular-Material-Mocks
 *
 * Developers interested in running their own custom unit tests WITH angular-material.js loaded...
 * must also include this *mocks* file. Similar to `angular-mocks.js`, `angular-material-mocks.js`
 * will override and disable specific Angular Material performance settings:
 *
 *  - Disabled Theme CSS rule generations
 *  - Forces $mdAria.expectWithText() to be synchronous
 *  - Mocks $$rAF.throttle()
 *  - Captures flush exceptions from $$rAF
 *
 */
(function(window, angular, undefined) ***REMOVED***

'use strict';

/**
 * @ngdoc module
 * @name ngMaterial-mock
 * @packageName angular-material-mocks
 *
 * @description
 *
 * The `ngMaterial-mock` module provides support
 *
 */
angular.module('ngMaterial-mock', [
  'ngMock',
  'ngAnimateMock',
  'material.core'
  ])
  .config(['$provide', function($provide) ***REMOVED***

    $provide.factory('$material', ['$animate', '$timeout', function($animate, $timeout) ***REMOVED***
      return ***REMOVED***
        flushOutstandingAnimations: function() ***REMOVED***
          // this code is placed in a try-catch statement
          // since 1.3 and 1.4 handle their animations differently
          // and there may be situations where follow-up animations
          // are run in one version and not the other
          try ***REMOVED*** $animate.flush(); ***REMOVED*** catch(e) ***REMOVED******REMOVED***
        ***REMOVED***,
        flushInterimElement: function() ***REMOVED***
          this.flushOutstandingAnimations();
          $timeout.flush();
          this.flushOutstandingAnimations();
          $timeout.flush();
          this.flushOutstandingAnimations();
          $timeout.flush();
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***]);

    /**
      * Angular Material dynamically generates Style tags
      * based on themes and palletes; for each ng-app.
      *
      * For testing, we want to disable generation and
      * <style> DOM injections. So we clear the huge THEME
      * styles while testing...
      */
     $provide.constant('$MD_THEME_CSS', '/**/');

    /**
     * Add throttle() and wrap .flush() to catch `no callbacks present`
     * errors
     */
    $provide.decorator('$$rAF', function throttleInjector($delegate)***REMOVED***

      $delegate.throttle = function(cb) ***REMOVED***
        return function() ***REMOVED***
          cb.apply(this, arguments);
        ***REMOVED***;
      ***REMOVED***;

      var ngFlush = $delegate.flush;
      $delegate.flush = function() ***REMOVED***
        try      ***REMOVED*** ngFlush();  ***REMOVED***
        catch(e) ***REMOVED*** ;           ***REMOVED***
      ***REMOVED***;

      return $delegate;
    ***REMOVED***);

    /**
     * Capture $timeout.flush() errors: "No deferred tasks to be flushed"
     * errors
     */
    $provide.decorator('$timeout', function throttleInjector($delegate)***REMOVED***

      var ngFlush = $delegate.flush;
      $delegate.flush = function() ***REMOVED***
          var args = Array.prototype.slice.call(arguments);
          try      ***REMOVED*** ngFlush.apply($delegate, args);  ***REMOVED***
          catch(e) ***REMOVED*** ***REMOVED***
      ***REMOVED***;

      return $delegate;
    ***REMOVED***);

  ***REMOVED***]);

  /**
   * Stylesheet Mocks used by `animateCss.spec.js`
   */
  window.createMockStyleSheet = function createMockStyleSheet(doc, wind) ***REMOVED***
    doc = doc ? doc[0] : window.document;
    wind = wind || window;

    var node = doc.createElement('style');
    var head = doc.getElementsByTagName('head')[0];
    head.appendChild(node);

    var ss = doc.styleSheets[doc.styleSheets.length - 1];

    return ***REMOVED***
      addRule: function(selector, styles) ***REMOVED***
        styles = addVendorPrefix(styles);

        try ***REMOVED***
          ss.insertRule(selector + '***REMOVED*** ' + styles + '***REMOVED***', 0);
        ***REMOVED***
        catch (e) ***REMOVED***
          try ***REMOVED***
            ss.addRule(selector, styles);
          ***REMOVED***
          catch (e2) ***REMOVED******REMOVED***
        ***REMOVED***
      ***REMOVED***,

      destroy: function() ***REMOVED***
        head.removeChild(node);
      ***REMOVED***
    ***REMOVED***;

    /**
     * Decompose styles, attached specific vendor prefixes
     * and recompose...
     * e.g.
     *    'transition:0.5s linear all; font-size:100px;'
     * becomes
     *    '-webkit-transition:0.5s linear all; transition:0.5s linear all; font-size:100px;'
     */
    function addVendorPrefix(styles) ***REMOVED***
      var cache = ***REMOVED*** ***REMOVED***;

      // Decompose into cache registry
      styles
        .match(/([\-A-Za-z]*)\w\:\w*([A-Za-z0-9\.\-\s]*)/gi)
        .forEach(function(style)***REMOVED***
          var pair = style.split(":");
          var key = pair[0];

          switch(key) ***REMOVED***
            case 'transition':
            case 'transform':
            case 'animation':
            case 'transition-duration':
            case 'animation-duration':
              cache[key] = cache['-webkit-' + key] = pair[1];
              break;
            default:
              cache[key] = pair[1];
          ***REMOVED***
        ***REMOVED***);

        // Recompose full style object (as string)
        styles = "";
        angular.forEach(cache, function(value, key) ***REMOVED***
          styles = styles + key + ":" + value + "; ";
        ***REMOVED***);

        return styles;
    ***REMOVED***

  ***REMOVED***;

***REMOVED***)(window, window.angular);

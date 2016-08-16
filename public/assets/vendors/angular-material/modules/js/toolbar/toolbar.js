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
 * @name material.components.toolbar
 */
angular.module('material.components.toolbar', [
  'material.core',
  'material.components.content'
])
  .directive('mdToolbar', mdToolbarDirective);

/**
 * @ngdoc directive
 * @name mdToolbar
 * @module material.components.toolbar
 * @restrict E
 * @description
 * `md-toolbar` is used to place a toolbar in your app.
 *
 * Toolbars are usually used above a content area to display the title of the
 * current page, and show relevant action buttons for that page.
 *
 * You can change the height of the toolbar by adding either the
 * `md-medium-tall` or `md-tall` class to the toolbar.
 *
 * @usage
 * <hljs lang="html">
 * <div layout="column" layout-fill>
 *   <md-toolbar>
 *
 *     <div class="md-toolbar-tools">
 *       <span>My App's Title</span>
 *
 *       <!-- fill up the space between left and right area -->
 *       <span flex></span>
 *
 *       <md-button>
 *         Right Bar Button
 *       </md-button>
 *     </div>
 *
 *   </md-toolbar>
 *   <md-content>
 *     Hello!
 *   </md-content>
 * </div>
 * </hljs>
 *
 * @param ***REMOVED***boolean=***REMOVED*** md-scroll-shrink Whether the header should shrink away as
 * the user scrolls down, and reveal itself as the user scrolls up.
 *
 * _**Note (1):** for scrollShrink to work, the toolbar must be a sibling of a
 * `md-content` element, placed before it. See the scroll shrink demo._
 *
 * _**Note (2):** The `md-scroll-shrink` attribute is only parsed on component
 * initialization, it does not watch for scope changes._
 *
 *
 * @param ***REMOVED***number=***REMOVED*** md-shrink-speed-factor How much to change the speed of the toolbar's
 * shrinking by. For example, if 0.25 is given then the toolbar will shrink
 * at one fourth the rate at which the user scrolls down. Default 0.5.
 */

function mdToolbarDirective($$rAF, $mdConstant, $mdUtil, $mdTheming, $animate) ***REMOVED***
  var translateY = angular.bind(null, $mdUtil.supplant, 'translate3d(0,***REMOVED***0***REMOVED***px,0)');

  return ***REMOVED***
    template: '',
    restrict: 'E',

    link: function(scope, element, attr) ***REMOVED***

      element.addClass('_md');     // private md component indicator for styling
      $mdTheming(element);

      if (angular.isDefined(attr.mdScrollShrink)) ***REMOVED***
        setupScrollShrink();
      ***REMOVED***

      function setupScrollShrink() ***REMOVED***

        var toolbarHeight;
        var contentElement;
        var disableScrollShrink = angular.noop;

        // Current "y" position of scroll
        // Store the last scroll top position
        var y = 0;
        var prevScrollTop = 0;
        var shrinkSpeedFactor = attr.mdShrinkSpeedFactor || 0.5;

        var debouncedContentScroll = $$rAF.throttle(onContentScroll);
        var debouncedUpdateHeight = $mdUtil.debounce(updateToolbarHeight, 5 * 1000);

        // Wait for $mdContentLoaded event from mdContent directive.
        // If the mdContent element is a sibling of our toolbar, hook it up
        // to scroll events.

        scope.$on('$mdContentLoaded', onMdContentLoad);

        // If the toolbar is used inside an ng-if statement, we may miss the
        // $mdContentLoaded event, so we attempt to fake it if we have a
        // md-content close enough.

        attr.$observe('mdScrollShrink', onChangeScrollShrink);

        // If the toolbar has ngShow or ngHide we need to update height immediately as it changed
        // and not wait for $mdUtil.debounce to happen

        if (attr.ngShow) ***REMOVED*** scope.$watch(attr.ngShow, updateToolbarHeight); ***REMOVED***
        if (attr.ngHide) ***REMOVED*** scope.$watch(attr.ngHide, updateToolbarHeight); ***REMOVED***

        // If the scope is destroyed (which could happen with ng-if), make sure
        // to disable scroll shrinking again

        scope.$on('$destroy', disableScrollShrink);

        /**
         *
         */
        function onChangeScrollShrink(shrinkWithScroll) ***REMOVED***
          var closestContent = element.parent().find('md-content');

          // If we have a content element, fake the call; this might still fail
          // if the content element isn't a sibling of the toolbar

          if (!contentElement && closestContent.length) ***REMOVED***
            onMdContentLoad(null, closestContent);
          ***REMOVED***

          // Evaluate the expression
          shrinkWithScroll = scope.$eval(shrinkWithScroll);

          // Disable only if the attribute's expression evaluates to false
          if (shrinkWithScroll === false) ***REMOVED***
            disableScrollShrink();
          ***REMOVED*** else ***REMOVED***
            disableScrollShrink = enableScrollShrink();
          ***REMOVED***
        ***REMOVED***

        /**
         *
         */
        function onMdContentLoad($event, newContentEl) ***REMOVED***
          // Toolbar and content must be siblings
          if (newContentEl && element.parent()[0] === newContentEl.parent()[0]) ***REMOVED***
            // unhook old content event listener if exists
            if (contentElement) ***REMOVED***
              contentElement.off('scroll', debouncedContentScroll);
            ***REMOVED***

            contentElement = newContentEl;
            disableScrollShrink = enableScrollShrink();
          ***REMOVED***
        ***REMOVED***

        /**
         *
         */
        function onContentScroll(e) ***REMOVED***
          var scrollTop = e ? e.target.scrollTop : prevScrollTop;

          debouncedUpdateHeight();

          y = Math.min(
            toolbarHeight / shrinkSpeedFactor,
            Math.max(0, y + scrollTop - prevScrollTop)
          );

          element.css($mdConstant.CSS.TRANSFORM, translateY([-y * shrinkSpeedFactor]));
          contentElement.css($mdConstant.CSS.TRANSFORM, translateY([(toolbarHeight - y) * shrinkSpeedFactor]));

          prevScrollTop = scrollTop;

          $mdUtil.nextTick(function() ***REMOVED***
            var hasWhiteFrame = element.hasClass('md-whiteframe-z1');

            if (hasWhiteFrame && !y) ***REMOVED***
              $animate.removeClass(element, 'md-whiteframe-z1');
            ***REMOVED*** else if (!hasWhiteFrame && y) ***REMOVED***
              $animate.addClass(element, 'md-whiteframe-z1');
            ***REMOVED***
          ***REMOVED***);

        ***REMOVED***

        /**
         *
         */
        function enableScrollShrink() ***REMOVED***
          if (!contentElement)     return angular.noop;           // no md-content

          contentElement.on('scroll', debouncedContentScroll);
          contentElement.attr('scroll-shrink', 'true');

          $mdUtil.nextTick(updateToolbarHeight, false);

          return function disableScrollShrink() ***REMOVED***
            contentElement.off('scroll', debouncedContentScroll);
            contentElement.attr('scroll-shrink', 'false');

            updateToolbarHeight();
          ***REMOVED***;
        ***REMOVED***

        /**
         *
         */
        function updateToolbarHeight() ***REMOVED***
          toolbarHeight = element.prop('offsetHeight');
          // Add a negative margin-top the size of the toolbar to the content el.
          // The content will start transformed down the toolbarHeight amount,
          // so everything looks normal.
          //
          // As the user scrolls down, the content will be transformed up slowly
          // to put the content underneath where the toolbar was.
          var margin = (-toolbarHeight * shrinkSpeedFactor) + 'px';

          contentElement.css(***REMOVED***
            "margin-top": margin,
            "margin-bottom": margin
          ***REMOVED***);

          onContentScroll();
        ***REMOVED***

      ***REMOVED***

    ***REMOVED***
  ***REMOVED***;

***REMOVED***
mdToolbarDirective.$inject = ["$$rAF", "$mdConstant", "$mdUtil", "$mdTheming", "$animate"];

***REMOVED***)(window, window.angular);
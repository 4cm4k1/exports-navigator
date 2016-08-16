/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5
 */
goog.provide('ng.material.components.list');
goog.require('ng.material.core');
/**
 * @ngdoc module
 * @name material.components.list
 * @description
 * List module
 */
angular.module('material.components.list', [
  'material.core'
])
  .controller('MdListController', MdListController)
  .directive('mdList', mdListDirective)
  .directive('mdListItem', mdListItemDirective);

/**
 * @ngdoc directive
 * @name mdList
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * The `<md-list>` directive is a list container for 1..n `<md-list-item>` tags.
 *
 * @usage
 * <hljs lang="html">
 * <md-list>
 *   <md-list-item class="md-2-line" ng-repeat="item in todos">
 *     <md-checkbox ng-model="item.done"></md-checkbox>
 *     <div class="md-list-item-text">
 *       <h3>***REMOVED******REMOVED***item.title***REMOVED******REMOVED***</h3>
 *       <p>***REMOVED******REMOVED***item.description***REMOVED******REMOVED***</p>
 *     </div>
 *   </md-list-item>
 * </md-list>
 * </hljs>
 */

function mdListDirective($mdTheming) ***REMOVED***
  return ***REMOVED***
    restrict: 'E',
    compile: function(tEl) ***REMOVED***
      tEl[0].setAttribute('role', 'list');
      return $mdTheming;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
mdListDirective.$inject = ["$mdTheming"];
/**
 * @ngdoc directive
 * @name mdListItem
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * The `<md-list-item>` directive is a container intended for row items in a `<md-list>` container.
 * The `md-2-line` and `md-3-line` classes can be added to a `<md-list-item>`
 * to increase the height with 22px and 40px respectively.
 *
 * ## CSS
 * `.md-avatar` - class for image avatars
 *
 * `.md-avatar-icon` - class for icon avatars
 *
 * `.md-offset` - on content without an avatar
 *
 * @usage
 * <hljs lang="html">
 *  <md-list>
 *    <md-list-item>
 *      <img class="md-avatar" ng-src="path/to/img"/>
 *      <span>Item content in list</span>
 *    </md-list-item>
 *    <md-list-item>
 *      <md-icon class="md-avatar-icon" md-svg-icon="communication:phone"></md-icon>
 *      <span>Item content in list</span>
 *    </md-list-item>
 *  </md-list>
 * </hljs>
 *
 * _**Note:** We automatically apply special styling when the inner contents are wrapped inside
 * of a `<md-button>` tag. This styling is automatically ignored for `class="md-secondary"` buttons
 * and you can include a class of `class="md-exclude"` if you need to use a non-secondary button
 * that is inside the list, but does not wrap the contents._
 */
function mdListItemDirective($mdAria, $mdConstant, $mdUtil, $timeout) ***REMOVED***
  var proxiedTypes = ['md-checkbox', 'md-switch'];
  return ***REMOVED***
    restrict: 'E',
    controller: 'MdListController',
    compile: function(tEl, tAttrs) ***REMOVED***

      // Check for proxy controls (no ng-click on parent, and a control inside)
      var secondaryItems = tEl[0].querySelectorAll('.md-secondary');
      var hasProxiedElement;
      var proxyElement;
      var itemContainer = tEl;

      tEl[0].setAttribute('role', 'listitem');

      if (tAttrs.ngClick || tAttrs.ngDblclick ||  tAttrs.ngHref || tAttrs.href || tAttrs.uiSref || tAttrs.ngAttrUiSref) ***REMOVED***
        wrapIn('button');
      ***REMOVED*** else ***REMOVED***
        for (var i = 0, type; type = proxiedTypes[i]; ++i) ***REMOVED***
          if (proxyElement = tEl[0].querySelector(type)) ***REMOVED***
            hasProxiedElement = true;
            break;
          ***REMOVED***
        ***REMOVED***
        if (hasProxiedElement) ***REMOVED***
          wrapIn('div');
        ***REMOVED*** else if (!tEl[0].querySelector('md-button:not(.md-secondary):not(.md-exclude)')) ***REMOVED***
          tEl.addClass('_md-no-proxy');
        ***REMOVED***
      ***REMOVED***
      wrapSecondaryItems();
      setupToggleAria();


      function setupToggleAria() ***REMOVED***
        var toggleTypes = ['md-switch', 'md-checkbox'];
        var toggle;

        for (var i = 0, toggleType; toggleType = toggleTypes[i]; ++i) ***REMOVED***
          if (toggle = tEl.find(toggleType)[0]) ***REMOVED***
            if (!toggle.hasAttribute('aria-label')) ***REMOVED***
              var p = tEl.find('p')[0];
              if (!p) return;
              toggle.setAttribute('aria-label', 'Toggle ' + p.textContent);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

      function wrapIn(type) ***REMOVED***
        if (type == 'div') ***REMOVED***
          itemContainer = angular.element('<div class="_md-no-style _md-list-item-inner">');
          itemContainer.append(tEl.contents());
          tEl.addClass('_md-proxy-focus');
        ***REMOVED*** else ***REMOVED***
          // Element which holds the default list-item content.
          itemContainer = angular.element(
            '<div class="md-button _md-no-style">'+
            '   <div class="_md-list-item-inner"></div>'+
            '</div>'
          );

          // Button which shows ripple and executes primary action.
          var buttonWrap = angular.element(
            '<md-button class="_md-no-style"></md-button>'
          );

          buttonWrap[0].setAttribute('aria-label', tEl[0].textContent);
          copyAttributes(tEl[0], buttonWrap[0]);

          // Append the button wrap before our list-item content, because it will overlay in relative.
          itemContainer.prepend(buttonWrap);
          itemContainer.children().eq(1).append(tEl.contents());
          
          tEl.addClass('_md-button-wrap');
        ***REMOVED***

        tEl[0].setAttribute('tabindex', '-1');
        tEl.append(itemContainer);
      ***REMOVED***

      function wrapSecondaryItems() ***REMOVED***
        var secondaryItemsWrapper = angular.element('<div class="_md-secondary-container">');

        angular.forEach(secondaryItems, function(secondaryItem) ***REMOVED***
          wrapSecondaryItem(secondaryItem, secondaryItemsWrapper);
        ***REMOVED***);

        itemContainer.append(secondaryItemsWrapper);
      ***REMOVED***

      function wrapSecondaryItem(secondaryItem, container) ***REMOVED***
        if (secondaryItem && !isButton(secondaryItem) && secondaryItem.hasAttribute('ng-click')) ***REMOVED***
          $mdAria.expect(secondaryItem, 'aria-label');
          var buttonWrapper = angular.element('<md-button class="md-secondary md-icon-button">');
          copyAttributes(secondaryItem, buttonWrapper[0]);
          secondaryItem.setAttribute('tabindex', '-1');
          buttonWrapper.append(secondaryItem);
          secondaryItem = buttonWrapper[0];
        ***REMOVED***

        if (secondaryItem && (!hasClickEvent(secondaryItem) || (!tAttrs.ngClick && isProxiedElement(secondaryItem)))) ***REMOVED***
          // In this case we remove the secondary class, so we can identify it later, when we searching for the
          // proxy items.
          angular.element(secondaryItem).removeClass('md-secondary');
        ***REMOVED***

        tEl.addClass('md-with-secondary');
        container.append(secondaryItem);
      ***REMOVED***

      function copyAttributes(item, wrapper) ***REMOVED***
        var copiedAttrs = $mdUtil.prefixer([
          'ng-if', 'ng-click', 'ng-dblclick', 'aria-label', 'ng-disabled', 'ui-sref',
          'href', 'ng-href', 'target', 'ng-attr-ui-sref', 'ui-sref-opts'
        ]);

        angular.forEach(copiedAttrs, function(attr) ***REMOVED***
          if (item.hasAttribute(attr)) ***REMOVED***
            wrapper.setAttribute(attr, item.getAttribute(attr));
            item.removeAttribute(attr);
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***

      function isProxiedElement(el) ***REMOVED***
        return proxiedTypes.indexOf(el.nodeName.toLowerCase()) != -1;
      ***REMOVED***

      function isButton(el) ***REMOVED***
        var nodeName = el.nodeName.toUpperCase();

        return nodeName == "MD-BUTTON" || nodeName == "BUTTON";
      ***REMOVED***

      function hasClickEvent (element) ***REMOVED***
        var attr = element.attributes;
        for (var i = 0; i < attr.length; i++) ***REMOVED***
          if (tAttrs.$normalize(attr[i].name) === 'ngClick') return true;
        ***REMOVED***
        return false;
      ***REMOVED***

      return postLink;

      function postLink($scope, $element, $attr, ctrl) ***REMOVED***
        $element.addClass('_md');     // private md component indicator for styling
        
        var proxies       = [],
            firstElement  = $element[0].firstElementChild,
            isButtonWrap  = $element.hasClass('_md-button-wrap'),
            clickChild    = isButtonWrap ? firstElement.firstElementChild : firstElement,
            hasClick      = clickChild && hasClickEvent(clickChild);

        computeProxies();
        computeClickable();

        if ($element.hasClass('_md-proxy-focus') && proxies.length) ***REMOVED***
          angular.forEach(proxies, function(proxy) ***REMOVED***
            proxy = angular.element(proxy);

            $scope.mouseActive = false;
            proxy.on('mousedown', function() ***REMOVED***
              $scope.mouseActive = true;
              $timeout(function()***REMOVED***
                $scope.mouseActive = false;
              ***REMOVED***, 100);
            ***REMOVED***)
            .on('focus', function() ***REMOVED***
              if ($scope.mouseActive === false) ***REMOVED*** $element.addClass('md-focused'); ***REMOVED***
              proxy.on('blur', function proxyOnBlur() ***REMOVED***
                $element.removeClass('md-focused');
                proxy.off('blur', proxyOnBlur);
              ***REMOVED***);
            ***REMOVED***);
          ***REMOVED***);
        ***REMOVED***


        function computeProxies() ***REMOVED***
          if (firstElement && firstElement.children && !hasClick) ***REMOVED***

            angular.forEach(proxiedTypes, function(type) ***REMOVED***

              // All elements which are not capable for being used a proxy have the .md-secondary class
              // applied. These items had been sorted out in the secondary wrap function.
              angular.forEach(firstElement.querySelectorAll(type + ':not(.md-secondary)'), function(child) ***REMOVED***
                proxies.push(child);
              ***REMOVED***);
            ***REMOVED***);

          ***REMOVED***
        ***REMOVED***
        function computeClickable() ***REMOVED***
          if (proxies.length == 1 || hasClick) ***REMOVED***
            $element.addClass('md-clickable');

            if (!hasClick) ***REMOVED***
              ctrl.attachRipple($scope, angular.element($element[0].querySelector('._md-no-style')));
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

        var clickChildKeypressListener = function(e) ***REMOVED***
          if (e.target.nodeName != 'INPUT' && e.target.nodeName != 'TEXTAREA' && !e.target.isContentEditable) ***REMOVED***
            var keyCode = e.which || e.keyCode;
            if (keyCode == $mdConstant.KEY_CODE.SPACE) ***REMOVED***
              if (clickChild) ***REMOVED***
                clickChild.click();
                e.preventDefault();
                e.stopPropagation();
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***;

        if (!hasClick && !proxies.length) ***REMOVED***
          clickChild && clickChild.addEventListener('keypress', clickChildKeypressListener);
        ***REMOVED***

        $element.off('click');
        $element.off('keypress');

        if (proxies.length == 1 && clickChild) ***REMOVED***
          $element.children().eq(0).on('click', function(e) ***REMOVED***
            var parentButton = $mdUtil.getClosest(e.target, 'BUTTON');
            if (!parentButton && clickChild.contains(e.target)) ***REMOVED***
              angular.forEach(proxies, function(proxy) ***REMOVED***
                if (e.target !== proxy && !proxy.contains(e.target)) ***REMOVED***
                  angular.element(proxy).triggerHandler('click');
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED***

        $scope.$on('$destroy', function () ***REMOVED***
          clickChild && clickChild.removeEventListener('keypress', clickChildKeypressListener);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
mdListItemDirective.$inject = ["$mdAria", "$mdConstant", "$mdUtil", "$timeout"];

/*
 * @private
 * @ngdoc controller
 * @name MdListController
 * @module material.components.list
 *
 */
function MdListController($scope, $element, $mdListInkRipple) ***REMOVED***
  var ctrl = this;
  ctrl.attachRipple = attachRipple;

  function attachRipple (scope, element) ***REMOVED***
    var options = ***REMOVED******REMOVED***;
    $mdListInkRipple.attach(scope, element, options);
  ***REMOVED***
***REMOVED***
MdListController.$inject = ["$scope", "$element", "$mdListInkRipple"];

ng.material.components.list = angular.module("material.components.list");
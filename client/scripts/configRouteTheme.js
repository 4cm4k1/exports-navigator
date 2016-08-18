(function() ***REMOVED***
    'use strict';

    angular.module('exportsNavigator').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRouteTheme]);

    function configRouteTheme($routeProvider, $locationProvider, $mdThemingProvider) ***REMOVED***
        //  Route config (with authentication checks)
        $routeProvider
        .when('/', ***REMOVED***
            controller: 'HomeCtrl as home',
            templateUrl: 'views/home.html'
        ***REMOVED***)
        // .when('/admin', ***REMOVED***
        //   controller: 'AdminHomeController as admin',
        //   templateUrl: 'views/adminHome.html',
        //   resolve: ***REMOVED***
        //     //  This will require the user is logged in
        //     //  and pass the current session info to the controller
        //     'currentAuth': ['Auth', function(Auth)***REMOVED***
        //       return Auth.$requireSignIn();
        //     ***REMOVED***]
        //   ***REMOVED***
        // ***REMOVED***)
        .otherwise(***REMOVED***
          controller: 'HomeCtrl as home',
          templateUrl: 'views/home.html'
        ***REMOVED***);

        //  $locationProvider config
        $locationProvider.html5Mode(true);

        //  Angular Material theme config
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('light-green')
            .warnPalette('deep-orange');
    ***REMOVED***
***REMOVED***)();

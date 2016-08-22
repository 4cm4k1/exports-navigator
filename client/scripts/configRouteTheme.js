(function() ***REMOVED***
    'use strict';

    angular.module('exportsNavigator').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRouteTheme]);

    function configRouteTheme($routeProvider, $locationProvider, $mdThemingProvider) ***REMOVED***
        //  Route config (with authentication checks)
        $routeProvider

        //  public landing view
        .when('/', ***REMOVED***
            controller: 'LandingCtrl as landing',
            templateUrl: 'views/landing.html'
        ***REMOVED***)

        //  results view with $routeParams
        .when('/results/:category/:searchTerm', ***REMOVED***
          controller: 'ResultsCtrl as results',
          templateUrl: 'views/results.html'
        ***REMOVED***)

        //  admin routes and subroutes views
        .when('/admin', ***REMOVED***
          controller: 'AdminHomeController as adminHome',
          templateUrl: 'views/adminHome.html',
          resolve: ***REMOVED***
            //  This will require the user is logged in
            //  and pass the current session info to the controller
            'currentAuth': ['Auth', function(Auth)***REMOVED***
              return Auth.$requireSignIn();
            ***REMOVED***]
          ***REMOVED***
        ***REMOVED***)
        .when('/admin/topics', ***REMOVED***
          controller: 'AdminTopicsController as adminTopics',
          templateUrl: 'views/adminTopics.html',
          resolve: ***REMOVED***
            'currentAuth': ['Auth', function(Auth) ***REMOVED***
              return Auth.$requireSignIn();
            ***REMOVED***]
          ***REMOVED***
        ***REMOVED***)
        .when('/admin/countries', ***REMOVED***
          controller: 'AdminCountriesController as adminCountries',
          templateUrl: 'views/adminCountries.html',
          resolve: ***REMOVED***
            'currentAuth': ['Auth', function(Auth) ***REMOVED***
              return Auth.$requireSignIn();
            ***REMOVED***]
          ***REMOVED***
        ***REMOVED***)
        .when('/admin/reports', ***REMOVED***
          controller: 'AdminReportsController as adminReports',
          templateUrl: 'views/adminReports.html',
          resolve: ***REMOVED***
            'currentAuth': ['Auth', function(Auth) ***REMOVED***
              return Auth.$requireSignIn();
            ***REMOVED***]
          ***REMOVED***
        ***REMOVED***)
        .when('/admin/managers', ***REMOVED***
          controller: 'AdminManagersController as adminManagers',
          templateUrl: 'views/adminManagers.html',
          resolve: ***REMOVED***
            'currentAuth': ['Auth', function(Auth) ***REMOVED***
              return Auth.$requireSignIn();
            ***REMOVED***]
          ***REMOVED***
        ***REMOVED***)

        //  catch-all view
        .otherwise(***REMOVED***
              controller: 'LandingCtrl as landing',
              templateUrl: 'views/landing.html'
        ***REMOVED***);

        //  $locationProvider config
        $locationProvider.html5Mode(true);

        //  Angular Material theme config
        $mdThemingProvider
        .definePalette('GreaterMSPColors', ***REMOVED***
          '50': '89ccda',   //  Greater MSP Blue
          '100': 'd0d741',  //  Greater MSP Green
          '200': '3a3431',  //  Greater MSP Brown - headline and body copy, rules, accents
          '300': 'b7be16',  //  Body copy, rules, accents
          '400': 'ece8b2',  //  Background tint
          '500': '4fbbd1',  //  Body copy, rules, accents
          '600': 'f5d258',  //  Comparative colors
          '700': '98579b',
          '800': 'e58426',
          '900': 'cc6ca6',
          'A100': '006da3',
          'A200': 'b4981d',
          'A400': 'db3762',
          'A700': '006da3',
          'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                              // on this palette should be dark or light
          'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
           '200', '300', '400', 'A100'],
          'contrastLightColors': undefined    // could also specify this if default was 'dark'

        ***REMOVED***);
        $mdThemingProvider
        .theme('default')
        .primaryPalette('GreaterMSPColors')
        .accentPalette('GreaterMSPColors')
        .warnPalette('GreaterMSPColors')
        .backgroundPalette('grey');
    ***REMOVED***
***REMOVED***)();

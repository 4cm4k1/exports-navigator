(function() {
    'use strict';

    angular.module('exportsNavigator').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRouteTheme]);

    function configRouteTheme($routeProvider, $locationProvider, $mdThemingProvider) {
        //  Route config (with authentication checks)
        $routeProvider
        // route for the User Landing Page View
        .when('/', {
            controller: 'LandingCtrl as landing',
            templateUrl: 'views/landingPage.html'
        })
        // route for the Admin Home Page
        .when('/admin', {
          controller: 'AdminHomeController as admin',
          templateUrl: 'views/adminHome.html',
          resolve: {
            //  This will require the user is logged in
            //  and pass the current session info to the controller
            'currentAuth': ['Auth', function(Auth){
              return Auth.$requireSignIn();
            }]
          }
        })
        .when('/admin/topics', {
          controller: 'AdminTopicsController as adminTopics',
          templateUrl: 'views/adminTopics.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth) {
              return Auth.$requireSignIn();
            }]
          }
        })
        .when('/admin/reports', {
          controller: 'AdminReportsController as adminReports',
          templateUrl: 'views/adminReports.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth) {
              return Auth.$requireSignIn();
            }]
          }
        })
        .when('/admin/managers', {
          controller: 'AdminManagersController as adminManagers',
          templateUrl: 'views/adminManagers.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth) {
              return Auth.$requireSignIn();
            }]
          }
        })

        // route for the User Food-Aggribusiness View
        .when('/user/food-aggribusiness', {
            controller: 'FoodAgCtrl as foodAg',
            templateUrl: 'views/foodAg.html'
        })
        // route for the User Medical Device, Pharma, Life Sciences View
        .when('/user/meddev_pharma_lifescience', {
            controller: 'MedDevCtrl as medDev',
            templateUrl: 'views/medDev.html'
        })
        // route for the User Other View
        .when('/user/other', {
            controller: 'OtherCtrl as other',
            templateUrl: 'views/other.html'
        })
        // route for the User General Topic Search View
        .when('/user/topic-search', {
            controller: 'TSearchCtrl as topics',
            templateUrl: 'views/topicSearch.html'
        })
        // route for the User Country Search View
        .when('/user/country-search', {
            controller: 'CSearchCtrl as country',
            templateUrl: 'views/countrySearch.html'
        })
        // route for the User Home Page View
        .otherwise({
          controller: 'HomeCtrl as home',
          templateUrl: 'views/home.html'
        });

        //  $locationProvider config
        $locationProvider.html5Mode(true);

        //  Angular Material theme config
        $mdThemingProvider
        .definePalette('GreaterMSPColors', {
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

        });
        $mdThemingProvider
        .theme('default')
        .primaryPalette('GreaterMSPColors')
        .accentPalette('GreaterMSPColors')
        .warnPalette('GreaterMSPColors')
        .backgroundPalette('grey');
    }
})();

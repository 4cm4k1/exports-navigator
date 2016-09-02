(function() {
    'use strict';

    angular.module('exportsNavigator').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRouteTheme]);

    function configRouteTheme($routeProvider, $locationProvider, $mdThemingProvider) {
        //  Route config (with authentication checks)
        $routeProvider

        //  public landing view
            .when('/', {
            controller: 'HomeCtrl as home',
            templateUrl: 'views/home.html'
        })

        //  results view with $routeParams
        .when('/results/:industry/:topic?', {
            controller: 'ResultsCtrl as results',
            templateUrl: 'views/results.html'
        })

        //  admin routes and subroutes views
        .when('/admin', {
            controller: 'AdminHomeController as adminHome',
            templateUrl: 'views/adminHome.html',
            resolve: {
                //  This will require the user is logged in
                //  and pass the current session info to the controller
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view of all industries
        .when('/admin/industries', {
            controller: 'AdminIndustriesController as adminIndustries',
            templateUrl: 'views/adminIndustries.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view on which industries are edited
        .when('/admin/industries/:itemID', {
            controller: 'AdminIndustriesEditController as adminIndustriesEdit',
            templateUrl: 'views/adminIndustriesEdit.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view of all topics
        .when('/admin/topics', {
            controller: 'AdminTopicsController as adminTopics',
            templateUrl: 'views/adminTopics.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view of adding a topic
        .when('/admin/topics/add', {
            controller: 'AdminTopicsAddController as adminTopicsAdd',
            templateUrl: 'views/adminTopicsAdd.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }],
                'data': ['Data', function(Data) {
                    return Promise.all([
                        Data.getWebsites(),
                        Data.getContacts()
                    ]);
                }]
            }
        })

        // admin view of editing a topic
        .when('/admin/topics/:itemID', {
            controller: 'AdminTopicsEditController as adminTopicsEdit',
            templateUrl: 'views/adminTopicsEdit.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }],
                'data': ['Data', function(Data) {
                    return Promise.all([
                        Data.getTopics(),
                        Data.getContacts(),
                        Data.getWebsites()
                    ]);
                }]
            }
        })

        // admin view of all countries
        .when('/admin/countries', {
            controller: 'AdminCountriesController as adminCountries',
            templateUrl: 'views/adminCountries.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view of all contacts
        .when('/admin/contacts', {
            controller: 'AdminContactsController as adminContacts',
            templateUrl: 'views/adminContacts.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        //admin view for adding a contact
        .when('/admin/contacts/add', {
            controller: 'AdminContactsAddController as adminContactsAdd',
            templateUrl: 'views/adminContactsAdd.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        //admin view of editing a contact
        .when('/admin/contacts/:itemID', {
            controller: 'AdminContactsEditController as adminContactsEdit',
            templateUrl: 'views/adminContactsEdit.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view of all websites
        .when('/admin/websites', {
            controller: 'AdminWebsitesController as adminWebsites',
            templateUrl: 'views/adminWebsites.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view to add a website
        .when('/admin/websites/add', {
            controller: 'AdminWebsitesAddController as adminWebsitesAdd',
            templateUrl: 'views/adminWebsitesAdd.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view of generated reports
        .when('/admin/reports', {
            controller: 'AdminReportsController as adminReports',
            templateUrl: 'views/adminReports.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        // admin view, where admin can add, edit, or delete managers
        .when('/admin/account', {
            controller: 'AdminAccountController as adminAccount',
            templateUrl: 'views/adminAccount.html',
            resolve: {
                'currentAuth': ['Auth', function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })

        //  catch-all view
        .otherwise({
            controller: 'HomeCtrl as home',
            templateUrl: 'views/home.html'
        });

        //  $locationProvider config
        $locationProvider.html5Mode(true);

        //  Angular Material theme config
        $mdThemingProvider
            .definePalette('GreaterMSPColors', {
                '50': '89ccda',
                '100': 'd0d741',
                '200': '3a3431',
                '300': 'b7be16',
                '400': 'ece8b2',
                '500': '4fbbd1',
                '600': 'f5d258',
                '700': '98579b',
                '800': 'e58426',
                '900': 'cc6ca6',
                'A100': '006da3',
                'A200': 'b4981d',
                'A400': 'db3762',
                'A700': '006da3',
                'contrastDefaultColor': 'light',
                //  THESE ARE THE BACKGROUND COLORS THAT REQUIRE DARK TEXT
                //  TO READ EASILY
                'contrastDarkColors': ['400'],
                'contrastLightColors': undefined
            });
        //  BELOW OUR CUSTOM THEME IS CALLED AND WE DEFINE THE COLORS
        //  THAT ARE AVAILABLE IN CSS CLASSES TO HTML TEMPLATES
        $mdThemingProvider
            .theme('default')
            .primaryPalette('GreaterMSPColors', {
                'default': '50', //  GREATER MSP BLUE
                'hue-1': '100', //  GREATER MSP GREEN
                'hue-2': '200' //  GREATER MSP BROWN
            })
            .accentPalette('GreaterMSPColors', {
                'default': '300', //  GREEN-ISH ACCENT COLOR
                'hue-1': '500' //  BLUE-ISH ACCENT COLOR
            })
            .warnPalette('GreaterMSPColors', {
                'default': '600', //  ORANGE-ISH WARN COLOR
                'hue-1': '800', //  RED-ORANGE-ISH WARN COLOR
                'hue-2': 'A400' //  RED WARN COLOR
            })
            .backgroundPalette('grey');
    }
})();

(function() {
    'use strict';

    angular.module('exportsNavigator').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRouteTheme]);

    function configRouteTheme($routeProvider, $locationProvider, $mdThemingProvider) {
        //  Route config (with authentication checks)
        $routeProvider
        .when('/', {
            controller: 'HomeCtrl as home',
            templateUrl: 'views/home.html'
        })
        // .when('/admin', {
        //   controller: 'AdminHomeController as admin',
        //   templateUrl: 'views/adminHome.html',
        //   resolve: {
        //     //  This will require the user is logged in
        //     //  and pass the current session info to the controller
        //     'currentAuth': ['Auth', function(Auth){
        //       return Auth.$requireSignIn();
        //     }]
        //   }
        // })
        .otherwise({
          controller: 'HomeCtrl as home',
          templateUrl: 'views/home.html'
        });

        //  $locationProvider config
        $locationProvider.html5Mode(true);

        //  Angular Material theme config
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('light-green')
            .warnPalette('deep-orange');
    }
})();

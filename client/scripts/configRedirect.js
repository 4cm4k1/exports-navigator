(function() {
    'use strict';
    angular.module('exportsNavigator').run(['$rootScope', '$location', redirectHome]);
    //  In combination with the route configuration, this redirects to
    //  the home view if user is not authenticated
    function redirectHome($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/');
            }
        });
    }

})();

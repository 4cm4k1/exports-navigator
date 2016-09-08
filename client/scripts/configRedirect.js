(function() {
    'use strict';
    angular.module('exportsNavigator').run(['$rootScope', '$location', '$http', 'Auth', redirectHome]);
    //  In combination with the route configuration, this redirects to
    //  the home view if user is not authenticated
    function redirectHome($rootScope, $location, $http, Auth) {
        $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/');
            }
        });

        Auth.$onAuthStateChanged(function(user) {
            if (user) {
                user.getToken(true)
                    .then(function(idToken) {
                      console.log('idtoken', idToken);
                        $http.defaults.headers.common.firebaseToken = idToken;
                        console.log('http default headers:', $http.defaults.headers.common.firebaseToken);
                    })
                    .catch(function(error) {
                        console.log('Didnt work');
                    });
            } else {
                $http.defaults.headers.common.firebaseToken = undefined;
            }
        });
    }

})();

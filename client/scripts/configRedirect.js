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

        //  This watches the user's authentication state while using the app
        //  and will add a token as a header to all $http requests for
        //  verification on the server
        Auth.$onAuthStateChanged(function(user) {
            if (user) {
                user.getToken(true)
                    .then(function(idToken) {
                        $http.defaults.headers.common.firebaseToken = idToken;
                    })
                    .catch(function(error) {
                        console.log('firebaseToken authentication header was not set correctly.');
                    });
            } else {
                $http.defaults.headers.common.firebaseToken = null;
            }
        });
    }

})();

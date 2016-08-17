(function() {
    'use strict';

    angular.module('exportsNavigator').factory('Auth', ['$firebaseAuth', Auth]);

    function Auth($firebaseAuth) {
        return $firebaseAuth();
    }
})();

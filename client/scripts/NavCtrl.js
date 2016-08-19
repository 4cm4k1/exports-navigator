(function() ***REMOVED***
    'use strict';

    angular.module('exportsNavigator').controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$location', 'Auth'];

    function NavCtrl($location, Auth) ***REMOVED***
        var vm = this;

        vm.auth = Auth;

        vm.auth.$onAuthStateChanged(function(user)***REMOVED***
            vm.user = user;
            console.log('navbar ctrl:', vm.user);
        ***REMOVED***);

    ***REMOVED***

***REMOVED***)();

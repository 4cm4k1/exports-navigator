(function() {
    'use strict';

    angular.module('exportsNavigator').controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$location', 'Auth'];

    function NavCtrl($location, Auth) {
        var vm = this;

        vm.auth = Auth;

        vm.auth.$onAuthStateChanged(function(user){
            vm.user = user;
            console.log('navbar ctrl:', vm.user);
        });

    }

})();

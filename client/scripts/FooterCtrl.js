(function(){
    'use strict';

    angular.module('exportsNavigator').controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['$mdDialog', 'Auth'];

    function FooterCtrl($mdDialog, Auth){
        var vm = this;

        vm.auth = Auth;

        vm.auth.$onAuthStateChanged(function(user){
            vm.user = user;
        });

        vm.signOut = function(){
            vm.auth.$signOut();
            $location.path('/');
        };

        vm.showSignInModal = function(ev) {
            $mdDialog.show({
                    controller: 'AuthCtrl as auth',
                    templateUrl: 'templates/auth.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    vm.status = 'You said the information was "' + answer + '".';
                }, function() {
                    vm.status = 'You cancelled the dialog.';
                });
        };

    }
})();

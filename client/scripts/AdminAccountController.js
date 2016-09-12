(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminAccountController', AdminAccountController);

    AdminAccountController.$inject = ['currentAuth', 'Data', '$mdDialog'];

    function AdminAccountController(currentAuth, Data, $mdDialog) {
        var vm = this;
        vm.auth = currentAuth;
        vm.newDisplayName = '';
        vm.newEmail = '';
        vm.newPassword = '';

        vm.print = function() {
            Data.printPage();
        };

        vm.showSignInModal = function(ev) {
            Data.showToast('Please sign in again to change your account.');
            $mdDialog.show({
                    controller: 'AuthCtrl as auth',
                    templateUrl: 'templates/auth.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function() {
                    //  update account info here
                    if (vm.newDisplayName.length > 0) Data.updateDisplayName(vm.newDisplayName);
                    if (vm.newEmail.length > 0) Data.updateUserEmail(vm.newEmail);
                    if (vm.newPassword.length > 0) Data.updateUserPassword(vm.newPassword);
                    if (vm.newDisplayName.length === 0 && vm.newEmail.length === 0 && vm.newPassword.length === 0) Data.showToast('Sorry, you haven\'t entered any changes to your account info. Please try again.');
                }, function() {});
        };
    }
})();

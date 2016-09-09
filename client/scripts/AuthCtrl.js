(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['Auth', '$location', '$mdDialog', 'Data'];

    function AuthCtrl(Auth, $location, $mdDialog, Data) {
        var vm = this;

        //  This will redirect the user to the admin dashboard
        //  if they already have a session going
        Auth.$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                // console.log('User is already signed in!');
                $location.path('/admin');
            }
        });

        // no need to redeclare, but for reference, the view is making this
        // variable available to vm
        // vm.user = {
        //     email: 'something@example.com',
        //     password: 'somethingelse'
        // };

        vm.signIn = function() {
            Auth.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
                .then(function(firebaseUser) {
                    Data.showToast('Signed in successfully!');
                    $location.path('/admin');
                    $mdDialog.hide();
                })
                .catch(function(error) {
                    Data.showToast('Please try again. ' + error);
                    // toast to indicate failure goes here
                });
        };

        vm.sendPasswordResetEmail = function() {
            Data.sendPasswordResetEmail(vm.user.email);
        };

        vm.hide = function() {
            $mdDialog.hide();
        };
        vm.cancel = function() {
            $mdDialog.cancel();
        };
        vm.answer = function(answer) {
            $mdDialog.hide(answer);
        };

    }
})();

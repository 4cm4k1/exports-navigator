(function() ***REMOVED***
    'use strict';

    angular.module('exportsNavigator').controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['Auth', '$location'];

    function AuthCtrl(Auth, $location) ***REMOVED***
        var vm = this;

        //  This will redirect the user to the admin dashboard
        //  if they already have a session going
        Auth.$onAuthStateChanged(function(firebaseUser) ***REMOVED***
            if (firebaseUser) ***REMOVED***
                console.log('User is already signed in!');
                $location.path('/admin');
            ***REMOVED***
        ***REMOVED***);

        // no need to redeclare, but for reference, the view is making this
        // variable available to vm
        // vm.user = ***REMOVED***
        //     email: 'something@example.com',
        //     password: 'somethingelse'
        // ***REMOVED***;

        vm.signIn = function() ***REMOVED***
            Auth.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
                .then(function(firebaseUser) ***REMOVED***
                    console.log('Signed in as:', firebaseUser.uid);
                    $location.path('/admin');
                ***REMOVED***)
                .catch(function(error) ***REMOVED***
                    console.error('Authentication failed:', error);
                    // toast to indicate failure goes here
                ***REMOVED***);
        ***REMOVED***;
    ***REMOVED***
***REMOVED***)();

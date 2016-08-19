(function()***REMOVED***
    'use strict';

    angular.module('exportsNavigator').controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['$mdDialog'];

    function FooterCtrl($mdDialog)***REMOVED***
        var vm = this;

        vm.showSignInModal = function(ev) ***REMOVED***
            $mdDialog.show(***REMOVED***
                    controller: 'AuthCtrl as auth',
                    templateUrl: 'templates/auth.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                ***REMOVED***)
                .then(function(answer) ***REMOVED***
                    vm.status = 'You said the information was "' + answer + '".';
                ***REMOVED***, function() ***REMOVED***
                    vm.status = 'You cancelled the dialog.';
                ***REMOVED***);
        ***REMOVED***;

    ***REMOVED***
***REMOVED***)();

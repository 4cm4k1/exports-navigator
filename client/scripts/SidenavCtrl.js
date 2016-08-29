(function() {
    'use strict';

    angular.module('exportsNavigator').controller('SidenavCtrl', SidenavCtrl);

    SidenavCtrl.$inject = ['$timeout', '$mdSidenav', '$location', 'Auth', '$log'];

    function SidenavCtrl($timeout, $mdSidenav, $location, Auth, $log) {
        var vm = this;

        vm.locations = [{
            path: '/admin',
            name: 'Dashboard',
            icon: 'home'
        }, {
            path: '/admin/industries',
            name: 'Industries',
            icon: 'business'
        }, {
            path: '/admin/topics',
            name: 'Topics',
            icon: 'chat_bubble'
        }, {
            path: '/admin/countries',
            name: 'Countries',
            icon: 'public'
        }, {
            path: '/admin/contacts',
            name: 'Contacts',
            icon: 'contacts'
        }, {
            path: '/admin/websites',
            name: 'Websites',
            icon: 'web'
        }, {
            path: '/admin/reports',
            name: 'Reports',
            icon: 'show_chart'
        }, {
            path: '/admin/managers',
            name: 'Account',
            icon: 'supervisor_account'
        }];

        vm.navigate = function(where) {
            $location.path(where);
            vm.close();
        };

        vm.close = function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('sidenav').close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
        };

        vm.auth = Auth;

        // Bug fix for unauthenticated results page
        // vm.auth.$onAuthStateChanged(function(user){
        //     vm.user = user;
        //     if(!vm.user) {
        //         $location.path('/');
        //         vm.close();
        //     }
        // });

        vm.signOut = function(){
            vm.auth.$signOut();
            $location.path('/');
            vm.close();
        };

    }
})();

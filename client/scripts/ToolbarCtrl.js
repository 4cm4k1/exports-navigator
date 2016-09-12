(function() {
    'use strict';

    angular.module('exportsNavigator').controller('ToolbarCtrl', ToolbarCtrl);

    ToolbarCtrl.$inject = ['$timeout', '$mdSidenav', '$log', 'Auth'];

    function ToolbarCtrl($timeout, $mdSidenav, $log, Auth) {
        var vm = this;

        vm.auth = Auth;

        vm.auth.$onAuthStateChanged(function(user) {
            vm.user = user;
        });

        vm.toggleSidenav = buildDelayedToggler('sidenav');
        vm.isOpenSidenav = function() {
            return $mdSidenav('sidenav').isOpen();
        };

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = vm,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
    }
})();

(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminManagersController', AdminManagersController);

  // AdminManagersController.$inject = [];

  function AdminManagersController() {
    var vm = this;

    vm.list;

    vm.update = function(manager) {
      console.log('Update clicked on manager', manager);
    };

    vm.remove = function(manager) {
      console.log('Remove clicked on manager', manager);
    };

    vm.addManager = function() {

      if (vm.password === vm.passwordConfirm) {

        var username = vm.username;
        var password = vm.password;

        vm.noMatch = '';

        console.log('Username:', username, 'Password:', password);

      } else {

        vm.noMatch = 'Passwords do not match';

      }
    };
  };
});

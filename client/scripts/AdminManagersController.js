(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminManagersController', AdminManagersController);

  AdminManagersController.$inject = ['currentAuth'];

  function AdminManagersController(currentAuth) {
    var vm = this;

    vm.list = ['this will be a', 'list of managers'];

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
  }
})();

(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminHomeController', AdminHomeController);

  AdminHomeController.$inject = ['currentAuth'];

  function AdminHomeController(currentAuth) {
    var vm = this;
    vm.auth = currentAuth;
    vm.userQueriesFail = '(number goes here)';
  }
})();

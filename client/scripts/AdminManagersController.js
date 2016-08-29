(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminManagersController', AdminManagersController);

  AdminManagersController.$inject = ['currentAuth', 'Data'];

  function AdminManagersController(currentAuth, Data) {
    var vm = this;
    vm.auth = currentAuth;
    vm.newDisplayName = '';
    vm.newEmail = '';
    vm.newPassword = '';
    vm.newPasswordConfirm = '';
    vm.message = 'Test Message';
    vm.updateUser = function(){
      vm.message = '';
      if(vm.newDisplayName.length > 0) vm.message = Data.updateDisplayName(vm.newDisplayName);
      if(vm.newEmail.length > 0) vm.message = Data.updateUserEmail(vm.newEmail);
      if(vm.newPassword.length > 0) vm.message = Data.updateUserPassword(vm.newPassword);
    };
  }
})();

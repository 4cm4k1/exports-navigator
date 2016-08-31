(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminAccountController', AdminAccountController);

  AdminAccountController.$inject = ['currentAuth', 'Data'];

  function AdminAccountController(currentAuth, Data) {
    var vm = this;
    vm.auth = currentAuth;
    vm.newDisplayName = '';
    vm.newEmail = '';
    vm.newPassword = '';
    vm.updateUser = function(){
      if(vm.newDisplayName.length > 0) Data.updateDisplayName(vm.newDisplayName);
      if(vm.newEmail.length > 0) Data.updateUserEmail(vm.newEmail);
      if(vm.newPassword.length > 0) Data.updateUserPassword(vm.newPassword);
      if(vm.newDisplayName.length === 0 && vm.newEmail.length === 0 && vm.newPassword.length === 0) Data.showToast('Sorry, you haven\'t entered any changes to your account info. Please try again.');
    };
  }
})();

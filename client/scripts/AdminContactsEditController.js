(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminContactsController', AdminContactsController);

  AdminContactsController.$inject = ['currentAuth', 'Data'];

  function AdminContactsController(currentAuth, Data) {
    var vm = this;
    vm.data = Data.data;
    Data.getContacts();
  }
})();

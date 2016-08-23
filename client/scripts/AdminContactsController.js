(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminContactsController', AdminContactsController);

  AdminContactsController.$inject = ['currentAuth'];

  function AdminContactsController(currentAuth) {
    var vm = this;

    vm.text = 'Contacts';
  }
})();

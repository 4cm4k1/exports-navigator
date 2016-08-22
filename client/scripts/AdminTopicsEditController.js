(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth'];

  function AdminTopicsEditController(currentAuth) {
    var vm = this;

    vm.text = 'Hooray!! ANGULAR!!!';

  }
})();

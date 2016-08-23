(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesController', AdminIndustriesController);

  AdminIndustriesController.$inject = ['currentAuth'];

  function AdminIndustriesController(currentAuth) {
    var vm = this;

    vm.text = 'Industries';
  }
})();

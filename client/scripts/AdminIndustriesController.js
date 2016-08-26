(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesController', AdminIndustriesController);

  AdminIndustriesController.$inject = ['currentAuth', 'Data'];

  function AdminIndustriesController(currentAuth, Data) {
    var vm = this;

    var list = [];

    // Data.getAllIndustries();

    vm.list = list;

    vm.add = function() {
      console.log('Add clicked');
    };
  }
})();

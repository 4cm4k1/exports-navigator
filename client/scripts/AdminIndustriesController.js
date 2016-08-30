(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesController', AdminIndustriesController);

  AdminIndustriesController.$inject = ['currentAuth', 'Data'];

  function AdminIndustriesController(currentAuth, Data) {
    var vm = this;

    vm.data = Data.data;
    Data.getIndustries();

    vm.add = function() {
      console.log('Add clicked');
    };
  }
})();

(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesController', AdminIndustriesController);

  AdminIndustriesController.$inject = ['currentAuth', '$http', 'Data'];

  function AdminIndustriesController(currentAuth, $http, Data) {
    var vm = this;

    vm.data = Data.data;

    Data.getIndustries();

    vm.add = function() {
      console.log('Add clicked');
    };


  vm.edit = function(){
    console.log('Edit clicked');
  };


  vm.export = function() {
    console.log('Export clicked');
  };

  vm.import = function() {
    console.log('Import clicked');
  };


}

})();

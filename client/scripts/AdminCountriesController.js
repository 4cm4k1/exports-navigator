(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminCountriesController', AdminCountriesController);

  AdminCountriesController.$inject = ['currentAuth', 'Data'];

  function AdminCountriesController(currentAuth, Data) {
    var vm = this;
    vm.data = Data.data;
    Data.getCountries();
  }
})();

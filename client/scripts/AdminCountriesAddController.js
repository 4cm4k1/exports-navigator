(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminCountriesAddController', AdminCountriesAddController);

  AdminCountriesAddController.$inject = ['currentAuth', '$http', 'Data'];

  function AdminCountriesAddController(currentAuth, $http, Data) {
    var vm = this;
    vm.data = Data.data;
    Data.getContacts();
    vm.newCountry = {
      country: '',
      contact_id: null,
    };
    vm.saveCountry = function(){
      Data.createCountry(vm.newCountry);
    };
  }
})();

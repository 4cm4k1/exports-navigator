(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesEditController', AdminIndustriesEditController);

  AdminIndustriesEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data'];

  function AdminIndustriesEditController(currentAuth, $http, $routeParams, Data) {
    var vm = this;

    // use data factory
    vm.data = Data.data;
    Data.getIndustries();
    Data.getWebsites();
    Data.getContacts();

    vm.industryId = parseInt($routeParams.itemID);

    vm.update = function() {
      console.log('Update clicked');
    };

  }
})();

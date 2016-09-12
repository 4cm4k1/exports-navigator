(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminWebsitesController', AdminWebsitesController);

  AdminWebsitesController.$inject = ['currentAuth', 'Data'];

  function AdminWebsitesController(currentAuth, Data) {
    var vm = this;
    vm.data = Data.data;
    Data.getWebsites();
    vm.print = function(){
        Data.printPage();
    };
  }
})();

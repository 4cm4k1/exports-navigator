(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminWebsitesController', AdminWebsitesController);

  AdminWebsitesController.$inject = ['currentAuth'];

  function AdminWebsitesController(currentAuth) {
    var vm = this;

    vm.text = 'Websites';
  }
})();

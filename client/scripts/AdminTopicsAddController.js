(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsAddController', AdminTopicsAddController);

  AdminTopicsAddController.$inject = ['currentAuth', 'Data'];

  function AdminTopicsAddController(currentAuth, Data) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;

    vm.add = function() {
      console.log('Add clicked');
    };
  }
})();

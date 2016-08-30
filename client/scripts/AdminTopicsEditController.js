(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams, Data) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;

    // the url dictates on which topic "Update" was clicked
    vm.topicId = parseInt($routeParams.itemID);

    vm.update = function() {
      console.log('Update clicked');
    };
  }
})();

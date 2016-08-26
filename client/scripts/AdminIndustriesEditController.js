(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesEditController', AdminIndustriesEditController);

  AdminIndustriesEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data'];

  function AdminIndustriesEditController(currentAuth, $http, $routeParams, Data) {
    var vm = this;

    // declared here so they're available throughout the controller function
    var list = [];

    
  }
})();

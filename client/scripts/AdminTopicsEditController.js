(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data', '$location'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams, Data, $location) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;

    // the url dictates on which topic "Update" was clicked
    vm.topicId = parseInt($routeParams.itemID);

    vm.update = function() {
      console.log('Update clicked');
    };

    vm.delete = function() {
      console.log('vm.data.topics[vm.topicId].id:', vm.data.topics[vm.topicId].id);
      // gives the user a chance to confirm deletion
      if (confirm("Are you sure you want to delete this topic?")) {
        Data.deleteTopic({id: vm.data.topics[vm.topicId].id});
        $location.url('/admin/topics');
      }
    };
  }
})();

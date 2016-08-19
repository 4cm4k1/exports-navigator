(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsController', AdminTopicsController);

  // AdminTopicsController.$inject = [];

  function AdminTopicsController() {
    var vm = this;

    vm.topicsList;

    vm.update = function(listItem) {
      console.log('Update clicked');
    };

    vm.remove = function(listItem) {
      console.log('Remove clicked');
    };

    vm.add = function() {
      console.log('Add clicked, input reads:', vm.new);
    };

    vm.export = function() {
      console.log('Export clicked');
    };

    vm.import = function() {
      console.log('Import clicked');
    };
  }

})();

(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsController', AdminTopicsController);

  AdminTopicsController.$inject = ['currentAuth', '$http'];

  function AdminTopicsController(currentAuth, $http) {
    var vm = this;

    var list = [];

    $http.get('/db/topics').then(function(response) {

      for (var i = 0; i < response.data.rows.length; i++) {
        list.push(response.data.rows[i]);
      }
    });

    vm.topicsList = list;

    vm.update = function(item) {
      console.log('Update clicked', item.id);
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

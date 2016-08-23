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

    vm.add = function() {
      console.log('Add clicked');

      // $http.post('/db/topics/create').then()
    };

    vm.export = function() {
      console.log('Export clicked');
    };

    vm.import = function() {
      console.log('Import clicked');
    };
  }

})();

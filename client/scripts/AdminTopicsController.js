(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsController', AdminTopicsController);

  AdminTopicsController.$inject = ['currentAuth', '$http'];

  function AdminTopicsController(currentAuth, $http) {
    var vm = this;

    $http.get('/db/topics').then(function(response) {

      var list = [];

      for (var i = 0; i < response.data.rows.length; i++) {
        list.push(response.data.rows[i].topic);
      }

      console.log('list variable:', list);
    });

    vm.topicsList = ['this', 'will', 'be', 'a', 'list', 'of', 'topics'];

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

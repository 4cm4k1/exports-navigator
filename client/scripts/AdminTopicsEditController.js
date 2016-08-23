(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams) {
    var vm = this;

    var list = [];

    $http.get('/db/topics').then(function(response) {

      for (var i = 0; i < response.data.rows.length; i++) {
        list.push(response.data.rows[i]);
      }

      var index = $routeParams.itemID;
      index = parseInt(index);
      console.log('index:', index);

      vm.topic = list[index];
      // console.log('list:', list);
      // console.log('list at 3:', list[3]);
      // console.log('list at index:', list[index]);
    });

    vm.update = function() {
      $http.put('/db/topics/update').then(function(request, response) {
        console.log(request.body);
        response.sendStatus(200);
      });
    };

  }
})();

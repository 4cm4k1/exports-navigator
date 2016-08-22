(function() ***REMOVED***
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams) ***REMOVED***
    var vm = this;

    var list = [];

    $http.get('/db/topics').then(function(response) ***REMOVED***
      for (var i = 0; i < response.data.rows.length; i++) ***REMOVED***
        list.push(response.data.rows[i]);
      ***REMOVED***
      var index = $routeParams.itemID;
      index = parseInt(index);
      console.log('index:', index);

      vm.topic = list[index];
      console.log('list:', list);
      console.log('list at 3:', list[3]);
      console.log('list at index:', list[index]);
    ***REMOVED***);

    // var index = $routeParams.itemID;
    // index = parseInt(index);
    // console.log('index:', index);
    //
    // vm.topic = list[index];
    // console.log('list:', list);
    // console.log('list at index:', list[3]);
    // console.log('list again :', list);
  ***REMOVED***
***REMOVED***)();

(function() ***REMOVED***
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsController', AdminTopicsController);

  AdminTopicsController.$inject = ['currentAuth', '$http', '$routeParams'];

  function AdminTopicsController(currentAuth, $http, $routeParams) ***REMOVED***
    var vm = this;

    var list = [];

    $http.get('/db/topics').then(function(response) ***REMOVED***

      for (var i = 0; i < response.data.rows.length; i++) ***REMOVED***
        list.push(response.data.rows[i]);
      ***REMOVED***
    ***REMOVED***);

    vm.topicsList = list;

    vm.update = function(item) ***REMOVED***
      console.log('Update clicked', item.id);
      item.id = $routeParams.itemID;
    ***REMOVED***;

    vm.add = function() ***REMOVED***
      console.log('Add clicked, input reads:', vm.new);
    ***REMOVED***;

    vm.export = function() ***REMOVED***
      console.log('Export clicked');
    ***REMOVED***;

    vm.import = function() ***REMOVED***
      console.log('Import clicked');
    ***REMOVED***;
  ***REMOVED***

***REMOVED***)();

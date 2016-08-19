(function() ***REMOVED***
  'use strict';

  angular.module('exportsNavigator').controller('AdminManagersController', AdminManagersController);

  AdminManagersController.$inject = ['currentAuth'];

  function AdminManagersController(currentAuth) ***REMOVED***
    var vm = this;

    vm.list = ['this will be a', 'list of managers'];

    vm.update = function(manager) ***REMOVED***
      console.log('Update clicked on manager', manager);
    ***REMOVED***;

    vm.remove = function(manager) ***REMOVED***
      console.log('Remove clicked on manager', manager);
    ***REMOVED***;

    vm.addManager = function() ***REMOVED***

      if (vm.password === vm.passwordConfirm) ***REMOVED***

        var username = vm.username;
        var password = vm.password;

        vm.noMatch = '';

        console.log('Username:', username, 'Password:', password);

      ***REMOVED*** else ***REMOVED***

        vm.noMatch = 'Passwords do not match';

      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***)();

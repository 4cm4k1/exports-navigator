(function() ***REMOVED***
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsController', AdminTopicsController);

  AdminTopicsController.$inject = ['currentAuth'];

  function AdminTopicsController(currentAuth) ***REMOVED***
    var vm = this;

    vm.topicsList = ['this', 'will', 'be', 'a', 'list', 'of', 'topics'];

    vm.update = function(listItem) ***REMOVED***
      console.log('Update clicked');
    ***REMOVED***;

    vm.remove = function(listItem) ***REMOVED***
      console.log('Remove clicked');
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

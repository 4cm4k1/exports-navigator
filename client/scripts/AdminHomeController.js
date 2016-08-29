(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminHomeController', AdminHomeController);

  AdminHomeController.$inject = ['currentAuth', '$location', '$timeout'];

  function AdminHomeController(currentAuth, $location, $timeout) {
    var vm = this;
    vm.auth = currentAuth;
    vm.goToPath = function(path){
      $timeout(function() {
        $location.path(path);
      }, 250);
    };
    vm.userQueriesFail = '(number goes here)';
    vm.dataTiles = [{
        path: '/admin/reports',
        name: 'Queries With No Results',
        icon: 'error_outline',
        // style: 'background:#DB3762'
    }];
    vm.taskTiles = [{
        path: '/admin/industries',
        name: 'Industries',
        icon: 'business'
    }, {
        path: '/admin/topics',
        name: 'Topics',
        icon: 'chat_bubble'
    }, {
        path: '/admin/countries',
        name: 'Countries',
        icon: 'public'
    }, {
        path: '/admin/contacts',
        name: 'Contacts',
        icon: 'contacts'
    }, {
        path: '/admin/websites',
        name: 'Websites',
        icon: 'web'
    }, {
        path: '/admin/reports',
        name: 'Reports',
        icon: 'show_chart'
    }, {
        path: '/admin/managers',
        name: 'Managers',
        icon: 'supervisor_account'
    }];
  }
})();

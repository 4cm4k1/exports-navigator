(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminContactsController', AdminContactsController);

    AdminContactsController.$inject = ['currentAuth', 'Data'];

    function AdminContactsController(currentAuth, Data) {
        var vm = this;
        vm.data = Data.data;
        for (var i = 0; vm.data.contacts.length > i; i++) {
            vm.data.contacts[i].full_name = vm.data.contacts[i].first_name + ' ' + vm.data.contacts[i].last_name;
        }
        vm.print = function() {
            Data.printPage();
        };
    }
})();

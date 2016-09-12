(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminContactsAddController', AdminContactsAddController);

    AdminContactsAddController.$inject = ['currentAuth', '$http', 'Data'];

    function AdminContactsAddController(currentAuth, $http, Data) {
        var vm = this;
        vm.newContact = {
            first_name: '',
            last_name: '',
            title: '',
            organization: '',
            email: '',
            phone: ''
        };
        vm.saveContact = function() {
            Data.createContact(vm.newContact);
        };
    }
})();

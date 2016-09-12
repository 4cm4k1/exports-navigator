(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminCountriesAddController', AdminCountriesAddController);

    AdminCountriesAddController.$inject = ['currentAuth', '$http', 'Data'];

    function AdminCountriesAddController(currentAuth, $http, Data) {
        var vm = this;
        vm.data = Data.data;
        Data.getContacts();
        vm.newCountry = {};
        vm.saveCountry = function() {
            // vm.newCountry.contact_id = parseInt(vm.newCountry.contact_id);
            Data.createCountry(vm.newCountry);
        };
    }
})();

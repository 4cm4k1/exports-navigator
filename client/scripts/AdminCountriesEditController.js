(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminCountriesEditController', AdminCountriesEditController);

    AdminCountriesEditController.$inject = ['currentAuth', '$http', '$routeParams', '$location', 'Data'];

    function AdminCountriesEditController(currentAuth, $http, $routeParams, $location, Data) {
        var vm = this;
        vm.data = Data.data;
        vm.selectedCountry = parseInt($routeParams.countryID);
        findRecordIndex(vm.selectedCountry);

        vm.update = function() {
            var updatedCountry = {
                id: vm.selectedCountry,
                country: vm.data.countries[vm.selectedRecordIndex].country,
                note: vm.data.countries[vm.selectedRecordIndex].note,
                contact_id: vm.data.countries[vm.selectedRecordIndex].contact_id,
            };
            Data.updateCountry(updatedCountry);
        };

        vm.delete = function(recordID) {
            Data.deleteCountry(recordID);
        };

        function findRecordIndex(recordID) {
            for (var i = 0; vm.data.countries.length > i; i++) {
                if (recordID === vm.data.countries[i].id) {
                    vm.selectedRecordIndex = i;
                    break;
                }
            }
        }
    }
})();

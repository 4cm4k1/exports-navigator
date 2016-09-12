(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminCountriesController', AdminCountriesController);

    AdminCountriesController.$inject = ['currentAuth', 'Data', '$log', '$timeout', '$q'];

    function AdminCountriesController(currentAuth, Data, $log, $timeout, $q) {
        var vm = this;
        vm.data = Data.data;
        Data.getCountries().then(function(countries) {
            vm.countries = countries;
        });
        vm.print = function() {
            Data.printPage();
        };
    }
})();

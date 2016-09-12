(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminWebsitesAddController', AdminWebsitesAddController);

    AdminWebsitesAddController.$inject = ['currentAuth', 'Data'];

    function AdminWebsitesAddController(currentAuth, Data) {
        var vm = this;
        vm.data = Data.data;

        vm.add = function() {
            var newWebsite = {
                website: vm.newWebsite
            };
            Data.createWebsite(newWebsite);
        };

    }
})();

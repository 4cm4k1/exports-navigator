(function(){
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams', '$http'];

    function ResultsCtrl($location, $routeParams, $http){
        var vm = this;
        console.log('category:', $routeParams.category);
        console.log('search term:', $routeParams.searchTerm);


        vm.getIndustryData = function() {
            $http.get('/db/industries').then(function(response) {
                    console.log('getting industries', response);
                    vm.industryList = response.data.rows;
                    return (vm.industryList);
                },
                function(response) {
                    console.log('error getting industry data', response);
                });

        };
        vm.getIndustryData();


        //  $routeParams.category & $routeParams.searchTerm will be made
        //  available to this controller
    }
})();

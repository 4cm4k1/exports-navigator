(function(){
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams', '$http'];

    function ResultsCtrl($location, $routeParams, $http){
        var vm = this;
        console.log('industry:', $routeParams.industry);
        console.log('topic (optional):', $routeParams.topic);



        var index = $routeParams.industry;
        index = parseInt(index);





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






  // this code needs to go into the function that fires when someone chooses a topic


        //
        // $http.put('/db/topics/number_of_hits').then(function(response){
        //         console.log('adding to your hits', response);
        //     },
        //     function(response) {
        //         console.log('error adding to hits', response);
        //     });


        //  $routeParams.category & $routeParams.searchTerm will be made
        //  available to this controller
    }
})();

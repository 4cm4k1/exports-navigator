(function(){
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams', '$http'];

    function ResultsCtrl($location, $routeParams, $http){
        var vm = this;
        console.log('industry:', $routeParams.industry);
        console.log('topic (optional):', $routeParams.topic);
        vm.industry = $routeParams.industry;
        vm.topic = $routeParams.topic;
        //
        // var id = $routeParams.industry;
        // id = parseInt(id);


        vm.getIndustryData = function() {
          var indId = $routeParams.industry;
          indId = parseInt(indId);
          console.log('industries', indId);
            $http.get('/db/industries').then(function(response) {
                    console.log('getting industries', response.data);
                    vm.industryList = response.data.rows;
                    return (vm.industryList);
                },
                function(response) {
                    console.log('error getting industry data', response.data);
                });
        };

        vm.getIndustryData();



//this is to get the list of Topics which should display only when someone has selected "other industries"
        vm.getTopicList = function() {
          var topicId = $routeParams.topic;
          topicId = parseInt(topicId);
          console.log('topics', topicId);
            $http.get('/db/topics').then(function(response) {
                    console.log('getting topics', response.data);
                    vm.topicList = response.data.rows;
                    return (vm.topicList);
                },
                function(response) {
                    console.log('error getting topic data', response.data);
                });
        };
        vm.getTopicList();




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

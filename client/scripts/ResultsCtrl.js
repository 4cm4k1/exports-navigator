(function() {
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams', '$http', 'Data'];

    function ResultsCtrl($location, $routeParams, $http, Data) {
        var vm = this;
        vm.data = Data.data;

        // console.log('industry:', $routeParams.industry);
        // console.log('topic (optional):', $routeParams.topic);
        vm.industry = $routeParams.industry;
        vm.topic = $routeParams.topic;

        vm.isOther = function() {
            if (vm.industry != 7) {
                return false;
            } else {
                return true;
            }
        };


        vm.getIndustryData = function() {
            var indId = $routeParams.industry;
            indId = parseInt(indId);
            console.log('industries', indId);
            $http.get('/db/industries').then(function(response) {
                    // console.log('getting industries', response.data);
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
            // var topicId = $routeParams.topic.id;
            // topicId = parseInt(topicId);
            // console.log('topics', topicId);
            $http.get('/db/topics').then(function(response) {
                    // console.log('getting topics', response.data);
                    vm.topicList = response.data.rows;
                    // console.log('topicList', vm.topicList);
                    return (vm.topicList);
                },
                function(response) {
                    console.log('error getting topic data', response.data);
                });
            return (vm.topicList);
        };
        vm.getTopicList();

        vm.noMatch = false;
        vm.hasMatch = false;
        vm.selectedTopic = null;
        vm.displaySelectedTopic = function() {

            // vm.hasMatch = vm.checkHasMatch();
            vm.checkHasMatch();
            console.log('hasMatch?', vm.hasMatch);
            console.log('displaying selected topic', vm.selectedTopic);
            // return (vm.selectedTopic);

        };


        vm.item = undefined;
        vm.checkHasMatch = function() {
            for (var i = 0; i < vm.topicList.length; i++) {
                if (vm.topicList[i].topic == vm.selectedTopic) {
                    console.log('vm.checkHasMatch found a match in topicList', vm.selectedTopic, vm.topicList[i]);
                    vm.item = vm.topicList[i];
                    vm.hasMatch = true;
                    vm.noMatch = false;
                    break;
                    // return true;
                } else {
                    console.log('vm.checkHasMatch did NOT find a match in topicList', vm.selectedTopic, vm.topicList[i].topic);
                    vm.hasMatch=false;
                    vm.noMatch = true;
                }
            }
        };

        Data.getCountries();


        // this code needs to go into the function that fires when someone chooses a topic

        //
        // $http.put('/db/topics/number_of_hits').then(function(response){
        //         console.log('adding to your hits', response);
        //     },
        //     function(response) {
        //         console.log('error adding to hits', response);
        //     });



    }
})();

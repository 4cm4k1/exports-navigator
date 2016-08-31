(function() {
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams', '$http', 'Data'];

    function ResultsCtrl($location, $routeParams, $http, Data) {
        var vm = this;
        vm.data = Data.data;
        vm.showIndustryContacts = false;
        vm.showTopicSearch = false;
        vm.noMatch = false;
        vm.hasMatch = false;
        vm.selectedTopic = null;
        vm.selectedCountry = null;
        vm.item = undefined;
        vm.industry = $routeParams.industry;
        vm.topic = $routeParams.topic;
        vm.displaySelectedTopic = function() {
            checkTopicHasMatch();
        };
        vm.displaySelectedCountry = function() {
            checkCountryHasMatch();
        };
        // console.log('industry:', $routeParams.industry);
        // console.log('topic (optional):', $routeParams.topic);
        checkIsOther();
        getIndustryData();
        getTopicList();
        getCountryList();

        // this code needs to go into the function that fires when someone chooses a topic

        //
        // $http.put('/db/topics/number_of_hits').then(function(response){
        //         console.log('adding to your hits', response);
        //     },
        //     function(response) {
        //         console.log('error adding to hits', response);
        //     });

        //check if user selected 'other industry'
        function checkIsOther(){
          if(vm.industry != 7){
            vm.showIndustryContacts = true;
            vm.showTopicSearch = false;
          } else {
            vm.showIndustryContacts = false;
            vm.showTopicSearch = true;
          }
        }

        //get data for an industry
        function getIndustryData() {
            var indId = $routeParams.industry;
            indId = parseInt(indId);
            $http.get('/db/industries').then(function(response) {
                    // console.log('getting industries', response.data);
                    vm.industryList = response.data.rows;
                },
                function(response) {
                    console.log('error getting industry data', response.data);
                });
        }

        //this is to get the list of Topics which should display only when someone has selected "other industries"
        function getTopicList() {
            // var topicId = $routeParams.topic.id;
            // topicId = parseInt(topicId);
            // console.log('topics', topicId);
            $http.get('/db/topics').then(function(response) {
                    // console.log('getting topics', response.data);
                    vm.topicList = response.data.rows;
                    // console.log('topicList', vm.topicList);
                },
                function(response) {
                    console.log('error getting topic data', response.data);
                });
        }
        function getCountryList() {
            // var topicId = $routeParams.topic.id;
            // topicId = parseInt(topicId);
            // console.log('topics', topicId);
            $http.get('/db/countries').then(function(response) {
                    // console.log('getting topics', response.data);
                    vm.countryList = response.data.rows;
                    // console.log('topicList', vm.topicList);
                },
                function(response) {
                    console.log('error getting country data', response.data);
                });
        }
        //check if the search topic matches
        function checkTopicHasMatch() {
            for (var i = 0; i < vm.topicList.length; i++) {
                if (vm.topicList[i].topic == vm.selectedTopic) {
                    vm.item = vm.topicList[i];
                    vm.hasTopicMatch = true;
                    vm.noTopicMatch = false;
                    break;
                    // return true;
                } else {
                    vm.hasTopicMatch = false;
                    vm.noTopicMatch = true;
                }
            }
        }
        //check if the search country matches
        function checkCountryHasMatch() {
            for (var i = 0; i < vm.countryList.length; i++) {
                if (vm.countryList[i].country == vm.selectedCountry) {
                    vm.item = vm.countryList[i];
                    vm.hasCountryMatch = true;
                    vm.noCountryMatch = false;
                    vm.showTopicSearch = false;
                    break;
                    // return true;
                } else {
                    vm.hasCountryMatch = false;
                    vm.noCountryMatch = true;
                }
            }
        }

    }
})();

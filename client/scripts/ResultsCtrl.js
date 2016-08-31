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
            vm.topicList = vm.data.topics;
            console.log('vm.topicList', vm.data.topics);
            checkTopicHasMatch();
        };
        vm.displaySelectedCountry = function() {
            checkCountryHasMatch();
        };
        Data.getTopics();


        checkIsOther();
        getIndustryData();
        getCountryList();


        //check if user selected 'other industry'
        function checkIsOther() {
            if (vm.industry != 7) {
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

        function getCountryList() {
            $http.get('/db/countries').then(function(response) {
                    vm.countryList = response.data.rows;
                },
                function(response) {
                    console.log('error getting country data', response.data);
                });
        }

        //check if the search topic matches
        function checkTopicHasMatch() {
          vm.hasTopicMatch = false;
          vm.noTopicMatch = false; 
            for (var i = 0; i < vm.data.topics.length; i++) {
                if (vm.data.topics[i].topic == vm.selectedTopic) {
                    vm.item = vm.data.topics[i];
                    var topicId = vm.item.id;
                    topicId = parseInt(topicId);
                    console.log('thisTopicId:', topicId);
                    Data.updateTopicNumberOfHits(topicId);
                    vm.hasTopicMatch = true;
                    vm.noTopicMatch = false;
                    break;
                    // return true;
                }

            }
              if(vm.hasTopicMatch) return;
              vm.hasTopicMatch = false;
              vm.noTopicMatch = true;
              var unmatchedTopic = vm.selectedTopic;
              console.log('unmatched topic:', unmatchedTopic);
              Data.createUnmatchedTopic(unmatchedTopic);
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

(function() {
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams', '$http', 'Data'];

    function ResultsCtrl($location, $routeParams, $http, Data) {
        var vm = this;
        vm.data = Data.data;
        //all show values are set to false on page load
        //their values will change if appropriate
        vm.showIndustryContacts = false;
        vm.showTopicSearch = false;
        vm.noMatch = false;
        vm.hasMatch = false;
        //results.happy means they clicked "YES"
        vm.happy = false;
        //results.unHappy means tey clicked "No"
        vm.unHappy = false;
        //below are the variables which are needed in order
        //to check if there is a match or not a match
        vm.selectedTopic = null;
        vm.selectedCountry = null;
        vm.item = undefined;
        vm.failed = undefined;
        //below are variables needed for user experience and ability
        //to bookmark an address
        vm.industry = $routeParams.industry;
        vm.topic = $routeParams.topic;

        vm.industryList = vm.data.industries;
        // vm.countryList = vm.data.countries;
        vm.displaySelectedTopic = function() {
            vm.topicList = vm.data.topics;
            console.log('vm.topicList', vm.data.topics);
            checkTopicHasMatch();
        };
        vm.displaySelectedCountry = function() {
            checkCountryHasMatch();
        };
        Data.getTopics();
        Data.getUnmatched();
        console.log('getting unmatched topics', vm.data.unmatched);
        Data.getIndustries();
        checkIsOther();
        Data.getFailed();
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

        //get the information in order to make a countryList
        function getCountryList() {
            $http.get('/db/countries').then(function(response) {
                    vm.countryList = response.data.rows;
                },
                function(response) {
                    console.log('error getting country data', response.data);
                });
        }

        //check if the search topic matches information in the DB
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
            if (vm.hasTopicMatch) return;
            vm.hasTopicMatch = false;
            vm.noTopicMatch = true;
            vm.noUnmatchedTopic = true;
            var unmatchedTopic = vm.selectedTopic;
            console.log('unmatched topic:', unmatchedTopic);
            for (var j = 0; j < vm.data.unmatched.length; j++) {
                if (vm.data.unmatched[j].unmatched_topic == vm.selectedTopic) {
                    //  unmatchedTopic == vm.data.unmatched[j];
                    console.log('unmatched topic', vm.data.unmatched[j]);
                    var unmatchedTopicId = vm.data.unmatched[j].id;
                    unmatchedTopicId = parseInt(unmatchedTopicId);
                    console.log('this unmatchedTopicId', unmatchedTopicId);
                    vm.noUnmatchedTopic = false;
                    Data.updateUnmatchedTopicNumberOfHits(unmatchedTopicId);
                    break;
                }

            }
            if (vm.noUnmatchedTopic) {
                Data.createUnmatchedTopic(unmatchedTopic);
            }
        }



        //check if the search country matches info in the DB
        function checkCountryHasMatch() {
            for (var i = 0; i < vm.countryList.length; i++) {
                if (vm.countryList[i].country == vm.selectedCountry) {
                    vm.item = vm.countryList[i];
                    vm.hasCountryMatch = true;
                    vm.noCountryMatch = false;
                    vm.showTopicSearch = false;
                    vm.happy = false;
                    break;
                    // return true;
                } else {
                    vm.hasCountryMatch = false;
                    vm.noCountryMatch = true;
                }

            }
        }


        vm.getFailedTopicResult = function() {
            vm.unHappy = true;
            vm.hasCountryMatch = false;
            vm.noTopicMatch = false;
            vm.happy = false;
            console.log('failed info', vm.data.failed[0]);
            vm.failed = vm.data.failed[0];

        };


        vm.happyGoodbye = function(){
          vm.happy = true;

        };





    }
})();

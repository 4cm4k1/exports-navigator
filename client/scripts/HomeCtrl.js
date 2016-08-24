//client/scripts/HomeCtrl.js User Landing View Controller
(function() {
        'use strict';

        angular.module('exportsNavigator').controller('HomeCtrl', HomeCtrl);

        HomeCtrl.$inject = ['$http'];

        function HomeCtrl($http) {
            var vm = this;

            var industryList = [];

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
          }
        })();


    // $scope.prequalData = [{
    //     label: 'Food-Aggribusiness',
    //     value: 'Food-Aggribusiness'
    // }, {
    //     label: 'Medical Device, Pharma & Life Sciences',
    //     value: 'Medical Device, Pharma & Life Sciences'
    // }, {
    //     label: 'Other',
    //     value: 'Other',
    //     /*isDisabled: true*/
    // }, ];
    // $scope.group = 'Food-Aggribusiness';

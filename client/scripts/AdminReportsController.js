(function() {
    'use strict';

    angular.module('exportsNavigator').controller('AdminReportsController', AdminReportsController);

    AdminReportsController.$inject = ['currentAuth', '$http'];

    function AdminReportsController(currentAuth, $http) {
        var vm = this;

        //this will produce the list of topics and make available the number_of_hits for the adminReports.html
        var topicsList = [];
        vm.getUserData = function() {
            $http.get('/db/topics/number_of_hits').then(function(response) {
                    console.log('getting topics data', response);
                    vm.topicsList = response.data.rows;
                    return (vm.topicsList);
                },
                function(response) {
                    console.log('error getting topics data', response);
                });

        };

        vm.getUserData();



        //this will produce the list of unmatched_topics
        var unmatchedList = [];
        vm.getUnmatched = function() {
            $http.get('/db/unmatched').then(function(response) {
                    console.log('getting unmatched topics ', response);
                    vm.unmatchedList = response.data.rows;
                    return (vm.unmatchedList);
                },
                function(response) {
                    console.log('error getting unmatched topics', response);
                });

        };

        vm.getUnmatched();

        vm.printPage = function() {
            window.print();
        };
    };
})();

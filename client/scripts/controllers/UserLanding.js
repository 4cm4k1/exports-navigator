(function() {
    'use strict';

    angular.module('exportsNavigator').controller('UserLandingCtrl', UserLandingCtrl);

    UserLandingCtrl.$inject = ['UserLanding'];

    function UserLandingCtrl(UserLanding) {
        var vm = this;


    }
})();

// function Ctrl($scope) {
//     $scope.templates = [{
//         name: 'template1.html',
//         url: 'template1.html'},
//     {
//         name: 'template2.html',
//         url: 'template2.html'}];
//     $scope.template = $scope.templates[0];
//
//     $scope.myFunction = function() {
//         $scope.color = 'red';
//     };
// }

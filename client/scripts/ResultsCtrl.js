(function(){
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location'];

    function ResultsCtrl($location){
        var vm = this;

        //  $routeParams.category & $routeParams.searchTerm will be made
        //  available to this controller
    }
})();

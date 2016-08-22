(function(){
    'use strict';

    angular.module('exportsNavigator').controller('ResultsCtrl', ResultsCtrl);

    ResultsCtrl.$inject = ['$location', '$routeParams'];

    function ResultsCtrl($location, $routeParams){
        var vm = this;

        //  $routeParams.category & $routeParams.searchTerm will be made
        //  available to this controller
    }
})();

(function(){
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', Data]);

    function Data($http){
        //  This is the basic framework for our data factory
        this.aTestOfSomethingGreat = function(){
            return 'Yay!';
        };

        this.heresAnotherGreatThing = function(){
            return 'Eureka!';
        };

        //  Possibly group $http calls by /path ???

        //  Return it all

        return this;
    }

})();

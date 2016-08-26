(function(){
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', Data]);

    function Data($http){
      /*
       *  START OF GET * CALLS
       *  START OF PUBLIC
       *
       */

        this.getAllIndustries = function() {
            $http.get('/db/industries').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving industries:', error);
            });
        };

        this.getAllTopics = function() {
            $http.get('/db/topics').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving topics:', error);
            });
        };

        this.getAllCountries = function() {
            $http.get('/db/countries').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving countries:', error);
            });
        };

        /*
         *  END OF PUBLIC
         *  START OF PRIVATE (ADMIN)
         *
         */

        this.getAllContacts = function() {
            $http.get('/db/contacts').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving contacts:', error);
            });
        };

        this.getAllWebsites = function() {
            $http.get('/db/websites').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving websites:', error);
            });
        };

        this.getAllUnmatched = function() {
            $http.get('/db/unmatched').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving unmatched:', error);
            });
        };

        this.getAllTopicsNumberOfHits = function() {
            $http.get('/db/topics/number_of_hits').then(function(response){
                return response.data.rows;
            })
            .catch(function(error){
                console.error('Error retrieving topics number of hits:', error);
            });
        };

        /*
         *  END OF PRIVATE (ADMIN)
         *  END OF GET * CALLS
         *
         */

        //  EXPORT FUNCTIONS
        return this;
    }

})();

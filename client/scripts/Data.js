(function(){
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', '$q', Data]);

    function Data($http, $q){
      var deferred = $q.defer();

      /*
       *  START OF GET * CALLS
       *  START OF PUBLIC
       *
       */

        this.getAllIndustries = function() {
            $http.get('/db/industries')
              .then(function(response){
                  deferred.resolve(response.data.rows);
              })
              .catch(function(error){
                  deferred.reject(error);
              });

              return deferred.promise;
        };

        this.getAllTopics = function() {
            $http.get('/db/topics')
            .then(function(response){
                deferred.resolve(response.data.rows);
            })
            .catch(function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getAllCountries = function() {
            $http.get('/db/countries')
            .then(function(response){
                deferred.resolve(response.data.rows);
            })
            .catch(function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        /*
         *  END OF PUBLIC
         *  START OF PRIVATE (ADMIN)
         *
         */

        this.getAllContacts = function() {
            $http.get('/db/contacts')
            .then(function(response){
                deferred.resolve(response.data.rows);
            })
            .catch(function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getAllWebsites = function() {
            $http.get('/db/websites')
            .then(function(response){
                deferred.resolve(response.data.rows);
            })
            .catch(function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getAllUnmatched = function() {
            $http.get('/db/unmatched')
            .then(function(response){
                deferred.resolve(response.data.rows);
            })
            .catch(function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getAllTopicsNumberOfHits = function() {
            $http.get('/db/topics/number_of_hits')
            .then(function(response){
                deferred.resolve(response.data.rows);
            })
            .catch(function(error){
                deferred.reject(error);
            });

            return deferred.promise;
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

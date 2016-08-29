(function(){
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', Data]);

    function Data($http){

      /*
       *  DATA OBJECT, TO WHICH THE BELOW FUNCTIONS WILL ADD KEYS FOR EACH SET
       *  OF ROWS FROM THE DATABASE (EXPORTED)
       *
       */

      this.data = {};

      /*
       *  START OF GET * CALLS
       *  START OF PUBLIC
       *
       */

        this.getIndustries = function() {
            $http.get('/db/industries')
              .then(function(response){
                  this.data.industries = response.data.rows;
              })
              .catch(function(error){
                  console.error('Error:', error);
              });


        };

        this.getTopics = function() {
            $http.get('/db/topics')
            .then(function(response){
                this.data.topics = response.data.rows;
            })
            .catch(function(error){
                console.error('Error:', error);
            });


        };

        this.getCountries = function() {
            $http.get('/db/countries')
            .then(function(response){
                this.data.countries = response.data.rows;
            })
            .catch(function(error){
                console.error('Error:', error);
            });


        };

        /*
         *  END OF PUBLIC
         *  START OF PRIVATE (ADMIN)
         *
         */

        this.getContacts = function() {
            $http.get('/db/contacts')
            .then(function(response){
                this.data.contacts = response.data.rows;
            })
            .catch(function(error){
                console.error('Error:', error);
            });


        };

        this.getWebsites = function() {
            $http.get('/db/websites')
            .then(function(response){
                this.data.websites = response.data.rows;
            })
            .catch(function(error){
                console.error('Error:', error);
            });


        };

        this.getUnmatched = function() {
            $http.get('/db/unmatched')
            .then(function(response){
                this.data.unmatched = response.data.rows;
            })
            .catch(function(error){
                console.error('Error:', error);
            });


        };

        this.getTopicsNumberOfHits = function() {
            $http.get('/db/topics/number_of_hits')
            .then(function(response){
                this.data.topicsNumberOfHits = response.data.rows;
            })
            .catch(function(error){
                console.error('Error:', error);
            });


        };

        /*
         *  END OF PRIVATE (ADMIN)
         *  END OF GET * CALLS
         *
         */

        //  EXPORT ALL METHODS AND PROPERTIES ATTACHED TO 'THIS'
        return this;
    }

})();

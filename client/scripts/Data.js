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


        /*
         *  START OF POST CALLS
         *  ADMIN ONLY (EXCEPT FOR 'UNMATCHED')
         *
         */

        this.createContact = function(contactObject) {
            //  contactObject has:
            //  first_name, last_name, title, organization, email, phone
            $http.post('/contacts/create', contactObject)
            .then(function(response){
                console.log('Successful POST to /contacts/create');
                this.getContacts();
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        this.createCountry = function(countryObject) {
            //  countryObject has:
            //  contact_id, country
            $http.post('/countries/create', countryObject)
            .then(function(response){
                console.log('Successful POST to /countries/create');
                this.getCountries();
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        this.createIndustry = function(industryObject) {
            //  industryObject has:
            //  industry, note_1, note_2, note_3, contact_1, contact_2,
            //  contact_3, website_1, website_2, website_3
            $http.post('/industries/create', industryObject)
            .then(function(response){
                console.log('Successful POST to /industries/create');
                this.getIndustries();
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        this.createTopic = function(topicObject) {
            //  topicObject has:
            //  topic, note_1, note_2, note_3, contact_1, contact_2,
            //  contact_3, website_1, website_2, website_3
            $http.post('/topics/create', topicObject)
            .then(function(response){
                console.log('Successful POST to /topics/create');
                this.getTopics();
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        this.createWebsite = function(websiteObject) {
            //  websiteObject has:
            //  website
            $http.post('/websites/create', websiteObject)
            .then(function(response){
                console.log('Successful POST to /websites/create');
                this.getWebsites();
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        this.createUnmatchedTopic = function(unmatchedTopicObject) {
            //  unmatchedTopicObject has:
            //  unmatched_topic
            $http.post('/unmatched/create', unmatchedTopicObject)
            .then(function(response){
                console.log('Successful POST to /unmatched/create');
                this.getWebsites();
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        //  EXPORT ALL METHODS AND PROPERTIES ATTACHED TO 'THIS'
        return this;
    }

})();

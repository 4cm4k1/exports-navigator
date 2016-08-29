(function(){
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', '$firebaseAuth', Data]);

    function Data($http, $firebaseAuth){

      /*
       *  DATA OBJECT, TO WHICH THE BELOW FUNCTIONS WILL ADD KEYS FOR EACH SET
       *  OF ROWS FROM THE DATABASE (EXPORTED)
       *
       */

      // this.data = {};

var data = {};
      /*
       *  START OF GET * CALLS
       *  START OF PUBLIC
       *
       */

       var getIndustries = function() {
            $http.get('/db/industries')
              .then(function(response){
                console.log('inside get call', response.data.rows);
                  data.industries = response.data.rows;
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

        /*
         *  START OF MANAGER CALLS (FIREBASE)
         *  ADMIN ONLY
         *
         */

        //  Non-ideal but probably what we have to do
        //  All of these methods ONLY operate on the currently logged in user
        this.createNewUser = function(email, password) {
            Auth.$createUserWithEmailAndPassword(email, password)
            .then(function(user){
                console.log('User', user.uid, 'created successfully!');
            })
            .catch(function(error){
                console.error('Error:', error);
            });
        };

        this.updateUserPassword = function(authObject, newPassword) {
          authObject.$updatePassword(newPassword)
          .then(function() {
              console.log('Password changed successfully!');
          }).catch(function(error) {
              console.error('Error:', error);
          });
        };

        this.updateUserEmail = function(authObject, newEmail) {
          authObject.$updateEmail(newEmail)
          .then(function() {
              console.log('Email changed successfully!');
          }).catch(function(error) {
              console.error('Error:', error);
          });
        };

        this.deleteUser = function(authObject){
            authObject.$deleteUser()
            .then(function() {
                console.log('User deleted successfully!');
            })
            .catch(function(error){
                console.error('Error:', error);
            })
        };

        this.sendPasswordResetEmail = function(authObject, email){
            authObject.$sendPasswordResetEmail(email)
            .then(function(){
                console.log('Password reset email sent successfully!');
            })
            .catch(function(error){
                console.error('Error:', error);
            });
        };

        //  EXPORT ALL METHODS AND PROPERTIES ATTACHED TO 'THIS'
        return {
          data: data,
          getIndustries: getIndustries
        };
    }

})();

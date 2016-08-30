(function() {
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', 'Auth', '$mdToast', Data]);

    function Data($http, Auth, $mdToast) {

        /*
         *  SYNCHRONIZED DATA OBJECT
         */

        var data = {};

        /*
         *  TOAST MAKER
         */

        var showToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        };

        /*
         *  GET CALLS
         */

        var getIndustries = function() {
            return $http.get('/db/industries')
                .then(function(response) {
                    data.industries = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getTopics = function() {
            return $http.get('/db/topics')
                .then(function(response) {
                    data.topics = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getCountries = function() {
            return $http.get('/db/countries')
                .then(function(response) {
                    data.countries = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getContacts = function() {
            return $http.get('/db/contacts')
                .then(function(response) {
                    data.contacts = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getWebsites = function() {
            return $http.get('/db/websites')
                .then(function(response) {
                    data.websites = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getUnmatched = function() {
            return $http.get('/db/unmatched')
                .then(function(response) {
                    data.unmatched = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getTopicsNumberOfHits = function() {
            return $http.get('/db/topics/number_of_hits')
                .then(function(response) {
                    data.topicsNumberOfHits = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        /*
         *  POST CALLS
         */

        var createContact = function(contactObject) {
            //  contactObject has:
            //  first_name, last_name, title, organization, email, phone
            return $http.post('/contacts/create', contactObject)
                .then(function(response) {
                    console.log('Successful POST to /contacts/create');
                    getContacts();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var createCountry = function(countryObject) {
            //  countryObject has:
            //  contact_id, country
            return $http.post('/countries/create', countryObject)
                .then(function(response) {
                    console.log('Successful POST to /countries/create');
                    getCountries();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var createIndustry = function(industryObject) {
            //  industryObject has:
            //  industry, note_1, note_2, note_3, contact_1, contact_2,
            //  contact_3, website_1, website_2, website_3
            return $http.post('/industries/create', industryObject)
                .then(function(response) {
                    console.log('Successful POST to /industries/create');
                    getIndustries();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var createTopic = function(topicObject) {
            //  topicObject has:
            //  topic, note_1, note_2, note_3, contact_1, contact_2,
            //  contact_3, website_1, website_2, website_3
            return $http.post('/topics/create', topicObject)
                .then(function(response) {
                    console.log('Successful POST to /topics/create');
                    getTopics();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var createWebsite = function(websiteObject) {
            //  websiteObject has:
            //  website
            return $http.post('/websites/create', websiteObject)
                .then(function(response) {
                    console.log('Successful POST to /websites/create');
                    getWebsites();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var createUnmatchedTopic = function(unmatchedTopicObject) {
            //  unmatchedTopicObject has:
            //  unmatched_topic
            return $http.post('/unmatched/create', unmatchedTopicObject)
                .then(function(response) {
                    console.log('Successful POST to /unmatched/create');
                    getWebsites();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        /*
         *  FIREBASE CALLS
         */

        var createNewUser = function(email, password) {
            return Auth.$createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    showToast('User ' + user.uid + ' created successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var updateUserPassword = function(newPassword) {
            return Auth.$updatePassword(newPassword)
                .then(function() {
                    showToast('Password changed successfully!');
                }).catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var updateUserEmail = function(newEmail) {
            return Auth.$updateEmail(newEmail)
                .then(function() {
                    showToast('Email changed to ' + newEmail + ' successfully!');
                }).catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var deleteUser = function() {
            return Auth.$deleteUser()
                .then(function() {
                    showToast('User deleted successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var sendPasswordResetEmail = function(email) {
            return Auth.$sendPasswordResetEmail(email)
                .then(function() {
                    showToast('Password reset email sent successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var updateDisplayName = function(displayName) {
          return Auth.$getAuth().updateProfile({
            displayName: displayName
          })
          .then(function() {
              showToast('Display name has been set to ' + displayName + ' successfully!');
          })
          .catch(function(error){
              console.error('Error:', error);
          });
        };

        //  FACTORY-EXPORTED FUNCTIONS AND OBJECTS
        return {
            //  SYNCHRONIZED DATA OBJECT
            data: data,
            //  TOAST MAKER
            //  ...
            //  GET CALLS
            getIndustries: getIndustries,
            getTopics: getTopics,
            getCountries: getCountries,
            getContacts: getContacts,
            getWebsites: getWebsites,
            getUnmatched: getUnmatched,
            getTopicsNumberOfHits: getTopicsNumberOfHits,
            //  POST CALLS
            createCountry: createCountry,
            createTopic: createTopic,
            createContact: createContact,
            createIndustry: createIndustry,
            createWebsite: createWebsite,
            createUnmatchedTopic: createUnmatchedTopic,
            //  PUT CALLS (COMING SOON!)
            //  DELETE CALLS (COMING SOON!)
            //  FIREBASE CALLS
            createNewUser: createNewUser,
            updateUserPassword: updateUserPassword,
            updateUserEmail: updateUserEmail,
            deleteUser: deleteUser,
            sendPasswordResetEmail: sendPasswordResetEmail,
            updateDisplayName: updateDisplayName
        };
    }

})();

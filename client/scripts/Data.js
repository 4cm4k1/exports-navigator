(function() {
    'use strict';

    angular.module('exportsNavigator').factory('Data', ['$http', 'Auth', Data]);

    function Data($http, Auth) {

        /*
         *  SYNCHRONIZED DATA OBJECT
         */

        var data = {};

        /*
         *  GET CALLS
         */

        var getIndustries = function() {
            $http.get('/db/industries')
                .then(function(response) {
                    data.industries = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getTopics = function() {
            $http.get('/db/topics')
                .then(function(response) {
                    data.topics = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getCountries = function() {
            $http.get('/db/countries')
                .then(function(response) {
                    data.countries = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getContacts = function() {
            $http.get('/db/contacts')
                .then(function(response) {
                    data.contacts = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getWebsites = function() {
            $http.get('/db/websites')
                .then(function(response) {
                    data.websites = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getUnmatched = function() {
            $http.get('/db/unmatched')
                .then(function(response) {
                    data.unmatched = response.data.rows;
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var getTopicsNumberOfHits = function() {
            $http.get('/db/topics/number_of_hits')
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
            $http.post('/contacts/create', contactObject)
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
            $http.post('/countries/create', countryObject)
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
            $http.post('/industries/create', industryObject)
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
            $http.post('/topics/create', topicObject)
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
            $http.post('/websites/create', websiteObject)
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
            $http.post('/unmatched/create', unmatchedTopicObject)
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
            Auth.$createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    console.log('User', user.uid, 'created successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var updateUserPassword = function(newPassword) {
            Auth.$updatePassword(newPassword)
                .then(function() {
                    console.log('Password changed successfully!');
                }).catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var updateUserEmail = function(newEmail) {
            Auth.$updateEmail(newEmail)
                .then(function() {
                    console.log('Email changed successfully!');
                }).catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var deleteUser = function() {
            Auth.$deleteUser()
                .then(function() {
                    console.log('User deleted successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var sendPasswordResetEmail = function(email) {
            Auth.$sendPasswordResetEmail(email)
                .then(function() {
                    console.log('Password reset email sent successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        //  FACTORY-EXPORTED FUNCTIONS AND OBJECTS
        return {
            //  SYNCHRONIZED DATA OBJECT
            data: data,
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
            sendPasswordResetEmail: sendPasswordResetEmail
        };
    }

})();

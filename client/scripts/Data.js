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
            return $http.post('/db/contacts/create', contactObject)
                .then(function(response) {
                    console.log('Successful POST to /db/contacts/create');
                    getContacts();
                    showToast('New contact successfully added!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, adding a new contact failed. Please try again.\nError: ' + error);
                });
        };

        var createCountry = function(countryObject) {
            //  countryObject has:
            //  contact_id, country
            return $http.post('/db/countries/create', countryObject)
                .then(function(response) {
                    console.log('Successful POST to /db/countries/create');
                    getCountries();
                    showToast('New country successfully added!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, adding a new country failed. Please try again.\nError: ' + error);
                });
        };

        var createIndustry = function(industryObject) {
            //  industryObject has:
            //  industry, note_1, note_2, note_3, contact_1, contact_2,
            //  contact_3, website_1, website_2, website_3
            return $http.post('/db/industries/create', industryObject)
                .then(function(response) {
                    console.log('Successful POST to /db/industries/create');
                    getIndustries();
                    showToast('New industry successfully added!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, adding a new industry failed. Please try again.\nError: ' + error);
                });
        };

        var createTopic = function(topicObject) {
            //  topicObject has:
            //  topic, note_1, note_2, note_3, contact_1, contact_2,
            //  contact_3, website_1, website_2, website_3
            return $http.post('/db/topics/create', topicObject)
                .then(function(response) {
                    console.log('Successful POST to /db/topics/create');
                    getTopics();
                    showToast('New topic successfully added!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, adding a new topic failed. Please try again.\nError: ' + error);
                });
        };

        var createWebsite = function(websiteObject) {
            //  websiteObject has:
            //  website
            return $http.post('/db/websites/create', websiteObject)
                .then(function(response) {
                    console.log('Successful POST to /db/websites/create');
                    getWebsites();
                    showToast('New website successfully added!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, adding a new website failed. Please try again.\nError: ' + error);
                });
        };

        var createUnmatchedTopic = function(unmatchedTopicObject) {
            //  unmatchedTopicObject has:
            //  unmatched_topic
            return $http.post('/db/unmatched/create', unmatchedTopicObject)
                .then(function(response) {
                    console.log('Successful POST to /db/unmatched/create');
                    getUnmatched();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        /*
         *  PUT CALLS
         */

        var updateContact = function(contactObject) {
            //  contactObject has:
            //  id, first_name, last_name, title, organization, email, phone
            return $http.put('/db/contacts/update', contactObject)
                .then(function(response) {
                    console.log('Successful PUT to /db/contacts/update');
                    getContacts();
                    showToast('Contact successfully updated!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, updating the contact failed. Please try again.\nError: ' + error);
                });
        };

        var updateCountry = function(countryObject) {
            //  countryObject has:
            //  id, contact_id, country
            return $http.put('/db/countries/update', countryObject)
                .then(function(response) {
                    console.log('Successful PUT to /db/countries/update');
                    getCountries();
                    showToast('Country successfully updated!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, updating the country failed. Please try again.\nError: ' + error);
                });
        };

        var updateIndustry = function(industryObject) {
            //  industryObject has:
            //  id, industry, note_1, note_2, note_3, contact_1, contact_2, contact_3, website_1, website_2, website_3
            return $http.put('/db/industries/update', industryObject)
                .then(function(response) {
                    console.log('Successful PUT to /db/industries/update');
                    getIndustries();
                    showToast('Industry successfully updated!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, updating the industry failed. Please try again.\nError: ' + error);
                });
        };

        var updateTopic = function(topicObject) {
            //  topicObject has:
            //  id, topic, note_1, note_2, note_3, contact_1, contact_2, contact_3, website_1, website_2, website_3
            return $http.put('/db/topics/update', topicObject)
                .then(function(response) {
                    console.log('Successful PUT to /db/topics/update');
                    getTopics();
                    showToast('Topic successfully updated!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, updating the topic failed. Please try again.\nError: ' + error);
                });
        };

        var updateTopicNumberOfHits = function(topicIdObject) {
            //  topicIdObject has:
            //  id
            return $http.put('/db/topics/update/number_of_hits', topicIdObject)
                .then(function(response) {
                    console.log('Successful PUT to /db/topics/update/number_of_hits');
                    getTopicsNumberOfHits();
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });
        };

        var updateWebsite = function(websiteObject) {
            //  websiteObject has:
            //  id, website
            return $http.put('/db/websites/update', websiteObject)
                .then(function(response) {
                    console.log('Successful PUT to /db/websites/update');
                    getWebsites();
                    showToast('Website successfully updated!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, updating the website failed. Please try again.\nError: ' + error);
                });
        };

        /*
         *  DELETE CALLS
         */

        var deleteContact = function(contactIdObject) {
            //  contactIdObject has:
            //  id
            return $http.delete('/db/contacts/delete', contactIdObject)
                .then(function(response) {
                    console.log('Successful DELETE to /db/contacts/delete');
                    getContacts();
                    showToast('Contact successfully deleted!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, deleting the contact failed. Please try again.\nError: ' + error);
                });
        };

        var deleteCountry = function(countryIdObject) {
            //  countryIdObject has:
            //  id
            return $http.delete('/db/countries/delete', countryIdObject)
                .then(function(response) {
                    console.log('Successful DELETE to /db/countries/delete');
                    getCountries();
                    showToast('Country successfully deleted!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, deleting the country failed. Please try again.\nError: ' + error);
                });
        };

        var deleteIndustry = function(industryIdObject) {
            //  industryIdObject has:
            //  id
            return $http.delete('/db/industries/delete', industryIdObject)
                .then(function(response) {
                    console.log('Successful DELETE to /db/industries/delete');
                    getIndustries();
                    showToast('Industry successfully deleted!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, deleting the industry failed. Please try again.\nError: ' + error);
                });
        };

        var deleteTopic = function(topicIdObject) {
            //  topicIdObject has:
            //  id
            return $http.delete('/db/topics/delete', topicIdObject)
                .then(function(response) {
                    console.log('Successful DELETE to /db/topics/delete');
                    getTopics();
                    showToast('Topic successfully deleted!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, deleting the topic failed. Please try again.\nError: ' + error);
                });
        };

        var deleteWebsite = function(websiteIdObject) {
            //  websiteIdObject has:
            //  id
            return $http.delete('/db/websites/delete', websiteIdObject)
                .then(function(response) {
                    console.log('Successful DELETE to /db/websites/delete');
                    getWebsites();
                    showToast('Website successfully deleted!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, deleting the website failed. Please try again.\nError: ' + error);
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
                    showToast('Sorry, creating a new user failed. Please try again.\nError: ' + error);
                });
        };

        var updateUserPassword = function(newPassword) {
            return Auth.$updatePassword(newPassword)
                .then(function() {
                    showToast('Password changed successfully!');
                }).catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, changing your password failed. Please try again.\nError: ' + error);
                });
        };

        var updateUserEmail = function(newEmail) {
            return Auth.$updateEmail(newEmail)
                .then(function() {
                    showToast('Email changed to ' + newEmail + ' successfully!');
                }).catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, changing your email address failed. Please try again.\nError: ' + error);
                });
        };

        var deleteUser = function() {
            return Auth.$deleteUser()
                .then(function() {
                    showToast('User deleted successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, deleting the user failed. Please try again.\nError: ' + error);
                });
        };

        var sendPasswordResetEmail = function(email) {
            return Auth.$sendPasswordResetEmail(email)
                .then(function() {
                    showToast('Password reset email sent successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, sending the password reset email failed. Please try again.\nError: ' + error);
                });
        };

        var updateDisplayName = function(displayName) {
            return Auth.$getAuth().updateProfile({
                    displayName: displayName
                })
                .then(function() {
                    showToast('Display name has been set to ' + displayName + ' successfully!');
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    showToast('Sorry, updating your display name failed. Please try again.\nError: ' + error);
                });
        };

        //  FACTORY-EXPORTED FUNCTIONS AND OBJECTS
        return {
            //  SYNCHRONIZED DATA OBJECT
            data: data,
            //  TOAST MAKER
            showToast: showToast,
            //  GET CALLS
            getIndustries: getIndustries,
            getTopics: getTopics,
            getCountries: getCountries,
            getContacts: getContacts,
            getWebsites: getWebsites,
            getUnmatched: getUnmatched,
            getTopicsNumberOfHits: getTopicsNumberOfHits,
            //  POST CALLS
            //  ALL EXCEPT createUnmatchedTopic() CALL
            //  showToast() WITH RELEVANT MESSAGE FOR USER;
            //  ALL ALSO CALL getDataTypeHere() ON SUCCESS
            createCountry: createCountry,
            createTopic: createTopic,
            createContact: createContact,
            createIndustry: createIndustry,
            createWebsite: createWebsite,
            createUnmatchedTopic: createUnmatchedTopic,
            //  PUT CALLS
            //  ALL EXCEPT updateTopicNumberOfHits() CALL
            //  showToast() WITH RELEVANT MESSAGE FOR USER;
            //  ALL ALSO CALL getDataTypeHere() ON SUCCESS
            updateContact: updateContact,
            updateCountry: updateCountry,
            updateIndustry: updateIndustry,
            updateTopic: updateTopic,
            updateTopicNumberOfHits: updateTopicNumberOfHits,
            updateWebsite: updateWebsite,
            //  DELETE CALLS
            //  ALL CALL showToast() WITH RELEVANT MESSAGE FOR USER;
            //  ALL ALSO CALL getDataTypeHere() ON SUCCESS
            deleteContact: deleteContact,
            deleteCountry: deleteCountry,
            deleteIndustry: deleteIndustry,
            deleteTopic: deleteTopic,
            deleteWebsite: deleteWebsite,
            //  FIREBASE CALLS
            //  ALL CALL showToast() WITH RELEVANT MESSAGE FOR USER
            createNewUser: createNewUser, //  PROBABLY WON'T BE USED
            updateUserPassword: updateUserPassword,
            updateUserEmail: updateUserEmail,
            deleteUser: deleteUser, //  PROBABLY WON'T BE USED
            sendPasswordResetEmail: sendPasswordResetEmail,
            updateDisplayName: updateDisplayName
        };
    }

})();

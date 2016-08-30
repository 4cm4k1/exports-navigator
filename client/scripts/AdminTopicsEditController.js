(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams, Data) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;
    // Data.getTopics();
    // Data.getWebsites();
    // Data.getContacts();

    // the url dictates on which topic "Update" was clicked
    vm.topicId = parseInt($routeParams.itemID);
    // var index = $routeParams.itemID;
    // index = parseInt(index);
    // vm.index = index;


    vm.update = function() {
      console.log('Update clicked');
    };



    // OLD CODE


    // $http.get('/db/topics').then(function(response) {
    // // Data.getAllTopics();
    //   for (var i = 0; i < response.data.rows.length; i++) {
    //     // pushes each row from the topics table into list array
    //     list.push(response.data.rows[i]);
    //   }

      // the all of the information that corresponds to the topic selected
      // // on /admin/topics is now assigned to vm.topics
      // var index = $routeParams.itemID;
      // index = parseInt(index);
      // vm.topic = list[index];

      // to display contacts on the page, only if they are stored
      // if (list[index].first_name_1 !== null) {
      //   vm.contact_1 = 'Contact 1 is set to: ' + list[index].first_name_1 + ' ' +
      //   list[index].last_name_1;
      // }
      // else {
      //   vm.contact_1 = 'Contact 1 is not stored';
      // }
      // if (list[index].first_name_2 !== null) {
      //   vm.contact_2 = 'Contact 2 is set to: ' + list[index].first_name_2 + ' ' +
      //   list[index].last_name_2;
      // }
      // else {
      //   vm.contact_2 = 'Contact 2 is not stored';
      // }
      // if (list[index].first_name_3 !== null) {
      //   vm.contact_3 = 'Contact 3 is set to: ' + list[index].first_name_3 + ' ' +
      //   list[index].last_name_3;
      // }
      // else {
      //   vm.contact_3 = 'Contact 3 is not stored';
      // }


    //   // to display websites on the page, only if they are stored
    //   if (list[index].website_1 !== null) {
    //     vm.website_1 = 'Website 1 is set to: ' + list[index].website_1;
    //   } else {
    //     vm.website_1 = 'Website 1 is not stored';
    //   }
    //   if (list[index].website_2 !== null) {
    //     vm.website_2 = 'Website 2 is set to: ' + list[index].website_2;
    //   } else {
    //     vm.website_2 = 'Website 2 is not stored';
    //   }
    //   if (list[index].website_3 !== null) {
    //     vm.website_3 = 'Website 3 is set to: ' + list[index].website_3;
    //   } else {
    //     vm.website_3 = 'Website 3 is not stored';
    //   }
    // });

    //
    // // to populate the website select elements with all websites in database
    // $http.get('/db/websites').then(function(response) {
    //
    //   // add all of the information about a website as an object to an array
    //   for (var i = 0; i < response.data.rows.length; i++) {
    //     websiteList.push(response.data.rows[i]);
    //   }
    //
    //   // vm.websites can access the array of objects that is websiteList
    //   vm.websites = websiteList;
    //   console.log('website list:', websiteList);
    // });


    // // to populate the contact select elements with all contacts in database
    // $http.get('/db/contacts').then(function(response) {
    //   // console.log('contacts:', response);
    //
    //   // add all of the information about a contact as an object to an array
    //   for (var i = 0; i < response.data.rows.length; i++) {
    //     contactList.push(response.data.rows[i]);
    //   }
    //
    //   // vm.contacts can access the array of objects that is contactList
    //   vm.contacts = contactList;
    // });


    // when "Update" is clicked at the bottom of the page
    // vm.update = function() {
      // $http.put('/db/topics/update').then(function(request, response) {
      //   console.log(request.body);
      //   response.sendStatus(200);
      // });

    // };
  }
})();

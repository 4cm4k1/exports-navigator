(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams) {
    var vm = this;

    var list = [];
    var contactList = [];

    $http.get('/db/topics').then(function(response) {

      for (var i = 0; i < response.data.rows.length; i++) {

        // pushes each row from the topics table into list array
        list.push(response.data.rows[i]);

        // // if there is an entry for contact 1, push first and last name to contactList array
        // if (response.data.rows[i].first_name_1 != null) {
        //   contactList.push(response.data.rows[i].first_name_1 + ' ' + response.data.rows[i].last_name_1);
        // }
        //
        // // if there is an entry for contact 2, push first and last name to contactList array
        // if (response.data.rows[i].first_name_2 != null) {
        //   contactList.push(response.data.rows[i].first_name_2 + ' ' + response.data.rows[i].last_name_2);
        // }
        //
        // // if there is an entry for contact 3, push first and last name to contactList array
        // if (response.data.rows[i].first_name_3 != null) {
        //   contactList.push(response.data.rows[i].first_name_3 + ' ' + response.data.rows[i].last_name_3);
        // }
      }

      // the all of the information that corresponds to the topic selected
      // on /admin/topics is now assigned to vm.topics
      var index = $routeParams.itemID;
      index = parseInt(index);
      vm.topic = list[index];

      // to display contacts on the page, only if they are stored
      if (list[index].first_name_1 !== null) {
        vm.contact_1 = 'Contact 1 is set to: ' + list[index].first_name_1 + ' ' +
        list[index].last_name_1;
      }
      else {
        vm.contact_1 = 'Contact 1 is not stored';
      }
      if (list[index].first_name_2 !== null) {
        vm.contact_2 = 'Contact 2 is set to: ' + list[index].first_name_2 + ' ' +
        list[index].last_name_2;
      }
      else {
        vm.contact_2 = 'Contact 2 is not stored';
      }
      if (list[index].first_name_3 !== null) {
        vm.contact_3 = 'Contact 3 is set to: ' + list[index].first_name_3 + ' ' +
        list[index].last_name_3;
      }
      else {
        vm.contact_3 = 'Contact 3 is not stored';
      }

    });

    $http.get('/db/contacts').then(function(response) {
      console.log('contacts:', response);
      for (var i = 0; i < response.data.rows.length; i++) {
        contactList.push(response.data.rows[i]);
      }
      vm.contacts = contactList;
    });

    vm.update = function() {
      // $http.put('/db/topics/update').then(function(request, response) {
      //   console.log(request.body);
      //   response.sendStatus(200);
      // });


      console.log(vm.selectedContact);
    };

  }
})();

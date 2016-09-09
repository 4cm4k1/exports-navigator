(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsAddController', AdminTopicsAddController);

  AdminTopicsAddController.$inject = ['currentAuth', 'Data'];

  function AdminTopicsAddController(currentAuth, Data) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;

    Data.getContacts();
    Data.getWebsites();

    vm.add = function() {

      // to make empty values null instead of undefined
      var newContact1 = null;
      var newContact2 = null;
      var newContact3 = null;
      var newWebsite1 = null;
      var newWebsite2 = null;
      var newWebsite3 = null;

      // get the ID of the contact entered only if it has been entered
      if (vm.newContact_1 !== undefined) {
        newContact1 = parseInt(vm.newContact_1.id);
      }
      if (vm.newContact_2 !== undefined) {
        newContact2 = parseInt(vm.newContact_2.id);
      }
      if (vm.newContact_3 !== undefined) {
        newContact3 = parseInt(vm.newContact_3.id);
      }

      // get the ID of the website entered only if it has been entered
      if (vm.newWebsite_1 !== undefined) {
        newWebsite1 = parseInt(vm.newWebsite_1.id);
      }
      if (vm.newWebsite_2 !== undefined) {
        newWebsite2 = parseInt(vm.newWebsite_2.id);
      }
      if (vm.newWebsite_3 !== undefined) {
        newWebsite3 = parseInt(vm.newWebsite_3.id);
      }

      // grab all of the information needed for the object to be POSTed
      var newTopic = {
        topic: vm.newTopic,
        note_1: vm.newNote_1,
        note_2: vm.newNote_2,
        note_3: vm.newNote_3,
        contact_1: newContact1,
        contact_2: newContact2,
        contact_3: newContact3,
        website_1: newWebsite1,
        website_2: newWebsite2,
        website_3: newWebsite3
      };

      console.log('newTopic: ', newTopic);
      console.log('vm.newWebsite_1: ', vm.newWebsite_1);

      // use the POST function in the data factory
      Data.createTopic(newTopic);
    };
  }
})();

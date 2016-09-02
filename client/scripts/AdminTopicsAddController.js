(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsAddController', AdminTopicsAddController);

  AdminTopicsAddController.$inject = ['currentAuth', 'Data'];

  function AdminTopicsAddController(currentAuth, Data) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;

    vm.add = function() {

      var newContact1 = null;
      var newContact2 = null;
      var newContact3 = null;

      if (vm.newContact_1 !== null) {
        newContact1 = parseInt(vm.newContact_1.id);
      }
      if (vm.newContact_2 !== null) {
        newContact2 = parseInt(vm.newContact_2.id);
      }
      if (vm.newContact_3 !== null) {
        newContact3 = parseInt(vm.newContact_3.id);
      }

      // grab all of the information entered on the DOM
      var newTopic = {
        topic: vm.newTopic,
        note_1: vm.newNote_1,
        note_2: vm.newNote_2,
        note_3: vm.newNote_3,
        contact_1: newContact1,
        contact_2: newContact2,
        contact_3: newContact3,
        website_1: vm.newWebsite_1,
        website_2: vm.newWebsite_2,
        website_3: vm.newWebsite_3
      };

      console.log('newTopic: ', newTopic);
      // use the POST function in the data factory
      Data.createTopic(newTopic);
    };
  }
})();

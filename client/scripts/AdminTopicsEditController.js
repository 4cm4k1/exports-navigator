(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminTopicsEditController', AdminTopicsEditController);

  AdminTopicsEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data', '$location'];

  function AdminTopicsEditController(currentAuth, $http, $routeParams, Data, $location) {
    var vm = this;

    // use the data factory
    vm.data = Data.data;

    // the url dictates on which topic "Update" was clicked
    vm.topicId = parseInt($routeParams.itemID);

    findRecordIndex(vm.topicId);

    console.log('topics at vm.selected: ', vm.data.topics[vm.selected]);

    vm.update = function() {

      var contact1;
      var contact2;
      var contact3;

      if (vm.data.topics[vm.selected].contact_id_1 !== null) {
        contact1 = vm.data.topics[vm.selected].contact_id_1.id;
      } else {
        contact1 = null;
      }

      if (vm.data.topics[vm.selected].contact_id_2 !== null) {
        contact2 = vm.data.topics[vm.selected].contact_id_2.id;
      } else {
        contact2 = null;
      }

      if (vm.data.topics[vm.selected].contact_id_3 !== null) {
        contact3 = vm.data.topics[vm.selected].contact_id_3.id;
      } else {
        contact3 = null;
      }

      var update = {
        id: vm.data.topics[vm.selected].id,
        topic: vm.data.topics[vm.selected].topic,
        note_1: vm.data.topics[vm.selected].note_1,
        note_2: vm.data.topics[vm.selected].note_2,
        note_3: vm.data.topics[vm.selected].note_3,
        contact_1: contact1,
        contact_2: contact2,
        contact_3: contact3,
        website_1: vm.data.topics[vm.selected].website_id_1,
        website_2: vm.data.topics[vm.selected].website_id_2,
        website_3: vm.data.topics[vm.selected].website_id_3
      };
      console.log('contact1:', contact1);
      console.log('contact2:', contact2);
      console.log('no .id:', vm.data.topics[vm.selected].contact_id_3);
      console.log('with .id:', vm.data.topics[vm.selected].contact_id_1.id);
      console.log(vm.data.topics[vm.selected]);
      console.log('website_3:', vm.data.topics[vm.selected].website_id_3);

      console.log('vm.data', vm.data);

      Data.updateTopic(update).then(function(response) {
        console.log('response', response);
      }, function(err) {
        console.log('err:', err);
      });
    };

    vm.delete = function() {
      console.log('vm.data.topics[vm.selected].id:', vm.data.topics[vm.selected].id);
      // gives the user a chance to confirm deletion
      if (confirm("Are you sure you want to delete this topic?")) {
        Data.deleteTopic({id: vm.data.topics[vm.selected].id});
        $location.url('/admin/topics');
      }
    };

    //loop over an array and find where the id matches the id of that index; record the index in vm.selectedRecordIndex
    function findRecordIndex(recordID){
      for(var i=0; vm.data.contacts.length > i; i++){
        if(recordID === vm.data.contacts[i].id){
          vm.selected = i;
          break;
        }
      }
    }
  }
})();

(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminContactsEditController', AdminContactsEditController);

  AdminContactsEditController.$inject = ['currentAuth', '$http', '$routeParams', '$location', 'Data'];

  function AdminContactsEditController(currentAuth, $http, $routeParams, $location, Data) {
    var vm = this;
    vm.data = Data.data;
    vm.selectedContact = parseInt($routeParams.contactID);
    findRecordIndex(vm.selectedContact);

    vm.update = function(){
      var updatedContact = {
        id: vm.selectedContact,
        first_name: vm.data.contacts[vm.selectedRecordIndex].first_name,
        last_name: vm.data.contacts[vm.selectedRecordIndex].last_name,
        title: vm.data.contacts[vm.selectedRecordIndex].title,
        organization: vm.data.contacts[vm.selectedRecordIndex].organization,
        email: vm.data.contacts[vm.selectedRecordIndex].email,
        phone: vm.data.contacts[vm.selectedRecordIndex].phone
      };
      Data.updateContact(updatedContact);
    };

    vm.delete = function(recordID){
      Data.deleteContact(recordID);
    };

    function findRecordIndex(recordID){
      for(var i=0; vm.data.contacts.length > i; i++){
        if(recordID === vm.data.contacts[i].id){
          vm.selectedRecordIndex = i;
          break;
        }
      }
    }
  }
})();

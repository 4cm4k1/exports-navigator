(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminIndustriesEditController', AdminIndustriesEditController);

  AdminIndustriesEditController.$inject = ['currentAuth', '$http', '$routeParams', 'Data', '$location'];

  function AdminIndustriesEditController(currentAuth, $http, $routeParams, Data, $location) {
    var vm = this;

    // use data factory
    vm.data = Data.data;

    // the url dictates on which industry "Update" was clicked
    vm.selectedIndustry = parseInt($routeParams.itemID);
    findRecordIndex(vm.selectedIndustry);

    //loop over an array and find where the id matches the id of that index; record the index in vm.selectedRecordIndex
function findRecordIndex(recordID){
      for(var i=0; vm.data.industries.length > i; i++){
        if(recordID === vm.data.industries[i].id){
          vm.selectedRecordIndex = i;
          break;
        }
      }
    }

  
    console.log('industry array index', vm.selectedRecordIndex);
    console.log('industry object id', vm.selectedIndustry);

    Data.getIndustries();
    Data.getWebsites();
    Data.getContacts();


    // vm.selectedIndustry = vm.data.industries[vm.i];

    vm.update = function() {
      console.log('Update clicked');


            var contact1;
            var contact2;
            var contact3;

            if (vm.data.industries[vm.selectedRecordIndex].contact_id_1 !== null) {
              contact1 = vm.data.industries[vm.selectedRecordIndex].contact_id_1;
            } else {
              contact1 = null;
            }

            if (vm.data.industries[vm.selectedRecordIndex].contact_id_2 !== null) {
              contact2 = vm.data.industries[vm.selectedRecordIndex].contact_id_2;
            } else {
              contact2 = null;
            }

            if (vm.data.industries[vm.selectedRecordIndex].contact_id_3 !== null) {
              contact3 = vm.data.industries[vm.selectedRecordIndex].contact_id_3;
            } else {
              contact3 = null;
            }

            console.log('contact_id_1', contact1);

          vm.update = function(){
            var update = {
              id: vm.selectedIndustry,
              industry: vm.data.industries[vm.selectedRecordIndex].industry,
              note_1: vm.data.industries[vm.selectedRecordIndex].note_1,
              note_2: vm.data.industries[vm.selectedRecordIndex].note_2,
              note_3: vm.data.industries[vm.selectedRecordIndex].note_3,
              contact_1: contact1,
              contact_2: contact2,
              contact_3: contact3,
              website_1: vm.data.industries[vm.selectedRecordIndex].website_id_1,
              website_2: vm.data.industries[vm.selectedRecordIndex].website_id_2,
              website_3: vm.data.industries[vm.selectedRecordIndex].website_id_3
            };
              Data.updateIndustry(update);
          };

            // console.log('contact1:', contact1);
            // console.log('contact2:', contact2);
            // console.log('no .id:', vm.industryId, vm.data.industries[vm.industryId].contact_id_3);
            // console.log('with .id:', vm.data.industries[vm.industryId].contact_id_1);
            // console.log(vm.data.industries[vm.industryId]);
            // console.log('website_3:', vm.data.industries[vm.industryId].website_id_3);
            //
            // console.log('vm.data', vm.data);
          //
          //   Data.updateIndustry(update).then(function(response) {
          //     console.log('response', response);
          //   }, function(err) {
          //     console.log('err:', err);
          //   });
          };



          vm.delete = function(itemID) {
            // gives the user a chance to confirm deletion
            if (confirm("Are you sure you want to delete this topic?")) {
              Data.deleteIndustry(itemID);
            }
    };



  }
})();

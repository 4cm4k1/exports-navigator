(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminWebsitesEditController', AdminWebsitesEditController);

  AdminWebsitesEditController.$inject = ['currentAuth', '$http', '$routeParams', '$location', 'Data'];

  function AdminWebsitesEditController(currentAuth, $http, $routeParams, $location, Data) {
    var vm = this;
    vm.data = Data.data;
    vm.selectedWebsite = parseInt($routeParams.websiteID);
    findRecordIndex(vm.selectedWebsite);

    vm.update = function(){
      var updatedWebsite = {
        id: vm.selectedWebsite,
        website: vm.data.websites[vm.selectedRecordIndex].website
      };
      Data.updateWebsite(updatedWebsite);
    };

    vm.delete = function(recordID){
      Data.deleteWebsite(recordID);
    };

    function findRecordIndex(recordID){
      for(var i=0; vm.data.websites.length > i; i++){
        if(recordID === vm.data.websites[i].id){
          vm.selectedRecordIndex = i;
          break;
        }
      }
    }
  }
})();

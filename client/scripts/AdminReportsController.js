(function() {
  'use strict';

  angular.module('exportsNavigator').controller('AdminReportsController', AdminReportsController);

  AdminReportsController.$inject = ['currentAuth', '$http'];

  function AdminReportsController(currentAuth, $http) {
    var vm = this;

    var tempTopicList = [];
    var tempUnmatchedList = [];
//this will produce the list of topics and make available the number_of_hits for the adminReports.html

// for (var i = 0; i< response.data.rows.length; i++) {
//   tempTopicList.push(response.data.rows[i]);
// }

// vm.topicsList = tempTopicList;

var topicsList = [];
vm.getUserData = function(){
  $http.get('/db/topics/number_of_hits').then(function(response){
    console.log('getting topics data', response);
    vm.topicsList = response.data.rows;
    return(vm.topicsList);
  },
  function(response){
    console.log('error getting topics data', response);
  });

  };

vm.getUserData();

//     $http.get('/db/topics').then(function(response){
//       for (var i = 0; i< response.data.rows.length; i++) {
//         tempTopicList.push(response.data.rows[i]);
//       }
//     });


//this will produce the list of unmatched_topics
    $http.get('/db/unmatched').then(function(response){
      for (var i = 0; i< response.data.rows.length; i++) {
        tempUnmatchedList.push(response.data.rows[i]);
      }
    });
    vm.unmatchedList = tempUnmatchedList;
  };

  function printDiv(elementId) {
      var a = document.getElementById('printing-css').value;
      var b = document.getElementById(elementId).innerHTML;
      window.frames["print_frame"].document.title = document.title;
      // window.frames["print_frame"].document.body.innerHTML = '<style>' + a + '</style>' + b;
      window.frames["print_frame"].window.focus();
      window.frames["print_frame"].window.print();
  }
})();

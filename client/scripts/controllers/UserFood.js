(function() {
    'use strict';

    angular.module('exportsNavigator').controller('UserFoodCtrl', UserFoodCtrl);

    UserFoodCtrl.$inject = ['UserFood'];

    function UserFoodCtrl(UserFood) {
        var vm = this;


    }
})();

// <div ng-controller="UserFoodCtrl as food">
//     <select ng-model="uFoodContact" ng-options="t.name for t in templates">
//      <option value="">(blank)</option>
//     </select>
//     url of the template: <tt>{{template.url}}</tt>
//     <hr/>
//     <div ng-include src="template.url" onload='myFunction()'></div>
//   </div>
//
// <!-- template1.html -->
// <script type="text/ng-template" id="template1.html">
//   Content of template1.html
// </script>
//
// <!-- template2.html -->

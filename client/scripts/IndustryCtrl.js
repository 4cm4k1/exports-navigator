// //client/scripts/IndustryCtrl.js User Industry View Controller
// (function() {
//     'use strict';
//
//     angular.module('exportsNavigator').controller('IndustryCtrl', IndustryCtrl);
//     IndustryCtrl.$inject = ['$state', 'industriesService', 'industries', 'industry'];
//
//     function IndustryCtrl(Industry) {
//         var vm = this;
//
//
//     }
// })();
//
//     function industryData($state, industriesService, industries, industry) {
//
//     this.industry = industry.data;
//
//     this.industryQuery = $state.params.query;
//
//     this.industries = industries.data;
//
//     this.saveIndustry = function() {
//         industriesService.saveIndustry(this.industry)
//             .then(function() {
//                 $state.go('industries');
//             });
//     };
//
//     this.searchIndustries = function(query) {
//         if (!query.length) return $state.go('industries');
//
//         $state.go('search', {query: query});
//     };
//
// }

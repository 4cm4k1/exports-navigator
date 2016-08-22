// //client/scripts/CountryCtrl.js User Country View Controller
// (function() {
//     'use strict';
//
//     angular.module('exportsNavigator').controller('CountryCtrl', CountryCtrl);
//     CountryCtrl.$inject = ['$state', 'countryService', 'countries', 'country'];
//
//     function CountryCtrl(Country) {
//         var vm = this;
//
//
//     }
// })();
//
//     function countryData($state, countryService, countries, country) {
//
//     this.country = country.data;
//
//     this.countryQuery = $state.params.query;
//
//     this.country = countries.data;
//
//     this.saveCountry = function() {
//         countryService.saveCountry(this.country)
//             .then(function() {
//                 $state.go('countries');
//             });
//     };
//
//     this.searchCountries = function(query) {
//         if (!query.length) return $state.go('countries');
//
//         $state.go('search', {query: query});
//     };
//
// }

// Code goes here

var app = angular.module("Mitis", [
  'ngAnimate',
  'ui.bootstrap',
  'ui.router'
]);

app.controller("MainCtrl", ["$scope",
  function($scope) {
    console.log('test');
  }
]);

// app.config( function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//   .state('buildings', {
//     url : '/',
//     templateUrl : 'buildings.html'
//   })
//   ;
//   $urlRouterProvider.otherwise("/");
// });

// app.run(function($rootScope, $state) {
//   $rootScope.states = {};
//   function updateStates() {
//     angular.forEach($state.get(), function (state) {
//       $rootScope.states[state.name] = $state.includes(state.name);
//     });
//   }
//   updateStates();
//   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//     updateStates();
//   });
// });
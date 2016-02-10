'use strict';

/**
 * @ngdoc overview
 * @name familyManagerApp
 * @description
 * # familyManagerApp
 *
 * Main module of the application.
 */
var ref = new Firebase("https://jon-test-firebase.firebaseio.com/");

var app = angular
.module('familyManagerApp', [
	"firebase",
	"ui.router"
]);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .state('todo-lists', {
      url: "/todo-lists",
      templateUrl: 'views/todo-lists.html',
      controller: 'TodoCtrl'
    })
    .state('fitness', {
      url: "/fitness",
      templateUrl: 'views/fitness.html',
      controller: 'FitnessCtrl'
    });
});

// Factories
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://jon-test-firebase.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);
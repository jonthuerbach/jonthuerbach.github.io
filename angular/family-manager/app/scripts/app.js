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
  	])
  .config(function($stateProvider, $urlRouterProvider){
	  $urlRouterProvider.otherwise("/dashboard");
	  $stateProvider
	    .state('dashboard', {
	      url: "/dashboard",
	      template: '<h1 class="page-header"><span class="fa fa-dashboard fa-fw"></span>&nbsp;Dashboard</h1>'
	    })
	    .state('todo-lists', {
	      url: "/todo-lists",
	      template: '<h1 class="page-header"><span class="fa fa-list fa-fw"></span>&nbsp;Todo Lists</h1>'
	    });
	});

	// Factories
	app.factory("Auth", ["$firebaseAuth",
	  function($firebaseAuth) {
	    var baseRef = new Firebase("https://jon-test-firebase.firebaseio.com/");
	    return $firebaseAuth(baseRef);
	  }
	]);

	// Controllers
	app.controller("NavCtrl", ["$scope", "Auth", 
	  function($scope, Auth) {
	    $scope.auth = Auth;
	    $scope.auth.$onAuth(function(authData) {
	      $scope.authData = authData;
	    });
	  }
	]);
	app.controller("SampleCtrl", ["$scope", "Auth",
	  function($scope, Auth) {
	    $scope.auth = Auth;
	    $scope.auth.$onAuth(function(authData) {
	      $scope.authData = authData;
	    });
	  }
	]);


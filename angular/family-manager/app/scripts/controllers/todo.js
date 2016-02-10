'use strict';

app.controller("TodoCtrl", ["$scope", "Auth", 
  function($scope, Auth) {
    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });
  }
]);
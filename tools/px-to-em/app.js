var app = angular.module("exampleApp", [
  'ngAnimate'
]);

app.controller("MainCtrl", ["$scope",
  function($scope) {
    
    $scope.baseSize = 16;
    $scope.pxToEM = '';
    $scope.emToPX = '';
    $scope.$watch("pxToEM", function (newValue) {
			$scope.pxToEMResult = newValue / $scope.baseSize;
			console.log(isNaN($scope.pxToEMResult));
		});
		$scope.$watch("emToPX", function (newValue) {
			$scope.emToPXResult = newValue * $scope.baseSize;
		});
		$scope.clearAll = function() {
		  $scope.pxToEM = '';
		  $scope.emToPX = '';
		}
		$scope.fillBaseFont = function() {
		  if ($scope.baseSize === '') {
		    $scope.baseSize = 16;
		  }
		}
  }
]);
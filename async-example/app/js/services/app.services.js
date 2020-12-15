define([
  'angular',
  'app/js/services/test-service/test.service'
], 
function (angular, testService) {
  var appServices = angular.module('app.services', []);
  
  // Add Services
  appServices.service('testService', testService);

  return appServices;
});
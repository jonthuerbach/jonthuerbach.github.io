define([
  'angular',
  'app/main/app.main.component'
], 
function (angular, appMainComponent) {
  var appComponents = angular.module('app.components', []);
  
  // Add Components
  appComponents.component('appMain', appMainComponent);

  return appComponents;
});
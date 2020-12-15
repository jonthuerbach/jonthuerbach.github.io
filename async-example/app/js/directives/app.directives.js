define([
  'angular',
  'app/js/directives/select-on-click/select-on-click.directive'
], 
function (angular, selectOnClick) {
  var appDirectives = angular.module('app.directives', []);
  
  // Add Directives
  appDirectives.directive('selectOnClick', selectOnClick);

  return appDirectives;
});
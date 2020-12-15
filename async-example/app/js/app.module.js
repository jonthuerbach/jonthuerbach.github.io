define([
  'angular',
  'angular-animate',
  'ui-bootstrap',
  'app/js/services/app.services',
  'app/js/directives/app.directives',
  'app/js/app.components',
], 
function (angular, angularAnimate, uiBootstrap, appServices, appDirectives, appComponents) {
  var app = angular.module('AngularApp', [
    'ngAnimate',
    'ui.bootstrap',
    'app.services',
    'app.directives',
    'app.components'
  ]);

  // Init Application
  app.init = function () {
    angular.bootstrap(document, ['AngularApp']);
  };

  return app;
});
'use strict';

(function( angular ){
  angular.module('app.navigation.component', [])
    .component('appNavigation', {
      templateUrl: 'app/js/components/navigation/navigation-tpl.html',
      controller: appNavigationController,
      bindings: {
        user: '<',
        signOut: '&'
      }
    });

    function appNavigationController($log, $scope) {
      var ctrl = this;

      ctrl.$onInit = onInit;
      
      // Init
      function onInit() {
        
      }
    }
})( angular );
// Entry point to application
require.config({
    baseUrl: document.location.href,
    paths: {
        // jQuery
        'jquery': ['https://code.jquery.com/jquery-3.5.1.min',
          'app/js/lib/js/jquery/3.5.1/jquery-3.5.1.min'],
        // AngularJs
        'angular': ['https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.min',
          'app/js/lib/js/angular/1.8.0/angular'],
        // AngularJs
        'angular-animate': ['https://cdnjs.cloudflare.com/ajax/libs/angular-animate/1.8.2/angular-animate.min',
          'app/js/lib/js/angular/1.8.0/angular'],
        // UI-Bootstrap
        'ui-bootstrap': ['https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.6/ui-bootstrap-tpls.min',
          'app/js/lib/js/angular-ui-bootstrap/2.5.6/ui-bootstrap.min']
    },
    shim: {
      'jquery': {
          exports: 'jquery'
      },
      'angular': {
          deps: [ 'jquery' ],
          exports : 'angular'
      },
      'angular-animate': {
          deps: [ 'angular' ]
      },
      'ui-bootstrap': {
          deps: [ 'angular' ]
      }
    }
});

require([
    'app/js/app.module'
  ], 
  function (appModule) {
    appModule.init(); // Initialize the application
});
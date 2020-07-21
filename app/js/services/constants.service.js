'use strict';

(function( angular ){
  angular.module('constants.service', [])
    .service('constantsService', function($log) {
      
      let constants = {
        
        // Responsibilities
        'responsibility.raytheon.sse.1': 'Part of a team responsible for working cross-functionally over various business units to deliver rapid application development solutions',
        'responsibility.raytheon.sse.2': 'Analyze requirements and acceptance criteria to determine the best technical solution to architect and implement',
        'responsibility.raytheon.sse.3': 'Utilize Spring Framework, AngularJS, Selenium, UI-Bootstrap, and Bootstrap to develop responsive web applications which meet the needs of our internal partners',
        'responsibility.raytheon.sse.4': 'Project teams used SAFe Agile project management methodology to execute all projects',
        'responsibility.raytheon.ux.1': 'Responsible for the design and front-end implementation of multiple web and mobile applications across various business units',
        'responsibility.raytheon.ux.2': 'Conduct usability tests and focus groups to drive design decisions toward maximum value for the customer',
        'responsibility.raytheon.ux.3': 'Created a Usability Scorecard to provide metrics for all of our applications to management. The scorecard was used in review meetings and for analysis.',
        'responsibility.uofa.pwd.1': 'Primary web developer responsible for extending and maintaining Drupal-based, campus-wide websites',
        'responsibility.uofa.pwd.2': 'Designed and developed custom Drupal PHP modules which were used across all sites',
        'responsibility.uofa.pwd.3': 'Leadership role in the presentation and rollout of a Drupal theme which became the template for over 50% of all University of Arizona websites',
        'responsibility.uofa.pwdc.1': 'Lead front-end developer responsible for the design and development of Take Charge America project, originating from the Norton School Family and Consumer Sciences',
        'responsibility.uofa.pwdc.2': 'Weekly presentations to management and monthly presentations to the Dean of the school to ensure strategic alignment',
        'responsibility.aw.pc.1': 'Responsible for managing web development projects from inception to launch',
        'responsibility.aw.pc.2': 'Weekly meetings with clients and daily meetings with developers throughout the project process',
        'responsibility.aw.pc.3': 'Worked with designers and developers from across the entire world when it was necessary to outsource',
      };
      
      return constants;
      
    });
})( angular );
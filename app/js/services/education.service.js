'use strict';

(function( angular ){
  angular.module('education.service', [
    'education.factory'
  ])
    .service('educationService', function($log, educationFactory) {
      
      this.generateEducationData = function() {
        let arr = [];
        
        // Education(universityName, schoolName, location, degreeReceived, graduationYear)

        arr.push(new educationFactory('University of Arizona', 'Eller College of Management', 'Tucson, AZ', 'B.S.B.A', 'Marketing', 'MIS', 2010));
        
        return arr;
      };
      
    });
})( angular );
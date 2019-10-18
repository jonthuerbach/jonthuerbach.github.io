'use strict';

(function( angular ){
  angular.module('education.factory', [])
    .factory('educationFactory', function($log) {
      
      class Education {
        
        /* 
         *  Constructor
         */
        constructor(name, unitName, location, degreeReceived, major, minor, yearGraduated) {
          this.name = name;
          this.unitName = unitName;
          this.location = location;
          this.degreeReceived = degreeReceived;
          this.major = major;
          this.minor = minor;
          this.yearGraduated = yearGraduated;
        }

        /*
         *  Methods
         */

      }

      /*
       *  Return Building
       */
      return Education;
      
    });
})( angular );
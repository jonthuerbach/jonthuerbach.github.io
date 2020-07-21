'use strict';

(function( angular ){
  angular.module('job.factory', [])
    .factory('jobFactory', function($log) {
      
      class Job {
        
        /* 
         *  Constructor
         */
        constructor(companyName, startDate, endDate, location, jobTitle, summary, responsibilities) {
          this.companyName = companyName;
          this.startDate = startDate;
          this.endDate = endDate;
          this.location = location;
          this.jobTitle = jobTitle;
          this.summary = summary;
          this.responsibilities = responsibilities;
        }

        /*
         *  Methods
         */

      }

      /*
       *  Return Building
       */
      return Job;
      
    });
})( angular );
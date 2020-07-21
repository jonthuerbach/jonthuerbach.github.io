'use strict';

(function( angular ){
  angular.module('job.service', [
    'job.factory',
    'constants.service'
  ])
    .service('jobService', function($log, jobFactory, constantsService) {
      
      this.generateJobData = function() {
        let arr = [];
        
        // Job(companyName, startDate, endDate, location, jobTitle, summary, duties)

        arr.push(new jobFactory('Raytheon Company', '10/2017', null, 'Tucson, AZ', 'Senior Software Engineer', null, [constantsService['responsibility.raytheon.sse.1'], constantsService['responsibility.raytheon.sse.2'], constantsService['responsibility.raytheon.sse.3'], constantsService['responsibility.raytheon.sse.4']]));

        arr.push(new jobFactory('Raytheon Company', '06/2015', '09/2017', 'Tucson, AZ', 'Senior UX Designer', null, [constantsService['responsibility.raytheon.ux.1'], constantsService['responsibility.raytheon.ux.2'], constantsService['responsibility.raytheon.ux.3']]));

        arr.push(new jobFactory('University of Arizona', '07/2013', '05/2015', 'Tucson, AZ', 'Principal Web Developer', null, [constantsService['responsibility.uofa.pwd.1'], constantsService['responsibility.uofa.pwd.2'], constantsService['responsibility.uofa.pwd.3']]));

        arr.push(new jobFactory('University of Arizona', '10/2012', '06/2013', 'Tucson, AZ', 'Senior Web Developer (Contractor)', null, [constantsService['responsibility.uofa.pwdc.1'], constantsService['responsibility.uofa.pwdc.2']]));

        arr.push(new jobFactory('Anchor Wave', '05/2011', '09/2012', 'Tucson, AZ', 'Project Coordinator', null, [constantsService['responsibility.aw.pc.1'], constantsService['responsibility.aw.pc.2'], constantsService['responsibility.aw.pc.3']]));
        
        return arr;
      };
      
    });
})( angular );
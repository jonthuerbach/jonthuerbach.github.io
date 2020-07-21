'use strict';

(function( angular ){
  angular.module('app.main', [
    'education.service',
    'job.service',
    'skill.service'
  ])
    .component('appMain', {
      templateUrl: 'app/app-main-tpl.html',
      controller: appMainController
    });
    
    function appMainController($log, $interval, educationService, jobService, skillService) {
      const ctrl = this;

      // Functions
      const getAllSchools = () => {
        ctrl.schools = angular.copy(educationService.generateEducationData());
      }

      const getAllJobs = () => {
        ctrl.jobs = angular.copy(jobService.generateJobData());
      }

      const getAllSkills = () => {
        ctrl.skills = angular.copy(skillService.generateSkillData());
      }

      const buildPageData = () => {
        getAllSchools();
        getAllJobs();
        getAllSkills();
      }

      
      // Init
      const onInit = () => {
        buildPageData();
      }

      // Alias
      ctrl.$onInit = onInit;
      
    }
})( angular );
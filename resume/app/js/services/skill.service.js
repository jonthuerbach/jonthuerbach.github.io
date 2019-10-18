'use strict';

(function( angular ){
  angular.module('skill.service', [
    'skill.factory'
  ])
    .service('skillService', function($log, skillFactory) {
      
      this.generateSkillData = function() {
        let arr = [];
        
        // Skill(name)

        arr.push(new skillFactory('Java 11'));
        arr.push(new skillFactory('Spring Framework'));
        arr.push(new skillFactory('AngularJS/Angular'));
        arr.push(new skillFactory('NodeJS'));
        arr.push(new skillFactory('Firebase'));
        arr.push(new skillFactory('Selenium'));
        arr.push(new skillFactory('Liquibase'));
        arr.push(new skillFactory('Ionic Framework'));
        arr.push(new skillFactory('UI-Bootstrap'));
        arr.push(new skillFactory('Bootstrap'));
        arr.push(new skillFactory('Javascript (ES6+)'));
        arr.push(new skillFactory('jQuery'));
        arr.push(new skillFactory('HTML5/CSS3'));
        
        return arr;
      };
      
    });
})( angular );
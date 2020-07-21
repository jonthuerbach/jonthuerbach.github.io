'use strict';

(function( angular ){
  angular.module('skill.factory', [])
    .factory('skillFactory', function($log) {
      
      class Skill {
        
        /* 
         *  Constructor
         */
        constructor(name) {
          this.name = name;
        }

        /*
         *  Methods
         */

      }

      /*
       *  Return Building
       */
      return Skill;
      
    });
})( angular );
'use strict';

angular.module('cfaDashboard')
  .directive('scheduledItems', ['$location', function ($location) {
      return {
        restrict: 'E',
        templateUrl: 'directives/scheduled-items/scheduled-items.html',
        scope: {
        	scheduledItems: '='
        },
  
        link: function (scope, elem, attrs) {
        	scope.gotoIntake = function (intakeId) {
  					$location.path('/intakes/' + intakeId);
  				};
        }
      };
    }]);

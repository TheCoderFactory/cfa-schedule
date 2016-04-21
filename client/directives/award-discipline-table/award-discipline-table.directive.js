'use strict';

angular.module('cfaDashboard')
	.directive('awardDisciplineTable', ['$http', '$q', '$location', 'AwardDisciplineService', function ($http, $q, $location, AwardDisciplineService) {
			return {
				restict: 'E',
				templateUrl: 'directives/award-discipline-table/award-discipline-table.html',
				scope: { 
					awardDisciplines: '='
				}, 
				link: function (scope, elem, attrs) {
					
					scope.deleteAwardDiscipline = function (awardDisciplineId) {
			      AwardDisciplineService.deleteAwardDiscipline(awardDisciplineId);
			      scope.awardDisciplines = _.filter(scope.awardDisciplines, function (awardDiscipline) {
			      	return awardDisciplineId !== awardDiscipline._id;
			      });
			    }

			    scope.openIntake = function (intakeId) {
			    	$location.path('/intakes/' + intakeId);
			    };

			    scope.getAwardDisciplines = function () {
			      AwardDisciplineService.getAwardDisciplines()
			        .then(function (awardDisciplines) {
			          scope.awardDisciplines = awardDisciplines.data;
			          console.log(awardDisciplines.data);
			        })
			        .catch(function (err) {
			          scope.error = err;
			        });
			    }();
				}				
			};
		}]);
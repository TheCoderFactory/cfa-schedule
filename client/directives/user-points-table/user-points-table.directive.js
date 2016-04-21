'use strict';

angular.module('cfaDashboard')
	.directive('userPointsTable', ['$location', 'AwardDisciplineService', function ($location, AwardDisciplineService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/user-points-table/user-points-table.html',
			scope: {
				registrationId: '@'
			}, 
			
			link: function (scope, elem, attrs) {


				console.log(attrs.userId);
			// group disciplines
			AwardDisciplineService.getUserAwardDisciplines(attrs.userId)
				.then(function (awardDisciplines) {
					scope.groupedAwardsDisciplines = scope.registrationGroup(awardDisciplines.data);
					_.each(scope.groupedAwardsDisciplines, function (awardDisciplines, regId) {
						 scope.groupedAwardsDisciplines[regId] = scope.disciplineGroup(awardDisciplines);
					});
					console.log(scope.groupedAwardsDisciplines);
				})
				.catch(function (err) {
					scope.error = err;
				});


					
			scope.registrationGroup = function (awardDisciplines) {
				return _.groupBy(awardDisciplines, function (awardDiscipline) {
					return awardDiscipline._registration._id;
				});
			};

			scope.disciplineGroup = function (awardDisciplines) {
				return _.groupBy(awardDisciplines, function (awardDiscipline) {
					return awardDiscipline._id;
				});
			};

				// 

			}
		};
}]);
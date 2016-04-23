'use strict';

angular.module('cfaDashboard')
	.directive('leaderboardTableDetail', ['DashboardService', function (DashboardService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/leaderboard-table-detail/leaderboard-table-detail.html',
			scope: {},
			link: function (scope, elem, attrs) {
				
				scope.settings = DashboardService.settings;
				console.log(scope.settings);
				
				scope.disciplinePoints = function (registrationId, disciplineId) {
					console.log(scope.settings.points[registrationId].disciplines);
					var disciplinePoints = _.find(scope.settings.points[registrationId].disciplines, function (disciplinePointDetails) {
						return disciplinePointDetails._id === disciplineId;
					});
					
					if (disciplinePoints) {
						return disciplinePoints.points;
					} else {
						return 0;
					}
				};
			}

		};
	}]);
'use strict';

angular.module('cfaDashboard')
	.directive('leaderboardTableDetail', ['DashboardService', function (DashboardService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/leaderboard-table-detail/leaderboard-table-detail.html',
			scope: {},
			link: function (scope, elem, attrs) {
				scope.rank = 0;
				scope.settings = DashboardService.settings;
				console.log(scope.settings);
				
				scope.rankedRegistrations = DashboardService.rankedRegistrations();

				scope.$watch('DashboardService.settings', function () {
					scope.rankedRegistrations = DashboardService.rankedRegistrations();
				}, true);
				

			}

		};
	}]);
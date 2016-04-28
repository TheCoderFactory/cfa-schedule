'use strict';

angular.module('cfaDashboard')
	.directive('leaderboardTableDetail', ['DashboardService', 'RegistrationService', function (DashboardService, RegistrationService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/leaderboard-table-detail/leaderboard-table-detail.html',
			scope: {
				awardDetails: '=',
				selectRegistration: '='
			},
			link: function (scope, elem, attrs) {
				scope.rank = 0;
				scope.settings = DashboardService.settings;
				console.log(scope.settings);
				
				scope.rankedRegistrations = DashboardService.rankedRegistrations();

				scope.$watch('DashboardService.settings', function () {
					console.log('Dashboard settings changed from leaderboard-table-detail');
					scope.rankedRegistrations = DashboardService.rankedRegistrations();
				}, true);
				
				scope.getAwardDetails = function (registration) {
					RegistrationService.getAllAwards(registration._id)
						.then(function (registrationAwards) {
							scope.awardDetails = registrationAwards.data;
							scope.selectRegistration = registration;
						})
						.catch(function (err) {
							scope.error = err;
						});
				}

			}

		};
	}]);
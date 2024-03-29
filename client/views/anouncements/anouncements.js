'use strict';

angular.module('cfaDashboard')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/anouncements', {
				templateUrl: 'views/anouncements/anouncements.html',
				controller: 'AnouncementsCtrl',
				controllerAs: 'vm',
        resolve: {
          anouncements: ['AnouncementService', function (AnouncementService) {
            return AnouncementService.getAllAnouncements();
          }]
        }
			});
	}]);
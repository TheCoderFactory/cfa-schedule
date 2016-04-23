'use strict';

angular.module('cfaDashboard')
	.service('DashboardService', [function () {
		var service = {};
		service.settings = {};
		service.settings.intake = {};
		
		service.showDashboardLayout = function () {
			// remove container class from ng-view
			service.settings.container = false;
			// add body position class to body
			service.settings.bodyOffset = true;
			// show dashboard nav bars
			service.settings.dashboardNavs = true;
		};

		service.hideDashboardLayout = function () {
			// add container class from ng-view
			service.settings.container = true;
			// remove body position class to body
			service.settings.bodyOffset = false;
			// hide dashboard nav bars
			service.settings.dashboardNavs = false;
		};


		return service;
	}]);
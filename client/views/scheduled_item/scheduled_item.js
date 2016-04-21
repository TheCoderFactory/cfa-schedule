'use strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/scheduledItems', {
				templateUrl: 'views/scheduled_item/scheduled_item.html',
        controller: 'ScheduledItemCtrl',
        controllerAs: 'vm'
			});
	});
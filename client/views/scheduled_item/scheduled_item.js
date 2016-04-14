'use strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/scheduledItem', {
				templateUrl: 'views/schduled_item/schduled_item.html',
        controller: 'ScheduledItemCtrl',
        controllerAs: 'vm'
			});
	});
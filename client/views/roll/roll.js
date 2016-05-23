'use strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/roll', {
				templateUrl: 'views/roll/roll.html',
        controller: 'RollCtrl',
        controllerAs: 'vm'
			});
	});
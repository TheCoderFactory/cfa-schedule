'user strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/users/:userId', {
				templateUrl: 'views/user/user.html',
				controller: 'UserCtrl',
				controllerAs: 'vm'
			});
	});
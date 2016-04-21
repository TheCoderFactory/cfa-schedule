'user strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/users', {
				templateUrl: 'views/users/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'vm'
			});
	});
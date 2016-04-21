'user strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/users/:userId', {
				templateUrl: 'views/user/user.html',
				controller: 'UserCtrl',
				controllerAs: 'vm',
				resolve: {
					userDetails: ['$route','Auth', function ($route, Auth) {
						console.log($route.current.params.userId);
						return Auth.getUserDetails($route.current.params.userId);
					}] 
				}
			});
	});
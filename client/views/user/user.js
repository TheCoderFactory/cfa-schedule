'user strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/users/:userId', {
				templateUrl: 'views/user/user.html',
				controller: 'UserCtrl',
				controllerAs: 'vm',
				resolve: {
					userDetails: ['$route', '$location','Auth', function ($route, $location, Auth) {
						var currentUser = Auth.getUser();
						// Check user is admin
						if (currentUser.admin || currentUser._id === $route.current.params.userId) {
							// All good, resolve the user details
							return Auth.getUserDetails($route.current.params.userId);
						} else {
							// not admin or the users requested for editing -->reject
              $location.path('/dashboard/intakeSelection');
						}	

						
					}] 
				}
			});
	});
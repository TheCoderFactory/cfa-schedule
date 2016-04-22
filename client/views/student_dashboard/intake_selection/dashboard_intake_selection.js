'use strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/dashboard/intakeSelection', {
				templateUrl: 'views/student_dashboard/intake_selection/dashboard_intake_selection.html',
        controller: 'DashboardIntakeSelectionCtrl',
        controllerAs: 'vm',
        resolve: {
        	userDetails: function ($q, $location, Auth) {
 						var deferred = $q.defer();
        		var userId = Auth.getUser()._id;
        		Auth.getUserDetails(userId)
        			.then(function (userDetails) {
        				if (userDetails.data._registrations.length > 1) {
        					// continue and send user details
        					deferred.resolve(userDetails.data);
        				} else if (userDetails.data._registrations.length === 1){
        					// redirect to summary
        					$location.path('/anouncements');
        				} else {
        					// redurect to root
        					$location.path('/');
        				}
        				
        			});
        			return deferred.promise;
        	}
        }
			});
	});
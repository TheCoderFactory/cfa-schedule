'use strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/dashboard/intakeSelection', {
				templateUrl: 'views/student_dashboard/intake_selection/dashboard_intake_selection.html',
        controller: 'DashboardIntakeSelectionCtrl',
        controllerAs: 'vm',
        resolve: {
        	userDetails: function ($cookieStore, $q, $location, Auth) {
 						var deferred = $q.defer();
        		var userId = Auth.getUser()._id;
        		// temp fix - when refreshing intake selection page no access to user details
        		if(!userId) {$location.path('/'); deferred.reject()}
        		Auth.getUserDetails(userId)
        			.then(function (userDetails) {
        				if (userDetails.data._registrations.length > 1) {
        					// continue and send user details
        					deferred.resolve(userDetails.data);
        				} else if (userDetails.data._registrations.length === 1){
        					// redirect to summary
        					deferred.reject();
        					$location.path('/dashboard/' + userDetails.data._registrations[0]._id + '/summary');
        				} else {
        					// redurect to root
        					deferred.reject();
        					$location.path('/');
        				}
        				
        			});
        			return deferred.promise;
        	}
        }
			});
	});
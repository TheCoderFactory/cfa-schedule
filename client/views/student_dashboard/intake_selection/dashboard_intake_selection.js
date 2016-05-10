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
        		var user = Auth.getUser();
            
        		// temp fix - when refreshing intake selection page no access to user details
        		if(!user) {$location.path('/'); deferred.reject()}
            
            Auth.getUserDetails(user._id)
        			.then(function (userDetails) {
                // Check if the use is admin --> if so show all intakes
                if (user.admin === true) {
                  // continue and send user details
                  deferred.resolve(userDetails.data);
                } else {
                  // not admin check registrations
                  if (userDetails.data._registrations.length > 1) {
                    // continue and send user details
                    deferred.resolve(userDetails.data);
                  } else if (userDetails.data._registrations.length === 1){
                    // redirect to summary
                    deferred.reject();
                    $location.path('/dashboard/' + userDetails.data._registrations[0]._intake._id + '/summary');
                  } else if (userDetails.data._registrations.length === 0) {
                    deferred.resolve(userDetails.data);
                  } else {
                    // redurect to root
                    deferred.reject();
                    $location.path('/');
                  }
                }
        			});
        			return deferred.promise;
        	}, 
          allIntakes: function ($q, Auth, IntakeService) {
            var deferred = $q.defer();
            var user = Auth.getUser();
            
            // Check if the use is admin --> if so show all intakes
            if (user.admin === true) {
              return IntakeService.getAllIntakes();
            } else {
              deferred.resolve();
            }
          }
        }
			});
	});
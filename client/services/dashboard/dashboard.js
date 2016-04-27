'use strict';

angular.module('cfaDashboard')
	.service('DashboardService', ['$q', 'Socket', 'Notification', 'IntakeService', 'ScheduledItemService', 'AnouncementService', 'RegistrationService', 'DisciplineService', function ($q, Socket, Notification, IntakeService, ScheduledItemService, AnouncementService, RegistrationService, DisciplineService) {
		var service = {};
		
		service.settings = {};
		service.settings.intake = {};

		service.getDashboardData = function (intakeId) {
			var deferred = $q.defer();
			// check if a new intake dashboard has been accessed
      console.log(intakeId);
      console.log(service.settings.intake._id);
      if (service.settings.intake._id !== intakeId){
        console.log('getting it all...');
        // get all information for dashboard here -->
        IntakeService.getIntake(intakeId)
        .then(function (intake) {
          service.settings.intake = intake.data;
          return ScheduledItemService.getScheduledItems(intakeId);
        })
        .then(function (scheduledItems) {
        	if (scheduledItems) {
            service.settings.scheduledItems = scheduledItems.data;
          } else {
            service.settings.scheduledItems = {};
          }
        	return AnouncementService.getIntakeAnouncements(intakeId);
        })
        .then(function (anouncements) {
        	if (anouncements) { 
            service.settings.anouncements = anouncements.data;
          } else {
            service.settings.anouncements = {};
          }
        	return RegistrationService.getIntakeRegistrations(intakeId);
        })
        .then(function (registrations) {
        	if (registrations) { 
            service.settings.registrations = registrations.data;
          } else {
            service.settings.registrations = {};
          }
        	return RegistrationService.getIntakePoints(intakeId);
        })
        .then(function (awardPoints) {
        	if (awardPoints) { 
            service.settings.points = awardPoints.data;
          } else {
            service.settings.points = {};
          }
        	return DisciplineService.getDisciplines();
        })
        .then(function (disciplines) {
        	if (disciplines) {
           service.settings.disciplines = disciplines.data;
          } else {
            service.settings.disciplines = {};
          }
        	return deferred.resolve();
        })
        .finally(function (disciplines) {
        	return deferred.resolve();
        })
        .catch(function (err) {
        	console.log(err);
        	return deferred.reject(err);
        });
      } else {
      	// all ready got data, resolve promise
      	deferred.resolve();
      }
      return deferred.promise;
		};

    // socket watchers -->

    // add/remove scheduled items
      // run this function whenever a scheduled item is created. Check if it belongs to intake, if so add it to the settings
    Socket.on('ScheduledItem:save', function (scheduledItem) {
      if(service.settings.intake._id) {
        // only display notification on intake page
        if(scheduledItem._intakes.indexOf(service.settings.intake._id) > 0) {
          Notification.success('New Scheduled item: ' + scheduledItem.name);
          service.settings.scheduledItems[scheduledItem] = scheduledItem;
        }
      }
    });
    // add/remove anouncements
    Socket.on('ScheduledItem:remove', function (scheduledItem) {
      if(service.settings.intake._id) {
        // only display notification on intake page
        if(scheduledItem._intakes.indexOf(service.settings.intake._id) > 0) {
          Notification.success('Deleted Scheduled item: ' + scheduledItem.name);
          service.settings.scheduledItems = _.without(service.settings.scheduledItems, scheduledItem);
        }
      }
    });

    // points added 
    // get points of reg back - update in settings.points
    // watches should update leaderboard and summary
    // show notification
    Socket.on('AwardDiscipline:save', function (registrationPoints) {
      var registrationId = _.keys(registrationPoints.newPoints)[0];
      console.log(registrationId);
      
      if(service.settings.points && service.settings.registrations) {
        var user = service.settings.registrations[registrationId]._user;
        Notification.success(user.firstName + ' ' + user.lastName + 'was awarded ');
        service.settings.points[registrationId] = registrationPoints.newPoints;
      }
    });
    // // add/remove anouncements
    // Socket.on('ScheduledItem:remove', function (scheduledItem) {
    //   if(service.settings.scheduledItems) {
    //     Notification.success(scheduledItem.name);
    //     service.settings.scheduledItems = _.without(service.settings.scheduledItems, scheduledItem);
    //   }
    // });




		
		service.showDashboardLayout = function () {
			// remove container class from ng-view
			service.settings.container = false;
			// add body position class to body
			service.settings.bodyOffset = true;
			// show dashboard nav bars
			service.settings.dashboardNavs = true;
		};

		service.hideDashboardLayout = function () {
			// add container class from ng-view
			service.settings.container = true;
			// remove body position class to body
			service.settings.bodyOffset = false;
			// hide dashboard nav bars
			service.settings.dashboardNavs = false;
		};

		

		service.rankedRegistrations = function () {
			var ranked = _.sortBy(service.settings.registrations, function (registration) {
    		if(service.settings.points[registration._id].totalPoints) {
    			console.log(service.settings.points[registration._id]);
    			return -1 * service.settings.points[registration._id].totalPoints;
    		} else {
    			return 0;
    		}
    	});
    	return ranked;
		};

        
    service.getCurrentScheduledItems = function () {
      var currentItems = _.filter(service.settings.scheduledItems, function (scheduledItem) {
        return moment().isBetween(scheduledItem.start, scheduledItem.end);
      });
      return currentItems;
    }

		return service;
}]);
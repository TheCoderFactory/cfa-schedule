'use strict';

angular.module('cfaDashboard')
.service('DashboardService', ['$q', '$rootScope', 'Socket', 'Notification', 'IntakeService', 'ScheduledItemService', 'AnouncementService', 'RegistrationService', 'DisciplineService', function ($q, $rootScope, Socket, Notification, IntakeService, ScheduledItemService, AnouncementService, RegistrationService, DisciplineService) {
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
          service.settings.registrations = [];
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
          service.settings.disciplines = [];
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
    console.log(scheduledItem);
    if(service.settings.intake._id) {
      // only display notification on intake page
      if(scheduledItem._intakes.indexOf(service.settings.intake._id) > -1) {
        Notification.success('New Scheduled item: ' + scheduledItem.name);

        if (service.settings.scheduledItems.indexOf(scheduledItem) > -1) {
          console.log(scheduledItem);
          service.settings.scheduledItems[scheduledItem] = scheduledItem;
        } else {
          console.log(scheduledItem);
          service.settings.scheduledItems.push(scheduledItem);
        }
        $rootScope.$broadcast('ScheduledItemChanged');
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
        >>>>>>> 476faf800d7c2d78bb45324b74eb862d3f7b31aa
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
  console.log(scheduledItem);
  if(service.settings.intake._id) {
    // only display notification on intake page
    if(scheduledItem._intakes.indexOf(service.settings.intake._id) > -1) {
      Notification.success('New Scheduled item: ' + scheduledItem.name);

      if (service.settings.scheduledItems.indexOf(scheduledItem) > -1) {
        console.log(scheduledItem);
        service.settings.scheduledItems[scheduledItem] = scheduledItem;
      } else {
        console.log(scheduledItem);
        service.settings.scheduledItems.push(scheduledItem);
      }
      $rootScope.$broadcast('ScheduledItemChanged');
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
  });

// add anouncement
Socket.on('Anouncement:save', function (anouncement) {
  console.log(anouncement);
  if(service.settings.intake._id) {
    // only display notification on intake page
    if(anouncement._intakes.indexOf(service.settings.intake._id) > -1) {

      Notification.success('New Anouncement item: ' + anouncement.title);

      if (service.settings.anouncements.indexOf(anouncement) > -1) {
        console.log(anouncement);
        service.settings.anouncements[anouncement] = anouncement;
      } else {
        console.log(anouncement);
        service.settings.anouncements.push(anouncement);
      }
      $rootScope.$broadcast('AnouncementChanged');
    }
  }
});





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
});

// points added 
// get points of reg back - update in settings.points
// watches should update leaderboard and summary
// show notification
Socket.on('AwardDiscipline:save', function (registrationPointsDetails) {
  console.log('socket working');
  if(service.settings.intake._id) {
    var registration = registrationPointsDetails.newAwardDiscipline._registration;
    var user = registration._user;
    var userName = user.firstName + ' ' + user.lastName;

    var award = registrationPointsDetails.newAwardDiscipline._award.name;
    var awardPoints = registrationPointsDetails.newAwardDiscipline._award.value;
    var discipline = registrationPointsDetails.newAwardDiscipline._discipline.name;

    console.log(userName + ' has just been awarded a ' + award + 'valued at ' + awardPoints + ' points for ' + discipline);
    Notification.success(userName + ' has just been awarded a ' + award + 'valued at ' + awardPoints + ' points for ' + discipline);

    service.settings.points[registration._id] = registrationPointsDetails.newPoints;
  }
});






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

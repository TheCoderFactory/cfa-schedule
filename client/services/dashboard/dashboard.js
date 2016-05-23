'use strict';

angular.module('cfaDashboard')
.service('DashboardService', ['$q', '$rootScope', 'Socket', 'Notification', 'IntakeService', 'ScheduledItemService', 'AnouncementService', 'RegistrationService', 'DisciplineService', function ($q, $rootScope, Socket, Notification, IntakeService, ScheduledItemService, AnouncementService, RegistrationService, DisciplineService) {
  var service = {};

  service.settings = {};
  service.settings.intake = {};

  service.getDashboardData = function (intakeId) {
    var deferred = $q.defer();
    // check if a new intake dashboard has been accessed
    if (service.settings.intake._id !== intakeId){
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

        // ensure the navbar coloour is reset to the intake colour
        service.settings.navTextColour = service.settings.intake.colour;
        return deferred.resolve();
      })
      .catch(function (err) {
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
      if(scheduledItem._intakes.indexOf(service.settings.intake._id) > -1) {
        Notification.info('New Scheduled item: ' + scheduledItem.name);

        if (service.settings.scheduledItems.indexOf(scheduledItem) > -1) {
          service.settings.scheduledItems[scheduledItem] = scheduledItem;
        } else {
          service.settings.scheduledItems.push(scheduledItem);
        }
        $rootScope.$broadcast('ScheduledItemChanged');
      }
    }
  });

  Socket.on('ScheduledItem:remove', function (scheduledItem) {
    if(service.settings.intake._id) {
      // only display notification on intake page
      if(scheduledItem._intakes.indexOf(service.settings.intake._id) > -1) {

        Notification.warning('Deleted Scheduled item: ' + scheduledItem.name);
        service.settings.scheduledItems = _.without(service.settings.scheduledItems, scheduledItem);
      }
    }
  });

  // add anouncement
  Socket.on('Anouncement:save', function (anouncement) {
    if(service.settings.intake._id) {
      // only display notification on intake page
      if(anouncement._intakes.indexOf(service.settings.intake._id) > -1) {

        Notification.info('New Anouncement: ' + anouncement.title);

        if (service.settings.anouncements.indexOf(anouncement) > -1) {
          service.settings.anouncements[anouncement] = anouncement;
        } else {
          service.settings.anouncements.push(anouncement);
        }
        $rootScope.$broadcast('AnouncementChanged');
      }
    }
  });

  // remove anouncement
  Socket.on('Anouncement:remove', function (anouncement) {
    if(service.settings.intake._id) {
      // only display notification on intake page
      if(anouncement._intakes.indexOf(service.settings.intake._id) > -1) {

        Notification.warning('Deleted Anouncement: ' + anouncement.title);
        service.settings.anouncements = _.without(service.settings.scheduledItems, anouncement);
      }
    }
  });


  // points added 
  // get points of reg back - update in settings.points
  // watches should update leaderboard and summary
  // show notification
  Socket.on('AwardDiscipline:changed', function (registrationPointsDetails) {
    if(service.settings.intake._id) {
      var registration = registrationPointsDetails.awardDiscipline._registration;
      var user = registration._user;
      var userName = user.firstName + ' ' + user.lastName;

      var award = registrationPointsDetails.awardDiscipline._award.name;
      var awardPoints = registrationPointsDetails.awardDiscipline._award.value;
      var discipline = registrationPointsDetails.awardDiscipline._discipline.name;

      if (registrationPointsDetails.new) {
        Notification.info(userName + ' has just been awarded a ' + award + 'valued at ' + awardPoints + ' points for ' + discipline);
      } else {
        Notification.warning(userName + ' \'s ' + award + 'valued at ' + awardPoints + ' points for ' + discipline + 'has been removed!');
      }

      service.settings.points[registration._id] = registrationPointsDetails.newPoints;
    }
  });

  // remove award-discipline
  Socket.on('AwardDiscipline:remove', function (registrationPointsDetails) {
    if(service.settings.intake._id) {
      var registration = registrationPointsDetails.removedAwardDiscipline._registration;
      var user = registration._user;
      var userName = user.firstName + ' ' + user.lastName;

      var award = registrationPointsDetails.removedAwardDiscipline._award.name;
      var awardPoints = registrationPointsDetails.removedAwardDiscipline._award.value;
      var discipline = registrationPointsDetails.removedAwardDiscipline._discipline.name;

      Notification.warning(userName + ' \'s ' + award + 'valued at ' + awardPoints + ' points for ' + discipline + 'has been removed!');

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

  service.tableNames = function () {
    var disciplines = service.settings.disciplines;
    var names = ["Name"];
    for (var i = 0; i < disciplines.length; i++) {
      names.push(disciplines[i].name);
    }
    names.push("Total");
    return names;
  }

  service.studentPoints = function () {
    var studentPoints = {};
    studentPoints.students = [];
    var regs = service.settings.registrations.filter(function (reg) { return reg.role === "Student"});
    for (var i = 0; i < regs.length; i++) {
      var reg = regs[i];
      studentPoints.students[i] = {};
      studentPoints.students[i].name = reg._user.firstName + ' ' + reg._user.lastName;

      var disciplines = service.settings.disciplines;
      var points = service.settings.points;

      var totalPoints = 0;
      for (var j = 0; j < disciplines.length; j++) {
        var dPoints = points[reg._id][disciplines[j]._id];
        if (dPoints == null) {
          studentPoints.students[i][disciplines[j].name] = 0;
          totalPoints += 0;
        } else {
          studentPoints.students[i][disciplines[j].name] = dPoints.points;
          totalPoints += dPoints.points;
        }
      }
      studentPoints.students[i].Total = totalPoints;

    }
    return studentPoints;
  }

  service.rankedRegistrations = function () {
    var ranked = _.sortBy(service.settings.registrations, function (registration) {
      if(service.settings.points[registration._id].totalPoints) {
        return -1 * service.settings.points[registration._id].totalPoints;
      } else {
        return 0;
      }
    });
    return ranked.filter(function (reg) { return reg.role === "Student"});
  };


  service.getCurrentScheduledItems = function () {
    var currentItems = _.filter(service.settings.scheduledItems, function (scheduledItem) {
      return moment().isBetween(scheduledItem.start, scheduledItem.end);
    });
    return currentItems;
  }

  return service;
}]);

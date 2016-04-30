'use strict';

angular.module('cfaDashboard')
  .directive('scheduledItems', ['$location', '$routeParams', 'ScheduledItemService', function ($location, $routeParams, ScheduledItemService) {
      return {
        restrict: 'E',
        templateUrl: 'directives/scheduled-items/scheduled-items.html',
        scope: {
        	scheduledItems: '=',
          showCreateScheduledItem: '=',
          formScheduledItem: '=',
          edit: '='
        },
  
        link: function (scope, elem, attrs) {
        	
          scope.onIntakePage = function () {
            if ($routeParams.intakeId) {
              scope.hideIntakeSelector = true;
            } else {
              scope.hideIntakeSelector = false;
            }
          }();

          scope.filteredIntakes = [];

          scope.$watch('scheduledItems', function () {
            console.log('scheduledItems changed');
            scope.scheduledItemIntakes();
          }, true);


          scope.gotoIntake = function (intakeId) {
  					$location.path('/intakes/' + intakeId);
  				};
        
          // if this is an intake page, only remove scheduled item for that intake otherwise remove completely
          scope.deleteScheduledItem = function (scheduledItemId) {
            console.log($routeParams);
            if($routeParams.intakeId) {
              ScheduledItemService.removeIntakeFromScheduledItem(scheduledItemId, $routeParams.intakeId)
              .then(function (msg) {
                scope.scheduledItems = _.filter(scope.scheduledItems, function (schItem) {
                  return scheduledItemId !== schItem._id;
                });
                console.log(msg);
              })
              .catch(function (err) {
                scope.error = err;
              });
            } else {
              ScheduledItemService.deleteScheduledItem(scheduledItemId)
              .then(function (msg) {
                scope.scheduledItems = _.filter(scope.scheduledItems, function (schItem) {
                  return scheduledItemId !== schItem._id;
                });
                console.log(msg);
              })
              .catch(function (err) {
                scope.error = err;
              });
            }
            
          };

          scope.editScheduledItemClicked = function (scheduledItem) {
            // show form
            scope.showCreateScheduledItem = true;
            // populate form
            scope.formScheduledItem = scheduledItem;
          };

          // get all intakes of current scheduled items
          scope.scheduledItemIntakes = function () {
            var intakes = [];
            _.each(scope.scheduledItems, function (scheduledItem) {
              _.each(scheduledItem._intakes, function (intake) {
                  intakes.push(intake)
              });
            });
            scope.intakesSelection = _.uniq(intakes, '_id');
            scope.filteredIntakes = scope.intakesSelection;
          };

          scope.addRemoveIntake = function (intakeClicked) {
            if (scope.intakeIncluded(intakeClicked)) {
              scope.filteredIntakes = _.filter(scope.filteredIntakes, function (intake) {
                return intakeClicked._id !== intake._id;
              });
            } else {
              scope.filteredIntakes.push(intakeClicked);
            }
          };

          scope.intakeIncluded = function (intakeTest) {
            return _.some(scope.filteredIntakes, function (intake) {
              return intakeTest._id === intake._id;
            });
          };

          scope.anyIntakesIncluded = function (intakeTests) {
            return _.some(scope.filteredIntakes, function (intake) {
              return _.some(intakeTests, function (intakeTest) {
                return intakeTest._id === intake._id;
              })
            });
          };

        }
      };
    }]);
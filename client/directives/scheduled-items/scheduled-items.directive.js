'use strict';

angular.module('cfaDashboard')
  .directive('scheduledItems', ['$rootScope', '$location', '$routeParams', 'ScheduledItemService', function ($rootScope, $location, $routeParams, ScheduledItemService) {
      return {
        restrict: 'E',
        templateUrl: 'directives/scheduled-items/scheduled-items.html',
        scope: {
          scheduledItems: '=',
        	selectedScheduledItems: '=',
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

          scope.$watch('selectedScheduledItems', function () {
            console.log('scheduled items changed');
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

            // var preEditScheduledItem = angular.copy(scheduledItem);
            // scope.formScheduledItem = preEditScheduledItem;
            scope.formScheduledItem = scheduledItem;
          };

          // get all intakes of current scheduled items
          scope.scheduledItemIntakes = function () {
            var intakes = [];
            console.log(scope.scheduledItems);
            console.log(scope.selectedScheduledItems);
            _.each(scope.selectedScheduledItems, function (scheduledItem) {
              _.each(scheduledItem._intakes, function (intake) {
                  intakes.push(intake)
              });
            });
            scope.intakesSelection = _.uniq(intakes, '_id');
            scope.filteredIntakes = scope.intakesSelection;
            console.log(scope.intakesSelection);
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

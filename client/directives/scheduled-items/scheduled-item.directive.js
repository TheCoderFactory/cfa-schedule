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
        	scope.gotoIntake = function (intakeId) {
  					$location.path('/intakes/' + intakeId);
  				};
        
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
          }
        }
      };
    }]);

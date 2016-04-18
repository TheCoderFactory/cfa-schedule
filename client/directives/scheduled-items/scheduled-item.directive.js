'use strict';

angular.module('cfaDashboard')
  .directive('scheduledItems', ['$location', 'ScheduledItemService', function ($location, ScheduledItemService) {
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

'use strict';

angular.module('cfaDashboard')
	.directive('createScheduleItem', ['$http', '$q', 'ScheduledItemService', 'Auth', function ($http, $q, ScheduledItemService, Auth) {
			return {
				restict: 'E',
				templateUrl: 'directives/create-schedule-item/create-schedule-item.html',
				scope: { 
					formScheduledItem: '=',
					scheduledItems: '=',
					itakeId: '@'
				}, 
				link: function (scope, elem, attrs) {
					
					if (attrs.intakeId) {
						scope.showIntakesList = false;
					} else {
						scope.showIntakesList = true;
					}
					
					scope.createScheduledItem = function () {
						scope.formScheduledItem.hostId = Auth.getUser()._id;
						scope.formScheduledItem.intakeId = attrs.intakeId;
						ScheduledItemService.createScheduledItem(scope.formScheduledItem)
							.then(function (scheduledItems) {
								console.log(scheduledItems);
								scope.scheduledItems.push(scheduledItems.data);
							})
							.catch(function (err) {
								scope.error = err;
							});
						// purge form
						scope.formScheduledItem = {};
						console.log(scope.formScheduledItem);

					}
	
					// for date picker -->
					scope.startDatePickerIsOpen = false;
			    scope.endDatePickerIsOpen = false;
	
					scope.valuationDatePickerOpen = function ($event, whichDate) {
			      if ($event) {
			          $event.preventDefault();
			          $event.stopPropagation(); // This is the magic
			      }
			      if(whichDate === 'start'){
			        scope.startDatePickerIsOpen = true;
			      }else if(whichDate === 'end'){
			        scope.endDatePickerIsOpen = true;
			      }
		      };
	
				}
			
	
			};
		}]);
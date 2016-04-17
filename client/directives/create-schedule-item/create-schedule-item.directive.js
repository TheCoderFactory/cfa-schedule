'use strict';

angular.module('cfaDashboard')
	.directive('createScheduleItem', ['$http', '$q', 'ScheduledItemService', 'Auth', function ($http, $q, ScheduledItemService, Auth) {
			return {
				restict: 'E',
				templateUrl: 'directives/create-schedule-item/create-schedule-item.html',
				scope: { 
					formScheduledItem: '=',
					scheduledItems: '=',
					itakeId: '@',
					showIntakeSelector: '=',
					showIntakes: '=',
					intakes: '='
				}, 
				link: function (scope, elem, attrs) {
					

					if (attrs.intakeId) {
						scope.showIntakesList = false;
						scope.formScheduledItem._intakes = [attrs.intakeId];
					} else {
						scope.showIntakesList = true;
						scope.formScheduledItem._intakes = [];
					}
					
					scope.createScheduledItem = function () {
						//if intake is left empty, fill it with all current intakes
						if(!scope.formScheduledItem._intakes || scope.formScheduledItem._intakes.length < 1) {
							scope.formScheduledItem._intakes = scope.intakes;
						}

						scope.formScheduledItem.hostId = Auth.getUser()._id;
						console.log(scope.formScheduledItem);
						// scope.formScheduledItem._intakes.push(attrs.intakeId);
						ScheduledItemService.createScheduledItem(scope.formScheduledItem)
							.then(function (scheduledItems) {
								scope.scheduledItems.push(scheduledItems.data);
							})
							.catch(function (err) {
								scope.error = err;
							});
						// purge form
						scope.formScheduledItem = {};
						if(!attrs.intakeId) { scope.showIntakes = false; }
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
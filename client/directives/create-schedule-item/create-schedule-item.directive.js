'use strict';

angular.module('cfaDashboard')
	.directive('createScheduleItem', ['$rootScope', '$http', '$q', 'ScheduledItemService', 'Auth', function ($rootScope, $http, $q, ScheduledItemService, Auth) {
			return {
				restict: 'E',
				templateUrl: 'directives/create-schedule-item/create-schedule-item.html',
				scope: { 
					formScheduledItem: '=',
					scheduledItems: '=',
					itakeId: '@',
					showIntakeSelector: '=',
					showIntakes: '=',
					showCreateScheduledItem: '=',
					intakes: '='
				}, 
				link: function (scope, elem, attrs) {
					
					scope.purgeForm = function () {
						
						if (attrs.intakeId) {
							scope.formScheduledItem = {};
							scope.showIntakesList = false;
							scope.formScheduledItem._intakes = [attrs.intakeId];
						} else {
							scope.formScheduledItem = {};
							scope.showIntakesList = true;
							scope.formScheduledItem._intakes = [];
						}
					};

					if(scope.formScheduledItem._id === undefined) {
						scope.purgeForm();
					} 
					

					scope.submitScheduledItemForm = function () {
						if(scope.formScheduledItem._id === undefined) {
							scope.createScheduledItem();
						} else {
							scope.editScheduledItem();
						}
					};
					
					scope.createScheduledItem = function () {
						//if intake is left empty, fill it with all current intakes
						if(!scope.formScheduledItem._intakes || scope.formScheduledItem._intakes.length < 1) {
							scope.formScheduledItem._intakes = scope.intakes;
						}
						scope.formScheduledItem.hostId = Auth.getUser()._id;
						
						// scope.formScheduledItem._intakes.push(attrs.intakeId);
						ScheduledItemService.createScheduledItem(scope.formScheduledItem)
							.then(function (scheduledItem) {
								scope.scheduledItems.push(scheduledItem.data);
								$rootScope.$emit('scheduledItems changed');
								scope.purgeForm();
							})
							.catch(function (err) {
								scope.error = err;
							});
					}

					scope.editScheduledItem = function () {
						ScheduledItemService.editScheduledItem(scope.formScheduledItem)
							.then(function (scheduledItem) {
								scope.showCreateScheduledItem = false;
								scope.purgeForm();
							})
							.catch(function (err) {
								scope.error = err;
							});
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
'use strict';

angular.module('cfaDashboard')
	.directive('createScheduleItem', ['$http', '$q', 'ScheduledItemService', function ($http, $q, ScheduledItemService) {
			return {
				restict: 'E',
				templateUrl: 'directives/create-schedule-item/create-schedule-item.html',
				scope: { 
					formScheduledItem: '=',
					itakeId: '@'
				}, 
				link: function (scope, elem, attrs) {
					
					if (attrs.intakeId) {
						scope.showIntakesList = false;
						scope.formScheduledItem.intake = attrs.intakeId;
					} else {
						scope.showIntakesList = true;
					}
					
					scope.createScheduleItem = function () {
						

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
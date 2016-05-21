'use strict';

angular.module('cfaDashboard')
	.directive('rollForm', ['RegistrationService', 'IntakeService', 'RollService', function (RegistrationService, IntakeService, RollService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/roll/roll-form/roll-form.html',
			require: '^^rollOverlord',
			scope: {},
			link: function (scope, elem, attrs, rollOverlordCtrl) {
				console.log('roll-form init');

				scope.roll = {};
				scope.roll.attendance = [];
				scope.roll.date = moment();

				function init () {
					scope.getIntakes();
				};

				scope.getIntakes = function () {
					IntakeService.getAllIntakes()
						.then(function (intakes) {
							scope.intakes = intakes.data;
							console.log(scope.intakes);
						})
						.catch(function (err) {
							console.log(err);
						});
				};

				scope.getIntakeRegistrations = function (intake) {
					RegistrationService.getIntakeRegistrations(intake._id)
						.then(function (registrations) {
							scope.registrations = _.filter(registrations.data, function (registration) {
			    				return registration.role === 'Student';
			    			});
							scope.roll._intake = intake;
							createFormObject(scope.registrations);
						})
						.catch(function (err) {
							console.log(err);
						});
				}

				scope.createRoll = function () {
					RollService.createRoll(scope.roll)
						.then(function (roll) {
							console.log(roll.data);
							rollOverlordCtrl.rolls.push(roll.data);
						})
						.catch(function (err) {
							console.log(err);
						})
				};

				function createFormObject (registrations) {
					scope.roll.attendance = _.map(registrations, function (reg) {
						return { _registration: reg, attended: true };
					})
				};

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

				init();

			}
		};
	}]);
'use strict';

angular.module('cfaDashboard')
	.directive('rollForm', ['$rootScope', 'RegistrationService', 'IntakeService', 'RollService', function ($rootScope, RegistrationService, IntakeService, RollService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/roll/roll-form/roll-form.html',
			require: '^^rollOverlord',
			scope: {
				showForm: '='
			},
			link: function (scope, elem, attrs, rollOverlordCtrl) {
				console.log('roll-form init');

				scope.edit = false;
				scope.roll = rollOverlordCtrl.roll;
				scope.noIntakeReg = false;

				$rootScope.$on('rollEditClicked', function () {
					scope.roll = rollOverlordCtrl.roll;
					scope.edit = true;
					console.log(scope.edit);
					scope.noIntakeReg = false;
				});

				function init () {
					scope.getIntakes();
				};

				scope.getIntakes = function () {
					IntakeService.getAllIntakes()
						.then(function (intakes) {
							scope.intakes = intakes.data;
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
							if (scope.registrations.length > 0) {
								scope.noIntakeReg = false;
							} else {

								scope.noIntakeReg = true;
							}
							createFormObject(scope.registrations);
							
						})
						.catch(function (err) {
							console.log(err);
						});
				};

				scope.createOrEditRoll = function () {
					if(scope.edit) {
						scope.updateRoll();
					} else {
						scope.createRoll();
					}
				};

				scope.createRoll = function () {

					RollService.createRoll(scope.roll)
						.then(function (roll) {
							rollOverlordCtrl.addRoll(roll.data);
							rollOverlordCtrl.daySelectRoll();
							purgeForm();
						})
						.catch(function (err) {
							console.log(err);
						})
				};

				scope.updateRoll = function () {
					RollService.updateRoll(scope.roll)
						.then(function (roll) {
							rollOverlordCtrl.updateRoll(roll.data);
							purgeForm();
						})
						.catch(function (err) {
							console.log(err);
						});
				};

				scope.cancelForm = function () {
					purgeForm();
				};

				function purgeForm () {
					scope.roll = {};
					scope.edit = false;
					scope.showForm = false;

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
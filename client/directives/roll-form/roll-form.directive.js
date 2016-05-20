'use strict';

angular.module('cfaDashboard')
	.directive('rollForm', ['RegistrationService', 'IntakeService', function (RegistrationService, IntakeService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/roll-form/roll-form.html',
			scope: {},
			link: function (scope, elem, attrs) {
				console.log('roll-form init');

				scope.roll = {};
				scope.roll.attendance = [];

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
							scope.registrations = registrations.data;
							console.log(registrations);
							scope.roll._intake = intake;
							createFormObject(scope.registrations);
						})
						.catch(function (err) {
							console.log(err);
						});
				}

				function createFormObject (registrations) {
					scope.roll.attendance = _.map(registrations, function (reg) {
						return { _registration: reg, attended: true };
					})
				}

				init();

			}
		};
	}]);
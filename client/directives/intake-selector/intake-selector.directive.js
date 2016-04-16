'use strict';

angular.module('cfaDashboard')
	.directive('intakeSelector', ['IntakeService', function (IntakeService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/intake-selector/intake-selector.html',
			scope: {
				formDataIntakes: '=',
				showIntakesClick: '=',
				intakes: '='
			},

			link: function (scope, elem, attrs) {
				scope.showIntakesClick = false;
				
				// Get all intakes on load -->
				IntakeService.getAllIntakes()
					.then(function (intakes) {
						scope.intakes = intakes.data;
					})
					.catch(function (err) {
						scope.error = err;
					});	

				scope.showIntakes = function () {
					if(!scope.intakes) {
						IntakeService.getAllIntakes()
						.then(function (intakes) {
							scope.intakes = intakes.data;
							scope.showIntakesClick = true;
						})
						.catch(function (err) {
							scope.error = err;
						});	
					} else {
						if(scope.showIntakesClick) {
							scope.showIntakesClick = false;
						} else {
							scope.showIntakesClick = true;
						}
					}
				};

				scope.addRemoveIntake = function (intakeClicked) {
					if (scope.intakeIncluded(intakeClicked)) {
						scope.formDataIntakes = _.filter(scope.formDataIntakes, function (intake) {
							return intakeClicked._id !== intake._id;
						});
					} else {
						scope.formDataIntakes.push(intakeClicked);
					}
				};

				scope.intakeIncluded = function (intakeTest) {
					return _.some(scope.formDataIntakes, function (intake) {
						return intakeTest._id === intake._id;
					});
				};
				
			}
		};
	}]);
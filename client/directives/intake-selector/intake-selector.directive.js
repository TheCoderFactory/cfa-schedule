'use strict';

angular.module('cfaDashboard')
	.directive('intakeSelector', ['IntakeService', function (IntakeService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/intake-selector/intake-selector.html',
			scope: {
				formDataIntakes: '=',
				showIntakes: '=',
				intakes: '='
			},

			link: function (scope, elem, attrs) {
				scope.showIntakes = false;

				scope.showIntakesClick = function () {
					if(!scope.intakes) {
						IntakeService.getAllIntakes()
						.then(function (intakes) {
							scope.intakes = intakes.data;
							scope.showIntakes = true;
						})
						.catch(function (err) {
							scope.error = err;
						});	
					} else {
						if(scope.showIntakes) {
							scope.showIntakes = false;
						} else {
							scope.showIntakes = true;
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
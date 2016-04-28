'use strict';

angular.module('cfaDashboard')
	.directive('clock', ['$timeout', function ($timeout) {
		return {
			restrict: 'E',
			templateUrl: 'directives/student_dashboard/clock/clock.html',
			scope: {},
			link: function (scope, elem, attrs) {
				scope.updateTime = function(){
		      $timeout(function(){
		        scope.theClock = new Date();
		        scope.updateTime();
			    },1000);
			  };
  
  			scope.updateTime();
			}

		};
	}]);
'use strict';

angular.module('cfaDashboard')
  .directive('navBar', ['$rootScope', '$location', function ($rootScope, $location) {
      return {
        restrict: 'E',
        templateUrl: 'directives/nav-bar/nav-bar.html',
        link: function (scope, elem, attrs) {
        	
        	// watch url and change navbars when on dashboard/
        	$rootScope.$on("$routeChangeStart", function (event, next, current) {
        		console.log($location.path());
        		console.log($location.path().indexOf('dashboard'));
        		if($location.path().indexOf('dashboard') > 0 && $location.path().indexOf('intakeSelection') < 1) {
        			scope.showSideBar = true;
        		} else {
        			scope.showSideBar = false;
        		}
        	});
        }
      };
    }]);

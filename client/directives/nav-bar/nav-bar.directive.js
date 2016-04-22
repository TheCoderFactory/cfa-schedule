'use strict';

angular.module('cfaDashboard')
  .directive('navBar', ['$routeParams', '$rootScope', '$location', function ($routeParams, $rootScope, $location) {
      return {
        restrict: 'E',
        templateUrl: 'directives/nav-bar/nav-bar.html',
        scope: { container: '='},
        link: function (scope, elem, attrs) {
        	
        	// get refresh event
            scope.$watch('$location.path()', function (){
                scope.intakeId = $routeParams.intakeId;
                if($location.path().indexOf('dashboard') > 0 && $location.path().indexOf('intakeSelection') < 1) {
                    scope.showSideBar = true;
                    scope.container = false;
                } else {
                    scope.showSideBar = false;
                    scope.container = true;
                }
            });

            // watch url and change navbars when on dashboard/
        	$rootScope.$on("$routeChangeStart", function (event, next, current) {
        		if($location.path().indexOf('dashboard') > 0 && $location.path().indexOf('intakeSelection') < 1) {
        			scope.showSideBar = true;
                    scope.container = false;
        		} else {
        			scope.showSideBar = false;
                    scope.container = true;
        		}
        	});

            // get the intakeID for nav bar links
            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                if($location.path().indexOf('dashboard') > 0 && $location.path().indexOf('intakeSelection') < 1) {
                    console.log($routeParams.intakeId);
                    scope.intakeId = $routeParams.intakeId;
                } 
            });


        }
      };
    }]);

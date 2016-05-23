'use strict';

angular.module('cfaDashboard')
  .directive('navBar', ['$routeParams', 'Auth', 'DashboardService', function ($routeParams, Auth, DashboardService) {
      return {
        restrict: 'E',
        templateUrl: 'directives/nav-bar/nav-bar.html',
        scope: { },
        link: function (scope, elem, attrs) {
        	
          scope.Auth = Auth;
          scope.settings = DashboardService.settings;
          scope.intakeId = $routeParams.intakeId;
          scope.settings.navTextColour = scope.settings.intake.colour;

          scope.toggleDisplay = function () {
            if(scope.settings.projectorDisplay) {
              scope.settings.projectorDisplay = false;
              DashboardService.settings.navTextColour = scope.settings.intake.colour;
            } else {
              scope.settings.projectorDisplay =  true;
              DashboardService.settings.navTextColour = '#fff';
            }
          };

        }
      };
    }]);

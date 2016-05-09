'use strict';

angular.module('cfaDashboard')
.directive('studentTable', ['DashboardService', 'RegistrationService', function (DashboardService, RegistrationService) {
  return {
    restrict: 'E',
    templateUrl: 'directives/student_dashboard/student-table/student-table.html',
    scope: {},
    link: function (scope, elem, attrs) {
      scope.settings = DashboardService.settings;
      scope.points = scope.settings.points;
      console.log("FNJFJK");
      console.log(scope.points);

      scope.$watch('scope.settings', function () {
        scope.students = _.filter(scope.settings.registrations, function (registration) {
          return registration.role === "Student";
        });
      });
      console.log("HERE");
      console.log(scope.settings.registrations);

    }
  };
}]);

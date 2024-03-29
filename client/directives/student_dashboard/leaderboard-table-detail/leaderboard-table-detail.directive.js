'use strict';

angular.module('cfaDashboard')
.directive('leaderboardTableDetail', ['DashboardService', 'RegistrationService', function (DashboardService, RegistrationService) {
  return {
    restrict: 'E',
    templateUrl: 'directives/student_dashboard/leaderboard-table-detail/leaderboard-table-detail.html',
    scope: {
      awardDetails: '=',
      selectRegistration: '='
    },
    link: function (scope, elem, attrs) {


      scope.students = DashboardService.studentPoints().students;
      scope.tableNames = DashboardService.tableNames();
      scope.columnWidth = 100/scope.tableNames.length+1;
      scope.leaderRank = 1;

      scope.rank = 0;
      scope.settings = DashboardService.settings;
      scope.sort = {
        column: "Total",
        descending: true
      };

      scope.$watch('settings', function () {
        console.log('Dashboard settings changed from leaderboard-table-detail');
        scope.students = DashboardService.studentPoints().students;
      }, true);

      scope.predicate = function(val) {
        // $scope.corder corresponds to the object property name to sort by
        return val[scope.sort.column];
      }

      scope.selectedCls = function(column) {
        return column == scope.sort.column && 'sort-' + scope.sort.descending;
      };

      scope.changeSorting = function(column) {
        var sort = scope.sort;
        if (sort.column == column) {
          sort.descending = !sort.descending;
        } else {
          sort.column = column;
          sort.descending = true;
        }
      };

      scope.getAwardDetails = function (registration) {
        RegistrationService.getAllAwards(registration._id)
          .then(function (registrationAwards) {
            scope.awardDetails = registrationAwards.data;
            scope.selectRegistration = registration;
          })
        .catch(function (err) {
          scope.error = err;
        });
      }

    }

  };
}]);

'use strict';

angular.module('cfaDashboard')
  .directive('loginForm', ['$location', 'Auth', function ($location, Auth) {

    return {
      restict: 'E',
      templateUrl: 'directives/login-form/login-form.html',
      link: function (scope, element, attrs) {

        scope.login = function () {
          Auth.login(scope.user)
            .then(function () {
              if(Auth.getUser().admin) {
                $location.path('/intakes');
              } else {
                $location.path('/dashboard/intakeSelection');
              }
            })
            .catch(function (err) {
              scope.error = err;
            });
        }
      }
    };
  }]);
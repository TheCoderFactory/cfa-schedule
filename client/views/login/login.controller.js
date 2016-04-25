'use strict';

angular.module('cfaDashboard')
  .controller('LoginCtrl', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'LoginCtrl',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test' },

      /**
       * Login method
       */
      login: function () {
        Auth.login(vm.user)
          .then(function () {
            if(Auth.getUser().admin) {
              $location.path('/intakes');
            } else {
              $location.path('/dashboard/intakeSelection');
            }
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });

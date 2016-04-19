'use strict';

angular.module('cfaDashboard')
  .controller('SignupCtrl', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test', admin: false },

      /**
       * Signup
       */
      signup: function () {
        vm.user._registrations = [];
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });

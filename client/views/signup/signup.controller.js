'use strict';

angular.module('cfaDashboard')
  .controller('SignupCtrl', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      /**
       * Signup
       */
      signup: function () {
        vm.user._registrations = [];
        if (!vm.user.admin) {
          vm.user.admin = false;
        }
        console.log(vm.user);
        Auth.signup(vm.user)
          .then(function () {
            if (Auth.getUser().admin) {
              console.log('admin signed up user');
              vm.user = {};
              vm.message = 'well done, you signed up a user';
            } else {
              $location.path('/');
            }
            
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });

'use strict';

angular.module('cfaDashboard', [
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'btford.socket-io',
  'ui.bootstrap',
  'colorpicker.module',
  'ui-notification'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })
  .run(function ($rootScope, $location, $routeParams, $route,  DashboardService, IntakeService, Auth) {
    
    // get refresh event
    $rootScope.$watch('$location.path()', function (){
        
        if($location.path().indexOf('dashboard') > 0 && $location.path().indexOf('intakeSelection') < 1) {
          DashboardService.showDashboardLayout();
        } else {
           DashboardService.hideDashboardLayout();
        }
    });

    // get the intakeID for nav bar links
    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        if($location.path().indexOf('dashboard') > 0 && $location.path().indexOf('intakeSelection') < 0) {
          // render layout
          DashboardService.showDashboardLayout();
        } else {
          // not dashboard url - hide layout - and clear dashboard settings
          DashboardService.settings.intake = {};
          DashboardService.hideDashboardLayout();
        }
    });

  })
  .run(function ($rootScope, $location, Auth) {

    $rootScope.Auth = Auth;

    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isReadyLogged().catch(function () {
        console.log(next);
        if (next.authenticate) {
          console.log(next);
          $location.path('/');
        }
      });
    });

    // dont allow non -admin to view admin pages
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if(Auth.isLogged()) {
        var currentUser = Auth.getUser();
        if (!currentUser.admin) {
          console.log(currentUser._id);
          console.log(next.$$route);

          if(next.$$route.originalPath.indexOf('dashboard') < 0 && next.$$route.originalPath.indexOf('login') < 0 && next.$$route.originalPath.indexOf('users/') < 0) {
            $location.path('/dashboard/intakeSelection');
          } 
        }
      }
    });

  });

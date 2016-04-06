'use strict';

angular.module('cfaDashboard')
  .service('IntakeService', ['$rootScope', '$cookieStore', '$q', '$http', function ($rootScope, $cookieStore, $q, $http) {

    var service = {};

    service.createIntake = function (formIntakeData) {
      var deferred = $q.defer();
      $http.post('/api/intakes/create', formIntakeData)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.showAllIntakes = function () {
      var deferred = $q.defer();
      $http.get('/api/intakes')
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    return service;
  }]);
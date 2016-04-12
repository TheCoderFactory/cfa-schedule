'use strict';

angular.module('cfaDashboard')
  .service('RegistrationService', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.getUsers = function (intakeId) {
      var intakeId = intakeId || '';
      var deferred = $q.defer();
      $http.get('/api/registration/' + intakeId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

    return service;
  }]);
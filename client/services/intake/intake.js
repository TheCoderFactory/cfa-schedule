'use strict';

angular.module('cfaDashboard')
  .service('IntakeService', ['$q', '$http', function ($q, $http) {
    
    var service = {};

    service.createIntake = function (formIntakeData, _id) {

      if (_id) {
        formIntakeData[id] = _id;
      }

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

    service.getAllIntakes = function () {
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

    service.getIntake = function (_id) {
      var deferred = $q.defer();
      $http.get('/api/intakes/' + _id)
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
'use strict';

angular.module('cfaDashboard')
  .service('ScheduledItemService', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.createScheduledItem = function (formScheduledItem, _id) {

      if (_id) {
        formScheduledItem[id] = _id;
      }

      var deferred = $q.defer();
      $http.post('/api/scheduled_items/create', formScheduledItem)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.getScheduledItems = function (intakeId) {
      var intakeId = intakeId || '';
      var deferred = $q.defer();
      $http.get('/api/scheduled_items/' + intakeId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.getScheduledItem = function (_id) {
      var deferred = $q.defer();
      $http.get('/api/scheduled_items/' + _id)
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
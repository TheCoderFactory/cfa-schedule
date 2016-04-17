'use strict';

angular.module('cfaDashboard')
  .service('ScheduledItemService', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.createScheduledItem = function (formScheduledItem, _id) {

      if (_id) {
        formScheduledItem[id] = _id;
      }

      var deferred = $q.defer();
      $http.post('/api/scheduled_items', formScheduledItem)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

    service.updateScheduledItem = function (scheduledItem) {
      var deferred = $q.defer();
      $http.put('/api/scheduled_items', scheduledItem)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
    };

    service.deleteScheduledItem = function (scheduledItemId) {
      console.log(scheduledItemId);
      var deferred = $q.defer();
      $http.delete('/api/scheduled_items/' + scheduledItemId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
    };

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
    };

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
    };

    return service;
  }]);
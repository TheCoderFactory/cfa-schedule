'use strict';

angular.module('cfaDashboard')
  .service('RegistrationService', ['$q', '$http', function ($q, $http) {

    var service = {};

    service.registerUser = function (formRegisterUser) {
    	var deferred = $q.defer();
    	$http.post('/api/registrations/create', formRegisterUser)
    		.then(function (res) {
    			deferred.resolve(res);
    		})
    		.catch(function (err) {
    			deferred.reject(err.data);
    		});
    		return deferred.promise;
    }

    service.unregisterUser = function (registration) {
      var registrationId = registration._id;
      var userId = registration._user._id;

      var deferred = $q.defer();
      $http.delete('/api/registrations/delete/' + registrationId + '/' + userId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.getIntakeRegistrations = function (intakeId) {
      var deferred = $q.defer();
      $http.get('/api/registrations/' + intakeId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.getIntakePoints = function (intakeId) {
      var deferred = $q.defer();
      $http.get('/api/registrations/intakePoints/' + intakeId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.getPoints = function (registrationId) {
      var deferred = $q.defer();
      console.log('/api/registrations/points/' + registrationId);
      $http.get('/api/registrations/points/' + registrationId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    }

    service.getDisciplineAwards = function (registrationId, disciplineId) {
      var deferred = $q.defer();
      $http.get('/api/registrations/awards/' + registrationId + '/' + disciplineId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

    service.getAllAwards = function (registrationId) {
      var deferred = $q.defer();
      $http.get('/api/registrations/awards/' + registrationId)
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
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

    return service;
  }]);
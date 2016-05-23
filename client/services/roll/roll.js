'use strict';

angular.module('cfaDashboard')
	.service('RollService', ['$q', '$http', function ($q, $http) {
		var service = this;

		service.createRoll = function (roll) {
			var deferred = $q.defer();
			$http.post('/api/roll/', roll)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err);
				});

			return deferred.promise;
		};

		service.getRolls = function () {
			var deferred = $q.defer();
			$http.get('api/roll/')
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		service.deleteRoll = function (rollId) {
			var deferred = $q.defer();
			$http.delete('api/roll/' + rollId)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		service.updateRoll = function (roll) {
			var deferred = $q.defer();
			$http.put('api/roll/' + roll._id, roll)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err);
				});

			return deferred.promise;
		}


		
	}]);
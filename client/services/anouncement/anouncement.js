'use strict';

angular.module('cfaDashboard')
	.service('AnouncementService', ['$q', '$http', function ($q, $http) {

		var service = {};

		service.createAnouncement = function (formAnouncementData) {
			console.log(formAnouncementData);
			var deferred = $q.defer();
			$http.post('/api/anouncements', formAnouncementData)
				.then(function (res) {
					deferred.resolve(res);
				})	
				.catch(function (err) {
					deferred.reject(err.data);
				});

			return deferred.promise;
		};

		service.editAnouncement = function (anouncement) {
			var anouncementId = anouncement._id;
			var deferred = $q.defer();
			$http.put('/api/anouncements/' + anouncementId)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err.data);
				});

			return deferred.promise;
		};

		service.deleteAnouncement = function (anouncement) {
			var anouncementId = anouncement._id;
			var deferred = $q.defer();
			$http.delete('/api/anouncements/' + anouncementId)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err.data);
				});

			return deferred.promise;
		}

		service.getAllAnouncements = function () {
			var deferred = $q.defer();
			$http.get('/api/anouncements')
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					deferred.reject(err.data);
				})

			return deferred.promise;
		}

		return service;

	}]);
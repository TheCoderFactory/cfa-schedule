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
		}


		
	}]);
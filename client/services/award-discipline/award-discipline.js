'use strict';

angular.module('cfaDashboard')
  .service('AwardDisciplineService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
  
  	this.createAwardDiscipline = function (data) {
    	var deferred = $q.defer();
      $http.post('/api/award-disciplines', data)
	      .then(function (res) {
		        deferred.resolve(res);
		      })
		      .catch(function (err) {
		        deferred.reject(err.data);
		      });
		      return deferred.promise;
    }

    this.getAwardDisciplines = function () {
    	var deferred = $q.defer();
			$http.get('/api/award-disciplines')
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
    }

   	this.deleteAwardDiscipline = function (id) {
   		var deferred = $q.defer();
   		$http.delete('/api/award-disciplines/' + id)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}	


  }]);

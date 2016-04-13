'use strict';

angular.module('cfaDashboard')
  .service('AwardService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {

    this.createAward = function (data) {
    	var deferred = $q.defer();
      $http.post('/api/awards', {
    		name: data.name,
    		value: data.value,
    	}).then(function (res) {
    			console.log('Successful Creation')
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
    }

    this.getAwards = function () {
    	var deferred = $q.defer();
			$http.get('/api/awards')
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
    }

   	this.deleteAward = function (award) {
   		var deferred = $q.defer();
  		$http.delete(`/api/awards/${award._id}`)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}	

  }]);

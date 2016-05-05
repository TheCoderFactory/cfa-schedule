'use strict';

angular.module('cfaDashboard')
  .service('AwardService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {

    this.createAward = function (data) {
    	var deferred = $q.defer();
      $http.post('/api/awards', data)
      	.then(function (res) {
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

   	this.deleteAward = function (id) {
   		var deferred = $q.defer();
   		$http.delete('/api/awards/' + id)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}	

		this.editAward = function(award, data){
			var deferred = $q.defer();
			$http.put('/api/awards/' + award._id, data).then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}

  }]);

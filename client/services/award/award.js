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

   	this.deleteAward = function (id) {
   		var deferred = $q.defer();
  		$http.delete(`/api/awards/${id}`)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}	

		this.editAward = function(award, awardData){
			// console.log('Editing: ' + award.name);
			// console.log('With: ' + awardData.name + ' ' + awardData.value);
			var deferred = $q.defer();
			$http.put(`/api/awards/${award._id}`, 
				{ name: awardData.name, 
					value: awardData.value
				}).then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}

  }]);

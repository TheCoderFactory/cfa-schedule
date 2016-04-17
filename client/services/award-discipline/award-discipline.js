'use strict';

angular.module('cfaDashboard')
  .service('AwardDisciplineService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
  
  	this.createAwardDiscipline = function (data) {
  		console.log('createAwardDiscipline' + ' ' + data.award.name 
  			+ ' ' + data.discipline.name + ' ' + data.name )
    	var deferred = $q.defer();
      $http.post('/api/award-discipline', {
      	name: data.name
    	}).then(function (res) {
    			console.log('Successful Creation')
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
    }

    this.getAwardDisciplines = function () {
    	var deferred = $q.defer();
			$http.get('/api/award-discipline')
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
   		$http.delete('/api/award-discipline/' + id)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}	


  }]);

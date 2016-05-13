'use strict';

angular.module('cfaDashboard')
  .service('ProjectService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
	   
	   this.createProject = function (data) {
	   		console.log(data);
	    	var deferred = $q.defer();
	      $http.post('/api/projects', data)
	      	.then(function (res) {
			        deferred.resolve(res);
			      })
			      .catch(function (err) {
			        deferred.reject(err.data);
			      });
			      return deferred.promise;
	    }

	    this.getProjects = function () {
	    	var deferred = $q.defer();
				$http.get('/api/projects')
		      .then(function (res) {
		        deferred.resolve(res);
		      })
		      .catch(function (err) {
		        deferred.reject(err.data);
		      });
		      return deferred.promise;
	    }

  }]);

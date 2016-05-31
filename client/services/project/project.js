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

		this.deleteProject = function (id) {
			var deferred = $q.defer();
			$http.delete('/api/projects/' + id)
				.then(function (res) {
			      deferred.resolve(res);
			    })
			    .catch(function (err) {
			      deferred.reject(err.data);
			    });
			    return deferred.promise;
		}

		this.getGithubData = function(project_name) {
			// var xhr = new XMLHttpRequest();
			//  xhr.open("GET", "https://mighty-peak-8243.herokuapp.com/api/units");
			//  xhr.setRequestHeader('Content-Type', 'application/json');
			//  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
			//  xhr.setRequestHeader("Authorization", 'Token token=51f612d3b2944afdaeea1f5028d7f531');
			//  // Add your code below!
			//  xhr.send();
			//  console.log(xhr.status);
			//  console.log(xhr.body); //print when successful but authorization header isn't letting me.
      var url = 'https://mighty-peak-8243.herokuapp.com/api/github_commits';
      return $http.jsonp(url, {
          params: {
          	  token: '9643e1c3f0fe4610a48f4705b5ee34f0',
              name: project_name,
              callback: 'JSON_CALLBACK'
          }
  		});
  	}
  }]);

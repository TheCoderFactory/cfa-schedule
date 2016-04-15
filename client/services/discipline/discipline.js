'use strict';

angular.module('cfaDashboard')
  .service('DisciplineService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {

		this.createDiscipline = function (data) {
    	var deferred = $q.defer();
      $http.post('/api/disciplines', {
    		name: data.name,
    		description: data.description,
    	}).then(function (res) {
    			console.log('Successful Creation')
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
    }

    this.getDisciplines = function () {
    	var deferred = $q.defer();
			$http.get('/api/disciplines')
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
    }

   	this.deleteDiscipline = function (id) {
   		var deferred = $q.defer();
   		$http.delete('/api/disciplines/' + id)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}	

		this.editDiscipline = function(discipline, disciplineData){
			// console.log('Editing: ' + discipline.name);
			// console.log('With: ' + disciplineData.name + ' ' + disciplineData.description);
			var deferred = $q.defer();
			$http.put('/api/disciplines/' + discipline._id,
				{ name: disciplineData.name, 
					description: disciplineData.description
				}).then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
		}
  }]);

'use strict';

angular.module('cfaDashboard')
  .service('AwardDisciplineService', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
  
  	var service = this;

  	service.createAwardDiscipline = function (data) {
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

    service.getAwardDisciplines = function () {
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

   	service.deleteAwardDiscipline = function (id) {
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

		service.getRegistraionAwardDisciplines = function (registrationId) {
			var deferred = $q.defer();
			$http.get('/api/award-disciplines/registration/' + registrationId)
	      .then(function (res) {
	        deferred.resolve(res);
	      })
	      .catch(function (err) {
	        deferred.reject(err.data);
	      });
	      return deferred.promise;
	    };


			service.summeriseDisciplines = function (registrationAwards) {
				// group the given registration awards by disciplines
				var disciplineAwards = disciplineGroup(registrationAwards);
				console.log(disciplineAwards);
				//for each discipline create an object
				// var disciplineSummary = []
				// _.each(disciplineAwards, function ()

			};

			// function constructor
			function DisciplineDetail (discipline) {
				this._id = discipline._id;
				this.name = discipline.name;
				this.description = discipline.description;
				this.awards = discipline.awards;
				this.totalPoints = discipline.totalPoints;
			}

			function disciplineGroup (awardDisciplines) {
				return _.groupBy(awardDisciplines, function (awardDiscipline) {
					return awardDiscipline._id;
				});
			};

	    return service;
  }]);

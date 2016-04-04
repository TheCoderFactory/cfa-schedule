'use strict';

angular.module('cfaDashboard')
  .service('IntakeService', ['$rootScope', '$cookieStore', '$q', '$http', function ($rootScope, $cookieStore, $q, $http) {

    var service = {};

    service.showAllIntakes = function () {
      var deferred = $q.defer();
      //$http.get('/api/intakes', intakes)
        // .then(function (res) {
          deferred.resolve([{name: "Intake1", _id: 1}, {name: "Intake2", _id: 2}]);
        // })
        // .catch(function (err) {
        //   deferred.reject(err.data);
        // });
        return deferred.promise;
    }

    return service;
  }]);
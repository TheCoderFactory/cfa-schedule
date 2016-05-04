'use strict';

angular.module('cfaDashboard')
  .service('ModalService', ['$q', '$uibModal', function ($q, $uibModal) {

    var service = this;

    service.alert = function (msg) {
      var deferred = $q.defer();

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '../../modals/small_alert.html',
        controller: 'smallAlertCtrl',
        size: 'sm',
        resolve: {
          message: function () {
            return msg;
          }
        }
      });

      // if result resolved unregister user
      modalInstance.result.then(function () {
        deferred.resolve();
      })
      .catch(function () {
        deferred.reject();
      });

      return deferred.promise;

    }

    return service;

  }])
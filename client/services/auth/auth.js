'use strict';

angular.module('cfaDashboard')
  .service('Auth', function ($rootScope, $cookieStore, $q, $http, $location) {

    var service = this;
    var _user = {};
    var _ready = $q.defer();
    
    console.log($cookieStore.get('token'));
    
    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          console.log(res);
          _user = res.data;
        })
        .finally(function () {
          _ready.resolve();
        });
    } else {
      _ready.resolve();
    }

    console.log(_user);
    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    this.signup = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users', user)
        .then(function (res) {
          _user = res.data.user;
          service.setCurrentUser(_user);
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Login
     *
     * @param user
     * @returns {promise}
     */
    this.login = function (user) {
      var deferred = $q.defer();
      $http.post('/auth/local', user)
        .then(function (res) {
          _user = res.data.user;
          service.setCurrentUser(_user);
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Logout
     */
    this.logout = function () {
      service.removeCurrentUser();
      $cookieStore.remove('token');
      _user = {};
      $location.path('/');
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    this.isLogged = function () {
      return _user.hasOwnProperty('_id');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    this.isReadyLogged = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
        if (_user.hasOwnProperty('_id')) {
          def.resolve();
        } else {
          def.reject();
        }
      });
      return def.promise;
    };

   
    // methods -->

    
    this.getUser = function () {

      if(service._user) {
        return service._user;
      } else if($cookieStore.get('user')) {
        service.setCurrentUser($cookieStore.get('user'));
        return service._user;
      } else {
        return {};
      }
    };

    this.setCurrentUser = function(u){
       service._user = u;
       $cookieStore.put('user', u);
    };

    this.removeCurrentUser = function(){
        service._user = null;
        $cookieStore.remove('user');
    }

    // USER SERVER REQUESTS -->


    this.getUserDetails = function (userId) {
      var deferred = $q.defer();
      
      $http.get('api/users/' + userId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

    this.getUsers = function () {
      var deferred = $q.defer();
      $http.get('/api/users')
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

    this.getUnregisteredUsers = function (intakeId) {
      var deferred = $q.defer();
      $http.get('/api/users/exclude/' + intakeId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

    this.checkRegistration = function (userId, intakeId) {
      var deferred = $q.defer();
      $http.get('/api/users/checkRegistration/' + userId + '/' + intakeId)
        .then(function (res) {
          deferred.resolve(res);
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
        return deferred.promise;
    };

  });

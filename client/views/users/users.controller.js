'use strict';

angular.module('cfaDashboard')
	.controller('UsersCtrl', ['Auth', function (Auth) {
		var vm = this;
		vm.teacherUsers = [];
		vm.studentUsers = [];
		vm.taUsers = [];
		vm.unregisteredUsers = [];

		// call db to get all users
		Auth.getUsers()
			.then(function (users) {
				var allUsers = users.data;
				//loop through users and sort them in to teachers and students
				_.each(allUsers, function (user) {
					if(_.some(user._registrations, function (reg) {
						return reg.role === 'Teacher';
					})){
						vm.teacherUsers.push(user);
					} 

					if(_.some(user._registrations, function (reg) {
						return reg.role === 'Student';
					})) {
						vm.studentUsers.push(user);
					}

					if(_.some(user._registrations, function (reg) {
						return reg.role === 'TA';
					})) {
						vm.taUsers.push(user);
					}

					if(user._registrations === null || user._registrations.length < 1) {
						vm.unregisteredUsers.push(user);
					}
				});
			})
			.catch(function (err) {
				vm.error = err;
			});

	}]);
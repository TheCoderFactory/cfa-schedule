'use strict';

angular.module('cfaDashboard')
	.controller('UsersCtrl', ['Auth', function (Auth) {
		var vm = this;
		vm.teacherUsers = [];
		vm.studentUsers = [];

		// call db to get all users
		Auth.getUsers()
			.then(function (users) {
				console.log(users);
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
				});
			})
			.catch(function (err) {
				vm.error = err;
			});

	}]);
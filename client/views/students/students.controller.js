'use strict';

angular.module('cfaDashboard')
  .controller('StudentsCtrl', function ($http, $scope) {

  	var vm = this;

  	// $scope.students = [
   //  {
   //      name: 'Allan',
   //  },
   //  {
   //      name: 'Alex'
   //  }
   //  ];

    $scope.createStudent = function(val) {
    	$scope.students.push({name: val});
    	$http.post('/api/students', {
    		name: val
    	}).success( function(data){
    		console.log('sucess!!!!')
    		$scope.getStudents();
    	})
    }

		$scope.getStudents = function() {
		    $http.get('/api/students').then(function(response) {
		    console.log(response);
        $scope.students = response.data;
    	});
		}

    angular.extend(this, {
      name: 'StudentsCtrl',

      student: { name: 'Demo'}
    });
  });
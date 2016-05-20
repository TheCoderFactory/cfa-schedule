'use strict';

angular.module('cfaDashboard')
  .controller('ProjectsCtrl', ['ProjectService', 'RegistrationService','IntakeService', 'Auth', '$scope',
    function (ProjectService, RegistrationService, IntakeService, Auth, $scope) {

  	var vm =  this;
  	vm.intakes = {};
  	vm.registrations = {};
  	vm.projectData = {};
  	vm.projectData._registrations = [];
    vm.githubData = {};

  	$scope.selected = [];

    angular.extend(vm, {
      name: 'ProjectsCtrl'
    });

	  $scope.$watch('selected', function(element){
      vm.projectData._registrations = [];
      
      if(!element){
          return;
      }
      angular.forEach(element, function(val){
          vm.projectData._registrations.push( val._id.toString() );
      });
  	});

    vm.getIntakes = function() {
    	IntakeService.getAllIntakes()
    		.then(function (intakes){
    			vm.intakes  = intakes.data;
    		})
    		.catch(function(err){
    			$scope.error = err;
    		});
    }

	  vm.getIntakeRegistrations = function (selectedIntake) {
	  	var intake = selectedIntake;
	  	RegistrationService.getIntakeRegistrations(intake._id)
	  		.then(function (registrations) {
	  			vm.registrations = _.filter(registrations.data, function (registration) {
	  				return registration.role === 'Student';
	  			});
	  			// additionally remove reg of student logged on
	  			if(!Auth.getUser().admin) {
	  				vm.registrations = _.filter(registrations.data, function (registration) {
	    				return registration._user._id !== Auth.getUser()._id;
	    			});
	  			}
	  		})	
	  		.catch(function (err) {
	  			vm.error = err;
	  		})
	  }

    vm.getProjectData = function(name){
      console.log(name);
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://www.codecademy.com/", false);
      // Add your code below!
      xhr.send();
      console.log(xhr.status);
      console.log(xhr.statusText);
    }

    vm.createProject = function(){
      ProjectService.createProject(vm.projectData);
      vm.projectData = {}; //Clear Cache
      vm.getProjects();
    };

    vm.getProjects = function () {
      ProjectService.getProjects()
      .then(function (projects) {
        vm.projects = projects.data;
      })
      .catch(function (err) {
        vm.error = err;
      });
    };

    vm.deleteProject = function (id) {
      ProjectService.deleteProject(id)
        .then(function (res) {
          vm.getProjects();
        })
        .catch(function (err) {
          vm.error = err;
        });
    };

    vm.getProjects();
    vm.getIntakes();
  }]);

'use strict';

angular.module('cfaDashboard')
	.config(function ($routeProvider) {
        $routeProvider
        .when('/roll/:rollId', {
        	templateUrl: 'views/roll_show/roll_show.html',
                controller: 'RollShowCtrl',
                controllerAs: 'vm',
        resolve: {
        roll: ['$route', 'RollService', function ($route, RollService) {
        return RollService.getRoll($route.current.params.rollId);
        }]
        }
        });
        });
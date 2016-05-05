'use strict';

angular.module('cfaDashboard')
  .directive('startEndDate', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        
        // ctrl.$validators.startEndDate = function (modalValue, viewValue) {
        //   console.log('startEndDate');
        //   // get other dat
        //   var otherDate = attrs.otherDate;

        //   // if no view modal or other value then return true
        //   if (!otherDate || !viewValue) {
        //     return true;
        //   }

        //   // if this is the end date, check that the start date is less
        //   if (attrs.name = 'start') {
        //     console.log(moment(new Date(viewValue)).isBefore(new Date(otherDate)));
        //     return moment(new Date(viewValue)).isAfter(new Date(otherDate));
        //   }

        //   // if this is the start date, check the the end date is more
        //   if (attrs.name = 'end') {
        //     console.log(moment(new Date(viewValue).isAfter(new Date(otherDate))));
        //     return moment(new Date(viewValue).isBefore(new Date(otherDate)));
        //   }

        //   // if non of these return invalid
        //   return false;

        // };
      }
    };
  }])
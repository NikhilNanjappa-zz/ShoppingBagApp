'use strict';

/**
 * @ngdoc function
 * @name sapientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sapientApp
 */
angular.module('sapientApp')
  .controller('AboutCtrl', function ($scope, details_of) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.details_of = details_of;
  });

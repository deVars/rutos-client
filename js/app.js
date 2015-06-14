'use strict';

var app = angular.module('rutosClientApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('orange')
		.warnPalette('red');
})

.controller('mainController', ['$scope', function($scope) {

}]);

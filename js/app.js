'use strict';

var app = angular.module('rutosClientApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
	// $mdThemingProvider.theme('content-dark', 'default').dark();
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('deep-orange')
		.warnPalette('red');
})

.controller('mainController', [
	function() {}]);

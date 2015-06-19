'use strict';

var app = angular.module('rutosClientApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
	// $mdThemingProvider.theme('content-dark', 'default').dark();
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('deep-orange')
		.warnPalette('red');
})

.controller('mainController', ['$scope', function($scope) {
	var toggle_filter = function() {
			$scope.config.filter_panel_enabled = !$scope.config.filter_panel_enabled;
		};

	$scope.toggle_filter = toggle_filter;

	$scope.config = {
		filter_panel_enabled: false,
		is_logged_in: false,
		user_id: undefined
	};
	
	$scope.data = {
		scrapes: []
	};
}]);

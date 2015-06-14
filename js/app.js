'use strict';

var app = angular.module('rutosClientApp', []);

app.controller('mainController', ['$scope', function($scope) {

	}])
	.directive('rutosClient', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/rutos_client_view.html'
		};
	});

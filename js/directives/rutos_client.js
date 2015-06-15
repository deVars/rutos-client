'use strict';

app.directive('rutosClient', ['scrapeService', '$mdDialog', function(scrapeService, $mdDialog) {
	var global_filter = {},
		load_subbers = function($scope) {
			scrapeService.get_subbers().then(function(data) {
				$scope.subbers = data;
			});
		},
		update_filter = function($scope) {
			scrapeService.get(global_filter)
				.then(function(data) {
					$scope.scrapes = data;
			});
		},
		color_from_letter = function(index) {
			var colors = ['#f44336', '#e91e63', '#9c27b0', '#67a3b7',
				'#3F51B5', '#2196F3', '#039BE5', '#00BCD4', '#009688', 
				'#43A047', '#689F38', '#CDDC39', '#EF6C00', '#FF5722',
				'#795548', '#757575', '#607D8B'];

			return colors[index % colors.length];
		},
		toggle_filter = function($scope) {
			$scope.filter_panel_enabled = !$scope.filter_panel_enabled;
		},
		
		controller = function($scope, $mdDialog) {
			$scope.load_subbers = load_subbers;
			$scope.color_from_letter = color_from_letter;
			$scope.toggle_filter = toggle_filter;

			$scope.filter_panel_enabled = false;
			$scope.scrapes = [];
			$scope.subbers = [];

			scrapeService.all().then(function(data) {
				$scope.scrapes = data;
			});

			$scope.$watch('filter_subber', function(newVal, oldVal) {
				if (angular.isDefined(newVal)) {
					global_filter['subber'] = newVal;
					update_filter($scope);
				}
			});

			$scope.$watch('filter_title', function(newVal, oldVal) {
				if (angular.isDefined(newVal)) {
					global_filter['title'] = newVal;
					update_filter($scope);
				}
			});
		},
		signInDialogTemplate = {
			templateUrl: 'views/sign_in.html',
			clickOutsideToClose: true,
			controller: signInController
		},
		signInController = function() {
		};

	return {
		restrict: 'E',
		templateUrl: 'views/directives/rutos_client.html',
		controller: controller
	};
}]);

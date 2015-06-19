'use strict';

app.directive('rutosClient', ['scrapeService', function(scrapeService) {
	var color_from_letter = function(index) {
			var colors = ['#f44336', '#e91e63', '#9c27b0', '#67a3b7',
				'#7986CB', '#2196F3', '#039BE5', '#00BCD4', '#009688', 
				'#43A047', '#689F38', '#CDDC39', '#EF6C00', '#FF5722',
				'#795548', '#757575', '#607D8B'];

			return colors[index % colors.length];
		},	
		
		controller = function($scope, $mdDialog) {
			$scope.color_from_letter = color_from_letter;
				

			scrapeService.all().then(function(data) {
				$scope.data.scrapes = data;
			});
		};

	return {
		restrict: 'E',
		templateUrl: 'views/directives/rutos_client.html',
		controller: controller
	};
}]);

'use strict';

app.directive('rutosClient', ['scrapeService', function(scrapeService) {
	var controller = function($scope) {
		scrapeService.all().then(function(data) {
			$scope.scrapes = data;
		}, function(data) {
			$scope.scrapes = data;
		});
	};

	return {
		restrict: 'E',
		templateUrl: 'views/directives/rutos_client.html',
		controller: controller
	};
}]);

'use strict';

app.controller('scrape_filter_controller', 
	['scrapeService', '$scope', function(scrapeService, $scope) {
	
	var update_filter = function(filter) {
			scrapeService.get(filter)
				.then(function(data) {
					$scope.data.scrapes = data;
			});
		},

		load_subbers = function() {
			scrapeService.get_subbers().then(function(data) {
				$scope.subbers = data;
			});
		};
	
	$scope.filter = {
		subber: undefined,
		title: undefined
	};

	$scope.load_subbers = load_subbers;

	$scope.$watch('filter.subber', function(newVal, oldVal) {
		if (angular.isDefined(newVal)) {
			update_filter($scope.filter);
		}
	});

	$scope.$watch('filter.title', function(newVal, oldVal) {
		if (angular.isDefined(newVal)) {
			if (newVal.length > 2 || newVal.length == 0) {
				update_filter($scope.filter);	
			}
		}
	});
}]);
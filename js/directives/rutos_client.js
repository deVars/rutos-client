'use strict';

app.directive('rutosClient', ['scrapeService', '$mdDialog',
function(scrapeService, $mdDialog) {
	var color_from_letter = function(index) {
			var colors = ['#f44336', '#e91e63', '#9c27b0', '#67a3b7',
				'#7986CB', '#2196F3', '#039BE5', '#00BCD4', '#009688', 
				'#43A047', '#689F38', '#CDDC39', '#EF6C00', '#FF5722',
				'#795548', '#757575', '#607D8B'];

			return colors[index % colors.length];
		},

		entry_info_controller = function($scope, $mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			}
		},

		show_entry_info = function(ev) {
			entry_info_template.targetEvent = ev;
			console.log('Hello!');
			$mdDialog.show(entry_info_template);
		},
		
		controller = function($scope, $mdDialog) {
			$scope.color_from_letter = color_from_letter;
			$scope.show_entry_info = show_entry_info;				

			scrapeService.all().then(function(data) {
				$scope.data.scrapes = data;
			});
		},
		
		entry_info_template = {
			templateUrl: 'views/dialogs/entry_info.html',
			controller: entry_info_controller
		};

	return {
		restrict: 'E',
		templateUrl: 'views/directives/rutos_client.html',
		controller: controller
	};
}]);

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

		show_entry_info = function(id, subber, title, was_downloaded, 
				is_logged_in ,ev) {
			var entry_info = {},
				entry_link = '';

			scrapeService.get_url(id)
				.then(function(data) {
					entry_link = data.url;

					angular.copy(entry_info_template, entry_info);
					entry_info.locals = {
						id: id,
						subber: subber,
						title: title,
						was_downloaded: was_downloaded,
						is_logged_in: is_logged_in,
						link: entry_link
					}
					entry_info.targetEvent = ev;
					
					$mdDialog.show(entry_info)
						.finally(function() {
							entry_info = undefined;
						});
				});		
		},
		
		controller = ['$scope', '$mdDialog', function($scope, $mdDialog) {
			$scope.color_from_letter = color_from_letter;
			$scope.show_entry_info = show_entry_info;				

			scrapeService.all().then(function(data) {
				$scope.data.scrapes = data;
			});
		}],
		
		entry_info_template = {
			templateUrl: 'views/dialogs/entry_info.html',
			controller: 'entry_info_controller'
		};

	return {
		restrict: 'E',
		templateUrl: 'views/directives/rutos_client.html',
		controller: controller
	};
}]);

'use strict';

app.controller('entry_info_controller', 
	['scrapeService', '$scope', '$mdDialog', '$mdToast', 'id', 'subber', 'title', 'was_downloaded', 
		'is_logged_in', 'link',
	function(scrapeService, $scope, $mdDialog, $mdToast, id, subber, title, was_downloaded, 
			is_logged_in, link) {
		$scope.entry = {
			id: id,
			subber: subber,
			title: title,
			is_logged_in: is_logged_in,
			link: link
		};

		$scope.download = function() {
			window.open($scope.entry.link, 'dvScrape_download_window');
			$mdDialog.hide();
		};
		
		$scope.server_download = function() {
			scrapeService.request_server_download($scope.entry.id)
				.then(function() { // success
					$mdToast.show($mdToast.simple()
						.position('top center')
						.content('Request sent'));
				}, function() { // fail
					$mdToast.show($mdToast.simple()
						.position('top center')
						.content('Error sending request.  Please see logs.'));
				})
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		}
	}]
);
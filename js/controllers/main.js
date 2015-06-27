'use strict';

app.controller('main_controller', ['scrapeService', 'userService', '$mdDialog', '$mdToast', '$scope', 
	function(scrapeService, userService, $mdDialog, $mdToast, $scope) {
		var reload_entries = function() {
				scrapeService.all().then(function(data) {
					$scope.data.scrapes = data;
					$mdToast.show($mdToast.simple()
						.position('top center')
						.content('Successfully fetched entries!'));
				});
			},

			show_login_dialog = function($scope, ev) {
				sign_in_dialog_template['targetEvent'] = ev;

				$mdDialog.show(sign_in_dialog_template)
					.then(function(sign_in_config) {
						userService.login(sign_in_config)
							.then(function(data) {
								$scope.config.is_logged_in = true;
								$scope.config.user_id = data.user_id;
								$mdToast.show($mdToast.simple()
									.position('top center')
									.content('You have successfully signed in!'));
							}, output_error);
					}, output_error);
			},

			toggle_filter = function() {
				$scope.config.filter_panel_enabled = !$scope.config.filter_panel_enabled;
			},

			output_error = function(data) {
				if (angular.isUndefined(data)) {
					console.error('uncaught error');
				} else {
					console.error(data);
				}
			},
			
			sign_in_dialog_template = {
				templateUrl: 'views/dialogs/sign_in.html',
				controller: 'sign_in_controller'
			};

		$scope.main = {
			show_login_dialog: show_login_dialog,
			toggle_filter: toggle_filter,
			reload_entries: reload_entries
		};

		$scope.config = {
			filter_panel_enabled: false,
			is_logged_in: false,
			user_id: undefined
		};
		
		$scope.data = {
			scrapes: []
		};
	}]
);

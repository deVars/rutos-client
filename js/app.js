'use strict';

var app = angular.module('rutosClientApp', ['ngMaterial']);

app.config(['$mdThemingProvider', function($mdThemingProvider) {
	// $mdThemingProvider.theme('content-dark', 'default').dark();
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('deep-orange')
		.warnPalette('red');
}])

.controller('mainController', ['userService', '$mdDialog', '$mdToast', '$scope', 
function(userService, $mdDialog, $mdToast, $scope) {
	var show_login_dialog = function($scope, ev) {
			sign_in_dialog_template['targetEvent'] = ev;

			$mdDialog.show(sign_in_dialog_template)
				.then(function(sign_in_config) {
					userService.login(sign_in_config)
						.then(function(data) {
							$scope.config.is_logged_in = true;
							$scope.config.user_id = data.user_id;
							$mdToast.show($mdToast.simple()
								.position('bottom right')
								.content('You have successfully signed in!'));
						}, output_error);
				}, output_error);
		},

		sign_in_controller = ['$scope', '$mdDialog', function($scope, $mdDialog) {
			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			}

			$scope.signIn = function() {
				if (angular.isUndefined($scope.username) ||
						angular.isUndefined($scope.password)) {
					$mdDialog.cancel();
				}

				var digest = CryptoJS.SHA512($scope.password)
					.toString(CryptoJS.enc.Base64);

				$mdDialog.hide({
					username: $scope.username,
					password: digest
				});
			}
		}],

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
			controller: sign_in_controller
		};

	$scope.show_login_dialog = show_login_dialog;
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

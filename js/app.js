'use strict';

var app = angular.module('rutosClientApp', ['ngMaterial']);

app.config(function($mdThemingProvider) {
	// $mdThemingProvider.theme('content-dark', 'default').dark();
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('deep-orange')
		.warnPalette('red');
})

.controller('mainController', ['userService', '$mdDialog', '$mdToast', '$scope', 
function(userService, $mdDialog, $mdToast, $scope) {
	var show_login_dialog = function($scope, ev) {
		signInDialogTemplate['targetEvent'] = ev;

		$mdDialog.show(signInDialogTemplate)
			.then(function(signInConfig) {
				userService.login(signInConfig)
					.then(function(data) {
						$scope.config.is_logged_in = true;
						$scope.config.user_id = data.user_id;
						$mdToast.show($mdToast.simple()
							.position('bottom right')
							.content('You have successfully signed in!'));
					}, output_error);
			}, output_error);
		},

		signInController = function($scope, $mdDialog) {
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
		
		signInDialogTemplate = {
			templateUrl: 'views/sign_in.html',
			controller: signInController
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

'use strict';

app.directive('rutosClient', ['scrapeService', 'userService', '$mdDialog', '$mdToast', 
		function(scrapeService, userService, $mdDialog, $mdToast) {
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
				'#7986CB', '#2196F3', '#039BE5', '#00BCD4', '#009688', 
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
			$scope.show_login_dialog = show_login_dialog;

			$scope.filter_panel_enabled = false;
			$scope.is_logged_in = false;
			$scope.user_id = undefined;
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

		show_login_dialog = function($scope, ev) {
			signInDialogTemplate['targetEvent'] = ev;

			$mdDialog.show(signInDialogTemplate)
				.then(function(signInConfig) {
					userService.login(signInConfig)
						.then(function(data) {
							$scope.is_logged_in = true;
							$scope.user_id = data.user_id;
							$mdToast.show($mdToast.simple()
								.position('top right')
								.content('You have successfully signed in!'));
						}, output_error);
				}, output_error);
		},

		signInDialogTemplate = {
			templateUrl: 'views/sign_in.html',
			controller: signInController
		},

		output_error = function(data) {
			if (angular.isUndefined(data)) {
				console.error('uncaught error');
			} else {
				console.error(data);
			}
		};

	return {
		restrict: 'E',
		templateUrl: 'views/directives/rutos_client.html',
		controller: controller
	};
}]);

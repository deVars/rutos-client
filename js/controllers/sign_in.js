'use strict';

app.controller('sign_in_controller', ['$scope', '$mdDialog', 
	function($scope, $mdDialog) {
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
	}]
);
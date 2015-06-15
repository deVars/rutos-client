'use strict';

app.factory('userService', ['$http', '$q', function($http, $q) {
	var base_url = 'http://localhost/scrapeserv/',
		login = function(config) {
			var deferred = $q.defer();

			$http.post(base_url + 'users/login', {
				username: config.username,
				password: config.password
			}).success(function(data, status, headers, config) {
				data['success'] = true;
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				status['success'] = false;
				status['message'] = 'error while logging in';
				deferred.reject(status);
			});

			return deferred.promise;
		};

	return {
		login: login
	};
}]);

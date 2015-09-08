'use strict';

app.factory('scrapeService', ['$http', '$q', function($http, $q) {
	$http.defaults.headers.common.Accept = 'application/json';
	var base_url = '/scrapeserv/',

		_get = function(config) {
			var params = [],
				configParams = ['subber', 'title', 'resolution', 'bit_encoding'],
				paramStr = '',
				deferred = $q.defer();

			if (angular.isDefined(config)) {
				angular.forEach(configParams, function(configParam) {
					if (angular.isDefined(config[configParam])) {
						this.push(configParam + '=' + config[configParam]);
					}
				}, params);	
			}
			
			if (params.length > 0) {
				paramStr = '?' + params.join('&');
			}

			$http.get(base_url + 'scrapes/get' + paramStr)
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config) {
					status.message('error getting scrapes');
					deferred.reject(status);
				});

			return deferred.promise;
		},

		get = function(config) {
			return _get(config);
		},

		get_subbers = function() {
			var deferred = $q.defer();

			$http.get(base_url + 'scrapes/get/subbers')
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config) {
					status.message = 'error getting subbers';
					deferred.reject(status);
				});

			return deferred.promise;
		},

		get_url = function(id) {
			var deferred = $q.defer();

			$http.get(base_url + 'scrapes/get/link/' + id)
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config) {
					status.message = 'error getting subbers';
					deferred.reject(status);
				});

			return deferred.promise;
		},

		get_favorites = function() {
			var deferred = $q.defer();

			$http.get(base_url + 'scrapes/get/fav')
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config) {
					status.message = 'error getting favorites';
					deferred.reject(status);
				});

			return deferred.promise;
		},

		request_server_download = function(id) {
			var deferred = $q.defer();

			$http.post(base_url + 'scrapes/request/dl/' + id)
				.success(function(data, status, headers, config) {
					if (data.success == true) {
						deferred.resolve(true);
					} else {
						deferred.reject(status);
					}
				})
				.error(function(data, status, headers, config){
					deferred.reject(status);
				});

			return deferred.promise;
		},

		get_title = function(title) {
			return _get({title: title});
		},

		all = function() {
			return _get();
		};

	return {
		get: get,
		get_subbers: get_subbers,
		get_title: get_title,
		get_url: get_url,
		request_server_download: request_server_download,
		favorites: get_favorites,
		all: all
	};
}]);

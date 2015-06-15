'use strict';

app.factory('scrapeService', ['$http', '$q', function($http, $q) {
	var base_url = 'http://localhost/scrapeserv/',

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
					deferred.reject([]);
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
					deferred.reject([]);
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
		all: all
	}
}]);
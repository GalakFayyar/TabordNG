(function() {
	'use strict';

	/* Config */
	angular.module('tabordNG').factory('ConfigService', ConfigService);

	ConfigService.$inject = ['$resource', 'tabordngConfig'];
	function ConfigService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + 'conf', {}, {
			getConfig : {
				method : 'GET'
			}
		});
	}
})();
(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('UserService', UserService);
	angular.module('tabordNG').factory('TestService', TestService);

	UserService.$inject = ['$resource', 'tabordngConfig'];
	function UserService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':action/:login', {}, {
			authenticate : {
				method : 'POST',
				params : {
					'action' : 'authenticate'
				},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			},
			logout : {
				method : 'POST',
				params : {
					'action' : 'logout'
				}
			}
		});
	};

	TestService.$inject = ['$resource', 'tabordngConfig'];
	function TestService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:id', {}, {
			get_codes_tva : {
				method : 'GET',
				params : {
					'resource': 'codes_tva'
				}
			}
		});
	};
})();
(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('UserService', UserService);
	angular.module('tabordNG').factory('PharmacieService', PharmacieService);
	angular.module('tabordNG').factory('TestService', TestService);

	UserService.$inject = ['$resource', 'tabordngConfig'];
	function UserService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':action/:login', {}, {
			authenticate : {
				method : 'POST',
				params : {
					'action' : 'authenticate'
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

	PharmacieService.$inject = ['$resource', 'tabordngConfig'];
	function PharmacieService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			get_all : {
				method : 'GET',
				params : {
					'resource': 'pharmacie',
					'action' : 'get_all'
				}
			},
			update : {
				method : 'POST',
				params : {
					'resource': 'pharmacie',
					'action': 'update'
				}
			},
			create : {
				method : 'POST',
				params : {
					'resource': 'pharmacie',
					'action': 'create'
				}
			},
			delete : {
				method : 'POST',
				params : {
					'resource': 'pharmacie',
					'action': 'delete'
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
(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('SalaireService', SalaireService);

	SalaireService.$inject = ['$resource', 'tabordngConfig'];
	function SalaireService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			get : {
				method : 'GET',
				params : {
					'resource': 'salaire',
					'action': 'get'
				}
			},
			get_one : {
				method : 'GET',
				params : {
					'resource': 'salaire',
					'action': 'get'
				}
			},
			create : {
				method : 'POST',
				params : {
					'resource': 'salaire',
					'action': 'create'
				}
			},
			delete : {
				method : 'POST',
				params : {
					'resource': 'salaire',
					'action': 'delete'
				}
			},
			update : {
				method : 'POST',
				params : {
					'resource': 'salaire',
					'action': 'update'
				}
			},
			upsert : {
				method : 'POST',
				params : {
					'resource': 'salaire',
					'action': 'upsert'
				}
			}
		});
	};
})();

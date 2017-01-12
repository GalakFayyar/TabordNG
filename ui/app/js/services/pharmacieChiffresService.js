(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('PharmacieChiffresService', PharmacieChiffresService);

	PharmacieChiffresService.$inject = ['$resource', 'tabordngConfig'];
	function PharmacieChiffresService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			get : {
				method : 'GET',
				params : {
					'resource': 'pharmacie_chiffres',
					'action' : 'get'
				}
			},
			update : {
				method : 'POST',
				params : {
					'resource': 'pharmacie_chiffres',
					'action': 'update'
				}
			},
			create : {
				method : 'POST',
				params : {
					'resource': 'pharmacie_chiffres',
					'action': 'create'
				}
			},
			delete : {
				method : 'POST',
				params : {
					'resource': 'pharmacie_chiffres',
					'action': 'delete'
				}
			}
		});
	};
})();
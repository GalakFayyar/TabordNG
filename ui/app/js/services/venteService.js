(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('VenteService', VenteService);

	VenteService.$inject = ['$resource', 'tabordngConfig'];
	function VenteService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			get_all : {
				method : 'GET',
				params : {
					'resource': 'ventes',
					'action' : 'get_all'
				}
			}
		});
	};
})();

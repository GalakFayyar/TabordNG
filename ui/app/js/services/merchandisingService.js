(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('MerchandisingService', MerchandisingService);

	MerchandisingService.$inject = ['$resource', 'tabordngConfig'];
	function MerchandisingService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			get_data : {
				method : 'GET',
				params : {
					'resource': 'merchandising',
					'action' : 'get_data'
				}
			},
			save_data : {
				method : 'POST',
				params : {
					'resource': 'merchandising',
					'action': 'save_data'
				}
			}
		});
	};
})();
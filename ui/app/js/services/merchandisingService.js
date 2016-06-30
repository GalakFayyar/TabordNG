(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('MerchandisingService', MerchandisingService);

	MerchandisingService.$inject = ['$resource', 'tabordngConfig'];
	function MerchandisingService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			get_form : {
				method : 'GET',
				params : {
					'resource': 'merchandising',
					'action' : 'get_form'
				}
			},
			get_forms : {
				method : 'GET',
				params : {
					'resource': 'merchandising',
					'action' : 'get_forms'
				}
			},
			create_form : {
				method : 'POST',
				params : {
					'resource': 'merchandising',
					'action': 'create_form'
				}
			},
			update_form : {
				method : 'POST',
				params : {
					'resource': 'merchandising',
					'action': 'update_form'
				}
			},
			delete_form : {
				method : 'POST',
				params : {
					'resource': 'merchandising',
					'action': 'delete_form'
				}
			}
		});
	};
})();

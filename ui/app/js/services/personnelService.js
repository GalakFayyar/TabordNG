(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('PersonnelService', PersonnelService);

	PersonnelService.$inject = ['$resource', 'tabordngConfig'];
	function PersonnelService ($resource, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':resource/:action/:subresource/:subaction', {}, {
			list : {
				method : 'GET',
				params : {
					'resource': 'personnel',
					'action': 'list'
				}
			},
			get : {
				method : 'GET',
				params : {
					'resource': 'personnel',
					'action': 'get'
				}
			},
			create : {
				method : 'POST',
				params : {
					'resource': 'personnel',
					'action': 'create'
				}
			},
			delete : {
				method : 'POST',
				params : {
					'resource': 'personnel',
					'action': 'delete'
				}
			},
			update : {
				method : 'POST',
				params : {
					'resource': 'personnel',
					'action': 'update'
				}
			}
		});
	};
})();

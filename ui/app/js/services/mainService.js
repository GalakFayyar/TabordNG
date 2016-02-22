(function() {
	'use strict';

	/* Services */
	angular.module('tabordNG').factory('UserService', UserService);

	UserService.$inject = ['$resource', '$rootScope', 'tabordngConfig'];
	function UserService ($resource, $rootScope, tabordngConfig) {
		return $resource(tabordngConfig.api.url + ':action/:username/:accessType', {}, {
			authenticate : {
				method : 'POST',
				params : {
					'action' : 'token'
				},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			},
			check : {
				method : 'GET',
				params : {
					'action' : 'check'
				}
			},
			getUser : {
				method : 'GET',
				params : {
					'action' : 'users'
				}
			},
			logout : {
				method : 'POST',
				params : {
					'action' : 'logout'
				}
			},
			register : {
				method : 'POST',
				params : {
					'action' : 'register'
				},
				headers : {
					'Content-Type' : 'application/json'
				}
			}
		});
	};
})();
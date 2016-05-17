/* global $ */
(function() {
	'use strict';

	/* Helper Service */

	angular.module('tabordNG').factory('HelperService', HelperService);

	HelperService.$inject = ['$rootScope'];
	function HelperService ($rootScope) {
		// Fonctions communes à la factory et exposée
		return {
			getPaginationOptions: function () {
				return {
					pageNumber: 1,
					pageSize: 10,
					offset : 0,
					sort: null
				};
			}
		};
	}
})();
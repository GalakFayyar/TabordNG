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
			},
			getCurrentDate: function () {
				var today = new Date(),
					dd = today.getDate(),
					mm = today.getMonth()+1, //January is 0!
					yyyy = today.getFullYear();
				if(dd<10)
					dd='0'+dd ;
				if(mm<10)
					mm='0'+mm;
				return dd+'/'+mm+'/'+yyyy;
			}
		};
	}
})();
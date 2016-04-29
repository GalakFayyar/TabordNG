(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PharmacieController', PharmacieController);

	PharmacieController.$inject = ['$scope'];
	function PharmacieController ($scope) {
		$.AdminLTE.layout.activate();
	}
})();
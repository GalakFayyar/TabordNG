(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PharmacieChiffresController', PharmacieChiffresController);

	PharmacieChiffresController.$inject = ['$scope'];
	function PharmacieChiffresController ($scope) {
		$.AdminLTE.layout.activate();
	}
})();
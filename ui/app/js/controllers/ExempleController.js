(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('ExempleController', ExempleController);

	ExempleController.$inject = ['$scope'];
	function ExempleController ($scope) {
		$.AdminLTE.layout.activate();
	}
})();
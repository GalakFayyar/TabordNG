(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MerchandisingFormsController', MerchandisingFormsController);

	MerchandisingFormsController.$inject = ['$scope', '$state', 'HelperService', 'MerchandisingService', 'uiGridConstants', 'ngProgress'];
	function MerchandisingFormsController ($scope, $state, HelperService, MerchandisingService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		ngProgress.color('#FFF');
	}
})();
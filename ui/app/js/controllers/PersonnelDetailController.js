(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PersonnelDetailController', PersonnelDetailController);

	PersonnelDetailController.$inject = ['$scope', '$stateParams', 'HelperService', 'uiGridConstants', 'ngProgress'];
	function PersonnelDetailController ($scope, $stateParams, HelperService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		console.log($stateParams);

		$scope.templatesUrl = {
			identite: { ref: 'views/personnel/form-identite.html', current: 'views/personnel/form-identite.html'},
			experience: { ref: 'views/personnel/form-experience.html', current: null},
			salaires: { ref: 'views/personnel/form-salaires.html', current: null},
			analyse: { ref: 'views/personnel/form-analyse.html', current: null},
			synthese: { ref: 'views/personnel/form-synthese.html', current: null}
		};

		var load_data = function () {
			// Call service, load data in grid...
			ngProgress.complete();
		}

		load_data();
	}
})();
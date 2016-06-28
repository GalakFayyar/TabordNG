(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MerchandisingFormsController', MerchandisingFormsController);

	MerchandisingFormsController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'HelperService', 'MerchandisingService', 'uiGridConstants', 'ngProgress'];
	function MerchandisingFormsController ($scope, $rootScope, $state, $timeout, HelperService, MerchandisingService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();
		
		// Merchandising Form Values
		$scope.form = {
			pharmacie: {
				code: null
			},
			contexteEnvironnemental: {
				implantationVente: null,
				visibiliteLocal: null,
				accessibilite: null,
				commoditeStationnement: null,
				environnementCommercial: null,
				fluxPietonnier: null,
				fluxAutomobile: null,
				longeurVitrine: null,
				surface: null,
				envMedicalGeneraliste: null,
				envMedicalSpecialiste: null,
				envCentresMedicaux: null,
				envMedicalHospitalier: null,
				concurrents: []
			}
		}

		$scope.saveForm = function () {
			console.log($scope.form);
		};

		$timeout(function(){
			$(":checkbox").labelauty();
			$(":radio").labelauty();
			ngProgress.complete();
		}, 500);
	}
})();
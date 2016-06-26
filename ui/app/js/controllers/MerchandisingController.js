(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MerchandisingFormsController', MerchandisingFormsController);

	MerchandisingFormsController.$inject = ['$scope', '$state', 'HelperService', 'MerchandisingService', 'uiGridConstants', 'ngProgress'];
	function MerchandisingFormsController ($scope, $state, HelperService, MerchandisingService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		ngProgress.color('#FFF');

		setTimeout(function() {
			$(":checkbox").labelauty();
			$(":radio").labelauty();
		});
		
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
				envMedicalHospitalier: null
			}
		}
	}
})();
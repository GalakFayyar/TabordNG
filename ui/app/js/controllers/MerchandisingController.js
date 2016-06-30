(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MerchandisingFormsController', MerchandisingFormsController);

	MerchandisingFormsController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'HelperService', 'MerchandisingService', 'uiGridConstants', 'ngProgress'];
	function MerchandisingFormsController ($scope, $rootScope, $state, $timeout, HelperService, MerchandisingService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		// Manage form display if action is triggered by user (create/update)
		$scope.displayForms = false;
		$scope.formData.list = [];
		$scope.form = { seleted: null };
		
		// Merchandising Form Values
		var initNewFormData = function () {
			var data = {
				id: null,
				libelle: "test",
				pharmacie: {
					code: $rootScope.pharmacie.selected.id
				},
				forms: {
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
			};
			$scope.form.selected = data;
		};

		// Get All Forms for Current Pharmacy
		var getData = function () {
			ngProgress.start();
			MerchandisingService.get_forms({'subresource': $rootScope.pharmacie.selected.id}, function (results) {
				$scope.formData.list.push(results.data);
				console.log($scope.formData.list);
				ngProgress.complete();
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur getData(): ', error);
			});
		};

		// Save or Update Current Form
		$scope.saveForm = function () {
			if ($scope.form.selected != undefined && $scope.form.selected.id != null) {
				// Case Update existing form
				MerchandisingService.update_form({'subresource': $scope.form.selected.id}, {'form': $scope.form.selected}, function (result) {
					ngProgress.complete();
					console.log(result);
				}, function (error) {
					ngProgress.reset();
					console.log('Erreur de mise à jour du formulaire: ', $scope.form.selected);
				});
			} else {
				// Case Create new form
				MerchandisingService.create_form({}, {'form': $scope.form.selected}, function (result) {
					ngProgress.complete();
					console.log(result);
				}, function (error) {
					ngProgress.reset();
					console.log('Erreur de création du formulaire: ', $scope.form.selected);
				});
			}

			$scope.displayForms = true;
		};

		// Create New Form
		$scope.createNewForm = function () {
			initNewFormData();
			$scope.displayForms = true;
		};

		// Delete Current Form
		$scope.deleteForm = function () {
			$scope.displayForms = false;
			MerchandisingService.delete_form({'subresource': $scope.form.selected.id}, {}, function (result) {
				ngProgress.complete();
				console.log(result);
				getData();
				$scope.form.selected = null;
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur de suppression du formulaire: ', $scope.form.selected);
			});
		};

		// UI Init
		$timeout(function(){
			$(":checkbox").labelauty();
			$(":radio").labelauty();
			ngProgress.complete();
		}, 500);
	}
})();

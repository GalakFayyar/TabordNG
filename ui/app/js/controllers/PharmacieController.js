(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PharmacieController', PharmacieController);

	PharmacieController.$inject = ['$scope', '$state', 'HelperService', 'PharmacieService', 'uiGridConstants', 'ngProgress'];
	function PharmacieController ($scope, $state, HelperService, PharmacieService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		ngProgress.color('#FFF');

		$scope.pharmacie = {
			selected: null //TODO : get current pharmacie selected on login
		};

		$scope.btnCreate = {
			disabled: true
		};

		// $scope.listPharmaciesGrid = {
		// 	enableSelectAll: true,
		// 	paginationPageSizes: [10, 20, 50],
		// 	paginationPageSize: HelperService.getPaginationOptions().pageSize,
		// 	enableGridMenu: false,
		// 	enableFiltering: true,
		// 	useExternalFiltering: false,
		// 	rowEditWaitInterval: -1,
		// 	enableCellEdit: false,
		// 	enableCellEditOnFocus: false,
		// 	columnDefs: [
		// 		{
		// 			name: 'data.denomination',
		// 			displayName: 'Nom de la Pharmacie',
		// 			pinnedLeft: false,
		// 			enableFiltering: true,
		// 			enableSorting: true,
		// 			//width: 200,
		// 			type: 'string',
		// 			//cellTemplate: '',
		// 			sort: { direction: uiGridConstants.ASC, priority: 1 }
		// 		}
		// 	]
		// };

		var getPharmacies = function () {
			ngProgress.start();
			PharmacieService.get_all({}, function (results) {
				//$scope.listPharmaciesGrid.data = results.data;
				$scope.pharmacies = {
					list: results.data
				};
				console.log($scope.pharmacies.list);
				ngProgress.complete();
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur get_all_pharmacie(): ', error);
			});
		};

		var updateCurrentPharmacie = function () {
			ngProgress.start();
			PharmacieService.update({}, {'pharmacies': [$scope.pharmacie.selected]}, function (result) {
				ngProgress.complete();
				console.log(result);
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur de mise à jour de la pharmacie: ', $scope.pharmacie.selected);
			});
		};

		var createCurrentPharmacie = function () {
			ngProgress.start();
			PharmacieService.create({}, {'pharmacie': [$scope.pharmacie.selected]}, function (result) {
				ngProgress.complete();
				console.log(result);
				getPharmacies();
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur de création de la pharmacie: ', $scope.pharmacie.selected);
			});
		};

		var deleteCurrentPharmacie = function () {
			ngProgress.start();
			PharmacieService.delete({}, {'pharmacie': [$scope.pharmacie.selected]}, function (result) {
				ngProgress.complete();
				console.log(result);
				getPharmacies();
				$scope.pharmacie.selected = null;
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur de suppression de la pharmacie: ', $scope.pharmacie.selected);
			});
		};

		$scope.checkFiledsCreation = function () {
			var test = ($scope.pharmacie.selected != null)
				&& $scope.pharmacie.selected.denomination
				&& ($scope.pharmacie.selected.adresse != null)
				&& $scope.pharmacie.selected.adresse.num
				&& $scope.pharmacie.selected.adresse.libelle
				&& $scope.pharmacie.selected.adresse.cp
				&& $scope.pharmacie.selected.adresse.ville
				&& ($scope.pharmacie.selected.telephone != null)
				&& $scope.pharmacie.selected.telephone.fixe
				&& $scope.pharmacie.selected.telephone.portable
				&& $scope.pharmacie.selected.fax
				&& $scope.pharmacie.selected.email
				&& $scope.pharmacie.selected.date_installation
				&& $scope.pharmacie.selected.nb_associes
				&& $scope.pharmacie.selected.num_tva_intercom;

			$scope.btnCreate.disabled = !test;
		};

		$scope.btnAction = function (type_action) {
			switch(type_action) {
				case 'create':
					console.log('Création d\'une nouvelle pharmacie ...');
					createCurrentPharmacie();
					break;
				case 'save':
					console.log('Sauvegarde des modifications ...');
					updateCurrentPharmacie();
					break;
				case 'delete':
					console.log('Suppression de pharmacie ...');
					deleteCurrentPharmacie();
					break;
				case 'cancel':
					$state.go('dashboard');
					break;
				default:
					break;
			}
		};

		$scope.emptyPharmacieFields = function () {
			$scope.pharmacie.selected = null;
		};

		getPharmacies();
	}
})();
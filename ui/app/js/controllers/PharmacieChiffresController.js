(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PharmacieChiffresController', PharmacieChiffresController);

	PharmacieChiffresController.$inject = ['$scope', '$rootScope', 'HelperService', 'PharmacieChiffresService', 'uiGridConstants'];
	function PharmacieChiffresController ($scope, $rootScope, HelperService, PharmacieChiffresService, uiGridConstants) {
		$.AdminLTE.layout.activate();

		$scope.period = {
			list : [
				{id: 1, libelle: "Période Précédente", selected: false},
				{id: 2, libelle: "Période Réelle", selected: true},
				{id: 3, libelle: "Période Prévisionnelle", selected: false}
			],
			selected : 2
		};

		$scope.templatesUrl = {
			ca: 'views/pharmacie/form-ca.html',
			marge: 'views/pharmacie/form-marge.html',
			stock: 'views/pharmacie/form-stock.html',
			frais_generaux: 'views/pharmacie/form-frais-generaux.html',
			frais_financiers: 'views/pharmacie/form-frais-financiers.html',
			divers: 'views/pharmacie/form-divers.html',
			impots_taxes: 'views/pharmacie/form-impots-taxes.html',
			emprunts: 'views/pharmacie/form-emprunts.html',
			investissements: 'views/pharmacie/form-investissements.html',
			cessions_immos: 'views/pharmacie/form-cessions-immos.html',
			amortissements: 'views/pharmacie/form-amortissements.html'
		};
		$scope.selectedPage = $scope.templatesUrl.ca;

		$scope.tabHeadingClick = function (page) {
			$scope.selectedPage = $scope.templatesUrl[page];
		}

		$scope.formatNumbers = HelperService.formatNumbers;

		$scope.grid = {
			ca: {
				enableSelectAll: false,
				enableColumnMenus: false,
				minRowsToShow: 4,
				enableGridMenu: false,
				enableFiltering: false,
				useExternalFiltering: false,
				exporterMenuPdf: false,
				rowSelection: false,
				enableRowHeaderSelection: false,
				multiSelect: false,
				enableCellEdit: false,
				enableCellEditOnFocus: false,
				rowEditWaitInterval: -1,
				showColumnFooter: true,
				minRowsToShow: 12,

				columnDefs: [
					{
						name: 'mois',
						displayName: 'Mois',
						//width: 90,
						pinnedLeft: true,
						enableFiltering: false, 
						enableSorting: false,
						type: 'string'
						//cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-default btn-flat" ng-click="grid.appScope.editPersonnel(row.entity)"><i class="fa fa-pencil"></i> modifier</button></div>'
					},{
						name: 'nb_jours_n_1',
						displayName: 'Nb Jours N-1',
						enableSorting: true,
						enableCellEdit: false,
						type: 'string',
						width: 100,
						enableHiding: false,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
						//cellTemplate: '<div class="ui-grid-cell-contents"><a href="" ng-click="grid.appScope.editPersonnel(row.entity)">{{row.entity[col.field]}}</a></div>'
						//width: 150
						//cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
						//sort: { direction: uiGridConstants.ASC, priority: 1 } 
					},{
						name: 'nb_jours_n',
						displayName: 'Nb Jours N',
						enableSorting: true,
						enableCellEdit: false,
						type: 'string',
						width: 100,
						enableHiding: false,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'prc_augm_souhaite',
						displayName: '% Augm. Souhaitée',
						enableSorting: true,
						enableCellEdit: false,
						type: 'string',
						width: 150,
						enableHiding: false,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'prc_augm_reelle',
						displayName: '% Augm. Réelle',
						enableSorting: true,
						enableCellEdit: false,
						type: 'string',
						width: 120,
						enableHiding: false,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'princeps_tx_1',
						displayName: 'Princeps 2,1%',
						enableSorting: true,
						type: 'string',
						width: 120,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'tx_2',
						displayName: '7%',
						enableFiltering: true, 
						enableSorting: true,
						type: 'string',
						width: 50,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'tx_3',
						displayName: '20%',
						enableSorting: true,
						type: 'string',
						width: 50,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'generique_tx_1',
						displayName: 'Générique 2,1%',
						enableSorting: true,
						type: 'string',
						width: 120,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'services_tx',
						displayName: 'Services 20%',
						enableSorting: true,
						type: 'string',
						width: 100,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'total_ht',
						displayName: 'TOTAL HT',
						enableSorting: true,
						type: 'string',
						pinnedRight: true,
						width: 100,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'total_tva',
						displayName: 'TOTAL TVA',
						enableSorting: true,
						type: 'string',
						pinnedRight: true,
						width: 100,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					},{
						name: 'total_ttc',
						displayName: 'TOTAL TTC',
						enableSorting: true,
						type: 'string',
						pinnedRight: true,
						width: 100,
						aggregationType: uiGridConstants.aggregationTypes.sum,
						footerCellTemplate: '<div class="ui-grid-cell-contents custom-bottom-ventes">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>'
					}
				],
				onRegisterApi: function (gridApi) {
					$scope.tngDashboardChiffresPharmacieGridApi = gridApi;
				}
			}
		}

		var data_bidon_reelle = [
				{mois:'JANVIER',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:155,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'FEVRIER',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'MARS',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'AVRIL',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'MAI',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'JUIN',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'JUILLET',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'AOUT',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'SEPTEMBRE',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'OCTOBRE',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'NOVEMBRE',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'DECEMBRE',nb_jours_n_1:21,nb_jours_n:20,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24}
			],
			data_bidon_precedente = [
				{mois:'JANVIER',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:155,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'FEVRIER',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'MARS',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'AVRIL',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'MAI',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'JUIN',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'JUILLET',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'AOUT',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'SEPTEMBRE',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'OCTOBRE',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'NOVEMBRE',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'DECEMBRE',nb_jours_n_1:22,nb_jours_n:21,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24}
			],
			data_bidon_previsionnelle = [
				{mois:'JANVIER',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:155,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'FEVRIER',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'MARS',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'AVRIL',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'MAI',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'JUIN',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'JUILLET',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'AOUT',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'SEPTEMBRE',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'OCTOBRE',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'NOVEMBRE',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24},
				{mois:'DECEMBRE',nb_jours_n_1:23,nb_jours_n:22,prc_augm_souhaite:4.5,prc_augm_reelle:3.9,princeps_tx_1:154,generique_tx_1:21,tx_2:471.5,tx_3:512.75,services_tx:8.1,total_ht:2387.70,total_tva:254.7,total_ttc:2614.24}
			];
		var load_data = function () {
			/*PharmacieChiffresService.get({}, function (results) {
				$scope.grid.salaires.data = results.data;
				$rootScope.ngProgress.complete();
			}, function (error) {
				$rootScope.ngProgress.reset();
				console.log('Erreur load_data(): ', error);
			});*/
			$scope.grid.ca.data = data_bidon_reelle;
		}

		$scope.refreshGridCA = function () {
			$rootScope.ngProgress.start();

			// TODO : service de récupération des données

			switch ($scope.period) {
				case 1:
					$scope.grid.ca.data = data_bidon_precedente;
					break;
				case 2:
					$scope.grid.ca.data = data_bidon_reelle;
					break;
				case 3:
					$scope.grid.ca.data = data_bidon_previsionnelle;
					break;
				default:
					$scope.grid.ca.data = data_bidon_reelle;
					break;
			}

			$scope.tngDashboardChiffresPharmacieGridApi.core.refresh();

			$rootScope.ngProgress.complete();
		}

		load_data();
	}
})();
(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('LaboratoiresVentesController', LaboratoiresVentesController);

	LaboratoiresVentesController.$inject = ['$scope', '$filter', 'uiGridConstants', 'ngProgress'];
	function LaboratoiresVentesController ($scope, $filter, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		$scope.formatNumbers = function (number) {
			var _number = $filter('number')(number, 2); 
			return _number.replace(',', ' ');
		}

		$scope.grid = {
            ventes: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 13,
                enableGridMenu: true,
                enableFiltering: false,
                useExternalFiltering: false,
                exporterMenuPdf: false,
                rowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                enableCellEdit: true,
                enableCellEditOnFocus: true,
                rowEditWaitInterval: -1,
                paginationPageSizes: [12],
                paginationPageSize: 12,
                showGridFooter: false,
                showColumnFooter: true,

                columnDefs: [
                    {
                        name: 'mois',
                        displayName: 'Mois',
                        pinnedLeft: true,
                        enableFiltering: false,
                        enableSorting: false,
                        type: 'string',
                        enableHiding: false
                        //width: 150
                        //cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
                        //sort: { direction: uiGridConstants.ASC, priority: 1 } 
                    },{
                        name: 'princeps_tx_1',
                        displayName: 'Princeps 2,1%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#3c8dbc">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'generique_tx_1',
                        displayName: 'Générique 2,1%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#3c8dbc">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'tx_3',
                        displayName: '5,5%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#3c8dbc">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'tx_4',
                        displayName: '20%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#3c8dbc">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'total',
                        displayName: 'TOTAL HT',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#3c8dbc">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngVentesLaboratoiresGridApi = gridApi;
                }
            },
            marge: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 13,
                enableGridMenu: true,
                enableFiltering: false,
                useExternalFiltering: false,
                exporterMenuPdf: false,
                rowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                enableCellEdit: true,
                enableCellEditOnFocus: true,
                rowEditWaitInterval: -1,
                paginationPageSizes: [12],
                paginationPageSize: 12,
                showGridFooter: false,
                showColumnFooter: true,

                columnDefs: [
                    {
                        name: 'mois',
                        displayName: 'Mois',
                        pinnedLeft: true,
                        enableFiltering: false,
                        enableSorting: false,
                        type: 'string',
                        enableHiding: false
                        //width: 150
                        //cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
                        //sort: { direction: uiGridConstants.ASC, priority: 1 } 
                    },{
                        name: 'princeps_tx_1',
                        displayName: 'Princeps 2,1%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#00a65a">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'generique_tx_1',
                        displayName: 'Générique 2,1%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#00a65a">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'tx_3',
                        displayName: '5,5%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#00a65a">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'tx_4',
                        displayName: '20%',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#00a65a">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    },{
                        name: 'total',
                        displayName: 'TOTAL HT',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color:#00a65a">{{grid.appScope.formatNumbers(col.getAggregationValue())}}</div>',
                        type: 'string'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngVentesLaboratoiresGridApi = gridApi;
                }
            },
            remise: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 13,
                enableGridMenu: true,
                enableFiltering: false,
                useExternalFiltering: false,
                exporterMenuPdf: false,
                rowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                enableCellEdit: true,
                enableCellEditOnFocus: true,
                rowEditWaitInterval: -1,
                paginationPageSizes: [12],
                paginationPageSize: 12,
                showGridFooter: false,
                showColumnFooter: true,

                columnDefs: [
                    {
                        name: 'mois',
                        displayName: 'Mois',
                        pinnedLeft: true,
                        enableFiltering: false,
                        enableSorting: false,
                        type: 'string',
                        enableHiding: false
                        //width: 150
                        //cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
                        //sort: { direction: uiGridConstants.ASC, priority: 1 } 
                    },{
                        name: 'rfa',
                        displayName: 'RFA',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'remise_arriere',
                        displayName: 'Remise Arrière',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'ug',
                        displayName: 'UG',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'prc_prestation',
                        displayName: 'Pourcentage prestation',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'mt_prestation',
                        displayName: 'Montant prestation',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngVentesLaboratoiresGridApi = gridApi;
                }
            }
		};

		var load_data = function () {
			var data_bidon = [
				{annee:2016,mois:'[2016] JANVIER',princeps_tx_1:155,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] FEVRIER',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] MARS',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] AVRIL',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] MAI',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] JUIN',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] JUILLET',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] AOUT',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] SEPTEMBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] OCTOBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] NOVEMBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2016,mois:'[2016] DECEMBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] JANVIER',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] FEVRIER',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] MARS',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] AVRIL',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] MAI',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] JUIN',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] JUILLET',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] AOUT',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] SEPTEMBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] OCTOBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] NOVEMBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70},
				{annee:2015,mois:'[2015] DECEMBRE',princeps_tx_1:154,generique_tx_1:21,tx_3:512.75,tx_4:1874.95,total:2387.70}
			];

			var data_bidon_2 = [
				{annee:2016,mois:'[2016] JANVIER',rfa:155,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] FEVRIER',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] MARS',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] AVRIL',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] MAI',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] JUIN',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] JUILLET',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] AOUT',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] SEPTEMBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] OCTOBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] NOVEMBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2016,mois:'[2016] DECEMBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] JANVIER',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] FEVRIER',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] MARS',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] AVRIL',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] MAI',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] JUIN',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] JUILLET',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] AOUT',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] SEPTEMBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] OCTOBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] NOVEMBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70},
				{annee:2015,mois:'[2015] DECEMBRE',rfa:154,remise_arriere:21,ug:512.75,prc_prestation:74.95,mt_prestation:2387.70}
			];

			$scope.grid.ventes.data = data_bidon;
			$scope.grid.marge.data = data_bidon;
			$scope.grid.remise.data = data_bidon_2;

			// Call service, load data in grid...
			ngProgress.complete();
		}

		load_data();
	}
})();
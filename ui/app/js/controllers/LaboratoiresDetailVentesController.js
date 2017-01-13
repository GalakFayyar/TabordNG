(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('LaboratoiresDetailVentesController', LaboratoiresDetailVentesController);

	LaboratoiresDetailVentesController.$inject = ['$scope', '$rootScope', '$filter', 'uiGridConstants', 'HelperService', 'VenteService'];
	function LaboratoiresDetailVentesController ($scope, $rootScope, $filter, uiGridConstants, HelperService, VenteService) {
		$.AdminLTE.layout.activate();

		$scope.formatNumbers = HelperService.formatNumbers;

		$scope.grid = {
            detailVentePeriode: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 15,
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
                paginationPageSizes: [20, 50, 100],
                paginationPageSize: 50,
                showGridFooter: false,
                showColumnFooter: false,

                columnDefs: [
                    {
                        name: 'code_produit',
                        displayName: 'Code Produit',
                        pinnedLeft: true,
                        enableFiltering: false,
                        enableSorting: false,
                        type: 'string',
                        enableHiding: false
                        //width: 150
                        //cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
                        //sort: { direction: uiGridConstants.ASC, priority: 1 } 
                    },{
                        name: 'libelle_produit',
                        displayName: 'Produit',
                        pinnedLeft: true,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'code_laboratoire',
                        displayName: 'Code Laboratoire',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'laboratoire',
                        displayName: 'Laboratoire',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'quantite',
                        displayName: 'Quantité',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'prix_achat_ht',
                        displayName: 'Prix Achat (HT)',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'ca_ht',
                        displayName: 'CA (HT)',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'ca_ttc',
                        displayName: 'CA (TTC)',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngDetailVentesLaboratoiresGridApi = gridApi;
                }
            }
		};

		var load_data = function () {
			
            VenteService.get_all({}, {idpharmacie: '2122492', periode: '2016', limit: '', offset: ''}, function (results) {
                $scope.grid.detailVentePeriode.data = results.data.ventes;
            });

			$scope.grid.detailVentePeriode.data = [];

			// Call service, load data in grid...
			$rootScope.ngProgress.complete();
		}

		load_data();
	}
})();
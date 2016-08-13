(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PersonnelSalairesController', PersonnelSalairesController);

	PersonnelSalairesController.$inject = ['$scope', 'HelperService', 'uiGridConstants', 'ngProgress'];
	function PersonnelSalairesController ($scope, HelperService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		$scope.grid = {
            salaires: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 4,
                enableGridMenu: false,
                enableFiltering: false,
                useExternalFiltering: false,
                exporterMenuPdf: false,
                rowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                enableCellEdit: true,
                enableCellEditOnFocus: true,
                rowEditWaitInterval: -1,

                columnDefs: [
                    {
                        name: 'nom',
                        displayName: 'Nom',
                        pinnedLeft: true,
                        enableFiltering: false,
                        enableSorting: false,
                        type: 'string',
                        enableHiding: false
                        //width: 150
                        //cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
                        //sort: { direction: uiGridConstants.ASC, priority: 1 } 
                    },{
                        name: 'prenom',
                        field: 'prenom',
                        displayName: 'Prénom',
                        pinnedLeft: true,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'cadre',
                        displayName: 'Cadre',
                        pinnedLeft: true,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'bool'
                    },{
                        name: 'montant',
                        displayName: 'Montant Brut',
                        pinnedLeft: true,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'charges',
                        displayName: 'Charges',
                        pinnedLeft: true,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'date_entree',
                        displayName: 'Ancienneté',
                        pinnedLeft: true,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'date'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngStructureCAGridApi = gridApi;
                }
            }
		};

		var load_data = function () {
			// Call service, load data in grid...
			ngProgress.complete();
		}

		load_data();
	}
})();
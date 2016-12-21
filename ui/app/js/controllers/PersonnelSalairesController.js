(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PersonnelSalairesController', PersonnelSalairesController);

	PersonnelSalairesController.$inject = ['$scope', '$rootScope', 'HelperService', 'uiGridConstants', 'PersonnelService'];
	function PersonnelSalairesController ($scope, $rootScope, HelperService, uiGridConstants, PersonnelService) {
		$.AdminLTE.layout.activate();

		$scope.grid = {
			salaires: {
				enableSelectAll: false,
				enableColumnMenus: false,
				minRowsToShow: 4,
				enableGridMenu: true,
				enableFiltering: false,
				useExternalFiltering: false,
				exporterMenuPdf: false,
				rowSelection: true,
				enableRowHeaderSelection: false,
				multiSelect: false,
				enableCellEdit: false,
				enableCellEditOnFocus: false,
				rowEditWaitInterval: -1,

				enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,

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
						field: 'remuneration.montant_brut',
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
						name: 'date_debut_contrat',
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
			PersonnelService.list_with_salaries({}, function (results) {
				$scope.grid.salaires.data = results.data;
				$rootScope.ngProgress.complete();
			}, function (error) {
				$rootScope.ngProgress.reset();
				console.log('Erreur load_data(): ', error);
			});
		}

		load_data();
	}
})();
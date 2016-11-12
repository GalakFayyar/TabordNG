(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PersonnelDashboardController', PersonnelDashboardController);

	PersonnelDashboardController.$inject = ['$scope', '$state', 'HelperService', 'PersonnelService', 'uiGridConstants', 'ngProgress'];
	function PersonnelDashboardController ($scope, $state, HelperService, PersonnelService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		$scope.grid = {
			personnel: {
				enableSelectAll: false,
				enableColumnMenus: false,
				minRowsToShow: 4,
				enableGridMenu: false,
				enableFiltering: true,
				useExternalFiltering: false,
				exporterMenuPdf: false,
				rowSelection: true,
				enableRowHeaderSelection: true,
				multiSelect: true,
				enableCellEdit: true,
				enableCellEditOnFocus: true,
				rowEditWaitInterval: -1,

				columnDefs: [
					{
						name: 'id',
						displayName: 'Num.',
						pinnedLeft: true,
						enableFiltering: true,
						enableSorting: true,
						enableCellEdit: false,
						type: 'string',
						enableHiding: false,
						cellTemplate: '<div class="ui-grid-cell-contents"><a href="" ng-click="grid.appScope.editPersonnel(row.entity)">{{row.entity[col.field]}}</a></div>'
						//width: 150
						//cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
						//sort: { direction: uiGridConstants.ASC, priority: 1 } 
					},{
						name: 'nom',
						field: 'nom',
						displayName: 'Nom',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'prenom',
						displayName: 'Prénom',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'date_debut_contrat',
						displayName: 'Date entrée',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'date'
					},{
						name: 'qualification',
						displayName: 'Qualifications',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					}
				],
				onRegisterApi: function (gridApi) {
					$scope.tngDashboardPersonnelGridApi = gridApi;
				}
			}
		};

		var load_data = function () {
			// Call service, load data in grid...
			
			// $scope.grid.personnel.data = [
			// 	{
			// 		id: '001',
			// 		nom: "FALC'HER",
			// 		prenom: "Thomas",
			// 		date_entree: "2016-01-01",
			// 		qualification: "INGENIEUR"
			// 	},
			// 	{
			// 		id: '002',
			// 		nom: "FALC'HER",
			// 		prenom: "Pierre-Antoine",
			// 		date_entree: "2016-01-01",
			// 		qualification: "PAYSAGISTE"
			// 	},
			// 	{
			// 		id: '003',
			// 		nom: "FALC'HER",
			// 		prenom: "Louis",
			// 		date_entree: "2016-01-01",
			// 		qualification: "CHIRURGIEN DENTISTE"
			// 	},
			// 	{
			// 		id: '004',
			// 		nom: "FALC'HER",
			// 		prenom: "Christine",
			// 		date_entree: "2016-01-01",
			// 		qualification: "DELEGUEE MEDICALE"
			// 	}
			// ];

			PersonnelService.list({}, function (results) {
				$scope.grid.personnel.data = results.data;
				ngProgress.complete();
			}, function (error) {
				ngProgress.reset();
				console.log('Erreur load_data(): ', error);
			});
		}

		$scope.editPersonnel = function (personnel) {
			$state.go('personnel_edit', {personnelId: personnel.id});
		}

		load_data();
	}
})();
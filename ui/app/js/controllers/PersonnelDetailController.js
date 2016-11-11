(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PersonnelDetailController', PersonnelDetailController);

	PersonnelDetailController.$inject = ['$scope', '$stateParams', 'HelperService', 'uiGridConstants', 'ngProgress'];
	function PersonnelDetailController ($scope, $stateParams, HelperService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		console.log($stateParams);

		$scope.templatesUrl = {
			identite: 'views/personnel/form-identite.html',
			experience: 'views/personnel/form-experience.html',
			salaires: 'views/personnel/form-salaires.html',
			analyse: 'views/personnel/form-analyse.html',
			synthese: 'views/personnel/form-synthese.html'
		};
		$scope.selectedPage = $scope.templatesUrl.identite;

		var load_data = function () {
			// Call service, load data in grid and forms...

			// Données bouchons
			$scope.grid.experienceScolaire.data = [
				{ etablissement: 'LYCEE LE LIKES - QUIMPER', diplome: 'BACCALAUREAT SCIENTIFIQUE', date_obtention: '2006' },
				{ etablissement: 'LYCEE CHARLES DE FOUCAULT - BREST', diplome: 'BREVET DE TECHNICIEN SUPERIEUR INFORMATIQUE DE GESTION', date_obtention: '2010' },
				{ etablissement: 'ISEN - BREST', diplome: 'CERTIFICAT DE QAULIFICATION PARITAIRE DE LA METALLURGIE', date_obtention: '2011' },
				{ etablissement: 'ISEN - BREST', diplome: 'DIPLOME D\'INGENIEUR', date_obtention: '2013' }
			];
			$scope.grid.experienceProfessionnelle.data = [
				{
					entreprise: 'ADRIA QUIMPER',
					date_entree: new Date(2009, 12, 1),
					date_sortie: new Date(2010, 3, 1),
					qualification: 'TECHNICIEN SUPERIEUR',
					motif: 'FIN DE STAGE',
					stage: true
				},
				{
					entreprise: 'SURAVENIR BREST',
					date_entree: new Date(2010, 9, 1),
					date_sortie: new Date(2011, 10, 1),
					qualification: 'APPRENTIT INGENIEUR ETUDE',
					motif: 'FIN DE CONTRAT DE PROFESSIONNALISATION',
					stage: false
				}
			];
			$scope.grid.salaireRemuneration.data = [
				{ mois: 'JANVIER', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'FEVRIER', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'MARS', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'AVRIL', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'MAI', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'JUIN', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'JUILLET', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'AOUT', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'SEPTEMBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'OCTOBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'NOVEMBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
				{ mois: 'DECEMBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' }
			];
			$scope.grid.salaireRepartition.data = [
				{ mois: 'JANVIER', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'FEVRIER', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'MARS', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'AVRIL', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'MAI', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'JUIN', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'JUILLET', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'AOUT', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'SEPTEMBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'OCTOBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'NOVEMBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
				{ mois: 'DECEMBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' }
			];

			ngProgress.complete();
		}

		$scope.tabHeadingClick = function (page) {
			$scope.selectedPage = $scope.templatesUrl[page];
		};

		$scope.grid = {
            experienceScolaire: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 3,
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
                paginationPageSizes: [20, 50, 100],
                paginationPageSize: 50,
                showGridFooter: false,
                showColumnFooter: false,

                columnDefs: [
                    {
                        name: 'etablissement',
                        displayName: 'Etablissement',
                        pinnedLeft: false,
                        enableFiltering: false,
                        enableSorting: true,
                        type: 'string',
                        enableHiding: false
                    },{
                        name: 'diplome',
                        displayName: 'Diplôme',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'date_obtention',
                        displayName: 'Date d\'obtention',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngExperienceScolaireGridApi = gridApi;
                }
            },
            experienceProfessionnelle: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 3,
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
                paginationPageSizes: [20, 50, 100],
                paginationPageSize: 50,
                showGridFooter: false,
                showColumnFooter: false,

                columnDefs: [
                    {
                        name: 'entreprise',
                        displayName: 'Entreprise',
                        pinnedLeft: false,
                        enableFiltering: false,
                        enableSorting: true,
                        type: 'string',
                        enableHiding: false
                    },{
                        name: 'date_entree',
                        displayName: 'Date entrée',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'date',
                        cellFilter: 'date:\'dd-MM-yyyy\''
                    },{
                        name: 'date_sortie',
                        displayName: 'Date sortie',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'date',
                        cellFilter: 'date:\'dd-MM-yyyy\''
                    },{
                        name: 'qualification',
                        displayName: 'Qualification',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'motif',
                        displayName: 'Motif du départ',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'stage',
                        displayName: 'Stage',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'boolean'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngExperienceProfessionnelleGridApi = gridApi;
                }
            },
            salaireRemuneration: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 12,
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
                paginationPageSizes: [20, 50, 100],
                paginationPageSize: 50,
                showGridFooter: false,
                showColumnFooter: true,

                columnDefs: [
                    {
                        name: 'mois',
                        displayName: 'Mois',
                        pinnedLeft: false,
                        enableFiltering: false,
                        enableSorting: true,
                        type: 'string',
                        enableHiding: false
                    },{
                        name: 'salaire_brut',
                        displayName: 'Salaire Brut',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'primes_brut',
                        displayName: 'Primes brut',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'date'
                    },{
                        name: 'interessement',
                        displayName: 'Intéressement',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'indemnites',
                        displayName: 'Indemnités',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'moy_charges_soc',
                        displayName: 'Moy. Charges Sociales',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    },{
                        name: 'total_cout',
                        displayName: 'TOTAL COUT',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'string'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngSalaireRemunerationGridApi = gridApi;
                }
            },
            salaireRepartition: {
                enableSelectAll: false,
                enableColumnMenus: false,
                minRowsToShow: 12,
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
                paginationPageSizes: [20, 50, 100],
                paginationPageSize: 50,
                showGridFooter: false,
                showColumnFooter: true,

                columnDefs: [
                    {
                        name: 'mois',
                        displayName: 'Mois',
                        pinnedLeft: false,
                        enableFiltering: false,
                        enableSorting: true,
                        type: 'string',
                        enableHiding: false
                    },{
                        name: 'heures_mensuelles',
                        displayName: 'H mens.',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'heures_supp',
                        displayName: 'H suppl.',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'jours_trav',
                        displayName: 'J trav.',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'jours_mal',
                        displayName: 'J mal.',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'jours_conges',
                        displayName: 'J congés',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'jours_abs',
                        displayName: 'J abs.',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'jours_formation',
                        displayName: 'J form.',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'jours_divers',
                        displayName: 'J divers',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    },{
                        name: 'total_jour',
                        displayName: 'TOTAL JOUR',
                        pinnedLeft: false,
                        enableFiltering: true, 
                        enableSorting: true,
                        type: 'number'
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.tngSalaireRepartitionGridApi = gridApi;
                }
            }
		};

		load_data();
	}
})();
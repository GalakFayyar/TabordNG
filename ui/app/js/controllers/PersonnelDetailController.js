(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('PersonnelDetailController', PersonnelDetailController);

	PersonnelDetailController.$inject = ['$scope', '$stateParams', '$modal', 'HelperService', 'PersonnelService', 'uiGridConstants', 'ngProgress'];
	function PersonnelDetailController ($scope, $stateParams, $modal, HelperService, PersonnelService, uiGridConstants, ngProgress) {
		$.AdminLTE.layout.activate();

		// $scope.selectedUser = {
		// 	id: '001',
		// 	nom: "FALC'HER",
		// 	prenom: "Thomas",
		// 	date_naissance: '07-07-1988',
		// 	lieu_naissance: 'QUIMPER',
		// 	civilite: 'M.',
		// 	num_insee: '00000001',
		// 	email: 'thomas.falcher@hotmail.fr',
		// 	telephone: {
		// 		fixe: '0102030405',
		// 		mobile: '0607080910'
		// 	},
		// 	observations: 'NEANT',
		// 	nationalite: 'FRANCAISE',
		// 	contrat: 'CDI',
		// 	date_fin: null,
		// 	adresse: {
		// 		num: '39',
		// 		libelle: 'RUE AURELIE NEMOURS',
		// 		cp: '35000',
		// 		ville: 'RENNES'
		// 	},
		// 	date_entree: "2016-01-01",
		// 	qualification: "INGENIEUR",
		// 	experience: {
		// 		scolaire: [
		// 			{ etablissement: 'LYCEE LE LIKES - QUIMPER', diplome: 'BACCALAUREAT SCIENTIFIQUE', date_obtention: '2006' },
		// 			{ etablissement: 'LYCEE CHARLES DE FOUCAULT - BREST', diplome: 'BREVET DE TECHNICIEN SUPERIEUR INFORMATIQUE DE GESTION', date_obtention: '2010' },
		// 			{ etablissement: 'ISEN - BREST', diplome: 'CERTIFICAT DE QUALIFICATION PARITAIRE DE LA METALLURGIE', date_obtention: '2011' },
		// 			{ etablissement: 'ISEN - BREST', diplome: 'DIPLOME D\'INGENIEUR', date_obtention: '2013' }
		// 		],
		// 		professionnelle: [
		// 			{
		// 				entreprise: 'ADRIA QUIMPER',
		// 				date_entree: new Date(2009, 12, 1),
		// 				date_sortie: new Date(2010, 3, 1),
		// 				qualification: 'TECHNICIEN SUPERIEUR',
		// 				motif: 'FIN DE STAGE',
		// 				stage: true
		// 			},
		// 			{
		// 				entreprise: 'SURAVENIR BREST',
		// 				date_entree: new Date(2010, 9, 1),
		// 				date_sortie: new Date(2011, 10, 1),
		// 				qualification: 'APPRENTIT INGENIEUR ETUDE',
		// 				motif: 'FIN DE CONTRAT DE PROFESSIONNALISATION',
		// 				stage: false
		// 			}
		// 		]
		// 	},
		// 	salaire: {
		// 		remuneration: [
		// 			{ mois: 'JANVIER', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'FEVRIER', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'MARS', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'AVRIL', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'MAI', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'JUIN', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'JUILLET', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'AOUT', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'SEPTEMBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'OCTOBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'NOVEMBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' },
		// 			{ mois: 'DECEMBRE', salaire_brut: '1967,91', primes_brut: '219,82', interessement: '145,92', indemnites: '87,75', moy_charges_soc: '312,59', total_cout: '2471,83' }
		// 		],
		// 		repartition: [
		// 			{ mois: 'JANVIER', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'FEVRIER', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'MARS', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'AVRIL', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'MAI', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'JUIN', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'JUILLET', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'AOUT', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'SEPTEMBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'OCTOBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'NOVEMBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' },
		// 			{ mois: 'DECEMBRE', heures_mensuelles: '147,87', heures_supp: '4,8', jours_trav: '13', jours_mal: '1', jours_conges: '2', jours_abs: '1',jours_formation: '3', jours_divers: '1', total_jour: '21' }
		// 		]
		// 	}
		// };

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
			PersonnelService.get({subresource: $stateParams.personnelId}, function (results) {
				console.log('results:', results);
				$scope.selectedUser = results.data[0];

				$scope.grid.experienceScolaire.data = $scope.selectedUser.data_personnel.experience.scolaire;
				$scope.grid.experienceProfessionnelle.data = $scope.selectedUser.data_personnel.experience.professionnelle;
				$scope.grid.salaireRemuneration.data = $scope.selectedUser.data_salaires.remuneration;
				$scope.grid.salaireRepartition.data = $scope.selectedUser.data_salaires.repartition;

				ngProgress.complete();
			}, function (error) {
				console.log(error);
				ngProgress.reset();
			});
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

		$scope.addExperienceScolaire = function () {
			var modalInstance = $modal.open({
				templateUrl: 'views/personnel/modal-add-experience.html',
				controller: 'PersonnelAddExperienceScolaireModalController',
				backdrop: 'static',
				resolve: {
					parameters: function () {
						// Déclaration des variables
						var modalTitle = 'Ajouter une expérience';
						var modalContent = '<form class="form-horizontal"> \
							<div class="form-group"> \
								<label for="inputNomEtablissement" class="col-sm-3 control-label">Etablissement</label> \
								<div class="col-sm-9"> \
									<input type="text" class="form-control" id="inputNomEtablissement" placeholder="Nom Etablissement" ng-model="newData.etablissement" /> \
								</div> \
							</div> \
							<div class="form-group"> \
								<label for="inputDiplome" class="col-sm-3 control-label">Diplôme</label> \
								<div class="col-sm-9"> \
									<input type="text" class="form-control" id="inputDiplome" placeholder="Diplome" ng-model="newData.diplome" /> \
								</div> \
							</div> \
							<div class="form-group"> \
								<label for="inputAnneeDiplome" class="col-sm-3 control-label">Année d\'obtention</label> \
								<div class="col-sm-9"> \
									<input type="text" class="form-control" id="inputAnneeDiplome" placeholder="Année" ng-model="newData.date_obtention" /> \
								</div> \
							</div> \
						</form>';
						// Retourne 1 objet avec toutes les variables
						return {
							modalTitle: modalTitle,
							modalContent: modalContent,
							currentPerson: $scope.selectedUser
						};
					}
				}
			});

			modalInstance.result.then(function (returned_element) {}, function (error) { console.log(error); });
		}

		$scope.addExperiencePro = function () {
			var modalInstance = $modal.open({
				templateUrl: 'views/personnel/modal-add-experience.html',
				controller: 'PersonnelAddExperienceProModalController',
				backdrop: 'static',
				resolve: {
					parameters: function () {
						// Déclaration des variables
						var modalTitle = 'Ajouter une expérience';
						var modalContent = '<form class="form-horizontal"> \
							<div class="form-group"> \
								<label for="inputNomEntreprise" class="col-sm-3 control-label">Entreprise</label> \
								<div class="col-sm-9"> \
									<input type="text" class="form-control" id="inputNomEntreprise" placeholder="Nom Entreprise" ng-model="newData.entreprise" /> \
								</div> \
							</div> \
							<div class="form-group"> \
								<label for="inputQualification" class="col-sm-3 control-label">Qualification</label> \
								<div class="col-sm-9"> \
									<input type="text" class="form-control" id="inputQualification" placeholder="Qualification" ng-model="newData.qualification" /> \
								</div> \
							</div> \
							<div class="form-group"> \
								<label for="inputDateEntree" class="col-sm-3 control-label">Date entrée</label> \
								<div class="col-sm-3"> \
									<input type="date" class="form-control" id="inputDateEntree" placeholder="Date entrée" ng-model="newData.date_entree" /> \
								</div> \
								<label for="inputDateSortie" class="col-sm-3 control-label">Date sortie</label> \
								<div class="col-sm-3"> \
									<input type="date" class="form-control" id="inputDateSortie" placeholder="Date sortie" ng-model="newData.date_sortie" /> \
								</div> \
							</div> \
							<div class="form-group"> \
								<label for="inputMotifDepart" class="col-sm-3 control-label">Motif du départ</label> \
								<div class="col-sm-4"> \
									<input type="text" class="form-control" id="inputMotifDepart" placeholder="Motif départ" ng-model="newData.motif" /> \
								</div> \
							</div> \
							<div class="form-group"> \
								<label for="inputStage" class="col-sm-3 control-label">Expérience Stage</label> \
								<div class="col-sm-9"> \
									<input type="checkbox" style="margin-top:12px;" id="inputStage" ng-model="newData.stage" /> \
								</div> \
							</div> \
						</form>';
						// Retourne 1 objet avec toutes les variables
						return {
							modalTitle: modalTitle,
							modalContent: modalContent,
							currentPerson: $scope.selectedUser
						};
					}
				}
			});

			modalInstance.result.then(function (returned_element) {}, function (error) { console.log(error); });
		}

		load_data();
	}

	/*#####################################################################################
	### ADD EXPERIENCE SCOLAIRE MODAL CONTROLLER
	#####################################################################################*/
	angular.module('tabordNG').controller('PersonnelAddExperienceScolaireModalController', PersonnelAddExperienceScolaireModalController);

	PersonnelAddExperienceScolaireModalController.$inject = ['$scope', '$rootScope', '$modalInstance', '$timeout', 'HelperService', 'PersonnelService', 'ngProgress', 'parameters'];
	function PersonnelAddExperienceScolaireModalController ($scope, $rootScope, $modalInstance, $timeout, HelperService, PersonnelService, ngProgress, parameters) {
		$scope.modalTitle = parameters.modalTitle;
		$scope.modalContent = parameters.modalContent;
		$scope.newData = { etablissement: null, diplome: null, date_obtention: null };
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		$scope.validate = function () {
			// Add experience to array
			console.log('newData:', $scope.newData);
			parameters.currentPerson.data_personnel.experience.scolaire.push({
				etablissement: $scope.newData.etablissement,
				diplome: $scope.newData.diplome,
				date_obtention: $scope.newData.date_obtention
			});

			ngProgress.start();
			// Fermeture Popup
			$modalInstance.dismiss();
			PersonnelService.addExperienceScolaire({}, function (operationResponse) {
				// message d'alerte
				var alert = {
					msg: 'Opération réalisée.',
					type: 'success'
				};
				$rootScope.alerts.push(alert);
				ngProgress.complete();

				// nettoyage de la liste des popin
				$timeout(function (){
					$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
				}, boRubriqueEditorConfig.timeoutAlertMessages);
			}, function (error) {
				console.log(error);
			});
		};
	}

	/*#####################################################################################
	### ADD EXPERIENCE PROFESIONNELLE MODAL CONTROLLER
	#####################################################################################*/
	angular.module('tabordNG').controller('PersonnelAddExperienceProModalController', PersonnelAddExperienceProModalController);

	PersonnelAddExperienceProModalController.$inject = ['$scope', '$rootScope', '$modalInstance', '$timeout', 'HelperService', 'PersonnelService', 'ngProgress', 'parameters'];
	function PersonnelAddExperienceProModalController ($scope, $rootScope, $modalInstance, $timeout, HelperService, PersonnelService, ngProgress, parameters) {
		$scope.modalTitle = parameters.modalTitle;
		$scope.modalContent = parameters.modalContent;
		$scope.newData = { entreprise: null, qualification: null, date_entree: null, date_sortie: null, motif_depart: null, stage: null };
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		$scope.validate = function () {
			// Add experience to array
			console.log('newData:', $scope.newData);
			parameters.currentPerson.data_personnel.experience.professionnelle.push($scope.newData);

			ngProgress.start();
			// Fermeture Popup
			$modalInstance.dismiss();
			PersonnelService.addExperienceScolaire({}, function (operationResponse) {
				// message d'alerte
				var alert = {
					msg: 'Opération réalisée.',
					type: 'success'
				};
				$rootScope.alerts.push(alert);
				ngProgress.complete();

				// nettoyage de la liste des popin
				$timeout(function (){
					$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
				}, boRubriqueEditorConfig.timeoutAlertMessages);
			}, function (error) {
				console.log(error);
			});
		};
	}
})();
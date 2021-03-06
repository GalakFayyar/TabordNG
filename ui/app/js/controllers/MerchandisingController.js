(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MerchandisingFormsController', MerchandisingFormsController);
	angular.module('tabordNG').controller('MerchandisingDashboardController', MerchandisingDashboardController);

	MerchandisingFormsController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'HelperService', 'MerchandisingService'];
	function MerchandisingFormsController ($scope, $rootScope, $state, $timeout, HelperService, MerchandisingService) {
		$.AdminLTE.layout.activate();

		// Manage form display if action is triggered by user (create/update)
		$scope.displayForms = false;
		$scope.survey = { list: [], selected: undefined, search: undefined };
		$scope.logicielGestion = { list : [], selected: null };

		// Tab elements
		$scope.tab = {
			indicateurs: { active: true },
			contexte_environnemental: { active: null },
			contexte_interne: { active: null },
			profil_marketing: { active: null },
			politique_personnel: { active: null },
			gestion_stocks: { active: null },
			divers: { active: null }
		};

		// Alimentation des logiciels de gestion courant
		$scope.logicielGestion.list = [
			{libelle: "Alliance Premium", editeur: "Alliadis"},
			{libelle: "Premium", editeur: "Alliadis"},
			{libelle: "Périphar", editeur: "Alliadis (Aspline)"},
			{libelle: "Opus", editeur: "Alliadis (PG Informatique)"},
			{libelle: "PharmaVitale", editeur: "C.E.P.I Soft"},
			{libelle: "Caduciel V6", editeur: "Caduciel"},
			{libelle: "Esculape", editeur: "CIAM"},
			{libelle: "Winpharma", editeur: "Everys"},
			{libelle: "Crystal", editeur: "Infosoft"},
			{libelle: "Léo", editeur: "Isipharm"},
			{libelle: "Gestion pharmacie", editeur: "Julien Misiak"},
			{libelle: "PharmaLand", editeur: "La Source Informatique"},
			{libelle: "ActiPharm", editeur: "MSI2000"},
			{libelle: "LGPI", editeur: "Pharmagest"},
			{libelle: "CIP Primoris", editeur: "Pharmagest"},
			{libelle: "Logiphar", editeur: "Pharmavision"},
			{libelle: "Vindilis", editeur: "Vindilis"},
			{libelle: "VisioPharm", editeur: "Visiosoft"}
		];
		
		// Merchandising Form Values
		var initNewFormData = function () {
			$scope.survey.selected = {
				id: null,
				libelle: null,
				operator: ($rootScope.user != null && $rootScope.user.data != null) ? $rootScope.user.data.username : null,
				date_operation: HelperService.getCurrentDate(),
				pharmacie: {
					code: ($rootScope.pharmacie != undefined && $rootScope.pharmacie.selected != undefined) ? $rootScope.pharmacie.selected.id : null
				},
				forms: {
					indicateurs: {
						structureCA: {
							data: [
								{
									title: "Chiffre d'affaire H.T.",
									a2014: null,
									a2015: null,
									a2016: null,
									evolR1: null,
									evolR2: null,
									disabled: true // For angular-nvd3 : do not show this serie
								},{
									title: "TVA 2,10%",
									a2014: null,
									a2015: null,
									a2016: null,
									evolR1: null,
									evolR2: null
								},{
									title: "TVA 5,50%",
									a2014: null,
									a2015: null,
									a2016: null,
									evolR1: null,
									evolR2: null
								},{
									title: "TVA 20%",
									a2014: null,
									a2015: null,
									a2016: null,
									evolR1: null,
									evolR2: null
								}
							]
						},
						marge: {
							globale: null,
							prc: null
						},
						stocks: {
							data: [
								{
									title: "Stocks 2,10%",
									valeur: null,
									poidsCA: null,
									poidsStock: null,
									rationRotation: null
								},{
									title: "Stocks 5,50%",
									valeur: null,
									poidsCA: null,
									poidsStock: null,
									rationRotation: null
								},{
									title: "Stocks 20%",
									valeur: null,
									poidsCA: null,
									poidsStock: null,
									rationRotation: null
								},{
									title: "Stocks Total",
									valeur: null,
									poidsCA: null,
									poidsStock: null,
									rationRotation: null,
									disabled: true // For angular-nvd3 : do not show this serie
								}
							]
						},
						frequentation: {
							clientJour: null,
							panierMoyen: null,
							panierHorsOrdon: null
						},
						capaciteAccueil: {
							surfaceTotale: null,
							surfaceVente: null,
							surfaceReserve: null,
							nbPostesOrdonnance: null,
							nbPostesSansOrdonnance: null,
							nbPostesPara: null,
							amplitudeHoraire: null
						},
						ressourcesHumaines: {
							nbSalaries: null,
							nbETP: null,
							poidsMS: null,
							ratioMS: null
						},
						structurePersonnel: {
							nbTitulaires: null,
							nbPharmDiplo: null,
							nbPreparateurs: null,
							nbEstheticiennes: null,
							nbStagiaires: null,
							nbStockistes: null,
							nbPersoAdmin: null,
							nbFemmeMenage: null
						}
					},
					contexteEnvironnemental: {
						implantationVente: null,
						visibiliteLocal: null,
						accessibilite: null,
						commoditeStationnement: null,
						environnementCommercial: null,
						fluxPietonnier: null,
						fluxAutomobile: null,
						longeurVitrine: null,
						surface: {
							totale: null,
							clientele: null,
							bo: null,
							reserve: null
						},
						envMedicalGeneraliste: null,
						envMedicalSpecialiste: null,
						envCentresMedicaux: null,
						envMedicalHospitalier: null,
						concurrents: []
					},
					contexteInterne: {
						signalisation: {
							nombreDimensionEnseignes: null,
							visibilitePharmacie: null,
							panneaux: null,
							etatGeneral: null,
							proprete: null
						},
						vitrines: {
							eclairage: null,
							soin: null,
							personnalisees: null,
							thematiques: null,
							saisonnalisees: null,
							natureMessageDelivre: null,
							affichageHoraires: null,
							affichagePrix: null
						},
						eclairage: {
							repartition: null,
							puissance: null,
							mesure: {
								comptoirs: null,
								lineairesPara: null,
								lineairesOTC: null,
								ambiance: null
							},
							etat: null
						},
						sonorisation: {
							niveauSonore: null,
							natureProgrammeMusical: null
						},
						proprete: {
							sol: null,
							lineairesProduits: null,
							tenuesPersonnel: null
						},
						affichage: null,
						signaletique: null,
						audio: null,
						oneToOne: null,
						balisageLineaire: null,
						gestionFluxCirculation: null,
						mobilier: null,
						logiqueImplantation: null,
						reserve: {
							surface: null,
							organisation: null
						},
						comptoirs: {
							nombre: null,
							nombrePara: null
						}
					},
					profilMarketing: {
						accueilTel: {
							formationPersonnel: null,
							nbSonneries: null,
							phraseTypeAccueil: null,
							protocoleMiseAttente: null,
							decouverteObjetAppel: null,
							procedureTransmissionMessage: null,
							procedureConfirmPriseMessage: null,
							phraseTypeConges: null
						},
						accueilClientele: {
							pecClientEntree: null,
							phraseTypeAccueil: null,
							procedureReducDelaiAttente: null,
							efforAttente: null,
							exploDemande: null,
							exploCompl: null,
							phraseTypeConges: null
						},
						structureAssortiment: {
							dermatologie: null,
							cosmetique: null,
							solaires: null,
							amincissants: null,
							cremesMain: null,
							hygieneIntime: null,
							bebeDermo: null,
							bebeAccessoires: null,
							capillaires: null,
							pieds: null,
							hbd: null,
							contactologue: null,
							premiersSecours: null,
							complAlimentaires: null,
							dietMinceur: null,
							substRepas: null,
							herboristerie: null,
							veterinaire: null,
							douleursFievre: null,
							rhum: null,
							gorge: null,
							digestion: null,
							homeo: null,
							sevrageTabac: null,
							vitamines: null
						},
						lineaires: {
							potExpo: {
								largeur: null,
								profondeur: null,
								nbNiveaux: null,
								modularite: null
							},
							para: {
								nb: null,
								mld: null
							},
							otc: {
								nb: null,
								mld: null
							},
							effetMasse: null,
							logiqueImplantation: null
						},
						tdg: {
							nb: null,
							effetMasse: null,
							selectProd: null,
							balisagePrix: null
						},
						comptoirs: {
							nb: null,
							nbPara: null,
							encombrement: null,
							selectProd: null
						},
						balisage: {
							selectProd: null,
							carteGraphique: null
						},
						polPrix: {
							para: {
								gen: null,
								leader: null
							},
							otc: {
								gen: null,
								leader: null
							}
						},
						animPdv: {
							pertinenceTheme: null,
							clarteOffre: null,
							agressiviteComm: null,
							PeriodOperations: null
						}
					},
					politiquePersonnel: {
						fonctionnementInterne: {
							regles: {
								identification: null,
								formalisation: null,
								frequenceReajustement: null,
								collaborateursAssociesEvolution: null,
								controleApplication: null,
								polesDelegationResponsables: null,
								rolesRepartisCompetences: null,
								tachesConnuesReparties: null,
								procedureIntegration: null
							},
							communication: {
								projetEntreprise: null,
								objectifs: null,
								entretiensIndividuels: null,
								disponibiliteManager: null
							},
							communicationClientele: {
								connaissanceTitulaires: null,
								horairesOuvertures: null,
								polesResponsabilites: null,
								valeursEngagments: null,
								operationsPromotionnelles: null,
								politiquePrix: null
							},
							politiqueFormation: {
								formationCollaborateur: null,
								sensibilisationFormation: null,
								formationProduit: null,
								formationTechniquesVente: null
							},
							politiqueSalariale: {
								grilleSalariale: null,
								interetResultatEntreprise: null,
								planInteressementExistant: null
							}
						}
					},
					gestionStocks: {
						achats: {
							poleCompetence: null,
							calculPrixVente: null
						},
						informatique: {
							poleCompetence: null,
							majFichesProduits: null,
							calculPrixVente: null
						},
						stocks: {
							poleCompetenceReceptionCommandes: null,
							poleCompetenceVerifFactures: null
						},
						reapprovisionnementRayons: {
							poleCompetence: null,
							reapprovisionnementRayons: null,
							frequence: null
						}
					},
					divers: {
						informatique: {
							logicielGestion: null,
							nombrePostes: {
								comptoirs: null,
								para: null,
								bo: null,
								reserve: null,
								administratif: null
							},
							connectionInternet: {
								comptoirs: null,
								para: null,
								bo: null,
								reserve: null,
								administratif: null
							},
							offreLogicielle: {
								word: null,
								excel: null,
								autres: null
							},
							amplitudeHoraires: null
						}
					}
				}
			};
		};

		// Get All Forms for Current Pharmacy
		var getData = function () {
			$rootScope.ngProgress.start();
			if ($rootScope.pharmacie != undefined) {
				MerchandisingService.get_forms({'subaction': $rootScope.pharmacie.selected.id}, function (results) {
					$scope.survey.list = results.data;
					console.log($scope.survey.list);
					$rootScope.ngProgress.complete();
				}, function (error) {
					$rootScope.ngProgress.reset();
					console.log('Erreur getData(): ', error);
				});
			} else {
				$rootScope.ngProgress.reset();
				console.log("Aucune pharmacie sélectionnée...")
			}
		};

		// Save or Update Current Form
		$scope.saveForm = function () {
			if ($scope.survey.selected != undefined && $scope.survey.selected.id != null && $scope.survey.selected.id != -1) {
				// Case Update existing form
				MerchandisingService.update_form({}, {'form': $scope.survey.selected}, function (result) {
					$rootScope.ngProgress.complete();
					console.log(result);
				}, function (error) {
					$rootScope.ngProgress.reset();
					console.log('Erreur de mise à jour du formulaire: ', $scope.survey.selected);
				});
			} else {
				// Case Create new form
				MerchandisingService.create_form({}, {'form': $scope.survey.selected}, function (result) {
					// Get new id generated
					$scope.survey.selected.id = result.id;
					$rootScope.ngProgress.complete();
					console.log(result);
				}, function (error) {
					$rootScope.ngProgress.reset();
					console.log('Erreur de création du formulaire: ', $scope.survey.selected);
				});
			}

			$scope.displayForms = true;
		};

		// Create New Form
		$scope.createNewForm = function () {
			initNewFormData();
			$scope.survey.selected = undefined;
			$scope.survey.search = undefined;
			//$scope.survey.activate();
			$scope.displayForms = true;
		};

		// Delete Current Form
		$scope.deleteForm = function () {
			$scope.displayForms = false;
			MerchandisingService.delete_form({'subresource': $scope.survey.selected.id}, {}, function (result) {
				$rootScope.ngProgress.complete();
				console.log(result);
				getData();
				$scope.survey.selected = null;
			}, function (error) {
				$rootScope.ngProgress.reset();
				console.log('Erreur de suppression du formulaire: ', $scope.survey.selected);
			});
		};

		$scope.templatesUrl = {
			indicateurs: { ref: 'views/merchandising/form-indicateurs.html', current: 'views/merchandising/form-indicateurs.html'},
			contexte_environnemental: { ref: 'views/merchandising/form-context-environnemental.html', current: null},
			contexte_interne: { ref: 'views/merchandising/form-context-interne.html', current: null},
			profil_marketing: { ref: 'views/merchandising/form-profil-marketing.html', current: null},
			politique_personnel: { ref: 'views/merchandising/form-politique-personnel.html', current: null},
			gestion_stocks: { ref: 'views/merchandising/form-gestion-stock.html', current: null},
			divers: { ref: 'views/merchandising/form-divers.html', current: null}
		};

		var resetCurrentTemplatesURL = function () {
			$scope.templatesUrl.indicateurs.current = null;
			$scope.templatesUrl.contexte_environnemental.current = null;
			$scope.templatesUrl.contexte_interne.current = null;
			$scope.templatesUrl.profil_marketing.current = null;
			$scope.templatesUrl.politique_personnel.current = null;
			$scope.templatesUrl.gestion_stocks.current = null;
			$scope.templatesUrl.divers.current = null;
		};

		$scope.selectedFormTab = 'indicateurs';
		$scope.tabHeadingClick = function (tab) {
			$rootScope.ngProgress.start();
			resetCurrentTemplatesURL();
			$scope.templatesUrl[tab].current = $scope.templatesUrl[tab].ref;
			$rootScope.ngProgress.complete();
			if ($scope.selectedFormTab != tab) {
				$timeout(function(){
					$(":checkbox").labelauty();
					$(":radio").labelauty({ minimum_width: "100%" });
				}, 500);
				$scope.selectedFormTab = tab;
			}
		};

		// UI Init
		$timeout(function () {
			$(":checkbox").labelauty();
			$(":radio").labelauty({ minimum_width: "100%" });
			HelperService.initDatePicker('#dateForm');
			$rootScope.ngProgress.complete();
			getData();
		}, 500);

		$scope.refreshResults = function ($select) {
			var search = $select.search,
				list = angular.copy($select.items),
				FLAG = -1;
			//remove last user input
			list = list.filter(function (item) { 
				return item.id !== FLAG; 
			});
			if (!search) {
				$select.items = list;
			} else {
				initNewFormData();
				$scope.survey.selected.id = FLAG;
				$scope.survey.selected.libelle = search;
				$select.items = [$scope.survey.selected].concat(list);
				// var userInputItem = {
				//     id: FLAG, 
				//     libelle: search
				// };
				// $select.items = [userInputItem].concat(list);
				// $select.selected = userInputItem;
			}
		};

		// $scope.clear = function ($event, $select){
		//     $event.stopPropagation(); 
		//     //to allow empty field, in order to force a selection remove the following line
		//     $select.selected = undefined;
		//     //reset search query
		//     $select.search = undefined;
		//     //focus and open dropdown
		//     $select.activate();
		// };

		initNewFormData();

		// Indicateurs
		$scope.grid = {
			structureCA: {
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
						name: 'title',
						displayName: 'Taux TVA',
						pinnedLeft: true,
						enableFiltering: false,
						enableSorting: false,
						type: 'string',
						enableHiding: false,
						width: 150,
						cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
						//sort: { direction: uiGridConstants.ASC, priority: 1 } 
					},{
						name: 'a2014',
						field: 'a2014',
						displayName: '2014',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'a2015',
						displayName: '2015',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'evolR1',
						displayName: 'évol./A-1',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'a2016',
						displayName: '2016',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'evolR2',
						displayName: 'évol./A+1',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					}
				],
				onRegisterApi: function (gridApi) {
					$scope.tngStructureCAGridApi = gridApi;
				}
			},
			stocks: {
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
						name: 'title',
						displayName: 'Stocks / Taux TVA',
						pinnedLeft: true,
						enableFiltering: false,
						enableSorting: false,
						type: 'string',
						enableHiding: false,
						width: 150,
						cellTemplate: '<div class="ui-grid-cell-contents"><b>{{row.entity[col.field]}}</b></div>'
						//sort: { direction: uiGridConstants.ASC, priority: 1 } 
					},{
						name: 'valeur',
						displayName: 'valeur',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'poidsCA',
						displayName: 'Poids CA',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'poidsStock',
						displayName: 'Poids stock',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					},{
						name: 'rationRotation',
						displayName: 'Ratio rotation stock',
						pinnedLeft: true,
						enableFiltering: true, 
						enableSorting: true,
						type: 'string'
					}
				],
				onRegisterApi: function (gridApi) {
					$scope.tngStockGridApi = gridApi;
				}
			}
		};

		$scope.grid.structureCA.data = 'survey.selected.forms.indicateurs.structureCA.data';
		$scope.grid.stocks.data = 'survey.selected.forms.indicateurs.stocks.data';

		$scope.optionsStructureCAPieChart = {
			chart: {
				type: 'pieChart',
				height: 150,
				x: function(d){return d.title;},
				y: function(d){return d.a2016;},
				showLabels: false,
				duration: 500,
				//donutLabelsOutside: true,
				//labelThreshold: 0.01,
				//labelSunbeamLayout: false,
				legend: {
					margin: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}
				},
				legendPosition: 'right'
			}
		};

		$scope.optionsStocksPieChart = {
			chart: {
				type: 'pieChart',
				height: 150,
				x: function(d){return d.title;},
				y: function(d){return d.valeur;},
				showLabels: false,
				duration: 500,
				//donutLabelsOutside: true,
				//labelThreshold: 0.01,
				//labelSunbeamLayout: false,
				legend: {
					margin: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}
				},
				legendPosition: 'right'
			}
		};
	}

	MerchandisingDashboardController.$inject = ['$scope', '$rootScope', '$timeout', 'HelperService', 'MerchandisingService'];
	function MerchandisingDashboardController ($scope, $rootScope, $timeout, HelperService, MerchandisingService) {
		// UI Init
		$timeout(function(){
			$rootScope.ngProgress.complete();
		}, 500);
	}
})();
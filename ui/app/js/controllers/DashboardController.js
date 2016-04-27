/* global $ */
(function() {
	'use strict';

	angular.module('tabordNG').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope'];
	function DashboardController ($scope) {

	}

	// boRubriqueEditorControllers.controller('DashboardController', [ '$scope', '$rootScope', '$filter', '$state', '$modal', '$timeout', 'ngProgress', 'uiGridConstants', 'uiGridEditConstants', 'boRubriqueEditorConfig', 'BoErStatusConfService', 'BoErRubriqueService', 'BoErSettingsService', 'HelperService', 
	// 	function ($scope, $rootScope, $filter, $state, $modal, $timeout, ngProgress, uiGridConstants, uiGridEditConstants, boRubriqueEditorConfig, BoErStatusConfService, BoErRubriqueService, BoErSettingsService, HelperService) {
	// 		HelperService.checkAdminLTELoaded();

	// 		$scope.breadcrumb = 'rubriques';
	// 		$scope.pageTitle = 'Rubriques';

	// 		ngProgress.color('#FFF');

	// 		$scope.tab_gridApi = [];

	// 		var showValue = function (role) {
	// 			return $rootScope.checkUserGranted('BO_ER', role) || $rootScope.checkUserGranted('BO_ER', 'ADMIN');
	// 		};

	// 		// Import fichier maj sur le serveur
	// 		$scope.importMajFile = function () {
	// 			var modalInstance = $modal.open(
	// 				{
	// 					templateUrl: 'app_edito_rubriques/views/dashboard/dashboard-modal-import.html',
	// 					controller: 'DashboardImportModalController',
	// 					backdrop: 'static',
	// 					resolve: {
	// 						parameters: function () {
	// 							// Déclaration des variables
	// 							var msg_desc = 'Utiliser cette fenêtre pour <b>mettre à jour des documents</b> dans le back-office via un fichier plat (.csv, .txt ou .dat).';
	// 							var listTypes = [
	// 								{ label: 'Rubriques', value: 'rubrique', show: showValue('UPLOAD') },
	// 								{ label: 'Reclassement des Rubriques', value: 'reclassement_rubriques', show: showValue('UPLOAD') },
	// 								{ label: 'Activités Voisines', value: 'activites_voisines', show: showValue('UPLOAD') },
	// 								{ label: 'Thèmes, Métiers, Génériques, Fines', value: 'themes_metiers_generiques_fines', show: showValue('UPLOAD') },
	// 								{ label: 'Verticales et Segments', value: 'verticales_segments', show: showValue('UPLOAD') }
	// 							];
	// 							// Retourne 1 objet avec toutes les variables
	// 							return {
	// 								actionLabel: 'Importer un fichier pour Mise à Jour',
	// 								descriptionLabel: msg_desc,
	// 								listTypes: listTypes
	// 							};
	// 						}
	// 					}
	// 				});

	// 			modalInstance.result.then(function (segment) {
	// 				$scope.segment_to_edit = segment;
	// 				$state.go('dashboard');
	// 			}, function () {
	// 			});
	// 		};

	// 		// Traitement peremption (fin nomenclature glissante)
	// 		$scope.launchOperationPeremption = function () {
	// 			var modalInstance = $modal.open(
	// 				{
	// 					templateUrl: 'app_edito_rubriques/views/dashboard/dashboard-modal-confirm-launch-operation.html',
	// 					controller: 'DashboardConfirmLaunchOperationPeremptionModalController',
	// 					backdrop: 'static',
	// 					resolve: {
	// 						descriptionOperationLabel: function () {
	// 							return 'Cette opération va modifier le statut "péremption" des rubriques. ' +
	// 								   'Toutes les rubriques dont le statut péremption est positionné à 1 passeront au statut 2. ' + 
	// 								   'Cela mettra également a jour leur statut de suppression. Voulez-vous lancer ce traitement ?';
	// 						},
	// 						actionLabel: function () {
	// 							return 'Mise à jour Péremption des rubriques';
	// 						}
	// 					}
	// 				}
	// 			);
	// 		};

	// 		// Popup d'affichage de la liste des activités voisines
	// 		$scope.showActivitesVoisines = function (rubrique) {
	// 			var modalInstance = $modal.open(
	// 				{
	// 					templateUrl: 'app_edito_rubriques/views/dashboard/dashboard-modal-show-activites-voisines.html',
	// 					controller: 'DashboardShowActivitesVoisinesModalController',
	// 					backdrop: 'static',
	// 					size: 'lg',
	// 					resolve: {
	// 						descriptionOperationLabel: function () {
	// 							return 'Les activités voisines à cette rubrique :';
	// 						},
	// 						actionLabel: function () {
	// 							return 'Consultation des activités Voisines';
	// 						},
	// 						selectedRubrique: function () {
	// 							return rubrique;
	// 						},
	// 						listRubriques: function () {
	// 							return $scope.rubriques;
	// 						}
	// 					}
	// 				}
	// 			);
	// 		};

	// 		$scope.disableReadOnlyMode = function () {
	// 			ngProgress.start();
	// 			BoErStatusConfService.unset({}, function (statusConf, getResponseHeaders) {
	// 				ngProgress.complete();
	// 			});
	// 		};

	// 		$scope.userGranted = $rootScope.checkUserGranted('BO_ER', 'CONNECT');
	// 		$scope.userAdministrateur = $rootScope.checkUserGranted('BO_ER', 'ADMIN');

	// 		$scope.userGrantedUpload = $rootScope.checkUserGranted('BO_ER', 'UPLOAD');
	// 		$scope.userGrantedExport = $rootScope.checkUserGranted('BO_ER', 'EXPORT');

	// 		var userGrantedEditEligContributif = $rootScope.checkUserGranted('BO_ER', 'CONTRIBUTIF'),
	// 			userGrantedEditEmbauche = $rootScope.checkUserGranted('BO_ER', 'EMBAUCHE'),
	// 			userGrantedEditEligibleHoraires = $rootScope.checkUserGranted('BO_ER', 'ELIGIBLE_HORAIRES'),
	// 			userGrantedEditZoneUrbaine = $rootScope.checkUserGranted('BO_ER', 'ZONE_URBAINE'),
	// 			userGrantedEditSensible = $rootScope.checkUserGranted('BO_ER', 'SENSIBLE'),
	// 			userGrantedEditUrgence = $rootScope.checkUserGranted('BO_ER', 'URGENCE'),
	// 			userGrantedEditMentionObligatoire = $rootScope.checkUserGranted('BO_ER', 'MENTION_OBLIGATOIRE'),
	// 			userGrantedEditExclusionPushBonPlan = $rootScope.checkUserGranted('BO_ER', 'EXCLUSION_PUSH_BON_PLAN'),
	// 			userGrantedEditLibelleCourt = $rootScope.checkUserGranted('BO_ER', 'LIBELLE_COURT'),
	// 			userGrantedEditThematiqueTransac = $rootScope.checkUserGranted('BO_ER', 'THEMATIQUE_TRANSAC'),
	// 			userGrantedEditPriorisationUV = $rootScope.checkUserGranted('BO_ER', 'PRIORISATION_UV'),
	// 			getCellTemplate = function (granted, type, field) {
	// 				var str,
	// 					custom_field = field || 'row.entity[col.field]';
	// 				switch (type) {
	// 					case 'boolean':
	// 						str = granted ? '<div><input type="checkbox" ng-model="' + custom_field + '" ng-change="grid.appScope.changeData(row.entity, col.field)"/></div>' : '<div class="glyphicon" ng-class="row.entity[col.field] ? \'glyphicon-ok\' : \'glyphicon-remove\'"></div>'
	// 						break;
	// 					case 'string':
	// 						str = granted ? '<div><input type="text" ng-model="' + custom_field + '" ng-change="grid.appScope.changeData(row.entity, col.field)"/></div>' : null;
	// 						break;
	// 					case 'number':
	// 						str = granted ? '<div><input type="number" ng-model="' + custom_field + '" ng-change="grid.appScope.changeData(row.entity, col.field)"/></div>' : null;
	// 						break;
	// 				}
	// 				if (str) {
	// 					return str;
	// 				}
	// 			};

	// 		$scope.showSaveButton = $scope.userGrantedUpload || 
	// 								userGrantedEditEligContributif || 
	// 								userGrantedEditEmbauche || 
	// 								userGrantedEditEligibleHoraires || 
	// 								userGrantedEditZoneUrbaine || 
	// 								userGrantedEditSensible || 
	// 								userGrantedEditUrgence || 
	// 								userGrantedEditMentionObligatoire ||
	// 								userGrantedEditExclusionPushBonPlan || 
	// 								userGrantedEditLibelleCourt || 
	// 								userGrantedEditThematiqueTransac;

	// 		$scope.defaultBooleanSelectValues = HelperService.getDefaultBooleanSelectValues();
	// 		$scope.boErRubriquesGrid = {
	// 			enablePinning: true,
	// 			enableSelectAll: true,

	// 			paginationPageSizes: [25, 50, 100],
	// 			paginationPageSize: HelperService.getPaginationOptions().pageSize,
	// 			enableGridMenu: true,
	// 			enableFiltering: true,
	// 			useExternalFiltering: false,
	// 			rowEditWaitInterval: -1,
	// 			enableCellEdit: false,
	// 			enableCellEditOnFocus: false,
	// 			exporterMenuPdf: false,
	// 			exporterCsvColumnSeparator: ';',
	// 			exporterFieldCallback: HelperService.getExporterCallback(),

	// 			columnDefs: [
	// 				{
	// 					name: 'code_an8',
	// 					displayName: 'AN8',
	// 					pinnedLeft: true,
	// 					enableFiltering: true,
	// 					enableSorting: true,
	// 					width: 70,
	// 					type: 'string',
	// 					cellTemplate: '<div class="ui-grid-cell-contents"><a href="" ng-click="grid.appScope.edit(row.entity)">{{row.entity[col.field]}}</a></div>',
	// 					sort: { direction: uiGridConstants.ASC, priority: 1 } 
	// 				},{
	// 					name: 'code_an9',
	// 					displayName: 'AN9',
	// 					pinnedLeft: true,
	// 					enableFiltering: true, 
	// 					enableSorting: true,
	// 					width: 80,
	// 					type: 'string',
	// 				},{
	// 					name: 'libelle',
	// 					displayName: 'Libellé',
	// 					pinnedLeft: true,
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().largerColWidth,
	// 					type: 'string',
	// 					cellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'string'),
	// 					editableCellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'string'),
	// 					filter: {
	// 						condition: function (searchTerm, cellValue) {
	// 							var separators = ['-', '/', ':', ';', ','],
	// 								strippedValue = searchTerm.split(new RegExp(separators.join('|'), 'g')),
	// 								bReturnValue = false;
	// 							for(var iIndex in strippedValue){
	// 								var sValueToTest = strippedValue[iIndex];
	// 								sValueToTest = sValueToTest.replace(' ', '');
	// 								if (cellValue.toLowerCase().indexOf(sValueToTest.toLowerCase()) >= 0)
	// 									bReturnValue = true;
	// 							}
	// 							return bReturnValue;
	// 						}
	// 					}
	// 				},{
	// 					name: 'segment',
	// 					field: 'segment.libelle',
	// 					displayName: 'Segments',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string'
	// 				},{
	// 					name: 'verticale',
	// 					field: 'segment.verticale.libelle',
	// 					displayName: 'Verticales',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string'
	// 				},{
	// 					name: 'a_risque',
	// 					displayName: 'A risque',
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().minimalColWidth,
	// 					type: 'number',
	// 					visible: $scope.userGranted
	// 				},{
	// 					name: 'categorie_rubriquage', 
	// 					displayName: 'Catégorie Rubriquage', 
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: $scope.userGranted
	// 				},{
	// 					name: 'eligible_selfcare',
	// 					displayName: 'Eligible Selfcare',
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					editableCellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						selectOptions: HelperService.getDefaultBooleanSelectValues()
	// 					},
	// 					visible: $scope.userGranted
	// 				},{
	// 					name: 'gratuite',
	// 					displayName: 'Gratuité',
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					editableCellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						selectOptions: HelperService.getDefaultBooleanSelectValues()
	// 					}
	// 				},{
	// 					name: 'impliquante',
	// 					displayName: 'Impliquante',
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					editableCellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						selectOptions: HelperService.getDefaultBooleanSelectValues()
	// 					}
	// 				},{
	// 					name: 'peremption',
	// 					displayName: 'Péremption',
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'number',
	// 					filter: {
	// 						//term: '1', // affichage peremption 0 et 1 par défaut : ISSUE : probleme rafraichissement données footer : contournement via param prog
	// 						condition: function (searchTerm, cellValue) {
	// 							var separators = ['-', '/', ':', ';', ','],
	// 								strippedValue = searchTerm.split(new RegExp(separators.join('|'), 'g')),
	// 								bReturnValue = false;
	// 							for(var iIndex in strippedValue){
	// 								var sValueToTest = strippedValue[iIndex];
	// 								sValueToTest = sValueToTest.replace(' ', '');
	// 								var strCellValue = cellValue + '';
	// 								if (strCellValue.indexOf(sValueToTest) >= 0)
	// 									bReturnValue = true;
	// 							}
	// 							return bReturnValue;
	// 						}
	// 					}
	// 				},{
	// 					name: 'saisie_autres_activites',
	// 					displayName: 'Saisie d\'autres activités',
	// 					enableFiltering: true,
	// 					enableCellEdit: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: $scope.userGrantedUpload || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					editableCellTemplate: getCellTemplate($scope.userGrantedUpload || $scope.userAdministrateur, 'boolean'),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						selectOptions: HelperService.getDefaultBooleanSelectValues()
	// 					},
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'contributif',
	// 					field: 'contributif.value',
	// 					displayName: 'Eligible Contributif',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditEligContributif || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditEligContributif || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('contributif', userGrantedEditEligContributif || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('contributif', userGrantedEditEligContributif || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('contributif')
	// 					},
	// 					visible: userGrantedEditEligContributif
	// 				},{
	// 					name: 'photo',
	// 					field: 'photo.value',
	// 					displayName: 'Eligibilité Photo',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditEligContributif || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditEligContributif || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('photo', userGrantedEditEligContributif || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('photo', userGrantedEditEligContributif || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('photo')
	// 					},
	// 					visible: userGrantedEditEligContributif || $scope.userAdministrateur
	// 				},{
	// 					name: 'embauche',
	// 					field: 'embauche.value',
	// 					displayName: 'Embauche',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditEmbauche || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditEmbauche || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('embauche', userGrantedEditEmbauche || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('embauche', userGrantedEditEmbauche || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('embauche')
	// 					},
	// 					visible: userGrantedEditEmbauche || $scope.userAdministrateur
	// 				},{
	// 					name: 'eligible_horaires_fixe',
	// 					field: 'eligible_horaires_fixe.value',
	// 					displayName: 'Eligible Horaires Fixe',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditEligibleHoraires || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditEligibleHoraires || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('eligible_horaires_fixe', userGrantedEditEligibleHoraires || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('eligible_horaires_fixe', userGrantedEditEligibleHoraires || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('eligible_horaires_fixe')
	// 					},
	// 					visible: userGrantedEditEligibleHoraires || $scope.userAdministrateur
	// 				},{
	// 					name: 'eligible_horaires_mobile',
	// 					field: 'eligible_horaires_mobile.value',
	// 					displayName: 'Eligible Horaires Mobile',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditEligibleHoraires || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditEligibleHoraires || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('eligible_horaires_mobile', userGrantedEditEligibleHoraires || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('eligible_horaires_mobile', userGrantedEditEligibleHoraires || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('eligible_horaires_mobile')
	// 					},
	// 					visible: userGrantedEditEligibleHoraires || $scope.userAdministrateur
	// 				},{
	// 					name: 'eligible_horaires_tablette',
	// 					field: 'eligible_horaires_tablette.value',
	// 					displayName: 'Eligible Horaires Tablette',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditEligibleHoraires || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditEligibleHoraires || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('eligible_horaires_tablette', userGrantedEditEligibleHoraires || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('eligible_horaires_tablette', userGrantedEditEligibleHoraires || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('eligible_horaires_tablette')
	// 					},
	// 					visible: userGrantedEditEligibleHoraires || $scope.userAdministrateur
	// 				},{
	// 					name: 'parution_en_zone_urbaine',
	// 					field: 'parution_en_zone_urbaine.value',
	// 					displayName: 'Parution en Zone Urbaine',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditZoneUrbaine || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditZoneUrbaine || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('parution_en_zone_urbaine', userGrantedEditZoneUrbaine || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('parution_en_zone_urbaine', userGrantedEditZoneUrbaine || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('parution_en_zone_urbaine')
	// 					},
	// 					visible: userGrantedEditZoneUrbaine || $scope.userAdministrateur
	// 				},{
	// 					name: 'theme',
	// 					field: 'theme.libelle',
	// 					displayName: 'Thème',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'metier',
	// 					field: 'metier.libelle',
	// 					displayName: 'Métier',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'nature',
	// 					field: 'nature',
	// 					displayName: 'Nature',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'rubrique_generique',
	// 					field: 'rubrique_generique.libelle',
	// 					displayName: 'Rubrique Générique',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'sensible',
	// 					field: 'sensible.value',
	// 					displayName: 'Sensible',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditSensible || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditSensible || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().minimalColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('sensible', userGrantedEditSensible || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('sensible', userGrantedEditSensible || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('sensible')
	// 					},
	// 					visible: userGrantedEditSensible || $scope.userAdministrateur
	// 				},{
	// 					name: 'urgence',
	// 					field: 'urgence.value',
	// 					displayName: 'Urgence',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditUrgence || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditUrgence || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().minimalColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('urgence', userGrantedEditUrgence || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('urgence', userGrantedEditUrgence || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('urgence')
	// 					},
	// 					visible: userGrantedEditUrgence || $scope.userAdministrateur
	// 				},{
	// 					name: 'mention_obligatoire',
	// 					field: 'mention_obligatoire.value',
	// 					displayName: 'Mention Obligatoire',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditMentionObligatoire || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditMentionObligatoire || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('mention_obligatoire', userGrantedEditMentionObligatoire || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('mention_obligatoire', userGrantedEditMentionObligatoire || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('mention_obligatoire')
	// 					},
	// 					visible: userGrantedEditMentionObligatoire || $scope.userAdministrateur
	// 				},{
	// 					name: 'exclusion_push_bon_plan',
	// 					field: 'exclusion_push_bon_plan.value',
	// 					displayName: 'Exclusion Push Bon Plan',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditExclusionPushBonPlan || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditExclusionPushBonPlan || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('exclusion_push_bon_plan', userGrantedEditExclusionPushBonPlan || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('exclusion_push_bon_plan', userGrantedEditExclusionPushBonPlan || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('exclusion_push_bon_plan')
	// 					},
	// 					visible: userGrantedEditExclusionPushBonPlan || $scope.userAdministrateur
	// 				},{
	// 					name: 'libelle_court',
	// 					field: 'libelle_court.value',
	// 					displayName: 'Libellé court',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditLibelleCourt || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditLibelleCourt || $scope.userAdministrateur,
	// 					enableSorting: true,
	// 					cellTemplate: getCellTemplate(userGrantedEditLibelleCourt || $scope.userAdministrateur, 'string', 'row.entity[col.name].value'),
	// 					editableCellTemplate: getCellTemplate(userGrantedEditLibelleCourt || $scope.userAdministrateur, 'string', 'row.entity[col.name].value'),
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: userGrantedEditLibelleCourt || $scope.userAdministrateur
	// 				},{
	// 					name: 'activites_voisines',
	// 					displayName: 'Activités Voisines',
	// 					enableFiltering: false,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					cellTemplate: '<div class="ui-grid-cell-contents"><a ng-show="row.entity.activites_voisines.value.length > 0" href="" ng-click="grid.appScope.showActivitesVoisines(row.entity)">Afficher les activités voisines</a></div>',
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'thematique_transac',
	// 					displayName: 'Thématique Transac.',
	// 					enableFiltering: true,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					//cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity[col.name].libelle}}</div>',
	// 					enableCellEdit: userGrantedEditThematiqueTransac || $scope.userAdministrateur,
	// 					type: 'select',
	// 					cellTemplate: (userGrantedEditThematiqueTransac || $scope.userAdministrateur) ? '<ui-select ui-select-wrap ng-model="MODEL_COL_FIELD" theme="selectize" ng-disabled="disabled" append-to-body="true"> \
	// 												<ui-select-match placeholder="Sélectionner..."> \
	// 													<span>{{ COL_FIELD }}</span> \
	// 													<button class="clear-ui-select" ng-click="grid.appScope.clear($event, row, col)">X</button> \
	// 												</ui-select-match> \
	// 												<ui-select-choices repeat="item in col.colDef.editDropdownOptionsArray | filter: $select.search"> \
	// 													<span ng-bind-html="item | highlight: $select.search">{{ item }}</span> \
	// 												</ui-select-choices> \
	// 											</ui-select>' : '<div class="ui-grid-cell-contents">{{row.entity[col.name]}}</div>',
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'priorisation_uv',
	// 					field: 'priorisation_uv.value',
	// 					displayName: 'Priorisation UV',
	// 					enableFiltering: true,
	// 					enableCellEdit: userGrantedEditPriorisationUV || $scope.userAdministrateur,
	// 					enableCellEditOnFocus: userGrantedEditPriorisationUV || $scope.userAdministrateur,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: HelperService.getCellTemplateBoolean('priorisation_uv', userGrantedEditPriorisationUV || $scope.userAdministrateur),
	// 					editableCellTemplate: HelperService.getCellTemplateBoolean('priorisation_uv', userGrantedEditPriorisationUV || $scope.userAdministrateur),
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						condition: HelperService.checkConditionFilterBoolean('priorisation_uv')
	// 					},
	// 					visible: userGrantedEditPriorisationUV || $scope.userAdministrateur
	// 				},{
	// 					name: '_reclassement',
	// 					displayName: 'Reclassement',
	// 					enableFiltering: true,
	// 					enableSorting: false,
	// 					width: HelperService.getColumnsWidth().defaultWidth,
	// 					type: 'boolean',
	// 					cellClass: 'grid-align-center',
	// 					cellTemplate: '<div class="glyphicon" ng-class="row.entity[col.field] == true ? \'glyphicon-ok\' : \'glyphicon-remove\'"></div>',
	// 					cellFilter: 'booleanFilter',
	// 					filterCellFiltered: true,
	// 					filter: {
	// 						type: uiGridConstants.filter.SELECT,
	// 						selectOptions: HelperService.getDefaultBooleanSelectValues()
	// 					},
	// 					visible: $scope.userGrantedUpload || $scope.userAdministrateur
	// 				},{
	// 					name: 'user_modification',
	// 					displayName: 'Données modifiée par',
	// 					enableFiltering: true,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().mediumColWidth,
	// 					type: 'string',
	// 					visible: false
	// 				},{
	// 					name: 'date_creation',
	// 					displayName: 'Date de création',
	// 					enableFiltering: true,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().largerColWidth,
	// 					type: 'date',
	// 					visible: false
	// 				},{
	// 					name: 'date_modification',
	// 					displayName: 'Date de modification',
	// 					enableFiltering: true,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().largerColWidth,
	// 					type: 'date',
	// 					visible: false
	// 				},{
	// 					name: 'date_suppression',
	// 					displayName: 'Date de suppression',
	// 					enableFiltering: true,
	// 					enableSorting: true,
	// 					width: HelperService.getColumnsWidth().largerColWidth,
	// 					type: 'date',
	// 					visible: false
	// 				}
	// 			],

	// 			onRegisterApi: function (gridApi) {
	// 				$scope.boErRubriquesGridApi = gridApi;
	// 				gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
	// 					if (sortColumns.length === 0) {
	// 						HelperService.getPaginationOptions().sort = null;
	// 					} else {
	// 						HelperService.getPaginationOptions().sort = sortColumns[0].sort.direction;
	// 					}
	// 				});

	// 				// Edition cellule
	// 				gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
	// 					// Do your REST call here via $http.get or $http.post

	// 					// Valeur éditée : modification flag is_default_value
	// 					if (rowEntity[colDef.name] && rowEntity[colDef.name].is_default_value && (oldValue != newValue)) {
	// 						rowEntity[colDef.name].is_default_value = false;
	// 					}

	// 					// Si la valeur a effectivement été modifiée
	// 					if (oldValue != newValue) {
	// 						HelperService.changeFlagEditedOnRowEdited($scope.rubriques.data, rowEntity, colDef.name);
	// 						gridApi.rowEdit.setRowsDirty([rowEntity]);
	// 					}
	// 				});

	// 				$scope.tab_gridApi.push($scope.boErRubriquesGridApi);
	// 			}
	// 		};

	// 		// Fonction de modification de la valeur à partir d'un cellTemplate
	// 		$scope.changeData = function (rowEntity, colDef) {
	// 			$scope.boErRubriquesGridApi.rowEdit.setRowsDirty([rowEntity]);
	// 			// Changement du flag de la rubrique éditée
	// 			HelperService.changeFlagEditedOnRowEdited($scope.rubriques.data, rowEntity, colDef);

	// 			// Valeur éditée : modification flag is_default_value
	// 			if (rowEntity[colDef].is_default_value) {
	// 				rowEntity[colDef].is_default_value = false;
	// 			}
	// 		};

	// 		var loadListFieldMassEdit = function () {
	// 			// Alimentation champs "Edition en masse"
	// 			$scope.fields_list = [];
	// 			$scope.boErRubriquesGrid.columnDefs.forEach(function (column) {
	// 				if ((column.enableCellEdit || column.enableCellEditOnFocus) || $scope.userAdministrateur) {
	// 					$scope.fields_list.push(
	// 						{ name : column.name, libelle : column.displayName, type : column.type, values : column.editDropdownOptionsArray }
	// 					);
	// 				}
	// 			});
	// 			$scope.field_mass_edit = {};
	// 			$scope.field_mass_edit.selected = $scope.fields_list[-1];
	// 		};

	// 		$scope.confirmEdit = function () {
	// 			// Demande de confirmation
	// 			var edited_rubriques = $filter('filter')($scope.rubriques.data, function (d) {return d._edited; }),
	// 				nb_rubriques_edited = edited_rubriques.length;

	// 			var modalInstance = $modal.open(
	// 				{
	// 					templateUrl: 'app_edito_rubriques/views/dashboard/dashboard-modal-confirm-save.html',
	// 					controller: 'DashboardConfirmSaveModalController',
	// 					backdrop: 'static',
	// 					resolve: {
	// 						actionLabel: function () {
	// 							return 'Sauvegarde des rubriques éditées';
	// 						},
	// 						nbRubriquesEdited: function () {
	// 							return nb_rubriques_edited;
	// 						},
	// 						editedRubriques: function () {
	// 							return edited_rubriques;
	// 						},
	// 						scope: function () {
	// 							return $scope;
	// 						}
	// 				    }
	// 				}
	// 			);
	// 		};

	// 		// Suppression de la valeur sélectionnée dans ui-select
	// 		$scope.clear = function ($event, row, col) {
	// 			$event.stopPropagation();
	// 			row.entity[col.field] = undefined
	// 		};

	// 		$scope.massEdit = function () {
	// 			HelperService.massEdit($scope.boErRubriquesGridApi, $scope.rubriques.data, $scope.field_mass_edit, $scope.massEdit.newValue);
	// 		};

	// 		var getPage = function () {
	// 			ngProgress.start();

	// 			var query_params = ($scope.boErRubriquesGrid.useExternalPagination) ? {'offset' : HelperService.getPaginationOptions().offset, 'limit' : HelperService.getPaginationOptions().pageSize, 'filter_by_libelle' : $scope.filter_rubrique_by_libelle } : {'limit' : 5000 };
	// 				query_params.es_index = ($rootScope.selected_index) ? $rootScope.selected_index.index : null;

	// 			$scope.rubriques = BoErRubriqueService.list(query_params,
	// 				function (rubriques, getResponseHeaders) {
	// 					$scope.serverPagination = {
	// 						'paginationTotalItems': rubriques.meta.totalItems
	// 					};

	// 					var list_doc_connexes = ['contributif', 'photo', 'embauche', 'sensible', 'urgence', 'mention_obligatoire', 'exclusion_push_bon_plan', 'eligible_horaires_fixe', 'eligible_horaires_tablette', 'eligible_horaires_mobile', 'parution_en_zone_urbaine', 'priorisation_uv'],
	// 						list_values_doc_connexes = [];

	// 					// Récupération des valeurs possibles pour les documents connexes (avec valeur par défaut)
	// 					list_values_doc_connexes = HelperService.getListValuesSelectDocConnexe(list_doc_connexes, rubriques.data);

	// 					$scope.boErRubriquesGrid.totalItems = $scope.serverPagination.paginationTotalItems;

	// 					// Ajout d'une propiété 'edited_fields' listant les champs édités
	// 					rubriques.data.forEach(function (rubrique) {
	// 						rubrique.edited_fields = [];
	// 					});

	// 					$scope.boErRubriquesGrid.data = rubriques.data;

	// 					// Affichage des rubriques peremption 0 et 1
	// 					$scope.boErRubriquesGridApi.grid.getColDef('peremption').filter.term = '0,1';

	// 					// Application des entêtes de colonne (alimentation des listes déroulantes)
	// 					list_doc_connexes.forEach(function (doc_connexe) {
	// 						$scope.boErRubriquesGridApi.grid.getColDef(doc_connexe).filter.selectOptions = list_values_doc_connexes[doc_connexe];
	// 					});

	// 					ngProgress.complete();
	// 				}
	// 			);
				
	// 			BoErSettingsService.getThematiquesTransac({}, function (thematiques_transac, getResponseHeaders) {
	// 				// Traitement des Thématique transac recues
	// 				var list_thematiques_transac = thematiques_transac.data.value.split(",");

	// 				// Chargement de la liste des Thématiques Transactionnelles
	// 				$scope.boErRubriquesGridApi.grid.getColDef('thematique_transac').editDropdownOptionsArray = list_thematiques_transac;

	// 				loadListFieldMassEdit();
	// 			});
						
	// 		};

	// 		// timer nous servant à temporiser les recherches filtrées
	// 		$scope.$on('$destroy', function (event) {
	//     		if (angular.isDefined($scope.filterTimeout)) {
	//         		$timeout.cancel($scope.filterTimeout);
	//     		}
	// 		});

	// 		// init
	// 		getPage();

	// 		/* Gestion de l'alerte si modifications non sauvegardées */
	// 		// Flag de controle des données non sauvegardées avant perte du contexte
	// 		$scope.$on('$stateChangeStart', HelperService.getFunctionOnStateChanged($scope.tab_gridApi));
	// 	}
	// ]);

	// /*#################################################################################
	// ### IMPORT MODAL SCREEN
	// #####################################################################################*/
	// boRubriqueEditorControllers.controller('DashboardImportModalController', [ '$scope', '$rootScope', 'Upload', 'boRubriqueEditorConfig', 'BatchEditoRubriqueService', '$modal', '$modalInstance', 'parameters', '$timeout', 'ngProgress',
	// 	function ($scope, $rootScope, Upload, boRubriqueEditorConfig, BatchEditoRubriqueService, $modal, $modalInstance, parameters, $timeout, ngProgress) {	
	// 		$scope.actionLabel = parameters.actionLabel;
	// 		$scope.descriptionLabel = parameters.descriptionLabel;
	// 		$scope.listTypes = parameters.listTypes;

	// 		$scope.cancel = function () {
	// 			$modalInstance.dismiss('cancel');
	// 		};

	// 		var index = $scope.listTypes.map(function (e) { return e.show; }).indexOf(true);
	// 		$scope.selectedType = $scope.listTypes[index];

	// 		var compareData = function (config, ngProgress) {
	// 			var args = {
	// 				'type_doc': $scope.selectedType.value,
	// 				'source_file': config.file.name,
	// 				'user': $rootScope.user.username
	// 			};

	// 			$scope.avancement += 5; //15

	// 			// Etape 2 : Consultation des données modifiées par l'envoi et demande de validation
	// 			BatchEditoRubriqueService.compareDataBeforeIntegration(args, function (operationResponse) {
	// 				// Reconstruction de la donnée reçue
	// 				var tab_diff_imported_values = [],
	// 					list_fields = [],
	// 					list_fields_displayed = [];

	// 				$scope.avancement += 5; //20

	// 				list_fields = operationResponse.edited_documents.list_fields;
	// 				//console.log('list_fields : '); console.log(list_fields);
	// 				if (list_fields && list_fields.length > 0) {
	// 					list_fields.forEach(function (field) {
	// 						if (field == 'code_an8' || field == 'code_an9') {
	// 							list_fields_displayed.push(field);
	// 						} else {
	// 							list_fields_displayed.push(field + '_value_source');
	// 							list_fields_displayed.push(field + '_value_metier');
	// 						}
	// 					});
	// 				}

	// 				$scope.avancement += 10; //30

	// 				// Pour chaque différence remontée par le serveur
	// 				if (operationResponse.edited_documents.edited_data) {
	// 					//console.log('edited_data : '); console.log(operationResponse.edited_documents.edited_data);
	// 					operationResponse.edited_documents.edited_data.forEach(function (data) {
	// 						var field, tmp_data = {};

	// 						// Pour chaque champ de la donnée
	// 						for (field in data) {
	// 							if (typeof data[field] == 'string' || data[field] == null) {
	// 								tmp_data[field] = data[field];
	// 							} else {
	// 								if (data[field].hasOwnProperty('value_source')) {
	// 									tmp_data[field + '_value_source'] = data[field]['value_source']
	// 								}

	// 								if (data[field].hasOwnProperty('value_metier')) {
	// 									tmp_data[field + '_value_metier'] = data[field]['value_metier']
	// 								}
	// 							}
	// 						}
	// 						tab_diff_imported_values.push(tmp_data);
	// 					});	
	// 				}

	// 				$scope.avancement += 20; //50

	// 				var modalInstance = $modal.open({
	// 					templateUrl: 'app_edito_rubriques/views/dashboard/dashboard-modal-compare-import.html',
	// 					controller: 'DashboardImportCompareModalController',
	// 					backdrop: 'static',
	// 					size: 'lg',
	// 					resolve: {
	// 						tab_diff_imported_values: function () {
	// 							return tab_diff_imported_values;
	// 						},
	// 						list_fields: function () {
	// 							return list_fields;
	// 						},
	// 						list_fields_displayed: function () {
	// 							return list_fields_displayed;
	// 						},
	// 						actionLabel: function () {
	// 							return 'Comparaison de données';
	// 						},
	// 						descriptionOperationLabel: function () {
	// 							var str = 'Les lignes en cours d\'importation ci-dessous sont notées comme différentes ';
	// 								str += 'des données métiers actuellement utilisées dans l\'éditorialisation. Voulez-';
	// 								str += 'vous écraser les données éditorialisées dans le Back Office avec les données importées ?';
	// 							return str;
	// 						}
	// 					}
	// 				});

	// 				modalInstance.result.then(function () {
	// 					integrateData(config, ngProgress);
	// 				}, function () {
	// 					$scope.avancement = 0;
	// 					ngProgress.reset();
	// 				});
	// 			});
	// 		};

	// 		var integrateData = function (config, ngProgress) {
	// 			/*
	// 			 *	Mise à jour du document envoyé dans ES métier
	// 			 */
	// 			var args = {
	// 				'type_doc': $scope.selectedType.value,
	// 				'source_file': config.file.name,
	// 				'user': $rootScope.user.username
	// 			};

	// 			$scope.avancement += 30; //80

	// 			// Etape 3 : intégration du fichier envoyé
	// 			BatchEditoRubriqueService.updateDocuments(args, function (operationResponse) {
	// 				// message d'information
	// 				var alert = {
	// 					msg: 'Traitement du fichier lancé. Recharger la page pour visualiser les changements.',
	// 					type: 'info'
	// 				};
	// 				$rootScope.alerts.push(alert);
	// 				ngProgress.complete();

	// 				$scope.avancement = 100;

	// 				$scope.import_in_progress = false;

	// 				console.log(operationResponse);

	// 				// nettoyage de la liste des popin
	// 				$timeout(function (){
	// 					$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
	// 				}, boRubriqueEditorConfig.timeoutAlertMessages);
	// 			}, function () {
	// 				$scope.import_in_progress = false;
	// 			});
	// 		};

	// 		$scope.upload = function (with_compare) {
	// 			ngProgress.start();

	// 			// Vérou bouton Import pendant la durée de l'opération
	// 			$scope.import_in_progress = true;

	// 			var files = $scope.files;
	// 			if (files && files.length) {
	// 				for (var i = 0; i < files.length; i++) {
	// 					var file = files[i];
	// 					Upload.upload({
	// 						url: boRubriqueEditorConfig.apis.bo_edito_filtres.url + '14f/upload',
	// 						fields: {'username': $scope.username},
	// 						headers: {'Content-Type': 'text/csv'},
	// 						file: file
	// 					}).progress(function (evt) {
	// 						var progressPercentage = parseInt(100.0 * evt.loaded / (10 * evt.total));
	// 						$scope.avancement = progressPercentage;
	// 						//console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
	// 					}).success(function (data, status, headers, config) {
	// 						if (with_compare) {
	// 							compareData(config, ngProgress);
	// 						} else {
	// 							integrateData(config, ngProgress);
	// 						}
	// 					}).error(function (data, status, headers, config) {
	// 						// message d'alerte
	// 						var alert = {
	// 							msg: 'Problème lors de l\'envoi du fichier [' + config.file.name + '] sur le serveur',
	// 							type: 'error'
	// 						};
	// 						$rootScope.alerts.push(alert);
	// 						ngProgress.reset();

	// 						$scope.import_in_progress = false;

	// 						// nettoyage de la liste des popin
	// 						$timeout(function (){
	// 							$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
	// 						}, boRubriqueEditorConfig.timeoutAlertMessages);
	// 					});
	// 				}
	// 			}
	// 		};
	// 	}
	// ]);

	// /*#####################################################################################
	// ### CONFIRM SAVE EDITION MODAL SCREEN
	// #####################################################################################*/
	// boRubriqueEditorControllers.controller('DashboardConfirmSaveModalController', [ '$scope', '$rootScope', 'boRubriqueEditorConfig', 'BoErRubriqueService', '$modalInstance', '$timeout', 'ngProgress', 'actionLabel', 'nbRubriquesEdited', 'editedRubriques', 'scope', 
	// 	function ($scope, $rootScope, boRubriqueEditorConfig, BoErRubriqueService, $modalInstance, $timeout, ngProgress, actionLabel, nbRubriquesEdited, editedRubriques, scope) {	
	// 		$scope.actionLabel = actionLabel;
	// 		$scope.nbRubriquesEdited = nbRubriquesEdited;
	// 		$scope.cancel = function () {
	// 			$modalInstance.dismiss('cancel');
	// 		};
	// 		$scope.submitEdit = function () {
	// 			ngProgress.start();
	// 			// Suppression du flag (non enregistré dans ES)
	// 			editedRubriques.forEach(function (edited_rubrique){
	// 				delete edited_rubrique._edited;
	// 			});

	// 			BoErRubriqueService.updateEditedRubriques({}, {'rubriques': editedRubriques}, function (rubriqueUpdateResponse) {
	// 				//$timeout(function () {$state.go('segments.list');}, 2000);
	// 				var alert = {
	// 					msg: 'Modifications enregistrées',
	// 					type: 'success'
	// 				};
	// 				$rootScope.alerts.push(alert);
	// 				ngProgress.complete();

	// 				// Déselection des lignes précédemment éditées
	// 				scope.boErRubriquesGridApi.selection.clearSelectedRows();

	// 				//scope.boErRubriquesGridApi.rowEdit.flushDirtyRows(scope.boErRubriquesGridApi.grid);
	// 				// Clean Rows
	// 				var gridRows = scope.boErRubriquesGridApi.rowEdit.getDirtyRows();
	// 				var dataRows = gridRows.map( function (gridRow) { return gridRow.entity; });
	// 				scope.boErRubriquesGridApi.rowEdit.setRowsClean( dataRows );

	// 				// Fermeture Popup
	// 				$modalInstance.dismiss();

	// 				// // Reset flag edited values
	// 				// scope.editedNonSavedData.value = false;

	// 				// nettoyage de la liste des popin
	// 				$timeout(function (){
	// 					$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
	// 				}, boRubriqueEditorConfig.timeoutAlertMessages);
	// 			});
	// 		};
	// 	}
	// ]);

	// /*#####################################################################################
	// ### CONFIRM LAUNCH OPERATION PEREMPTION MODAL SCREEN
	// #####################################################################################*/
	// boRubriqueEditorControllers.controller('DashboardConfirmLaunchOperationPeremptionModalController', [ '$scope', '$rootScope', 'boRubriqueEditorConfig', 'BatchEditoRubriqueService', '$modalInstance', '$timeout', 'ngProgress', 'actionLabel', 'descriptionOperationLabel', 
	// 	function ($scope, $rootScope, boRubriqueEditorConfig, BatchEditoRubriqueService, $modalInstance, $timeout, ngProgress, actionLabel, descriptionOperationLabel) {	
	// 		$scope.actionLabel = actionLabel;
	// 		$scope.descriptionOperationLabel = descriptionOperationLabel;
	// 		$scope.cancel = function () {
	// 			$modalInstance.dismiss('cancel');
	// 		};
	// 		$scope.launchOperation = function () {
	// 			ngProgress.start();
	// 			// Fermeture Popup
	// 			$modalInstance.dismiss();
	// 			BatchEditoRubriqueService.peremptionOperation({}, function (operationResponse) {
	// 				// message d'alerte
	// 				var alert = {
	// 					msg: 'Opération réalisée. Recharger la page pour afficher les modifications.',
	// 					type: 'info'
	// 				};
	// 				$rootScope.alerts.push(alert);
	// 				ngProgress.complete();

	// 				// nettoyage de la liste des popin
	// 				$timeout(function (){
	// 					$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
	// 				}, boRubriqueEditorConfig.timeoutAlertMessages);
	// 			});
	// 		};
	// 	}
	// ]);

	// /*#####################################################################################
	// ###	LIST ACTIVITES VOISINES MODAL SCREEN
	// #####################################################################################*/
	// boRubriqueEditorControllers.controller('DashboardShowActivitesVoisinesModalController', [ '$scope', '$rootScope', 'boRubriqueEditorConfig', 'BatchEditoRubriqueService', '$modalInstance', '$timeout', 'ngProgress', 'actionLabel', 'descriptionOperationLabel', 'selectedRubrique', 'listRubriques', 
	// 	function ($scope, $rootScope, boRubriqueEditorConfig, BatchEditoRubriqueService, $modalInstance, $timeout, ngProgress, actionLabel, descriptionOperationLabel, selectedRubrique, listRubriques) {	
	// 		$scope.actionLabel = actionLabel;
	// 		$scope.descriptionOperationLabel = descriptionOperationLabel;
	// 		$scope.rubrique = selectedRubrique;
	// 		//$scope.liste_activites_voisines = selectedRubrique.activites_voisines.value;

	// 		// Récupération des libellés de rubrique
	// 		var list_rubriques_voisines = [];
	// 		selectedRubrique.activites_voisines.value.forEach(function (code_an9_rubrique_voisine) {
	// 			listRubriques.data.forEach(function (rubrique_list) {
	// 				if (rubrique_list.code_an9 == code_an9_rubrique_voisine) {
	// 					list_rubriques_voisines.push(rubrique_list);
	// 				}
	// 			})
	// 		});

	// 		$scope.liste_activites_voisines = list_rubriques_voisines

	// 		$scope.cancel = function () {
	// 			$modalInstance.dismiss('cancel');
	// 		};
	// 	}
	// ]);

	// /*#####################################################################################
	// ### COMPARE DATA MODAL CONTROLLER
	// #####################################################################################*/
	// boFilterEditorControllers.controller('DashboardImportCompareModalController', function ($scope, $modalInstance, list_fields, list_fields_displayed, tab_diff_imported_values, actionLabel, descriptionOperationLabel) {
	// 	$scope.list_fields = list_fields;
	// 	$scope.actionLabel = actionLabel;
	// 	$scope.descriptionOperationLabel = descriptionOperationLabel;
	// 	$scope.tab_diff_imported_values = tab_diff_imported_values;
	// 	$scope.list_fields_displayed = list_fields_displayed;

	// 	// Ajout du header secondaire (metier / source)
	// 	$scope.lineHeaderSourceMetier = [];
	// 	list_fields_displayed.forEach(function (elt) {
	// 		if (elt.indexOf('_value_source') > -1) {
	// 			$scope.lineHeaderSourceMetier.push({value: 'source'});
	// 		} else if (elt.indexOf('_value_metier') > -1) {
	// 			$scope.lineHeaderSourceMetier.push({value: 'metier'});
	// 		} else {
	// 			$scope.lineHeaderSourceMetier.push({value: ''});
	// 		}
	// 	});

	// 	$scope.validateImport = function () {
	// 		$modalInstance.close();
	// 	};

	// 	$scope.cancel = function () {
	// 		$modalInstance.dismiss('cancel');
	// 	};
	// });
})();
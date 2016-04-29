/* global $ */
(function() {
	'use strict';

	/* Helper Service */

	angular.module('tabordNG').factory('HelperService', HelperService);

	HelperService.$inject = ['$rootScope', '$filter', '$state', '$modal'];
	function HelperService ($rootScope, $filter, $state, $modal) {
		// Fonctions communes à la factory et exposée
		var _changeFlagEditedOnRowEdited = function (grid_data, rowEntity, colDef) {
				var column_name = colDef.name || colDef;
				// Changement du flag de la donnée éditée
				$filter('filter')(grid_data, function (d) {
					if (d._id === rowEntity._id) {
						d._edited = true;
						// Ajout du champ (s'il n'est pas déja présent) dans la liste des champs édités
						if (d.edited_fields && d.edited_fields.indexOf(column_name) === -1) {
							d.edited_fields.push(column_name);
						}
					}
				})[0];
			},
			_cleanDirtyRows = function (gridApi) {
				var gridRows = gridApi.rowEdit.getDirtyRows(),
					dataRows = gridRows.map( function ( gridRow ) { return gridRow.entity; });
				gridApi.rowEdit.setRowsClean( dataRows );
			},
			_setRowDirty = function (grid, rowEntity, colDef) {
				grid.api.rowEdit.setRowsDirty([rowEntity]);
				_changeFlagEditedOnRowEdited(grid.options.data, rowEntity, colDef);
			};
		return {
			changeFlagEditedOnRowEdited: function (grid_data, rowEntity, colDef) {
				_changeFlagEditedOnRowEdited(grid_data, rowEntity, colDef);
			},
			getPaginationOptions: function () {
				return {
					pageNumber: 1,
					pageSize: 25,
					offset : 0,
					sort: null
				};
			},
			getColumnsWidth: function () {
				return {
					defaultWidth: 150,
					minimalColWidth: 95,
					mediumColWidth: 225,
					largerColWidth: 300
				};
			},
			getDefaultGridSettings: function () {
				return {
					paginationPageSizes: [25, 50, 100],
					paginationPageSize: 25,
					enableGridMenu: true,
					enableFiltering: true,
					useExternalFiltering: false,
					rowEditWaitInterval: -1,
					enableCellEdit: false,
					enableCellEditOnFocus: false,
				};
			},
			getCellTemplateBoolean: function (type_doc, granted) {
				// Format de la cellule booléenne retournée pour les documents connexes
				var str = '<div>';
				if (granted) {
					str += '<input type="checkbox" ng-model="row.entity.' + type_doc + '.value" ng-change="grid.appScope.changeData(row.entity, \'' + type_doc + '\', grid)"/>';
				} else {
					str += '<div class="glyphicon" ng-class="(row.entity.' + type_doc + '.value == true || row.entity.' + type_doc + '.value == \'true\') ? \'glyphicon-ok\' : (row.entity.' + type_doc + '.value == false || row.entity.' + type_doc + '.value == \'false\') ? \'glyphicon-remove\' : \'glyphicon-ban-circle\'"></div>';
				}
				str += '<div ng-show="row.entity.' + type_doc + '.is_default_value" ng-class="{\'default-label\': row.entity.' + type_doc + '.is_default_value}">Auto.</div>';
				str += '</div>';
				return str;
			},
			getCellTemplateString: function (type_doc) {
				// Format de la cellule chaine retournée pour les documents connexes
				var str = '<div>';
				str += '{{row.entity.' + type_doc + '.value||row.entity.' + type_doc + '.libelle}}';
				str += '<div ng-show="row.entity.' + type_doc + '.is_default_value" ng-class="{\'default-label\': row.entity.' + type_doc + '.is_default_value}">Auto.</div>';
				str += '</div>';
				return str;
			},
			checkConditionFilterBoolean: function (type_doc) {
				// Fonction d'application du filtre de la liste déroulante
				return function (searchTerm, cellValue, row, column) {
					if (row.entity[type_doc].is_default_value && searchTerm.indexOf('_auto') > -1) {
						return true;
					} else {
						return (!row.entity[type_doc].is_default_value && searchTerm.toString() === cellValue.toString());
					}
				};
			},
			getEditedData: function (data) {
				// Fonction de retour des lignes éditées
				return $filter('filter')(data, function (d) {
					if (d._edited) {
						return d;
					}
				});
			},
			getFunctionOnStateChanged: function (tab_gridApi) {
				return function ( event, toState, toParams, fromState, fromParams ) {
					var data_saved = true;
					// Pour chaque grid : vérification si contient dirtyrows
					tab_gridApi.forEach(function (gridApi) {
						//data_non_saved = data_non_saved && (gridApi.rowEdit.getDirtyRows().length > 0);
						if (gridApi.grid.rowEdit && gridApi.grid.rowEdit.dirtyRows) {
							data_saved = data_saved && (gridApi.grid.rowEdit.dirtyRows.length == 0);
						}
					});

					if (!data_saved) {
						// Annulation de l'évenement tant qu'il n'y a pas eu de réponse par la modal
						event.preventDefault();

						var modal_content = '<div class="modal-header"><h3 class="modal-title">Confirmation</h3></div>';
						modal_content += '<div class="modal-body">Vous avez des modification en cours sur cette page. Quitter cette page (toutes vos modifications non enregistrées seront perdues) ?</div>';
						modal_content += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>';

						var modalInstance = $modal.open({
							template: modal_content,
							controller: 'ConfirmExitPageCtrl',
							resolve: {
								toState: function () {
									return toState;
								},
								toParams: function () {
									return toParams;
								}
							}
						}).result.then(function () {
							// Nettoyage des lignes dirty
							tab_gridApi.forEach(function (gridApi) {
								_cleanDirtyRows(gridApi);
							});						
							$state.go(toState, {}, {reload: (fromState == toState)? toState : false});
						}, function () {});
					}
				};
			},
			getDefaultBooleanSelectValues: function () {
				// return [ {value: true, label: 'true'}, {value: false, label: 'false'}, {value: 'default', label: 'default'}];
				return [ {value: true, label: 'true'}, {value: false, label: 'false'}];
			},
			cleanDirtyRows: function (gridApi) {
				_cleanDirtyRows(gridApi);
			},
			getFnSetRowDirty: function () {
				return function (grid, rowEntity, colDef) {
					_setRowDirty(grid, rowEntity, colDef);
				};
			},
			getListValuesSelectDocConnexe: function (list_doc_connexes, grid_data) {
				var list_values_doc_connexes = [];
				// Récupération des valeurs possibles pour les documents connexes (avec valeur par défaut)
				list_doc_connexes.forEach(function (doc_connexe) {
					var listOfValues = grid_data.reduce(function (a, d) {

						if (d[doc_connexe] && d[doc_connexe].value != null && d[doc_connexe].value.toString() && a.indexOf(d[doc_connexe].value.toString()) === -1 && !d[doc_connexe].is_default_value) {
							a.push(d[doc_connexe].value.toString());
						}

						if (d[doc_connexe] && d[doc_connexe].value != null && d[doc_connexe].value.toString() && a.indexOf(d[doc_connexe].value.toString() + '_auto') === -1 && d[doc_connexe].is_default_value) {
							a.push(d[doc_connexe].value.toString() + '_auto');
						} else if (a.indexOf('null_auto') === -1 && (d[doc_connexe] && d[doc_connexe].value == null)) {
							a.push('null_auto');
						}

						return a;
					}, []);

					list_values_doc_connexes[doc_connexe] = [];

					listOfValues.forEach(function (value) {
						list_values_doc_connexes[doc_connexe].push({
							value: value,
							label: value
						});
					});

					// Tri par label des données
					list_values_doc_connexes[doc_connexe].sort(function (a, b) {
						return a.label.localeCompare(b.label) === -1;
					});
				});
				return list_values_doc_connexes;
			},
			massEdit: function (gridApi, data, fieldMassEdit, newValue, mass_edit_option) {
				// Récupération des lignes sélectionnées
				var rows = gridApi.selection.getSelectedGridRows(),
					colDef = fieldMassEdit.selected;

				// Attribution de la nouvelle valeur pour chaque ligne
				rows.forEach(function (row) {
					_changeFlagEditedOnRowEdited(data, row.entity, colDef);

					// Valeur éditée : modification flag is_default_value
					if (row.entity[colDef.name] && row.entity[colDef.name].is_default_value) {
						row.entity[colDef.name].is_default_value = false;
					}

					// Passage en mode Dirty
					gridApi.rowEdit.setRowsDirty([row.entity]);

					// Si la donnée éditée est "complexe" (objet avec value)
					switch(mass_edit_option) {
						case "add":
							// Pour chaque nouvelle valeur recue du multiselect
							newValue.forEach(function (object_to_add) {
								// Si la valeur n'existe pas, on l'ajoute à la liste
								if (row.entity[colDef.name].indexOf(object_to_add) == -1) {
									row.entity[colDef.name].push(object_to_add);
								}
							});
							break;
						case "delete":
							newValue.forEach(function (object_to_delete) {
								row.entity[colDef.name].forEach(function (element, index) {
									if (element == object_to_delete) {
										row.entity[colDef.name].splice(index, 1);
									}
								});
							});
							break;
						// case "replace":
						//	cf. default ?
						// 	break;
						default:
							if (row.entity[colDef.name] && row.entity[colDef.name].hasOwnProperty('value')) {
								row.entity[colDef.name].value = newValue.value;
							} else {
								row.entity[colDef.name] = (newValue.value) || (newValue);
							}
					}
				});
			},
			getExporterCallback: function () {
				return function (grid, row, col, value) {
					if (value && value.value) {
						switch(typeof(value.value)) {
							case 'string':
								return value.value;
								break;
							case 'object':
								return value.value.reduce(function (a, b) { return a.concat(',', b); });
								break;
						} 
					} else if (value && value.libelle) {
						return value.libelle;
					} else if (value && value.code) {
						return value.code;
					} else {
						return value;
					}
				}
			},
			getFnClearSelectUI: function () {
				return function (event, grid, row, col) {
					event.stopPropagation();
					row.entity[col.field] = undefined;
					_setRowDirty(grid, row.entity, col);
				};
			}
		};
	}
})();
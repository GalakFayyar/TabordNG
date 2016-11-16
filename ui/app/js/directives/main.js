(function() {
	'use strict';

	/* Directives */

	angular.module('tabordNG').directive('bindHtmlCompile', bindHtmlCompile);
	angular.module('tabordNG').directive('uiSelectWrap', uiSelectWrap);
	angular.module('tabordNG').directive('ngReallyClick', reallyClick);
	angular.module('tabordNG').directive('resizeForm', resizeForm);
	// angular.module('tabordNG').directive('formMerchandisingContextEnvironnemental', formMerchandisingContextEnvironnemental);
	// angular.module('tabordNG').directive('formMerchandisingContextInterne', formMerchandisingContextInterne);
	// angular.module('tabordNG').directive('formMerchandisingProfilMarketing', formMerchandisingProfilMarketing);
	// angular.module('tabordNG').directive('formMerchandisingPolitiquePersonnel', formMerchandisingPolitiquePersonnel);
	// angular.module('tabordNG').directive('formMerchandisingGestionStock', formMerchandisingGestionStock);
	// angular.module('tabordNG').directive('formMerchandisingDivers', formMerchandisingDivers);
	// angular.module('tabordNG').directive('resize', resize);w

	bindHtmlCompile.$inject = ['$compile'];
	function bindHtmlCompile ($compile) {
		return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        }
	}

	function uiSelectWrap ($document, uiGridEditConstants) {
		return {
			restrict : 'A',
			link: function(scope, element, attr) {
				$document.on('click', docClick);
				function docClick(evt) {
					if ($(evt.target).closest('.ui-select-container').size() === 0) {
						scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
						$document.off('click', docClick);
					}
				}
			}
		}
	}

	resizeForm.$inject = ['$window'];
	function resizeForm ($window) {
		return function (scope, element) {
			var w = angular.element($window);
			scope.getWindowDimensions = function () {
				return {
					'h': w.height(),
					'w': w.width()
				};
			};
			scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
				scope.windowHeight = newValue.h;
				scope.windowWidth = newValue.w;

				var elt0 = $('.main-header').outerHeight(true),
					elt1 = $('.navbar').outerHeight(true),
					elt2 = $('.content-header').outerHeight(true),
					elt3 = $('.btn-forms').outerHeight(true),
					elt4 = $('.nav-tabs').outerHeight(true),
					elt5 = $('.main-footer').outerHeight(true);

				// calcul dynamique de la hauteur des grid en fonction des constituants de la page (info: outerHeight(true) = prise en compte margin)
				var elements_height = elt0 + elt1 + elt2 + elt3 + elt4 + elt5 + 50; // 30 = padding du content
				$(".tab-content").css('max-height', newValue.h - elements_height);
				$(".tab-content").css('overflow-y', 'auto');
				$(".tab-content").css('overflow-x', 'hidden');

				// calcul dynamique de la hauteur du contenu des tab en fonction des constituants de la page
				var border = $('.main-header').outerHeight() + $('.navbar').outerHeight() + $('.content-header').outerHeight(true) + $('.nav-tabs').outerHeight() + $('.btn-forms').outerHeight() + $('.main-footer').outerHeight();
				$(".content-tab").css('height', newValue.h - border);
			}, true);

			w.bind('resizeForm', function () {
				scope.$apply();
			});
		}
	}

	// resize.$inject = ['$window'];
	// function resize ($window) {
	// 	return function (scope, element) {
	// 		var w = angular.element($window);
	// 		scope.getWindowDimensions = function () {
	// 			return {
	// 				'h': w.height(),
	// 				'w': w.width()
	// 			};
	// 		};
	// 		scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
	// 			scope.windowHeight = newValue.h;
	// 			scope.windowWidth = newValue.w;

	// 			$.AdminLTE.layout.fix();
	// 			$.AdminLTE.layout.fixSidebar();

	// 			var elt0 = $('.main-header').outerHeight(true),
	// 				elt1 = parseInt($('.content').css('padding-top')) + parseInt($('.content').css('padding-bottom')),
	// 				elt2 = $('.content-header').outerHeight(true),
	// 				elt3 = $('.navbar-default').outerHeight(true),
	// 				elt4 = $('.nav-tabs').outerHeight(true),
	// 				elt5 = $('.main-footer').outerHeight();

	// 			// calcul dynamique de la hauteur des grid en fonction des constituants de la page (info: outerHeight(true) = prise en compte margin)
	// 			var border_grid = elt0 + elt1 + elt2 + elt3 + elt4 + elt5 + 2;
	// 			$(".boFilterEditoGrid").css('min-height', newValue.h - border_grid);
	// 			$(".boRubriquesEditoGrid").css('min-height', newValue.h - border_grid);

	// 			// calcul dynamique de la hauteur du contenu des tab en fonction des constituants de la page
	// 			var border = $('.main-header').outerHeight() + $('.navbar').outerHeight() + $('.content-header').outerHeight(true) + $('.nav-tabs').outerHeight() + $('.edit-page-button').outerHeight() + $('.main-footer').outerHeight();
	// 			$(".content-tab").css('height', newValue.h - border);
	// 		}, true);

	// 		w.bind('resize', function () {
	// 			scope.$apply();
	// 		});
	// 	}
	// }

	/* Confirmation d'opérations */
	/* http://plnkr.co/edit/DgE5eGGmGebQfWunhqqv?p=preview */
	function reallyClick ($modal) {
		var ModalInstanceCtrl = function($scope, $modalInstance) {
			$scope.ok = function() {
				$modalInstance.close();
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};
		};

		return {
			restrict: 'A',
			scope:{
				ngReallyClick:"&",
				item:"="
			},
			link: function(scope, element, attrs) {
				element.bind('click', function() {
					var message = attrs.ngReallyMessage || "Êtes-vous sûr ?";

					var modalHtml = '<div class="modal-header"><h3 class="modal-title">Confirmer l\'opération</h3></div>';
					modalHtml += '<div class="modal-body">' + message + '</div>';
					modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Annuler</button></div>';

					var modalInstance = $modal.open({
						template: modalHtml,
						controller: ModalInstanceCtrl
					});

					modalInstance.result.then(function() {
						scope.ngReallyClick({item:scope.item}); //raise an error : $digest already in progress
					}, function() {
						//Modal dismissed
					});
				});
			}
		}
	}

	// function formMerchandisingContextEnvironnemental () {
	// 	console.log("loading views/merchandising/form-context-environnemental.html");
	// 	return { restrict: 'E', templateUrl: 'views/merchandising/form-context-environnemental.html' };
	// }
	// function formMerchandisingContextInterne () {
	// 	console.log("loading views/merchandising/form-context-interne.html");
	// 	return { restrict: 'E', templateUrl: 'views/merchandising/form-context-interne.html' };
	// }
	// function formMerchandisingProfilMarketing () {
	// 	return { restrict: 'E', templateUrl: 'views/merchandising/form-profil-marketing.html' };
	// }
	// function formMerchandisingPolitiquePersonnel () {
	// 	return { restrict: 'E', templateUrl: 'views/merchandising/form-politique-personnel.html' };
	// }
	// function formMerchandisingGestionStock () {
	// 	return { restrict: 'E', templateUrl: 'views/merchandising/form-gestion-stock.html' };
	// }
	// function formMerchandisingDivers () {
	// 	return { restrict: 'E', templateUrl: 'views/merchandising/form-divers.html' };
	// }
})();
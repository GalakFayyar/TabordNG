(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MainController', MainController);
	angular.module('tabordNG').controller('HeaderController', HeaderController);
	angular.module('tabordNG').controller('LeftSideBarController', LeftSideBarController);
	angular.module('tabordNG').controller('FooterController', FooterController);

	MainController.$inject = ['$rootScope', '$scope', 'HelperService'];
	function MainController ($rootScope, $scope, HelperService) {
		// $scope.toto = "test";
		// var codes = TestService.get_codes_tva({}, function (values) {
		// 	console.log(values.data);
		// }, function (){
		// 	console.log('ERROR');
		// });
		$rootScope.user = HelperService.getCookieData();
	}

	HeaderController.$inject = ['$scope', '$state', '$timeout','PharmacieService'];
	function HeaderController ($scope, $state, $timeout, PharmacieService) {
		
		$timeout(function() {
			// Protection fermeture menu
			$('.dropdown-menu').click(function (event){
				event.stopPropagation();
			});
		}, 500);

		$scope.current_pharmacie = {
			periode: {
				available_periods: [
					{
						num: 1,
						libelle: "Janvier 2016"
					},
					{
						num: 2,
						libelle: "Février 2016"
					},
					{
						num: 3,
						libelle: "Mars 2016"
					}
				],
				selected: null
			}
		};

		var getPharmacies = function () {
			PharmacieService.get_all({}, function (results) {
				$scope.pharmacies = {
					list: results.data
				};
			}, function (error) {
				console.log('Erreur get_all_pharmacie(): ', error);
			});
		};

		$scope.changeSelectedPharmacie = function() {
			$state.reload();
		};

		getPharmacies();
	}

	LeftSideBarController.$inject = ['$scope', '$rootScope'];
	function LeftSideBarController ($scope, $rootScope) {
		// TODO : optimiser
		// Corrige le pb de synchro des chargements entre
		// les lib jquery et angularjs :
		// jquery semble chargé avant les éléments du dom
		// générés eux par angularjs ...
		// setTimeout(function() {
		// 	$.AdminLTE.tree('.sidebar-menu');
		// }, 500);
	}

	FooterController.$inject = ['$scope', 'tabordngConfig'];
	function FooterController ($scope, tabordngConfig) {
		$scope.version = tabordngConfig.version;
	}
})();
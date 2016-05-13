(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MainController', MainController);
	angular.module('tabordNG').controller('HeaderController', HeaderController);
	angular.module('tabordNG').controller('LeftSideBarController', LeftSideBarController);
	angular.module('tabordNG').controller('FooterController', FooterController);

	MainController.$inject = ['$scope', 'TestService'];
	function MainController ($scope, TestService) {
		$scope.toto = "test";
		var codes = TestService.get_codes_tva({}, function(values) {
			console.log(values.data);
		}, function (){
			console.log('ERROR');
		});
	}

	HeaderController.$inject = ['$scope'];
	function HeaderController ($scope) {
		$scope.toto = "test";
	}

	LeftSideBarController.$inject = ['$scope'];
	function LeftSideBarController ($scope) {

		// TODO : optimiser
		// Corrige le pb de synchro des chargements entre
		// les lib jquery et angularjs :
		// jquery semble chargé avant les éléments du dom
		// générés eux par angularjs ...
		setTimeout(function() {
			$.AdminLTE.tree('.sidebar-menu');
		}, 10);

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
	}

	FooterController.$inject = ['$scope', 'tabordngConfig'];
	function FooterController ($scope, tabordngConfig) {
		$scope.version = tabordngConfig.version;
	}
})();
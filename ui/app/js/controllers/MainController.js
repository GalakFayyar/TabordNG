(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MainController', MainController);
	angular.module('tabordNG').controller('HeaderController', HeaderController);
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

	FooterController.$inject = ['$scope', 'tabordngConfig'];
	function FooterController ($scope, tabordngConfig) {
		$scope.version = tabordngConfig.version;
	}
})();
(function() {
	'use strict';

	/* Controllers */

	angular.module('tabordNG').controller('MainController', MainController);
	angular.module('tabordNG').controller('HeaderController', HeaderController);
	angular.module('tabordNG').controller('FooterController', FooterController);

	MainController.$inject = ['$scope'];
	function MainController ($scope) {
		$scope.toto = "test";
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
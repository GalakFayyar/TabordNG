(function() {
	'use strict';

	angular.module('tabordNG').controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$rootScope', '$location', '$cookieStore', 'UserService', 'ConfigService', '$state'];
	function LoginController ($scope, $rootScope, $location, $cookieStore, UserService, ConfigService, $state) {	
		$scope.apiConfig = ConfigService.getConfig({}, function(apiConfig, getResponseHeaders) {
				$rootScope.permissions = apiConfig.permissions;
				$scope.features = apiConfig.features;

				$scope.listBackOffices = [];
				
				if ($scope.features.tabord_ng) {
					$scope.listBackOffices.push({
						name: 'TABORDNG',
						state: 'app',
						cle: 'BOER_EDITION',
						active: $scope.features.tabord_ng
					});
				}

				if (!angular.isDefined($rootScope.user)) {
					$rootScope.redirectLogin();
				} else {
					// TODO : default selon droit (premier bo autorisé pour le user)
					$state.go('/');
				}
			}
		);

		// initialisation des variables locales
		$scope.username = '';
		$scope.password = '';
		
		$scope.login = function() {
			UserService.authenticate($.param({username : $scope.username, password : $scope.password}), function(authenticatedUser) {
				$rootScope.user = authenticatedUser;

				UserService.check({accessType : $scope.selectedBackOffice.cle}, function() {
					UserService.getUser({username : $scope.username}, function(user) {
						$rootScope.user.actions = user.actions;
						$rootScope.user.selectedBackOffice = $scope.selectedBackOffice;
						// store authenticated user (i.e. token) into cookie
						if ($scope.rememberMe) {
							$cookieStore.put('tabordngUser', $rootScope.user);
						}

						//$location.path("/");
						$state.go('/');
					}, function(){
					});
				}, function(){
					$state.go('/');
					//delete $rootScope.user;
				});
			});
		};

		$scope.goToSelectedBo = function () {
			$rootScope.user = {
				username: 'anonymous'
			};
			$state.go('/');
		};

		$rootScope.checkUserGranted = function (action_to_check) {
			/*if ($rootScope.user && $rootScope.user.actions && $rootScope.user.actions.indexOf($rootScope.permissions[action_to_check]) != -1) {
				return true;
			} else {
				return false;
			}*/
			return ($rootScope.user && $rootScope.user.actions && $rootScope.user.actions.indexOf($rootScope.permissions[action_to_check]) != -1);
		};
	}
})();
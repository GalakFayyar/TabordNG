(function() {
	'use strict';

	angular.module('tabordNG').controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$rootScope', '$location', 'HelperService', 'UserService', 'PharmacieService', 'ConfigService', '$state'];
	function LoginController ($scope, $rootScope, $location, HelperService, UserService, PharmacieService, ConfigService, $state) {	
		/*$scope.apiConfig = ConfigService.getConfig({}, function(apiConfig, getResponseHeaders) {
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
					$state.go('app');
				}
			}
		);*/

		// initialisation des variables locales
		$scope.username = '';
		$scope.password = '';

		$rootScope.pharmacie = {
			selected : null
		};
		
		$scope.login = function() {
			$state.go('dashboard');

			// BOUCHON DEV
			// UserService.authenticate({}, {username: $scope.username, password: $scope.password}, function (authenticatedUser) {
			// 	console.log(authenticatedUser);
			// 	if (authenticatedUser.data && authenticatedUser.data.authenticated) {
			// 		console.log('authentication succesful');
			// 		$rootScope.user = authenticatedUser.data;

			// 		if ($scope.rememberMe) {
			// 			//$cookieStore.put('tabordngUser', $rootScope.user);
			// 			HelperService.setCookieData($rootScope.user);
			// 		}

			// 		$state.go('dashboard');
			// 	} else {
			// 		console.log('authentication failed');
			// 		$scope.authentication = {
			// 			status: 'failed',
			// 			message: 'Echec de l\'authentification avec ce username'
			// 		};
			// 	}
			// }, function (toto) {
			// 	console.log(toto);
			// });

			/*
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
						$state.go('app');
					}, function(){
					});
				}, function(){
					$state.go('app');
					//delete $rootScope.user;
				});
			});
			*/
		};

		// $scope.authenticate_anonymous = function () {
		// 	$rootScope.user = {
		// 		username: 'anonymous'
		// 	};
		// 	$state.go('app');
		// };

		$rootScope.checkUserGranted = function (action_to_check) {
			/*if ($rootScope.user && $rootScope.user.actions && $rootScope.user.actions.indexOf($rootScope.permissions[action_to_check]) != -1) {
				return true;
			} else {
				return false;
			}*/
			return ($rootScope.user && $rootScope.user.actions && $rootScope.user.actions.indexOf($rootScope.permissions[action_to_check]) != -1);
		};

		var getPharmacies = function () {
			PharmacieService.get_all({}, function (results) {
				//$scope.listPharmaciesGrid.data = results.data;
				$scope.pharmacies = {
					list: results.data
				};
				console.log($scope.pharmacies.list);
				$rootScope.pharmacie.selected = $scope.pharmacies.list[0];
				$rootScope.ngProgress.complete();
			}, function (error) {
				console.log('Erreur get_all_pharmacie(): ', error);
				$rootScope.ngProgress.reset();
			});
		};

		getPharmacies();
	}
})();
/* global boEditorControllers, $ */

'use strict';

boEditorControllers.controller('UserController', [ '$scope', '$rootScope', '$location', '$cookieStore', 'UserService', 'ConfigService', '$state', 
	function($scope, $rootScope, $location, $cookieStore, UserService, ConfigService, $state) {	
		$scope.apiConfig = ConfigService.getConfig({}, function(apiConfig, getResponseHeaders) {
				// Force rechargement adminLTE lors du logout / re login
				delete $rootScope.BOEF_adminLTE_already_loaded;
				delete $rootScope.BOER_adminLTE_already_loaded;

				$rootScope.permissions = apiConfig.permissions;
				$scope.features = apiConfig.features;

				$scope.listBackOffices = [];
				
				if ($scope.features.BO_RUB) {
					$scope.listBackOffices.push({
						name: 'BO_EDITO_RUBRIQUES',
						state: 'app_edito_rubriques',
						cle: 'BOER_EDITION',
						active: $scope.features.BO_RUB
					});
				}

				$scope.listBackOffices.push({
					name: 'BO_EDITO_FILTRES',
					state: 'app_edito_filtres',
					cle: 'BOEF_EDITION',
					active: true
				});

				// initialisation de la premiere valeur selectionnée
				$scope.selectedBackOffice = $scope.listBackOffices[0];

				if (!angular.isDefined($rootScope.user)) {
					$rootScope.redirectLogin();
				} else {
					// TODO : default selon droit (premier bo autorisé pour le user)
					$state.go($rootScope.user.selectedBackOffice.state);
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
							$cookieStore.put('pjBoUser', $rootScope.user);
						}

						//$location.path("/");
						$state.go($scope.selectedBackOffice.state);
					}, function(){
					});
				}, function(){
					$state.go($scope.selectedBackOffice.state);
					//delete $rootScope.user;
				});
			});
		};

		$scope.goToSelectedBo = function () {
			$rootScope.user = {
				username: 'anonymous'
			};
			$state.go($scope.selectedBackOffice.state);
		};

		$rootScope.checkUserGranted = function (bo, action_to_check) {
			if ($rootScope.user && $rootScope.user.actions && $rootScope.user.actions.indexOf($rootScope.permissions[bo][action_to_check]) != -1) {
				return true;
			} else {
				return false;
			}
		};

		$rootScope.changeBo = function(accessType, env) {
			delete $rootScope.BOEF_adminLTE_already_loaded;
			delete $rootScope.BOER_adminLTE_already_loaded;
			
			if (angular.isDefined($rootScope.user.token)) {
				UserService.check({accessType : accessType}, function() {
					UserService.getUser({username : $rootScope.user.username}, function(user) {
						$rootScope.user.actions = user.actions;
						$state.go(env);
					}, function(){
						$state.go(env);
					});
				}, function(){
					$state.go(env);
				});
			} else {
				$state.go(env);
			}
		};
	}
]);
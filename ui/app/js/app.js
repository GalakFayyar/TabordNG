(function() {
	'use strict';

	angular.module('tabordNG', [ 
		'ngRoute',
		'ngResource',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ngAnimate',
		'ui.bootstrap',
		'ui.router',
		'ui.grid',
		'ui.grid.resizeColumns',
		'ui.grid.cellNav',
		'ui.grid.autoResize',
		'ui.grid.pagination',
		'ui.grid.edit',
		'ui.grid.rowEdit',
		'ui.grid.selection',
		'ui.grid.grouping',
		'ui.grid.exporter',
		'ui.grid.pinning',
		'ui.select',
		'ngProgress',
		'toggle-switch',
		'nvd3'
	]);
	angular.module('tabordNG').config(tabordngConfiguration);
	angular.module('tabordNG').run(tabordngRun);

	tabordngConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'tabordngConfig'];
	function tabordngConfiguration ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, tabordngConfig) {
		// MVC routing patterns
		$urlRouterProvider.otherwise('/login');	// default route
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'views/common/login.html',
				controller: 'LoginController'
			})
			/******************************************************************/
			.state('app', {
				url: '/',
				templateUrl: 'views/index.html',
				controller: 'MainController'
			})
			/******************************************************************/
			.state('dashboard', {
				url: 'dashboard',
				views: {
					'content': {
						//templateUrl: 'app_edito_rubriques/views/dashboard/dashboard.tpl.html',
						templateUrl: 'views/dashboard/dashboard.html',
						controller: 'DashboardController'
					}
				},
				parent: 'app'
			})
			.state('pharmacie', {
				url: 'pharmacie',
				views: {
					'content': {
						templateUrl: 'views/dashboard/pharmacie.html',
						controller: 'PharmacieController'
					}
				},
				parent: 'app'
			})
			.state('pharmacie_chiffres', {
				url: 'pharmacie/chiffres',
				views: {
					'content': {
						templateUrl: 'views/dashboard/pharmacie_chiffres.html',
						controller: 'PharmacieChiffresController'
					}
				},
				parent: 'app'
			})
			/******************************************************************/
			.state('merchandising_dashboard', {
				url: 'merchandising/dashboard',
				views: {
					'content': {
						templateUrl: 'views/merchandising/dashboard.html',
						controller: 'MerchandisingDashboardController'
					}
				},
				parent: 'app'
			})
			.state('merchandising_forms', {
				url: 'merchandising/forms',
				views: {
					'content': {
						templateUrl: 'views/merchandising/forms.html',
						controller: 'MerchandisingFormsController'
					}
				},
				parent: 'app'
			})
			/******************************************************************/
			.state('personnel_salaires', {
				url: 'personnel/salaires',
				views: {
					'content': {
						templateUrl: 'views/personnel/salaires.html',
						controller: 'PersonnelSalairesController'
					}
				},
				parent: 'app'
			});
		$locationProvider.hashPrefix('!');

		// Register error provider that shows message on failed requests or redirects to login page on unauthenticated requests
		/*$httpProvider.interceptors.push(function ($q, $rootScope, $location, $timeout, $injector) {
			return {
				'responseError' : function (rejection) {
					var status = rejection.status,
						config = rejection.config,
						method = config.method,
						url = config.url;

					if (status == 401) {
						$rootScope.redirectLogin();
					}

					// gestion particulière des erreurs 500 prévisualisation : affichage message explicite dans la page et non dans alert
					if ($rootScope.page_source == 'previsualisation') {
						delete $rootScope.page_source;
						$rootScope.error_not_found = 'Aucune rubrique n\'est associée à cette recherche';
					} else {
						$rootScope.error = method + ' on ' + url + ' failed with status ' + status;
						var msgUtilisateur = (status == 403) ? 'Echec d\'authentification. Cet utilisateur n\'est pas autorisé à accéder à cette section. Vous êtes en lecture seule.' : 'Une erreur [' + status + '] est survenue.';
						var msgAlert = (($rootScope.currentBackOffice === 'BOEF' && $rootScope.isReadOnlyMode) || ($rootScope.currentBackOffice === 'BOER' && $rootScope.isReadOnlyModeBOER))? 'ATTENTION, site en lecture seule. La modification n\'a pas été prise en compte. ' + $rootScope.error : msgUtilisateur;
						var alert = {
							'msg': msgAlert,
							'type': 'danger'
						};

						$rootScope.alerts.push(alert);

						// nettoyage de la liste des popin
						$timeout(function (){
							$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
						}, tabordngConfig.timeoutAlertMessages);
					}

					// Annulation chargement si erreur
					var ngProgress = $injector.get('ngProgress');
					ngProgress.reset();

					return $q.reject(rejection);
				}
				'request' : function(config) {
					var isRestCall = config.url.indexOf('api') !== 0;
					//var isRestCall = (typeof config.url == 'string') ? (config.url.indexOf('api') != 0) : false;
					if (isRestCall && angular.isDefined($rootScope.user)) {
						var authToken = $rootScope.user.token;
						if (boFilterEditorConfig.useAuthTokenHeader) {
							config.headers['auth-token'] = authToken;
							// Ajout user si API filtre (pas pour requete auth par ex)
							if ((config.url.indexOf(boFilterEditorConfig.apis.bo_edito_filtres.url) != -1) || (config.url.indexOf(boFilterEditorConfig.apis.bo_edito_filtres_batchs.url) != -1)) {
								config.headers.user = $rootScope.user.username;
							}
						} else {
							config.url = config.url + '?token=' + authToken;
						}

						if (($rootScope.currentBackOffice === "BOEF" && $rootScope.isReadOnlyMode) || ($rootScope.currentBackOffice === "BOER" && $rootScope.isReadOnlyModeBOER) || !angular.isDefined($rootScope.user.token)) {
							var canceler = $q.defer();
							var forbiddenMethods = ['POST', 'PUT', 'DELETE'];
							// Permission de by-pass du readonly : si utilisation de l'url standard pour BOER
							if (forbiddenMethods.indexOf(config.method) >= 0 && config.url.indexOf('status/conf/readonly_mode/false') == -1) {
								// on annule la requête http
								config.timeout = canceler.promise;
								canceler.resolve();

								var ngProgress = $injector.get('ngProgress');
								ngProgress.reset();
							}
						}
					}
					return config || $q.when(config);
				}
			};
		});*/
	}

	tabordngRun.$inject = ['$rootScope', '$location', '$cookieStore', '$state', '$injector', 'ngProgress'];
	function tabordngRun ($rootScope, $location, $cookieStore, $state, $injector, ngProgress) {
		$rootScope.alerts = [];
		$rootScope.user = null;

		ngProgress.color('#000');
		ngProgress.height('3px');

		$rootScope.redirectLogin = function () {
			delete $rootScope.user;

			$cookieStore.remove('tabordngUser');

			// redirect homepage
			//$location.path('/login');
			$state.go('login');
		};

		$rootScope.closeAlert = function (index) {
			$rootScope.alerts.splice(index, 1);
		};

		$rootScope.closeError = function () {
			delete $rootScope.error;
		};

		$rootScope.closeSuccess = function () {
			delete $rootScope.success;
		};

		$rootScope.logout = function () {
			$rootScope.redirectLogin();
		};

		$rootScope.redirect = function (env) {
			// reset chargement en cours
			//var ngProgress = $injector.get('ngProgress');
			ngProgress.reset();
			
			$state.go(env);
		};

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
			//$rootScope.showLoader = true;
			ngProgress.start();
		})

		// // Try getting valid user from cookie or go to login page
		// var originalPath = $location.path();
		// var user = $cookieStore.get('tabordngUser');
		// if (angular.isDefined(user)) {
		// 	$rootScope.user = user;
		// }

		// $rootScope.redirect('login');

		// $rootScope.initialized = true;
	}
})();
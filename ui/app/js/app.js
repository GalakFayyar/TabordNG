"use strict";

angular.module("tabordNG", [ 
	"ngRoute",
	"ngResource",
	"ngCookies",
	"ngAnimate",
	"ngSanitize",
	"ui.bootstrap",
	"ui.router",
	"ui.grid",
	"ui.grid.resizeColumns",
	"ui.grid.cellNav",
	"ui.grid.autoResize",
	"ui.grid.pagination",
	"ui.grid.edit",
	"ui.grid.rowEdit",
	"ui.grid.selection",
	"ui.grid.grouping",
	"ui.grid.exporter",
	"ui.grid.pinning",
	"ui.select",
	"ngProgress",
	"tabordng.Config",
	"tabordng.Controllers",
	"tabordng.Services",
	"toggle-switch"
	]);
angular.module("tabordNG").config('tabordngConfiguration', tabordngConfiguration);
angular.module("tabordNG").run('tabordngRun', tabordngRun);

function tabordngConfiguration ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, tabordngConfig) {
	// MVC routing patterns
	$urlRouterProvider.otherwise("/app");	// default route
	$stateProvider
	.state("login", {
		url: "/login",
		templateUrl: "views/login.html",
		controller: "LoginController"
	})
	/******************************************************************/
	.state("app", {
		url: "/app",
		templateUrl: "app/views/index.html",
		controller: "MainController"
	});
	/******************************************************************/
	$locationProvider.hashPrefix("!");

	// Register error provider that shows message on failed requests or redirects to login page on unauthenticated requests
	$httpProvider.interceptors.push(function ($q, $rootScope, $location, $timeout, $injector) {
		return {
			"responseError" : function (rejection) {
				var status = rejection.status;
				var config = rejection.config;
				var method = config.method;
				var url = config.url;

				if (status == 401) {
					$rootScope.redirectLogin();
				}

				// gestion particulière des erreurs 500 prévisualisation : affichage message explicite dans la page et non dans alert
				if ($rootScope.page_source == "previsualisation") {
					delete $rootScope.page_source;
					$rootScope.error_not_found = "Aucune rubrique n'est associée à cette recherche";
				} else {
					$rootScope.error = method + " on " + url + " failed with status " + status;
					var msgUtilisateur = (status == 403) ? "Echec d'authentification. Cet utilisateur n'est pas autorisé à accéder à cette section. Vous êtes en lecture seule." : "Une erreur [" + status + "] est survenue.";
					var msgAlert = (($rootScope.currentBackOffice === "BOEF" && $rootScope.isReadOnlyMode) || ($rootScope.currentBackOffice === "BOER" && $rootScope.isReadOnlyModeBOER))? "ATTENTION, site en lecture seule. La modification n'a pas été prise en compte. " + $rootScope.error : msgUtilisateur;
					var alert = {
						"msg": msgAlert,
						"type": "danger"
					};

					$rootScope.alerts.push(alert);

					// nettoyage de la liste des popin
					$timeout(function (){
						$rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
					}, tabordngConfig.timeoutAlertMessages);
				}

				// Annulation chargement si erreur
				var ngProgress = $injector.get("ngProgress");
				ngProgress.reset();

				return $q.reject(rejection);
			}
		};
	});
}

function tabordngRun ($rootScope, $location, $cookieStore, $state, $injector) {
	$rootScope.alerts = [];

	$rootScope.redirectLogin = function () {
		delete $rootScope.user;

		$cookieStore.remove("tabordngUser");

		// redirect homepage
		//$location.path("/login");
		$state.go("login");
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
		var ngProgress = $injector.get("ngProgress");
		ngProgress.reset();
		
		$state.go(env);
	};

	// Try getting valid user from cookie or go to login page
	var originalPath = $location.path();
	var user = $cookieStore.get("tabordngUser");
	if (angular.isDefined(user)) {
		$rootScope.user = user;
	}

	$rootScope.redirect("login");

	$rootScope.initialized = true;
}
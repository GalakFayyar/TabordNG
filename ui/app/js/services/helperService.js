/* global $ */
(function() {
	'use strict';

	/* Helper Service */

	angular.module('tabordNG').factory('HelperService', HelperService);

	HelperService.$inject = ['$rootScope', '$cookies', '$filter'];
	function HelperService ($rootScope, $cookies, $filter) {
		var _user = "";
		// Fonctions communes à la factory et exposée
		return {
			setCookieData: function(user) {
				_user = user;
				$cookies.putObject("tabordngUser", _user);
			},
			getCookieData: function() {
				_user = $cookies.getObject("tabordngUser");
				return _user;
			},
			clearCookieData: function() {
				_user = "";
				$cookies.remove("tabordngUser");
			},
			getPaginationOptions: function () {
				return {
					pageNumber: 1,
					pageSize: 10,
					offset : 0,
					sort: null
				};
			},
			getCurrentDate: function () {
				var today = new Date(),
					dd = today.getDate(),
					mm = today.getMonth()+1, //January is 0!
					yyyy = today.getFullYear();
				if(dd<10)
					dd='0'+dd ;
				if(mm<10)
					mm='0'+mm;
				return dd+'/'+mm+'/'+yyyy;
			},
			initDatePicker: function (idDiv) {
				$.fn.datepicker.dates['fr'] = {
					days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
					daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
					daysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
					months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"],
					monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
					today: "Aujourd'hui",
					clear: "Annuler",
					titleFormat: "MM yyyy" /* Leverages same syntax as 'format' */
				};
				$.fn.datepicker.defaults.language = 'fr';
				$(idDiv).datepicker({ 
					autoclose: true, 
					format: 'yyyy-mm-dd',
					language: 'fr',
					weekStart: 1
				});
			},
			formatNumbers: function (number) {
				var _number = $filter('number')(number, 2); 
				return _number.replace(',', ' ');
			}
		};
	}
})();
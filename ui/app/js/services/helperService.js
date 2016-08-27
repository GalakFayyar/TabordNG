/* global $ */
(function() {
	'use strict';

	/* Helper Service */

	angular.module('tabordNG').factory('HelperService', HelperService);

	HelperService.$inject = ['$rootScope'];
	function HelperService ($rootScope) {
		// Fonctions communes à la factory et exposée
		return {
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
			}
		};
	}
})();
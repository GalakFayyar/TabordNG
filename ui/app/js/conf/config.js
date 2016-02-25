(function() {
	'use strict';

	/* Config */

	angular.module('tabordNG').constant('tabordngConfig', {
		'version': '0.0.1',
		'api': {
			'url': 'http://localhost/tabord_ng/api/' //TODO : define url authentification api
		},
		'activateLogging': true,
		'timeoutAlertMessages': 5000
	});
})();
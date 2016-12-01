(function() {
	'use strict';

	/* Config */

	angular.module('tabordNG').constant('tabordngConfig', {
		'version': '0.0.1',
		'api': {
			'url': 'http://localhost:5000/api/' //TODO : define url authentification api
			//'url': 'http://91.121.133.203:8077/api/'
		},
		'activateLogging': true,
		'timeoutAlertMessages': 5000
	});
})();

'use strict';

/* Services */

/**************************************************************************************************************** 
* REST client implementations
******************************/

var boEditorServices = angular.module('boEditor.Services', [ 'ngResource' ]);

/*****************************************************************
* API User Management
******************************/
boEditorServices.factory('UserService', [ '$resource', '$rootScope', 'boEditorConfig', 
	function($resource, $rootScope, boEditorConfig) {
		return $resource(boEditorConfig.apis.user_management.url + ':action/:username/:accessType', {}, {
			authenticate : {
				method : 'POST',
				params : {
					'action' : 'token'
				},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			},
			check : {
				method : 'GET',
				params : {
					'action' : 'check'
				}
			},
			getUser : {
				method : 'GET',
				params : {
					'action' : 'users'
				}
			},
			logout : {
				method : 'POST',
				params : {
					'action' : 'logout'
				}
			},
			register : {
				method : 'POST',
				params : {
					'action' : 'register'
				},
				headers : {
					'Content-Type' : 'application/json'
				}
			}
		});
	}
]);
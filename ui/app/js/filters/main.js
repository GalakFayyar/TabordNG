(function() {
	'use strict';

	/* Filters */
	/*
	*	Filtre qui permet de remplacer ngBindHtmlUnsafe
	*/
	angular.module('tabordNG').filter('unsafe', unsafe);
	function unsafe ($sce) {
		return function (html) {
			return $sce.trustAsHtml(html);
		};
	}

	/**
	 * AngularJS default filter with the following expression:
	 * "person in people | filter: {name: $select.search, age: $select.search}"
	 * performs a AND between 'name: $select.search' and 'age: $select.search'.
	 * We want to perform a OR.
	 */
	angular.module('tabordNG').filter('propsFilter', propsFilter);
	function propsFilter () {
	  	return function (items, props) {
			var out = [];

			if (angular.isArray(items)) {
				items.forEach(function (item) {
					var itemMatches = false;

					var keys = Object.keys(props);
					for (var i = 0; i < keys.length; i++) {
						var prop = keys[i];
						var text = props[prop].toLowerCase();
						if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
							itemMatches = true;
							break;
						}
					}

					if (itemMatches) {
						out.push(item);
					}
				});
			} else {
				// Let the output be the input untouched
				out = items;
			}

			return out;
		};
	}
})();
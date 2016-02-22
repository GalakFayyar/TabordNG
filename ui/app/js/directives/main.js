(function() {
	'use strict';

	/* Directives */

	angular.module('tabordNG').directive('directiveEvalCodeAngularJs', directiveEvalCodeAngularJs);
	angular.module('tabordNG').directive('uiSelectWrap', uiSelectWrap);

	function directiveEvalCodeAngularJs ($compile, $parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				scope.$watch(attr.content, function() {
					element.html($parse(attr.content)(scope))
					$compile(element.contents())(scope)
				}, true)
			}
		}
	}

	function uiSelectWrap ($document, uiGridEditConstants) {
		return {
			restrict : 'A',
			link: function(scope, element, attr) {
				$document.on('click', docClick);
				function docClick(evt) {
					if ($(evt.target).closest('.ui-select-container').size() === 0) {
						scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
						$document.off('click', docClick);
					}
				}
			}
		}
	}
})();
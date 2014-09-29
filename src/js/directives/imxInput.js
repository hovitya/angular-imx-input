angular.module('imx.Input').directive('imxInput', ['$log', function ($log) {
    return {
        scope: {
            placeholder: '@',
            label: '@'
        },
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/input.html';
        },
        link: function (scope, iElement, iAttrs) {
            scope.focus = false;
            scope.empty = true;
            //Look up ngModel
            var inputs = iElement.find('input');
            if (inputs.length > 1) {
                $log.error("More than one input elements in one imxInput.");
                return;
            }
            if (inputs.length === 0) {
                $log.error("No input element in imxInput.");
                return;
            }

            inputs.bind('focus', function () {
                scope.focus = true;
                scope.$digest();
            });

            inputs.bind('blur', function () {
                scope.focus = false;
                if (inputs.val().length === 0) {
                    scope.empty = true;
                } else {
                    scope.empty = false;
                }
                scope.$digest();
            });

            var model = inputs.controller('ngModel');
            if (model) {
                scope.model = model;
            } else {
                $log.warn('Input model not found');
            }

        }
    };
}]);
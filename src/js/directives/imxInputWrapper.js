angular.module('imx.Input').directive('imxInputWrapper', ['$log', '$rootScope', function ($log, $rootScope) {
    return {
        scope: {
            placeholder: '@',
            label: '@',
            format: '@'
        },
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputWrapper.html';
        },
        link: function (scope, iElement, iAttrs) {
            scope.focus = false;
            scope.empty = true;
            scope.disabled = false;

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
                scope.empty = inputs.val().length === 0;
                scope.$digest();
            });

            inputs.bind('input', function () {
                scope.empty = inputs.val().length === 0;
                $rootScope.$digest();
            });

            iAttrs.$observe('disabled', function(newValue) {
                if (newValue === "disabled" || newValue === true) {
                    inputs.attr('disabled', true);
                    scope.disabled = true;
                } else {
                    inputs.attr('disabled', false);
                    scope.disabled = false;
                }
            });

            //Look up ngModel
            var inputScope = inputs.scope();
            scope.model = inputs.controller('ngModel');
            if (inputScope) {
                inputScope.$watch(inputs.attr('ng-model'), function(newValue) {
                    scope.empty = (newValue === "" || newValue === undefined || newValue === null);
                });
            } else {
                $log.warn('Input scope not found');
            }

        }
    };
}]);
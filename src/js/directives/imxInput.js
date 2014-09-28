angular.module('imx.Input').directive('imxInput', [function () {
    return {
        scope: {},
        require: 'ngModel',
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/input.html';
        },
        link: function (scope, iElement, iAttrs, ngModelController) {
            ngModelController.$render = function () {
                scope.value = ngModelController.$viewValue;
            };

            function updateModel(data) {
                ngModelController.$setViewValue(data);
                ngModelController.$render();
            }

            scope.$watch('value', function (newValue) {
                updateModel(newValue);
            });
        }
    };
}]);
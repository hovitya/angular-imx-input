angular.module('imx.Input').directive('imxInputText', ['$log', '$rootScope', function ($log, $rootScope) {
    return {
        scope: {
            placeholder: '@',
            label: '@'
        },
        require: "?ngModel",
        restrict: 'E',
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputText.html';
        },
        link: function (scope, iElement, iAttrs, ngModel) {
            scope.data = {value: ""};
            if (ngModel) {
                scope.$watch('data.value', function() {
                    ngModel.$setViewValue(scope.data.value);
                });

                ngModel.$render = function() {
                    scope.data.value = ngModel.$viewValue;
                };
            }
        }
    };
}]);
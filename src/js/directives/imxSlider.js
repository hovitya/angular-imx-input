angular.module('imx.Input').directive('imxSlider', ['$log', '$rootScope', function ($log, $rootScope) {
    function postLink(scope, iElement, iAttrs, ngModel) {
        inputBase(scope, iElement, iAttrs, ngModel);
        ngModel.$render = function() {
            if (ngModel.$viewValue === null || ngModel.$viewValue === undefined) {
                ngModel.$setViewValue(0);
                scope.data.value = 0;
            }
        };
    }


    return {
        restrict: 'E',
        transclude: true,
        scope: {
            label: '@',
            min: '@',
            max: '@'
        },
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputSlider.html';
        },
        require: 'ngModel',
        link: postLink
    };
}]);
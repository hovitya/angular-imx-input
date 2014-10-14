angular.module('imx.Input').directive('imxSlider', ['$log', '$rootScope', function ($log, $rootScope) {
    function postLink(scope, iElement, iAttrs, ngModel) {
        inputBase(scope, iElement, iAttrs, ngModel);
    }


    return {
        restrict: 'E',
        scope: {
            label: '@'
        },
        require: '?ngModel',
        link: postLink
    };
}]);
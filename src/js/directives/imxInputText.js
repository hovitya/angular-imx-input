angular.module('imx.Input').directive('imxInputText', ['$log', '$rootScope', function ($log, $rootScope) {
    function postLink (scope, iElement, iAttrs, ngModel) {
        /*        var input = angular.element("<input ng-model='data.value'>");
         if(iAttrs.$attr['name']) {
            input.attr('name', iAttrs.$attr['name']);
        }

        if(iAttrs.$attr['ngMinLength']) {
            input.attr('ng-min-length', 'ngMinLength');
        }

        if(iAttrs.$attr['ngMaxLength']) {
            input.attr('ng-max-length', 'ngMaxLength');
        }

        if(iAttrs.$attr['ngPattern']) {
            input.attr('ng-pattern', 'ngPattern');
        }

        if(iAttrs.$attr['ngChange']) {
            input.attr('ng-change', 'ngChange');
        }

        if(iAttrs.$attr['ngTrim']) {
            input.attr('ng-trim', 'ngTrim');
        }

        if(iAttrs.$attr['ngRequired']) {
            input.attr('ng-required', 'ngRequired');
        }*/

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


    return {
        scope: {
            placeholder: '@',
            label: '@',
            ngMinLength: '@',
            ngMaxLength: '@',
            ngPattern: '@',
            ngChange: '&',
            ngTrim: '@',
            ngRequired: '@',
            name: '@'
        },
        require: "?ngModel",
        restrict: 'E',
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputText.html';
        },
        compile: function (tElement, tAttrs) {
            var type = "text";
            if (tAttrs.$attr.type) {
                type = tAttrs.$attr.type;
            }
            tElement.find('input').attr("type", type);

            return {
                post: postLink
            };
        }
    };
}]);
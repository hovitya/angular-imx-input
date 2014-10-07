angular.module('imx.Input').directive('imxInputText', ['$log', '$rootScope', function ($log, $rootScope) {
    function postLink (scope, iElement, iAttrs, ngModel) {
        scope.data = {value: ""};

        function updateLocalErrors(errors) {
            var modelController = iElement.find('input').controller('ngModel');
            for(var i in errors) {
                if(errors.hasOwnProperty(i)) {
                    modelController.$setValidity(i, !errors[i]);
                }
            }
        }

        if (ngModel) {
            scope.$watch('data.value', function() {
                ngModel.$setViewValue(scope.data.value);
                updateLocalErrors(ngModel.$error);
            });

            ngModel.$render = function() {
                scope.data.value = ngModel.$viewValue;
                updateLocalErrors(ngModel.$error);
            };
        }
    }

    return {
        scope: {
            placeholder: '@',
            label: '@',
            ngChange: '&'
        },
        require: "?ngModel",
        restrict: 'E',
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputText.html';
        },
        compile: function (tElement, tAttrs) {
            var type = "text";
            if (tAttrs.type) {
                type = tAttrs.type;
            }
            tElement.find('input').attr("type", type);
            if (tAttrs.required) {
                tElement.find('input').attr("required", "required");
            }
            return {
                post: postLink
            };
        }
    };
}]);
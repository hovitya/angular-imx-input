angular.module('imx.Input').directive('imxInputText', ['$log', '$rootScope', function ($log, $rootScope) {
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
                post: inputBase
            };
        }
    };
}]);
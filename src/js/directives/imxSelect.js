angular.module('imx.Input').directive('imxSelect', ['$log', '$rootScope', '$timeout', function ($log, $rootScope, $timeout) {
    return {
        scope: {
            placeholder: '@',
            label: '@',
            ngRequired: '@'
        },
        require: "?ngModel",
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputSelect.html';
        },
        controller: ['$scope', '$attrs', '$element', function($scope, $attrs, $element){
            this.setValue = function (htmlNode, value) {
                this.setContent(htmlNode);
                $scope.data.value = value;
                var optionsElement = angular.element($element[0].querySelector('.imx-options'));
                optionsElement[0].blur();
            };

            this.setContent = function (htmlNode) {
                var selectedContent = angular.element($element[0].querySelector('.imx-selected-item-content'));
                selectedContent.empty();
                selectedContent.html(htmlNode.html());
            };

            this.addChangeListener = function (listener) {
                return $scope.$watch('data.value', listener);
            };
        }],
        link: function (scope, iElement, iAttrs, ngModel) {
            inputBase(scope, iElement, iAttrs, ngModel);

            var opened = false;
            iElement.bind('click', function() {
                if(opened) return;
                var optionsElement = angular.element(iElement[0].querySelector('.imx-options'));
                var inputElement = angular.element(iElement[0].querySelector('.imx-input'));
                if (inputElement.hasClass('imx-disabled')) return;
                opened = true;
                inputElement.addClass('imx-open');
                if(!inputElement.hasClass('imx-focus')){
                    inputElement.addClass("imx-focus");
                    optionsElement[0].focus();
                    optionsElement.bind('blur', function() {
                        inputElement.removeClass("imx-focus");
                        inputElement.removeClass('imx-open');
                        $timeout(function() {
                            opened = false;
                        }, 800);
                    });
                }
            });
        }
    };
}]);
angular.module('imx.Input').directive('imxOption',['$rootScope', function($rootScope) {
        return {
            transclude: true,
            restrict: 'E',
            replace: true,
            require: '^imxSelect',
            scope: {
                value: "=value"
            },
            templateUrl: function(elem,attrs) {
                return attrs.templateUrl || 'template/partials/inputOption.html';
            },
            link: function (scope, iElement, iAttrs, imxSelect) {
                var select = optionBase(scope, iElement, imxSelect, function() { return iElement; }, function() { return scope.value; });

                iElement.bind('click', function () {
                    select();
                    $rootScope.$digest();
                });
            }
        };
    }]);
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
                var selectedContent = angular.element($element[0].querySelector('.imx-selected-item-content'));
                selectedContent.empty();
                selectedContent.html(htmlNode.html());
                $scope.data.value = value;
                var optionsElement = angular.element($element[0].querySelector('.imx-options'));
                optionsElement[0].blur();
            };
        }],
        link: function (scope, iElement, iAttrs, ngModel) {
            var opened = false;
            iElement.bind('click', function() {
                if(opened) return;
                opened = true;
                var optionsElement = angular.element(iElement[0].querySelector('.imx-options'));
                var inputElement = angular.element(iElement[0].querySelector('.imx-input'));
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

            function updateLocalErrors(errors) {
                var modelController = iElement.find('input').controller('ngModel');
                for(var i in errors) {
                    if(errors.hasOwnProperty(i)) {
                        modelController.$setValidity(i, !errors[i]);
                    }
                }
            }

            scope.data = {value: ""};
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
                function select() {
                    if(scope.value !== undefined) {
                        imxSelect.setValue(iElement, scope.value);
                    } else {
                        imxSelect.setValue(iElement, iElement.text());
                    }
                }

                iElement.bind('click', function () {
                    select();
                    $rootScope.$digest();
                });
            }
        };
    }]);
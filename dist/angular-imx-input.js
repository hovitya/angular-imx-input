angular.module('imxInputTemplates', ['template/partials/inputWrapper.html', 'template/partials/inputText.html', 'template/partials/inputSelect.html', 'template/partials/inputOption.html', 'template/partials/inputSlider.html']);

angular.module("template/partials/inputWrapper.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/inputWrapper.html",
    "<div class=\"imx-input-outer\">\n" +
    "    <div class=\"imx-input\" ng-class=\"{'imx-invalid': model.$invalid, 'imx-focus': focus, 'imx-empty': empty, 'imx-disabled': disabled}\">\n" +
    "        <div class=\"imx-input-wrapper\" ng-transclude ng-class=\"{'imx-no-line': format === 'no-line'}\"></div>\n" +
    "        <div class=\"imx-placeholder-text\">\n" +
    "            <span class=\"imx-input-placeholder\">{{placeholder}}</span>\n" +
    "            <span class=\"imx-input-label\">{{label}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"imx-error\" ng-class=\"{'imx-show-error': focus, 'imx-transparent': disabled}\" ng-show=\"model.$invalid\">\n" +
    "        This field is required\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/partials/inputText.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/inputText.html",
    "<div class=\"imx-input-text-wrapper imx-input-main\">\n" +
    "    <imx-input-wrapper placeholder=\"{{ placeholder }}\" label=\"{{ label }}\" ng-disabled=\"disabled\">\n" +
    "        <input ng-model=\"data.value\">\n" +
    "    </imx-input-wrapper>\n" +
    "</div>");
}]);

angular.module("template/partials/inputSelect.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/inputSelect.html",
    "<div class=\"imx-input-select-wrapper imx-input-main\">\n" +
    "    <imx-input-wrapper placeholder=\"{{ placeholder }}\" label=\"{{ label }}\" ng-disabled=\"disabled\">\n" +
    "        <input ng-model=\"data.value\" type=\"hidden\">\n" +
    "        <div class=\"imx-selected-item\">\n" +
    "            <span class=\"imx-selected-item-content\"></span><span class=\"imx-select-arrow\">&#9650;</span>\n" +
    "        </div>\n" +
    "        <div class=\"imx-options\" ng-transclude tabindex=\"-1\">\n" +
    "        </div>\n" +
    "    </imx-input-wrapper>\n" +
    "</div>");
}]);

angular.module("template/partials/inputOption.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/inputOption.html",
    "<div class=\"imx-option\" ng-transclude>\n" +
    "</div>");
}]);

angular.module("template/partials/inputSlider.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/inputSlider.html",
    "<div class=\"imx-slider-wrapper imx-input-main\" ng-click=\"contentClicked($event)\">\n" +
    "    <imx-input-wrapper label=\"{{ label }}\" ng-disabled=\"disabled\" format=\"no-line\">\n" +
    "        <input ng-model=\"data.value\" type=\"hidden\">\n" +
    "        <div class=\"imx-slider-content\">\n" +
    "            <div class=\"imx-slider-line\"></div>\n" +
    "            <div class=\"imx-slider-line-highlight imx-animated\" ng-style=\"{width:data.position}\"></div>\n" +
    "            <div class=\"imx-slider-button imx-animated\" ng-style=\"{left:data.position}\"></div>\n" +
    "        </div>\n" +
    "    </imx-input-wrapper>\n" +
    "</div>");
}]);
;angular.module("imx.Input",['imxInputTemplates']);;function inputBase(scope, iElement, iAttrs, ngModel, renderFn) {
    scope.data = {value: ""};
    scope.disabled = false;

    iAttrs.$observe('disabled', function(newValue) {
        scope.disabled = !!(newValue === "disabled" || newValue === true);
    });

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
            if (renderFn) {
                renderFn(ngModel.$viewValue);
            }
            updateLocalErrors(ngModel.$error);
        };
    }
};function optionBase (scope, iElement, imxSelect, valueRenderer, valueGetter) {
    "use strict";
    function select() {
        if(scope.value !== undefined) {
            imxSelect.setValue(valueRenderer(valueGetter()), valueGetter());
        } else {
            imxSelect.setValue(valueRenderer(iElement.text()), iElement.text());
        }
    }

    var unRegisterChange = imxSelect.addChangeListener(function (newValue) {
        if (newValue === valueGetter())
        imxSelect.setContent(valueRenderer(iElement.text()));
    });

    scope.$on('$destroy', function() {
        unRegisterChange();
    });

    return select;
};angular.module('imx.Input').directive('imxInput', ['$log', '$rootScope', function ($log, $rootScope) {
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
}]);;angular.module('imx.Input').directive('imxInputWrapper', ['$log', '$rootScope', function ($log, $rootScope) {
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
}]);;angular.module('imx.Input').directive('imxSelect', ['$log', '$rootScope', '$timeout', function ($log, $rootScope, $timeout) {
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
    }]);;angular.module('imx.Input').directive('imxSlider', ['$log', '$rootScope', '$window', '$timeout', function ($log, $rootScope, $window, $timeout) {
    function postLink(scope, iElement, iAttrs, ngModel) {
        inputBase(scope, iElement, iAttrs, ngModel, render);
        var windowElement = angular.element($window);
        var isMoving = false;
        var lastCoord = 0;
        var parsedMin = 0;
        var parsedMax = 100;
        var jButton;
        var line;
        var currentLeft;
        var startValue;
        var parsedAutoCommit;

        scope.data.position = "0px";

        function render(value) {
            if (value > parsedMax) {
                value = parsedMax;
                ngModel.$setViewValue(value);
            } else if (value < parsedMin) {
                value = parsedMin;
                ngModel.$setViewValue(value);
            }
            jButton = angular.element(iElement[0].querySelector('.imx-slider-button'));
            line = iElement[0].querySelector('.imx-slider-line');
            var elementSize = line.getBoundingClientRect();
            var width = elementSize.width;
            var percentage = value / parsedMax;
            scope.data.position = (width*percentage)+"px";
        }


        function mouseDown(event) {
            var inputElement = angular.element(iElement[0].querySelector('.imx-input'));
            if (inputElement.hasClass('imx-disabled')) return;
            event.stopPropagation();
            lastCoord = event.pageX;
            isMoving = true;
            currentLeft = parseInt(jButton.css('left'));
            windowElement.bind('mouseup', mouseUp);
            windowElement.bind('mousemove', mouseMove);
            jButton.removeClass('imx-animated');
            angular.element(iElement[0].querySelector(".imx-slider-line-highlight")).removeClass("imx-animated");
            startValue = ngModel.$viewValue;
        }

        function mouseUp(event) {
            event.stopPropagation();
            event.preventDefault();
            $timeout(function(){
                isMoving = false;
            }, 100);
            windowElement.unbind('mouseup', mouseUp);
            windowElement.unbind('mousemove', mouseMove);
            ngModel.$setViewValue(Math.round(startValue));
            jButton.addClass('imx-animated');
            angular.element(iElement[0].querySelector(".imx-slider-line-highlight")).addClass("imx-animated");
            $rootScope.$digest();
        }


        function mouseMove(event) {
            var delta = event.pageX - lastCoord;
            var elementSize = line.getBoundingClientRect();
            var width = elementSize.width;
            var percentageChange = delta / width;
            var value = startValue + parsedMax*percentageChange;
            if (value > parsedMax) {
                value = parsedMax;
            } else if (value < parsedMin) {
                value = parsedMin;
            }
            render(value);
            if (parsedAutoCommit) {
                ngModel.$setViewValue(Math.round(value));
            }
            $rootScope.$digest();
            startValue = value;
            lastCoord = event.pageX;
        }

        function attach() {
            if(isMoving) return;
            jButton = angular.element(iElement[0].querySelector('.imx-slider-button'));
            line = iElement[0].querySelector('.imx-slider-line');
            jButton.bind('mousedown', mouseDown);
        }

        function detach() {
            if(isMoving) return;
            jButton.unbind('mousedown', mouseDown);
        }

        iElement.bind('mouseover', attach);
        iElement.bind('mouseout', detach);
        scope.contentClicked = function (event) {
            var inputElement = angular.element(iElement[0].querySelector('.imx-input'));
            if (inputElement.hasClass('imx-disabled')) return;
            if (isMoving) return;
            var elementBox = iElement[0].getBoundingClientRect();
            var position = event.pageX - elementBox.left;
            var percent = position / elementBox.width;
            var value = parsedMax * percent;
            if (value > parsedMax) {
                value = parsedMax;
            } else if (value < parsedMin) {
                value = parsedMin;
            }
            render(value);
            ngModel.$setViewValue(Math.round(value));
            $rootScope.$digest();
        };

        //Handle min and max values
        scope.$watch('min', function(newMin) {
            var parsed = parseFloat(newMin);
            if (!isNaN(parsed)) {
                parsedMin = parsed;
            }
            render(ngModel.$viewValue);
        });

        scope.$watch('max', function(newMax) {
            var parsed = parseFloat(newMax);
            if (!isNaN(parsed)) {
                parsedMax = parsed;
            }
            render(ngModel.$viewValue);
        });

        scope.$watch('autoCommit', function(newAC) {
            parsedAutoCommit = newAC == 'true';
        });
    }


    return {
        restrict: 'E',
        scope: {
            label: '@',
            min: '@',
            max: '@',
            autoCommit: '@'
        },
        replace: true,
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/inputSlider.html';
        },
        require: 'ngModel',
        link: postLink
    };
}]);
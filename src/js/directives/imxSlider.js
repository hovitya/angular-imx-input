angular.module('imx.Input').directive('imxSlider', ['$log', '$rootScope', '$window', function ($log, $rootScope, $window) {
    function postLink(scope, iElement, iAttrs, ngModel) {
        inputBase(scope, iElement, iAttrs, ngModel);
        var windowElement = angular.element($window);
        var isMoving = false;
        var lastCoord = 0;
        var parsedMin = 0;
        var parsedMax = 100;
        var lastValue = 0;
        var jButton;
        var line;
        var currentLeft;

        scope.data.position = "0px";

        function render(value) {
            jButton = angular.element(iElement[0].querySelector('.imx-slider-button'));
            line = iElement[0].querySelector('.imx-slider-line');
            var elementSize = line.getBoundingClientRect();
            var width = elementSize.width;
            var percentage = value / parsedMax;
            scope.data.position = (width*percentage)+"px";
            jButton.css('left',scope.data.position);
        }


        function mouseDown(event) {
            lastCoord = event.pageX;
            isMoving = true;
            currentLeft = parseInt(jButton.css('left'));
            windowElement.bind('mouseup', mouseUp);
            windowElement.bind('mousemove', mouseMove);
        }

        function mouseUp() {
            isMoving = false;
            windowElement.unbind('mouseup', mouseUp);
            windowElement.unbind('mousemove', mouseMove);
        }

        function mouseMove(event) {
            var delta = event.pageX - lastCoord;
            //var elementSize = line.getBoundingClientRect();
            //var width = elementSize.width;
            //var percentageChange = delta / width;
            //var viewValue = ngModel.$viewValue;
            //lastValue = Math.round(viewValue + parsedMax*percentageChange);
            //ngModel.$setViewValue(viewValue + parsedMax*percentageChange);
            jButton.css('left',Math.round(currentLeft + delta)+"px");
        }

        function attach() {
            if(isMoving) return;
            jButton = angular.element(iElement[0].querySelector('.imx-slider-button'));
            line = iElement[0].querySelector('.imx-slider-line');
            jButton.bind('mousedown', mouseDown);
            console.log("attach");
        }

        function detach() {
            if(isMoving) return;
            jButton.unbind('mousedown', mouseDown);
            console.log("detach");
        }

        iElement.bind('mouseover', attach);
        iElement.bind('mouseout', detach);

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
    }


    return {
        restrict: 'E',
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
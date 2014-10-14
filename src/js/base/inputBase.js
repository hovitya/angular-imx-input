function inputBase(scope, iElement, iAttrs, ngModel) {
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
            updateLocalErrors(ngModel.$error);
        };
    }
}
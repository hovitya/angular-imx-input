function optionBase (scope, iElement, imxSelect, valueRenderer, valueGetter) {
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
}
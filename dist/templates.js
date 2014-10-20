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

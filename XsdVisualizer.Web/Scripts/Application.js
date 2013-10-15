///<reference path="References.ts" />
var Application = (function () {
    function Application() {
        this.$visualizerContainer = $(".VisualizerContainer");
    }
    Application.prototype.loadXsd = function (url) {
        var _this = this;
        $.get(url, null, null, "text").then(function (response) {
            var visualizerView = XsdVisualizer.visualize(response);
            _this.$visualizerContainer.empty().append(visualizerView.$Element());
        });
    };
    return Application;
})();

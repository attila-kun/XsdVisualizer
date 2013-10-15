///<reference path="References.ts" />
var Application = (function () {
    function Application() {
        var visualizerView = new XsdVisualizer.Drawing.VisualizerView("hello");
        $(".VisualizerContainer").empty().append(visualizerView.$Element());
    }
    Application.prototype.loadXsd = function (url) {
        $.get(url, null, null, "text").then(function (response) {
            XsdVisualizer.visualize(response);
        });
    };
    return Application;
})();

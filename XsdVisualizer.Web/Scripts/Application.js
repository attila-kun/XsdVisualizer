///<reference path="References.ts" />
var Application = (function () {
    function Application() {
        var visualizerView = new XsdVisualizer.VisualizerView("hello");
        $(".VisualizerContainer").empty().append(visualizerView.$Element());
    }
    Application.prototype.loadXsd = function (url) {
        $.get(url, null, null, "text").then(function (response) {
            XsdVisualizer.Parser.parse(response);
        });
    };
    return Application;
})();

///<reference path="References.ts" />
var Application = (function () {
    function Application() {
        var visualizerView = new XsdVisualizer.VisualizerView("hello");
        $(".VisualizerContainer").empty().append(visualizerView.$Element);
    }
    return Application;
})();

$(document).ready(function () {
    new Application();
});

///<reference path="References.ts" />
var XsdVisualizer;
(function (XsdVisualizer) {
    function visualize(markup) {
        var document = XsdVisualizer.Parser.parse(markup);
        return new XsdVisualizer.Drawing.VisualizerView(document);
    }
    XsdVisualizer.visualize = visualize;
})(XsdVisualizer || (XsdVisualizer = {}));

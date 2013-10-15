///<reference path="References.ts" />
var XsdVisualizer;
(function (XsdVisualizer) {
    function visualize(markup) {
        var document = XsdVisualizer.Parser.parse(markup);
        debugger;
    }
    XsdVisualizer.visualize = visualize;
})(XsdVisualizer || (XsdVisualizer = {}));

///<reference path="References.ts" />
var XsdVisualizer;
(function (XsdVisualizer) {
    var VisualizerView = (function () {
        function VisualizerView(markup) {
            this.$el = $("<div></div>", {
                "class": "VisualizerView"
            });
            var paper = Raphael(this.$el[0], 200, 200);
            paper.rect(0, 0, 50, 50).attr({
                fill: "90-#333-#333",
                stroke: "none",
                opacity: .5
            });
        }
        VisualizerView.prototype.$Element = function () {
            return this.$el;
        };
        return VisualizerView;
    })();
    XsdVisualizer.VisualizerView = VisualizerView;
})(XsdVisualizer || (XsdVisualizer = {}));

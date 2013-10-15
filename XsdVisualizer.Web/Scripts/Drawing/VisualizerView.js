var XsdVisualizer;
(function (XsdVisualizer) {
    ///<reference path="../References.ts" />
    (function (Drawing) {
        var VisualizerView = (function () {
            function VisualizerView(document) {
                this.document = document;
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
        Drawing.VisualizerView = VisualizerView;
    })(XsdVisualizer.Drawing || (XsdVisualizer.Drawing = {}));
    var Drawing = XsdVisualizer.Drawing;
})(XsdVisualizer || (XsdVisualizer = {}));

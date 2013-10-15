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
                var paperGroup = new PaperGroup(paper, paper.group());

                var currentGroup = paperGroup;
                for (var i = 0; i < 10; i++) {
                    currentGroup = currentGroup.newGroup();
                    var offset = (i + 1) * 10;
                    var rect = currentGroup.rect(offset, offset, 50, 50);
                    this.setRectAttr(rect);
                }
            }
            VisualizerView.prototype.$Element = function () {
                return this.$el;
            };

            VisualizerView.prototype.setRectAttr = function (rect) {
                rect.attr({
                    fill: "blue",
                    stroke: "none",
                    opacity: .5
                });
            };
            return VisualizerView;
        })();
        Drawing.VisualizerView = VisualizerView;
    })(XsdVisualizer.Drawing || (XsdVisualizer.Drawing = {}));
    var Drawing = XsdVisualizer.Drawing;
})(XsdVisualizer || (XsdVisualizer = {}));

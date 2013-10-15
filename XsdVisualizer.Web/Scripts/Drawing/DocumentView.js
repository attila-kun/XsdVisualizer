var XsdVisualizer;
(function (XsdVisualizer) {
    (function (Drawing) {
        ///<reference path="../References.ts" />
        (function (DocumentView) {
            var DocumentView = (function () {
                function DocumentView(document) {
                    this.document = document;
                }
                return DocumentView;
            })();
        })(Drawing.DocumentView || (Drawing.DocumentView = {}));
        var DocumentView = Drawing.DocumentView;
    })(XsdVisualizer.Drawing || (XsdVisualizer.Drawing = {}));
    var Drawing = XsdVisualizer.Drawing;
})(XsdVisualizer || (XsdVisualizer = {}));

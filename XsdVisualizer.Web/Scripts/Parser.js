var XsdVisualizer;
(function (XsdVisualizer) {
    ///<reference path="References.ts" />
    (function (Parser) {
        function parse(markup) {
            var parsedXML = $.parseXML(markup);
        }
        Parser.parse = parse;
    })(XsdVisualizer.Parser || (XsdVisualizer.Parser = {}));
    var Parser = XsdVisualizer.Parser;
})(XsdVisualizer || (XsdVisualizer = {}));

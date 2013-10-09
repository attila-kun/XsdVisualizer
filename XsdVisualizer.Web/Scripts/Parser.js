var XsdVisualizer;
(function (XsdVisualizer) {
    ///<reference path="References.ts" />
    (function (Parser) {
        function find($node, selector) {
            return $node.find(selector.replace(":", "\\:"));
        }

        function getType(typeName) {
            throw new Error();
        }

        function parseElement($element) {
            return {
                Name: $element.attr("id"),
                Type: getType($element.attr("type"))
            };
        }

        function parseSequence($parseSequence) {
            return {
                Elements: find($parseSequence, "xs:element").map(function (index, element) {
                    return;
                }).toArray()
            };
        }

        function parseComplexType($complexType) {
            return {
                Name: $complexType.attr("name"),
                Sequence: parseSequence(find($complexType, "xs:sequence"))
            };
        }

        function parse(markup) {
            var $document = $($.parseXML(markup)), $schema = find($document, "xs:schema"), $elements = find($schema, "xs:element"), $complexTypes = find($schema, "xs:complexType");

            var document = {
                Types: [],
                Elements: []
            };

            var complexTypeModels = $complexTypes.map(function (index, complexType) {
                return parseComplexType($(complexType));
            }).toArray();
            document.Types.concat(complexTypeModels);
            debugger;
        }
        Parser.parse = parse;
    })(XsdVisualizer.Parser || (XsdVisualizer.Parser = {}));
    var Parser = XsdVisualizer.Parser;
})(XsdVisualizer || (XsdVisualizer = {}));

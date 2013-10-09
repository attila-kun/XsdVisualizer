///<reference path="References.ts" />

module XsdVisualizer.Parser {
	function find($node: JQuery, selector: string) : JQuery {
		return $node.find(selector.replace(":", "\\:"));
	}

	function getType(typeName: string) : XsdVisualizer.Model.Type {
		throw new Error();
	}

	function parseElement($element: JQuery) : XsdVisualizer.Model.Element {
		return {
			Name: $element.attr("id"),
			Type: getType($element.attr("type"))
		};
	}

	function parseSequence($parseSequence: JQuery) : XsdVisualizer.Model.Sequence {
		return {
			Elements: find($parseSequence, "xs:element").map(function (index, element) {
				return 
			}).toArray()
		};
	}

	function parseComplexType($complexType: JQuery) : XsdVisualizer.Model.ComplexType {
		return {
			Name: $complexType.attr("name"),
			Sequence: parseSequence(find($complexType, "xs:sequence"))
		};
	}

	export function parse(markup: string) {		
		var $document = $($.parseXML(markup)),
			$schema = find($document, "xs:schema"),
			$elements = find($schema, "xs:element"),
			$complexTypes = find($schema, "xs:complexType");

		var document: XsdVisualizer.Model.Document = {
			Types: [],
			Elements: []
		};

		var complexTypeModels = $complexTypes.map(function (index, complexType) { return parseComplexType($(complexType)); }).toArray();
		document.Types.concat(complexTypeModels);
		debugger;
	}
}
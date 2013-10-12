///<reference path="References.ts" />

module XsdVisualizer.Parser {
	class ModelBuilder {

		private types: { [name: string]: XsdVisualizer.Model.Type; } = {};

		private mapElements<T>($elements: JQuery, callback: (JQuery) => T): T[] {
			var result = $elements.map(function (index, element) {
				return callback($(element));
			}).toArray();
			return result;
		}

		private registerTypes(types: XsdVisualizer.Model.Type[]) {
			$.each(types, (index, type) => {
				this.types[type.name] = type;
			});
		}

		private getTypeStub(typeName: string): XsdVisualizer.Model.Type {
			var typeStub = new XsdVisualizer.Model.Type();
			typeStub.name = typeName;
			typeStub.state = XsdVisualizer.Model.TypeState.Stub;
			return typeStub;
		}

		private parseElement($element: JQuery): XsdVisualizer.Model.Element {
			return {
				name: $element.attr("name"),
				type: this.getTypeStub($element.attr("type"))
			};
		}

		private parseSequence($parseSequence: JQuery): XsdVisualizer.Model.Sequence {
			return {
				elements: this.mapElements(find($parseSequence, "xs:element"), ($element) => this.parseElement($element))
			};
		}

		private parseComplexType($complexType: JQuery): XsdVisualizer.Model.ComplexType {
			var complexType = new XsdVisualizer.Model.ComplexType();
			complexType.name = $complexType.attr("name");
			complexType.sequence = this.parseSequence(find($complexType, "xs:sequence"));
			complexType.state = XsdVisualizer.Model.TypeState.Concrete;
			return complexType;
		}

		private traverseDocument(document, callback) {

		}

		//Overwriting type stubs with concrete types wherever possible.
		private fixUpReferences(document: XsdVisualizer.Model.Document) {
			var concreteTypes = document.types;
			var concreteTypeDictionary = toDictionary(document.types, type => type.name);

			var typeNames = $.map(concreteTypes, (type, index) => type.name);
		}

		public parse(markup: string): XsdVisualizer.Model.Document {
			var $document = $($.parseXML(markup)),
				$schema = find($document, "xs:schema"),
				$elements = find($schema, "xs:element"),
				$complexTypes = find($schema, "> xs:complexType");				
			
			var complexTypes = this.mapElements($complexTypes, ($element) => this.parseComplexType($element));
			
			var document: XsdVisualizer.Model.Document = {
				types: [],
				elements: []
			};
			return null;
		}

	}

	function find($node: JQuery, selector: string): JQuery {
		return $node.find(selector.replace(":", "\\:"));
	}

	function toDictionary<T>(elements: T[], keySelector: (element: T) => string): { [key: string]: T; } {
		var dictionary: { [key: string]: T; } = {};
		$.each(elements, (index, element) => {
			dictionary[keySelector(element)] = element;
		});
		return dictionary;
	}

	export function parse(markup: string): XsdVisualizer.Model.Document {
		var modelBuilder = new ModelBuilder();
		return modelBuilder.parse(markup);
	}
}
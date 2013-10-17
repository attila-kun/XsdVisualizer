///<reference path="References.ts" />

module XsdVisualizer.Parser {

	//Useful for collecting all XsdVisualizer.Model.Element instances in a document.
	class ElementCollector implements XsdVisualizer.Model.DocumentVisitor {		
		private _elements: XsdVisualizer.Model.Element[] = [];
		elements() {
			return this._elements;
		}		

		visitElement(element: XsdVisualizer.Model.Element) {
			this._elements.push(element);
		}
	}

	class ModelBuilder {

		private types: XsdVisualizer.Model.Type[] = [];

		private mapElements<T>($elements: JQuery, callback: (JQuery) => T): T[] {
			var result = $elements.map(function (index, element) {
				return callback($(element));
			}).toArray();
			return result;
		}

		private getTypeStub(typeName: string): XsdVisualizer.Model.Type {
			var typeStub = new XsdVisualizer.Model.Type();
			typeStub.name = typeName;
			typeStub.state = XsdVisualizer.Model.TypeState.Stub;
			return typeStub;
		}

		private parseElement($element: JQuery): XsdVisualizer.Model.Element {
			var element = new XsdVisualizer.Model.Element();
			element.name = $element.attr("name");
			var typeName = $element.attr("type");

			if (typeName)
				element.type = this.getTypeStub(typeName);

			var $complexType = find($element, "> xs:complexType");

			if ($complexType.length > 0 && typeName)		
				throw new Error("Element can't have both type attribute and nested complexType defined!");

			if ($complexType.length > 1)
				throw new Error("Element can't have more than one complexType child.");

			if ($complexType.length == 1) {
				var complexType = this.parseComplexType($complexType);
				element.type = complexType;
			}			

			return element;
		}

		private parseSequence($parseSequence: JQuery): XsdVisualizer.Model.Sequence {
			var sequence = new XsdVisualizer.Model.Sequence();
			sequence.elements = this.mapElements(find($parseSequence, "> xs:element"), ($element) => this.parseElement($element));
			return sequence;
		}

		private parseComplexType($complexType: JQuery): XsdVisualizer.Model.ComplexType {
			var complexType = new XsdVisualizer.Model.ComplexType();
			complexType.name = $complexType.attr("name");
			complexType.sequence = this.parseSequence(find($complexType, "> xs:sequence"));
			complexType.state = XsdVisualizer.Model.TypeState.Concrete;
			this.types.push(complexType);
			return complexType;
		}

		//Overwriting type stubs with concrete types wherever possible.
		private fixUpReferences(document: XsdVisualizer.Model.Document) {
			var concreteTypes = document.types,
				concreteTypeDictionary = toDictionary(document.types, type => type.name),
				elementCollector = new ElementCollector();

			document.accept(elementCollector);
			var elements = elementCollector.elements();

			$.each(elements, (index, element) => {
				//it may happen that the referenced type is already a concrete type (e.g. this is the case when an element has a nested type defined)
				if (element.type.state === XsdVisualizer.Model.TypeState.Concrete)
					return;

				//overwrite the stubs with concrete types if possible
				var typeName = element.type.name,
					concreteType = concreteTypeDictionary[typeName];

				if (concreteType)
					element.type = concreteType;
			});			
		}

		public parse(markup: string): XsdVisualizer.Model.Document {
			var $document = $($.parseXML(markup)),
				$schema = find($document, "xs:schema"),
				$rootElements = find($schema, "> xs:element"),
				$complexTypes = find($schema, "> xs:complexType");				
			
			this.mapElements($complexTypes, ($element) => this.parseComplexType($element));
			var elements = this.mapElements($rootElements, $element => this.parseElement($element));
			var document = new XsdVisualizer.Model.Document();
			document.types = this.types;
			document.elements = elements;
			this.fixUpReferences(document);
			return document;
		}

	}

	function find($node: JQuery, selector: string): JQuery {
		return $node.find(selector.replace(":", "\\:"));
	}

	//Creates a hashmap out of the passed in elements array.
	//The keys of the hashmap will be the array items' property values defined by keySelector.
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
module XsdVisualizer.Model {
	interface Document {
		Types: Type[];
		Elements: Element[];
	}

	interface Type {
		Name: string;
	}

	interface SimpleType extends Type {

	}

	interface ComplexType extends Type {
		Elements: Element[];
	}

	interface Element {
		Name: string;
		Type: Type;
	}
}
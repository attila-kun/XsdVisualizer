module XsdVisualizer.Model {
	interface Document {
		Types: Type[];
		Elements: Element[];
	}

	interface Type {
		Name: string;
	}

	interface BuiltInType extends Type {

	}

	interface SimpleType extends Type {

	}

	interface ComplexType extends Type {
		Sequence: Sequence;
	}

	interface Sequence {
		Elements: Element[];
	}

	interface Element {
		Name: string;
		Type: Type;
	}

	interface Restriction {
		Base: Type
	}
}
module XsdVisualizer.Model {
	export interface Document {
		Types: Type[];
		Elements: Element[];
	}

	export interface Type {
		Name: string;
	}

	export interface BuiltInType extends Type {

	}

	export interface SimpleType extends Type {

	}

	export interface ComplexType extends Type {
		Sequence: Sequence;
	}

	export interface Sequence {
		Elements: Element[];
	}

	export interface Element {
		Name: string;
		Type: Type;
	}

	export interface Restriction {
		Base: Type
	}
}
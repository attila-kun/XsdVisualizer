module XsdVisualizer.Model {
	export enum TypeState {
		//Used during parsing, when object refrences are not fixed up yet.
		Stub,

		Concrete
	}

	export class Document {
		types: Type[];
		elements: Element[];
	}

	export class Type {
		name: string;
		state: TypeState;
		getReferencedTypes(): Type[] {
			return [];
		}
	}

	export class BuiltInType extends Type {

	}

	export class SimpleType extends Type {

	}

	export class ComplexType extends Type {
		sequence: Sequence;
		getReferencedTypes() {
			var types = $.map(this.sequence.elements, (element, index) => element.type);
			return types;
		}
	}

	export class Sequence {
		elements: Element[];
	}

	export class Element {
		name: string;
		type: Type;
	}

	export class Restriction {
		base: Type
	}
}
module XsdVisualizer.Model {
	export enum TypeState {
		//Used during parsing, when object refrences are not fixed up yet.
		Stub,

		Concrete
	}

	export interface DocumentVisitor {
		visitElement(element: XsdVisualizer.Model.Element);
	}

	export class Document {
		types: Type[];
		elements: Element[];
		accept(visitor: XsdVisualizer.Model.DocumentVisitor) {
			$.each(this.types, (index, type) => type.accept(visitor));
		}
	}

	export class Type {
		name: string;
		state: TypeState;
		accept(visitor: XsdVisualizer.Model.DocumentVisitor) {
			throw new Error();
		}
	}

	export class BuiltInType extends Type {

	}

	export class SimpleType extends Type {

	}

	export class ComplexType extends Type {
		sequence: Sequence;
		accept(visitor: XsdVisualizer.Model.DocumentVisitor) {
			this.sequence.accept(visitor);
		}
	}

	export class Sequence {
		elements: Element[];
		accept(visitor: XsdVisualizer.Model.DocumentVisitor) {
			$.each(this.elements, (index, element) => element.accept(visitor));
		}
	}

	export class Element {
		name: string;
		type: Type;
		accept(visitor: XsdVisualizer.Model.DocumentVisitor) {
			visitor.visitElement(this);
		}
	}

	export class Restriction {
		base: Type
	}
}
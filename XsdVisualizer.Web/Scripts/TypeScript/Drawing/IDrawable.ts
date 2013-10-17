module XsdVisualizer.Drawing {

	export class Size {
		constructor(public width: number, public height: number) {

		}
	}

	export interface IDrawable {
		getSize(): Size
		realign(): void
	}
}
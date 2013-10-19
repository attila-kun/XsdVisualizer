module XsdVisualizer.Drawing {

	export interface NativeBBox {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	export interface IDrawable {
		getBBox(): NativeBBox
		realign(): void
		translate(x, y): void
	}
}
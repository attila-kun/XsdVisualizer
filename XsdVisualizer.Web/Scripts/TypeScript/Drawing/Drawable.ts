module XsdVisualizer.Drawing {

	export interface NativeBBox {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	export class Drawable {
		getBBox() { throw new Error(); }
		realign() { throw new Error(); }
		translate(x, y) { throw new Error(); }
	}
}
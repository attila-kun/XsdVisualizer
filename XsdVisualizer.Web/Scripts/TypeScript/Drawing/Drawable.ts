module XsdVisualizer.Drawing {

	export interface NativeBBox {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	export interface EventHandler {
		(view: Drawable): void;
	}

	export class Drawable {
		getBBox(): NativeBBox { throw new Error(); }
		realign() { throw new Error(); }
		translate(x: number, y: number) { throw new Error(); }

		realignElements(elements: Drawable[]) {
			var currentY = 0;
			_.each(elements, elementView => {
				elementView.realign();
				var bbox = elementView.getBBox();
				elementView.translate(20, currentY);
				currentY += bbox.height + 20;
			});
		}
	}
}
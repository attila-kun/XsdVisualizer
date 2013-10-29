module XsdVisualizer.Drawing {

	export class TypeView extends Drawable {

		private drawingContext: XsdVisualizer.Drawing.DrawingContext;

		constructor(paperGroup: XsdVisualizer.Drawing.DrawingContext) {
			super();
			this.drawingContext = paperGroup;
		}

		getDrawingContext() {
			return this.drawingContext;
		}

		getBBox(): XsdVisualizer.Drawing.NativeBBox {
			throw new Error();
		}
		
		realign() { }

		translate(x, y) { }

		hide() { }

		show() { }

		toggleVisibility() { }

		isExpandable(): boolean { return false; }

		render() { }
	}
}
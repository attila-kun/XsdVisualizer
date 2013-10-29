module XsdVisualizer.Drawing {

	export class TypeView extends Drawable {

		private paperGroup: XsdVisualizer.Drawing.DrawingContext;

		constructor(paperGroup: XsdVisualizer.Drawing.DrawingContext) {
			super();
			this.paperGroup = paperGroup;
		}

		getPaperGroup() {
			return this.paperGroup;
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
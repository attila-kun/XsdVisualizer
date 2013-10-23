module XsdVisualizer.Drawing {

	export class TypeView extends Drawable {

		private paperGroup: XsdVisualizer.Drawing.PaperGroup;

		constructor(paperGroup: XsdVisualizer.Drawing.PaperGroup) {
			super();
			this.paperGroup = paperGroup;
			this.hide();
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
	}
}
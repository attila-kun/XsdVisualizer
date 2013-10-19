module XsdVisualizer.Drawing {
	export class TypeView implements IDrawable {

		private isVisible: boolean = true;

		constructor(
			//TODO: paperGroup should provide readonly access
			public paperGroup: XsdVisualizer.Drawing.PaperGroup) {

		}

		getBBox(): XsdVisualizer.Drawing.NativeBBox {
			throw new Error();
			return null;
		}

		realign() {
			throw new Error();
		}

		translate(x, y) {
			throw new Error();
		}

		hide() {
			$(this.paperGroup.getNode()).hide();
		}

		show() {
			$(this.paperGroup.getNode()).show();
		}

		toggleVisibility() {
			$(this.paperGroup.getNode()).toggle();
			this.isVisible = !this.isVisible;
		}
	}
}
module XsdVisualizer.Drawing {
	export interface ITypeView extends IDrawable {
		toggleVisibility(): void;
	}

	export class TypeView<TConcrete> extends Drawable<TConcrete> implements ITypeView {

		private paperGroup: XsdVisualizer.Drawing.PaperGroup;

		constructor(paperGroup: XsdVisualizer.Drawing.PaperGroup) {
			super();
			this.paperGroup = paperGroup;
		}

		getPaperGroup() {
			return this.paperGroup;
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
		}
	}
}
///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView implements IDrawable {
		private typeView: XsdVisualizer.Drawing.TypeView;

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private element: XsdVisualizer.Model.Element
			) {
				this.paperGroup.text(50, 50, this.element.name);
				var newGroup = this.paperGroup.newGroup();
				newGroup.translate(100, 0);
				this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <any>this.element.type); //TODO: fix cast
		}

		redraw() {

		}

		getSize(): Size {
			return this.typeView.getSize();
		}

		realign() {			
		}
	}
}
///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView {
		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private element: XsdVisualizer.Model.Element) {

		}

		redraw() {
			this.paperGroup.text(50, 50, this.element.name);
			var newGroup = this.paperGroup.newGroup();
			newGroup.translate(100, 0);
			var typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <any>this.element.type);
			typeView.redraw();
		}
	}
}
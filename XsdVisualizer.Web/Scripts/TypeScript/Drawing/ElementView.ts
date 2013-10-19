///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView implements IDrawable {
		private typeView: XsdVisualizer.Drawing.TypeView;

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private element: XsdVisualizer.Model.Element
			) {
				this.paperGroup.text(50, 10, this.element.name);
				var newGroup = this.paperGroup.newGroup();
				this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <any>this.element.type); //TODO: fix cast
		}

		translate(x, y) {
			this.paperGroup.translate(x, y);
		}

		getBBox(): NativeBBox {			
			var bbox = this.paperGroup.getBBox();
			console.log(this.paperGroup.getNode(), bbox);
			return bbox;
		}

		realign() {
			this.typeView.realign();
			this.typeView.translate(100, 0);
		}
	}
}
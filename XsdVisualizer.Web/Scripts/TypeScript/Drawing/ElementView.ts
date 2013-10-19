///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView implements IDrawable {
		private typeView: XsdVisualizer.Drawing.TypeView;

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private element: XsdVisualizer.Model.Element
			) {
				var rect = this.paperGroup.rect(0, 0, 100, 20);
				rect.attr({"fill": "white"}); //needed to detect click inside the shape
				rect.click(() => this.onClick());
				var text = this.paperGroup.text(50, 13, this.element.name);
				text.click(() => this.onClick());
				var newGroup = this.paperGroup.newGroup();
				this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <any>this.element.type); //TODO: fix cast
		}

		private onClick() {	
			this.typeView.toggleVisibility();
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
			this.typeView.translate(120, 0);
		}
	}
}
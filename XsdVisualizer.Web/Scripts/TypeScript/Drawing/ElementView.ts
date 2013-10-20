///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView extends Drawable<ElementView> {
		private typeView: XsdVisualizer.Drawing.ITypeView;

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private element: XsdVisualizer.Model.Element
			) {
				super();
				var rect = this.paperGroup.rect(0, 0, 100, 20);
				rect.attr({"fill": "white"}); //needed to detect click inside the shape
				rect.click(() => this.handleClick());
				var text = this.paperGroup.text(50, 13, this.element.name);
				text.click(() => this.handleClick());
				var newGroup = this.paperGroup.newGroup();
				this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <any>this.element.type); //TODO: fix cast
		}

		private handleClick() {	
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
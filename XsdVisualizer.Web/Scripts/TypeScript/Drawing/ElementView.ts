///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView extends Drawable {
		private typeView: XsdVisualizer.Drawing.TypeView;

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
		}

		private lazyRenderTypeView() {
			if (this.typeView != null)
				return;

			var newGroup = this.paperGroup.newGroup();
			this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <any>this.element.type); //TODO: fix cast
		}

		private handleClick() {			
			this.lazyRenderTypeView();
			this.typeView.toggleVisibility();
			//if an element is expanded of collapsed, then we need to propagate the change upwards, because possible height change may affect the position of other elements
			this.paperGroup.$getNode().trigger("ExpandOrCollapse");
		}

		translate(x, y) {
			this.paperGroup.translate(x, y);
		}

		getBBox(): NativeBBox {			
			var bbox = this.paperGroup.getBBox();
			return bbox;
		}

		realign() {
			if (this.typeView == null)
				return;

			this.typeView.realign();
			this.typeView.translate(120, 0);
		}
	}
}
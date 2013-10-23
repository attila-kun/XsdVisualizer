///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView extends Drawable {
		private typeView: XsdVisualizer.Drawing.TypeView;
		private textGroup: PaperGroup;
		private rectElement: RaphaelElement;
		private _currentX: number;
		private _currentY: number;

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private element: XsdVisualizer.Model.Element
			) {
				super();
				this.rectElement = this.paperGroup.rect(0, 0, 170, 20);
				this.rectElement.attr({"fill": "white"}); //needed to detect click inside the shape
				this.rectElement.click(() => this.handleClick());
				var text = this.element.name + (this.element.type && this.element.type.name ? (": " + this.element.type.name) : "");
				this.textGroup = this.paperGroup.newGroup();
				var textElement = this.textGroup.text(85, 13, text);
				textElement.click(() => this.handleClick());
		}

		private lazyRenderTypeView() {
			if (this.typeView != null)
				return;

			var newGroup = this.paperGroup.newGroup();

			if (this.element.type instanceof XsdVisualizer.Model.ComplexType) {
				this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <XsdVisualizer.Model.ComplexType>this.element.type);
			}
			else {				
				this.typeView = new XsdVisualizer.Drawing.NonexpandableTypeView();
			}			
		}

		private handleClick() {			
			this.lazyRenderTypeView();
			this.typeView.toggleVisibility();
			//if an element is expanded of collapsed, then we need to propagate the change upwards, because possible height change may affect the position of other elements
			this.paperGroup.$getNode().trigger("ExpandOrCollapse");
		}

		translate(x, y) {
			this._currentX = x;
			this._currentY = y;
			this.paperGroup.translate(x, y);
		}

		getBBox(): NativeBBox {			
			var bbox = this.paperGroup.getBBox();
			return bbox;
		}

		realign() {		
			//typeView may have not been lazily loaded yet	
			if (this.typeView != null) {
				this.typeView.realign();
				this.typeView.translate(190, 0);
			}
		}

		getCurrentY() {
			return this._currentY;
		}
	}
}
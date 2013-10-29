///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class ElementView extends Drawable {
		private typeView: XsdVisualizer.Drawing.TypeView;
		private isTypeViewRendered: boolean;
		private textGroup: DrawingContext;
		private rectElement: SnapSvgElement;
		private _currentX: number;
		private _currentY: number;

		constructor(
			private drawingContext: XsdVisualizer.Drawing.DrawingContext,
			private element: XsdVisualizer.Model.Element
			) {
				super();
				this.rectElement = this.drawingContext.rect(0, 0, 170, 20);
				this.rectElement.attr({
					"fill": "white", //needed to detect click inside the shape
					"stroke": "black"
				}); 
				this.rectElement.click(() => this.handleClick());
				var text = this.element.name + (this.element.type && this.element.type.name ? (": " + this.element.type.name) : "");
				this.textGroup = this.drawingContext.newGroup();
				var textElement = this.textGroup.text(86, 13, text);
				textElement.attr({
					"font": "10px Arial",
					"text-anchor": "middle"
				});
				textElement.click(() => this.handleClick());
				this.initializeTypeView();

				//setting cursor state
				var cursor = this.typeView.isExpandable() ? "pointer" : "normal",
					cursorAttr = { "cursor": cursor };

				this.rectElement.attr(cursorAttr);
				textElement.attr(cursorAttr);
		}

		private initializeTypeView() {
			var newGroup = this.drawingContext.newGroup();

			if (this.element.type instanceof XsdVisualizer.Model.ComplexType) {
				this.typeView = new XsdVisualizer.Drawing.ComplexTypeView(newGroup, <XsdVisualizer.Model.ComplexType>this.element.type);
			}
			else {
				this.typeView = new XsdVisualizer.Drawing.NonexpandableTypeView();
			}
		}

		private lazyRenderTypeView() {
			if (!this.isTypeViewRendered) {
				this.typeView.render();
				this.isTypeViewRendered = true;
			}
		}

		private handleClick() {			
			this.lazyRenderTypeView();
			this.typeView.toggleVisibility();
			//if an element is expanded of collapsed, then we need to propagate the change upwards, because possible height change may affect the position of other elements
			this.drawingContext.$getNode().trigger("ExpandOrCollapse");
		}

		translate(x, y) {
			this._currentX = x;
			this._currentY = y;
			this.drawingContext.translate(x, y);
		}

		getBBox(): NativeBBox {			
			var bbox = this.drawingContext.getBBox();
			return bbox;
		}

		realign() {		
			//typeView may have not been lazily loaded yet	
			if (this.isTypeViewRendered === true) {
				this.typeView.realign();
				this.typeView.translate(190, 0);
			}
		}

		getCurrentY() {
			return this._currentY;
		}
	}
}
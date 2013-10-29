module XsdVisualizer.Drawing {
	export class ComplexTypeView extends TypeView {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];		
		private borderRect: SnapSvgElement;

		constructor(
			drawingContext: XsdVisualizer.Drawing.DrawingContext,
			private complexType: XsdVisualizer.Model.ComplexType
			) {
				super(drawingContext);
		}

		render() {
			if (this.complexType.sequence == null)
				return;

			this.borderRect = this.getDrawingContext().rect(0, 0, 5, 0);
			this.borderRect.attr({ "fill": "black" });

			$.each(this.complexType.sequence.elements, (index, element) => {
				var newGroup = this.getDrawingContext().newGroup();
				var elementView = new XsdVisualizer.Drawing.ElementView(newGroup, element);
				this.elementViews.push(elementView);
			});

			this.hide();
		}

		getBBox(): NativeBBox {			
			return this.getDrawingContext().getBBox();
		}

		hide() {
			this.getDrawingContext().$getNode().hide();
		}

		show() {
			this.getDrawingContext().$getNode().show();
		}

		toggleVisibility() {
			this.getDrawingContext().$getNode().toggle();
		}

		realign() {
			this.realignElements(this.elementViews);
			var bbox = this.getDrawingContext().getBBox();
			this.borderRect.attr("height", _.last(this.elementViews).getCurrentY() + 20);
		}

		translate(x, y) {
			this.getDrawingContext().translate(x, y);
		}

		isExpandable(): boolean {
			return true;
		}
	}
}
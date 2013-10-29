///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class DocumentView extends Drawable {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];

		constructor(
			private paper: SnapSvgPaper,
			private drawingContext: XsdVisualizer.Drawing.DrawingContext,
			private document: XsdVisualizer.Model.Document
			) {
				super();
				$.each(this.document.elements, (index, element) => {
					var elementView = new XsdVisualizer.Drawing.ElementView(this.drawingContext.newGroup(), element);
					this.elementViews.push(elementView);
				});
				this.drawingContext.$getNode().on("ExpandOrCollapse", () => this.realign());
		}		

		realign() {
			this.realignElements(this.elementViews);

			//realigning elements may have caused the whole drawing area to shrink or expand, therefore we need to resize the paper
			var bbox = this.drawingContext.getBBox();
			var extraSpacing = 25; //without this, some strange artifacts were visible at the SVG rects' edges
			//TODO: find appropriate Snap.svg method			
			$(this.paper.node).attr({
				width: bbox.width + extraSpacing,
				height: bbox.height + extraSpacing
			});			
		}
	}
}
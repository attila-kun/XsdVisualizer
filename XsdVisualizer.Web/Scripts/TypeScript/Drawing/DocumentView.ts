///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class DocumentView extends Drawable {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];

		constructor(
			private paper: RaphaelPaper,
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private document: XsdVisualizer.Model.Document
			) {
				super();
				$.each(this.document.elements, (index, element) => {
					var elementView = new XsdVisualizer.Drawing.ElementView(this.paperGroup.newGroup(), element);
					this.elementViews.push(elementView);
				});
				this.paperGroup.$getNode().on("ExpandOrCollapse", () => this.realign());
		}		

		realign() {
			this.realignElements(this.elementViews);

			//realigning elements may have caused the whole drawing area to shrink or expand, therefore we need to resize the paper
			var bbox = this.paperGroup.getBBox();
			var extraSpacing = 20; //without this, some strange artifacts were visible at the SVG rects' edges
			this.paper.setSize(bbox.width + extraSpacing, bbox.height + extraSpacing);
		}
	}
}
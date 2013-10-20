///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class DocumentView extends Drawable {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];

		constructor(
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
		}
	}
}
///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class DocumentView {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private document: XsdVisualizer.Model.Document
		) {
			$.each(this.document.elements, (index, element) => {
				var elementView = new XsdVisualizer.Drawing.ElementView(this.paperGroup.newGroup(), element);
				this.elementViews.push(elementView);
			});
		}

		realign() {
			//TODO: positioning of elementViews
			_.each(this.elementViews, elementView => {
				elementView.realign();
			});
		}
	}
}
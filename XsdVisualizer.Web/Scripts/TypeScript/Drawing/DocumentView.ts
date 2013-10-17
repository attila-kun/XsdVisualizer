///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	export class DocumentView {
		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private document: XsdVisualizer.Model.Document
		) {

		}

		redraw() {
			$.each(this.document.elements, (index, element) => {
				var elementView = new XsdVisualizer.Drawing.ElementView(this.paperGroup.newGroup(), element);
				elementView.redraw();
			});
		}
	}
}
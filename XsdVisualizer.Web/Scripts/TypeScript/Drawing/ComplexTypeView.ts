module XsdVisualizer.Drawing {
	export class ComplexTypeView {
		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private complexType: XsdVisualizer.Model.ComplexType
			) {

		}

		redraw() {
			this.paperGroup.rect(0, 0, 100, 100);

			if (this.complexType.sequence == null)
				return;

			$.each(this.complexType.sequence.elements, (index, element) => {
				var elementView = new XsdVisualizer.Drawing.ElementView(this.paperGroup.newGroup(), element);
				elementView.redraw();
			});
		}
	}
}
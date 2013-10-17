module XsdVisualizer.Drawing {
	export class ComplexTypeView {
		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private complexType: XsdVisualizer.Model.ComplexType
			) {

		}

		redraw() {
			if (this.complexType.sequence == null)
				return;

			$.each(this.complexType.sequence.elements, (index, element) => {
				var newGroup = this.paperGroup.newGroup();
				newGroup.translate(0, index * 100);
				var elementView = new XsdVisualizer.Drawing.ElementView(newGroup, element);
				elementView.redraw();
			});
		}
	}
}
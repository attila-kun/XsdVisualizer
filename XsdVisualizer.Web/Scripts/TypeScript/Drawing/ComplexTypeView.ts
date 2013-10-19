module XsdVisualizer.Drawing {
	export class ComplexTypeView extends TypeView {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];		

		constructor(
			paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private complexType: XsdVisualizer.Model.ComplexType
			) {
				super(paperGroup);

				if (this.complexType.sequence == null)
					return;

				$.each(this.complexType.sequence.elements, (index, element) => {
					var newGroup = this.paperGroup.newGroup();
					var elementView = new XsdVisualizer.Drawing.ElementView(newGroup, element);		
					this.elementViews.push(elementView);		
				});
		}

		getBBox(): NativeBBox {			
			return this.paperGroup.getBBox();
		}

		realign() {
			var currentY = 0;
			_.each(this.elementViews, elementView => {
				elementView.realign();
				var bbox = elementView.getBBox();				
				elementView.translate(0, currentY);
				currentY += bbox.height + 20;
			});
		}

		translate(x, y) {
			this.paperGroup.translate(x, y);
		}
	}
}
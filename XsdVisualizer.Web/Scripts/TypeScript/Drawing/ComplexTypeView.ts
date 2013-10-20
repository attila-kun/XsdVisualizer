module XsdVisualizer.Drawing {
	export class ComplexTypeView extends TypeView {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];		
		private borderRect: RaphaelElement;

		constructor(
			paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private complexType: XsdVisualizer.Model.ComplexType
			) {
				super(paperGroup);

				if (this.complexType.sequence == null)
					return;

				this.borderRect = this.getPaperGroup().rect(0, 0, 5, 0);
				this.borderRect.attr({"fill": "black"});

				$.each(this.complexType.sequence.elements, (index, element) => {
					var newGroup = this.getPaperGroup().newGroup();
					var elementView = new XsdVisualizer.Drawing.ElementView(newGroup, element);
					this.elementViews.push(elementView);		
				});
		}

		getBBox(): NativeBBox {			
			return this.getPaperGroup().getBBox();
		}

		realign() {
			this.realignElements(this.elementViews);
			var bbox = this.getPaperGroup().getBBox();
			this.borderRect.attr("height", _.last(this.elementViews).getCurrentY() + 20);
		}

		translate(x, y) {
			this.getPaperGroup().translate(x, y);
		}
	}
}
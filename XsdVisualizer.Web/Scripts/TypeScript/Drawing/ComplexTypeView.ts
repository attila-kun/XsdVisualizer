module XsdVisualizer.Drawing {
	export class ComplexTypeView implements TypeView {
		private elementViews: XsdVisualizer.Drawing.ElementView[] = [];		

		constructor(
			private paperGroup: XsdVisualizer.Drawing.PaperGroup,
			private complexType: XsdVisualizer.Model.ComplexType
			) {
				if (this.complexType.sequence == null)
					return;

				$.each(this.complexType.sequence.elements, (index, element) => {
					var newGroup = this.paperGroup.newGroup();
					newGroup.translate(0, index * 100);
					var elementView = new XsdVisualizer.Drawing.ElementView(newGroup, element);				
				});
		}

		getSize(): Size {			
			var elementSizes = _.map(this.elementViews, elementView => elementView.getSize()),
				sizeSum = _.reduce(
					elementSizes,
					(acc: Size, curr: Size) => {
						if (curr.width > acc.width) {
							acc.width = curr.width; //keep maximal width
						}
						acc.height += curr.height; //elements will be drawn under each other, so we sum their heights
						return acc;
					},
					new XsdVisualizer.Drawing.Size(0, 0));

			return sizeSum;
		}

		realign() {
					
		}
	}
}
///<reference path="../References.ts" />

module XsdVisualizer.Drawing {	

	export class VisualizerView {
		private $el: JQuery;

		$Element() {
			return this.$el;
		}

		constructor(private document: XsdVisualizer.Model.Document) {
			this.$el = $("<div></div>", {
				"class": "VisualizerView"
			});
			var paper: RaphaelPaper = Raphael(this.$el[0], 200, 200);
			var paperGroup = new PaperGroup(paper, paper.group());									

			var currentGroup = paperGroup;
			for (var i = 0; i < 10; i++) {
				currentGroup = currentGroup.newGroup();
				var offset = (i + 1) * 10;
				var rect = currentGroup.rect(offset, offset, 50, 50);
				this.setRectAttr(rect);
			}
		}

		setRectAttr(rect: RaphaelElement) {
			rect.attr({
				fill: "blue",
				stroke: "none",
				opacity: .5
			});
		}
	}

}
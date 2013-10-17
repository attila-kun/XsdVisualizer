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
			var documentView = new XsdVisualizer.Drawing.DocumentView(paperGroup, document);
			documentView.redraw();
		}
	}

}
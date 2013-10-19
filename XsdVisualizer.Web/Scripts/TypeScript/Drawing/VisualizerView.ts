///<reference path="../References.ts" />

module XsdVisualizer.Drawing {	

	export class VisualizerView {
		private $el: JQuery;
		private documentView: XsdVisualizer.Drawing.DocumentView;

		$Element() {
			return this.$el;
		}

		constructor(private document: XsdVisualizer.Model.Document) {
			this.$el = $("<div></div>", {
				"class": "VisualizerView"
			});
			var paper: RaphaelPaper = Raphael(this.$el[0], 700, 700);
			var paperGroup = new PaperGroup(paper, paper.group());									
			this.documentView = new XsdVisualizer.Drawing.DocumentView(paperGroup, document);
		}

		realign() {
			this.documentView.realign();
		}
	}

}
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
			var paper: SnapSvgPaper = Snap(700, 700);
			this.$el.append(paper.node);
			var drawingContext = new DrawingContext(paper, paper.group());									
			this.documentView = new XsdVisualizer.Drawing.DocumentView(paper, drawingContext, document);
		}

		realign() {
			this.documentView.realign();
		}
	}

}
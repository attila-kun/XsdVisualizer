///<reference path="References.ts" />

module XsdVisualizer {
    
    export class VisualizerView {
		private $el: JQuery;

		get $Element() {
			return this.$el;
		}

		constructor(markup: string) {
			this.$el = $("<div></div>", {
				"class": "VisualizerView"
			});
			var paper: RaphaelPaper = Raphael(this.$el[0], 200, 200);
			paper.rect(0, 0, 50, 50).attr({
				fill: "90-#333-#333",
				stroke: "none",
				opacity: .5
			});
		}
    }

}
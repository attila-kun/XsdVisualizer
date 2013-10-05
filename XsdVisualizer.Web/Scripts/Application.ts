///<reference path="References.ts" />

class Application {
	constructor() {
		var visualizerView = new XsdVisualizer.VisualizerView("hello");			
		$(".VisualizerContainer")
			.empty()
			.append(visualizerView.$Element);
	}
}

$(document).ready(function () {
	new Application();
});
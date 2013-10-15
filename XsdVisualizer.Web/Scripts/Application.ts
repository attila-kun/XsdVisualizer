///<reference path="References.ts" />

class Application {
	constructor() {
		var visualizerView = new XsdVisualizer.Drawing.VisualizerView("hello");			
		$(".VisualizerContainer")
			.empty()
			.append(visualizerView.$Element());
	}

	loadXsd(url: string) {
		$.get(url, null, null, "text")
			.then(function (response) {
				XsdVisualizer.visualize(response);
			});				
	}
}
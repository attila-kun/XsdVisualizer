///<reference path="References.ts" />

class Application {
	constructor() {
		var visualizerView = new XsdVisualizer.VisualizerView("hello");			
		$(".VisualizerContainer")
			.empty()
			.append(visualizerView.$Element());
	}

	loadXsd(url: string) {
		$.get(url, null, null, "text")
			.then(function (response) {
				XsdVisualizer.Parser.parse(response);
			});				
	}
}
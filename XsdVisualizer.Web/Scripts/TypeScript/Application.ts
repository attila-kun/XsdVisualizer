///<reference path="References.ts" />

class Application {
	private $visualizerContainer: JQuery;

	constructor() {		
		this.$visualizerContainer = $(".VisualizerContainer");
	}

	loadXsd(url: string) {
		$.get(url, null, null, "text")
			.then(response => {				
				var visualizerView = XsdVisualizer.visualize(response);
				this.$visualizerContainer
					.empty()
					.append(visualizerView.$Element());

				visualizerView.realign(); //must be called after visualizerView became part of the DOM
			});				
	}
}
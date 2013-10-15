///<reference path="References.ts" />

module XsdVisualizer {
	export function visualize(markup: string) {
		var document = XsdVisualizer.Parser.parse(markup);
		return new XsdVisualizer.Drawing.VisualizerView(document);		
	}
}
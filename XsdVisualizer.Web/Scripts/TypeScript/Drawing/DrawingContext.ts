///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	//Wrapper around Raphael.js to provide support for groups and drawing elements inside groups.
	export class DrawingContext {
		constructor(private paper: SnapSvgPaper, private group: SnapSvgGroup) {

		}

		newGroup(): DrawingContext {
			var newGroup = this.group.group();			
			var newDrawingContext = new DrawingContext(this.paper, newGroup);
			return newDrawingContext;
		}

		private createRaphaelElement(createCallback: (group: SnapSvgGroup) => SnapSvgElement): SnapSvgElement {
			var element = createCallback(this.group);
			this.group.append(element);
			return element;
		}

		translate(x: number, y: number) {
			this.group.transform(new Snap.Matrix().translate(x, y));
		}

		rect(x: number, y: number, width: number, height: number, r?: number): SnapSvgElement {
			return this.createRaphaelElement(group => group.rect(x, y, width, height, r));
		}

		text(x: number, y: number, text: string): SnapSvgElement {			
			return this.createRaphaelElement(group => group.text(x, y, text));
		}

		getBBox(): NativeBBox {		
			try {
				return (<any>this.group.node).getBBox();
			}
			//Firefox throws an error if getBBox is invoked when the given node is not visible (see: http://stackoverflow.com/questions/6390065/doing-ajax-updates-in-svg-breaks-getbbox-is-there-a-workaround and https://bugzilla.mozilla.org/show_bug.cgi?id=612118)
			catch (ex) {
				return {
					x: null,
					y: null,
					width: 0,
					height: 0
				};
			}
		}

		getNode() {
			return this.group.node;
		}

		$getNode() {
			return $(this.getNode());
		}
	}
}
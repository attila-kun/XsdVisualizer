///<reference path="../References.ts" />

module XsdVisualizer.Drawing {
	//Wrapper around Raphael.js to provide support for groups and drawing elements inside groups.
	export class PaperGroup {
		constructor(private paper: RaphaelPaper, private group: RaphaelGroup) {

		}

		newGroup(): PaperGroup {
			var newRaphaelGroup = this.paper.group();
			this.group.push(<any>newRaphaelGroup);
			var newPaperGroup = new PaperGroup(this.paper, newRaphaelGroup);
			return newPaperGroup;
		}

		private createRaphaelElement(createCallback: (paper: RaphaelPaper) => RaphaelElement): RaphaelElement {
			var element = createCallback(this.paper);
			this.group.push(element);
			return element;
		}

		translate(x: number, y: number) {
			return this.group.translate(x, y);
		}

		rect(x: number, y: number, width: number, height: number, r?: number): RaphaelElement {
			return this.createRaphaelElement(paper => paper.rect(x, y, width, height, r));
		}

		text(x: number, y: number, text: string): RaphaelElement {			
			return this.createRaphaelElement(paper => {				
				var textElement = paper.text(x, y, text);
				//hack for fixing incorrect dy value of tspan element in Chrome, see: //http://stackoverflow.com/questions/11359600/raphael-is-adding-a-dy-attribute
				$(textElement.node).find("tspan").attr("dy", 0);
				return textElement;
			});
		}

		getBBox(): NativeBBox {
			return (<any>this.group.node).getBBox();
		}

		getNode() {
			return this.group.node;
		}
	}
}
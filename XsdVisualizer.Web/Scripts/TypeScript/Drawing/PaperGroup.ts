///<reference path="../References.ts" />

//Wrapper around Raphael.js to provide support for groups and drawing elements inside groups.
class PaperGroup {
	constructor(private paper: RaphaelPaper, private group: RaphaelGroup) {

	}

	newGroup(): PaperGroup {
		var newRaphaelGroup = this.paper.group();
		this.group.push(<any>newRaphaelGroup);
		var newPaperGroup = new PaperGroup(this.paper, newRaphaelGroup);
		return newPaperGroup;
	}

	rect(x: number, y: number, width: number, height: number, r?: number): RaphaelElement {
		var element = this.paper.rect(x, y, width, height, r);
		this.group.push(element);
		return element;
	}
}